import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import AppHeader from "@components/AppHeader";
import AppFooter from "@components/AppFooter";
import Breadcrumb from "@components/static/BreadCrumb";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store";
import DialogLogin from "./(auth)/DialogLogin";
import DialogSignup from "./(auth)/DialogSignup";
import Providers from "./Providers";
import AppDownload from "@components/AppDownload";

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
        <Providers>
          <AppHeader />
          <main className="min-h-[60vh] p-5 md:px-10 lg:px-0">{children}</main>
          <AppDownload />
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
