"use client";

import { deletePost } from "@/lib/blog.actions";
import { Post } from "@/types/supabase";
import { User } from "@supabase/supabase-js";

function PostDetail({
  post,
  user, // sessionをuserに変更
}: {
  post: Post;
  user: User | null; // 型をSessionからUserに変更
}) {
  // user?.idを直接使用するように変更
  const isAuthorized = user?.id === post.user_id;

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

          {/* 認証済みかつ投稿者本人の場合のみ削除ボタンを表示 */}
          {isAuthorized && (
            <form action={deletePost.bind(null, post.id.toString())}>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={(e) => {
                  if (!confirm("本当に削除しますか？")) {
                    e.preventDefault();
                  }
                }}>
                削除
              </button>
            </form>
          )}
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
