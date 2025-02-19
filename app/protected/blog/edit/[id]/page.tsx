//記事編集ページ

import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import PostForm from "@/components/blog/PostForm";
import { Post } from "@/types/supabase";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPost({ params }: Props) {
  const supabase = await createClient();
  // paramsを分割代入して先に取得
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
    .eq("id", id) // 分割代入したidを使用
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
