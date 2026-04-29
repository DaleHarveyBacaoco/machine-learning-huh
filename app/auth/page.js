"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    setMode(urlMode === "signup" ? "signup" : "login");
  }, [searchParams]);

  const login = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    alert(error ? error.message : "Check your email!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode("login")}>Login</button>
        <button onClick={() => setMode("signup")}>Sign Up</button>
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={mode === "login" ? login : signUp} disabled={loading}>
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Login"
            : "Create Account"}
      </button>
    </div>
  );
}
