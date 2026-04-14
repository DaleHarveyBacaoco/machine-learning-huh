import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "200px",
      background: "#3561c9",
      height: "150vh",
      color: "white"
    }}>
      <h1>Machine Learning Hub</h1>

      <p style={{ marginBottom: "40px", color: "#cbd5e1" }}>
        A simple platform using Supabase and Vercel.
      </p>

      <Link href="/auth">
        <button style={{
          padding: "12px 25px",
          border: "2px solid white",
          borderRadius: "6px",
          background: "transparent",
          color: "white",
          cursor: "pointer",
          marginTop: "20px"
        }}>
          Get Started
        </button>
      </Link>
    </div>
  );
}