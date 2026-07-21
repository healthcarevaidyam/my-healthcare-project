import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import servicesBanner from "@/assets/pagebanners/Services Banner.png";
import {
  Stethoscope, Leaf, HeartPulse, Apple, Brain, Weight,
  Sparkles, Bone, Activity, ArrowRight, Clock, CheckCircle,
  Star, Users, Award, Shield, Calendar, Phone,
  Pill, Heart, HeartHandshake, Baby, Eye,
  Microscope, TestTube, Thermometer, Sparkle
} from "lucide-react";
const services = [
  {
    id: 1,
    icon: Stethoscope,
    title: "Ayurvedic Consultation",
    subtitle: "Personalized Health Assessment",
    desc: "A thorough evaluation of your body constitution (Prakriti), current imbalances (Vikriti), and health history to create a personalized treatment plan.",
    fullDescription: `
      <p>Our comprehensive Ayurvedic consultation goes beyond symptom management to understand your unique constitution and imbalances.</p>
      <h4>What to Expect:</h4>
      <ul>
        <li>Detailed health history analysis</li>
        <li>Pulse diagnosis (Nadi Pariksha)</li>
        <li>Dosha identification and imbalance assessment</li>
        <li>Personalized treatment plan development</li>
        <li>Follow-up care and progress tracking</li>
      </ul>
    `,
    benefits: [
      "Personalized health assessment",
      "Dosha identification",
      "Custom treatment plan",
      "Ongoing guidance",
      "Preventive care strategies"
    ],
    duration: "60-90 minutes",
    price: "₹1,500 - ₹2,500",
    category: "Consultation",
    popular: true,
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 2,
    icon: Leaf,
    title: "Panchakarma Therapy",
    subtitle: "Ultimate Detox & Rejuvenation",
    desc: "The ultimate Ayurvedic detoxification program consisting of five therapeutic procedures that cleanse and rejuvenate the body at the deepest level.",
    fullDescription: `
      <p>Panchakarma is the most profound healing therapy in Ayurveda, designed to eliminate deep-rooted toxins (ama) and restore balance.</p>
      <h4>The Five Procedures:</h4>
      <ul>
        <li><strong>Vamana:</strong> Therapeutic emesis for Kapha cleansing</li>
        <li><strong>Virechana:</strong> Therapeutic purgation for Pitta cleansing</li>
        <li><strong>Basti:</strong> Medicated enema for Vata disorders</li>
        <li><strong>Nasya:</strong> Nasal administration for head conditions</li>
        <li><strong>Raktamokshana:</strong> Blood purification therapy</li>
      </ul>
      <h4>Pre & Post Care:</h4>
      <ul>
        <li>Preparatory therapies (Purvakarma)</li>
        <li>Post-detox restorative diet (Samsarjana Karma)</li>
        <li>Lifestyle modification guidance</li>
      </ul>
    `,
    benefits: [
      "Deep detoxification",
      "Immune system boost",
      "Mental clarity",
      "Rejuvenation",
      "Disease prevention",
      "Stress reduction"
    ],
    duration: "7-21 days",
    price: "₹15,000 - ₹50,000",
    category: "Detox",
    popular: true,
    featured: true,
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 3,
    icon: Pill,
    title: "Herbal Medicine Prescription",
    subtitle: "Natural Healing Formulations",
    desc: "Customized herbal formulations using time-tested Ayurvedic herbs, prepared specifically for your unique condition and body type.",
    fullDescription: `
      <p>Our experienced Ayurvedic physicians prescribe personalized herbal formulations using the highest quality ingredients.</p>
      <h4>Types of Formulations:</h4>
      <ul>
        <li><strong>Classical Formulations:</strong> Time-tested Ayurvedic remedies</li>
        <li><strong>Proprietary Blends:</strong> Custom combinations for specific conditions</li>
        <li><strong>Fresh Herbal Juices:</strong> Extracted from fresh plants</li>
        <li><strong>Medicated Oils & Ghees:</strong> For internal and external use</li>
        <li><strong>Powder (Churna):</strong> Easy-to-use herbal powders</li>
      </ul>
      <h4>Quality Assurance:</h4>
      <ul>
        <li>100% natural ingredients</li>
        <li>GMP certified manufacturing</li>
        <li>No harmful additives</li>
        <li>Regular quality testing</li>
      </ul>
    `,
    benefits: [
      "Natural ingredients",
      "No side effects",
      "Targeted healing",
      "Sustainable wellness",
      "Customized formulation",
      "Quality assured"
    ],
    duration: "Varies by condition",
    price: "₹500 - ₹3,000/month",
    category: "Medicine",
    popular: false,
    gradient: "from-amber-500/10 to-orange-500/10"
  },
  {
    id: 4,
    icon: Apple,
    title: "Diet & Lifestyle Counseling",
    subtitle: "Nutrition for Your Dosha",
    desc: "Personalized dietary plans and daily routine (Dinacharya) recommendations aligned with your Dosha type for optimal health.",
    fullDescription: `
      <p>Nutrition is the foundation of health in Ayurveda. Our expert counselors guide you on the right foods and lifestyle for your constitution.</p>
      <h4>Our Approach:</h4>
      <ul>
        <li><strong>Dosha-Specific Nutrition:</strong> Foods that balance your unique constitution</li>
        <li><strong>Seasonal Eating:</strong> Ritucharya - eating according to seasons</li>
        <li><strong>Daily Routines:</strong> Dinacharya for optimal health</li>
        <li><strong>Digestive Health:</strong> Understanding Agni (digestive fire)</li>
        <li><strong>Mindful Eating:</strong> Practices for better digestion</li>
      </ul>
      <h4>Areas Covered:</h4>
      <ul>
        <li>Meal planning and recipes</li>
        <li>Food combinations and cooking methods</li>
        <li>Timing of meals</li>
        <li>Herbal teas and drinks</li>
        <li>Detox diets and fasting</li>
      </ul>
    `,
    benefits: [
      "Dosha-specific diet",
      "Seasonal guidance",
      "Routine optimization",
      "Long-term health",
      "Better digestion",
      "Increased energy"
    ],
    duration: "45-60 minutes",
    price: "₹1,200 - ₹2,000",
    category: "Lifestyle",
    popular: false,
    gradient: "from-red-500/10 to-rose-500/10"
  },
  {
    id: 5,
    icon: Brain,
    title: "Stress & Anxiety Management",
    subtitle: "Mental Wellness Program",
    desc: "Holistic therapies including Shirodhara, meditation, and herbal supplements to calm the mind and restore emotional balance.",
    fullDescription: `
      <p>Modern life brings unprecedented stress, but Ayurveda offers effective solutions for mental well-being.</p>
      <h4>Our Services Include:</h4>
      <ul>
        <li><strong>Shirodhara:</strong> Warm oil poured on the forehead</li>
        <li><strong>Meditation Guidance:</strong> Personalized meditation techniques</li>
        <li><strong>Herbal Support:</strong> Adaptogenic herbs for stress</li>
        <li><strong>Breathing Exercises:</strong> Pranayama for relaxation</li>
        <li><strong>Counseling:</strong> Psychological support</li>
      </ul>
      <h4>Benefits:</h4>
      <ul>
        <li>Immediate stress relief</li>
        <li>Improved sleep quality</li>
        <li>Enhanced mental clarity</li>
        <li>Emotional resilience</li>
        <li>Reduced anxiety</li>
      </ul>
    `,
    benefits: [
      "Mental peace",
      "Better sleep",
      "Emotional balance",
      "Natural approach",
      "Stress resilience",
      "Clarity of mind"
    ],
    duration: "60-90 minutes",
    price: "₹2,000 - ₹4,000",
    category: "Mental Health",
    popular: true,
    gradient: "from-purple-500/10 to-violet-500/10"
  },
  {
    id: 6,
    icon: Weight,
    title: "Weight Management Program",
    subtitle: "Holistic Weight Balance",
    desc: "A holistic weight management program combining Ayurvedic therapies, dietary modifications, and lifestyle changes for sustainable results.",
    fullDescription: `
      <p>Our weight management program addresses the root cause of weight issues through a holistic approach.</p>
      <h4>Program Components:</h4>
      <ul>
        <li><strong>Metabolic Assessment:</strong> Understanding your Agni (digestive fire)</li>
        <li><strong>Personalized Diet Plan:</strong> Based on your dosha</li>
        <li><strong>Herbal Support:</strong> Ayurvedic metabolism boosters</li>
        <li><strong>Exercise Guidance:</strong> Yoga and physical activity</li>
        <li><strong>Behavioral Counseling:</strong> Lifestyle modifications</li>
      </ul>
      <h4>Our Approach:</h4>
      <ul>
        <li>No crash diets or fasting</li>
        <li>Gradual, sustainable weight loss</li>
        <li>Focus on overall health, not just weight</li>
        <li>Long-term weight maintenance strategies</li>
      </ul>
    `,
    benefits: [
      "Metabolism boost",
      "Healthy digestion",
      "Sustainable results",
      "Body-type specific",
      "Holistic approach",
      "Lasting change"
    ],
    duration: "3-6 months",
    price: "₹8,000 - ₹25,000",
    category: "Wellness",
    popular: false,
    gradient: "from-teal-500/10 to-cyan-500/10"
  },
  {
    id: 7,
    icon: Sparkles,
    title: "Skin & Hair Treatment",
    subtitle: "Natural Beauty Care",
    desc: "Natural Ayurvedic treatments for skin conditions like eczema, acne, and hair issues using herbal remedies and specialized therapies.",
    fullDescription: `
      <p>Beautiful skin and healthy hair reflect inner health. Our treatments address underlying imbalances causing skin and hair issues.</p>
      <h4>Skin Treatments:</h4>
      <ul>
        <li><strong>Acne & Pimples:</strong> Herbal formulations and therapies</li>
        <li><strong>Eczema & Psoriasis:</strong> Medicated oil applications</li>
        <li><strong>Anti-Aging:</strong> Rejuvenation therapies</li>
        <li><strong>Skin Glow:</strong> Herbal facials and masks</li>
      </ul>
      <h4>Hair Treatments:</h4>
      <ul>
        <li>Hair fall control</li>
        <li>Premature greying</li>
        <li>Scalp conditions (dandruff, psoriasis)</li>
        <li>Hair rejuvenation</li>
      </ul>
    `,
    benefits: [
      "Natural glow",
      "Hair nourishment",
      "Chemical-free",
      "Root cause treatment",
      "Long-lasting results"
    ],
    duration: "Varies by condition",
    price: "₹1,500 - ₹5,000",
    category: "Cosmetology",
    popular: false,
    gradient: "from-pink-500/10 to-rose-500/10"
  },
  {
    id: 8,
    icon: Bone,
    title: "Joint & Arthritis Treatment",
    subtitle: "Pain Management & Mobility",
    desc: "Specialized Ayurvedic therapies including Janu Basti, herbal oil massages, and internal medicines for joint pain and arthritis relief.",
    fullDescription: `
      <p>Arthritis and joint pain affect millions. Our comprehensive Ayurvedic approach provides effective relief without side effects.</p>
      <h4>Our Therapies:</h4>
      <ul>
        <li><strong>Janu Basti:</strong> Specialized knee treatment</li>
        <li><strong>Abhyanga:</strong> Medicated oil massage</li>
        <li><strong>Swedana:</strong> Herbal steam therapy</li>
        <li><strong>Local Applications:</strong> Herbal pastes and oils</li>
      </ul>
      <h4>Conditions Treated:</h4>
      <ul>
        <li>Osteoarthritis</li>
        <li>Rheumatoid arthritis</li>
        <li>Gout</li>
        <li>Joint stiffness</li>
        <li>Muscular pain</li>
      </ul>
    `,
    benefits: [
      "Pain relief",
      "Improved mobility",
      "Reduced inflammation",
      "Strengthened joints",
      "Drug-free approach"
    ],
    duration: "30-60 minutes",
    price: "₹2,000 - ₹4,000",
    category: "Pain Management",
    popular: false,
    gradient: "from-indigo-500/10 to-blue-500/10"
  },
  {
    id: 9,
    icon: Activity,
    title: "Digestive Disorders Treatment",
    subtitle: "Gut Health Restoration",
    desc: "Comprehensive treatment for IBS, acidity, constipation, and other digestive issues through Ayurvedic medicine and dietary corrections.",
    fullDescription: `
      <p>Ayurveda places great importance on digestive health (Agni). Our program addresses chronic digestive issues at their root.</p>
      <h4>Conditions Treated:</h4>
      <ul>
        <li><strong>IBS & IBD:</strong> Irritable bowel syndrome and related conditions</li>
        <li><strong>Acidity & GERD:</strong> Acid reflux and heartburn</li>
        <li><strong>Constipation:</strong> Chronic bowel issues</li>
        <li><strong>Bloating & Gas:</strong> Digestive discomfort</li>
        <li><strong>Food Intolerances:</strong> Dietary sensitivities</li>
      </ul>
      <h4>Treatment Approach:</h4>
      <ul>
        <li>Gentle digestive cleanses</li>
        <li>Herbal formulations for digestion</li>
        <li>Dietary corrections</li>
        <li>Lifestyle modifications</li>
        <li>Stress reduction techniques</li>
      </ul>
    `,
    benefits: [
      "Improved digestion",
      "Gut health restoration",
      "Appetite regulation",
      "Toxin elimination",
      "Better nutrient absorption"
    ],
    duration: "45-60 minutes",
    price: "₹1,500 - ₹3,000",
    category: "Internal Medicine",
    popular: false,
    gradient: "from-yellow-500/10 to-amber-500/10"
  }
];

