import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";

import "./App.css";
import ChatPage from "./pages/ChatPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);
  const [chatId, setChatId] = useState(null);
  return (
   <BrowserRouter>
      <div className="app-container">
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={!user ? <Welcome /> : <Navigate to="/chat" replace />}
          />

          <Route
            path="/chat"
            element={
              user ? (
                <ChatPage
                  user={user}
                  chatId={chatId}
                  setChatId={setChatId}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;