"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp =async () =>{
        const {error} = await supabase.auth.signUp({ email, password });
        alert(error ? error.message : "Check your email!");
    };

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
    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#5c7abb",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color: "black"
        }}>
    <div style={{
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      width: "90%",
      maxWidth:"400px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      textAlign:"center"
    }}>
            <h2>Login / Sign Up</h2>

            <input type="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} /><br /><br />

            <input type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} /><br /><br />

            <button onClick={signUp} style={{ marginRight: "10px", padding: "10px 20px"}}>
                Sign Up</button>
            <button onClick={login}style={{padding: "10px 20px"}}>
                Login
            </button>
        </div>
    </div>
    );
}