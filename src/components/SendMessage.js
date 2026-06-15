import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getKolkataAIReply } from "./services/kolkataAI";

const SendMessage = ({ chatId }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
const send = async () => {
  if (!text.trim()) return;
  if (!chatId) return;
  if (!auth.currentUser) return;

  const uid = auth.currentUser.uid;

  const messagesRef = collection(
    db,
    "users",
    uid,
    "chats",
    chatId,
    "messages"
  );

  const userMessage = text;

  setLoading(true);

  try {
    // Save user message
    await addDoc(messagesRef, {
      text: userMessage,
      uid,
      createdAt: serverTimestamp(),
    });

    setText("");

    // Get AI response
    const botReply = await getKolkataAIReply(userMessage);

    // Save AI response
    await addDoc(messagesRef, {
      text: botReply,
      uid: "bot",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);

    let errorMessage = "Something went wrong.";

    if (
      error?.message?.includes("429") ||
      error?.status === 429
    ) {
      errorMessage =
        "API limit exceeded. Please try again later.";
    }

    await addDoc(messagesRef, {
      text: errorMessage,
      uid: "bot",
      createdAt: serverTimestamp(),
    });
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <form className="send-message">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Kolkata..."
        disabled={loading}
      />

      <button onClick={send} disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default SendMessage;