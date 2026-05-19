import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Shirt,
  CheckCircle,
  ArrowRight,
  Loader2,
  Shield,
  Star,
  Truck,
} from "lucide-react";

// Form fields defined as data — cleaner than repeating
// JSX for every single input manually
const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "wash-fold", label: "Wash & Fold" },
  { value: "dry-cleaning", label: "Dry Cleaning" },
  { value: "ironing", label: "Ironing & Pressing" },
  { value: "express", label: "Express Service (4hrs)" },
  { value: "multiple", label: "Multiple Services" },
];

const timeOptions = [
  { value: "", label: "Select a time window..." },
  { value: "morning", label: "Morning  (8 AM – 11 AM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 3 PM)" },
  { value: "evening", label: "Evening  (4 PM – 7 PM)" },
];

const perks = [
  {
    icon: Shield,
    title: "Satisfaction Guarantee",
    sub: "Not happy? We re-clean free, no questions asked.",
  },
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    sub: "On all orders over $30. We come straight to your door.",
  },
  {
    icon: Star,
    title: "Premium Packaging",
    sub: "Every return wrapped in our signature LaundryMart finish.",
  },
];

// Initial empty form state — defined once outside the component
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

function Booking() {
  // form: holds all field values
  const [form, setForm] = useState(initialForm);
  // errors: holds validation error messages per field
  const [errors, setErrors] = useState({});
  // status: 'idle' | 'loading' | 'success'
  const [status, setStatus] = useState("idle");

  // Generic change handler — works for ALL inputs and selects.
  // e.target.name matches the name="" attribute on each field.
  // We use spread (...prev) to keep existing values and only
  // update the one field that changed.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation — runs before submission.
  // Returns an errors object. If it's empty, form is valid.
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Please select a pickup date";
    if (!form.time) e.time = "Please select a time window";
    return e;
  };

  const handleSubmit = async (e) => {
    // Prevent the default browser page-reload on form submit
    e.preventDefault();

    // Run validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, store them in state and stop
      setErrors(validationErrors);
      return;
    }

    // Show loading spinner
    setStatus("loading");

    // Simulate an API call with a 2 second delay.
    // In production you'd replace this with a real fetch() to your backend.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success state
    setStatus("success");
  };

  // Get today's date in YYYY-MM-DD format for the date input's min attribute
  // This prevents users from selecting past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      id="booking"
      className="relative bg-[#060B18] py-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 0% 100%,   rgba(29,78,216,0.12)  0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 100% 0%,   rgba(185,28,28,0.10)  0%, transparent 60%)
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
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            Book a Service
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Ready When{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #3B82F6, #DC2626)",
                }}
              >
                You Are
              </span>
            </h2>
            <p className="text-blue-100/40 font-light leading-relaxed max-w-sm lg:text-right">
              Schedule your pickup in minutes. We confirm instantly and arrive
              right on time.
            </p>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-red-500/40 via-blue-500/30 to-transparent" />
        </motion.div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ════════════════════
              LEFT — Perks & info
              ════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6"
          >
            {/* Perk cards */}
            {perks.map(({ icon: Icon, title, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-5 bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-red-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-blue-100/40 text-xs font-light leading-relaxed">
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Contact info block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-blue-500/20 rounded-2xl p-6"
            >
              <p className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Prefer to call?
              </p>
              <p className="text-white font-black text-2xl mb-1">
                +1 (555) 234-5678
              </p>
              <p className="text-blue-100/40 text-xs font-light">
                Mon – Sat, 7 AM – 8 PM. We're always ready.
              </p>
            </motion.div>
          </motion.div>
          {/* END LEFT */}

          {/* ════════════════════
              RIGHT — The form
              ════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* AnimatePresence allows the form and success state
                to animate in/out when switching between them */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                // ── Success state ──
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center gap-6 bg-white/[0.03] border border-white/8 rounded-2xl p-12"
                >
                  {/* Animated checkmark circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                  >
                    <CheckCircle size={36} className="text-green-400" />
                  </motion.div>

                  <div>
                    <h3 className="text-white font-black text-3xl mb-3">
                      Booking Confirmed!
                    </h3>
                    <p className="text-blue-100/50 font-light leading-relaxed">
                      We've received your booking and will send a confirmation
                      to{" "}
                      <span className="text-white font-medium">
                        {form.email}
                      </span>{" "}
                      within minutes. Our courier will arrive right on time.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm(initialForm);
                    }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Book Another
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                // ── The form ──
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5"
                >
                  <h3 className="text-white font-bold text-xl pb-4 border-b border-white/8">
                    Schedule Your Pickup
                  </h3>

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="First Name"
                      icon={User}
                      error={errors.firstName}
                    >
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Kwame"
                        autoComplete="given-name"
                        className={inputClass(errors.firstName)}
                      />
                    </Field>
                    <Field
                      label="Last Name"
                      icon={User}
                      error={errors.lastName}
                    >
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Asante"
                        autoComplete="family-name"
                        className={inputClass(errors.lastName)}
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email Address" icon={Mail} error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass(errors.email)}
                    />
                  </Field>

                  {/* Phone */}
                  <Field label="Phone Number" icon={Phone} error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      className={inputClass(errors.phone)}
                    />
                  </Field>

                  {/* Address */}
                  <Field
                    label="Pickup Address"
                    icon={MapPin}
                    error={errors.address}
                  >
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, Accra"
                      autoComplete="street-address"
                      className={inputClass(errors.address)}
                    />
                  </Field>

                  {/* Service + Date row */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Service Type"
                      icon={Shirt}
                      error={errors.service}
                    >
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={inputClass(errors.service)}
                      >
                        {serviceOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="Pickup Date"
                      icon={Calendar}
                      error={errors.date}
                    >
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        className={inputClass(errors.date)}
                      />
                    </Field>
                  </div>

                  {/* Time */}
                  <Field
                    label="Preferred Time"
                    icon={Clock}
                    error={errors.time}
                  >
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={inputClass(errors.time)}
                    >
                      {timeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Notes */}
                  <Field
                    label="Special Instructions (optional)"
                    icon={null}
                    error={null}
                  >
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Delicate items, stains, access instructions..."
                      className={`${inputClass(null)} resize-none`}
                    />
                  </Field>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm tracking-widest uppercase py-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(220,38,38,0.35)] mt-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Confirming Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center text-blue-100/25 text-xs font-light">
                    🔒 Your information is secure and never shared.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          {/* END RIGHT */}
        </div>
      </div>
    </section>
  );
}

// ── Field wrapper component ──
// Wraps every input with a label and error message.
// Keeps the form JSX clean and consistent.
function Field({ label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-blue-100/50 text-xs font-semibold tracking-[0.12em] uppercase flex items-center gap-2">
        {Icon && <Icon size={11} className="text-blue-400" />}
        {label}
      </label>
      {children}
      {/* Only renders the error span when there's an error message */}
      {error && (
        <span className="text-red-400 text-xs font-light flex items-center gap-1">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

// ── inputClass helper ──
// Returns the correct Tailwind classes for an input.
// Red border when there's an error, normal when not.
// Defined as a function so we call it: className={inputClass(errors.field)}
function inputClass(error) {
  return `
    w-full bg-white/5 border rounded-lg px-4 py-3
    text-white text-sm font-light placeholder-blue-100/20
    focus:outline-none focus:ring-0 transition-colors duration-200
    [&>option]:bg-[#0E1628] [&>option]:text-white
    ${
      error
        ? "border-red-500/60 focus:border-red-400"
        : "border-white/10 focus:border-blue-500/60 hover:border-white/20"
    }
  `;
}

export default Booking;
