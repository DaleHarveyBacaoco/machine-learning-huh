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
        <Link href="/" style={{ fontWeight: "700", fontSize: "18px" }}>
          MyApp 🚀
        </Link>

        <Link href="/articles">Articles</Link>
        <Link href="/create">Create</Link>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
            <Link href="/notifications">🔔</Link>
            <Link href="/profile">Profile</Link>
          </>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}