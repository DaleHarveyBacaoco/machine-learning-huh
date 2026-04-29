"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#4f46e5",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ fontWeight: "bold" }}>MyApp</div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => router.push("/articles")}>
          Articles
        </button>

        <button onClick={() => router.push("/create")}>
          Create
        </button>

        <button onClick={() => router.push("/notifications")}>
          Notifications
        </button>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}