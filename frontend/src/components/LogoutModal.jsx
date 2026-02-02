import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl overflow-hidden"
        >
          {/* Decorative Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--text-primary)] to-transparent opacity-20"></div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <LogOut size={28} />
            </div>

            <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2">
              End Session?
            </h3>
            
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-8">
              You are about to disconnect from the Pre-See-Jan network. Are you sure?
            </p>

            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 px-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutModal;
