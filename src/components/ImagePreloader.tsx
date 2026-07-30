import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const imageModules = import.meta.glob("@/assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageSources = Object.values(imageModules).filter(
  (value): value is string => typeof value === "string"
);

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });

interface ImagePreloaderProps {
  children: ReactNode;
}

const ImagePreloader = ({ children }: ImagePreloaderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const uniqueSources = Array.from(new Set(imageSources));

    const loadImages = async () => {
      try {
        await Promise.all(uniqueSources.map((src) => preloadImage(src)));
      } catch {
        // Ignore preload errors and continue rendering the page.
      }

      if (isMounted) {
        setIsReady(true);
      }
    };

    void loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isReady) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fffaf3 0%, #fef3c7 100%)",
        color: "#7c2d12",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "9999px",
            border: "4px solid rgba(124, 45, 18, 0.2)",
            borderTopColor: "#7c2d12",
            margin: "0 auto 12px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ margin: 0, fontWeight: 600 }}>Loading content…</p>
      </div>
    </div>
  );
};

export default ImagePreloader;
