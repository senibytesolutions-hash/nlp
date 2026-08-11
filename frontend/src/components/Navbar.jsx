import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/nlp-logo.jpeg";
import Button from "./Button.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "About NLP", to: "/about" },
  { label: "Join NLP", to: "/join" },
  { label: "Contact Us", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-stone-dark/50 bg-parchment/95 backdrop-blur"
          : "border-transparent bg-parchment"
      }`}
    >
      <nav
        className="container-content flex h-20 items-center justify-between"
        aria-label="Primary"
      >
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="National Lawyers Parliament crest"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-ink">NLP</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60">
              National Lawyers Parliament
            </span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-forest" : "text-charcoal/70 hover:text-forest"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-gold"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button to="/join" variant="primary">
            Apply to Join
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-stone-dark/50 bg-parchment md:hidden"
          >
            <ul className="container-content flex flex-col gap-1 py-4">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-3 text-base font-medium ${
                        isActive ? "bg-forest-50 text-forest" : "text-charcoal/80"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Button to="/join" variant="primary" className="w-full">
                  Apply to Join
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
