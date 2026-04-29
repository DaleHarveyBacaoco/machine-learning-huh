"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* ================= TYPES ================= */

type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

type Comment = {
  id: string;
  article_id: string;
  content: string;
  created_at: string;
};

type Reply = {
  id: string;
  comment_id: string;
  content: string;
  created_at: string;
};

/* ================= PAGE ================= */

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);

  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  /* ================= FETCH ARTICLES ================= */

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setArticles(data || []);
  };

  /* ================= FETCH COMMENTS ================= */

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*");

    if (!error) setComments(data || []);
  };

  /* ================= FETCH REPLIES ================= */

  const fetchReplies = async () => {
    const { data, error } = await supabase
      .from("replies")
      .select("*");

    if (!error) setReplies(data || []);
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

if (!error) {
  // 🔔 CREATE NOTIFICATION
  await supabase.from("notifications").insert([
    {
      user_id: articleId, // temporary (we improve later)
      message: "Someone commented on your article",
    },
  ]);

  setCommentText({
    ...commentText,
    [articleId]: "",
  });

  fetchComments();
}
  };

  /* ================= ADD REPLY ================= */

  const addReply = async (commentId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Login first!");
      return;
    }

    const { error } = await supabase.from("replies").insert([
      {
        comment_id: commentId,
        content: replyText[commentId] || "",
        user_id: user.id,
      },
    ]);

    if (!error) {
      setReplyText({
        ...replyText,
        [commentId]: "",
      });
      fetchReplies();
    } else {
      alert(error.message);
    }
  };

  /* ================= INIT ================= */

  useEffect(() => {
    fetchArticles();
    fetchComments();
    fetchReplies();
  }, []);

  /* ================= UI ================= */

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>All Articles</h2>

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px auto",
            width: "80%",
            borderRadius: "8px",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content}</p>

          {/* ================= COMMENTS ================= */}

          <div style={{ marginTop: "15px" }}>
            <h4>Comments</h4>

            {comments
              .filter((c) => c.article_id === article.id)
              .map((c) => (
                <div key={c.id} style={{ marginBottom: "10px" }}>
                  <p>• {c.content}</p>

                  {/* ================= REPLIES ================= */}

                  <div style={{ marginLeft: "20px" }}>
                    {replies
                      .filter((r) => r.comment_id === c.id)
                      .map((r) => (
                        <p key={r.id}>↳ {r.content}</p>
                      ))}

                    <input
                      type="text"
                      placeholder="Reply..."
                      value={replyText[c.id] || ""}
                      onChange={(e) =>
                        setReplyText({
                          ...replyText,
                          [c.id]: e.target.value,
                        })
                      }
                    />

                    <button onClick={() => addReply(c.id)}>
                      Reply
                    </button>
                  </div>
                </div>
              ))}

            {/* ================= ADD COMMENT ================= */}

            <input
              type="text"
              placeholder="Add comment"
              value={commentText[article.id] || ""}
              onChange={(e) =>
                setCommentText({
                  ...commentText,
                  [article.id]: e.target.value,
                })
              }
            />

            <button onClick={() => addComment(article.id)}>
              Post
            </button>
          </div>

          <small>
            {new Date(article.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}