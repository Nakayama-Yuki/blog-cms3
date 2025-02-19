// 個別記事ページ
import { createClient } from "@/utils/supabase/server";
import PostDetail from "@/components/blog/PostDetail";
import { notFound } from "next/navigation";

async function BlogPost({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params; // paramsを先にawaitする

  // より安全な認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 投稿データを取得
  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", id) // awaitしたidを使用
    .single();

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} user={user} />; // sessionの代わりにuserを渡す
}

export default BlogPost;
