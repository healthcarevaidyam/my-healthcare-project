import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { getAllServicePages } from "@/data/serviceLoader";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Activity,
  Apple,
  ArrowRight,
  Bone,
  Brain,
  HeartPulse,
  Leaf,
  Sparkles,
  Star,
  Stethoscope,
  Thermometer,
  Weight,
  type LucideIcon,
  Quote,
  ShieldPlus,

} from "lucide-react";

import doctors from "@/data/doctor/doctors.json";

// Doctor images - using the same pattern as banner images (which work)
// Since banner images work with this pattern, we'll use it for doctor images too
const doctorImageModules = import.meta.glob(
  "@/assets/doctorimages/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

// Create a map with the same pattern as mobileBannerMap
const doctorImageMap = Object.fromEntries(
  Object.entries(doctorImageModules).map(([path, src]) => {
    const fileName = path.split("/").pop()?.replace(/\.(png|jpg|jpeg|webp)$/i, "") ?? "";
    return [fileName.toLowerCase(), src];
  })
) as Record<string, string>;

const bannerImages = Object.entries(
  import.meta.glob("@/assets/homebanners/fordesktop/*.webp", {
    eager: true,
    import: "default",
  })
) as [string, string][];

const mobileBannerMap = Object.fromEntries(
  Object.entries(
    import.meta.glob("@/assets/homebanners/formobile/*.webp", {
      eager: true,
      import: "default",
    })
  ).map(([path, src]) => {
    const name = path.split("/").pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, "") ?? "";
    return [name, src];
  })
) as Record<string, string>;

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Leaf,
  HeartPulse,
  Apple,
  Brain,
  Weight,
  Sparkles,
  Bone,
  Activity,
  Thermometer,
};

const homeServices = getAllServicePages()
  .filter((service) => service.isCore)
  .slice(0, 6)
  .map((service) => ({
    title: service.title,
    desc: service.summary,
    icon: iconMap[service.icon ?? ""] ?? Sparkles,
    slug: service.slug,
  }));

