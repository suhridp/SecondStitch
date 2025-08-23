// app/page.tsx
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import Hero from "@/components/hero-client";

export default function HomePage() {
  const dir = path.join(process.cwd(), "public/hero");
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|webp)$/i.test(f));

  const slides = files.map((file) => ({
    src: `/hero/${file}`,
    alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
  }));

  return <Hero slides={slides} />;
}
