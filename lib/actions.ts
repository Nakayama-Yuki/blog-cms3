// ブログ機能に関するサーバーアクション
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];

// 記事一覧の取得
export async function getPosts() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return posts;
}

// 記事の作成
export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const { error } = await supabase.from("posts").insert([{ title, content }]);

  if (error) throw error;

  revalidatePath("/blog");
  redirect("/blog");
}

// 記事の更新
export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const { error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id);

  if (error) throw error;

  revalidatePath(`/blog/${id}`);
  redirect(`/blog/${id}`);
}

// 記事の削除
export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/blog");
  redirect("/blog");
}
