import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-context";
import { Playfair_Display, Work_Sans } from "next/font/google";
import AuthListener from "../components/auth/auth-listener";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Second Stitch — Upcycled Apparel & Accessories",
    template: "%s • Second Stitch",
  },
  description:
    "Sophisticated, sustainable garments and accessories — upcycled and bespoke.",
  metadataBase: new URL("https://secondstitch.example.com"),
  openGraph: {
    title: "Second Stitch",
    description:
      "Sophisticated, sustainable garments and accessories — upcycled and bespoke.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${workSans.variable} scroll-smooth`}
    >
      <body className="font-body">
        <CartProvider>
          <AuthListener />
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
