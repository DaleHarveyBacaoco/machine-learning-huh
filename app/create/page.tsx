"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createArticle = async () => {
    // ✅ GET LOGGED-IN USER (FIXED VERSION)
    const { data, error: userError } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      alert("You must be logged in");
      return;
    }

    // ✅ INSERT ARTICLE WITH USER ID
    const { error } = await supabase.from("articles").insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Article created!");
      setTitle("");
      setContent("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Create Article</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "10px",
        }}
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          height: "100px",
        }}
      />
      <br /><br />

      <button
        onClick={createArticle}
        style={{
          padding: "10px 20px",
          border: "2px solid black",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Post Article
      </button>
    </div>
  );
}