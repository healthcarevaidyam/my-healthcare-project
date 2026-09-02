import { Link } from "react-router-dom";
import { ArrowRight, Bike, Car, Mail, Phone, RotateCcw, Scale, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type PolicyType = "privacy" | "terms" | "refund" | "shipping";

type PoliciesProps = {
  type: PolicyType;
};

const policies: Record<PolicyType, { title: string; intro: string; sections: Array<{ heading: string; text: string }> }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "This policy explains how Vaidyam Healthcare handles information submitted through this website.",
    sections: [
      { heading: "Information we collect", text: "We may collect contact, consultation, delivery, and order information that you choose to provide through our forms." },
      { heading: "How information is used", text: "We use submitted information to respond to enquiries, arrange consultations, process orders, provide support, and maintain necessary business records." },
      { heading: "Sharing and security", text: "Information is shared only with service providers or team members needed to fulfil your request, or when required by law. We use reasonable safeguards, but no internet transmission is completely secure." },
      { heading: "Your choices", text: "You may ask to review, correct, or delete information you submitted, subject to legal and record-keeping requirements." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "By using this website, you agree to these general terms.",
    sections: [
      { heading: "Healthcare information", text: "Website content is general information and does not replace diagnosis, emergency care, or an in-person examination when one is required." },
      { heading: "Consultations", text: "Appointment requests are subject to confirmation and availability. A practitioner may recommend in-person or other medical care when appropriate." },
      { heading: "Products and pricing", text: "Product availability, descriptions, prices, and delivery estimates may change. An order is accepted only after confirmation." },
      { heading: "Responsible use", text: "You agree to provide accurate information and not misuse the website or attempt to interfere with its operation." },
    ],
  },
  refund: {
    title: "Refund & Cancellation Policy",
    intro: "Cancellation and refund eligibility depends on the consultation or product order status.",
    sections: [
      { heading: "Consultations", text: "Contact us as early as possible if you need to cancel or reschedule. Eligibility for a refund depends on whether the appointment has been confirmed or the consultation has begun." },
      { heading: "Product orders", text: "Contact us promptly with your order details. Eligibility depends on whether the order has been confirmed, packed, dispatched, delivered, damaged, or opened." },
      { heading: "How to request help", text: "Email healthcarevaidyam@gmail.com or call +91-8377085976 with your name, order or appointment details, and the reason for your request." },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    intro: "This policy applies to physical products ordered from Vaidyam Healthcare.",
    sections: [
      { heading: "Service area", text: "Orders are currently accepted for delivery within India, subject to product and courier availability at the destination PIN code." },
      { heading: "Processing and delivery", text: "Processing time and the estimated delivery period are confirmed after an order is reviewed. Delays may occur because of courier, weather, public holidays, or address issues." },
      { heading: "Delivery details", text: "Customers are responsible for providing a complete address and reachable Indian mobile number. Additional charges may apply if a parcel must be resent because the supplied details were incomplete or incorrect." },
      { heading: "Order support", text: "For shipping questions, email healthcarevaidyam@gmail.com or call +91-8377085976." },
    ],
  },
};

const policyLinks: Array<{ type: PolicyType; label: string; to: string; icon: LucideIcon }> = [
  { type: "privacy", label: "Privacy", to: "/privacy-policy", icon: ShieldCheck },
  { type: "terms", label: "Terms", to: "/terms-and-conditions", icon: Scale },
  { type: "refund", label: "Refunds", to: "/refund-cancellation-policy", icon: RotateCcw },
  { type: "shipping", label: "Shipping", to: "/shipping-policy", icon: Truck },
];

const Policies = ({ type }: PoliciesProps) => {
  const policy = policies[type];
  const activePolicy = policyLinks.find((item) => item.type === type) ?? policyLinks[0];
  const ActiveIcon = activePolicy.icon;

  return (
    <article className="bg-secondary/20">
      <header className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,1fr)_300px] md:py-20">
          <div className="flex max-w-3xl items-start gap-5">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg sm:flex">
              <ActiveIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Trust &amp; transparency</p>
              <h1 className="mt-3 font-heading text-4xl font-bold text-foreground md:text-5xl">{policy.title}</h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{policy.intro}</p>
              <p className="mt-4 inline-flex rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                Last updated: 28 August 2026
              </p>
            </div>
          </div>

          <div className="relative hidden h-64 items-center justify-center overflow-hidden md:flex" aria-hidden="true">
            {type === "shipping" ? (
              <div className="relative h-52 w-full overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-100 shadow-inner">
                <motion.div className="absolute left-8 top-6 h-3 w-12 rounded-full bg-white/90 shadow-sm" animate={{ x: [-40, 280] }} transition={{ duration: 13, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute left-36 top-12 h-2 w-9 rounded-full bg-white/80" animate={{ x: [150, -180] }} transition={{ duration: 17, repeat: Infinity, ease: "linear" }} />
                <div className="absolute inset-x-0 bottom-[92px] h-12 bg-emerald-200/70 [clip-path:polygon(0_65%,16%_20%,31%_70%,48%_10%,67%_65%,84%_25%,100%_70%,100%_100%,0_100%)]" />
                <div className="absolute bottom-[78px] left-7 h-8 w-2 rounded-t-full bg-emerald-700/70 before:absolute before:-left-3 before:-top-4 before:h-7 before:w-7 before:rounded-full before:bg-emerald-500" />
                <div className="absolute bottom-[78px] right-10 h-7 w-2 rounded-t-full bg-emerald-700/70 before:absolute before:-left-3 before:-top-4 before:h-7 before:w-7 before:rounded-full before:bg-emerald-500" />
                <div className="absolute inset-x-0 bottom-0 h-[82px] bg-slate-600 shadow-[inset_0_5px_12px_rgba(15,23,42,0.3)]" />
                <div className="absolute inset-x-0 bottom-[39px] border-b-2 border-dashed border-amber-100/90" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-300" />
                <div className="absolute inset-x-0 bottom-[78px] h-1 bg-slate-300" />
                <motion.div
                  className="absolute bottom-8 -left-24 flex h-14 w-24 items-center justify-center rounded-xl border-2 border-blue-900/30 bg-primary text-primary-foreground shadow-lg"
                  animate={{ x: [-20, 430], y: [0, -1, 0, 1, 0] }}
                  transition={{ x: { duration: 5.8, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }, y: { duration: 0.45, repeat: Infinity } }}
                >
                  <span className="absolute left-2 top-2 text-[8px] font-bold tracking-wide text-white/90">VAIDYAM</span>
                  <Truck className="h-11 w-11 translate-x-4" />
                </motion.div>
                <motion.span
                  className="absolute bottom-12 -left-16 flex h-9 w-14 items-center justify-center rounded-lg bg-amber-400 text-slate-800 shadow-md"
                  animate={{ x: [-30, 410] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "linear", delay: 1.6 }}
                ><Car className="h-7 w-7" /></motion.span>
                <motion.span
                  className="absolute bottom-1 -right-16 flex h-8 w-12 items-center justify-center rounded-lg bg-rose-500 text-white shadow-md"
                  animate={{ x: [20, -390] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "linear", delay: 0.7 }}
                ><Car className="h-6 w-6 -scale-x-100" /></motion.span>
                <motion.span
                  className="absolute bottom-2 -right-12 flex h-8 w-10 items-center justify-center text-slate-900"
                  animate={{ x: [80, -380] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: "linear", delay: 2.4 }}
                ><Bike className="h-8 w-8 -scale-x-100" /></motion.span>
              </div>
            ) : (
              <motion.div
                key={type}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={
                  type === "terms"
                    ? { scale: 1, opacity: 1, rotate: [-3, 3, -3] }
                    : type === "refund"
                      ? { scale: 1, opacity: 1, rotate: [0, -360] }
                      : { scale: [1, 1.07, 1], opacity: 1 }
                }
                transition={
                  type === "refund"
                    ? { rotate: { duration: 4, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.55)]"
              >
                <ActiveIcon className="h-16 w-16" />
                <motion.span
                  className="absolute inset-0 rounded-[2rem] border-2 border-primary"
                  animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
                  transition={{ duration: type === "privacy" ? 1.8 : 2.6, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <nav aria-label="Policy pages" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {policyLinks.map((item) => {
            const Icon = item.icon;
            const active = item.type === type;
            return (
              <Link
                key={item.type}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            {policy.sections.map((section, index) => (
              <section key={section.heading} className="rounded-2xl border border-border/70 bg-background p-6 shadow-sm md:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-foreground">{section.heading}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{section.text}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-75">Need assistance?</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">We’re here to help</h2>
            <p className="mt-3 text-sm leading-6 opacity-85">Contact our team if you have a question about a consultation, order, or any of these policies.</p>
            <div className="mt-6 space-y-3">
              <a href="mailto:healthcarevaidyam@gmail.com" className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-3 text-sm hover:bg-primary-foreground/15">
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="break-all">healthcarevaidyam@gmail.com</span>
              </a>
              <a href="tel:+918377085976" className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-3 text-sm hover:bg-primary-foreground/15">
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                +91 83770 85976
              </a>
            </div>
            <Link to="/contact" className="mt-6 flex items-center justify-between rounded-xl bg-background px-4 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5">
              Contact our team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default Policies;
