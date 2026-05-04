"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

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

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h1>{article.title}</h1>

          <p style={{ marginTop: "15px" }}>{article.content}</p>

          <small>
            {new Date(article.created_at).toLocaleString()}
          </small>
        </div>
      </div>
    </>
  );
}