import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
};

const seoConfigByPath: Record<string, SeoConfig> = {
  "/": {
    title: "Vaidyam Hospital & HealthCare Wellness Center | Ayurvedic Healing in Uttarakhand",
    description:
      "Discover holistic Ayurvedic care at Vaidyam Hospital & HealthCare Wellness Center with Panchakarma, herbal treatments, and wellness support in Uttarakhand.",
    canonical: "https://vaidyamhealthcare.in/",
  },
  "/about": {
    title: "About Us | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Learn about Dr. Harsh Vardhan Sharma and the Ayurvedic philosophy behind Vaidyam Hospital & HealthCare Wellness Center.",
    canonical: "https://vaidyamhealthcare.in/about",
  },
  "/services": {
    title: "Ayurvedic Treatments | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Explore Ayurvedic treatments, wellness therapies, and Panchakarma services offered by Vaidyam Hospital & HealthCare Wellness Center.",
    canonical: "https://vaidyamhealthcare.in/services",
  },
  "/consultation": {
    title: "Book Consultation | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Book an Ayurvedic consultation with Vaidyam Hospital & HealthCare Wellness Center for personalized wellness and healing support.",
    canonical: "https://vaidyamhealthcare.in/consultation",
  },
  "/blog": {
    title: "Ayurvedic Blog | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Read helpful articles about Ayurveda, wellness, natural healing, and holistic health insights from Vaidyam Hospital & HealthCare Wellness Center.",
    canonical: "https://vaidyamhealthcare.in/blog",
  },
  "/contact": {
    title: "Contact Us | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Get in touch with Vaidyam Hospital & HealthCare Wellness Center for appointments, inquiries, and Ayurvedic care support.",
    canonical: "https://vaidyamhealthcare.in/contact",
  },
  "/store": {
    title: "Store | Vaidyam Hospital & HealthCare Wellness Center",
    description:
      "Browse wellness products and Ayurvedic remedies available from Vaidyam Hospital & HealthCare Wellness Center.",
    canonical: "https://vaidyamhealthcare.in/store",
  },
};

const SEO = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const seo = seoConfigByPath[currentPath] ?? seoConfigByPath["/"];

  useEffect(() => {
    document.title = seo.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", seo.description);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", seo.canonical);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", seo.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", seo.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", seo.canonical);
    }
  }, [seo]);

  return null;
};

export default SEO;
