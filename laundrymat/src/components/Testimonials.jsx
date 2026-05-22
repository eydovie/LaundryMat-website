import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTheme } from "../context/useTheme";

const testimonials = [
  {
    name: "James Osei",
    role: "Finance Director, Accra",
    quote:
      "My suits have never looked this sharp. LaundryMart's dry cleaning is an entirely different level. I won't trust anyone else with my wardrobe.",
    rating: 5,
    initial: "JO",
    color: "blue",
  },
  {
    name: "Abena Mensah",
    role: "Entrepreneur & Mother of Three",
    quote:
      "The pickup and delivery service is an absolute lifesaver. Clothes come back immaculately folded, always on time. It's one less thing to think about.",
    rating: 5,
    initial: "AM",
    color: "red",
    featured: true,
  },
  {
    name: "Daniel Kumi",
    role: "Hotel Operations Manager",
    quote:
      "We switched our hotel linen service to LaundryMart and guest satisfaction scores on cleanliness jumped immediately. Genuinely professional operation.",
    rating: 5,
    initial: "DK",
    color: "blue",
  },
  {
    name: "Efua Asante",
    role: "Fashion Designer",
    quote:
      "As someone who works with delicate fabrics daily, I am extremely particular. LaundryMart handles every piece as if it were their own. Exceptional.",
    rating: 5,
    initial: "EA",
    color: "blue",
  },
  {
    name: "Kofi Boateng",
    role: "CEO, TechStart Ghana",
    quote:
      "The corporate plan is a game changer for our team. Bulk pickups, invoice billing, zero hassle. Exactly what a growing company needs.",
    rating: 5,
    initial: "KB",
    color: "red",
  },
  {
    name: "Ama Owusu",
    role: "Medical Doctor",
    quote:
      "With my schedule, I barely have time to breathe. LaundryMart's express service means I always have clean scrubs ready. An absolute essential.",
    rating: 5,
    initial: "AO",
    color: "blue",
  },
];

function Testimonials() {
  const { theme } = useTheme();
  return (
    <section
      id="testimonials"
      className="relative py-32 overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ── Background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 0% 50%,   rgba(185,28,28,0.08)  0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 50%, rgba(29,78,216,0.10)  0%, transparent 60%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
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
          <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            Client Stories
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Trusted by Thousands{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: theme.gradientText }}
              >
                Across the City
              </span>
            </h2>

            {/* Aggregate rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-start lg:items-end gap-1"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-red-500"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-white font-black text-3xl">4.9 / 5.0</p>
              <p className="text-blue-100/40 text-xs font-light tracking-wide">
                Based on 2,400+ verified reviews
              </p>
            </motion.div>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-red-500/40 via-blue-500/30 to-transparent" />
        </motion.div>

        {/* ── Testimonials grid ──
            Masonry-style: 3 columns on desktop.
            Featured card spans visually by being taller. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} testimonial={t} index={index} />
          ))}
        </div>

        {/* ── Bottom social proof bar ── */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-12 py-8"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          {[
            { num: "12,000+", label: "Happy Clients" },
            { num: "98%", label: "Satisfaction Rate" },
            { num: "2,400+", label: "Verified Reviews" },
            { num: "8 Years", label: "Trusted Service" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-white font-black text-3xl">{stat.num}</p>
              <p className="text-blue-100/35 text-xs font-light tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TestimonialCard component ──
function TestimonialCard({ testimonial }) {
  const isRed = testimonial.color === "red";
  const { theme } = useTheme();

  return (
    <motion.div
      style={{
        background: testimonial.featured ? `${theme.accent}10` : theme.bgCard,
        border: `1px solid ${testimonial.featured ? theme.accent + "30" : theme.border}`,
        color: theme.text,
      }}
      className="relative flex flex-col gap-5 p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Giant decorative quote mark — top right */}
      <Quote
        size={40}
        className={`absolute top-5 right-6 opacity-10
          ${isRed ? "text-red-400" : "text-blue-400"}
        `}
        fill="currentColor"
      />

      {/* Star rating */}
      <div className="flex items-center gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={13}
            className="text-red-500"
            fill="currentColor"
          />
        ))}
      </div>

      {/* Quote text */}
      <p
        style={{ color: theme.textSub }}
        className="font-light leading-relaxed text-sm flex-1"
      >
        "{testimonial.quote}"
      </p>

      {/* Divider */}
      <div
        className={`h-px
        ${
          isRed
            ? "bg-gradient-to-r from-red-500/20 to-transparent"
            : "bg-gradient-to-r from-blue-500/15 to-transparent"
        }
      `}
      />

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar circle with initials */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0
          ${
            isRed
              ? "bg-red-600/30 text-red-300 border border-red-500/30"
              : "bg-blue-600/25 text-blue-300 border border-blue-500/25"
          }
        `}
        >
          {testimonial.initial}
        </div>

        <div>
          <p style={{ color: theme.text }} className="font-semibold text-sm">
            {testimonial.name}
          </p>
          <p style={{ color: theme.textMuted }} className="text-xs font-light">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Testimonials;
