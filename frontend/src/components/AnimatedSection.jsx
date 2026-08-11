import { motion } from "framer-motion";

const makeVariants = (delay) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

/**
 * Wraps children in a fade-up reveal that triggers once when scrolled into view.
 * delay: stagger offset in seconds.
 */
const AnimatedSection = ({ children, className = "", delay = 0, as = "div", ...rest }) => {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={makeVariants(delay)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;
