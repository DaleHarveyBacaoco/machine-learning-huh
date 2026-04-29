"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

/* ================= TYPES ================= */

type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes: number;
};

/* ================= PAGE ================= */

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [topArticles, setTopArticles] = useState<Article[]>([]);

  /* ================= GET USER ================= */

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  /* ================= FETCH TOP 5 ARTICLES ================= */

  const fetchTopArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("likes", { ascending: false })
      .limit(5);

    setTopArticles(data || []);
  };

  useEffect(() => {
    fetchTopArticles();
  }, []);

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
          background: "#F9FAFB",
          minHeight: "100vh",
          padding: "30px",
          textAlign: "center",
        }}
      >
        {/* USER INFO */}
        <h1 style={{ color: "#111827" }}>Dashboard</h1>

        <p style={{ color: "#374151" }}>
          Welcome: {user?.email}
        </p>

        <button
          onClick={logout}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            background: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        {/* TOP ARTICLES */}
        <div
          style={{
            maxWidth: "800px",
            margin: "40px auto",
            textAlign: "left",
          }}
        >
          <h2 style={{ color: "#111827", marginBottom: "15px" }}>
            🏆 Top 5 Articles
          </h2>

          {topArticles.map((article) => (
            <div
              key={article.id}
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              {/* TITLE */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {article.title}
              </h3>

              {/* CONTENT PREVIEW */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#374151",
                  marginTop: "5px",
                }}
              >
                {article.content?.slice(0, 120)}...
              </p>

              {/* META */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginTop: "8px",
                }}
              >
                ❤️ {article.likes || 0} •{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}