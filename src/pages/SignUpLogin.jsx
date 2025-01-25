import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import "./signup.css";

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Log In
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    // Validate fields for Sign Up
    if (!formData.email || !formData.confirmEmail || !formData.password || !formData.confirmPassword) {
      setError("All fields must be filled.");
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/next");
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  };

  const handleLogIn = async () => {
    // Validate fields for Log In
    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/next");
    } catch (firebaseError) {
      // Handle Firebase Authentication errors
      if (
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password."); // General error for invalid credentials
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1 className="signup-title">Panther Pantry</h1>
      </header>
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <p>
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            className="toggle-link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(""); // Clear error when switching views
            }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="signup-input"
        />
        {isSignUp && (
          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirm Email"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            className="signup-input"
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="signup-input"
        />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="signup-input"
          />
        )}
        {error && <p className="error-message">{error}</p>}
        <button
          type="button"
          onClick={isSignUp ? handleSignUp : handleLogIn}
          className="signup-button"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default SignUpLogin;