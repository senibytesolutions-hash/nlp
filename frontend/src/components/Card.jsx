import { motion } from "framer-motion";

const Card = ({ children, className = "", hoverLift = true }) => (
  <motion.div
    whileHover={hoverLift ? { y: -6 } : undefined}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className={`rounded-xl border border-stone-dark/60 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
