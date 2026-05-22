import { motion } from "framer-motion";
import {
  WashingMachine,
  Shirt,
  Wind,
  Truck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../context/useTheme";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const services = [
  {
    icon: WashingMachine,
    title: "Wash & Fold",
    description:
      "Sorted by color and fabric, washed at precise temperatures, then neatly folded and packaged in our signature wrap.",
    price: "From $2.50 / lb",
    tag: "Most Popular",
    featured: false,
  },
  {
    icon: Shirt,
    title: "Dry Cleaning",
    description:
      "Professional solvent-based cleaning for suits, dresses, and delicate formal wear that demand specialist attention.",
    price: "From $12.00 / item",
    tag: null,
    featured: false,
  },
  {
    icon: Wind,
    title: "Ironing & Pressing",
    description:
      "Crisp, wrinkle-free results on everything from boardroom shirts to couture evening gowns. Pressed to perfection.",
    price: "From $3.00 / item",
    tag: null,
    featured: false,
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    description:
      "We collect from your door, care for every garment, and return them fresh — all on your schedule, no extra hassle.",
    price: "Free over $30",
    tag: null,
    featured: false,
  },
  {
    icon: Zap,
    title: "Express Service",
    description:
      "Urgent? Our same-day express lane handles your garments with the same meticulous care — just dramatically faster.",
    price: "Ready in 4 hours",
    tag: "Express",
    featured: true, // this card gets special red treatment
  },
];

function Services() {
  const { theme } = useTheme();
  return (
    <section
      id="services"
      className="relative py-32 overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ── Background glows ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(29,78,216,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          {/* whileInView triggers the animation when the element
              scrolls into the viewport — not on page load.
              once: true means it only animates once, not every scroll. */}

          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            What We Offer
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Five-Star Services,{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: theme.gradientText }}
              >
                Tailored to You
              </span>
            </h2>
            <p className="text-blue-100/40 font-light leading-relaxed max-w-sm lg:text-right">
              Every garment receives the same meticulous attention to detail —
              regardless of the service chosen.
            </p>
          </div>

          {/* Decorative divider line */}
          <div
            className="mt-8 h-px"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}60, ${theme.accent}40, transparent)`,
            }}
          />
        </motion.div>

        {/* ── Services grid ── */}
        {/* First row: 3 cards. Second row: 2 cards centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
        >
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* Second row — 2 cards, centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto"
        >
          {services.slice(3).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(220,38,38,0.3)]"
          >
            Book Any Service Now
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── ServiceCard — extracted as its own component ──
// When a piece of UI is reused (5 times here), we extract it.
// Props let each card receive its own data.
function ServiceCard({ service }) {
  const Icon = service.icon;
  const { theme } = useTheme();

  return (
    <motion.article
      variants={cardVariants}
      style={{
        background: service.featured ? `${theme.accent}15` : theme.bgCard,
        border: `1px solid ${service.featured ? theme.accent + "40" : theme.border}`,
        color: theme.text,
      }}
      className="group relative flex flex-col gap-5 p-8 rounded-2xl transition-all duration-300 cursor-default hover:-translate-y-1"
    >
      {/* Optional tag badge */}
      {service.tag && (
        <span
          className={`absolute top-5 right-5 text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full
          ${service.featured ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-blue-500/15 text-blue-300 border border-blue-500/20"}
        `}
        >
          {service.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
        ${
          service.featured
            ? "bg-red-500/20 text-red-400 group-hover:bg-red-500/30"
            : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
        }
      `}
      >
        <Icon size={22} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 style={{ color: theme.text }} className="font-bold text-xl">
          {service.title}
        </h3>
        <p
          style={{ color: theme.textMuted }}
          className="font-light leading-relaxed text-sm flex-1"
        >
          {service.description}
        </p>
      </div>

      {/* Footer: price + arrow */}
      <div
        className="flex items-center justify-between pt-4 border-t border-white/5"
        style={{ borderTop: `1px solid ${theme.border}` }}
      >
        <span
          className={`text-sm font-semibold ${service.featured ? "text-red-400" : "text-blue-400"}`}
        >
          {service.price}
        </span>
        <ArrowRight
          size={15}
          className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200
            ${service.featured ? "text-red-400" : "text-blue-400"}
          `}
        />
      </div>
    </motion.article>
  );
}

export default Services;
