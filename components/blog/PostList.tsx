//記事一覧表示

import { Database } from "@/types/supabase";
import PostCard from "./PostCard";

// postsテーブルのRow型を取得
type Post = Database["public"]["Tables"]["posts"]["Row"];

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
