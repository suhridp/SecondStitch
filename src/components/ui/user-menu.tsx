"use client";
import * as React from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { AuthModal } from "./auth-modal";

export function UserMenu() {
  const sb = supabaseBrowser();
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    sb.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = sb.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setOpen(false); // close modal after successful sign-in
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await sb.auth.signOut();
  }

  if (!user) {
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-outline">
          Sign in
        </button>
        <AuthModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  const name = user.user_metadata?.name || user.email;
  return (
    <div className="flex items-center gap-3">
      <Link href="/rewards" className="btn btn-ghost text-sm">
        Rewards
      </Link>
      <span className="hidden sm:inline text-sm text-slate-600">
        Hi, {name}
      </span>
      <button onClick={signOut} className="btn btn-outline">
        Sign out
      </button>
    </div>
  );
}
