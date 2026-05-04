"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#F9FAFB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          {/* AVATAR */}
          <img
            src={user.user_metadata?.avatar_url || "/default-avatar.png"}
            alt="avatar"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #E5E7EB",
              marginBottom: "15px",
            }}
          />

          {/* EMAIL */}
          <h2 style={{ marginBottom: "5px", color: "#111827" }}>
            {user.email}
          </h2>

          <p style={{ fontSize: "13px", color: "#6B7280" }}>
            User ID: {user.id}
          </p>

          {/* EXTRA INFO */}
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "#F3F4F6",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#374151",
            }}
          >
            Member since: {new Date(user.created_at).toLocaleDateString()}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#EF4444",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}