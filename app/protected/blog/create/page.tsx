//記事作成ページ

import PostForm from "@/components/blog/PostForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">新規記事作成</h1>
      <PostForm />
    </div>
  );
}
