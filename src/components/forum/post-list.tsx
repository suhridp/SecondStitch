"use client";
import * as React from "react";
import { loadPosts, type ForumPost } from "@/lib/forum";
import { PostCard } from "./post-card";

export function PostList() {
  const [posts, setPosts] = React.useState<ForumPost[]>([]);

  React.useEffect(() => {
    setPosts(loadPosts());
  }, []);

  return (
    <div className="grid gap-4">
      {posts.length === 0 && (
        <p className="text-slate-600 text-sm">
          No posts yet. Be the first to share.
        </p>
      )}
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
