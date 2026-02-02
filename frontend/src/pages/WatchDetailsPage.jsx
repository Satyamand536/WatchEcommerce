import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WATCHES } from '../assets/dummywdata';
import { useCart } from '../CartContext';
import { useTheme } from '../ThemeContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Droplets, 
  Hammer, 
  Battery, 
  Globe, 
  Plus, 
  ShoppingBag,
  Star,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import WatchImage from '../components/ui/WatchImage';

const WatchDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, toggleWishlist, isInWishlist, cart } = useCart();
  const { theme } = useTheme();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchWatch = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/api/watches/${id}`);
        setWatch(data);
      } catch (err) {
        const localWatch = WATCHES.find(w => String(w.id) === String(id));
        if (localWatch) setWatch(localWatch);
        else setError("Piece outdated or removed from vault.");
      } finally {
        setLoading(false);
      }
    };
    fetchWatch();
  }, [id]);

  if (loading) {
     return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                 {/* Image Skeleton */}
                 <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-[4rem] border border-[var(--border-color)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                 </div>
                 {/* Text Skeleton */}
                 <div className="space-y-8">
                    <div className="h-10 w-1/3 bg-[var(--bg-secondary)] rounded-full relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="h-24 w-full bg-[var(--bg-secondary)] rounded-3xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="h-6 w-2/3 bg-[var(--bg-secondary)] rounded-full relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="h-16 w-1/2 bg-[var(--bg-secondary)] rounded-2xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="h-20 bg-[var(--bg-secondary)] rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                       </div>
                       <div className="h-20 bg-[var(--bg-secondary)] rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                       </div>
                       <div className="h-20 bg-[var(--bg-secondary)] rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter mb-4 uppercase">Piece Not Found</h2>
        <p className="text-gray-500 mb-8 font-medium">This signature timepiece is currently outside our synchronization range.</p>
        <Link to="/watches" className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 transition-all">
          Back to Vault
        </Link>
      </div>
    );
  }

  const specCards = [
    { icon: <Award className="text-amber-500" />, label: 'Warranty', value: watch.specs?.warranty || '2 Years Signature' },
    { icon: <Droplets className="text-blue-500" />, label: 'Resilience', value: watch.specs?.waterproof || '50m / 5 ATM' },
    { icon: <Hammer className="text-orange-500" />, label: 'Chassis', value: watch.specs?.durability || 'Stainless Steel' },
    { icon: <Battery className="text-green-500" />, label: 'Lifespan', value: watch.specs?.lifespan || '10+ Years' },
    { icon: <Globe className="text-purple-500" />, label: 'Provenance', value: watch.specs?.origin || 'Swiss-Bharat' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 pt-32 pb-20 px-6">
      <ToastContainer theme={theme} hideProgressBar />
      
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={14} /> Return
          </button>
          <div className="flex items-center gap-4 bg-[var(--bg-tertiary)] px-6 py-2 rounded-full border border-[var(--border-color)] shadow-sm">
             <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-accent)]">Status: Available in Vault</span>
             <div className="w-2 h-2 rounded-full bg-[var(--text-accent)] animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="aspect-[4/5] bg-white dark:bg-zinc-800 rounded-[4rem] border border-[var(--border-color)] p-12 flex items-center justify-center relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-1000">
              {/* Abstract decorative element */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--text-primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--text-primary)]/10 transition-colors duration-1000"></div>
              
              <WatchImage 
                src={watch.images?.[0] || watch.img} 
                alt={watch.name} 
                className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" 
              />
              
              <div className="absolute bottom-10 left-10 flex gap-4 z-10">
                <div className="px-6 py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <Star size={12} className="text-yellow-500 fill-current mb-1" />
                    <span className="text-[10px] font-black text-[var(--text-primary)] block">4.9 RATING</span>
                  </div>
                  <button 
                    onClick={() => toggleWishlist(watch)}
                    className={`p-2 rounded-xl border transition-all ${
                      isInWishlist(watch.id) 
                        ? 'bg-rose-500 border-rose-500 text-white' 
                        : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-rose-500 hover:border-rose-500/30'
                    }`}
                  >
                    <Heart size={14} fill={isInWishlist(watch.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-4">CHRONO-CERTIFIED • {watch.brand}</span>
            <h1 className="text-6xl lg:text-8xl font-black text-[var(--text-primary)] italic tracking-tighter leading-[0.8] mb-8 uppercase line-clamp-2 pr-4">
               {watch.name.split(' ').map((word, i) => (
                 <span key={i} className={i === 0 ? "" : "text-gray-500"}>{word} </span>
               ))}
            </h1>
            
            <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium mb-12 uppercase tracking-wide leading-relaxed">
              {watch.desc}. Built for the elite who value precision over mere time.
            </p>

            <div className="flex items-end gap-6 mb-12 border-b border-[var(--border-color)] pb-8">
               <div className="flex flex-col">
                  {watch.originalPrice && (
                    <span className="text-sm font-bold text-rose-500 line-through opacity-70 tracking-widest mb-1">₹ {watch.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                  <span className="text-6xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none">₹ {watch.price.toLocaleString('en-IN')}</span>
               </div>
               <div className="mb-2 px-4 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                 Instant Procurement Ready
               </div>
            </div>

            {/* Technical Chips Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
               {specCards.map((spec, i) => (
                 <div key={i} className="bg-[var(--bg-tertiary)] card-premium border border-[var(--border-color)] p-5 rounded-3xl hover:border-[var(--text-accent)] transition-all group shadow-[0_10px_30px_rgba(47,95,163,0.03)] hover:shadow-[0_20px_40px_rgba(47,95,163,0.1)]">
                    <div className="mb-3 opacity-60 group-hover:opacity-100 transition-opacity">{spec.icon}</div>
                    <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-1 block">{spec.label}</span>
                    <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tight">{spec.value}</span>
                 </div>
               ))}
            </div>

            {/* Action Area */}
            <div className="flex flex-col md:flex-row gap-6">
              {(() => {
                const isAdded = cart.some(item => String(item.id) === String(watch.id));
                return (
                  <button 
                    onClick={() => {
                      if (!isAdded) {
                        addItem(watch);
                        toast.success("Piece added to your cart.");
                      }
                    }}
                    disabled={isAdded}
                    className={`flex-1 py-6 font-black text-[10px] uppercase tracking-[0.4em] rounded-2.5xl flex items-center justify-center gap-4 transition-all shadow-xl group ${
                      isAdded 
                        ? 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-default border border-[var(--border-color)]' 
                        : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-zinc-800 hover:shadow-2xl cursor-pointer'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} className="group-hover:rotate-12 transition-transform" />
                        Add to Cart
                      </>
                    )}
                  </button>
                );
              })()}
            </div>

            {/* Trust Footer */}
            <div className="mt-12 flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
               <div className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Global Escrow</span>
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Verified Provenance</span>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetailsPage;
