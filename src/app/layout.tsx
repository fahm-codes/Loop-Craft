import type { Metadata } from "next";
import { VT323, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppLayout from "@/components/AppLayout";

const display = VT323({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
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

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('loopcraft-theme');
      var isLight = false;
      if (theme === 'light') {
        isLight = true;
      } else if (theme === 'dark') {
        isLight = false;
      } else {
        isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      }
      if (isLight) {
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.add('dark-theme');
      }
    } catch (e) {}
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  let profile = null;

  try {
    const { validateSession } = await import('@/lib/auth');
    const sessionData = await validateSession();
    if (sessionData && sessionData.user) {
      user = sessionData.user;
      profile = sessionData.profile;
    }
  } catch (error) {
    console.error('Session validation failed.');
  }

  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`font-serif antialiased bg-bg-main text-text-primary min-h-screen relative selection:bg-accent selection:text-white`}
      >
        <div className="grid-overlay"></div>
        <AppLayout user={user} profile={profile}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
