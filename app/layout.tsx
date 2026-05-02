import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuraEffect from "./components/effects/AuraEffect";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tran Lam Huy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} font-sans bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900`}
      >
        <AuraEffect/>
        {children}
      </body>
    </html>
  );
}
