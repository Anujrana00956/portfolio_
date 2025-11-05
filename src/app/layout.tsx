import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anuj Rana - Flutter Developer",
description:
  "Passionate Flutter developer specializing in building high-performance, cross-platform mobile applications. Experienced in Dart, Firebase, RESTful APIs, and modern UI/UX design. Enthusiastic about app scalability, performance optimization, and integrating AI-driven features.",
keywords:
  "Anuj Rana, Flutter Developer, Mobile App Developer, Dart, Firebase, Android, iOS, Cross-Platform Development, Flutter UI, REST API, App Development, Mobile UX, App Performance, Scalable Applications",
authors: [{ name: "Anuj Rana" }],
openGraph: {
  title: "Anuj Rana - Flutter Developer & Mobile App Engineer",
  description:
    "Portfolio of Anuj Rana, a Flutter developer focused on creating elegant, responsive, and scalable mobile applications using Dart and Firebase. Passionate about UI/UX design, app performance, and modern mobile technologies.",
  type: "website",
},
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
