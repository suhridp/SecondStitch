// src/app/(auth)/user-menu.tsx
"use client";

import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function UserMenu() {
  const sb = supabaseBrowser();
  const [user, setUser] = React.useState<User | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await sb.auth.getUser();
      if (mounted) setUser(data.user ?? null);
    }
    load();

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signInGoogle() {
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}` },
    });
  }

  async function sendMagicLink() {
    const email = prompt("Enter your email for a magic link:");
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
    location.reload();
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

  const name = user.user_metadata?.name || user.email || "Account";
  return (
    <div className="relative">
      <button className="btn btn-ghost" onClick={() => setOpen((v) => !v)}>
        {name.split("@")[0]}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-[var(--border)] bg-white p-2 shadow-soft"
        >
          <a
            href="/profile"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
          >
            Profile
          </a>
          <a
            href="/rewards"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
          >
            Rewards
          </a>
          <button
            className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
