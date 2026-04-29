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
        background: "linear-gradient(to right, #4f46e5, #6366f1)",
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
          📝 Article Hub
        </h1>

        <p style={{ marginBottom: "20px" }}>
          Create, share, and interact with articles.  
          Join the community and start posting today.
        </p>

        <button
          onClick={() => router.push("/auth")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "white",
            color: "#4f46e5",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login / Sign Up
        </button>
      </div>
    </div>
  );
}