import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface ContentBlockProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children, className, onClick }) => {
  return (
    <motion.div
      className={cn(
        "bg-secondary border-2 border-foreground rounded-sm p-4 shadow-brutal cursor-pointer",
        className
      )}
      whileHover={{
        x: -2,
        y: -2,
        boxShadow: "var(--shadow-brutal-hover)",
        backgroundColor: "hsl(var(--muted))",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export { ContentBlock };