const specializedServices = [
  {
    id: 10,
    icon: Eye,
    title: "Eye & ENT Care",
    subtitle: "Specialized Treatments",
    desc: "Netratarpan (eye therapy), Karnapuran (ear therapy), and other specialized ENT treatments using Ayurvedic methods.",
    price: "₹1,000 - ₹3,000",
    gradient: "from-sky-500/10 to-blue-500/10"
  },
  {
    id: 11,
    icon: HeartHandshake,
    title: "Women's Health",
    subtitle: "Complete Wellness for Women",
    desc: "Specialized care for PCOD, menstrual health, menopause, pregnancy, and reproductive wellness.",
    price: "₹1,500 - ₹4,000",
    gradient: "from-rose-500/10 to-pink-500/10"
  },
  {
    id: 12,
    icon: Baby,
    title: "Pediatric Ayurveda",
    subtitle: "Children's Health & Wellness",
    desc: "Gentle Ayurvedic treatments for children's health, immunity building, and developmental support.",
    price: "₹1,000 - ₹2,000",
    gradient: "from-emerald-500/10 to-green-500/10"
  },
  {
    id: 13,
    icon: Thermometer,
    title: "Fever & Infection Care",
    subtitle: "Natural Immune Support",
    desc: "Ayurvedic management of fevers, infections, and immune system support using natural remedies.",
    price: "₹800 - ₹1,500",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  {
    id: 14,
    icon: Microscope,
    title: "Diagnostic Services",
    subtitle: "Advanced Health Assessment",
    desc: "Comprehensive diagnostic services including pulse diagnosis, tongue examination, and health screenings.",
    price: "₹500 - ₹2,000",
    gradient: "from-violet-500/10 to-purple-500/10"
  },
  {
    id: 15,
    icon: TestTube,
    title: "Laboratory Services",
    subtitle: "Comprehensive Testing",
    desc: "Full range of Ayurvedic and modern diagnostic laboratory services for accurate health assessment.",
    price: "₹500 - ₹3,000",
    gradient: "from-cyan-500/10 to-teal-500/10"
  }
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [expandedService, setExpandedService] = useState(null);

  const categories = ["All", ...new Set(services.map(s => s.category))];

  const filteredServices = selectedCategory === "All" 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 6);

  const toggleExpand = (id) => {
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
              { icon: Users, label: "Happy Patients", value: "10,000+" },
              { icon: Award, label: "Years Experience", value: "25+" },
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
                              <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full">
                                <Pill className="h-4 w-4 text-primary" />
                                {s.price}
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

                          {/* Full Description */}
                          {s.fullDescription && expandedService === s.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 p-5 bg-secondary/20 rounded-xl border border-border/30"
                            >
                              <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                                <div dangerouslySetInnerHTML={{ __html: s.fullDescription }} />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-center gap-3 shrink-0 min-w-[140px]">
                          <Button asChild className="w-full gap-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow">
                            <Link to="/consultation">
                              Book Now
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full gap-1"
                            onClick={() => toggleExpand(s.id)}
                          >
                            {expandedService === s.id ? "Hide Details" : "View Details"}
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

      {/* Specialized Services */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-secondary/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Specialized Services"
            subtitle="Additional treatments for comprehensive care"
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((s, index) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:border-primary/20 group border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} text-primary mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <s.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">{s.subtitle}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-4 text-sm font-semibold text-primary bg-primary/5 px-4 py-2 rounded-full inline-block">
                      {s.price}
                    </div>
                    <Button variant="link" size="sm" className="mt-3 gap-1 group-hover:gap-2 transition-all" asChild>
                      <Link to="/consultation">
                        Learn More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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