import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { askAI } from "./services/aiService";

const SendMessage = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !chatId || !auth.currentUser) return;

    const userMessage = message;
    setMessage("");

    const messagesRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "chats",
      chatId,
      "messages"
    );

    await addDoc(messagesRef, {
      text: userMessage,
      uid: auth.currentUser.uid,
      sender: "user",
      createdAt: serverTimestamp(),
    });

    try {
      setAiLoading(true);
      const aiResponse = await askAI(userMessage);
      await addDoc(messagesRef, {
        text: aiResponse,
        uid: "ai",
        sender: "ai",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      await addDoc(messagesRef, {
        text: "Something went wrong. Please try again.",
        uid: "ai",
        sender: "ai",
        createdAt: serverTimestamp(),
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      {aiLoading && (
        <div className="ai-typing">
          AI is typing<span className="dots">...</span>
        </div>
      )}

      <form onSubmit={sendMessage} className="send-message">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          disabled={aiLoading}
        />

        <button type="submit" disabled={aiLoading}>
          Send
        </button>
      </form>
    </>
  );
};

export default SendMessage;