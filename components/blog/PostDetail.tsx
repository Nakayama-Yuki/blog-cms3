// 記事詳細表示

function PostDetail({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <div>作成日: {new Date(post.created_at).toLocaleDateString()}</div>
    </article>
  );
}

export default PostDetail;
