import { motion } from "framer-motion";
import logo from "../assets/nlp-logo.jpeg";
import { NavLink } from "react-router-dom";
import presidentImage from "../assets/president.jpeg";
import {
  GraduationCap,
  ScrollText,
  Presentation,
  Building2,
  TrendingUp,
  Landmark,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import ScaleDivider from "../components/ScaleDivider.jsx";
import AnnouncementsSection from "../components/AnnouncementsSection.jsx";

const programs = [
  {
    icon: GraduationCap,
    title: "Parliamentary Education",
    description:
      "Structured coursework on how bills move from committee to floor to presidential assent.",
  },
  {
    icon: ScrollText,
    title: "Legislative Awareness",
    description:
      "Ongoing briefings that keep members fluent in the legislation shaping their profession.",
  },
  {
    icon: Presentation,
    title: "Seminars & Training",
    description:
      "Workshops led by senior practitioners on drafting, procedure, and parliamentary debate.",
  },
  {
    icon: Building2,
    title: "Institutional Engagement",
    description:
      "Direct exposure to assemblies, committees, and the institutions that write Pakistan's laws.",
  },
  {
    icon: TrendingUp,
    title: "Leadership Development",
    description:
      "A structured path from member to spokesperson, built on public speaking and negotiation.",
  },
  {
    icon: Landmark,
    title: "Pathway to Parliament",
    description:
      "A credible, cumulative record of engagement for members considering public office.",
  },
];

const stats = [
  ["2026", "Founded"],
  ["Young Lawyers", "Our Focus"],
  ["Leadership", "Our Mission"],
  ["Impact", "Our Goal"],
];

const contactDetails = [
  { icon: MapPin, label: "Visit", value: "Lahore, Pakistan", href: null },
  { icon: Phone, label: "Call", value: "+92 305 1309191", href: "tel:+923051309191" },
  { icon: Mail, label: "Email", value: "nationallawyers@gmail.com", href: "mailto:nationallawyers@gmail.com" },
];

const Home = () => (
  <>
    {/* HERO */}
    <section className="relative overflow-hidden bg-ink text-parchment">
      {/* Layered architectural backdrop — colonnade + horizon lines, echoes a parliamentary chamber */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="nlp-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#FAF9F5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nlp-dot-grid)" />
      </svg>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 45%, rgba(180,146,58,0.10), transparent 55%)",
        }}
      />

      <div className="container-content relative grid gap-14 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-gold-300"
          >
            National Lawyers Parliament
          </motion.span>  

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-5 text-4xl text-gold-500  font-semibold leading-[1.14] sm:text-5xl lg:text-[3.3rem]"
          >
            Preparing Lawyers for Parliament.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-parchment/70"
          >
            Empowering young lawyers with the knowledge, understanding, and leadership needed to
            engage with Pakistan&rsquo;s parliamentary and legislative processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button to="/join" variant="gold">
              Join NLP <ArrowRight size={16} />
            </Button>
            <Button to="/about" variant="outlineLight">
              Discover NLP
            </Button>
          </motion.div>
        </div>

        {/* Parliamentary emblem visual — colonnade, dome arc, and the scale motif from the crest */}
        {/* NLP crest — full logo in a circular frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative mx-auto hidden aspect-square w-full max-w-xs items-center justify-center md:flex"
        >
          <div className="absolute inset-0 rounded-full border border-gold-700/30" />
          <img
            src={logo}
            alt="National Lawyers Parliament crest"
            className="relative h-66 w-66 rounded-full object-cover"
          />
        </motion.div>
      </div>
    </section>

    {/* ABOUT NLP */}
    <section className="py-24">
      <div className="container-content grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <AnimatedSection className="flex flex-col gap-5">
          <span className="eyebrow">About NLP</span>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Bridging Legal Knowledge with Parliamentary Leadership
          </h2>
          <p className="leading-relaxed text-charcoal/75">
            Young lawyers across Pakistan often graduate with strong legal knowledge but limited
            structured exposure to parliamentary procedure, legislative drafting, and the
            institutions that shape democratic process. National Lawyers Parliament exists to
            close that gap &mdash; giving members a working, practiced fluency in how Parliament
            actually functions, long before they argue their first constitutional matter.
          </p>
          <p className="leading-relaxed text-charcoal/75">
            Experienced lawyers participate as mentors and resource persons, giving NLP a working
            bridge between the bar and the legislature.
          </p>
          <div>
            <Button to="/about" variant="outline">
              Learn More About NLP <ArrowRight size={15} />
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-5">
  {stats.map(([value, label], i) => (
    <div
      key={label}
      className={`rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card ${
        i % 2 === 1 ? "sm:translate-y-5" : ""
      }`}
    >
      <p className="font-display text-xl font-semibold leading-tight text-forest sm:text-2xl md:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-charcoal/60">{label}</p>
    </div>
  ))}
