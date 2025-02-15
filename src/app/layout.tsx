import type { Metadata } from "next";
import localFont from "next/font/local";
import { GAnalytics } from "@/components/g-anaylitcs";
import "./main.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Free CV Builder",
  description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GAnalytics measurementId="G-8GM2K9HJM9" />
        {children}
      </body>
    </html>
  );
}
