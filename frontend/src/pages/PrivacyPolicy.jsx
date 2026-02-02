import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
             <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Privacy <span className="text-gray-500">Protocol</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            Your data sovereignty is paramount. We employ military-grade encryption to ensure your digital footprint remains exclusively yours.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <Section 
            icon={<Lock size={20} />}
            title="Data Collection" 
            content="We collect only what is necessary for the transaction. Your name, email, and shipping details are stored on encrypted servers. We do not store payment credentials; all financial transactions are processed by certified third-party gateways."
          />
          
          <Section 
            icon={<Eye size={20} />}
            title="Usage of Information" 
            content="Your data is utilized solely for order fulfillment, warranty registration, and tailored communications if you've opted into the Inner Circle. We do not sell, trade, or transfer your personally identifiable information to outside parties."
          />

          <Section 
            icon={<Shield size={20} />}
            title="Digital Security" 
            content="Our platform utilizes SSL technology to keep your information safe. Access to your personal data is restricted to authorized personnel who are required to keep the information confidential."
          />

          <Section 
            title="Cookies & Tracking" 
            content="We use cookies to enhance your browsing experience and gather analytics. You may choose to disable cookies through your browser settings, though this may affect the functionality of our boutique."
          />
          
          <div className="pt-8 border-t border-[var(--border-color)]">
             <p className="text-sm font-bold text-gray-500">Last Updated: February 2026</p>
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

export default PrivacyPolicy;
