// 記事詳細表示
import { Database } from "@/types/supabase";

// postsテーブルのRow型を取得
type Post = Database["public"]["Tables"]["posts"]["Row"];

function PostDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        <div className="text-gray-600 text-sm">
          作成日:{" "}
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : "未設定"}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">{post.title}</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content}
        </div>
      </div>
    </article>
  );
}

export default PostDetail;
