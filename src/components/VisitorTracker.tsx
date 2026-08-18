import { useEffect } from "react";

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor public IP
        const ipResponse = await fetch(
          "https://api.ipify.org?format=json"
        );

        if (!ipResponse.ok) return;

        const { ip } = await ipResponse.json();

        // Send visitor information to Google Apps Script
        await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            ip,
            page: window.location.pathname,
            time: new Date().toISOString(),
            referrer: document.referrer,
          }),
        });
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