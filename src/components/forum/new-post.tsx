"use client";
import * as React from "react";
import { createPost } from "@/lib/forum";

const TAGS = ["Looks", "Care", "Ideas", "Swap"] as const;

type Props = { onCreate?: () => void };

export function NewPost({ onCreate }: Props) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [tag, setTag] = React.useState<(typeof TAGS)[number]>("Looks");
  const [saving, setSaving] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    createPost({ title, body, author: author || "Anon", tag });
    setTitle("");
    setBody("");
    setAuthor("");
    setTag("Looks");
    setSaving(false);
    onCreate?.();
  }

  return (
    <form onSubmit={submit} className="card p-5 grid gap-3">
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
        <button disabled={saving} className="btn btn-primary">
          {saving ? "Posting…" : "Publish"}
        </button>
      </div>
    </form>
  );
}
