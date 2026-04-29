"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

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

      {notifications.map((n) => (
        <p key={n.id}>{n.message}</p>
      ))}
    </div>
  );
}