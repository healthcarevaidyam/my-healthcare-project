import { useEffect } from "react";

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
      

      } catch (error) {
        // Tracking failure should NEVER affect the website
        console.error("Visitor tracking failed:", error);
      }
    };

    trackVisitor();
  }, []);

  return null;
};

export default VisitorTracker;