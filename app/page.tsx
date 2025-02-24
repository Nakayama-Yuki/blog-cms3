import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-4">
      <h1 className="text-4xl font-bold text-center">
        CMS風ブログサイトへようこそ
      </h1>

      <div className="max-w-2xl text-center space-y-4">
        <p className="text-lg text-gray-600">
          このサイトでは、記事の投稿・編集・削除などの機能を提供しています。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            記事一覧を見る
          </Link>
          <Link
            href="/sign-up"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            アカウントを作成
          </Link>
        </div>
      </div>
    </div>
  );
}
