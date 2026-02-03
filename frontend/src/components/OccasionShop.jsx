import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Gift, 
  Sparkles, 
  Dumbbell, 
  ChevronRight,
  Plus,
  Minus,
  TrendingUp,
  Star,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { WATCHES } from '../assets/dummywdata';
import { useCart } from '../CartContext';
import { toast } from 'react-toastify';

const occasions = [
  { id: 'office', name: 'Office Wear', icon: <Briefcase size={24} />, desc: 'Minimalism meets professionalism' },
  { id: 'luxury', name: 'Luxury / Events', icon: <Sparkles size={24} />, desc: 'Statement pieces for elite gatherings' },
  { id: 'gifting', name: 'Gift for Someone', icon: <Gift size={24} />, desc: 'Highly-rated timeless treasures' },
  { id: 'sport', name: 'Daily / Sports', icon: <Dumbbell size={24} />, desc: 'Rugged elegance for active lives' },
];

const OccasionShop = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[0]);
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, addItem, increment, decrement, removeItem, toggleWishlist, isInWishlist } = useCart();

  const getQty = (id) => {
    const item = cart.find((c) => String(c.id) === String(id));
    return item ? Number(item.qty || 0) : 0;
  };

  useEffect(() => {
    filterOccasionWatches(selectedOccasion.id);
  }, [selectedOccasion]);

  const filterOccasionWatches = (id) => {
    setLoading(true);
    setTimeout(() => {
       const filtered = WATCHES.filter(w => {
          const tags = (w.styleTags || []).map(t => t.toLowerCase());
          const cat = (w.category || "").toLowerCase();
          
          if (id === 'office') return tags.includes("dress") || tags.includes("minimalist") || cat === "classic";
          if (id === 'luxury') return tags.includes("luxury") || tags.includes("statement") || tags.includes("gold") || String(w.price).length > 9;
          if (id === 'gifting') return tags.includes("gift") || tags.includes("affordable") || cat === "gifting";
          if (id === 'sport') return tags.includes("sport") || tags.includes("diver") || cat === "sport" || cat === "smart";
          return false;
       }).slice(0, 4);
       
       setWatches(filtered);
       setLoading(false);
    }, 600);
  };

  return (
    <div className="py-12 md:py-24 transition-colors duration-500 px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left: Occasion Selectors */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 md:gap-6">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 block ml-1">The Curation Strategy</span>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter mb-6 md:mb-10 leading-[0.9] uppercase">Start with your purpose, <br/><span className="text-gray-500">Not the product.</span></h2>
          
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {occasions.map((occ) => (
              <button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ)}
                className={`flex items-start gap-4 md:gap-6 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 border-2 text-left ${selectedOccasion.id === occ.id ? 'bg-[var(--text-primary)] border-[var(--text-primary)] scale-[1.02] md:scale-[1.05] shadow-xl md:shadow-2xl skew-x-[-1deg] md:skew-x-[-2deg]' : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]'}`}
              >
                <div className={`${selectedOccasion.id === occ.id ? 'text-[var(--bg-primary)]' : 'text-gray-500'} transition-colors duration-500 shrink-0`}>
                  {occ.icon}
                </div>
                <div>
                  <h4 className={`font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-1 md:mb-2 ${selectedOccasion.id === occ.id ? 'text-[var(--bg-primary)]' : 'text-[var(--text-primary)]'} transition-colors duration-500`}>{occ.name}</h4>
                  <p className={`text-[9px] md:text-[10px] font-medium leading-relaxed ${selectedOccasion.id === occ.id ? 'text-[var(--bg-primary)] opacity-70' : 'text-gray-500'} transition-colors duration-500 uppercase tracking-widest`}>{occ.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOccasion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8"
            >
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-[var(--bg-secondary)] animate-pulse rounded-[2.5rem] md:rounded-[3rem] border border-[var(--border-color)]"></div>
                ))
              ) : (
                watches.map((watch) => (
                  <div key={watch.id} className="relative group rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col h-full hover:border-[var(--text-primary)] transition-all duration-700">
                    <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-zinc-800 flex items-center justify-center p-2 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-zinc-700 rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
                      {/* Wishlist Heart Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(watch);
                        }}
                        className={`absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 md:p-3 rounded-xl md:rounded-2xl border transition-all duration-300 ${
                          isInWishlist(watch.id) 
                            ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-rose-500 hover:border-rose-500/30'
                        }`}
                      >
                        <Heart size={14} fill={isInWishlist(watch.id) ? "currentColor" : "none"} />
                      </button>
                      <Link to={`/watch/${watch.id}`} className="w-full h-full flex items-center justify-center">
                          <img src={watch.img || (watch.images && watch.images[0])} alt={watch.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                       </Link>
                       {/* Star Rating Badge */}
                       <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1 md:gap-2 bg-[var(--bg-primary)]/80 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[var(--border-color)]">
                         <Star size={10} className="text-yellow-500 fill-current" />
                         <span className="text-[9px] md:text-[10px] font-black text-[var(--text-primary)]">4.9</span>
                       </div>
                     </div>
                    
                    <div className="p-6 md:p-8 mt-auto border-t border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors">
                       <span className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-1 md:mb-2 block">{watch.brand}</span>
                       <Link to={`/watch/${watch.id}`}>
                         <h3 className="text-lg md:text-xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4 md:mb-6 line-clamp-1 hover:text-gray-500 transition-colors cursor-pointer">{watch.name}</h3>
                       </Link>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {watch.originalPrice && (
                              <span className="text-[10px] md:text-xs text-rose-500 font-bold line-through opacity-60 tracking-tighter">₹ {(watch?.originalPrice ?? 0).toLocaleString('en-IN')}</span>
                            )}
                            <span className="text-xl md:text-2xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none">₹ {(watch?.price ?? 0).toLocaleString('en-IN')}</span>
                          </div>
                          {(() => {
                            const qty = getQty(watch.id);
                            return qty > 0 ? (
                              <div className="flex items-center gap-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-1">
                                <button 
                                  onClick={() => qty > 1 ? decrement(watch.id) : removeItem(watch.id)}
                                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-xs md:text-sm font-black min-w-[24px] text-center">{qty}</span>
                                <button 
                                  onClick={() => increment(watch.id)}
                                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  addItem(watch);
                                  toast.success(`${watch.name} into the bag!`);
                                }}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[var(--border-color)] rounded-xl md:rounded-2xl hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-transparent transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]"
                              >
                                <Plus size={20} />
                              </button>
                            );
                          })()}
                        </div>
                    </div>
                  </div>
                ))
              )}
              
              {!loading && watches.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-32 text-center bg-[var(--bg-secondary)]/50 rounded-[4rem] border-2 border-dashed border-[var(--border-color)]"
                >
                  <p className="text-gray-500 font-black italic text-xs uppercase tracking-[0.4em]">Curators are hallmarking <br/>new arrivals for this occasion.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OccasionShop;
