import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Camera,
  Send,
  Users,
} from "lucide-react";

const footerLinks = {
  services: [
    { label: "Wash & Fold", href: "#services" },
    { label: "Dry Cleaning", href: "#services" },
    { label: "Ironing & Pressing", href: "#services" },
    { label: "Pickup & Delivery", href: "#services" },
    { label: "Express Service", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const contactItems = [
  { icon: Phone, text: "+1 (555) 234-5678", href: "tel:+15552345678" },
  {
    icon: Mail,
    text: "hello@laundrymart.com",
    href: "mailto:hello@laundrymart.com",
  },
  { icon: MapPin, text: "123 Clean Street, Suite 4", href: "#" },
  { icon: Clock, text: "Mon – Sat: 7 AM – 8 PM", href: "#" },
];

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Send, label: "Twitter", href: "#" },
  { icon: Users, label: "Facebook", href: "#" },
];
function Footer() {
  const { theme } = useTheme();

  // Dynamically get the current year for the copyright line
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* ── Top border gradient line ── */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.primary}60, ${theme.accent}40, transparent)`,
        }}
      />

      {/* ── Background glow ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.primaryGlow} 0%, transparent 70%)`,
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${theme.gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ══════════════════════════════
            TOP SECTION — Brand + Newsletter
            ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-sm">
            {/* Logo */}
            <a href="#home" className="text-3xl font-black tracking-tight">
              <span style={{ color: theme.accent }}>Laundry</span>
              <span style={{ color: theme.text }}>Mart</span>
            </a>
            <p
              className="text-sm font-light leading-relaxed"
              style={{ color: theme.textMuted }}
            >
              Premium laundry and garment care delivered to your door. Trusted
              by thousands across the city since 2016.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
                  style={{
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    color: theme.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.color = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.color = theme.textMuted;
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: theme.accent }}
            >
              Stay in the loop
            </p>
            <p
              className="text-sm font-light"
              style={{ color: theme.textMuted }}
            >
              Get exclusive offers, laundry tips, and monthly updates delivered
              straight to your inbox.
            </p>

            {/* Newsletter form row */}
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-sm text-sm font-light focus:outline-none transition-colors duration-200"
                style={{
                  background: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  color: theme.text,
                }}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = theme.inputBorder)}
              />
              <button
                className="group flex items-center gap-2 px-5 py-3 rounded-sm font-bold text-xs tracking-widest uppercase text-white transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
                style={{ background: theme.accent }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = theme.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = theme.accent)
                }
              >
                Subscribe
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════
            MIDDLE SECTION — Links grid
            ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          {/* Services column */}
          <FooterColumn
            title="Services"
            links={footerLinks.services}
            theme={theme}
          />

          {/* Company column */}
          <FooterColumn
            title="Company"
            links={footerLinks.company}
            theme={theme}
          />

          {/* Legal column */}
          <FooterColumn title="Legal" links={footerLinks.legal} theme={theme} />

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: theme.accent }}
            >
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-start gap-2.5 text-sm font-light transition-colors duration-200 group"
                    style={{ color: theme.textMuted }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = theme.text)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = theme.textMuted)
                    }
                  >
                    <Icon
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: theme.primary }}
                    />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ══════════════════════════════
            BOTTOM BAR — Copyright
            ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs font-light flex items-center gap-1.5"
            style={{ color: theme.textMuted }}
          >
            © {year} LaundryMart. All rights reserved. Made with
            <Heart
              size={11}
              fill="currentColor"
              style={{ color: theme.accent }}
            />
            for clean clothes everywhere.
          </p>

          {/* Mini nav */}
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-light transition-colors duration-200"
                style={{ color: theme.textMuted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.textMuted)
                }
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// ── FooterColumn — reusable link column ──
function FooterColumn({ title, links, theme }) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: theme.accent }}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm font-light transition-colors duration-200"
              style={{ color: theme.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.textMuted)
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
