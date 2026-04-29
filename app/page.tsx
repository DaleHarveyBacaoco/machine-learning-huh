import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#5c7abb",
      textAlign: "center",
      paddingTop: "100px",
      color: "white"
    }}>
      <h1>Machine Learning Hub</h1>

      <p style={{ marginBottom: "40px" }}>
        A simple platform using Supabase and Vercel.
      </p>

      <Link href="/auth">
        <button style={{
          padding: "10px 20px",
          border: "2px solid white",
          background: "transparent",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Log In
        </button>
      </Link>
    </div>
  );
}