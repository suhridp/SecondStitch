"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Modal } from "@/components/ui/modal";

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
  const [msg, setMsg] = React.useState<string | null>(null);

  async function google() {
    setMsg(null);
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  async function magicLink(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSending(true);
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setSending(false);
    if (error) setMsg(error.message);
    else setMsg("Magic link sent. Check your inbox.");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Account
            </p>
            <h2 id="modal-title" className="mt-1 text-xl font-semibold">
              Sign in to Second Stitch
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <button onClick={google} className="btn btn-primary w-full">
            Continue with Google
          </button>

          <div className="relative text-center">
            <span className="px-3 text-xs text-slate-500 bg-white relative z-10">
              or
            </span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />
          </div>

          <form onSubmit={magicLink} className="grid gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-xl border px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={sending} className="btn btn-outline">
              {sending ? "Sending…" : "Send magic link"}
            </button>
          </form>

          {msg && <p className="text-sm mt-1">{msg}</p>}

          <p className="mt-2 text-xs text-slate-500">
            By continuing you agree to our Terms and acknowledge our Privacy
            Policy.
          </p>
        </div>
      </div>
    </Modal>
  );
}
