import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, UserPlus, ExternalLink, Send, Copy, Download } from "lucide-react";
import { TitleBar } from "./TitleBar";
import { ActionButton } from "./ActionButton";
import { ContentBlock } from "./ContentBlock";
import { BrutalButton } from "./BrutalButton";
import { PosterPopup } from "./PosterPopup";
import { toast } from "sonner";

interface ContactInfo {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  shopee?: string;
  telegram?: string;
  posterImage: string;
  gallery?: string[];
}

interface DigitalCardProps {
  contact: ContactInfo;
}

const DigitalCard: React.FC<DigitalCardProps> = ({ contact }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  // Auto-popup on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("tyrazbea_visited");
    if (!hasVisited) {
      // Delay popup slightly for better UX
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        localStorage.setItem("tyrazbea_visited", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const issues = [
    { id: "font", label: "Font Error", value: "Font lari/perlu outline" },
    { id: "bleed", label: "Bleed Fix", value: "Takde Bleed atau margin silap" },
    { id: "lowres", label: "Low Res", value: "Imej pecah (Low Res)" },
    { id: "color", label: "Color Mode", value: "Warna lari (RGB detected)" },
  ];

  const handleIssueToggle = (value: string) => {
    setSelectedIssues((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const generateMessage = () => {
    if (selectedIssues.length === 0) return "";
    return `Hai ${contact.name}, saya ada masalah dengan fail printing:\n\n${selectedIssues.map((i) => `• ${i}`).join("\n")}\n\nBoleh tolong check?`;
  };

  const handleCopy = () => {
    const msg = generateMessage();
    if (msg) {
      navigator.clipboard.writeText(msg);
      toast.success("Mesej disalin!");
    }
  };

  const handleWhatsApp = () => {
    const msg = generateMessage();
    if (msg) {
      window.open(`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  const saveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.fullName}
ORG:${contact.name}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
URL:https://wa.me/${contact.whatsapp.replace(/\D/g, "")}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contact.name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Kontak disimpan!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="max-w-[520px] mx-auto bg-card min-h-screen sm:min-h-0 border-[3px] border-foreground sm:rounded-lg sm:my-12 sm:shadow-brutal-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <TitleBar title={contact.name} status="STABLE" />

        {/* Header Section */}
        <motion.header className="px-6 pt-8 pb-6" variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-foreground rounded-md flex items-center justify-center text-card font-extrabold text-base">
              {contact.name.charAt(0)}
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">{contact.name}</span>
          </div>

          <div className="inline-block px-2.5 py-1 bg-primary/10 border border-primary/30 rounded-sm text-[10px] font-semibold tracking-wider text-primary mb-5">
            DIGITAL CARD v3.0
          </div>

          <h1 className="text-[1.875rem] sm:text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4 text-foreground whitespace-pre-line">
            {contact.tagline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-body text-muted-foreground max-w-[90%]">
            {contact.description}
          </p>
        </motion.header>

        {/* Quick Actions */}
        <motion.div
          className="px-6 pb-6 grid grid-cols-4 gap-2"
          variants={itemVariants}
        >
          <ActionButton
            icon={<Phone className="w-5 h-5" />}
            label="Call"
            href={`tel:${contact.phone}`}
          />
          <ActionButton
            icon={<Mail className="w-5 h-5" />}
            label="Mail"
            href={`mailto:${contact.email}`}
          />
          <ActionButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="WhatsApp"
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            variant="accent"
          />
          <ActionButton
            icon={<UserPlus className="w-5 h-5" />}
            label="Simpan"
            onClick={saveContact}
            variant="primary"
          />
        </motion.div>

        {/* Problem Section */}
        <motion.section className="px-6 py-6" variants={itemVariants}>
          <h2 className="text-heading mb-4 text-foreground">Kenapa Fail Kena "Reject"?</h2>

          <div className="grid gap-3">
            <ContentBlock>
              <div className="flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Dah Trim Baru Nampak</h4>
                  <p className="text-label text-muted-foreground">
                    Sebab takde Bleed, ada garisan putih kat tepi. Memang sakit hati kalau dah siap print.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock>
              <div className="flex gap-3">
                <span className="text-xl">🎨</span>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Warna Lari Teruk</h4>
                  <p className="text-label text-muted-foreground">
                    Sebab penggunaan RGB. Kat skrin lawa, bila print hancur. Kami tolong convert CMYK yang ngam.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock>
              <div className="flex gap-3">
                <span className="text-xl">🔍</span>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Logo Jadi Pixelate</h4>
                  <p className="text-label text-muted-foreground">
                    Logo mungkin low-res. Kami trace semula kasi tajam baru sedap mata memandang.
                  </p>
                </div>
              </div>
            </ContentBlock>
          </div>
        </motion.section>

        {/* Gallery Section */}
        {contact.gallery && contact.gallery.length > 0 && (
          <motion.section className="px-6 py-6" variants={itemVariants}>
            <h2 className="text-heading mb-4 text-foreground">Portfolio Preview</h2>
            <div className="grid grid-cols-3 gap-2">
              {contact.gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-sm border-2 border-foreground shadow-brutal"
                  whileHover={{ scale: 1.02, x: -2, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={img}
                    alt={`Project ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 hover:bg-foreground/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Solution Timeline */}
        <motion.section
          className="px-6 py-6 bg-secondary/50 border-y border-input"
          variants={itemVariants}
        >
          <h2 className="text-heading mb-5 text-foreground">Laluan Ekspres Kami.</h2>

          <div className="space-y-5">
            {[
              { step: "STRATEGI", title: "Check Technical Error", desc: "Langkah pertama adalah scan fail anda. Cari pelbagai ralat teknikal dalam masa yang singkat." },
              { step: "EKSEKUSI", title: "Touch-Up & Pre-Press", desc: "Kami redraw logo dan set bleed supaya fail anda 'ngam' untuk masuk mesin." },
              { step: "HASIL", title: "Terus Sedia-Print", desc: "Fail yang dah sempurna dihantar melalui cloud link. Boleh terus forward kat printer.", final: true },
            ].map((item, idx) => (
              <div key={idx} className="relative pl-6 pb-5 last:pb-0">
                {!item.final && (
                  <div className="absolute left-[6px] top-5 bottom-0 w-px bg-input" />
                )}
                <div
                  className={`absolute left-0 top-1 w-[13px] h-[13px] rounded-full border-2 ${item.final ? "bg-primary border-primary" : "bg-card border-foreground"
                    }`}
                />
                <p className={`text-[10px] font-semibold tracking-wider mb-1 ${item.final ? "text-[#27C93F]" : "text-primary"}`}>
                  {item.step}
                </p>
                <h3 className="font-bold text-sm mb-1 text-foreground">{item.title}</h3>
                <p className="text-label text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Diagnosis Form */}
        <motion.section className="px-6 py-6" variants={itemVariants}>
          <h2 className="text-heading mb-2 text-foreground">Diagnos Fail.</h2>
          <p className="text-label text-muted-foreground mb-4">
            Pilih ralat fail yang dihadapi untuk kami bantu selesaikan.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {issues.map((issue) => (
              <motion.label
                key={issue.id}
                className={`flex items-center justify-center p-3 border-2 border-foreground rounded-sm cursor-pointer text-label shadow-brutal transition-colors ${selectedIssues.includes(issue.value)
                    ? "bg-primary/10 text-primary font-bold"
                    : "bg-card text-foreground/70 font-medium"
                  }`}
                whileHover={{ x: -1, y: -1, boxShadow: "var(--shadow-brutal-hover)" }}
                whileTap={{ x: 1, y: 1, boxShadow: "var(--shadow-brutal-active)" }}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedIssues.includes(issue.value)}
                  onChange={() => handleIssueToggle(issue.value)}
                />
                {issue.label}
              </motion.label>
            ))}
          </div>

          <motion.textarea
            className="w-full font-mono text-label bg-secondary border-2 border-foreground rounded-sm p-4 shadow-brutal focus:outline-none focus:bg-card resize-none text-foreground placeholder:text-muted-foreground transition-all"
            rows={4}
            placeholder="Pilih isu fail kat atas tu untuk kami hantar resepi..."
            value={generateMessage()}
            readOnly
            whileFocus={{ x: -1, y: -1, boxShadow: "var(--shadow-brutal-hover)" }}
          />

          <div className="grid grid-cols-3 gap-2 mt-4">
            <BrutalButton variant="primary" onClick={handleCopy} className="gap-2">
              <Copy className="w-4 h-4" />
              Salin
            </BrutalButton>
            <BrutalButton variant="accent" onClick={handleWhatsApp} className="col-span-2 gap-2">
              <Send className="w-4 h-4" />
              Hantar WhatsApp
            </BrutalButton>
          </div>

          <BrutalButton
            variant="accent"
            onClick={() => setIsPopupOpen(true)}
            className="w-full mt-3 gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Order via WhatsApp / Shopee
          </BrutalButton>
        </motion.section>

        {/* Final CTA */}
        <motion.section className="px-6 py-8 text-center" variants={itemVariants}>
          <h2 className="text-2xl font-extrabold leading-tight mb-3 text-foreground tracking-tight">
            Sedia Untuk
            <br />
            <span className="text-primary">Print Tanpa Stress?</span>
          </h2>
          <p className="text-body text-muted-foreground mb-6">
            Hentikan pening kepala You. Kami buatkan fail You jadi perfect.
          </p>

          <div className="grid gap-3">
            <BrutalButton
              variant="accent"
              className="w-full py-4 text-base"
              onClick={() => setIsPopupOpen(true)}
            >
              Konsultasi Pakar
            </BrutalButton>
            <BrutalButton variant="default" className="w-full py-4 gap-2" onClick={saveContact}>
              <Download className="w-4 h-4" />
              Muat Turun VCard
            </BrutalButton>
          </div>

          <p className="mt-12 text-[10px] font-semibold tracking-[0.3em] text-muted-foreground/40">
            {contact.name.toUpperCase()} © 2026
          </p>
        </motion.section>
      </motion.div>

      <PosterPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        posterImage={contact.posterImage}
        title="Order Sekarang"
        contacts={{
          whatsapp: contact.whatsapp,
          shopee: contact.shopee,
          phone: contact.phone,
          email: contact.email,
        }}
      />
    </>
  );
};

export { DigitalCard };
