import type { Metadata } from "next";
import { Unbounded, Onest } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "QalaPulse — Алматы",
  description: "Интеллектуальный пульс города",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <body className={`${unbounded.variable} ${onest.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
