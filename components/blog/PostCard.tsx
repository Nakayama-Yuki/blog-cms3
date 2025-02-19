//記事カードコンポーネント

import { Post } from "@/types/supabase";
import Link from "next/link";

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-2">
        {(post.content ?? "").substring(0, 100)}...
      </p>
      <div className="text-sm text-gray-500">
        {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
      </div>
    </article>
  );
}

export default PostCard;
