"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Link from "next/link";

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
    fetchNotifications();
  }, []);
const fetchNotifications = async () => {
  const { data: userData } = await supabase.auth.getUser();

  const user = userData?.user;

  if (!user) return;

  console.log("LOGGED USER:", user.id);

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  setNotifications(data || []);
};


  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Notifications 🔔</h2>

        {notifications.length === 0 && <p>No notifications yet.</p>}

        {notifications.map((n) => (
          <Link href={`/articles/${n.article_id}`}>
  <div
    className="card"
    style={{ cursor: "pointer" }}
  >
    <p>{n.message}</p>
    <small>Click to view article</small>
  </div>
</Link>
        ))}
      </div>
    </>
  );
}