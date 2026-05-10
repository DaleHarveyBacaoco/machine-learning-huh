"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function ArticleDetail() {
  const params = useParams();
  const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  /* ================= FETCH ARTICLE ================= */

  const fetchArticle = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    setArticle(data);
  };

  /* ================= FETCH COMMENTS ================= */

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("article_id", id)
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  /* ================= ADD COMMENT ================= */

  const addComment = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Login first!");
      return;
    }

    if (!commentText.trim()) return;

    const { error } = await supabase.from("comments").insert([
      {
        article_id: id,
        content: commentText,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    // CLEAR INPUT
    setCommentText("");

    // REFRESH COMMENTS
    fetchComments();
  };

  /* ================= INIT ================= */

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchComments();
    }
  }, [id]);

  /* ================= LOADING ================= */

  if (!article)
    return (
      <>
        <Navbar />
        <p style={{ padding: "20px" }}>Loading article...</p>
      </>
    );

  /* ================= UI ================= */

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
        {/* ARTICLE CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          }}
        >
          {/* TITLE */}
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "#111827",
              lineHeight: "1.2",
            }}
          >
            {article.title}
          </h1>

          {/* DATE */}
          <small
            style={{
              color: "#6B7280",
              display: "block",
              marginTop: "10px",
              fontSize: "13px",
            }}
          >
            {new Date(article.created_at).toLocaleString()}
          </small>

          {/* CONTENT */}
          <p
            style={{
              marginTop: "25px",
              lineHeight: "1.9",
              color: "#374151",
              fontSize: "17px",
            }}
          >
            {article.content}
          </p>
        </div>

        {/* COMMENTS SECTION */}
        <div
          style={{
            marginTop: "25px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            💬 Comments ({comments.length})
          </h2>

          {/* COMMENT INPUT */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #D1D5DB",
                fontSize: "14px",
              }}
            />

            <button
              onClick={addComment}
              style={{
                background: "#4F46E5",
                color: "white",
                border: "none",
                padding: "0 20px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </div>

          {/* COMMENTS LIST */}
          {comments.length === 0 ? (
            <p style={{ color: "#6B7280" }}>
              No comments yet.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: "16px",
                  border: "1px solid #F3F4F6",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  background: "#F9FAFB",
                }}
              >
                <p
                  style={{
                    color: "#111827",
                    lineHeight: "1.6",
                  }}
                >
                  {comment.content}
                </p>

                <small
                  style={{
                    color: "#6B7280",
                    marginTop: "8px",
                    display: "block",
                  }}
                >
                  {new Date(comment.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}