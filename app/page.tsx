"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ffffff, #6366f1)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          📝 MIST APP
        </h1>

        <p style={{ marginBottom: "20px" }}>
          Create, share, and interact with articles. 
          So you wont MIST a thing.
        </p>
<div style={{ marginTop: "20px" }}>
  <button
    onClick={() => router.push("/auth?mode=login")}
    style={{
      padding: "10px 20px",
      marginRight: "10px",
      borderRadius: "6px",
      backgroundColor: "white",
      color: "#4f46e5",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Login
  </button>

  <button
    onClick={() => router.push("/auth?mode=signup")}
    style={{
      padding: "10px 20px",
      borderRadius: "6px",
      border: "1px solid white",
      background: "transparent",
      color: "white",
      cursor: "pointer",
    }}
  >
    Sign Up
  </button>
</div>
      </div>
    </div>
  );
}