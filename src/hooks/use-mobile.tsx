import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return typeof window.matchMedia === "function"
    ? window.matchMedia(MOBILE_QUERY).matches
    : window.innerWidth < MOBILE_BREAKPOINT;
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(getIsMobile);

  React.useEffect(() => {
    const onResize = () => setIsMobile(getIsMobile());

    // Very old browsers and embedded Android WebViews may not expose
    // matchMedia. The resize fallback keeps the UI usable there as well.
    if (typeof window.matchMedia !== "function") {
      window.addEventListener("resize", onResize);
      onResize();
      return () => window.removeEventListener("resize", onResize);
    }

    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);

    // Older iOS Safari versions expose MediaQueryList.addListener instead of
    // EventTarget.addEventListener. Calling the latter unconditionally causes
    // pages that use this hook (including Store) to fail on those iPhones.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(onChange);
    }

    setIsMobile(mql.matches);
    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", onChange);
      } else if (typeof mql.removeListener === "function") {
        mql.removeListener(onChange);
      }
    };
  }, []);

  return isMobile;
}
