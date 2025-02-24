"use client";

import { deletePost } from "@/lib/blog.actions";
import { Post } from "@/types/supabase";
import {} from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

function PostDetail({ post, user }: { post: Post; user: User | null }) {
  const isAuthorized = user?.id === post.user_id;
  //supabaseで保存した日付はUTCで保存しているため
  //取得した日付(UTC)を日本時間に変換
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
    <article className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {/* 日付表示部分を修正 */}
          <div className="text-sm text-gray-500 flex w-full mr-4 gap-4">
            <div>作成日: {createdDate}</div>
            {updatedDate && <div>更新日: {updatedDate}</div>}
          </div>

          {/* 認証済みかつ投稿者本人の場合のみ編集・削除ボタンを表示 */}
          {isAuthorized && (
            <div className="space-x-2">
              {/* 編集ボタンを追加 */}
              <Link
                href={`/protected/blog/edit/${post.id}`}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                編集
              </Link>

              <form
                action={deletePost.bind(null, post.id.toString())}
                className="inline">
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
            </div>
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
