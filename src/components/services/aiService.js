

 const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
//  console.log("API Key:", API_KEY); 

export const askAI = async (message) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.choices[0].message.content;
};
