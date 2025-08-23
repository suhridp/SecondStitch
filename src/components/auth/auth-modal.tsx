"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const sb = supabaseBrowser();
  const [email, setEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const redirectTo = `${
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    }`;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setSending(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function signInGoogle() {
    const redirectTo = `${
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    }`;
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md card p-6 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Sign in</h3>
          <button className="text-sm underline" onClick={onClose}>
            Close
          </button>
        </div>

        <button onClick={signInGoogle} className="btn btn-outline w-full mt-4">
          Continue with Google
        </button>

        <div className="my-4 text-center text-xs text-slate-500">or</div>

        <form onSubmit={sendMagicLink} className="grid gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-xl border px-4 py-2"
          />
          <button disabled={sending} className="btn btn-primary">
            {sending ? "Sending…" : "Send magic link"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {sent && (
            <p className="text-sm text-emerald-600">
              Check your email for a sign‑in link.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