</AnimatedSection>
      </div>
    </section>

    {/* MISSION & VISION */}
    <section className="bg-forest py-24 text-parchment">
      <div className="container-content grid gap-8 md:grid-cols-2">
        <AnimatedSection className="relative overflow-hidden rounded-xl border border-parchment/15 p-9">
          <Compass size={22} className="text-gold-300" />
          <span className="eyebrow mt-5 block text-gold-300">Our Mission</span>
          <p className="mt-4 font-display text-2xl leading-snug">
            Educate and empower young lawyers through parliamentary education, seminars,
            institutional exposure, and leadership development.
          </p>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-gold-300/20" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="relative overflow-hidden rounded-xl border border-parchment/15 p-9">
          <Landmark size={22} className="text-gold-300" />
          <span className="eyebrow mt-5 block text-gold-300">Our Vision</span>
          <p className="mt-4 font-display text-2xl leading-snug">
            A future where young lawyers understand not only how law is practiced, but how
            legislation is created, shaped, implemented, and improved.
          </p>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-gold-300/20" />
        </AnimatedSection>
      </div>
    </section>

    {/* WHAT WE DO */}
    <section className="py-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="What We Do"
          title="A structured path from law student to legislative voice"
          description="Every member's journey through NLP runs across these six areas, building toward genuine parliamentary fluency."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, description }, i) => (
            <AnimatedSection key={title} delay={i * 0.07}>
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-gold-700/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* PRESIDENT'S MESSAGE
    <section className="bg-stone/60 py-24">
      <div className="container-content grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
         <AnimatedSection className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
    
    <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-forest-100 shadow-card">
      <img
        src={presidentImage}
        alt="Mr. Hafiz Sheraz"
        className="h-full w-full object-cover"
      />
    </div>

    <div>
      <p className="font-display text-lg font-semibold text-ink">
        Hafiz Sheraz Hussain
      </p>
      <p className="text-sm text-charcoal/60">
        President, National Lawyers Parliament
      </p>
    </div>

  </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <span className="eyebrow">President&rsquo;s Message</span>
          <blockquote className="mt-4 font-display text-2xl leading-snug text-ink">
            &ldquo;NLP was founded on a simple belief: the legal profession should not only
            understand the law, but also understand how laws are created, shaped, and
            implemented.&rdquo;
          </blockquote>
          <p className="mt-5 leading-relaxed text-charcoal/70">
            By equipping young lawyers with parliamentary knowledge and institutional exposure, we
            hope to prepare a new generation of professionals capable of contributing meaningfully
            to the democratic and legislative future of Pakistan.
          </p>
        </AnimatedSection>
      </div>
    </section> */}

    {/* ANNOUNCEMENTS */}
    <section className="pt-24">
      <div className="container-content">
        <SectionHeading eyebrow="Announcements" title="Stay Updated" align="left" />
      </div>
    </section>
    <AnnouncementsSection />

    {/* JOIN CTA */}
    <section className="relative overflow-hidden bg-ink py-24 text-parchment">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-700/10 blur-3xl" />
      <div className="container-content relative flex flex-col items-center gap-6 text-center">
        <ScaleDivider />
        <h2 className="max-w-xl font-display text-gold-300 text-3xl font-semibold sm:text-4xl">
          Your Journey Toward Parliamentary Leadership Starts Here.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-parchment/65">
          Join a platform committed to preparing young lawyers for meaningful engagement with
          Parliament and the legislative process.
        </p>
        <Button to="/join" variant="gold" className="mt-2">
          Join NLP <ArrowRight size={16} />
        </Button>
      </div>
    </section>

    {/* CONTACT PREVIEW */}
    <section className="py-24">
      <div className="container-content">
        <SectionHeading
          align="left"
          eyebrow="Get in Touch"
          title="National Lawyers Parliament"
          description="Lahore, Pakistan"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
            <AnimatedSection key={label} delay={i * 0.08}>
              <Card>
                <Icon size={20} className="text-gold-600" />
                <p className="mt-4 text-sm font-medium uppercase tracking-wide text-charcoal/50">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="mt-1 block text-ink hover:text-forest">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-ink">{value}</p>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button to="/contact" variant="primary">
            Contact NLP <ArrowRight size={15} />
          </Button>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-600"
          >
            Go to the full contact page <ArrowUpRight size={15} />
          </NavLink>
        </div>
      </div>
    </section>
  </>
);

export default Home;
