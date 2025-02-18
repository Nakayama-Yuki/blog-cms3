//記事編集ページ

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostForm from "@/components/blog/PostForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPost({ params }: Props) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // 記事データの取得
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post) {
    return redirect("/blog");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">記事の編集</h1>
      <PostForm post={post} />
    </div>
  );
}