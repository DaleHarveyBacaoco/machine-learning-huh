"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createArticle = async () => {
    // 🔐 GET LOGGED-IN USER
    const { data, error: userError } = await supabase.auth.getUser();
    const user = data?.user;

    if (userError) {
      alert(userError.message);
      return;
    }

    if (!user) {
      alert("You must be logged in");
      return;
    }

    // 📝 INSERT ARTICLE WITH OWNER ID
    const { error } = await supabase.from("articles").insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Article created!");

    // reset form
    setTitle("");
    setContent("");
  };

  return (
  <div className="container">
  <div className="card">
    <h2>Create Article</h2>

    <input
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      placeholder="Write your article..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    <button onClick={createArticle}>
      Post Article
    </button>
  </div>
</div>
  );
}