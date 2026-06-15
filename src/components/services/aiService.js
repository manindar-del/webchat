export async function askAI(message) {
 const apiKey =  process.env.REACT_APP_GCP_API_KEY;;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
    if (!res.ok) {
      if (res.status === 429) {
        return "Gemini quota exceeded. Please try later.";
      }
      return data?.error?.message || "API Error";
    }
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response"
    );
  } catch (err) {
    console.error(err);
    return "Network Error";
  }
}