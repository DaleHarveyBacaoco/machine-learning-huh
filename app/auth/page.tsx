"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    alert(error ? error.message : "Check your email!");
  };

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else window.location.href = "/dashboard";
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#F9FAFB",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {/* INPUTS */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          style={{ width: "100%", marginTop: "15px" }}
          onClick={mode === "login" ? login : signUp}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {/* TOGGLE */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          {mode === "login" ? "No account?" : "Already have one?"}{" "}
          <span
            style={{
              color: "#4F46E5",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}