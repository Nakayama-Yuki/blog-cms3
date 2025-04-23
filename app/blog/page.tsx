// ブログ記事一覧ページ
// React 19 と Next.js 15 の Suspense パターンを活用

import { Suspense } from "react";
import BlogPosts from "@/components/blog/BlogPosts";

/**
 * ブログ一覧ページのメインコンポーネント
 * Suspense を使用してストリーミング SSR を実現
 * @returns ブログページのUI
 */
export default function BlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">記事一覧</h1>

      {/* Suspense でデータ取得処理を含むコンポーネントを囲み、ストリーミングSSRを実現 */}
      <Suspense fallback={<p className="py-4">記事を読み込み中...</p>}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}
