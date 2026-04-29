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
  user_id: string;
};

type Comment = {
  id: string;
  article_id: string;
  content: string;
  created_at: string;
  user_id: string;
};

/* ================= PAGE ================= */

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  /* ================= FETCH ================= */

  const fetchArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    setArticles(data || []);
  };

  const fetchComments = async () => {
    const { data } = await supabase.from("comments").select("*");
    setComments(data || []);
  };

  /* ================= ADD COMMENT ================= */

  const addComment = async (articleId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Login first!");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        content: commentText[articleId] || "",
        article_id: articleId,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setCommentText({
      ...commentText,
      [articleId]: "",
    });

    fetchComments();
  };

  /* ================= INIT ================= */

  useEffect(() => {
    fetchArticles();
    fetchComments();
  }, []);

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#F9FAFB",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#111827" }}>
            All Articles
          </h2>

          {articles.map((article) => (
            <div
              key={article.id}
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "16px",
                marginTop: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              {/* TITLE */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "5px",
                }}
              >
                {article.title}
              </h3>

              {/* CONTENT */}
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#374151",
                  marginBottom: "10px",
                }}
              >
                {article.content}
              </p>

              {/* DATE */}
              <small style={{ fontSize: "12px", color: "#6B7280" }}>
                {new Date(article.created_at).toLocaleString()}
              </small>

              {/* COMMENTS */}
              <div style={{ marginTop: "15px" }}>
                <h4 style={{ fontSize: "14px", color: "#111827" }}>
                  Comments
                </h4>

                {comments
                  .filter((c) => c.article_id === article.id)
                  .map((c) => (
                    <div key={c.id} style={{ marginTop: "6px" }}>
                      <p style={{ fontSize: "13px", color: "#374151" }}>
                        • {c.content}
                      </p>
                    </div>
                  ))}
              </div>

              {/* INPUT */}
              <div style={{ marginTop: "10px" }}>
                <input
                  placeholder="Write a comment..."
                  value={commentText[article.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [article.id]: e.target.value,
                    })
                  }
                  style={{
                    width: "70%",
                    padding: "8px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                />

                <button
                  onClick={() => addComment(article.id)}
                  style={{
                    marginLeft: "8px",
                    padding: "8px 12px",
                    background: "#4F46E5",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}