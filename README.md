# Blog CMS システム

Next.js 15とSupabaseを活用した、ブログコンテンツ管理システムです。

## 技術スタック

- **フロントエンド**: Next.js 15、React 19、Tailwind CSS v4
- **言語**: TypeScript v5
- **バックエンド**: Supabase（認証・データストレージ）

## 主な機能

- 📝 記事の作成・編集・削除
- 🔒 ユーザー認証システム
- 🛡️ 保護されたルート
- 🎨 レスポンシブデザイン

## インストール方法

```bash
# リポジトリをクローン
git clone <リポジトリURL>

# 依存関係のインストール
pnpm install

# 環境変数の設定
# .env.localファイルを編集してSupabaseの認証情報を追加
cp .env.local.example .env.local

# 開発サーバーを起動
pnpm dev
```

## 使用方法

1. `/sign-in` からログイン
2. `/protected/blog/create` で新しい記事を作成
3. `/protected/blog/edit/[id]` で既存の記事を編集

## 開発ガイドライン

- コンポーネントは関数コンポーネントとして実装
- TypeScriptの型を適切に活用
- Tailwind CSSでスタイリング

## ライセンス

MIT
