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
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* LOGO */}
        <Link href="/" className="logo">
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          <span
            style={{
              fontWeight: "800",
              fontSize: "20px",
              letterSpacing: "-0.5px",
            }}
          >
            MIST
          </span>
        </Link>

        {/* NAVIGATION */}
        <div className="nav-links">
          <Link href="/articles" className="nav-link">
            Articles
          </Link>

          <Link href="/trending" className="nav-link">
            Trending
          </Link>

          <Link href="/create" className="nav-link">
            Create
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {user ? (
          <>
            {/* NOTIFICATIONS */}
            <Link
              href="/notifications"
              style={{
                textDecoration: "none",
                fontSize: "22px",
                display: "flex",
                alignItems: "center",
              }}
            >
              🔔
            </Link>

            {/* PROFILE */}
            <Link
              href="/profile"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={
                  user.user_metadata?.avatar_url ||
                  "/default-avatar.png"
                }
                alt="avatar"
                className="avatar"
              />
            </Link>
          </>
        ) : (
          <Link href="/auth" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}