import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://secondstitch.example.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    { url: `${base}/lookbook`, lastModified: new Date() },
    { url: `${base}/community`, lastModified: new Date() },
    { url: `${base}/donate`, lastModified: new Date() },
    { url: `${base}/rewards`, lastModified: new Date() },
    { url: `${base}/impact`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
  ];
}
