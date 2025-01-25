import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the signed-in user
      console.log("Signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Invalid login credentials");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the signed-in user
      console.log("Signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="panther-title">Panther Pantry</h1>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <div className="login-buttons">
          {user ? (
            <button type="button" onClick={handleSignOut} className="btn btn-signout">
              Sign Out
            </button>
          ) : (
            <button type="button" onClick={handleSignIn} className="btn btn-signin">
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;