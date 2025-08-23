"use client";
import * as React from "react";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabase";
import { AuthModal } from "@/components/auth/auth-modal";
import { supabaseBrowser } from "@/lib/supabase-browser";
// ...

export function UserMenu() {
  const sb = supabaseBrowser();
  const [session, setSession] = React.useState<
    Awaited<ReturnType<typeof sb.auth.getSession>>["data"]["session"] | null
  >(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_event, sess) =>
      setSession(sess)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await sb.auth.signOut();
  }

  if (!session) {
    return (
      <>
        <button className="btn btn-outline" onClick={() => setOpen(true)}>
          Sign in
        </button>
        <AuthModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  const user = session.user;
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const name = (user.user_metadata?.name as string | undefined) || user.email;

  return (
    <div className="relative">
      <details className="group">
        <summary className="list-none inline-flex items-center gap-2 cursor-pointer rounded-xl border border-[var(--border)] px-3 py-2">
          {avatar ? (
            <Image
              src={avatar}
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <div className="h-5 w-5 rounded-full bg-[var(--accent-strong)]" />
          )}
          <span className="text-sm">{name}</span>
        </summary>
        <div className="absolute right-0 mt-2 w-48 card p-2 bg-white">
          <a
            href="/rewards"
            className="block px-3 py-2 text-sm hover:underline"
          >
            Rewards
          </a>
          <a
            href="/community"
            className="block px-3 py-2 text-sm hover:underline"
          >
            Community
          </a>
          <button
            onClick={signOut}
            className="block w-full text-left px-3 py-2 text-sm hover:underline"
          >
            Sign out
          </button>
        </div>
      </details>
    </div>
  );
}
