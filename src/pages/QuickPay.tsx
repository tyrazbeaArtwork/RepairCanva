import { motion, AnimatePresence } from "framer-motion";
import { Copy, Lock, ArrowLeft, Check, MessageCircle, QrCode, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ============================================
// SELLER CONFIG - Change these values easily
// ============================================
const SELLER_CONFIG = {
  // Bank details
  bankName: "CIMB",
  accountNumber: "7626 5950 45",
  recipientName: "AINA ATHIRAH BINTI ZAINI",

  // QR Code image
  qrCodeUrl: import.meta.env.BASE_URL + "payment-qr.png",

  // WhatsApp number (with country code, no + or spaces)
  whatsappNumber: "601173089330",
};

const QuickPay = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsAppConfirmation = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const message = `✅ Payment Confirmation\n\n` +
      `Name: ${customerName}\n` +
      `${customerNote ? `Note: ${customerNote}\n` : ""}` +
      `\nI have completed the payment to ${SELLER_CONFIG.recipientName}. Please verify and process my order. Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/${SELLER_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsPaid(true);
  };

  const handleGoToThankYou = () => {
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(217,157,90,0.12)_0%,rgba(255,255,255,0)_70%)] blur-[100px] -z-10 pointer-events-none" />

      <div className="flex flex-col min-h-screen max-w-[480px] mx-auto bg-background relative z-10 sm:my-8 sm:rounded-3xl sm:border sm:border-border/50 sm:shadow-2xl sm:overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-border/30">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Secure Payment</span>
          </div>
          <div className="w-10" />
        </header>

        <main className="flex-grow p-6 pb-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-3">
              <QrCode className="w-4 h-4" />
              Quick Payment
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Scan & Pay</h2>
            <p className="text-muted-foreground text-sm">Scan the QR code with your banking app</p>
          </motion.div>

          {/* QR Code Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-card via-card to-muted/30 rounded-3xl shadow-xl border border-border/50 mb-6"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative p-8 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl scale-110" />
                <div className="relative w-48 h-48 bg-white rounded-2xl p-3 shadow-lg">
                  <div
                    className="w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${SELLER_CONFIG.qrCodeUrl})` }}
                    role="img"
                    aria-label="QR code for payment"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Scan with any banking app</span>
              </div>
            </div>
          </motion.section>

          {/* Separator */}
          <div className="relative flex items-center justify-center py-6">
            <div className="absolute left-0 w-[35%] h-px bg-gradient-to-r from-transparent to-border" />
            <div className="absolute right-0 w-[35%] h-px bg-gradient-to-l from-transparent to-border" />
            <span className="px-4 text-muted-foreground text-sm bg-background">or pay manually</span>
          </div>

          {/* Bank Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border/50 overflow-hidden"
          >
            {[
              { label: "Bank Name", value: SELLER_CONFIG.bankName, field: "bank", icon: "🏦" },
              { label: "Account Number", value: SELLER_CONFIG.accountNumber, field: "account", icon: "💳" },
              { label: "Recipient Name", value: SELLER_CONFIG.recipientName, field: "recipient", icon: "👤" },
            ].map((item, index) => (
              <div
                key={item.field}
                className={`flex justify-between items-center p-4 ${index !== 2 ? "border-b border-border/50" : ""
                  } hover:bg-muted/30 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">{item.label}</p>
                    <p className="text-foreground font-semibold">{item.value}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.field)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl transition-all active:scale-95"
                  aria-label={`Copy ${item.label}`}
                >
                  <AnimatePresence mode="wait">
                    {copiedField === item.field ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            ))}
          </motion.section>

          {/* Customer Info Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-accent" />
              Payment Confirmation Details
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
              <textarea
                placeholder="Order notes (optional)"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
              />
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-background/80 backdrop-blur-xl border-t border-border/30 sm:absolute">
          <AnimatePresence mode="wait">
            {!isPaid ? (
              <motion.button
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppConfirmation}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_30px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Confirm via WhatsApp
              </motion.button>
            ) : (
              <motion.button
                key="thankyou"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoToThankYou}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-white font-bold text-lg shadow-[0_8px_20px_rgba(217,157,90,0.3)] hover:shadow-[0_12px_30px_rgba(217,157,90,0.4)] transition-all flex items-center justify-center gap-3"
              >
                <Check className="w-5 h-5" />
                Continue to Thank You
              </motion.button>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-center gap-1.5 pt-3 text-muted-foreground text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit Encrypted • Serverless Payment</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QuickPay;
