import type { ServicePage } from "@/types/servicePage";

const serviceFiles = import.meta.glob("./services/*.json", {
  eager: true,
}) as Record<string, { default: ServicePage } | ServicePage>;


// Load desktop images
const desktopImages = import.meta.glob(
  "../assets/services/fordesktop/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;


// Load mobile images
const mobileImages = import.meta.glob(
  "../assets/services/formobile/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;


// Convert image paths into slug map
const createImageMap = (images: Record<string, string>) => {
  const map: Record<string, string> = {};

  Object.entries(images).forEach(([path, src]) => {
    const filename = path.split("/").pop() || "";

    const slug = filename.replace(
      /\.(png|jpg|jpeg|webp)$/i,
      ""
    );

    map[slug] = src;
  });

  return map;
};


const desktopImageMap = createImageMap(desktopImages);
const mobileImageMap = createImageMap(mobileImages);


// Create final service list
const servicePages: ServicePage[] = Object.values(serviceFiles).map(
  (entry) => {
    const service = "default" in entry ? entry.default : entry;

    return {
      ...service,
      imageDesktop: service.slug
        ? desktopImageMap[service.slug]
        : undefined,

      imageMobile: service.slug
        ? mobileImageMap[service.slug]
        : undefined,
    };
  }
);


export const getServicePageBySlug = (slug: string) =>
  servicePages.find((service) => service.slug === slug);


export const getAllServicePages = () =>
  servicePages;