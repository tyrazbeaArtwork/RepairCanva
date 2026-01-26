import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  href,
  onClick,
  variant = "default",
  className,
}) => {
  const variants = {
    default: "bg-card text-foreground hover:bg-secondary",
    primary: "bg-foreground text-card",
    accent: "bg-primary text-primary-foreground",
  };

  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-card",
    accent: "text-primary-foreground",
  };

  const labelColors = {
    default: "text-foreground/70",
    primary: "text-card/90",
    accent: "text-primary-foreground",
  };

  const content = (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-2 border-foreground rounded-sm shadow-brutal cursor-pointer",
        variants[variant],
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
    >
      <motion.div
        className={iconColors[variant]}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <span className={cn("text-[10px] font-semibold tracking-wide uppercase", labelColors[variant])}>
        {label}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <div onClick={onClick}>{content}</div>;
};

export { ActionButton };
