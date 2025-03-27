import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// クラス名を効率的に管理するためのユーティリティ関数
// 条件付きクラス名の適用やTailwindのユーティリティクラス間の衝突を自動的に処理できる
// これにより、クラス名の結合やマージが簡単になります
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
