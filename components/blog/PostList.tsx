//記事一覧表示

import { Database } from "@/types/supabase";
import Link from "next/link";

// postsテーブルのRow型を取得
type Post = Database["public"]["Tables"]["posts"]["Row"];

function PostList({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{(post.content ?? "").substring(0, 100)}...</p>
        </article>
      ))}
    </div>
  );
}

export default PostList;
