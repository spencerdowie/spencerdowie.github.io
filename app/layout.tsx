import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Spencer Dowie - Portfolio",
  description: "Web Dev Portfolio"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="ps-4 py-3 bg-gray-900 flex flex-row items-center">
          <h1 className="text-4xl/7 font-bold text-white absolute">Spencer Dowie</h1>
          <div className="flex flex-row flex-1 justify-center items-center gap-5">
            <div>LinkedIn BSky GitHub</div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
