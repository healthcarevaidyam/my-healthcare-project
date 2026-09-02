import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ subtitle, title, description, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {subtitle && (
      <span className="text-accent font-medium text-sm uppercase tracking-widest">
        {subtitle}
      </span>
    )}
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
      {title}
    </h2>
    {description && (
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed mx-auto">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
