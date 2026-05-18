// We import useState from React.
// useState lets us track things that change — like whether
// the mobile menu is open or closed.
import { useState } from "react";

function Navbar() {
  // isMenuOpen is our state variable — starts as false (menu closed).
  // setIsMenuOpen is the function we call to change it.
  // Think of it like: const isMenuOpen = false, but React-powered.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function toggles the menu open/closed when hamburger is clicked.
  // "prev" is the previous state value — we flip it to the opposite.
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Closes the menu — called when a mobile nav link is clicked.
  // So the menu doesn't stay open after navigation.
  const closeMenu = () => setIsMenuOpen(false);

  // Nav links defined as an array — cleaner than repeating
  // the same JSX five times. We'll loop over this with .map()
  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#testimonials" },
  ];

  return (
    // <header> is fixed to the top — stays visible while scrolling.
    // z-50 keeps it above all other content.
    // backdrop-blur-md gives the frosted glass effect.
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md border-b border-blue-700/30">
      <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* ── LOGO ── */}
        {/* Clicking scrolls back to top of page */}
        <a href="#home" className="text-2xl font-bold tracking-wide">
          {/* Two spans let us color each word differently */}
          <span className="text-red-500">Laundry</span>
          <span className="text-white font-light">Mart</span>
        </a>

        {/* ── DESKTOP NAV LINKS ── */}
        {/* hidden on mobile (hidden), flex on medium screens and up (md:flex) */}
        <nav className="hidden md:flex items-center gap-8">
          {/* .map() loops over navLinks array and renders one <a> per item */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Book Now CTA — stands out from regular links */}
          <a
            href="#booking"
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200"
          >
            Book Now
          </a>
        </nav>

        {/* ── HAMBURGER BUTTON (mobile only) ── */}
        {/* md:hidden means visible on mobile, hidden on desktop */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {/* Each span is one line of the hamburger icon.
              When isMenuOpen is true, we rotate them into an X shape. */}
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          ></span>
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      {/* Only renders in the DOM when isMenuOpen is true.
          The && operator means: "if isMenuOpen, show this" */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-700/30 px-6 py-4">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 text-sm tracking-widest uppercase text-white/70 hover:text-white border-b border-white/10 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#booking"
              onClick={closeMenu}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold tracking-widest uppercase text-center py-3 rounded-sm transition-colors duration-200"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
