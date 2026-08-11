import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button.jsx";
import presidentImage from "../assets/president.jpeg";
import Card from "../components/Card.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import ScaleDivider from "../components/ScaleDivider.jsx";

const objectives = [
  "Build structured understanding of Pakistan's legislative process among young lawyers.",
  "Provide simulation-based training in parliamentary debate and procedure.",
  "Connect members with mentors from the bar, bench, and legislature.",
  "Produce research and position papers on issues affecting the legal profession.",
  "Create a national network of legally-trained, civically-engaged young professionals.",
];

const steps = [
  {
    step: "Orientation",
    detail: "New members are introduced to NLP's structure, code of conduct, and program calendar.",
  },
  {
    step: "Training Modules",
    detail: "Structured sessions on legislative drafting, constitutional procedure, and debate.",
  },
  {
    step: "Simulation Sessions",
    detail: "Members take part in mock parliamentary sittings modelled on real assembly procedure.",
  },
  {
    step: "Advocacy & Output",
    detail: "Cohorts produce research briefs and position papers submitted to relevant forums.",
  },
];

const About = () => (
  <>
    <section className="bg-ink py-20 text-parchment">
      <div className="container-content">
        <span className="eyebrow text-gold-300">About NLP</span>
        <h1 className="mt-4 text-gold-300 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Who We Are
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-parchment/70">
          National Lawyers Parliament is a national, non-partisan platform where young lawyers
          learn the mechanics of legislation and democratic institutions &mdash; through
          structured training, mentorship, and simulated parliamentary practice.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container-content grid gap-12 md:grid-cols-2 md:items-center">
        <AnimatedSection className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">Not a law firm. Not a political party.</h2>
          <p className="leading-relaxed text-charcoal/75">
            NLP does not litigate cases, and it does not campaign for office. It is an educational
            and civic institution, built to give young members of the legal profession a working
            fluency in how Parliament and provincial assemblies actually function &mdash; from
            committee review to floor debate to the presidential assent that turns a bill into
            law.
          </p>
          <p className="leading-relaxed text-charcoal/75">
            Every activity NLP runs, from its simulation sessions to its research output, is built
            around one premise: lawyers who understand the legislative process serve their clients,
            their courts, and their country better.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="rounded-xl border border-stone-dark/60 bg-white p-8 shadow-card">
          <h3 className="font-display text-xl font-semibold text-ink">Objectives</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {objectives.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-charcoal/75">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>

    <section className="bg-stone/60 py-20">
      <div className="container-content grid gap-12 md:grid-cols-2">
        <AnimatedSection className="rounded-xl border border-forest-100 bg-white p-9 shadow-card">
          <span className="eyebrow">Mission</span>
          <p className="mt-4 font-display text-xl leading-snug text-ink">
            To equip young lawyers with the knowledge, skill, and access needed to meaningfully
            engage with Pakistan&rsquo;s legislative process.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="rounded-xl border border-forest-100 bg-white p-9 shadow-card">
          <span className="eyebrow">Vision</span>
          <p className="mt-4 font-display text-xl leading-snug text-ink">
            A legal profession that is fluent in parliamentary process and actively shapes the
            laws it will one day argue, interpret, and uphold.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20">
      <div className="container-content">
        <SectionHeading
          eyebrow="How NLP Works"
          title="A member's path through the program"
          description="Structured in four stages, from orientation through public advocacy."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map(({ step, detail }, i) => (
            <AnimatedSection key={step} delay={i * 0.08}>
              <div className="flex flex-col gap-3 border-t-2 border-gold pt-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-700">
                  Stage {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{step}</h3>
                <p className="text-sm leading-relaxed text-charcoal/65">{detail}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-forest py-20 text-parchment">
      <div className="container-content grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <AnimatedSection className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
  <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-parchment/20 bg-forest-600 shadow-card">
    <img
      src={presidentImage}
      alt="Hafiz Sheraz"
      className="h-full w-full object-cover"
    />
  </div>

  <div>
    <p className="font-display text-lg font-semibold">
      Hafiz Sheraz Hussain
    </p>
    <p className="text-sm text-parchment/60">
      President, National Lawyers Parliament
    </p>
  </div>
</AnimatedSection>
        <AnimatedSection delay={0.1}>
          <span className="eyebrow text-gold-300">President&rsquo;s Message</span>
          <blockquote className="mt-4 font-display text-2xl leading-snug">
            &ldquo;NLP is not about producing louder lawyers. It&rsquo;s about producing lawyers
            who understand exactly where, and how, their voice belongs in the legislative
            process.&rdquo;
          </blockquote>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20">
      <div className="container-content grid gap-12 md:grid-cols-2 md:items-center">
        <AnimatedSection>
          <span className="eyebrow">Why Young Lawyers Matter</span>
          <h2 className="mt-4 text-3xl font-semibold">
            The next generation of legislation needs the next generation of lawyers.
          </h2>
          <p className="mt-5 leading-relaxed text-charcoal/75">
            Young lawyers bring fresh scrutiny to old statutes, and they will be the ones
            interpreting and litigating the laws being written today for decades to come. NLP
            gives them a structured, credible way to build that understanding early &mdash;
            before their first case, not after it.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Card>
            {[
              ["01", "Early exposure to procedure most lawyers only learn informally."],
              ["02", "Direct mentorship from senior practitioners and former legislators."],
              ["03", "A credible platform to raise issues affecting the profession."],
            ].map(([num, text]) => (
              <div key={num} className="flex gap-4 border-b border-stone-dark/40 py-4 last:border-0">
                <span className="font-mono text-sm text-gold-700">{num}</span>
                <p className="text-sm leading-relaxed text-charcoal/75">{text}</p>
              </div>
            ))}
          </Card>
        </AnimatedSection>
      </div>
    </section>

    <section className="bg-ink py-20 text-parchment">
      <div className="container-content flex flex-col items-center gap-6 text-center">
        <ScaleDivider />
        <h2 className="max-w-lg text-gold-300 font-display text-3xl font-semibold sm:text-4xl">
          Ready to bring your voice into the process?
        </h2>
        <Button to="/join" variant="gold">
          Apply to Join <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  </>
);

export default About;
