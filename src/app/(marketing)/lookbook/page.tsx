import path from "path";
import fs from "fs";
import { imageSize } from "image-size"; // v1 API uses imageSize(Buffer)
import { Section } from "@/components/section";
import { Masonry } from "@/components/masonry";
import Lookbox from "./lookbox-client";

export const metadata = { title: "Lookbook – Second Stitch" };
export const runtime = "nodejs"; // ensure Node runtime for fs
export const dynamic = "force-static"; // optional: build at build-time

function isImage(filename: string) {
  return /\.(jpe?g|png|webp|gif|avif)$/i.test(filename);
}

export default async function LookbookPage() {
  const dir = path.join(process.cwd(), "public/images");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter(isImage);
  } catch {
    files = []; // folder might not exist yet
  }

  const gallery = files.map((file) => {
    const fullPath = path.join(dir, file);
    let w = 800,
      h = 600;
    try {
      const buf = fs.readFileSync(fullPath); // <-- Buffer
      const dim = imageSize(buf); // <-- pass Buffer
      if (dim.width && dim.height) {
        w = dim.width;
        h = dim.height;
      }
    } catch {
      // keep defaults if we can't read dimensions
    }
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
        <Lookbox>
          <Masonry
            images={gallery}
            caption="Materials: reclaimed denim, deadstock canvas, thrifted garments"
          />
        </Lookbox>
      </Section>
    </main>
  );
}
