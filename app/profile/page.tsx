"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
const loadUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // 🔍 check profile
  let { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 🚨 IF NOT EXISTS → CREATE
  if (!profileData) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          username: user.email?.split("@")[0],
        },
      ])
      .select()
      .single();

    profileData = newProfile;
  }

  setProfile(profileData);
};
    loadUser();
  }, []);

  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);

    const filePath = `${user.id}/${file.name}`;

    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true });

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    const avatarUrl = data?.publicUrl;

    await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    setProfile({ ...profile, avatar_url: avatarUrl });
    setUploading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
        {/* AVATAR */}
        <div>
          <img
            src={profile?.avatar_url}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #E5E7EB",
            }}
          />
        </div>

        {/* UPLOAD */}
        <input type="file" onChange={uploadAvatar} />
        {uploading && <p>Uploading...</p>}

        {/* USERNAME */}
        <h2>{profile?.username || user?.email}</h2>

        {/* EMAIL */}
        <p>{user?.email}</p>

        {/* DATE */}
        <p style={{ color: "gray" }}>
          Joined:{" "}
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : ""}
        </p>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            marginTop: 20,
            padding: "10px 15px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: 8,
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}