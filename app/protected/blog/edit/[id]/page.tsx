//記事編集ページ

import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import PostForm from "@/components/blog/PostForm";
import { Post } from "@/types/supabase";
//以前は同期的だったランタイム情報に依存する Dynamic API（このアプリだとparams と searchParams） は、現在(nextjs15)では非同期です。
// 型定義
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPost({ params }: Props) {
  const supabase = await createClient();
  // paramsをawaitして取得
  const { id } = await params;

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  // 記事データの取得
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">記事の編集</h1>
      <PostForm post={post as Post} />
    </div>
  );
}
