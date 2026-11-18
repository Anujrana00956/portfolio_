import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Anuj Rana - Flutter & React Developer",
  description:
    "Flutter and React developer building high-performance mobile and web apps. Experienced in Dart, React, Firebase, REST APIs, and modern UI/UX.",
  keywords:
    "Anuj Rana, Flutter Developer, React Developer, Mobile App Developer, Dart, Firebase, Android, iOS, React, Cross-Platform Development, App Development",
  authors: [{ name: "Anuj Rana" }],
  openGraph: {
    title: "Anuj Rana - Flutter & React Developer",
    description:
      "Portfolio of Anuj Rana — Flutter and React developer focused on elegant, responsive, and scalable products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${syne.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
