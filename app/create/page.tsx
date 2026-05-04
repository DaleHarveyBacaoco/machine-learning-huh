"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

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
        <>
  <Navbar />

</>
  );
}