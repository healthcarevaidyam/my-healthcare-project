import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919627986822?text=Hello%20Dr.%20Sharma%2C%20I%20would%20like%20to%20book%20a%20consultation."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[hsl(142,70%,45%)] px-5 py-3 text-sm font-medium text-[hsl(0,0%,100%)] shadow-elevated transition-transform hover:scale-105"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-5 w-5" />
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);

export default WhatsAppButton;
