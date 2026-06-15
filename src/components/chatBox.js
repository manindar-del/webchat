import { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    if (!chatId || !auth.currentUser) return;

    const ref = collection(
      db,
      "users",
      auth.currentUser.uid,
      "chats",
      chatId,
      "messages"
    );

    const q = query(ref, orderBy("createdAt"));

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatId) {
    return (
      <div className="empty-chat">
        Select or create a chat
      </div>
    );
  }
  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        <div ref={scroll} />
      </div>

      <SendMessage chatId={chatId} />
    </div>
  );
};

export default ChatBox;