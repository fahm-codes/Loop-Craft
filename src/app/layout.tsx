import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile if user exists
  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-bg-main text-text-primary min-h-screen relative`}
      >
        <div className="grid-overlay"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar user={user} profile={profile} />
          {children}
        </div>
      </body>
    </html>
  );
}
