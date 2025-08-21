import { Masonry } from "@/components/masonry";
import { Section } from "@/components/section";
import Lookbox from "./lookbox-client";

export const metadata = { title: "Lookbook – Second Stitch" };

const gallery = [
  { src: "/images/look1.jpg", w: 900, h: 1200, alt: "Patchwork tote" },
  { src: "/images/look2.jpg", w: 1200, h: 900, alt: "Upcycled jacket" },
  { src: "/images/look3.jpg", w: 900, h: 900, alt: "Denim pouch" },
];

export default function LookbookPage() {
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
