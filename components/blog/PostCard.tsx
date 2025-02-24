//記事カードコンポーネント

import { Post } from "@/types/supabase";
import Link from "next/link";

function PostCard({ post }: { post: Post }) {
  const createdDate = new Date(post.created_at).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  //取得した日付(UTC)を日本時間に変換
  const updatedDate = post.updated_at
    ? new Date(post.updated_at).toLocaleDateString("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    : null;

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

      <div className="text-sm text-gray-500 flex gap-4">
        <div>作成日: {createdDate}</div>
        {updatedDate && <div>更新日: {updatedDate}</div>}
      </div>
    </article>
  );
}

export default PostCard;
