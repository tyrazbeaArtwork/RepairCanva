import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface BrutalButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "primary" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-bold border-2 border-foreground transition-all duration-150 cursor-pointer select-none tracking-wide";
    
    const variants = {
      default: "bg-card text-foreground hover:bg-secondary",
      primary: "bg-foreground text-card hover:bg-foreground/90",
      accent: "bg-primary text-primary-foreground hover:bg-primary/90",
    };
    
    const sizes = {
      default: "px-5 py-3.5 text-sm rounded-sm",
      sm: "px-4 py-2.5 text-xs rounded-sm",
      lg: "px-7 py-4 text-base rounded-sm",
      icon: "p-3 rounded-sm",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          "shadow-brutal",
          className
        )}
        whileHover={{
          x: -2,
          y: -2,
          boxShadow: "var(--shadow-brutal-hover)",
        }}
        whileTap={{
          x: 2,
          y: 2,
          boxShadow: "var(--shadow-brutal-active)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

BrutalButton.displayName = "BrutalButton";

export { BrutalButton };
