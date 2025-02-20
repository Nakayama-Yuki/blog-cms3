// ブログ記事一覧ページ

import { getPosts } from "@/lib/blog.actions";
import PostList from "@/components/blog/PostList";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">記事一覧</h1>
      <PostList posts={posts} />
    </div>
  );
}
