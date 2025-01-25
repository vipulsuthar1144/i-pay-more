import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import AppHeader from "@components/AppHeader";
import AppFooter from "@components/AppFooter";
import Breadcrumb from "@components/sections/BreadCrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I Pay More",
  description: "iPayMore - The Best Price for Your Apple, Guaranteed!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppHeader />
        <main className="min-h-[60vh] p-5">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}
