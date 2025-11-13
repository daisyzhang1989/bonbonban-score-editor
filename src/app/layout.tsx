import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bonbonban Editor",
  description: "リズム譜面エディター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen 
          bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-200 
          text-black
          `}
      >
        {/* 全局容器 */}
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
