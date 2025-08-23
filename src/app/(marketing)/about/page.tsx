// src/app/(marketing)/about/page.tsx
export const metadata = {
  title: "About – Second Stitch",
  description:
    "Our story: thoughtfully upcycled garments and accessories designed to last.",
};

export default function AboutPage() {
  return (
    <main className="container pt-24 pb-24 max-w-3xl">
      <h1 className="h1">Our Story</h1>
      <p className="copy mt-6">
        Every stitch tells a story of sustainability and style. We upcycle
        high-quality materials into thoughtful pieces designed to last.
      </p>
    </main>
  );
}
