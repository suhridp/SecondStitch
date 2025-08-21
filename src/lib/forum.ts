export type ForumPost = {
  id: string;
  author: string;
  title: string;
  body: string;
  tag: "Looks" | "Care" | "Ideas" | "Swap";
  createdAt: number;
  upvotes: number;
};

const KEY = "ss_forum_posts";

export function loadPosts(): ForumPost[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePosts(posts: ForumPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function createPost(
  p: Omit<ForumPost, "id" | "createdAt" | "upvotes">
): ForumPost {
  const post: ForumPost = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    upvotes: 0,
    ...p,
  };
  const posts = [post, ...loadPosts()];
  savePosts(posts);
  return post;
}

export function upvote(id: string) {
  const posts = loadPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx > -1) {
    posts[idx].upvotes += 1;
    savePosts(posts);
  }
}
