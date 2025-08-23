// app/page.tsx
export const runtime = "nodejs";

import fs from "fs";
import path from "path";
import Hero from "@/components/hero-client";

export default function HomePage() {
  const dir = path.join(process.cwd(), "public/hero");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|webp)$/i.test(f));
  } catch {
    files = []; // folder might not exist yet
  }
  const slides = files.map((file) => ({
    src: `/hero/${file}`,
    alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
  }));
  return <Hero slides={slides} />;
}
