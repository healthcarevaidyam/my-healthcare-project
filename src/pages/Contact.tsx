import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import contactBanner from "@/assets/pagebanners/Contact Banner.png";
const Contact = () => (
  <>
    <title>Contact Us | Vaidyam Hospital & HealthCare Wellness Center</title>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Visit Our Clinic</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We'd love to hear from you. Whether you have a question about our services, want to book an appointment, or need guidance — our team is here to help.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Clinic Address", lines: ["Vaidyam Hospital & HealthCare Wellness Center", "Uttarakhand, India"] },
                { icon: Phone, title: "Phone", lines: ["+91-7818085195"] },
                { icon: Mail, title: "Email", lines: ["info@sharmaayurvedic.com"] },
                { icon: Clock, title: "Working Hours", lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: By Appointment Only"] },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    {item.lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="overflow-hidden h-full min-h-[400px] bg-background">
              <CardContent className="p-0 h-full">
                <iframe
                  title="Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0!2d79.4334!3d29.6423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDM4JzM1LjAiTiA3OcKwMjYnMTguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading subtitle="Common Questions" title="Frequently Asked Questions" />
        <div className="space-y-4">
          {[
            { q: "What should I expect during my first visit?", a: "Your first consultation includes a detailed health assessment, pulse diagnosis (Nadi Pariksha), and discussion of your health goals. Dr. Sharma will then create a personalized treatment plan." },
            { q: "How long does a Panchakarma treatment take?", a: "A typical Panchakarma program ranges from 7 to 21 days depending on your condition and treatment goals. Dr. Sharma will recommend the ideal duration." },
            { q: "Are Ayurvedic medicines safe?", a: "Yes, Ayurvedic medicines prescribed by qualified practitioners are natural and safe. Dr. Sharma uses only high-quality, tested herbal formulations." },
            { q: "Do you offer online consultations?", a: "Yes! We offer online consultations via video call and WhatsApp for patients who cannot visit the clinic in person." },
            { q: "Is Ayurveda effective for chronic conditions?", a: "Ayurveda has shown excellent results for chronic conditions by addressing the root cause rather than just symptoms. Results vary by individual." },
          ].map((faq) => (
            <Card key={faq.q} className="bg-background">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Contact;
