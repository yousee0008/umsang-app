export type Product = {
  sku: string; slug: string; title: string; subtitle?: string; description?: string;
  category: string; subcategory?: string; tags?: string[]; price_mrp?: number; price_sale?: number;
  length_cm?: number; width_cm?: number; height_cm?: number;
  materials?: string[]; colors?: string[]; finish?: string; origin?: string;
  images: string[];
  /** real-world display width used for scaling in the visualizer (cm) */
  display_width_cm?: number;
};

export const products: Product[] = [
  {
    sku: "UMS-PLAN-005-BLU",
    slug: "indigo-glaze-planter-5in",
    title: "Indigo Glaze Planter (5 inch)",
    subtitle: "With matching saucer",
    description: "Stoneware planter with rich indigo glaze and protective saucer.",
    category: "Planters",
    subcategory: "Table Planters",
    tags: ["planter", "ceramic", "blue", "saucer"],
    price_mrp: 0, price_sale: 0,
    length_cm: 13, width_cm: 13, height_cm: 13,
    materials: ["stoneware ceramic"],
    colors: ["indigo blue", "brown rim"],
    finish: "gloss glaze",
    origin: "India",
    images: ["/images/planter.png", "/images/planter-lifestyle.jpg"],
    display_width_cm: 13
  },
  {
