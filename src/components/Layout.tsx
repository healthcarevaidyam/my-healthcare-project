import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SEO from "./SEO";
import { DoctorLaunchButton } from "./ai/DoctorLaunchButton";

const AiDoctorModal = lazy(() =>
  import("./ai/AiDoctorModal").then((module) => ({ default: module.AiDoctorModal }))
);

// Desktop Banners
import aboutBanner from "@/assets/pagebanners/fordesktop/About Banner.webp";
import servicesBanner from "@/assets/pagebanners/fordesktop/Services Banner.webp";
import consultationBanner from "@/assets/pagebanners/fordesktop/Book Consultation Banner.webp";
import blogBanner from "@/assets/pagebanners/fordesktop/Blog Banner.webp";
import contactBanner from "@/assets/pagebanners/fordesktop/Contact Banner.webp";

// Mobile Banners
import aboutBannerMobile from "@/assets/pagebanners/formobile/About Banner.webp";
import servicesBannerMobile from "@/assets/pagebanners/formobile/Services Banner.webp";
import consultationBannerMobile from "@/assets/pagebanners/formobile/Book Consultation Banner.webp";
import blogBannerMobile from "@/assets/pagebanners/formobile/Blog Banner.webp";
import contactBannerMobile from "@/assets/pagebanners/formobile/Contact Banner.webp";

const pageTitles: Record<string, string> = {
  "/": "Welcome to Vaidyam Hospital & HealthCare",
  "/about": "About Us",
  "/services": "Our Services",
  "/consultation": "Book Consultation",
  "/blog": "Blog",
  "/contact": "Contact",
};

const desktopBanners: Record<string, string> = {
  "/about": aboutBanner,
  "/services": servicesBanner,
  "/consultation": consultationBanner,
  "/blog": blogBanner,
  "/contact": contactBanner,
};

const mobileBanners: Record<string, string> = {
  "/about": aboutBannerMobile,
  "/services": servicesBannerMobile,
  "/consultation": consultationBannerMobile,
  "/blog": blogBannerMobile,
  "/contact": contactBannerMobile,
};

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAiDoctorOpen = location.pathname === "/aidoctor" || location.pathname === "/aidoctor/";
  const isServiceDetail = location.pathname.startsWith("/services/");
  const bannerTitle =
    pageTitles[location.pathname] ?? "Ayurveda Wellness";

  const desktopBanner = desktopBanners[location.pathname];
  const mobileBanner = mobileBanners[location.pathname];

  // Don't show the shared banner on the root, service-detail pages, or the Store page
  const showBanner =
    location.pathname !== "/" && !location.pathname.startsWith("/store") && !isServiceDetail;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Navbar />

      {showBanner && (
        <header className="relative h-[220px] sm:h-[260px] md:h-[420px] overflow-hidden">
          <picture>
            {/* Mobile Image */}
            <source
              media="(max-width: 640px)"
              srcSet={mobileBanner || desktopBanner}
            />

            {/* Desktop Image */}
           {desktopBanner && (
            <img
              src={desktopBanner}
              alt={`${bannerTitle} banner`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          )}
          </picture>
        </header>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
      <DoctorLaunchButton onClick={() => navigate("/aidoctor")} />
      {isAiDoctorOpen && (
        <Suspense fallback={null}>
          <AiDoctorModal isOpen onClose={() => navigate(-1)} />
        </Suspense>
      )}
    </div>
  );
};

export default Layout;
