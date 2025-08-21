import type { Metadata } from "next";
import "./styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Second Stitch — Reviving Threads, Crafting Stories",
  description:
    "Upcycled, bespoke accessories & apparel. Sustainable fashion that’s uniquely you.",
  openGraph: {
    title: "Second Stitch",
    description:
      "Upcycled, bespoke accessories & apparel. Sustainable fashion that’s uniquely you.",
    url: "https://secondstitch.yourdomain.com",
    siteName: "Second Stitch",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
