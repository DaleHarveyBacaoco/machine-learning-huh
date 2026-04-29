"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Notification = {
  id: string;
  user_id: string;
  message: string;
  article_id: string;
  created_at: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications(data || []);
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notifications 🔔</h2>

      {/* EMPTY STATE */}
      {notifications.length === 0 && <p>No notifications yet.</p>}

      {/* NOTIFICATION LIST */}
      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            margin: "10px auto",
            width: "70%",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <p>{n.message}</p>

          {/* VIEW BUTTON */}
          {n.article_id && (
            <button
              onClick={() =>
                (window.location.href = `/articles#${n.article_id}`)
              }
              style={{
                marginTop: "8px",
                padding: "5px 10px",
                border: "1px solid black",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Article
            </button>
          )}
        </div>
      ))}
    </div>
  );
}