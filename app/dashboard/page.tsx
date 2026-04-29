"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Dashboard</h1>

      <p>Welcome: {user?.email}</p>

      <div style={{ marginTop: "30px" }}>
        {/* VIEW ARTICLES */}
        <button
          onClick={() => (window.location.href = "/articles")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          View Articles
        </button>

        {/* CREATE ARTICLE */}
        <button
          onClick={() => (window.location.href = "/create")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Article
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
          }}
        >
          Logout
        </button>
        
        <button
  onClick={() => (window.location.href = "/notifications")}
>
  Notifications
</button>
        
      </div>
    </div>
  );
}