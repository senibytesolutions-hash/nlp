import AnimatedSection from "./AnimatedSection.jsx";

const alignMap = {
  center: "text-center items-center mx-auto",
  left: "text-left items-start",
};

const SectionHeading = ({ eyebrow, title, description, align = "center", className = "" }) => (
  <AnimatedSection className={`flex max-w-2xl flex-col gap-4 ${alignMap[align]} ${className}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
    {description && <p className="text-base leading-relaxed text-charcoal/75">{description}</p>}
  </AnimatedSection>
);

export default SectionHeading;
