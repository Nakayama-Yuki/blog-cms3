"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/blog", label: "ブログ一覧" },
    { href: "/protected/blog", label: "マイブログ管理" },
    { href: "/protected/blog/create", label: "新規記事作成" },
  ];

  return (
    <nav className="w-64 min-h-screen border-r border-gray-200 p-4">
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
              )}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
