import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-forest text-parchment hover:bg-forest-600",
  gold: "bg-gold text-ink hover:bg-gold-400",
  outline: "border border-forest text-forest hover:bg-forest hover:text-parchment",
  ghost: "text-forest hover:bg-forest-50",
  outlineLight: "border border-parchment/40 text-parchment hover:bg-parchment/10",
};

/**
 * Button doubles as a <Link> when `to` is provided, or a native <button>/<a> otherwise.
 */
const Button = ({
  children,
  to,
  href,
  type = "button",
  variant = "primary",
  className = "",
  ...rest
}) => {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  const motionProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...rest}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
};

export default Button;
