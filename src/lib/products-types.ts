export type DbProduct = {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  image: string | null;
  subtitle: string | null;
  description: string | null;
  tags: string[] | null;
};
