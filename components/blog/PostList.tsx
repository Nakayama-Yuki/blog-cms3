//記事一覧表示

import { Post } from "@/types/supabase";
import PostCard from "./PostCard";

function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
