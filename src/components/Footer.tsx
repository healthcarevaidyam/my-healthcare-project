import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin, Lock } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-heading text-lg font-bold">Vaidyam Hospital & HealthCare</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Holistic healing through the ancient wisdom of Ayurveda. Restoring balance, naturally.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/consultation", label: "Book Consultation" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>Panchakarma Therapy</span>
            <span>Ayurvedic Consultation</span>
            <span>Herbal Medicine</span>
            <span>Diet & Lifestyle</span>
            <span>Stress Management</span>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-2 opacity-80">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              {/* <span>House No. 88, Village & P.O, Tehsil, Sauni, Ranikhet, Uttarakhand 263663</span> */}
              <span>Sauni, Ranikhet, Uttarakhand 263663</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+91-8377085976</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Mail className="h-4 w-4 shrink-0" />
              <span>healthcarevaidyam@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/admin/login" className="font-semibold underline-offset-4 hover:underline">
          <Lock className="h-4 w-4" />
        </Link>
      </div>

      <nav aria-label="Legal policies" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        <Link to="/privacy-policy" className="opacity-80 hover:opacity-100">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="opacity-80 hover:opacity-100">Terms &amp; Conditions</Link>
        <Link to="/refund-cancellation-policy" className="opacity-80 hover:opacity-100">Refund &amp; Cancellation</Link>
        <Link to="/shipping-policy" className="opacity-80 hover:opacity-100">Shipping Policy</Link>
      </nav>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Vaidyam Hospital & HealthCare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
