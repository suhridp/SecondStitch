export default function sitemap() {
  const base = "https://secondstitch.example.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/lookbook`, lastModified: new Date() },
    { url: `${base}/impact`, lastModified: new Date() },
    { url: `${base}/custom`, lastModified: new Date() },
  ];
}
