import { NavLink } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/nlp-logo.jpeg";

const Footer = () => (
  <footer className="bg-ink text-parchment/80">
    <div className="container-content grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-3">
          <img src={logo} alt="NLP crest" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg font-semibold text-parchment">
            National Lawyers Parliament
          </span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment/60">
          Preparing young lawyers across Pakistan to understand, engage with, and contribute to
          parliamentary process and democratic institutions.
        </p>
        {/* <div className="mt-6 flex gap-4">
          {[Facebook, Instagram, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social media link"
              className="rounded-full border border-parchment/20 p-2 text-parchment/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon size={16} />
            </a>
          ))}
        </div> */}
<a className="text-sm mt-4" href="/admin/login">
  <br />
    <span className="mr-2">•</span>
  Admin Portal
</a>      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Navigate</h3>
        <ul className="mt-5 flex flex-col gap-3 text-sm">
          <li>
            <NavLink to="/" className="hover:text-gold-200">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-gold-200">
              About NLP
            </NavLink>
          </li>
          <li>
            <NavLink to="/join" className="hover:text-gold-200">
              Join NLP
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-gold-200">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Organization</h3>
        <ul className="mt-5 flex flex-col gap-3 text-sm text-parchment/60">
          <li>Not a law firm</li>
          <li>Not a political party</li>
          <li>Not a government body</li>
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Contact</h3>
        <ul className="mt-5 flex flex-col gap-3 text-sm text-parchment/60">
          <li className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
            <span>Lahore, Pakistan</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-gold-300" />
            <span>+92 305 1309191</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={16} className="shrink-0 text-gold-300" />
            <span>nationallawyers@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-parchment/10 py-6">
      <p className="container-content text-center text-xs text-parchment/40">
        &copy; {new Date().getFullYear()} National Lawyers Parliament. All rights reserved. <br /> Website Developed by <a
  className="underline text-yellow-50"
  href="https://www.senibytesolutions.com"
  target="_blank"
  rel="noopener noreferrer"
>
  SeniByte Solutions
</a>
      </p>
    </div>
  </footer>
);

export default Footer;
