//記事の投稿・編集フォーム
"use client";

import { useActionState } from "react";
import { Post } from "@/types/supabase";
import { createPost, updatePost, PostActionResponse } from "@/lib/blog.actions";
import { CheckCircle2, Loader2 } from "lucide-react";
import Form from "next/form";

// 初期状態
const initialState: PostActionResponse = {
  success: false,
  message: "",
};

function PostForm({ post }: { post?: Post }) {
  // 適切なアクションを選択（編集時はupdatePost、新規作成時はcreatePost）
  const action = post?.id
    ? updatePost.bind(null, post.id.toString())
    : createPost;

  // useActionStateを使用してフォームの状態を管理
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Form action={formAction} className="space-y-6">
      <div className="space-y-4">
        {/* 必須項目の説明 */}
        <p className="text-sm text-gray-500">
          <span className="text-red-500">*</span> は必須入力項目です
        </p>

        {/* タイトル入力フィールド */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium">
            タイトル{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className={`border rounded-md p-2 ${state?.errors?.title ? "border-red-500" : ""}`}
            defaultValue={post?.title || ""}
            aria-describedby="title-error"
          />
          {/* タイトルのエラーメッセージ表示 */}
          {state?.errors?.title && (
            <p id="title-error" className="mt-1 text-sm text-red-500">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        {/* 本文入力フィールド */}
        <div className="flex flex-col">
          <label htmlFor="content" className="mb-2 font-medium">
            本文{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className={`border rounded-md p-2 ${state?.errors?.content ? "border-red-500" : ""}`}
            defaultValue={post?.content || ""}
            aria-describedby="content-error"
          />
          {/* 本文のエラーメッセージ表示 */}
          {state?.errors?.content && (
            <p id="content-error" className="mt-1 text-sm text-red-500">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        {/* 成功/エラーメッセージ表示エリア */}
        {state?.message && (
          <div
            className={`p-3 rounded-md ${state.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            <div className="flex items-center">
              {state.success && <CheckCircle2 className="h-4 w-4 mr-2" />}
              <p>{state.message}</p>
            </div>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors w-full md:w-auto">
          {isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {post?.id ? "保存中..." : "投稿中..."}
            </span>
          ) : post?.id ? (
            "編集を保存する"
          ) : (
            "投稿する"
          )}
        </button>
      </div>
    </Form>
  );
}

export default PostForm;
