// 記事詳細表示
import { Database } from "@/types/supabase";

// postsテーブルのRow型を取得
type Post = Database["public"]["Tables"]["posts"]["Row"];

function PostDetail({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <div>
        作成日:{" "}
        {post.created_at
          ? new Date(post.created_at).toLocaleDateString()
          : "未設定"}
      </div>
    </article>
  );
}

export default PostDetail;
