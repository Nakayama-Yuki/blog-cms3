//記事一覧表示

import Link from "next/link";

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.content.substring(0, 100)}...</p>
        </article>
      ))}
    </div>
  );
}

export default PostList;
