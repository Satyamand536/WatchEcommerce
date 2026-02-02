import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Watch, Droplets, Sparkles, ArrowLeft } from 'lucide-react';

const ProductCare = () => {
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
             <Sparkles size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Product <span className="text-gray-500">Care</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            Preserve the legacy. A guide to maintaining the brilliance and precision of your timepiece.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <Section 
            icon={<Watch size={20} />}
            title="Routine Maintenance" 
            content="We recommend a full service every 3-5 years. This includes disassembly, cleaning, oiling, and testing of water resistance to ensure optimal performance over generations."
          />
          
          <Section 
            icon={<Droplets size={20} />}
            title="Water Resistance" 
            content="Unless specified as a diver's watch, avoid submerging your timepiece. Always ensure the crown is screwed down tightly before exposure to any moisture."
          />

          <Section 
            icon={<Sparkles size={20} />}
            title="Cleaning & Storage" 
            content="Wipe your watch with a soft microfiber cloth to remove dust and moisture. Store it in its original box or a watch winder when not in use to protect the movement and finish."
          />

          <Section 
            title="Magnetic Fields" 
            content="Avoid placing your mechanical watch near strong magnetic fields (speakers, refrigerators, magnets) as this can affect the timekeeping accuracy."
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

export default ProductCare;
