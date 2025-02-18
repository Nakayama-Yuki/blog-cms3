// ブログ記事の詳細を表示するページ

"use client";

import { deletePost } from "@/lib/blog.actions";
import { Database } from "@/types/supabase";

// postsテーブルのRow型を取得
type Post = Database["public"]["Tables"]["posts"]["Row"];

function PostDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-600 text-sm">
            作成日:{" "}
            {post.created_at
              ? new Date(post.created_at).toLocaleDateString()
              : "未設定"}
          </div>

          {/* 削除ボタン */}
          <form action={deletePost.bind(null, post.id.toString())}>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => confirm("本当に削除しますか？")}>
              削除
            </button>
          </form>
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
