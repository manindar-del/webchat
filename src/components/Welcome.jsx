import React, { useEffect } from "react";
import GoogleSignin from "../img/google-signin-button.png";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate, useNavigation } from "react-router-dom";

const Welcome = ({user}) => {
const navigate = useNavigate();
    const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/chat", { replace: true });
  };

  const guestLogin = async () => {
    await signInAnonymously(auth);
     navigate("/chat", { replace: true });
  };
  useEffect(() => {
    if (user) {
       navigate("/chat", { replace: true });
    }
  }, [user, navigate]);


  return (
    <main className="welcome">
      <div className="welcome-card">
        <img
          src="/logo512.png"
          alt="logo"
          width={80}
          height={80}
        />

        <h1>Kolkata AI Chat</h1>

        <p>
          Chat with AI, save conversations,
          and access chat history anytime.
        </p>

        <button
          className="google-btn"
          onClick={googleSignIn}
        >
          <img
            src={GoogleSignin}
            alt="Google Login"
          />
        </button>

        <button
          className="guest-btn"
          onClick={guestLogin}
        >
          Continue as Guest
        </button>
      </div>
    </main>
  );
};

export default Welcome;