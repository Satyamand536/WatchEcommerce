import React, { useEffect, useState, useContext } from 'react';
import { ArrowLeft, ShoppingCart, Info, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { toast, ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import WatchImage from './ui/WatchImage';
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";

import axios from 'axios';
import { WATCHES } from '../assets/dummywdata';

const NewArrivalsPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addItem, cart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArrivals = async () => {
      try {
        const { data } = await axios.get('/api/watches?sort=newest');
        setArrivals(data.slice(0, 5)); // Show top 5 newest
      } catch (error) {
        console.error("Fetch failed, using local reserve.");
        const mapped = WATCHES.slice(-5).reverse().map(w => ({
          ...w,
          _id: w.id || w.sku || w._id,
          description: w.desc || "A masterpiece of chronological engineering.",
          tag: "Rare",
          technicalSpecs: {
            caseMaterial: w.specs?.durability || "Stainless Steel",
            movement: "Automatic Pulse",
            waterResistance: w.specs?.waterproof || "50m",
            strapMaterial: "Bespoke Leather/Steel"
          }
        }));
        setArrivals(mapped);
      } finally {
        setLoading(false);
      }
    };
    fetchArrivals();
  }, []);

  const handleReserve = (watch) => {
    addItem(watch);
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold text-xs uppercase tracking-widest">{watch.name} ADDED TO CART.</span>
      </div>
    );
  };

  const formatINR = (n) => `₹ ${(n ?? 0).toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 transition-colors duration-500">
      <ToastContainer theme={theme} hideProgressBar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[var(--text-primary)] uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Chrono-Return
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] italic tracking-tighter leading-[0.85] uppercase mb-4">
               The <br/> <span className="text-gray-500 text-6xl md:text-8xl">Arrivals.</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-medium max-w-lg mb-4 text-lg">
               Freshly hallmarked. Timelessly engineered. Where novelty meets generational craftsmanship.
            </p>
          </div>
          
          <div className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-5 rounded-2xl flex items-center gap-4 shadow-xl">
             <Star className="text-yellow-500 fill-current" size={20} />
             <div className="text-[10px] font-black uppercase tracking-[0.2em]">Spring '26 Limited Release</div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-20 sm:gap-24 md:gap-32">
          {arrivals.map((watch, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={watch._id || watch.id || index}
              className={`flex flex-col lg:flex-row bg-[var(--bg-secondary)] rounded-[3.5rem] border border-[var(--border-color)] overflow-hidden hover:border-[var(--text-primary)] transition-all duration-700 group ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="lg:w-1/2 bg-[var(--bg-primary)] p-12 flex items-center justify-center relative border-r lg:border-r-[var(--border-color)] group-hover:bg-[var(--bg-secondary)] transition-colors duration-700">
                 <div className="absolute top-10 left-10 z-30">
                   <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl border border-[var(--bg-primary)]/20">
                     {watch.isLuxury ? 'Elite' : watch.category}
                   </span>
                 </div>
                 <WatchImage 
                   src={watch.images?.[0]} 
                   alt={watch.name} 
                   className="h-80 md:h-[450px] object-contain group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                 />
              </div>

              {/* Text Side */}
              <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                <div className="mb-8">
                   <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4">{watch.name}</h2>
                   <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md italic font-medium opacity-70">
                     "{watch.description}"
                   </p>
                </div>

                <div className="flex items-center gap-8 mb-12">
                   <div className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none">{formatINR(watch.price)}</div>
                   <div className="h-10 w-px bg-[var(--border-color)]"></div>
                   <div className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Limitied Acquisition</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  {(() => {
                    const rawId = String(watch._id || watch.id || watch.sku || watch.name);
                    const isAdded = cart.some(item => String(item.id) === rawId);
                    return (
                      <button 
                        onClick={() => !isAdded && handleReserve(watch)}
                        disabled={isAdded}
                        className={`flex-1 py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
                          isAdded 
                            ? 'bg-[var(--bg-primary)] text-emerald-500 border border-emerald-500/20 cursor-default' 
                            : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle size={18} /> Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} /> Add to Cart
                          </>
                        )}
                      </button>
                    );
                  })()}
                  <button 
                    onClick={() => setSelectedWatch(watch)}
                    className="flex-1 bg-transparent border-2 border-[var(--border-color)] text-[var(--text-primary)] py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:border-[var(--text-primary)] transition-all"
                  >
                    <Info size={18} /> Tech Specs
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-3 text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-40 italic">
                   <CheckCircle size={16}/>
                   Generational Warranty Hallmarked
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL - Details View */}
      <AnimatePresence>
        {selectedWatch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedWatch(null)}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3.5rem] w-full max-w-3xl relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-[var(--bg-primary)] flex items-center justify-center p-12">
                  <WatchImage src={selectedWatch.images?.[0]} alt={selectedWatch.name} className="h-80 object-contain pointer-events-none" />
                </div>
                <div className="md:w-1/2 p-12">
                  <h3 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2 leading-none">{selectedWatch.name}</h3>
                  <p className="text-gray-500 mb-10 text-[10px] font-black uppercase tracking-widest italic opacity-50">"{selectedWatch.tag}" Acquisition</p>
                  
                  <div className="space-y-6 mb-12">
                     {[
                       { label: "Architecture", value: selectedWatch.technicalSpecs?.caseMaterial || "Premium Grade" },
                       { label: "Logic (Movement)", value: selectedWatch.technicalSpecs?.movement || "Automatic Pulse" },
                       { label: "Pulse Threshold", value: selectedWatch.technicalSpecs?.waterResistance || "50m" },
                       { label: "Binding", value: selectedWatch.technicalSpecs?.strapMaterial || "Bespoke" }
                     ].map((spec, i) => (
                       <div key={i} className="flex justify-between border-b border-[var(--border-color)] pb-3">
                         <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{spec.label}</span>
                         <span className="font-bold text-sm text-[var(--text-primary)]">{spec.value}</span>
                       </div>
                     ))}
                  </div>

                  <button 
                    onClick={() => setSelectedWatch(null)}
                    className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                  >
                    Return to Selection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewArrivalsPage;
