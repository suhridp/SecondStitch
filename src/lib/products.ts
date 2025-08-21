// Central product types + mock data + helpers

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string; // lead image (public/* path)
  images?: string[]; // gallery
  subtitle?: string;
  description?: string;
  tags?: string[];
};

export const featuredProducts: Product[] = [
  {
    slug: "patchwork-tote",
    name: "Patchwork Tote",
    price: 85,
    image: "/images/look1.jpg",
    images: ["/images/look1.jpg"],
    subtitle: "Upcycled denim & deadstock canvas",
    description:
      "Hand‑stitched tote using reclaimed denim panels and deadstock canvas. Fully lined, inner pocket.",
    tags: ["tote", "denim", "upcycled"],
  },
  {
    slug: "upcycled-jacket",
    name: "Upcycled Jacket",
    price: 220,
    image: "/images/look2.jpg",
    images: ["/images/look2.jpg"],
    subtitle: "Reconstructed thrifted outerwear",
    description:
      "One‑of‑one reconstruction with reinforced seams and contrast hand‑stitch detailing.",
    tags: ["jacket", "outerwear", "one-of-one"],
  },
  {
    slug: "denim-pouch",
    name: "Denim Pouch",
    price: 45,
    image: "/images/look3.jpg",
    images: ["/images/look3.jpg"],
    subtitle: "Zipper pouch from off‑cut panels",
    description:
      "Compact pouch made from denim off‑cuts. YKK zipper. Perfect for everyday carry.",
    tags: ["pouch", "accessory", "denim"],
  },
];

// ✅ Exported helpers expected by pages
export function getAllProducts(): Product[] {
  return [...featuredProducts];
}

export function getProduct(slug: string): Product | undefined {
  return featuredProducts.find((p) => p.slug === slug);
}
