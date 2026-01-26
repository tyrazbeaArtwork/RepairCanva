import { motion } from "framer-motion";
import { CreditCard, QrCode, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMenu = () => {
  const navigate = useNavigate();
  const [customAmount, setCustomAmount] = useState("");
  const paymentOptions = [
    {
      id: "priced",
      title: "Standard Payment",
      subtitle: "With package pricing",
      description: "Show amount & package details",
      icon: CreditCard,
      gradient: "from-primary to-primary/80",
      bgGlow: "bg-primary/20",
      packages: [
        { code: "basic", name: "Basic", amount: "RM 50" },
        { code: "standard", name: "Standard", amount: "RM 150" },
        { code: "premium", name: "Premium", amount: "RM 250" },
        { code: "enterprise", name: "Enterprise", amount: "RM 500" },
      ],
    },
    {
      id: "flexible",
      title: "Quick Pay",
      subtitle: "QR & Bank Details Only",
      description: "No amount shown - flexible payment",
      icon: QrCode,
      gradient: "from-primary to-primary/70",
      bgGlow: "bg-primary/20",
      path: "/quick-pay",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vw] max-w-[600px] max-h-[400px] bg-[radial-gradient(circle,rgba(217,157,90,0.15)_0%,rgba(255,255,255,0)_70%)] blur-[80px] -z-10 pointer-events-none" />

      <div className="flex flex-col min-h-screen max-w-[480px] mx-auto bg-background relative z-10 sm:my-8 sm:rounded-3xl sm:border sm:border-border/50 sm:shadow-2xl sm:overflow-hidden">
        {/* Header */}
        <header className="p-6 pb-2 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            Admin Quick Access
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-foreground mb-1"
          >
            Payment Options
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            Tyrazbea Design
          </motion.p>
        </header>

        {/* Payment Options */}
        <main className="flex-grow p-4 space-y-4">
          {paymentOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              {option.id === "priced" ? (
                // Priced packages with expandable options
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <div className="p-4 border-b border-border/30">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{option.title}</h3>
                        <p className="text-xs text-muted-foreground">{option.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Package Grid */}
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {option.packages.map((pkg) => (
                      <motion.button
                        key={pkg.code}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/payment?package=${pkg.code}`)}
                        className="group relative p-3 bg-muted/30 hover:bg-muted/50 rounded-xl text-left transition-all border border-transparent hover:border-primary/30"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{pkg.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs text-primary font-semibold">{pkg.amount}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                // Quick Pay option
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(option.path!)}
                  className="w-full bg-card rounded-2xl border border-border/50 p-4 text-left hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{option.title}</h3>
                      <p className="text-xs text-muted-foreground">{option.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pl-15">{option.description}</p>
                </motion.button>
              )}
            </motion.div>
          ))}

          {/* Custom Amount Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border/50 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Custom Amount</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">RM</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-right font-semibold"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (customAmount && parseFloat(customAmount) > 0) {
                    navigate(`/payment?amount=${customAmount}`);
                  }
                }}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <span>Go</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Serverless Payment System • No Backend Required
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentMenu;
