import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
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
              <span>Vaidyam Hospital & HealthCare Wellness Center, Uttarakhand, India</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+91-7818085195</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@sharmaayurvedic.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Vaidyam Hospital & HealthCare Wellness Center. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
