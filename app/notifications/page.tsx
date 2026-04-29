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
 <div className="container">
  <h2>Notifications 🔔</h2>

  {notifications.length === 0 && <p>No notifications yet.</p>}

  {notifications.map((n) => (
    <div key={n.id} className="card">
      <p>{n.message}</p>
    </div>
  ))}
</div>
  );
}