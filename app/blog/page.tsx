// ブログ記事一覧ページ

import { getPosts } from "@/lib/blog.actions";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>ブログ記事一覧</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
