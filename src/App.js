import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";

import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);
  const [chatId, setChatId] = useState(null);

  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />

        {!user ? (
          <Welcome />
        ) : (
          <div className="main-layout">
            <div className="side-section">
              <Sidebar user={user} chatId={chatId} setChatId={setChatId} />
            </div>

            <div className="chat-section">
              <ChatBox chatId={chatId} setChatId={setChatId} />
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;