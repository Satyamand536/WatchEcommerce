import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Truck, RotateCcw, Package, ArrowLeft } from 'lucide-react';

const ShippingReturns = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] transition-colors duration-500">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[var(--text-primary)] uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Return
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="w-16 h-16 bg-[var(--text-primary)] text-[var(--bg-primary)] mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-xl">
             <Truck size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Shipping <span className="text-gray-500">& Returns</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            From our atelier to your wrist, handled with the utmost precision and care.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <Section 
            icon={<Truck size={20} />}
            title="Global Logistics" 
            content="We offer complimentary insured shipping worldwide. Domestic orders within India are delivered within 2-4 business days. International shipments may take 5-10 business days depending on customs processing."
          />
          
          <Section 
            icon={<Package size={20} />}
            title="Premium Packaging" 
            content="Every timepiece is encased in our signature Pre-See-Jan collectors box, ensuring it arrives in pristine condition. All shipments are tamper-proof and fully insured against transit risks."
          />

          <Section 
            icon={<RotateCcw size={20} />}
            title="Return Protocol" 
            content="We accept returns for unworn pieces within 14 days of receipt. The security tag must remain attached and intact. To initiate a return, contact our concierge service for a secure return label."
          />

          <Section 
            title="Customs & Duties" 
            content="For international orders, import duties and taxes are collected at checkout to ensure a seamless delivery experience with no hidden fees upon arrival."
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

const Section = ({ icon, title, content }) => (
  <div className="flex gap-4 md:gap-6">
    <div className="shrink-0 mt-1 text-[var(--text-primary)] opacity-50">
      {icon || <div className="w-5 h-5 bg-[var(--text-primary)] rounded-full animate-pulse" />}
    </div>
    <div>
      <h3 className="text-xl font-black uppercase tracking-tight mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed font-medium">{content}</p>
    </div>
  </div>
);

export default ShippingReturns;
