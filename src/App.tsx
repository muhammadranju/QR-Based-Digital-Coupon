import CouponCard from "./components/CouponCard";
import type { MomoProduct } from "./components/CouponCard";
import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed } from "lucide-react";

function App() {
  // CONFIGURATION: The owner can easily update these values
  const storeSettings = {
    name: "মমো দোকান",
    tagline: "স্বাদে সেরা, গুণে অনন্য",
    products: [
      {
        name: "স্টিম মমো",
        quantity: "৬ পিস প্লেট",
        normalPrice: "৮০",
        loyalPrice: "৭০",
      },
      {
        name: "ফ্রাইড মমো",
        quantity: "৬ পিস প্লেট",
        normalPrice: "১০০",
        loyalPrice: "৯০",
      },
    ] as MomoProduct[],
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center py-12 px-4 selection:bg-[#ff4d00]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#ff4d00]/5 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ffb800]/5 blur-[120px] rounded-full -z-10"></div>

      <header className="text-center mb-6 md:mb-10 max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-[#ff4d00] text-white shadow-lg border border-[#ffb800]/20">
            <Sparkles size={14} fill="currentColor" />
            <span>Momo Hub Loyalty</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black leading-tight m-0 text-white px-2">
            আপনার <span className="text-[#ff4d00]">ডিজিটাল কুপন</span> প্রস্তুত
          </h1>
        </motion.div>
      </header>

      <main className="w-full flex justify-center relative z-10">
        <CouponCard
          products={storeSettings.products}
          storeName={storeSettings.name}
          tagline={storeSettings.tagline}
        />
      </main>

      <footer className="mt-12 text-center relative z-10 opacity-50">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <UtensilsCrossed size={16} />
          <span>© ২০২৬ মমো হাব - Loyalty Program</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
