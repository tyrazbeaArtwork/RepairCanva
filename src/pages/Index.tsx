import { DigitalCard } from "@/components/vcard/DigitalCard";
import posterImage from "@/assets/poster-image.jpg";

const Index = () => {
  const contactInfo = {
    name: "Tyrazbea Design",
    fullName: "Tyrazbea Design - Settle Masalah Printing",
    tagline: "Settle Masalah\nPrinting Anda Sekarang.",
    description: "Masalah fail asyik kena 'reject'? Kami bantu anda siapkan fail yang 'ngam' untuk printing dalam 24 jam.",
    phone: "+601172727996",
    email: "tyrazbea@gmail.com",
    whatsapp: "+601172727996",
    shopee: "https://shopee.com.my/your-shop-link",
    telegram: "https://t.me/your-telegram-group",
    posterImage: import.meta.env.BASE_URL + "PopupImg.gif",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=400&fit=crop",
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(0,0,0,0.015)_35px,rgba(0,0,0,0.015)_70px)]">
      <DigitalCard contact={contactInfo} />
    </div>
  );
};

export default Index;
