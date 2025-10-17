export type Product = {
  sku: string;
  slug: string;
  title: string;
  category: string;
  images: string[];
  display_width_cm?: number;
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
};

export const products: Product[] = [
  {
    sku: "UMS-PLAN-005-BLU",
    slug: "indigo-glaze-planter-5in",
    title: "Indigo Glaze Planter (5 inch)",
    category: "Planters",
    images: ["/images/planter.png"],
    display_width_cm: 13,
    length_cm: 13,
    width_cm: 13,
    height_cm: 13
  },
  {
    sku: "UMS-BUST-011-BLK",
    slug: "floral-crown-bust-matte-black-11in",
    title: "Floral Crown Bust - Matte Black (11 inch)",
    category: "Decor",
    images: ["/images/bust.png"],
    display_width_cm: 13,
    length_cm: 13,
    width_cm: 13,
    height_cm: 28
  }
];

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}
