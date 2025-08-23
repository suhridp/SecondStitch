// src/app/(marketing)/lookbook/page.tsx
import path from "path";
import fs from "fs";
import { imageSize } from "image-size";
import { Section } from "@/components/section";
import { Masonry } from "@/components/masonry";
import Lookbox from "./lookbox-client";

export const metadata = { title: "Lookbook – Second Stitch" };
export const runtime = "nodejs";
export const dynamic = "force-static";

function isImage(filename: string) {
  return /\.(jpe?g|png|webp|gif|avif)$/i.test(filename);
}

export default async function LookbookPage() {
  const dir = path.join(process.cwd(), "public/images");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter(isImage);
  } catch {
    files = [];
  }

  const gallery = files.map((file) => {
    const fullPath = path.join(dir, file);
    let w = 800,
      h = 600;
    try {
      const buf = fs.readFileSync(fullPath);
      const dim = imageSize(buf);
      if (dim.width && dim.height) {
        w = dim.width;
        h = dim.height;
      }
    } catch {}
    return {
      src: `/images/${file}`,
      w,
      h,
      alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    };
  });

  return (
    <main>
      <Section
        eyebrow="Lookbook"
        title="Textiles with a second life"
        subtitle="A selection of one‑of‑one and small‑batch pieces."
      >
        {gallery.length === 0 ? (
          <p className="text-sm text-slate-600">
            Add images to <code>/public/images</code> (jpg, jpeg, png, webp,
            gif, avif) and rebuild to see the grid.
          </p>
        ) : (
          <Lookbox>
            <Masonry
              images={gallery}
              caption="Materials: reclaimed denim, deadstock canvas, thrifted garments"
            />
          </Lookbox>
        )}
      </Section>
    </main>
  );
}
