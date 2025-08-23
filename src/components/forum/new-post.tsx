"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const TAGS = ["Looks", "Care", "Ideas", "Swap"] as const;

export function NewPost({ onCreated }: { onCreated?: () => void }) {
  const sb = supabaseBrowser();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [tag, setTag] = React.useState<(typeof TAGS)[number]>("Looks");
  const [image, setImage] = React.useState<File | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { data: sess } = await sb.auth.getSession();
      const user = sess.session?.user ?? null;

      // optional image upload
      let image_path: string | undefined;
      if (image) {
        const key = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
        const { error: upErr } = await sb.storage
          .from("community-images")
          .upload(key, image, { upsert: false });
        if (upErr) throw upErr;
        image_path = `community-images/${key}`;
      }

      // insert post
      const { error: insErr } = await sb.from("forum_posts").insert([
        {
          author_id: user?.id ?? null,
          author_name: author || user?.email || "Anon",
          title,
          body,
          tag,
          image_path,
        },
      ]);
      if (insErr) throw insErr;

      // 👇 award badges (first_post / community_star) asynchronously
      fetch("/api/badges/award", { method: "POST" }).catch(() => {});

      setTitle("");
      setBody("");
      setAuthor("");
      setTag("Looks");
      setImage(null);
      onCreated?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 grid gap-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          className="rounded-xl border px-4 py-2"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value as any)}
          className="rounded-xl border px-4 py-2"
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        placeholder="Write your post…"
        className="rounded-xl border px-4 py-2 h-28"
      />
      <div className="grid md:grid-cols-[1fr_auto] gap-3">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="rounded-xl border px-4 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button disabled={saving} className="btn btn-primary">
          {saving ? "Posting…" : "Publish"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}
