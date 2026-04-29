"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    if (!user) {
      alert("You must be logged in!");
      return;
    }

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Article</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}