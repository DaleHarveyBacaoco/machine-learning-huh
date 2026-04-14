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
    window.location.href = "/"; // back to landing page
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px"
    }}>
      <h1>Dashboard </h1>

      <p>
        Welcome: {user?.email}
      </p>

      <button
        onClick={logout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "2px solid black",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}