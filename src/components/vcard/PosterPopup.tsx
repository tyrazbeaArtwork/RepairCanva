import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ShoppingBag, Phone, Mail } from "lucide-react";
import { BrutalButton } from "./BrutalButton";

interface PosterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  posterImage: string;
  title: string;
  contacts: {
    whatsapp?: string;
    shopee?: string;
    phone?: string;
    email?: string;
  };
}

const PosterPopup: React.FC<PosterPopupProps> = ({
  isOpen,
  onClose,
  posterImage,
  title,
  contacts,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-foreground/70 z-50 flex items-center justify-center p-3 sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Popup Content */}
            <motion.div
              className="bg-card border-[3px] border-foreground rounded-lg shadow-brutal-lg max-w-sm sm:max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-foreground">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{title}</h3>
                <BrutalButton
                  variant="default"
                  size="icon"
                  onClick={onClose}
                  className="w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </BrutalButton>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6">
                {/* Poster Image */}
                <motion.img
                  src={posterImage}
                  alt="Poster"
                  className="w-full h-auto border-2 border-foreground rounded-sm mb-5 shadow-brutal block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                />

                <h4 className="font-semibold text-foreground mb-4">
                  Pilih Platform Order:
                </h4>

                <div className="grid gap-3">
                  {contacts.whatsapp && (
                    <motion.a
                      href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Saya berminat untuk order servis")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 2, y: 2 }}
                    >
                      <BrutalButton variant="accent" className="w-full gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Order via WhatsApp
                      </BrutalButton>
                    </motion.a>
                  )}

                  {contacts.shopee && (
                    <motion.a
                      href={contacts.shopee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 2, y: 2 }}
                    >
                      <BrutalButton variant="default" className="w-full gap-2 bg-[#EE4D2D] text-white hover:bg-[#D84429]">
                        <ShoppingBag className="w-5 h-5" />
                        Beli di Shopee
                      </BrutalButton>
                    </motion.a>
                  )}

                  {contacts.phone && (
                    <motion.a
                      href={`tel:${contacts.phone}`}
                      className="w-full"
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 2, y: 2 }}
                    >
                      <BrutalButton variant="primary" className="w-full gap-2">
                        <Phone className="w-5 h-5" />
                        Hubungi Kami
                      </BrutalButton>
                    </motion.a>
                  )}

                  {contacts.email && (
                    <motion.a
                      href={`mailto:${contacts.email}`}
                      className="w-full"
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 2, y: 2 }}
                    >
                      <BrutalButton variant="default" className="w-full gap-2">
                        <Mail className="w-5 h-5" />
                        Hantar Email
                      </BrutalButton>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { PosterPopup };
