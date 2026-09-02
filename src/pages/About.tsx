import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useIsMobile } from "@/hooks/use-mobile";
import aboutBanner from "@/assets/pagebanners/fordesktop/About Banner.png";
import { Heart, Eye, Target, BookOpen, Baby, Activity } from "lucide-react";

import doctors from "@/data/doctor/doctors.json";

// FIXED: Same pattern as the Index page - create a proper map
const imageModules = import.meta.glob(
  "@/assets/doctorimages/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

// Create a map with lowercase filenames for consistent matching
const doctorImageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, src]) => {
    const fullFileName = path.split("/").pop() || "";
    const fileName = fullFileName.replace(/\.[^.]+$/, "").toLowerCase();
    return [fileName, src];
  })
);

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "Every patient is treated with empathy, respect, and individualized attention.",
  },
  {
    icon: Eye,
    title: "Holistic Vision",
    desc: "We consider the whole person — body, mind, and lifestyle — alongside their symptoms.",
  },
  {
    icon: Target,
    title: "Root Cause Focus",
    desc: "Our approach targets the underlying imbalance, not just the surface ailment.",
  },
  {
    icon: BookOpen,
    title: "Ancient Wisdom",
    desc: "Grounded in 5,000 years of Ayurvedic knowledge, validated by experience.",
  },
  {
    icon: Baby,
    title: "Infertility Management",
    desc: "Personalized Ayurvedic care designed to support reproductive health and overall well-being.",
  },
  {
    icon: Activity,
    title: "Diabetes Care",
    desc: "Ayurvedic guidance intended to complement healthy lifestyle habits and overall well-being.",
  },
];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (doctors.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % doctors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isMobile = useIsMobile();

  return (
    <>
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About Vaidyam Healthcare</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Ayurvedic care guided by a collaborative healthcare team
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Learn about our approach, values, and team supporting personalized Ayurvedic consultations and wellness care.
          </p>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Our Philosophy"
            title="Vision & Values"
            description="We believe true healing comes from restoring the natural harmony of body, mind, and spirit through the timeless wisdom of Ayurveda."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-soft text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-heading font-semibold text-foreground">
                  {v.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayurveda Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <SectionHeading
            subtitle="The Science of Life"
            title="What is Ayurveda?"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground leading-relaxed space-y-4"
          >
            <p>
              Ayurveda, meaning "The Science of Life," is one of the world's
              oldest holistic healing systems. Originating in India over 5,000
              years ago, it is based on the belief that health and wellness
              depend on a delicate balance between the mind, body, and spirit.
            </p>

            <p>
              The Ayurvedic approach identifies your unique body constitution
              (Vata, Pitta, Kapha) and uses personalized treatments — including
              herbal remedies, dietary changes, yoga, meditation, and
              Panchakarma therapies — to restore equilibrium and promote
              lasting health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          {/* 
            Fixed-height/overflow container.
            Only one doctor is visible at a time.
          */}
          <div className="relative overflow-hidden">

            {doctors.map((doctor, index) => {
              // FIXED: Use the map instead of find with endsWith
              const imageName = doctor.image.replace(/\.[^.]+$/, "").toLowerCase();
              const doctorImage = doctorImageMap[imageName];

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
                  {/* Doctor Image */}
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
                          // Show fallback if image fails
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

                  {/* Doctor Details */}
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
                    <h2 className="font-heading text-3xl font-bold text-foreground">
                      {doctor.name}
                    </h2>

                    <p className="text-accent font-medium mt-1">
                      {doctor.qualification} — {doctor.designation}
                    </p>

                    <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                      {doctor.description.map(
                        (paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

          </div>

          {/* Doctor Indicators */}
          {doctors.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
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
    </>
  );
};

export default About;
