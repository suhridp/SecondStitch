"use client";
import * as React from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase-browser";

function publicUrl(path?: string | null) {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${path}`;
}

export function PostCard({ post }: { post: any }) {
  const sb = supabaseBrowser();
  const [up, setUp] = React.useState<number>(post.upvotes ?? 0);

  async function handleUpvote() {
    const { data: sess } = await sb.auth.getSession();
    if (!sess.session) {
      alert("Please sign in to upvote.");
      return;
    }
    await sb.rpc("increment_upvote", { post_id: post.id });
    setUp((v) => v + 1);
  }

  const img = publicUrl(post.image_path);
  const d = new Date(post.created_at);

  return (
    <article className="card p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {post.tag}
        </span>
        <button
          className="btn btn-outline h-8 px-3 text-xs"
          onClick={handleUpvote}
        >
          ▲ {up}
        </button>
      </div>

      <h3 className="mt-3 font-medium leading-tight">{post.title}</h3>
      <p className="mt-2 text-[color:var(--muted)] text-[15px]">{post.body}</p>

      {img && (
        <div className="mt-3 relative w-full aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={img} alt="" fill className="object-cover" />
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        by {post.author_name || "Anon"} · {d.toLocaleDateString()}
      </div>
    </article>
  );
}
