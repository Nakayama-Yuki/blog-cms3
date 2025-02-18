import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import PostList from "@/components/blog/PostList";

export default async function BlogPage() {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // 記事データの取得
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">記事一覧</h1>
        <Link
          href="/protected/blog/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          新規作成
        </Link>
      </div>

      {posts ? <PostList posts={posts} /> : <p>記事が見つかりません</p>}
    </div>
  );
}
