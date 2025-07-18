/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Product Store",
  description: "Sản phẩm từ Fake Store API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        {/* Banner trên header */}
        <div className="w-full bg-white shadow-sm">
          <img
            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/e4/d2/e4d215b404d123b25e8b8f5c01ac2f56.png"
            alt="Banner Top Bar"
            className="w-full h-auto"
          />
        </div>

        {/* Header */}
        <header className="bg-[#FFD400] shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-black font-bold text-2xl"
            >
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-The-Gioi-Di-Dong-MWG.png"
                alt="thegioididong logo"
                className="h-6 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span>thegioididong</span>
                <span className="text-sm text-gray-800 text-right -mt-1">
                  .come
                </span>
              </div>
            </Link>

            <nav className="flex flex-wrap gap-4 text-sm font-medium text-black">
              <Link href="#">Điện thoại</Link>
              <Link href="#">Laptop</Link>
              <Link href="#">Phụ kiện</Link>
              <Link href="#">Smartwatch</Link>
              <Link href="#">Đồng hồ</Link>
              <Link href="#">Tablet</Link>
              <Link href="#">Máy cũ</Link>
              <Link href="#">Sim, Thẻ cào</Link>
            </nav>
          </div>
        </header>

        {/* Banner dưới header */}
        <div className="w-full bg-white shadow-sm mt-4">
          <img
            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/dd/b6dd779ce5e8a918cc4f557fce984b16.png"
            alt="PK B2"
            className="w-full h-auto max-w-7xl mx-auto"
          />
        </div>

        {/* Main */}
        <main className="max-w-7xl mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
          © 2025 My Product Store. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
