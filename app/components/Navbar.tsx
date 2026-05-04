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

  // 🔥 NAV STYLE
  const navStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "0.2s",
  };

  const hoverIn = (e: any) => {
    e.currentTarget.style.background = "#EEF2FF";
    e.currentTarget.style.color = "#4F46E5";
  };

  const hoverOut = (e: any) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#374151";
  };

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
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* LOGO */}
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
            marginRight: "10px",
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
        <Link
          href="/articles"
          style={navStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          Articles
        </Link>

        <Link
          href="/create"
          style={navStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          Create
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {user ? (
          <>
            {/* NOTIFICATION */}
            <Link
              href="/notifications"
              style={{
                fontSize: "18px",
                padding: "6px 10px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#374151",
              }}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              🔔
            </Link>

            {/* PROFILE */}
            <Link href="/profile">
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
          <Link
            href="/auth"
            style={navStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}