"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

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
  <>
    <Navbar />

    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Dashboard</h1>

      <p>Welcome!: {user?.email}</p>
    </div>
  </>
);

}