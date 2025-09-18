import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { ThemeProvider } from "./utils/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Institutions Publiques - Madagascar",
  description: "Annuaire des institutions publiques à Madagascar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200`}
      >
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
