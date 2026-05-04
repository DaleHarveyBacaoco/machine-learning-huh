"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [myArticles, setMyArticles] = useState<any[]>([]);

  /* ================= GET USER ================= */
const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  setUser(user);

  if (user) {
    fetchMyArticles(user.id);
  }
};
  const fetchMyArticles = async (userId: string) => {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  setMyArticles(data || []);
};

  /* ================= LOGOUT ================= */
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  /* ================= UI ================= */

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
        }}
      >
        <div
          style={{
            width: "350px",
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          {/* TITLE */}
          <h2 style={{ fontWeight: "700", color: "#111827" }}>
            My Profile
          </h2>

          {/* EMAIL */}
          <p
            style={{
              marginTop: "10px",
              color: "#374151",
              fontSize: "14px",
            }}
          >
            {user?.email}
          </p>
          {myArticles.length > 0 && (
  <div style={{ marginTop: "20px", textAlign: "left" }}>
    <h4 style={{ fontSize: "14px", fontWeight: "600" }}>
      My Articles
    </h4>

    {myArticles.map((a) => (
      <div
        key={a.id}
        style={{
          padding: "8px",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          marginTop: "8px",
        }}
      >
        <p style={{ fontWeight: "600", fontSize: "13px" }}>
          {a.title}
        </p>

        <small style={{ fontSize: "11px", color: "#6B7280" }}>
          ❤️ {a.likes || 0}
        </small>
      </div>
    ))}
  </div>
)}

          {/* LOGOUT BUTTON */}
          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              background: "#EF4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}