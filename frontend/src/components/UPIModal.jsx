import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CheckCircle2, Loader2, ShieldCheck, ChevronRight } from 'lucide-react';

const UPIModal = ({ isOpen, onClose, amount, onPaymentComplete }) => {
  const [step, setStep] = useState('selection'); // selection, processing, success
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    { id: 'paytm', name: 'Paytm', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg', color: '#00baf2' }
  ];

  const handlePayment = (provider) => {
    setSelectedProvider(provider);
    setStep('confirm'); // New step: Confirmation
  };

  const confirmPayment = () => {
    setStep('processing');
    
    // Simulate realistic payment delay
    setTimeout(() => {
      setStep('success');
      // Final delay before closing and notifying parent
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-color)] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">Secure UPI Transfer</span>
            </div>
            {step === 'selection' && (
              <button onClick={onClose} className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="p-8">
            {step === 'selection' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Amount to Authorize</span>
                  <h2 className="text-4xl font-black italic tracking-tighter text-[var(--text-primary)] leading-none">
                    ₹{(amount ?? 0).toLocaleString('en-IN')}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {providers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePayment(p)}
                      className="flex items-center justify-between p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--text-accent)] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl p-2 shadow-sm border border-gray-100">
                          {p.icon ? (
                            <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <Smartphone size={20} className="text-black" />
                          )}
                        </div>
                        <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-tight">{p.name}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-[var(--text-accent)] transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3 pt-4 opacity-50">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Encrypted by Bharat Protocol</span>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                 <ShieldCheck size={48} className="text-[var(--text-accent)] mb-6" />
                 <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest mb-2">Confirm Payment</h3>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-8 max-w-[200px] leading-relaxed">
                   You are about to securely transfer <span className="text-[var(--text-primary)]">₹{(amount ?? 0).toLocaleString('en-IN')}</span> via {selectedProvider?.name}.
                 </p>
                 
                 <div className="flex flex-col gap-3 w-full">
                    <button 
                      onClick={confirmPayment}
                      className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                       Yes, Pay Now <ChevronRight size={14} />
                    </button>
                    <button 
                      onClick={onClose}
                      className="w-full py-4 bg-transparent border border-[var(--border-color)] text-[var(--text-secondary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors"
                    >
                       No, Cancel
                    </button>
                 </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-t-2 border-r-2 border-[var(--text-accent)] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 size={24} className="text-[var(--text-accent)] animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest mb-2 italic">Processing</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Contacting {selectedProvider?.name} Protocol...</p>
                <div className="mt-8 w-48 h-1 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-[var(--text-accent)]"
                  />
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 200, damping: 10 }}
                   className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 size={48} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-2 italic leading-none">Authorization <br/> Successful</h3>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">Transaction Verified</p>
                
                <div className="mt-10 p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
                   <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Protocol ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UPIModal;
