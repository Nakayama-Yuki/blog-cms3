// 個別記事ページ
import { createClient } from "@/utils/supabase/server";
import PostDetail from "@/components/blog/PostDetail";
import { notFound } from "next/navigation";

// 型定義を正しく設定
interface BlogPostProps {
  params: Promise<{ id: string }>;
}

// paramsをPromiseとして扱うように修正
async function BlogPost({ params }: BlogPostProps) {
  const supabase = await createClient();
  const { id } = await params; // paramsをawaitする

  // より安全な認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 投稿データを取得
  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} user={user} />;
}

export default BlogPost;
