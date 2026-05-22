import { motion } from "framer-motion";
import {
  CalendarCheck,
  PackageCheck,
  Sparkles,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../context/useTheme";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book Online",
    description:
      "Choose your service, pick a convenient pickup window, and drop any special instructions. Done in under two minutes.",
    color: "blue",
  },
  {
    number: "02",
    icon: PackageCheck,
    title: "We Collect",
    description:
      "Our uniformed courier arrives precisely at your chosen time, bags your items, and hands you a digital collection receipt.",
    color: "red",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Expert Care",
    description:
      "Every garment is assessed and treated by our specialists using premium, eco-friendly products matched to the fabric type.",
    color: "blue",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Delivered Fresh",
    description:
      "Clean, pressed, and wrapped in our signature packaging — returned to your door within 24 hours of collection.",
    color: "red",
  },
];

function HowItWorks() {
  const { theme } = useTheme();
  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ── Background treatment ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 100% 50%, rgba(185,28,28,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 0% 50%,   rgba(29,78,216,0.10) 0%, transparent 60%)
          `,
        }}
      />

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
          className="mb-24"
        >
          <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            The Process
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Effortless from{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: theme.gradientText }}
              >
                Start to Finish
              </span>
            </h2>
            <p className="text-blue-100/40 font-light leading-relaxed max-w-sm lg:text-right">
              Four simple steps stand between you and perfectly clean laundry at
              your door.
            </p>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-red-500/40 via-blue-500/30 to-transparent" />
        </motion.div>

        {/* ── Steps ── */}
        {/* On desktop: horizontal row. On mobile: vertical stack */}
        <div className="relative">
          {/* Connecting line behind the steps — desktop only */}
          {/* This line runs through the center of all step number circles */}
          <div
            aria-hidden="true"
            className="absolute top-[52px] left-[10%] right-[10%] h-px hidden lg:block"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}40, ${theme.accent}40, ${theme.primary}40)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* ── Bottom feature strip ── */}
        {/* A horizontal card showing extra guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Real-time SMS Updates",
              sub: "Track every step of your order live",
            },
            {
              label: "Signature Packaging",
              sub: "Every return wrapped with care",
            },
            {
              label: "Re-clean Guarantee",
              sub: "Not satisfied? We redo it, free of charge",
            },
          ].map((item) => (
            <motion.div
              style={{
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
              }}
              className="flex items-start gap-4 rounded-xl p-6 transition-all duration-300"
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
                style={{ background: theme.accent }}
              />
              <div>
                <p
                  style={{ color: theme.text }}
                  className="font-semibold text-sm"
                >
                  {item.label}
                </p>
                <p
                  style={{ color: theme.textMuted }}
                  className="text-xs font-light mt-1"
                >
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
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
            Start Your First Order
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

// ── StepCard: individual step component ──
function StepCard({ step, index }) {
  const Icon = step.icon;
  const isBlue = step.color === "blue";
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative flex flex-col items-center lg:items-start text-center lg:text-left group"
    >
      {/* Step number circle — sits ON the connecting line on desktop */}
      <div
        className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center mb-8 z-10 border-2 transition-all duration-300 group-hover:scale-105"
        style={{
          background: theme.bgCard,
          borderColor: isBlue ? `${theme.primary}50` : `${theme.accent}50`,
          boxShadow: "none",
        }}
      >
        {/* Big faded number behind the icon */}
        <span
          className={`absolute text-6xl font-black opacity-10 select-none
          ${isBlue ? "text-blue-300" : "text-red-300"}
        `}
        >
          {step.number}
        </span>

        {/* Lucide icon on top */}
        <Icon
          size={28}
          className={`relative z-10 transition-colors duration-300
            ${
              isBlue
                ? "text-blue-400 group-hover:text-blue-300"
                : "text-red-400  group-hover:text-red-300"
            }
          `}
        />
      </div>

      {/* Step label */}
      <span
        className={`text-xs font-bold tracking-[0.2em] uppercase mb-3
        ${isBlue ? "text-blue-500" : "text-red-500"}
      `}
      >
        Step {step.number}
      </span>

      <h3 style={{ color: theme.text }} className="font-bold text-xl mb-3">
        {step.title}
      </h3>
      <p
        style={{ color: theme.textMuted }}
        className="font-light leading-relaxed text-sm"
      >
        {step.description}
      </p>
    </motion.div>
  );
}

export default HowItWorks;
