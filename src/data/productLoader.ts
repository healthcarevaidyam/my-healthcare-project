import medicalProducts from "@/data/store/medical-products.json";
import wellnessProducts from "@/data/store/wellness-products.json";

export interface StoreProduct {
  slug: string;
  name: string;
  price: string;
  startingPrice: number;
  desktopImage: string;
  mobileImage: string;
  category: string;
  tags: string[];
  productType: "medical" | "wellness";
  stockStatus: "In stock" | "Limited stock";
  shortDescription: string;
  aboutProduct?: string;
  benefits?: string[];
  usageInstructions?: string;
  storageInstructions?: string;
  doctorRecommended?: boolean;
  featured?: boolean;
  variants?: Array<{ label: string; mrp: number; price: number }>;
  seo?: {
    title: string;
    description: string;
    imageAlt: string;
  };
}

export const storeProducts = [
  ...medicalProducts,
  ...wellnessProducts,
] as StoreProduct[];

export const getProductBySlug = (slug: string) =>
  storeProducts.find((product) => product.slug === slug);
