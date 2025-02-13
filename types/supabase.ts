// JSONカラムのデータ型定義 データベースのJSONカラムからデータを取得する際や、JSONデータを保存する際の型チェックに利用されます。
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// supabaseにあるテーブルの型定義
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string | null;
          created_at: string | null;
          id: number;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          id?: number;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          id?: number;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          bio: string | null;
          display_name: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          bio?: string | null;
          display_name?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          bio?: string | null;
          display_name?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
