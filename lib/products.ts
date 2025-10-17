
export type Product = {
  sku: string; slug: string; title: string; subtitle?: string; description?: string;
  category: string; subcategory?: string; tags?: string[]; price_mrp?: number; price_sale?: number;
  length_cm?: number; width_cm?: number; height_cm?: number; materials?: string[]; colors?: string[];
  finish?: string; origin?: string; images: string[];
  display_width_cm?: number; // real-world display width used for scaling
};
export const products: Product[] = [
  { sku: "UMS-PLAN-005-BLU", slug: "indigo-glaze-planter-5in", title: "Indigo Glaze Planter (5 inch)",
    subtitle: "With matching saucer", description: "Stoneware planter with rich indigo glaze and protective saucer.",
    category: "Planters", subcategory: "Table Planters", tags: ["planter","ceramic","blue","saucer"],
    price_mrp: 0, price_sale: 0, length_cm: 13, width_cm: 13, height_cm: 13,
    materials: ["stoneware ceramic"], colors: ["indigo blue","brown rim"], finish: "gloss glaze", origin: "India",
    images: ["/images/planter.png","/images/planter-lifestyle.jpg"]
  display_width_cm: 13,
  },
  { sku: "UMS-BUST-011-BLK", slug: "floral-crown-bust-matte-black-11in", title: "Floral Crown Bust — Matte Black (11 inch)",
    subtitle: "Sculptural decor with gold accent flower", description: "Statement tabletop sculpture in matte black with a single gold flower accent.",
    category: "Decor", subcategory: "Sculptures & Figurines", tags: ["bust","sculpture","figurine","matte black","gold accent"],
    price_mrp: 0, price_sale: 0, length_cm: 13, width_cm: 13, height_cm: 28,
    materials: ["polyresin"], colors: ["black","gold"], finish: "matte", origin: "India",
    images: ["/images/bust.png","/images/bust-hero.jpg"]
  display_width_cm: 13,
  },
];
export function getProductBySlug(slug: string) { return products.find(p => p.slug === slug); }
