// src/components/auth/user-menu.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function UserMenu() {
  const sb = supabaseBrowser();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    sb.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = sb.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null)
    );
    return () => data.subscription.unsubscribe();
  }, []);

  async function signInGoogle() {
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}` },
    });
  }

  async function sendMagicLink() {
    const email = prompt("Enter your email for a magic link");
    if (!email) return;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}` },
    });
    if (error) alert(error.message);
    else alert("Check your email!");
  }

  async function signOut() {
    await sb.auth.signOut();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={signInGoogle} className="btn btn-outline">
          Sign in
        </button>
        <button onClick={sendMagicLink} className="btn btn-ghost text-sm">
          Magic link
        </button>
      </div>
    );
  }

  const name = user.user_metadata?.name || user.email;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {name}</span>
      <Link href="/rewards" className="btn btn-ghost text-sm">
        Rewards
      </Link>
      <button onClick={signOut} className="btn btn-outline">
        Sign out
      </button>
    </div>
  );
}
