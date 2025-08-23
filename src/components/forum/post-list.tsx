"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { PostCard } from "./post-card";
import type { ForumFilters } from "./toolbar";

type Post = {
  id: string;
  title: string;
  body: string;
  tag: "Looks" | "Care" | "Ideas" | "Swap";
  upvotes: number;
  author_name: string | null;
  image_path: string | null;
  created_at: string;
};

export function PostList({ filters }: { filters: ForumFilters }) {
  const sb = supabaseBrowser();
  const [all, setAll] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await sb
      .from("forum_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setAll((data || []) as Post[]);
    setLoading(false);
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await sb
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setAll((data || []) as Post[]);
      setLoading(false);
    })();
  }, [sb]);
  // client-side filtering
  const q = filters.q.trim().toLowerCase();
  let posts = all.filter((p) => {
    const tagOk = filters.tag === "All" || p.tag === filters.tag;
    if (!tagOk) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      (p.author_name || "").toLowerCase().includes(q)
    );
  });

  // sort
  posts =
    filters.sort === "top"
      ? [...posts].sort((a, b) => b.upvotes - a.upvotes)
      : [...posts].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

  if (loading)
    return <p className="text-sm text-[color:var(--muted)]">Loading…</p>;

  return (
    <div className="grid gap-4">
      {posts.length === 0 && (
        <p className="text-sm text-[color:var(--muted)]">
          No posts match your filters.
        </p>
      )}
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
