"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabaseClient";

type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes: { count: number }[];
};

export default function TrendingPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("articles")
      .select(`
        *,
        likes(count)
      `);

    if (!error && data) {
      // SORT BY MOST LIKES
      const sorted = [...data].sort(
        (a, b) =>
          (b.likes?.[0]?.count || 0) -
          (a.likes?.[0]?.count || 0)
      );

      setArticles(sorted);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            🔥 Trending Articles
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "6px",
              fontSize: "15px",
            }}
          >
            Most liked articles in the community
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading trending articles...</p>
        ) : articles.length === 0 ? (
          <p>No trending articles yet.</p>
        ) : (
          articles.map((article, index) => (
            <div
              key={article.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "18px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
              }}
            >
              {/* TOP NUMBER */}
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#4F46E5",
                  marginBottom: "8px",
                }}
              >
                #{index + 1} Trending
              </div>

              {/* TITLE */}
              <Link
                href={`/articles/${article.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#111827",
                    cursor: "pointer",
                  }}
                >
                  {article.title}
                </h2>
              </Link>

              {/* CONTENT PREVIEW */}
              <p
                style={{
                  marginTop: "10px",
                  color: "#374151",
                  lineHeight: "1.7",
                }}
              >
                {article.content.slice(0, 180)}...
              </p>

              {/* FOOTER */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <small
                  style={{
                    color: "#6B7280",
                  }}
                >
                  {new Date(article.created_at).toLocaleString()}
                </small>

                <div
                  style={{
                    background: "#EEF2FF",
                    color: "#4338CA",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  👍 {article.likes?.[0]?.count || 0}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}