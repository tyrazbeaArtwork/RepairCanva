import { motion } from "framer-motion";
import { MailCheck, Mail, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Mail,
      text: "Check your email for confirmation",
    },
    {
      icon: FileText,
      text: "Review the onboarding guide",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[500px] bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
        >
          {/* Card Body */}
          <div className="p-8 sm:p-10">
            {/* Check Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-8"
            >
              <MailCheck className="w-8 h-8" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl sm:text-4xl font-bold italic text-foreground mb-3"
            >
              Thank you.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-10"
            >
              We've received your message and will be in touch within 24-48 hours to discuss your project.
            </motion.p>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                What's Next?
              </h2>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl border border-border/50"
                  >
                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-foreground">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Card Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 sm:p-8 border-t border-border bg-muted/30"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
