/**
 * Signature section divider inspired by the NLP crest's balance scale.
 * A gold hairline with a central beam tick — used sparingly between sections.
 */
const ScaleDivider = ({ align = "center", className = "" }) => {
  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <div className={`flex items-center gap-3 ${justify} ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-gold-300" />
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path d="M9 0V14" stroke="#B4923A" strokeWidth="1.4" />
        <path d="M2 3H16" stroke="#B4923A" strokeWidth="1.4" />
        <circle cx="2" cy="6.5" r="1.6" stroke="#B4923A" strokeWidth="1.2" />
        <circle cx="16" cy="6.5" r="1.6" stroke="#B4923A" strokeWidth="1.2" />
      </svg>
      <span className="h-px w-10 bg-gold-300" />
    </div>
  );
};

export default ScaleDivider;
