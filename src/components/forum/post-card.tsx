"use client";
import * as React from "react";
import type { ForumPost } from "@/lib/forum";
import { upvote } from "@/lib/forum";

export function PostCard({ post }: { post: ForumPost }) {
  const [count, setCount] = React.useState(post.upvotes);
  function handleUpvote() {
    upvote(post.id);
    setCount((c) => c + 1);
  }
  const d = new Date(post.createdAt);
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
          ▲ {count}
        </button>
      </div>
      <h3 className="mt-3 font-medium leading-tight">{post.title}</h3>
      <p className="mt-2 text-slate-700 text-[15px]">{post.body}</p>
      <div className="mt-4 text-xs text-slate-500">
        by {post.author} · {d.toLocaleDateString()}
      </div>
    </article>
  );
}
