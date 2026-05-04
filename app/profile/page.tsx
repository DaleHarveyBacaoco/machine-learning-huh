"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
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
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          background: "#fff",
          textAlign: "center",
        }}
      >
        {/* PROFILE IMAGE */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#E5E7EB",
            margin: "0 auto 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          Photo
        </div>

        {/* EMAIL */}
        <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
          {user?.email}
        </h2>

        {/* CREATED DATE */}
        <p style={{ color: "#6B7280", fontSize: "13px" }}>
          Joined:{" "}
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "Loading..."}
        </p>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            background: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
