import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
};

const seoConfigByPath: Record<string, SeoConfig> = {
  "/": {
    title: "Best Ayurvedic Doctor in India | Ayurvedic Treatment & Panchakarma | Vaidyam Healthcare",
    description:
      "Trusted Ayurvedic clinic in India offering Panchakarma, herbal medicine, diabetes care, fertility support, digestive wellness, and holistic healing.",
    canonical: "https://vaidyamhealthcare.in/",
    keywords:
      "Ayurvedic doctor India, Ayurveda treatment India, Panchakarma clinic, herbal medicine doctor, holistic healing, online Ayurveda consultation, Ayurvedic clinic Ranikhet",
  },
  "/about": {
    title: "About Dr. Harsh Vardhan Sharma | Ayurvedic Doctor in India",
    description:
      "Learn about Dr. Harsh Vardhan Sharma and the Ayurvedic philosophy behind Vaidyam Healthcare for patients seeking natural healing in India.",
    canonical: "https://vaidyamhealthcare.in/about",
    keywords:
      "Ayurvedic physician India, Dr Harsh Vardhan Sharma, Ayurveda practitioner, holistic healing doctor, natural medicine specialist",
  },
  "/services": {
    title: "Ayurvedic Treatments in India | Panchakarma & Herbal Care",
    description:
      "Explore Ayurvedic treatments, wellness therapies, and Panchakarma services offered by Vaidyam Healthcare for patients across India.",
    canonical: "https://vaidyamhealthcare.in/services",
    keywords:
      "Ayurvedic treatment India, Panchakarma therapy, herbal medicine, digestive care, infertility treatment Ayurveda, holistic wellness",
  },
  "/consultation": {
    title: "Book Ayurvedic Consultation | Vaidyam Healthcare",
    description:
      "Book an Ayurvedic consultation with Vaidyam Healthcare for personalized wellness and healing support in Uttarakhand.",
    canonical: "https://vaidyamhealthcare.in/consultation",
    keywords: "Book Ayurvedic consultation, online Ayurveda consultation, clinic appointment Uttarakhand",
  },
  "/blog": {
    title: "Ayurvedic Blog | Health Tips & Natural Remedies",
    description:
      "Read helpful articles about Ayurveda, wellness, natural healing, and holistic health insights from Vaidyam Healthcare.",
    canonical: "https://vaidyamhealthcare.in/blog",
    keywords: "Ayurvedic blog, natural healing tips, wellness articles, Ayurveda remedies",
  },
  "/contact": {
    title: "Contact Vaidyam Healthcare | Ayurvedic Clinic in Uttarakhand",
    description:
      "Get in touch with Vaidyam Healthcare for appointments, inquiries, and Ayurvedic care support in Ranikhet, Uttarakhand.",
    canonical: "https://vaidyamhealthcare.in/contact",
    keywords: "Ayurvedic clinic contact, Vaidyam Healthcare phone, Ranikhet clinic address",
  },
  "/store": {
    title: "Ayurvedic Wellness Products | Vaidyam Healthcare",
    description:
      "Browse wellness products and Ayurvedic remedies available from Vaidyam Healthcare.",
    canonical: "https://vaidyamhealthcare.in/store",
    keywords: "Ayurvedic products, herbal remedies, wellness products Uttarakhand",
  },
};

const SEO = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const seo = seoConfigByPath[currentPath] ?? seoConfigByPath["/"];

  useEffect(() => {
    document.title = seo.title;
    document.documentElement.setAttribute("lang", "en");

    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (selector.includes("property")) {
          element.setAttribute("property", selector.split("=")[1].replace(/"/g, ""));
        } else {
          element.setAttribute("name", selector.split("=")[1].replace(/"/g, ""));
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    setMetaTag('meta[name="description"]', "content", seo.description);
    setMetaTag('meta[name="keywords"]', "content", seo.keywords);
    setMetaTag(
      'meta[name="robots"]',
      "content",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setMetaTag('meta[property="og:title"]', "content", seo.title);
    setMetaTag('meta[property="og:description"]', "content", seo.description);
    setMetaTag('meta[property="og:url"]', "content", seo.canonical);
    setMetaTag('meta[property="og:locale"]', "content", "en_IN");
    setMetaTag('meta[name="twitter:title"]', "content", seo.title);
    setMetaTag('meta[name="twitter:description"]', "content", seo.description);
    setMetaTag('meta[name="twitter:image"]', "content", "https://vaidyamhealthcare.in/og-image.svg");

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", seo.canonical);

    document.querySelectorAll('link[rel="alternate"]').forEach((link) => link.remove());

    [
      { href: seo.canonical, hreflang: "en" },
      { href: seo.canonical, hreflang: "en-in" },
      { href: seo.canonical, hreflang: "x-default" },
    ].forEach(({ href, hreflang }) => {
      const alternateLink = document.createElement("link");
      alternateLink.setAttribute("rel", "alternate");
      alternateLink.setAttribute("href", href);
      alternateLink.setAttribute("hreflang", hreflang);
      document.head.appendChild(alternateLink);
    });
  }, [seo]);

  return null;
};

export default SEO;
