import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import aboutBanner from "@/assets/pagebanners/fordesktop/About Banner.png";
import { Heart, Eye, Target, BookOpen } from "lucide-react";
import doctorImage from "@/assets/doctorimages/Doctor Portrait 2.png";

const values = [
  { icon: Heart, title: "Compassionate Care", desc: "Every patient is treated with empathy, respect, and individualized attention." },
  { icon: Eye, title: "Holistic Vision", desc: "We treat the whole person — body, mind, and spirit — not just symptoms." },
  { icon: Target, title: "Root Cause Focus", desc: "Our approach targets the underlying imbalance, not just the surface ailment." },
  { icon: BookOpen, title: "Ancient Wisdom", desc: "Grounded in 5,000 years of Ayurvedic knowledge, validated by experience." },
];

const About = () => (
  <>
    <title>About Dr. Harsh Vardhan Sharma| Vaidyam Hospital & HealthCare Wellness Center</title>

    {/* Doctor Profile */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={doctorImage}
            alt="Dr. Harsh Vardhan Sharma"
            className="rounded-2xl shadow-elevated w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          />
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-bold text-foreground">Dr. Harsh Vardhan Sharma</h2>
            <p className="text-accent font-medium mt-1">BAMS — Bachelor of Ayurvedic Medicine and Surgery</p>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dr.Harsh Vardhan Sharma is a dedicated Ayurvedic physician practicing from the heart of Uttarakhand, India. With a degree in Bachelor of Ayurvedic Medicine and Surgery (BAMS), he combines classical Ayurvedic wisdom with a compassionate, patient-centered approach.
              </p>
              <p>
                His practice focuses on understanding each patient's unique constitution (Prakriti) and designing personalized treatment protocols that address the root cause of disease rather than merely suppressing symptoms.
              </p>
              <p>
                Dr.Sharma specializes in Panchakarma detoxification therapies, herbal medicine formulations, and lifestyle modifications that empower patients to take charge of their own health and well-being.
              </p>
            </div>
          </motion.div>
        </div>
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
              <h3 className="font-heading font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Ayurveda Philosophy */}
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <SectionHeading subtitle="The Science of Life" title="What is Ayurveda?" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground leading-relaxed space-y-4"
        >
          <p>
            Ayurveda, meaning "The Science of Life," is one of the world's oldest holistic healing systems. Originating in India over 5,000 years ago, it is based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
          </p>
          <p>
            The Ayurvedic approach identifies your unique body constitution (Vata, Pitta, Kapha) and uses personalized treatments — including herbal remedies, dietary changes, yoga, meditation, and Panchakarma therapies — to restore equilibrium and promote lasting health.
          </p>
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
