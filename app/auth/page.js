"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const searchParams = useSearchParams();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup") setMode("signup");
    else setMode("login");
  }, [searchParams]);

  // LOGIN
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  // SIGN UP
  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    alert(error ? error.message : "Check your email!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      {/* toggle */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode("login")}>Login</button>
        <button onClick={() => setMode("signup")}>Sign Up</button>
      </div>

      {/* email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {/* password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {/* submit */}
      <button onClick={mode === "login" ? login : signUp}>
        {mode === "login" ? "Login" : "Create Account"}
      </button>
    </div>
  );
}