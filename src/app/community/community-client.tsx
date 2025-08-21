"use client";

import * as React from "react";
import { NewPost } from "@/components/forum/new-post";
import { PostList } from "@/components/forum/post-list";

export default function CommunityClient() {
  // Force PostList to re-mount after a new post
  const [refresh, setRefresh] = React.useState(0);

  return (
    <>
      <NewPost onCreate={() => setRefresh((r) => r + 1)} />
      <div className="mt-10">
        <PostList key={refresh} />
      </div>
    </>
  );
}
