"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
  
  {/* 🔥 LOGO (PUT IT FIRST) */}
  <Link
    href="/"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: "800",
      fontSize: "18px",
      color: "#111827",
      textDecoration: "none",
    }}
  >
    <img
      src="/logo.png"
      alt="Logo"
      style={{
        width: "28px",
        height: "28px",
        objectFit: "contain",
      }}
    />
    MIST
  </Link>

  {/* NAV LINKS */}
  <Link href="/articles">Articles</Link>
  <Link href="/create">Create</Link>

</div>
      {/* RIGHT */}
{user ? (
  <>
    <Link href="/notifications">🔔</Link>

    <Link href="/profile" style={{ display: "flex", alignItems: "center" }}>
      <img
        src={user.user_metadata?.avatar_url || "/default-avatar.png"}
        alt="avatar"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #E5E7EB",
          cursor: "pointer",
        }}
      />
    </Link>
  </>
) : (
  <Link href="/auth">Login</Link>
)}
    </nav>
  );
}