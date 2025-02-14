"use client";

// 記事作成/編集フォーム
import { createPost } from "@/lib/blog.actions";

function PostForm() {
  return (
    <form action={createPost}>
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
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          投稿
        </button>
      </div>
    </form>
  );
}

export default PostForm;
