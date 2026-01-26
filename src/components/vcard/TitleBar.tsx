import { motion } from "framer-motion";

interface TitleBarProps {
  title: string;
  status?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, status = "ONLINE" }) => {
  return (
    <div className="bg-gradient-to-r from-secondary to-muted border-b border-input px-4 py-3 flex items-center gap-3 rounded-t-lg">
      {/* Traffic Lights */}
      <div className="flex gap-1.5">
        <motion.div
          className="w-3 h-3 rounded-full bg-[#FF5F56]"
          whileHover={{ scale: 1.2 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-[#FFBD2E]"
          whileHover={{ scale: 1.2 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-[#27C93F]"
          whileHover={{ scale: 1.2 }}
        />
      </div>

      {/* Title */}
      <span className="flex-1 text-sm font-medium text-muted-foreground">
        {title}
      </span>

      {/* Status Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/30 rounded-full">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#27C93F]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] font-semibold tracking-wide text-primary">
          {status}
        </span>
      </div>
    </div>
  );
};

export { TitleBar };
