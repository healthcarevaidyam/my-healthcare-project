import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllServicePages } from "@/data/serviceLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Activity,
  Apple,
  ArrowRight,
  Award,
  Bone,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  HeartPulse,
  Leaf,
  Phone,
  Pill,
  Sparkles,
  Star,
  Stethoscope,
  Thermometer,
  Users,
  Weight,
  type LucideIcon,
} from "lucide-react";

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
  Pill,
  Thermometer,
};

const services = getAllServicePages().map((service, index) => {
  const IconComponent = iconMap[service.icon ?? ""] ?? Sparkles;

  return {
    id: 1000 + index,
    icon: IconComponent,
    title: service.title,
    subtitle: service.subtitle,
    desc: service.summary,
    imageDesktop: service.imageDesktop,
    imageMobile: service.imageMobile,
    benefits: service.benefits,
    highlights: service.highlights,
    treatmentSteps: service.treatmentSteps,
    duration: service.duration ?? "Customized",
    price: service.price ?? "Contact us",
    category: service.category ?? "General",
    popular: service.popular ?? false,
    featured: service.featured ?? false,
    gradient: service.gradient ?? "from-primary/10 to-secondary/10",
    slug: service.slug,
  };
});

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const categories = ["All", ...new Set(services.map(s => s.category))];

  const filteredServices = selectedCategory === "All" 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 6);

  const toggleExpand = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <>
      <title>Ayurvedic Services | Vaidyam Hospital & HealthCare Wellness Center</title>
      <meta name="description" content="Explore our comprehensive Ayurvedic services including Panchakarma, herbal medicine, diet counseling, and more at Vaidyam Hospital & HealthCare Wellness Center." />

      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/10"
            >
              <Award className="h-4 w-4" />
              Comprehensive Ayurvedic Care
            </motion.div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-primary relative">
                Ayurvedic
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full" />
              </span> Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover holistic healing through our comprehensive range of Ayurvedic treatments, 
              personalized to your unique constitution and health needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button size="lg" asChild className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                <Link to="/consultation">
                  <Calendar className="h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link to="#services">
                  <ArrowRight className="h-5 w-5" />
                  Explore Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border/50 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Happy Patients", value: "500+" },
              { icon: Award, label: "Years Experience", value: "3+" },
              { icon: Heart, label: "Services Offered", value: "50+" },
              { icon: Star, label: "Success Rate", value: "95%" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Core Services"
            subtitle="Comprehensive Ayurvedic treatments tailored to your needs"
            center
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="space-y-6">
            {displayedServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-500 bg-background border-border/50 hover:border-primary/20 group ${
                  s.featured ? 'border-primary/30 shadow-xl shadow-primary/5' : ''
                } ${expandedService === s.id ? 'shadow-2xl border-primary/30' : ''}`}>
                  <CardContent className="p-0">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Icon & Badge */}
                        <img
                          src={isMobile ? s.imageMobile : s.imageDesktop}
                          alt={s.title}
                          className="w-full lg:w-64 h-48 rounded-xl object-cover"
                        />
                        <div className="flex flex-col items-start gap-3">
                          <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <s.icon className="h-8 w-8 text-primary" />
                          </div>
                          {s.popular && (
                            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10">
                              ⭐ Popular
                            </span>
                          )}
                          {s.featured && (
                            <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
                              ✨ Featured
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {s.title}
                              </h3>
                              <p className="text-sm text-primary font-medium">{s.subtitle}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full">
                                <Clock className="h-4 w-4 text-primary" />
                                {s.duration}
                              </div>
                            </div>
                          </div>

                          <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>

                          {/* Benefits */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.benefits.slice(0, 4).map((b) => (
                              <span key={b} className="text-xs font-medium bg-primary/5 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-primary/5">
                                <CheckCircle className="h-3 w-3" />
                                {b}
                              </span>
                            ))}
                            {s.benefits.length > 4 && (
                              <span className="text-xs font-medium bg-secondary/50 text-muted-foreground px-3 py-1.5 rounded-full">
                                +{s.benefits.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Expanded Details */}
                          {expandedService === s.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 grid gap-4 rounded-xl border border-border/30 bg-secondary/20 p-5 md:grid-cols-2"
                            >
                              <div>
                                <h4 className="font-semibold text-foreground">Highlights</h4>
                                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                  {s.highlights.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">Treatment journey</h4>
                                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                                  {s.treatmentSteps.map((item, index) => (
                                    <li key={item} className="flex gap-2">
                                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{index + 1}</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-center gap-3 shrink-0 min-w-[140px]">
                          <Button asChild className="w-full gap-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow">
                            <Link to={s.slug ? `/services/${s.slug}` : "/consultation"}>
                              View Details
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full gap-1"
                            onClick={() => toggleExpand(s.id)}
                          >
                            {expandedService === s.id ? "Hide Details" : "More Details"}
                            <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${expandedService === s.id ? 'rotate-90' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {filteredServices.length > 6 && (
            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAll(!showAll)}
                  className="gap-2 hover:shadow-lg transition-all duration-300"
                >
                  {showAll ? "Show Less" : `View All ${filteredServices.length} Services`}
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/10">
              <HeartPulse className="h-4 w-4" />
              Start Your Healing Journey
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Experience <span className="text-primary">Ayurvedic</span> Wellness?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Book your consultation today and take the first step towards holistic health
              with our expert Ayurvedic practitioners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                <Link to="/consultation">
                  <Calendar className="h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link to="/contact">
                  <Phone className="h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;