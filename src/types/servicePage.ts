export interface ServicePage {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  highlights: string[];
  benefits: string[];
  treatmentSteps: string[];
  category?: string;
  popular?: boolean;
  featured?: boolean;
  gradient?: string;
  duration?: string;
  price?: string;
  icon?: string;
  imageDesktop?: string;
  imageMobile?: string;
}
