"use client";
import * as React from "react";
import { NewPost } from "@/components/forum/new-post";
import { PostList } from "@/components/forum/post-list";
import { ForumToolbar, type ForumFilters } from "@/components/forum/toolbar";

export default function CommunityClient() {
  const [refresh, setRefresh] = React.useState(0);
  const [filters, setFilters] = React.useState<ForumFilters>({
    tag: "All",
    q: "",
    sort: "new",
  });

  return (
    <>
      <NewPost onCreated={() => setRefresh((r) => r + 1)} />
      <div className="mt-6">
        <ForumToolbar value={filters} onChange={setFilters} />
      </div>
      <div className="mt-6">
        <PostList key={refresh} filters={filters} />
      </div>
    </>
  );
}
