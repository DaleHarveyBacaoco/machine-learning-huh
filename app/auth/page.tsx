"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const signUp = async () => {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account.");
    }
    const { data: userData } = await supabase.auth.signUp({
  email,
  password,
});

const user = userData.user;

if (user) {
  await supabase.from("profiles").insert([
    {
      id: user.id,
      username: email.split("@")[0],
      avatar_url: null,
    },
  ]);
}
  };
  

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F9FAFB",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(153, 70, 255, 0.8)",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#6B7280",
            marginBottom: "20px",
          }}
        >
          {mode === "login"
            ? "Login to continue"
            : "Sign up to get started"}
        </p>

        {/* ERROR / MESSAGE */}
        {message && (
          <p
            style={{
              background: "#FEF2F2",
              color: "#B91C1C",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            {message}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "15px",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={mode === "login" ? login : signUp}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        {/* TOGGLE */}
        <p
          style={{
            marginTop: "15px",
            fontSize: "12px",
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            style={{
              color: "#4F46E5",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {mode === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}