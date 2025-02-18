"use client";

import { Database } from "@/types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];

// 記事作成/編集フォーム
import { createPost, updatePost } from "@/lib/blog.actions";

function PostForm({ post }: { post: Post }) {
  // 編集時はupdatePostアクションを使用し、idをbindする
  const handleSubmit = post?.id
    ? updatePost.bind(null, post.id.toString())
    : createPost;

  return (
    <form action={handleSubmit}>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2">
            タイトル
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="border rounded-md p-2"
            defaultValue={post?.title} // defaultValueの設定が必要
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="mb-2">
            本文
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="border rounded-md p-2"
            defaultValue={post?.content || ""} // nullの場合は空文字を設定
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          {post?.id ? "編集を保存する" : "投稿する"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
