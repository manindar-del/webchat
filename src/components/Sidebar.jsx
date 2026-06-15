import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Sidebar = ({ user, setChatId, chatId }) => {
  const [chats, setChats] = useState([]);
  const [apiCount, setApiCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "chats");

    const unsub = onSnapshot(ref, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // newest first
      setChats(
        list.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds),
      );
    });

    return () => unsub();
  }, [user]);

  const createChat = async () => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "chats");

    const docRef = await addDoc(ref, {
      title: "New Chat",
      createdAt: serverTimestamp(),
    });

    setChatId(docRef.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        
        <h2> Kolkata AI</h2>

        <button className="new-chat-btn" onClick={createChat}>
          + New Chat
        </button>
      </div>
      <div className="chat-list">
        {chats.length === 0 && <p className="empty">No chats yet</p>}

        {chats.map((c) => (
          <div
            key={c.id}
            className={`chat-item ${chatId === c.id ? "active" : ""}`}
            onClick={() => setChatId(c.id)}
          >
            <span>💬</span>
            <div className="chat-title">{c.title || "Untitled Chat"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
