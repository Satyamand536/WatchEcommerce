import React, { useEffect, useMemo } from "react";
import { brandPageStyles } from "../assets/dummyStyles";
import { useNavigate, useParams, Link } from "react-router-dom";
import { WATCHES } from "../assets/dummywdata";
import { useCart } from "../CartContext";
import { ArrowLeft, Minus, Plus, Heart, User, Users } from "lucide-react";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Premium (₹10k+)", min: 10001, max: Infinity },
];

const GENDER_FILTERS = [
  { key: "all", label: "All Pieces", icon: Users },
  { key: "men", label: "Men", icon: User },
  { key: "women", label: "Women", icon: Users },
];

const BrandPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [activeGender, setActiveGender] = React.useState("all");
  const [activePriceRange, setActivePriceRange] = React.useState(PRICE_RANGES[0]);
  
  // Filter watches by brand, gender, and price range
  const brandWatches = useMemo(() => {
    return WATCHES.filter(w => {
      // Brand filter
      const brandMatch = brandName 
        ? w.brand?.toLowerCase() === brandName.toLowerCase()
        : true;
      
      // Gender filter
      const genderMatch = activeGender === "all" || w.gender === activeGender;
      
      // Price filter
      const priceMatch = w.price >= activePriceRange.min && w.price <= activePriceRange.max;
      
      return brandMatch && genderMatch && priceMatch;
    });
  }, [brandName, activeGender, activePriceRange]);

  const { addItem, cart, increment, decrement, toggleWishlist, isInWishlist } = useCart();
  const [loading, setLoading] = React.useState(true);

  // to scroll to top and simulate loading
  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [brandName, activeGender, activePriceRange]);

  const findInCart = (id) => cart.find((p) => String(p.id) === String(id));
  
  return (
    <div className={brandPageStyles.mainContainer}>
      <div className="max-w-7xl mx-auto relative">
        <div className={brandPageStyles.headerContainer}>
          <div className={brandPageStyles.backButtonContainer}>
            <button
              className={brandPageStyles.backButton}
              onClick={() => navigate(-1)}
            >
              <div className="p-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-xl hover:scale-110 transition-all">
                <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-[var(--text-primary)]">Return</span>
            </button>
          </div>
          <div className={`${brandPageStyles.titleContainer} flex flex-col items-center gap-4 w-full`}>
            <h1 className={brandPageStyles.title}>
              {brandName ? `${brandName.toUpperCase()} Collections` : "Global Watch Collection"}
            </h1>
            
            {/* Filters UI */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 w-full px-4">
              {/* Gender Filters */}
              <div className="flex bg-[var(--bg-secondary)] p-1 rounded-2xl border border-[var(--border-color)] shadow-sm">
                {GENDER_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveGender(f.key)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                      activeGender === f.key
                        ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-lg scale-105"
                        : "text-gray-400 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <f.icon size={14} />
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Price Range Filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setActivePriceRange(r)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                      activePriceRange.label === r.label
                        ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-md scale-105"
                        : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">
              Viewing {brandWatches.length} items
            </p>
          </div>
        </div>

        {/* watches grid */}
        {!brandWatches.length && !loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[var(--bg-secondary)] rounded-3xl border-2 border-dashed border-[var(--border-color)] mx-4">
             <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No watches found</h2>
             <p className="text-sm text-gray-500 mb-6">Try adjusting your gender or price filters for this brand.</p>
             <button 
               onClick={() => { setActiveGender("all"); setActivePriceRange(PRICE_RANGES[0]); }}
               className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl font-bold text-xs hover:scale-105 transition-all"
             >
               Clear Filters
             </button>
          </div>
        ) : (
          <div className={brandPageStyles.grid}>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                  <div key={i} className={brandPageStyles.card + " p-4"}>
                    <div className="bg-gray-100 animate-pulse h-48 rounded-xl mb-4"></div>
                    <div className="bg-gray-100 animate-pulse h-4 w-3/4 mb-2"></div>
                    <div className="bg-gray-100 animate-pulse h-4 w-1/2"></div>
                  </div>
                ))
            ) : (
              brandWatches.map((watch) => {
                const inCart = findInCart(watch.id);
                return (
                  <div key={watch.id} className={brandPageStyles.card}>
                    <Link to={`/watch/${watch.id}`} className={brandPageStyles.imageContainer}>
                      <img
                        src={watch.img}
                        alt={watch.name}
                        className={brandPageStyles.image}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); e.stopPropagation();
                          toggleWishlist(watch);
                        }}
                        className={`absolute top-4 right-4 z-20 p-2.5 rounded-xl border transition-all duration-300 ${
                          isInWishlist(watch.id) 
                            ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
                            : 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-[var(--border-color)] text-gray-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart size={14} fill={isInWishlist(watch.id) ? "currentColor" : "none"} />
                      </button>
                    </Link>
                    <div className={brandPageStyles.detailsContainer}>
                    <Link to={`/watch/${watch.id}`}>
                      <h2 className={brandPageStyles.watchName}>{watch.name}</h2>
                    </Link>
                      <p className={brandPageStyles.watchDesc}>{watch.desc || `${watch.brand} Series`}</p>
                      <div className={brandPageStyles.priceAndControls}>
                        <div className="flex flex-col">
                          {watch.originalPrice && (
                            <span className="text-[10px] text-rose-500 font-bold line-through opacity-60 tracking-tighter">₹ {watch.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                          <p className={brandPageStyles.price}>₹ {watch.price.toLocaleString('en-IN')}</p>
                        </div>
                        {inCart ? (
                          <div className={brandPageStyles.quantityContainer}>
                            <button className={brandPageStyles.quantityButton} onClick={() => decrement(watch.id)}><Minus size={16} /></button>
                            <div className={brandPageStyles.quantityCount}>{inCart.qty}</div>
                            <button className={brandPageStyles.quantityButton} onClick={() => increment(watch.id)}><Plus size={16} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem({ id: watch.id, name: watch.name, price: watch.price, img: watch.img })}
                            className={brandPageStyles.addButton}
                          >
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
