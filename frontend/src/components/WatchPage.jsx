import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';
import { Grid, Minus, Plus, ShoppingCart, User, Users, ArrowLeft, X, Sparkles, Heart, ShieldAlert } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GradientBlinds from './ui/GradientBlinds';
import WatchImage from './ui/WatchImage'; // Import WatchImage
import { WATCHES, FILTERS as RAW_FILTERS } from '../assets/dummywdata';

const ICON_MAP = { Grid, User, Users };
const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
  : [
      { key: "all", label: "All Pieces", icon: Grid },
      { key: "men", label: "Gentlemen", icon: User },
      { key: "women", label: "Ladies", icon: Users },
    ];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Premium (₹10k+)", min: 10001, max: Infinity },
];

const WatchCard = ({ w, sid, qty, addItem, increment, decrement, removeItem, toggleWishlist, isInWishlist, showDiscount }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const isFavourite = isInWishlist(sid);

  const discount = w.originalPrice && w.originalPrice > w.price 
    ? Math.round(((w.originalPrice - w.price) / w.originalPrice) * 100) 
    : 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={sid} 
      className="group flex flex-col gap-6 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] bg-[var(--bg-secondary)] card-premium rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-12 shadow-[0_20px_50px_rgba(47,95,163,0.05)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(47,95,163,0.12)]">
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(w);
          }}
          className={`absolute top-6 right-6 z-30 p-3 rounded-2xl border transition-all duration-300 ${
            isFavourite 
              ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
              : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-rose-500 hover:border-rose-500/30'
          }`}
        >
          <Heart size={16} fill={isFavourite ? "currentColor" : "none"} />
        </button>

        {/* Discount Badge */}
        {showDiscount && discount > 0 && (
          <div className="absolute top-6 left-6 z-30 px-3 py-1.5 bg-rose-500 text-white text-[10px] font-black italic tracking-tighter rounded-lg shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* GradientBlinds Effect - Only rendered on hover to save WebGL contexts */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            >
              <GradientBlinds
                gradientColors={['#D4AF37', '#FFD700', '#FFA500']}
                angle={45}
                noise={0.2}
                blindCount={8}
                spotlightRadius={0.4}
                spotlightSoftness={1.2}
                spotlightOpacity={0.8}
                mouseDampening={0.2}
                mixBlendMode="overlay"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Link to={`/watch/${sid}`} className="w-full h-full block relative z-10">
          <WatchImage 
            src={w.images?.[0] || w.img} 
            alt={w.name} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none relative z-10"
          />
        </Link>
        
        {/* Cart Controls Overlay */}
        <div className="absolute inset-x-0 bottom-8 px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
          {qty > 0 ? (
            <div className="flex items-center justify-between bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-2 shadow-2xl">
              <button 
                onClick={() => qty > 1 ? decrement(sid) : removeItem(sid)}
                className="w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-xs font-black text-zinc-950 dark:text-white">{qty}</span>
              <button 
                onClick={() => increment(sid)}
                className="w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addItem({ id: sid, name: w.name, price: w.price, img: w.img })}
              className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShoppingCart size={14} /> Add to Cart
            </button>
          )}
        </div>

        {/* Admin Protocol Overlay: Stock Visibility */}
        {user?.role === 'admin' && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 px-3 py-1 bg-rose-500 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20 whitespace-nowrap backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
             SYNCED: {w.countInStock || 0} UNITS
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 px-2">
        <Link to={`/watch/${sid}`} className="flex justify-between items-start group/title">
          <h3 className="text-lg font-black text-[var(--text-primary)] italic tracking-tight uppercase group-hover/title:text-[var(--text-accent)] transition-colors">{w.name}</h3>
          <div className="flex flex-col items-end">
            {w.originalPrice && (
              <span className="text-[10px] text-rose-500 font-bold line-through opacity-60 tracking-tighter">₹ {w.originalPrice.toLocaleString('en-IN')}</span>
            )}
            <span className="text-lg font-black text-[var(--text-primary)] italic tracking-tighter leading-none">₹ {w.price.toLocaleString('en-IN')}</span>
          </div>
        </Link>
        <p className="text-[12px] font-medium text-[var(--text-secondary)] leading-relaxed uppercase tracking-tight opacity-80">{w.desc}</p>
      </div>
    </motion.div>
  );
};

const WatchPage = ({ category, promo, gender, searchQuery }) => {
    const [filter, setFilter] = useState("all");
    const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
    const { cart, addItem, increment, decrement, removeItem, toggleWishlist, isInWishlist } = useCart();
    const navigate = useNavigate();
    const location = useLocation(); // Hook to check path for sub-categories like 'boys'
    
    // State management
    const [watches, setWatches] = useState(WATCHES);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchWatches = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get('http://localhost:5000/api/watches');
          if (data && data.length > 0) {
            setWatches(data);
          }
          setError(null);
        } catch (err) {
          console.error("Error fetching watches:", err);
          setError("Failed to synchronize with vault.");
          // Fallback to dummy data if API fails to ensure UI doesn't break during dev
          setWatches(WATCHES); 
        } finally {
          setLoading(false);
        }
      };

      fetchWatches();
      
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }, [category, promo, gender, location.pathname, searchQuery]); 

    const filtered = useMemo(() => {
      return watches.filter((w) => {
        let matches = true;

        if (category && (w.category || "").toLowerCase() !== category.toLowerCase()) matches = false;
        if (promo && (w.promo || "").toLowerCase() !== promo.toLowerCase()) matches = false;
        
        // Price filtering
        if (w.price < priceRange.min || (priceRange.max !== Infinity && w.price > priceRange.max)) matches = false;

        // Search filtering
        if (matches && searchQuery) {
          const s = searchQuery.toLowerCase();
          const nameMatch = (w.name || "").toLowerCase().includes(s);
          const brandMatch = (w.brand || "").toLowerCase().includes(s);
          const tagMatch = (w.styleTags || []).some(t => t.toLowerCase().includes(s));
          
          if (!nameMatch && !brandMatch && !tagMatch) matches = false;
        }
        
        if (!matches) return false;

        const path = location.pathname.toLowerCase();
        const currentGender = (w.gender || "").toLowerCase() || "unisex";
        const name = (w.name || "").toLowerCase();
        const tags = (w.styleTags || []).map(t => t.toLowerCase());

        // Context detection (Route/Path)
        const isBoysRoute = path.includes("/boys");
        const isGirlsRoute = path.includes("/girls");
        
        // Stabilize: If it's a specific sub-route, don't let parent gender props interfere
        const isMenRoute = !isBoysRoute && !isGirlsRoute && (path.includes("/men") || (gender && gender.toLowerCase() === "men"));
        const isWomenRoute = !isBoysRoute && !isGirlsRoute && (path.includes("/women") || (gender && gender.toLowerCase() === "women"));

        // 1. Sub-category (Junior/Age Specific) Checks - Priority 1
        if (isBoysRoute) {
            const isBoyItem = currentGender === "boys" || tags.includes("boys") || name.includes("boy");
            if (!isBoyItem) matches = false;
        } else if (isGirlsRoute) {
            const isGirlItem = currentGender === "girls" || tags.includes("girls") || name.includes("girl") || tags.includes("ladies");
            if (!isGirlItem) matches = false;
        } 
        
        // 2. High-level Gender Filtering - Only if NOT a sub-route
        if (matches && isMenRoute) {
            const isMenMatch = currentGender === "men" || currentGender === "unisex" || (name.includes("men") && !name.includes("women"));
            if (!isMenMatch) matches = false;
        } else if (matches && isWomenRoute) {
            const isWomenMatch = currentGender === "women" || currentGender === "unisex" || name.includes("women") || name.includes("lady") || name.includes("girl");
            if (!isWomenMatch) matches = false;
        }

        // 3. Tab Filter (Bottom Nav / Tab Selection)
        if (matches && filter !== "all") {
            const targetFilter = filter.toLowerCase();
            if (currentGender !== targetFilter && currentGender !== "unisex") {
                if (targetFilter === "men" && currentGender !== "men" && currentGender !== "unisex") matches = false;
                else if (targetFilter === "women" && currentGender !== "women" && currentGender !== "unisex") matches = false;
                else if (targetFilter !== "men" && targetFilter !== "women") matches = false;
            }
        }
        
        return matches;
      });
    }, [watches, filter, category, promo, gender, location.pathname, searchQuery, priceRange]);

    const getQty = (id) => {
      const it = cart.find((c) => String(c.id) === String(id));
      return it ? Number(it.qty || 0) : 0;
    };

    return (
      <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section - Mobile Responsive */}
          <div className="mb-12 sm:mb-16">
            <div className="flex justify-between items-center mb-16 px-4 sm:px-0">
            <button 
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 transition-all"
            >
              <div className="p-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-xl hover:scale-110 transition-all">
                <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-[var(--text-primary)]">Return</span>
            </button>
            <div className="hidden sm:flex items-center gap-4 bg-[var(--bg-tertiary)] px-6 py-2 rounded-full border border-[var(--border-color)]">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                   Section Archive • {
                     location.pathname.toLowerCase().includes("/boys") ? "Boys" : 
                     location.pathname.toLowerCase().includes("/girls") ? "Girls" :
                     category || promo || gender || "Global"
                   }
                </span>
            </div>
          </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
              <div className="flex flex-col gap-2">
                {searchQuery ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                      Search Results
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
                      Showing results for <span className="font-bold italic">"{searchQuery}"</span>
                    </h1>
                    <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] font-medium">
                      {filtered.length} {filtered.length === 1 ? 'timepiece' : 'timepieces'} found in total.
                    </p>
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] italic tracking-tighter leading-[0.85] uppercase mb-3 sm:mb-4">
                      The <br/> <span className="text-gray-500">Curated</span> Selection.
                    </h1>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium max-w-lg">
                      Precision in every second. Clarity in every choice. Explore our hallmarked collection of timeless engineering.
                    </p>
                  </>
                )}
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Price Range Filter */}
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setPriceRange(r)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        priceRange.label === r.label
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                          : 'bg-transparent text-gray-400 border-[var(--border-color)] hover:border-[var(--text-primary)]'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                {/* Filter Tabs - Mobile Responsive */}
                {!(gender || location.pathname.toLowerCase().includes("/boys") || location.pathname.toLowerCase().includes("/girls")) && !searchQuery && (
                  <div className="flex flex-wrap sm:flex-nowrap bg-[var(--bg-tertiary)] border border-[var(--border-color)] p-1.5 rounded-2xl gap-1 sm:gap-0">
                    {FILTERS.map((f) => {
                      const Icon = f.icon;
                      const active = filter === f.key;
                      return (
                        <button 
                          key={f.key} 
                          onClick={() => setFilter(f.key)}
                          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all min-h-[44px] sm:min-h-0 flex-1 sm:flex-initial ${
                            active 
                             ? 'bg-[var(--text-accent)] text-[var(--bg-primary)] shadow-lg' 
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                          }`}
                        >
                          <Icon size={12} className={`sm:w-3.5 sm:h-3.5 ${active ? "opacity-100" : "opacity-60"}`} />
                          <span className="hidden sm:inline">{f.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-color)] overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="space-y-4 px-2">
                       <div className="h-5 w-2/3 bg-[var(--bg-secondary)] rounded-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                       </div>
                       <div className="h-3 w-full bg-[var(--bg-secondary)] rounded-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                       </div>
                    </div>
                  </div>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((w) => {
                  const sid = String(w.id ?? w._id ?? w.sku ?? w.name);
                  const qty = getQty(sid);
                  return (
                    <WatchCard 
                      key={sid}
                      w={w}
                      sid={sid}
                      qty={qty}
                      addItem={addItem}
                      increment={increment}
                      decrement={decrement}
                      removeItem={removeItem}
                      toggleWishlist={toggleWishlist}
                      isInWishlist={isInWishlist}
                      showDiscount={promo === "offers"}
                    />
                  );
                })
              ) : (
    <div className="col-span-full py-32 sm:py-48 flex flex-col items-center justify-center text-center px-6">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-24 h-24 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] flex items-center justify-center mb-10 shadow-xl"
        >
          <X size={32} className="text-gray-400" />
        </motion.div>
        <h3 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-6 leading-none">The Vault is Silent.</h3>
        <p className="text-[var(--text-secondary)] font-medium max-w-sm mx-auto mb-10 text-sm sm:text-base">No pieces currently match your unique signature. Adjust your filters to synchronize with the collection.</p>
        <button 
          onClick={() => { setFilter('all'); setPriceRange(PRICE_RANGES[0]); }}
          className="px-10 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          Reset Protocol
        </button>
    </div>
  )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    );
};

export default WatchPage;
