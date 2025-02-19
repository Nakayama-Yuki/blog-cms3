// 個別記事ページ
import { createClient } from "@/utils/supabase/server";
import PostDetail from "@/components/blog/PostDetail";
import { notFound } from "next/navigation";

async function BlogPost({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // セッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 投稿データを取得
  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id)
    .single();

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} session={session} />;
}

export default BlogPost;
