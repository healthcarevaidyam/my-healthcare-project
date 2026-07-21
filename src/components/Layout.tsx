import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// Desktop Banners
import aboutBanner from "@/assets/pagebanners/fordesktop/About Banner.png";
import servicesBanner from "@/assets/pagebanners/fordesktop/Services Banner.png";
import consultationBanner from "@/assets/pagebanners/fordesktop/Book Consultation Banner.png";
import blogBanner from "@/assets/pagebanners/fordesktop/Blog Banner.png";
import contactBanner from "@/assets/pagebanners/fordesktop/Contact Banner.png";

// Mobile Banners
import aboutBannerMobile from "@/assets/pagebanners/formobile/About Banner.png";
import servicesBannerMobile from "@/assets/pagebanners/formobile/Services Banner.png";
import consultationBannerMobile from "@/assets/pagebanners/formobile/Book Consultation Banner.png";
import blogBannerMobile from "@/assets/pagebanners/formobile/Blog Banner.png";
import contactBannerMobile from "@/assets/pagebanners/formobile/Contact Banner.png";

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

  const bannerTitle =
    pageTitles[location.pathname] ?? "Ayurveda Wellness";

  const desktopBanner = desktopBanners[location.pathname];
  const mobileBanner = mobileBanners[location.pathname];

  const showBanner = location.pathname !== "/";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
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
            <img
              src={desktopBanner}
              alt={`${bannerTitle} banner`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </picture>
        </header>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;