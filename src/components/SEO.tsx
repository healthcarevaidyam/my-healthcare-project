import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getServicePageBySlug } from "@/data/serviceLoader";

type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
};

const baseUrl = "https://vaidyamhealthcare.in";
const siteName = "Vaidyam Healthcare";
const defaultImage = `${baseUrl}/og-image.svg`;
const orgAddress = {
  streetAddress: "Ranikhet, Almora",
  addressLocality: "Ranikhet",
  addressRegion: "Uttarakhand",
  postalCode: "263645",
  addressCountry: "IN",
};

const createStructuredData = (
  seo: SeoConfig,
  service?: { title: string; metaDescription: string; slug: string }
): Array<Record<string, any>> => {
  const organization = {
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: defaultImage,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+918377085976",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...orgAddress,
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteName,
    url: baseUrl,
    telephone: "+918377085976",
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      ...orgAddress,
    },
    openingHours: ["Mo-Sa 09:00-19:00"],
    sameAs: [baseUrl],
    priceRange: "₹₹",
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
      publisher: organization,
    },
    mainEntity: {
      "@type": "Thing",
      name: seo.title,
      description: seo.description,
    },
  };

  const schema: Array<Record<string, any>> = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
      publisher: organization,
    },
    localBusiness,
    webPage,
  ];

  if (service) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      url: `${baseUrl}/services/${service.slug}`,
      provider: {
        "@type": "MedicalBusiness",
        name: siteName,
        url: baseUrl,
        address: {
          "@type": "PostalAddress",
          ...orgAddress,
        },
      },
      areaServed: "India",
      serviceType: service.title,
    });
  }

  return schema;
};

const seoConfigByPath: Record<string, SeoConfig> = {
  "/": {
    title: "Best Ayurvedic Doctor in India | Ayurvedic Treatment & Panchakarma | Vaidyam Healthcare",
    description:
      "Trusted Ayurvedic clinic in India offering Panchakarma, herbal medicine, diabetes care, Infertility support, digestive wellness, and holistic healing with expert Ayurvedic care.",
    canonical: "https://vaidyamhealthcare.in/",
    keywords:
      "Ayurvedic doctor India, Ayurveda treatment India, Panchakarma clinic, herbal medicine doctor, holistic healing, online Ayurveda consultation, Ayurvedic clinic Ranikhet, natural healing India",
  },
  "/about": {
    title: "About Dr. Harsh Vardhan Sharma | Ayurvedic Doctor in India",
    description:
      "Meet Dr. Harsh Vardhan Sharma, expert Ayurvedic physician at Vaidyam Healthcare, helping patients in India with chronic disease, Infertility, digestion, and holistic wellness.",
    canonical: "https://vaidyamhealthcare.in/about",
    keywords:
      "Ayurvedic physician India, Dr Harsh Vardhan Sharma, Ayurveda practitioner, holistic healing doctor, natural medicine specialist, Ayurvedic clinic Uttarakhand",
  },
  "/services": {
    title: "Ayurvedic Treatments in India | Panchakarma & Herbal Care",
    description:
      "Explore Ayurvedic treatments, wellness therapies, Panchakarma, and herbal medicine services offered by Vaidyam Healthcare for natural healing across India.",
    canonical: "https://vaidyamhealthcare.in/services",
    keywords:
      "Ayurvedic treatment India, Panchakarma therapy, herbal medicine, digestive care, Infertility treatment Ayurveda, holistic wellness, Ayurvedic clinic Uttarakhand",
  },
  "/consultation": {
    title: "Book Ayurvedic Consultation | Vaidyam Healthcare",
    description:
      "Book an Ayurvedic consultation with Vaidyam Healthcare for personalized treatment plans, online appointments, and expert wellness guidance in India.",
    canonical: "https://vaidyamhealthcare.in/consultation",
    keywords: "Book Ayurvedic consultation, online Ayurveda consultation, clinic appointment India, Ayurveda telemedicine, Ayurveda doctor booking",
  },
  "/blog": {
    title: "Ayurvedic Blog | Health Tips & Natural Remedies",
    description:
      "Read helpful Ayurveda articles, herbal remedies, wellness tips, and natural health guides from Vaidyam Healthcare to support your holistic lifestyle.",
    canonical: "https://vaidyamhealthcare.in/blog",
    keywords: "Ayurvedic blog, natural healing tips, wellness articles, Ayurveda remedies, holistic health advice, herbal remedy blog",
  },
  "/contact": {
    title: "Contact Vaidyam Healthcare | Ayurvedic Clinic in India",
    description:
      "Contact Vaidyam Healthcare for appointments, inquiries, and Ayurvedic care support in Ranikhet, Uttarakhand, and across India.",
    canonical: "https://vaidyamhealthcare.in/contact",
    keywords: "Ayurvedic clinic contact, Vaidyam Healthcare phone, Ayurveda appointment, holistic care inquiry, Ayurvedic clinic Ranikhet",
  },
  "/store": {
    title: "Ayurvedic Wellness Products | Vaidyam Healthcare",
    description:
      "Shop authentic Ayurvedic wellness products and herbal remedies from Vaidyam Healthcare for natural health support in India.",
    canonical: "https://vaidyamhealthcare.in/store",
    keywords: "Ayurvedic products, herbal remedies, wellness products India, natural health store, Ayurvedic kits",
  },
};

