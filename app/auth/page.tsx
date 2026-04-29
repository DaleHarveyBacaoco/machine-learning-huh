"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else window.location.href = "/dashboard";
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Check your email to confirm account!");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4f46e5, #6366f1)",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        <p style={{ fontSize: "12px", color: "#666" }}>
          Welcome to your Article System
        </p>

        {/* TOGGLE */}
        <div style={{ margin: "15px 0" }}>
          <button
            onClick={() => setMode("login")}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              background: mode === "login" ? "#4f46e5" : "#eee",
              color: mode === "login" ? "white" : "black",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            style={{
              padding: "8px 12px",
              background: mode === "signup" ? "#4f46e5" : "#eee",
              color: mode === "signup" ? "white" : "black",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* INPUTS */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={mode === "login" ? login : signUp}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
}