/**
 * ブログ記事データを取得し表示するサーバーコンポーネント
 * データ取得をSuspenseと組み合わせて使用
 */
import { getPosts } from "@/lib/blog.actions";
import PostList from "@/components/blog/PostList";

/**
 * ブログ記事データを取得して表示するサーバーコンポーネント
 * このコンポーネントは Suspense と組み合わせて使用される
 * @returns 記事リストコンポーネント
 */
export default async function BlogPosts() {
  // サーバーコンポーネント内でデータを非同期取得
  // この処理が Suspense の対象となる
  const posts = await getPosts();

  // 取得したデータを PostList に渡す
  return <PostList posts={posts} />;
}
