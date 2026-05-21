import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Clock3, Star } from "lucide-react";
import { useTheme } from "../context/useTheme";

// Animation variants — defined outside component so they don't
// re-create on every render. These drive the staggered entrance.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // each child animates 0.12s after the previous
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  { num: "12K+", label: "Clients Served" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "4hr", label: "Express Turnaround" },
  { num: "8yr", label: "Of Excellence" },
];

function Hero() {
  const { theme } = useTheme();
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ══════════════════════════════════════
          LAYERED BACKGROUND — multiple gradients
          and a grid overlay for depth
          ══════════════════════════════════════ */}

      {/* Base radial glow — top left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at -10% 20%, rgba(29,78,216,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 110% 80%, rgba(185,28,28,0.2) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(29,78,216,0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top edge glow line */}
      <div
        aria-hidden="true"
        className="absolute top-[70px] left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(29,78,216,0.6), rgba(185,28,28,0.4), transparent)",
        }}
      />

      {/* ══════════════════════════════════════
          FLOATING BADGE — top right corner
          ══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-28 right-8 lg:right-16 z-20 hidden lg:flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-white/70 text-xs font-medium tracking-wide">
          Accepting bookings today
        </span>
      </motion.div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center pt-[70px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* ── LEFT: Headline block ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Pill label */}
              <motion.div variants={itemVariants} className="mb-8">
                <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                  <Sparkles size={12} className="text-red-400" />
                  Premium Laundry &amp; Garment Care
                </span>
              </motion.div>

              {/* Giant headline */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white mb-8"
              >
                {/* Each word on its own line for dramatic effect */}
                <span className="block">Spotless.</span>
                <span className="block relative">
                  {/* The word with the red underline brush stroke */}
                  <span className="relative inline-block">
                    Precise.
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 300 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 9 C50 3, 150 3, 298 7"
                        stroke="#DC2626"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
                <span
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #3B82F6 0%, #DC2626 100%)",
                  }}
                >
                  Delivered.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-blue-100/50 text-lg font-light leading-[1.8] max-w-md mb-10"
              >
                White-glove laundry care trusted by thousands. We collect,
                clean, press, and return your garments — immaculate, on time,
                every time.
              </motion.p>

              {/* CTA row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                <a
                  href="#booking"
                  className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(220,38,38,0.35)]"
                >
                  {/* Shine sweep on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span>Book a Pickup</span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>

                <a
                  href="#services"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium tracking-wider transition-colors duration-200 group"
                >
                  <span className="w-8 h-px bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
                  View Services
                </a>
              </motion.div>

              {/* Trust pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: Shield, text: "Satisfaction Guaranteed" },
                  { icon: Clock3, text: "24hr Turnaround" },
                  { icon: Star, text: "4.9 Star Rated" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                  >
                    <Icon size={13} className="text-red-400" />
                    <span className="text-white/60 text-xs font-medium">
                      {text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            {/* END LEFT */}

            {/* ── RIGHT: Visual card stack ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative hidden lg:flex flex-col gap-4"
            >
              {/* Main feature card */}
              <div className="relative bg-gradient-to-br from-blue-900/60 to-blue-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                {/* Card inner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-2xl" />

                <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                  Live Order Status
                </p>

                {/* Fake order tracker */}
                <div className="flex flex-col gap-4">
                  {[
                    { step: "Picked Up", done: true, active: false },
                    { step: "Being Cleaned", done: false, active: true },
                    { step: "Quality Check", done: false, active: false },
                    { step: "Out for Delivery", done: false, active: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {/* Step indicator dot */}
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          s.done
                            ? "bg-green-400"
                            : s.active
                              ? "bg-red-500 animate-pulse ring-4 ring-red-500/20"
                              : "bg-white/15"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          s.done
                            ? "text-green-400"
                            : s.active
                              ? "text-white"
                              : "text-white/30"
                        }`}
                      >
                        {s.step}
                      </span>
                      {s.active && (
                        <span className="ml-auto text-xs text-red-400 font-semibold bg-red-500/10 px-2.5 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/30 text-xs">Order #LM-2847</span>
                  <span className="text-white/30 text-xs">45% complete</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 border border-white/8 rounded-xl p-4 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                  >
                    <span className="block text-2xl font-black text-white group-hover:text-red-400 transition-colors duration-200">
                      {stat.num}
                    </span>
                    <span className="block text-white/35 text-[10px] tracking-widest uppercase mt-1 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom promo strip */}
              <div className="flex items-center justify-between bg-red-600/15 border border-red-500/25 rounded-xl px-6 py-4">
                <div>
                  <p className="text-white font-bold text-sm">
                    Express Service
                  </p>
                  <p className="text-red-300/70 text-xs font-light mt-0.5">
                    Ready in as little as 4 hours
                  </p>
                </div>

                <a
                  href="#booking"
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-sm transition-colors duration-200"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
            {/* END RIGHT */}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM MARQUEE STRIP
          Scrolling ticker — adds life to the page
          ══════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.02] overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap w-max"
        >
          {/* Duplicate the items so the loop is seamless */}
          {[...Array(2)].map((_, di) => (
            <div key={di} className="flex gap-12 items-center">
              {[
                "✦ Wash & Fold",
                "✦ Dry Cleaning",
                "✦ Ironing & Pressing",
                "✦ Express Service",
                "✦ Free Pickup & Delivery",
                "✦ 24hr Turnaround",
                "✦ Premium Packaging",
              ].map((item) => (
                <span
                  key={item}
                  className="text-white/25 text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
