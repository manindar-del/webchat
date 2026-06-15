import React from "react";
import GoogleSignin from "../img/google-signin-button.png";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInAnonymously,
} from "firebase/auth";

import { auth } from "../firebase";

const Welcome = () => {
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    

  };

  const guestLogin = async () => {
    await signInAnonymously(auth);
  };

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