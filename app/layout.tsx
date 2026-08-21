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
          <h1 className="text-4xl/7 font-bold text-white absolute">
            Spencer Dowie
          </h1>
          <div className="flex flex-row flex-1 justify-center items-center gap-5">
            <div className="flex gap-6">
              <a
                className="text-lg font-semibold"
                href="https://www.linkedin.com/in/spencer-dowie/">
                LinkedIn
              </a>
              <a
                className="text-lg font-semibold"
                href="https://github.com/spencerdowie">
                GitHub
              </a>
              <a
                className="text-lg font-semibold"
                href="mailto:spencer.dowie@hotmail.com">
                Email
              </a>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
