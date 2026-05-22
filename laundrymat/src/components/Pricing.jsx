import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, Star } from "lucide-react";
import { useTheme } from "../context/useTheme";

const plans = [
  {
    name: "Essential",
    price: "0",
    frequency: "Pay per use — no commitment",
    description:
      "Perfect for occasional laundry needs with no strings attached.",
    featured: false,
    color: "blue",
    features: [
      "Wash & fold from $2.50/lb",
      "Dry cleaning & pressing",
      "Standard 24hr turnaround",
      "Free pickup on orders over $30",
      "Real-time order tracking",
      "Digital receipts & history",
    ],
    cta: "Get Started",
    href: "#booking",
  },
  {
    name: "Premium Monthly",
    price: "49",
    frequency: "per month, billed monthly",
    description:
      "Our most popular plan for busy professionals who want it all.",
    featured: true,
    color: "red",
    features: [
      "Everything in Essential",
      "20% off all services always",
      "Priority express lane included",
      "Always-free pickup & delivery",
      "Dedicated account manager",
      "Monthly garment care report",
      "Premium signature packaging",
    ],
    cta: "Subscribe Now",
    href: "#booking",
  },
  {
    name: "Corporate",
    price: null,
    frequency: "Volume pricing for businesses",
    description:
      "Tailored solutions for hotels, offices, and high-volume clients.",
    featured: false,
    color: "blue",
    features: [
      "Bulk volume discounts",
      "Dedicated pickup schedule",
      "Invoice & PO billing",
      "Employee portal access",
      "SLA-backed turnaround",
      "On-site management available",
    ],
    cta: "Contact Sales",
    href: "#booking",
  },
];

function Pricing() {
  const { theme } = useTheme();
  return (
    <section
      id="pricing"
      className="relative py-32 overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ── Background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(29,78,216,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 80%,  rgba(185,28,28,0.08) 0%, transparent 60%)
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
          className="mb-20 text-center"
        >
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            Simple Pricing
          </span>

          <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Transparent Plans,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: theme.gradientText }}
            >
              No Surprises
            </span>
          </h2>

          <p className="text-blue-100/40 font-light max-w-lg mx-auto leading-relaxed">
            Whether you're an occasional user or a high-volume client, there's a
            plan built exactly for you.
          </p>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </motion.div>

        {/* ── Pricing cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* ── Bottom reassurance strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { icon: Zap, text: "Cancel anytime" },
            { icon: Star, text: "No hidden fees ever" },
            { icon: Check, text: "Satisfaction guaranteed" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-blue-100/40 text-sm font-light"
            >
              <Icon size={14} className="text-red-500" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── PricingCard component ──
function PricingCard({ plan }) {
  const { theme } = useTheme();
  return (
    <motion.div
      style={{
        background: plan.featured ? `${theme.accent}15` : theme.bgCard,
        border: `1px solid ${plan.featured ? theme.accent + "50" : theme.border}`,
      }}
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300
    ${
      plan.featured
        ? "scale-105 shadow-2xl"
        : "hover:-translate-y-1 hover:shadow-xl"
    }
  `}
    >
      {/* Featured badge */}
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
          <Star size={10} fill="currentColor" />
          Most Popular
        </div>
      )}

      {/* Plan header */}
      <div className="mb-8">
        <p
          style={{ color: plan.featured ? theme.accent : theme.primary }}
          className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
        >
          {plan.name}
        </p>

        {/* Price display */}
        <div className="flex items-end gap-1 mb-2">
          {plan.price !== null ? (
            <>
              {/* Only show $ sign when there's a numeric price */}
              <span className="text-white/40 text-2xl font-light mb-1">$</span>
              <span
                style={{ color: theme.text }}
                className="text-6xl font-black leading-none"
              >
                {plan.price}
              </span>
            </>
          ) : (
            // Corporate plan: show "Custom" instead of a number
            <span className="text-5xl font-black text-white leading-none">
              Custom
            </span>
          )}
        </div>

        <p
          style={{ color: theme.textMuted }}
          className="text-xs font-light mb-4"
        >
          {plan.frequency}
        </p>

        <p className="text-blue-100/50 text-sm font-light leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Divider */}
      <div
        className={`h-px mb-8
        ${
          plan.featured
            ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
        }
      `}
      />

      {/* Features list */}
      <ul className="flex flex-col gap-3.5 flex-1 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            {/* Checkmark icon — colored by plan type */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
              ${
                plan.featured
                  ? "bg-red-500/20 text-red-400"
                  : "bg-blue-500/15 text-blue-400"
              }
            `}
            >
              <Check size={11} strokeWidth={3} />
            </div>
            <span
              style={{ color: theme.textSub }}
              className="text-sm font-light leading-snug"
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <a
        href={plan.href}
        className={`group flex items-center justify-center gap-2 w-full py-4 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5
          ${
            plan.featured
              ? "bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_15px_35px_rgba(220,38,38,0.4)]"
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/25"
          }
        `}
      >
        {plan.cta}
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </a>
    </motion.div>
  );
}

export default Pricing;
