// ブログ機能に関するサーバーアクション
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Post } from "@/types/supabase";
import { z } from "zod";

// 投稿のバリデーションスキーマ
const postSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
});

// アクションレスポンスの型
export type PostActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
  post?: Post;
};

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

// 投稿作成アクション
export async function createPost(
  prevState: PostActionResponse | null,
  formData: FormData
): Promise<PostActionResponse> {
  try {
    // Supabaseクライアントの初期化
    const supabase = await createClient();

    // ユーザー認証の確認
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // 認証エラーまたはユーザーが存在しない場合
    if (userError || !user) {
      return {
        success: false,
        message: "投稿するにはログインが必要です",
      };
    }

    // フォームデータの解析
    const rawData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    // バリデーション
    const validatedData = postSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "フォームの入力内容に問題があります",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // データベースに新規投稿を保存
    const { data: newPost, error } = await supabase
      .from("posts")
      .insert({
        ...validatedData.data,
        user_id: user.id, // 投稿者のユーザーIDを保存
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase投稿作成エラー:", error);
      return {
        success: false,
        message: "データベースへの保存中にエラーが発生しました",
      };
    }

    // パスの再検証（キャッシュの更新）
    revalidatePath("/blog");

    return {
      success: true,
      message: "投稿が正常に作成されました！",
      post: newPost,
    };
  } catch (error) {
    console.error("投稿作成エラー:", error);
    return {
      success: false,
      message: "投稿の作成中にエラーが発生しました",
    };
  }
}

// 投稿更新アクション
export async function updatePost(
  id: string,
  prevState: PostActionResponse | null,
  formData: FormData
): Promise<PostActionResponse> {
  try {
    // Supabaseクライアントの初期化
    const supabase = await createClient();

    // ユーザー認証の確認
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // 認証エラーまたはユーザーが存在しない場合
    if (userError || !user) {
      return {
        success: false,
        message: "編集するにはログインが必要です",
      };
    }

    // 対象の投稿を取得して権限チェック
    const { data: existingPost, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return {
        success: false,
        message: "投稿の取得中にエラーが発生しました",
      };
    }

    // 投稿者本人かどうか確認（または管理者権限の確認）
    if (existingPost.user_id !== user.id) {
      return {
        success: false,
        message: "この投稿を編集する権限がありません",
      };
    }

    // フォームデータの解析
    const rawData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    // バリデーション
    const validatedData = postSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "フォームの入力内容に問題があります",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // 投稿を更新
    const { data: updatedPost, error: updateError } = await supabase
      .from("posts")
      .update({
        ...validatedData.data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Supabase投稿更新エラー:", updateError);
      return {
        success: false,
        message: "データベースの更新中にエラーが発生しました",
      };
    }

    // パスの再検証（キャッシュの更新）
    revalidatePath(`/blog/${id}`);
    revalidatePath("/blog");

    return {
      success: true,
      message: "投稿が正常に更新されました！",
      post: updatedPost,
    };
  } catch (error) {
    console.error("投稿更新エラー:", error);
    return {
      success: false,
      message: "投稿の更新中にエラーが発生しました",
    };
  }
}

// 投稿削除アクション
export async function deletePost(id: string) {
  const supabase = await createClient();

  // ユーザー認証の確認
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // 認証エラーまたはユーザーが存在しない場合
  if (userError || !user) {
    throw new Error("削除するにはログインが必要です");
  }

  // 対象の投稿を取得して権限チェック
  const { data: existingPost, error: fetchError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("投稿の取得中にエラーが発生しました");
  }

  // 投稿者本人かどうか確認（または管理者権限の確認）
  if (existingPost.user_id !== user.id) {
    throw new Error("この投稿を削除する権限がありません");
  }

  // 削除処理の実行
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/blog");
  redirect("/blog");
}
