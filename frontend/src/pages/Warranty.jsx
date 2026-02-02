import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Calendar, Clock, ArrowLeft } from 'lucide-react';

const Warranty = () => {
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
             <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Warranty <span className="text-gray-500">Protocol</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            Our promise of endurance. Comprehensive coverage for your peace of mind.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <Section 
            icon={<Calendar size={20} />}
            title="5-Year International Warranty" 
            content="Every Pre-See-Jan timepiece is backed by a 5-year international warranty covering all manufacturing defects in materials and workmanship from the date of purchase."
          />
          
          <Section 
            icon={<Clock size={20} />}
            title="Coverage Details" 
            content="The warranty covers the movement, hands, and dial. It does not cover normal wear and tear, damage from accidents, mishandling, or unauthorized repair attempts."
          />

          <Section 
            title="Claim Process" 
            content="To initiate a warranty claim, visit any authorized service center with your valid warranty card or digital proof of purchase. Our master watchmakers will assess and restore your timepiece."
          />

          <Section 
            title="Transferability" 
            content="The warranty is tied to the timepiece, not the owner. It remains valid even if the watch changes hands, adding sustained value to your investment."
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

export default Warranty;
