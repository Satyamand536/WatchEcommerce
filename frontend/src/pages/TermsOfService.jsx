import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Scale, FileText, Gavel, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
             <Scale size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Terms of <span className="text-gray-500">Service</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            The framework of our engagement. Transparency and mutual respect define our digital covenant.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <Section 
            icon={<FileText size={20} />}
            title="Acceptance of Terms" 
            content="By accessing Pre-See-Jan, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service."
          />
          
          <Section 
            icon={<Gavel size={20} />}
            title="Governing Law" 
            content="These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
          />

          <Section 
            title="Purchases" 
            content="If you wish to purchase any product, you may be asked to supply specific information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, and your billing address."
          />

          <Section 
            title="Intellectual Property" 
            content="The Service and its original content, features, and functionality are and will remain the exclusive property of Pre-See-Jan and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of Pre-See-Jan."
          />
          
           <Section 
            title="Changes" 
            content="We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms."
          />
          
          <div className="pt-8 border-t border-[var(--border-color)]">
             <p className="text-sm font-bold text-gray-500">Effective Date: February 1, 2026</p>
          </div>
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

export default TermsOfService;