const testimonials = [
  {
    name: "Mayank Pant",
    text: "The consultation felt thoughtful and personal. I appreciated the clear guidance and the natural approach to healing.",
    rating: 4,
  },
  {
    name: "Deepak Rawat",
    text: "The treatment plan was easy to follow and helped me feel more balanced in my daily routine.",
    rating: 4,
  },
  {
    name: "Suresh Singh",
    text: "I found the care supportive and reassuring. The recommendations felt practical and focused on long-term wellness.",
    rating: 5,
  },
  {
    name: "Babita Latwal",
    text: "The experience was calm and professional. I felt listened to and respected throughout the process.",
    rating: 5,
  },
  {
    name: "Hema Nalwal",
    text: "I appreciated the personalized advice and the emphasis on simple, sustainable lifestyle changes.",
    rating: 5,
  },
  {
    name: "A. Verma",
    text: "The overall experience felt calm, respectful, and focused on steady improvement.",
    rating: 3,
  },
  {
    name: "R. Sharma",
    text: "The guidance felt practical and encouraging, which made it easier to stay consistent with the plan.",
    rating: 3,
  },
  {
    name: "Priya Rawat",
    text: "The consultation was informative and the recommendations were easy to include in my routine.",
    rating: 4,
  },
  {
    name: "Rahul Kapoor",
    text: "I appreciated the patient approach and the clear explanations throughout the consultation.",
    rating: 4,
  },
  {
    name: "Neha Gupta",
    text: "The advice was personalized and focused on long-term wellness rather than quick fixes.",
    rating: 3,
  },
  {
    name: "Amit Joshi",
    text: "A positive experience from start to finish. The guidance was practical and reassuring.",
    rating: 5,
  },
  {
    name: "Pooja Singh",
    text: "I felt comfortable discussing my concerns and received thoughtful recommendations.",
    rating: 3,
  },
  {
    name: "Vikas Sharma",
    text: "The overall experience was smooth, professional, and centered around healthy lifestyle habits.",
    rating: 3,
  },
  {
    name: "Sneha Agarwal",
    text: "The consultation was detailed, and I left with a better understanding of my wellness goals.",
    rating: 4,
  },
  {
    name: "Ankit Verma",
    text: "The suggestions were practical, easy to follow, and fit naturally into my daily schedule.",
    rating: 4,
  },
  {
    name: "Kavita Mishra",
    text: "I appreciated the calm environment and the personalized attention throughout the session.",
    rating: 3,
  },
  {
    name: "Rohit Malhotra",
    text: "The consultation felt genuine and informative. I would happily recommend the experience to others.",
    rating: 5,
  },
  {
    name: "Nidhi Sharma",
    text: "Everything was explained clearly, making it easy to understand the suggested wellness plan.",
    rating: 5,
  },
  {
    name: "Arun Patel",
    text: "I valued the holistic approach and the practical lifestyle recommendations provided.",
    rating: 4,
  },
  {
    name: "Meera Nair",
    text: "The experience was welcoming, professional, and focused on sustainable health improvements.",
    rating: 3,
  },
  {
    name: "Sanjay Kumar",
    text: "The consultation was well-structured, and I felt supported throughout the entire process.",
    rating: 3,
  },
  {
    name: "Ritika Jain",
    text: "The recommendations were realistic and easy to implement, making the experience very worthwhile.",
    rating: 4,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const isMobile = useIsMobile();
  const [imageKey, setImageKey] = useState(0);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(() => {
    const [initialPath, initialImage] = bannerImages[0] ?? ["", ""];
    const heroFileName = initialPath.split("/").pop() || "";
    const heroName = heroFileName.replace(/\.[^.]+$/, "");
    const initialMobileHeroImage = mobileBannerMap[heroName] || initialImage;
    const initialSelectedImage = isMobile ? initialMobileHeroImage : initialImage;

    return initialSelectedImage ? `${initialSelectedImage}?v=0` : "";
  });

  useEffect(() => {
    if (bannerImages.length === 0) return;

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % bannerImages.length);
      setImageKey((prev) => prev + 1);
      setHeroImageLoaded(false);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const [heroPath, heroImage] = bannerImages[heroIndex] ?? ["", ""];
  const heroFileName = heroPath.split("/").pop() || "";
  const heroName = heroFileName.replace(/\.[^.]+$/, "");
  const mobileHeroImage = mobileBannerMap[heroName] || heroImage;
  const selectedImage = isMobile ? mobileHeroImage : heroImage;
  const nextHeroImage = `${selectedImage}?v=${imageKey}`;

  const testimonialScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el) return;

    let rafId: number;
    const scrollStep = () => {
      if (!el) return;
      el.scrollLeft += 0.35;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(scrollStep);
    };

    rafId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    setHeroImageLoaded(false);

    const img = new Image();
    img.src = nextHeroImage;
    img.onload = () => {
      setCurrentHeroImage(nextHeroImage);
      setHeroImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to preload hero image:", nextHeroImage);
      setCurrentHeroImage(nextHeroImage);
      setHeroImageLoaded(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [selectedImage, nextHeroImage]);

  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    if (doctors.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % doctors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  // Debug: Log what images are available
  useEffect(() => {
    console.log("Doctor Image Map:", doctorImageMap);
    console.log("Doctors:", doctors.map(d => d.image));
  }, []);
  
  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[#f7efe4]">
          {currentHeroImage && (
            <img
              src={currentHeroImage}
              alt="Ayurvedic herbs and healing oils"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-full h-full object-cover object-left md:object-center transition-opacity duration-700 ${heroImageLoaded ? "opacity-100" : "opacity-0"}`}
              key={currentHeroImage}
              onLoad={() => setHeroImageLoaded(true)}
            />
          )}
          {!heroImageLoaded && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_55%)]" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Buttons */}
       <div className="absolute bottom-2 left-6 z-20 flex flex-wrap gap-2 sm:gap-4">
  <Button
    size="default"
    className="border-white text-black text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5"
    variant="outline"
    asChild
  >
    <Link to="/consultation">
      Book Appointment
      <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
    </Link>
  </Button>

  <Button
    size="default"
    className="border-white text-black text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5"
    variant="outline"
    asChild
  >
    <Link to="/services">Our Services</Link>
  </Button>
</div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl rounded-2xl border border-border/60 bg-background/95 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Natural healing • Panchakarma • Herbal care
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Trusted Ayurvedic Doctor in India & Uttarakhand
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Personalized Ayurvedic treatment for diabetes, digestive health, Infertility, skin care, and lasting wellness for patients across India and beyond.
          </p>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="What We Offer"
            title="Our Core Services"
            description="Comprehensive Ayurvedic treatments designed to restore your body's natural balance and promote lasting wellness."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="h-full hover:shadow-elevated transition-shadow bg-background">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <Button variant="link" className="mt-4 p-0" asChild>
                      <Link to={`/services/${s.slug}`}>Read more</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Patient Stories"
            title="What Our Patients Say"
            description="Real experiences from patients who found healing through our Ayurvedic treatments."
          />
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-primary/5 via-background to-secondary/20 p-4 sm:p-6">
            <div ref={testimonialScrollRef} className="flex gap-4 overflow-x-hidden">
              {[...testimonials, ...testimonials].map((t, i) => (
                <motion.div
                  key={`${t.name}-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="min-w-[280px] max-w-[320px] flex-shrink-0"
                >
                  <Card className="h-full bg-background/90 shadow-sm">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-accent/40 mb-3" />
                      <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                      <div className="flex items-center gap-1 mt-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="mt-2 font-heading font-semibold text-foreground">{t.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

  {/* =====================================================
    DOCTOR PROFILE
===================================================== */}
<section className="py-20">
  <div className="container mx-auto px-4">

    {/* Doctor Slider */}
    <div className="relative overflow-hidden">

      {doctors.map((doctor, index) => {
        // FIXED: Get the image using the same pattern as banner images
        const imageName = doctor.image.replace(/\.[^.]+$/, "").toLowerCase();
        const doctorImage = doctorImageMap[imageName];
        
        // Debug log
        console.log(`Doctor ${doctor.name}: looking for ${imageName}, found: ${!!doctorImage}`);

        return (
          <motion.div
            key={doctor.id}
            initial={false}
            animate={{
              x: `${(index - currentImage) * 100}%`,
              opacity: currentImage === index ? 1 : 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
            className={`w-full grid md:grid-cols-2 gap-12 items-center ${
              index === 0 ? "relative" : "absolute inset-0"
            }`}
          >

            {/* =================================================
                DOCTOR IMAGE
            ================================================= */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden rounded-2xl shadow-elevated">

              {doctorImage ? (
                <motion.img
                  src={doctorImage}
                  alt={doctor.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    console.error(`Failed to load image for ${doctor.name}:`, doctorImage);
                    // Show fallback
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'absolute inset-0 bg-secondary/30 flex items-center justify-center';
                      fallback.innerHTML = `<span class="text-muted-foreground">Image not available</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}

            </div>

            {/* =================================================
                DOCTOR DETAILS
            ================================================= */}
            <motion.div
              initial={false}
              animate={{
                opacity: currentImage === index ? 1 : 0,
                x: currentImage === index ? 0 : 30,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
            >

              {/* Doctor Name */}
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {doctor.name}
              </h2>

              {/* Designation + Qualifications */}
              <div className="flex flex-wrap items-center gap-2 mt-3">

                <span className="text-accent font-medium">
                  {doctor.designation}
                </span>

                <span className="text-muted-foreground">
                  •
                </span>

                {doctor.qualification?.map(
                  (qualification, qualificationIndex) => (
                    <span
                      key={qualificationIndex}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {qualification}
                    </span>
                  )
                )}

              </div>

              {/* =================================================
                  SHORT BIO
              ================================================= */}
              {doctor.shortBio && (
                <p className="mt-5 text-foreground/80 text-lg leading-relaxed">
                  {doctor.shortBio}
                </p>
              )}

              {/* =================================================
                  SPECIALIZATIONS
              ================================================= */}
              {doctor.specialization?.length > 0 && (
                <div className="mt-6">

                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Specializations
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {doctor.specialization.map(
                      (specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm"
                        >
                          {specialty}
                        </span>
                      )
                    )}

                  </div>
                </div>
              )}

              {/* =================================================
                  DESCRIPTION
              ================================================= */}
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">

                {doctor.description.map(
                  (paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraph}
                    </p>
                  )
                )}

              </div>

              {/* =================================================
                  TREATMENT APPROACH
              ================================================= */}
              {doctor.approach?.length > 0 && (
                <div className="mt-7">

                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {doctor.id === 1 ? "Leadership Approach" : "Treatment Approach"}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">

                    {doctor.approach.map(
                      (item, approachIndex) => (
                        <div
                          key={approachIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >

                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />

                          <span>
                            {item}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                </div>
              )}

              {/* =================================================
                  CONSULTATION OPTIONS
              ================================================= */}
              {doctor.consultation && (
                <div className="flex flex-wrap gap-3 mt-8">

                  {doctor.consultation.online && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Online Consultation
                    </span>
                  )}

                  {doctor.consultation.inClinic && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      In-Clinic Consultation
                    </span>
                  )}

                </div>
              )}

            </motion.div>
          </motion.div>
        );
      })}

    </div>

    {/* =====================================================
        DOCTOR INDICATORS
    ===================================================== */}
    {doctors.length > 1 && (
      <div className="flex justify-center items-center gap-2 mt-10">

        {doctors.map((doctor, index) => (
          <button
            key={doctor.id}
            type="button"
            onClick={() => setCurrentImage(index)}
            aria-label={`Show ${doctor.name}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentImage === index
                ? "w-8 bg-primary"
                : "w-2.5 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}

      </div>
    )}

  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Begin Your Healing Journey Today
            </h2>

            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Take the first step towards natural wellness. Book a consultation with Us
            </p>

            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link to="/consultation">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
