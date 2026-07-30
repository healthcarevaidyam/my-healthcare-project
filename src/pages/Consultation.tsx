import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageCircle, Phone, Video, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Consultation = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", problem: "", date: "",
  });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.phone || !form.email) {
    toast({
      title: "Please fill in all required fields",
      description: "Name, phone number, and email are required.",
      variant: "destructive",
    });
    return;
  }

  // Save current form data
  const formData = { ...form };

  // Start the request (don't await it)
  const request = fetch(
    "https://vaidyamhealthcare.app.n8n.cloud/webhook/consultation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      keepalive: true,
    }
  );

  // Clear the form immediately
  setForm({
    name: "",
    phone: "",
    email: "",
    problem: "",
    date: "",
  });

  // Show success immediately
  toast({
    title: "Appointment Request Sent!",
    description: "Thank you! Our healthcare team will contact you shortly.",
  });

  // Handle errors in the background
  request.catch((error) => {
    console.error("Background submission failed:", error);
  });
};

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20">
                Online Ayurvedic Consultation
              </span>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  Book a Video Call with an Expert Ayurvedic Doctor
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
                  Get affordable online Ayurvedic care with personalized treatment plans, video consultation support, and expert natural healing advice for diabetes, PCOS, thyroid, back pain, and lifestyle wellness.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Trusted Ayurvedic Care",
                    desc: "Expert assessment, root-cause treatment, and follow-up support through video consultation.",
                  },
                  {
                    icon: HeartPulse,
                    title: "Personalized Treatment",
                    desc: "Individualized Ayurvedic plans for chronic conditions and long-term wellness.",
                  },
                  {
                    icon: Sparkles,
                    title: "Affordable Pricing",
                    desc: "Online consultation designed to be cost-effective without compromising care quality.",
                  },
                  {
                    icon: Calendar,
                    title: "Easy Scheduling",
                    desc: "Book a convenient appointment time and speak with a doctor from anywhere in India.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
                <h2 className="font-heading text-3xl font-bold text-foreground">How Online Ayurvedic Consultation Works</h2>
                <div className="mt-8 space-y-6 text-muted-foreground">
                  {[
                    {
                      title: "1. Book your appointment",
                      description: "Share your details, symptoms, and preferred time to schedule a video consultation with our Ayurvedic doctor.",
                    },
                    {
                      title: "2. Speak with an Ayurvedic doctor",
                      description: "Join a secure video call for a full health assessment, pulse evaluation, and personalized plan.",
                    },
                    {
                      title: "3. Receive your treatment plan",
                      description: "Get herbal medicine advice, diet recommendations, and daily wellness guidance tailored to your condition.",
                    },
                    {
                      title: "4. Follow-up support",
                      description: "Continue progress with follow-up calls, symptom tracking, and lifestyle coaching for long-term results.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-3xl border border-border/50 bg-muted/50 p-6">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <section className="rounded-3xl border border-border/70 bg-secondary/50 p-8">
                <h2 className="font-heading text-3xl font-bold text-foreground">Common online consultation needs</h2>
                <p className="mt-4 text-muted-foreground">Patients choose our video call consultation for natural care in these areas:</p>
                <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <li className="rounded-2xl bg-background p-4">Diabetes management</li>
                  <li className="rounded-2xl bg-background p-4">PCOS and hormonal balance</li>
                  <li className="rounded-2xl bg-background p-4">Thyroid and metabolic health</li>
                  <li className="rounded-2xl bg-background p-4">Back pain and joint care</li>
                  <li className="rounded-2xl bg-background p-4">Digestive wellness</li>
                  <li className="rounded-2xl bg-background p-4">Stress, anxiety and sleep support</li>
                </ul>
              </section>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-background">
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Book Your Video Consultation</h2>
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
                      Request a Video Call
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {[
                {
                  icon: MessageCircle,
                  title: "Fast response support",
                  desc: "Our team helps you book quickly and prepare for your video consultation.",
                },
                {
                  icon: Phone,
                  title: "Trusted Ayurvedic guidance",
                  desc: "Advice from qualified Ayurvedic doctors with a focus on safe, natural results.",
                },
                {
                  icon: Video,
                  title: "Video consultation anywhere",
                  desc: "Connect from home using a simple video call — no clinic visit required.",
                },
              ].map((item) => (
                <Card key={item.title} className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Frequently Asked Questions</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">Online Ayurvedic Consultation FAQs</h2>
            <p className="mx-auto mt-4 text-muted-foreground max-w-2xl">
              Answers to the most common questions about booking video consultations with our Ayurvedic doctors.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                q: "How do I book an Ayurvedic video consultation?",
                a: "Fill the form with your contact details, health concern, and preferred date. We will confirm your appointment and send a secure video call link.",
              },
              {
                q: "Is online Ayurvedic consultation effective?",
                a: "Yes. Our doctors provide complete health assessment, personalized treatment plans, and follow-up advice to support natural healing through Ayurveda.",
              },
              {
                q: "What conditions can be treated through video consultation?",
                a: "We treat diabetes, PCOS, thyroid imbalance, back pain, digestive issues, stress, and many chronic health concerns with Ayurveda.",
              },
              {
                q: "Is this an affordable Ayurvedic consultation?",
                a: "Our online consultation is designed to be budget-friendly while ensuring quality Ayurvedic guidance from experienced doctors.",
              },
            ].map((item) => (
              <Card key={item.q} className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <CardContent>
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Consultation;
