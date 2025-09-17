import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/Header";

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
    <html lang="fr" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full overflow-x-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
