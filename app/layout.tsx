import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Sidebar from "@/components/blog/Sidebar";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CMS風ブログサイト",
  description: "Supabaseを使ったCMS風ブログサイト",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="min-h-screen flex flex-col">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex-1 flex items-center">
                  <div className="lg:flex-none flex justify-center w-full lg:w-auto">
                    <Link href={"/"} className="pl-12 lg:pl-0">
                      CMS風ブログサイト
                    </Link>
                  </div>
                </div>
                <HeaderAuth />
              </div>
            </nav>

            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8">{children}</main>
            </div>

            <footer className="w-full border-t">
              <div className="max-w-7xl mx-auto flex items-center justify-center text-xs gap-8 py-16">
                <p>Powered by Supabase</p>
                <ThemeSwitcher />
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
