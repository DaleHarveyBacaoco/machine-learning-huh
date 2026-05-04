"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

type Comment = {
  id: string;
  article_id: string;
  content: string;
  created_at: string;
};

export default function ArticleDetail() {
  const params = useParams();
const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  /* ================= FETCH ARTICLE ================= */
  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      setArticle(data);
    };

    fetchArticle();
  }, [id]);

  /* ================= FETCH COMMENTS ================= */
  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("article_id", String(id))
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  /* ================= ADD COMMENT ================= */
  const addComment = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Please login first!");
      return;
    }

    await supabase.from("comments").insert([
      {
        content: commentText,
        article_id: id,
        user_id: user.id,
      },
    ]);

    setCommentText("");
    fetchComments();
  };

  if (!article) return <p>Loading...</p>;

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
        {/* ARTICLE CARD */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "800" }}>
            {article.title}
          </h1>

          <p style={{ marginTop: "12px", color: "#374151", lineHeight: "1.7" }}>
            {article.content}
          </p>

          <small style={{ display: "block", marginTop: "10px", color: "#6B7280" }}>
            {new Date(article.created_at).toLocaleString()}
          </small>
        </div>

        {/* COMMENTS SECTION */}
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
            Comments ({comments.length})
          </h2>

          {/* INPUT */}
          <div style={{ marginTop: "10px" }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />

            <button
              onClick={addComment}
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                background: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Post Comment
            </button>
          </div>

          {/* COMMENT LIST */}
          <div style={{ marginTop: "20px" }}>
            {comments.length === 0 ? (
              <p style={{ color: "#6B7280" }}>No comments yet.</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    padding: "12px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  {c.content}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}