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
        background: "linear-gradient(to right, #ffffffff, #000000ff)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(123, 180, 255, 0.87)",
          padding: "40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          MIST APP
        </h1>

        <p 
        style={{
          color: "#ffff",
          fontWeight:"500",
         }}
         >
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
      backgroundColor: "cac7c7",
      color: "#ffffffff",
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