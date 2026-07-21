import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import consultationBanner from "@/assets/pagebanners/Consultation Banner.png";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageCircle, Phone, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Consultation = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", problem: "", date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Appointment Request Sent!",
      description: "Dr. Sharma's team will contact you within 24 hours to confirm your appointment.",
    });
    setForm({ name: "", phone: "", email: "", problem: "", date: "" });
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <title>Book Consultation | Vaidyam Hospital & HealthCare Wellness Center</title>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background">
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Appointment Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91-XXXXX-XXXXX" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="problem">Describe Your Health Concern</Label>
                      <Textarea id="problem" value={form.problem} onChange={(e) => update("problem", e.target.value)} placeholder="Tell us about your symptoms or health concern..." rows={4} className="mt-1" />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Submit Appointment Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: MessageCircle, title: "WhatsApp Consultation", desc: "Chat directly with Dr. Sharma's team for quick queries and appointment booking.", action: "Chat on WhatsApp", href: "https://wa.me/919627986822" },
                { icon: Phone, title: "Call Us", desc: "Speak with our team directly for urgent consultations or inquiries.", action: "Call Now", href: "tel:+919627986822" },
                { icon: Video, title: "Online Consultation", desc: "Get expert Ayurvedic advice from the comfort of your home via video call.", action: "Book Online", href: "/consultation" },
              ].map((item) => (
                <Card key={item.title} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        <a href={item.href} className="text-sm font-medium text-primary hover:underline mt-2 inline-block">
                          {item.action} →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Consultation;