const SEO = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const serviceMatch = currentPath.match(/^\/services\/([^\/]+)$/);
  const service = serviceMatch ? getServicePageBySlug(serviceMatch[1]) : undefined;

  const defaultServiceSeo: SeoConfig = {
  title: "Ayurvedic Service | Vaidyam Healthcare",
  description:
    "Explore a specialized Ayurvedic treatment from Vaidyam Healthcare designed for personalized healing and wellness.",
  canonical: "https://vaidyamhealthcare.in/services",
  keywords:
    "Ayurvedic treatment India, Panchakarma therapy, herbal medicine, Ayurvedic consultation, holistic wellness",
};

const seo: SeoConfig = service
  ? {
      title: service.metaTitle,
      description: service.metaDescription,
      canonical: `https://vaidyamhealthcare.in/services/${service.slug}`,
      keywords: `${service.title} Ayurveda, ${service.title} treatment India, Ayurvedic ${service.title.toLowerCase()}, Panchakarma, herbal medicine, holistic wellness`,
    }
  : currentPath.startsWith("/services/")
  ? defaultServiceSeo
  : seoConfigByPath[currentPath] ?? seoConfigByPath["/"];

  useEffect(() => {
    document.title = seo.title;
    document.documentElement.setAttribute("lang", "en");

    const setMetaTag = (selector: string, attr: string, value: string) => {
      const attribute = selector.includes("property") ? "property" : "name";
      const attrNameMatch = selector.match(/\[(?:name|property)=\"([^\"]+)\"\]/);
      const attrName = attrNameMatch ? attrNameMatch[1] : attribute;

      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attrName);
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
    setMetaTag('meta[name="author"]', "content", siteName);
    setMetaTag('meta[property="og:title"]', "content", seo.title);
    setMetaTag('meta[property="og:description"]', "content", seo.description);
    setMetaTag('meta[property="og:url"]', "content", seo.canonical);
    setMetaTag('meta[property="og:type"]', "content", service ? "service" : "website");
    setMetaTag('meta[property="og:site_name"]', "content", siteName);
    setMetaTag('meta[property="og:locale"]', "content", "en_IN");
    setMetaTag('meta[property="og:image"]', "content", defaultImage);
    setMetaTag('meta[property="og:image:alt"]', "content", seo.title);
    setMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "content", seo.title);
    setMetaTag('meta[name="twitter:description"]', "content", seo.description);
    setMetaTag('meta[name="twitter:image"]', "content", defaultImage);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", seo.canonical);

    const schemaJson = JSON.stringify(createStructuredData(seo, service));
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = schemaJson;

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
  }, [seo, service]);

  return null;
};

export default SEO;
