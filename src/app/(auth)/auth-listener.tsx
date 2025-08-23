"use client";
import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function AuthListener() {
  useEffect(() => {
    const sb = supabaseBrowser();
    const { data } = sb.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: session.user.id,
            name: session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url,
          }),
        });
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return null;
}
