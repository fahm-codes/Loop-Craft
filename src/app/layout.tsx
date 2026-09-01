import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoopCraft | Developer Learning Platform",
  description: "A professional developer workspace for structured self-study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-bg-main text-text-primary min-h-screen relative`}
      >
        <div className="grid-overlay"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
