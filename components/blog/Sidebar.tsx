"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // react-featherの代わりにlucide-reactを使用

function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/blog", label: "ブログ一覧" },
    { href: "/protected/blog", label: "マイブログ管理" },
    { href: "/protected/blog/create", label: "新規記事作成" },
  ];

  return (
    <>
      {/* モバイル用ハンバーガーメニューボタン */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X className="h-6 w-6" /> // メニューを閉じるアイコン
        ) : (
          <Menu className="h-6 w-6" /> // ハンバーガーメニューアイコン
        )}
      </button>

      {/* オーバーレイ背景（モバイル時のみ） */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* サイドバー */}
      <nav
        className={cn(
          "fixed lg:static top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">メニュー</h2>
          </div>

          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2 rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
