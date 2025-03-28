import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * セッション更新機能 - ユーザー認証状態を維持するためのミドルウェア関数
 */

export const updateSession = async (request: NextRequest) => {
  // このtry/catchブロックはインタラクティブチュートリアル用です
  // Supabaseの接続が完了したら削除しても問題ありません
  try {
    // 未変更の初期レスポンスを作成
    // 元のリクエストヘッダーを維持します
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Supabaseのサーバークライアントを初期化
    // 環境変数からURLとアノニマスキーを取得
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // リクエストからすべてのCookieを取得する関数
          getAll() {
            return request.cookies.getAll();
          },

          // レスポンスにCookieを設定する関数
          // 認証セッショントークンの更新時に使用されます
          setAll(cookiesToSet) {
            // まずリクエストにCookieを設定
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );

            // 更新されたリクエストで新しいレスポンスを作成
            response = NextResponse.next({
              request,
            });

            // レスポンスCookieを設定（有効期限などのオプションを含む）
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // セッションが期限切れの場合はリフレッシュ - サーバーコンポーネントに必要
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // 保護されたルート
    // リダイレクト先を/blogに変更
    if (request.nextUrl.pathname.startsWith("/blog") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // リダイレクト先を/blogに変更
    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/blog", request.url));
    }

    return response;
  } catch (e) {
    // Supabaseクライアントを作成できませんでした！
    // これは環境変数が設定されていない可能性があります
    // 詳細は http://localhost:3000 を確認してください
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
