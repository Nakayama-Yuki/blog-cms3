// 個別記事ページ
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import PostDetail from "@/components/blog/PostDetail";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PostDetail post={post} />
    </div>
  );
}
