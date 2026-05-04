"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import Navbar from "./components/Navbar";

type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes: { count: number }[];
};

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchTopArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select(`
        *,
        likes(count)
      `);

    const sorted = (data || [])
      .sort((a, b) => (b.likes?.[0]?.count || 0) - (a.likes?.[0]?.count || 0))
      .slice(0, 5);

    setArticles(sorted);
  };

  useEffect(() => {
    fetchTopArticles();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "26px", fontWeight: "800" }}>
          🔥 Top 5 Articles
        </h1>

        <p style={{ color: "#6B7280", marginBottom: "20px" }}>
          Most liked posts in your community
        </p>

        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            style={{
              display: "block",
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px",
              textDecoration: "none",
              color: "#111827",
              boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontWeight: "700", fontSize: "18px" }}>
              {article.title}
            </h3>

            <p style={{ fontSize: "13px", color: "#6B7280" }}>
              {article.content.slice(0, 100)}...
            </p>

            <small style={{ color: "#4F46E5", fontWeight: "600" }}>
              👍 {article.likes?.[0]?.count || 0} likes
            </small>
          </Link>
        ))}
      </div>
    </>
  );
}