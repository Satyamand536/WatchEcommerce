import React, { useEffect, useState, useRef } from "react";
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  User, 
  X, 
  Heart, 
  ChevronDown, 
  Zap, 
  Sun, 
  Moon
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WATCHES } from "../assets/dummywdata";
import { useCart } from "../CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "SPECIAL OFFERS", href: "/offers", icon: <Zap size={14} className="text-amber-400" /> },
  { name: "Brands", href: "/brands" },
  { 
    name: "Men", 
    href: "/men", 
    submenu: [
      { name: "Mens Watches", href: "/men/watches" },
      { name: "Boys Watches", href: "/men/boys" }
    ] 
  },
  { 
    name: "Women", 
    href: "/women", 
    submenu: [
      { name: "Womens Watches", href: "/women/watches" },
      { name: "Girls Watches", href: "/women/girls" }
    ] 
  },
  { name: "Luxury", href: "/luxury" },
  { name: "Gifting", href: "/gifting" },
  { name: "Smart", href: "/smart-watches" },
];

import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ matches: [], priceSuggestions: [] });
  // Logout Modal State
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, wishlist } = useCart();
  const { isAuthenticated, logout, user } = useAuth(); // Use AuthContext
  const searchInputRef = useRef(null);

  // Removed local loggedIn state logic

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Lock html to prevent double scrollbar
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const confirmLogout = () => {
    logout(); // Use context logout
    setLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md py-2 md:py-3 shadow-2xl border-b border-[var(--border-color)]' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-[95%] mx-auto px-3 sm:px-4 md:px-8 flex items-center justify-between">
          {/* ... (Previous Navbar content remains exactly the same logic, just replacing logout handlers) ... */}
          
          {/* Left: Branding - Responsive sizing */}
          <div className="flex-1 flex justify-start items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-sm font-black group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base">P</div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-[22px] font-black tracking-tighter text-[var(--text-primary)] leading-[0.8]">Pre-See-Jan</span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">Precision × Clarity</span>
              </div>
            </Link>
            {user?.role === 'admin' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full"
              >
                <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                  Admin Protocol
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Center: Desktop Menu (Natural flow, safer than absolute) */}
          <div className="hidden lg:flex items-center justify-center gap-10">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group h-full"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={item.href} 
                  className={`text-[12px] h-full min-h-[44px] px-2 font-bold tracking-widest flex items-center gap-1.5 transition-colors uppercase ${location.pathname === item.href ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {item.icon}
                  {item.name}
                  {item.submenu && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </Link>
  
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-2xl py-3 z-50 overflow-hidden"
                    >
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 border-l-8 border-r-8 border-b-8 border-transparent border-b-[var(--border-color)]"></div>
                      {item.submenu.map((sub) => (
                        <Link 
                          key={sub.name} 
                          to={sub.href}
                          className="block px-6 py-3 text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-accent)] transition-colors tracking-wide"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
  
          {/* Right Actions - Mobile optimized */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4 md:gap-8 lg:pl-16">
            
            {/* Theme Toggle - Hidden on extra small mobile */}
            <button 
              onClick={toggleTheme}
              className="hidden sm:flex text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors p-2 min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </button>
  
            {/* Universal Search - Visible on all devices */}
            <div className="flex items-center relative gap-2 sm:gap-4">
               <button 
                  onClick={() => setSearchOpen(true)} 
                  className="text-gray-400 hover:text-[var(--text-primary)] transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Search"
               >
                 <Search size={18} className="sm:w-5 sm:h-5" />
               </button>

               {/* Desktop Search Bar (MD and up) */}
               <div className="hidden md:block">
                 <AnimatePresence>
                   {searchOpen && (
                     <div className="relative">
                       <motion.input
                         ref={searchInputRef}
                         initial={{ width: 0, opacity: 0 }}
                         animate={{ width: 220, opacity: 1 }}
                         exit={{ width: 0, opacity: 0 }}
                         type="text"
                         placeholder="Search pieces..."
                         value={searchQuery}
                         onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (e.target.value.trim().length > 1) {
                            const s = e.target.value.toLowerCase();
                            const matches = WATCHES.filter(w => {
                              const searchTerms = s.split(/\s+/).filter(t => t.length > 2); // only items > 2 chars
                              return searchTerms.some(term => {
                                 const normTerm = term === 'watches' ? 'watch' : (term === 'girls' ? 'girl' : (term === 'boys' ? 'boy' : (term.endsWith('s') ? term.slice(0, -1) : term)));
                                 return w.name.toLowerCase().includes(normTerm) || w.brand.toLowerCase().includes(normTerm);
                              });
                            }).slice(0, 5);
                            
                            const priceSuggestions = [];
                            const targetGenders = ["men", "women", "boys", "girls"];
                            const matchedGender = targetGenders.find(g => s.includes(g));
                            
                            if (matchedGender) {
                               priceSuggestions.push({ label: `${matchedGender.charAt(0).toUpperCase() + matchedGender.slice(1)} watches under ₹1,000`, query: `${matchedGender} watches under 1000` });
                               priceSuggestions.push({ label: `${matchedGender.charAt(0).toUpperCase() + matchedGender.slice(1)} watches under ₹5,000`, query: `${matchedGender} watches under 5000` });
                            } else if (s.includes("smart") || s.includes("luxury")) {
                               const term = s.includes("smart") ? "smart" : "luxury";
                               priceSuggestions.push({ label: `${term.charAt(0).toUpperCase() + term.slice(1)} watches under ₹5,000`, query: `${term} watches under 5000` });
                            }
                            setSuggestions({ matches, priceSuggestions });
                          } else {
                            setSuggestions({ matches: [], priceSuggestions: [] });
                          }
                        }}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter' && searchQuery.trim()) {
                             navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                             setSearchOpen(false);
                             setSearchQuery("");
                           }
                         }}
                         className="bg-[var(--bg-tertiary)] px-4 py-2 rounded-full text-xs text-[var(--text-primary)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--text-accent)]"
                       />
                       
                       <AnimatePresence>
                         {(suggestions.matches?.length > 0 || suggestions.priceSuggestions?.length > 0) && (
                           <motion.div
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: 10 }}
                             className="absolute top-full right-0 mt-4 w-72 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden z-[110]"
                           >
                             {suggestions.priceSuggestions?.length > 0 && (
                               <div className="py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
                                  <div className="px-4 py-2 text-[8px] font-black uppercase tracking-widest text-gray-400">Buying Guides</div>
                                  {suggestions.priceSuggestions.map(p => (
                                    <button
                                      key={p.query}
                                      onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(p.query)}`);
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                        setSuggestions({ matches: [], priceSuggestions: [] });
                                      }}
                                      className="w-full px-4 py-2.5 text-[10px] font-bold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] text-left transition-colors flex items-center gap-2"
                                    >
                                      <Zap size={10} className="text-amber-400" />
                                      {p.label}
                                    </button>
                                  ))}
                               </div>
                             )}
                             <div className="py-2">
                               <div className="px-4 py-2 text-[8px] font-black uppercase tracking-widest text-gray-400">Top Matches</div>
                               {suggestions.matches.map(w => (
                                 <button
                                   key={w.id}
                                   onClick={() => {
                                     navigate(`/watch/${w.id}`);
                                     setSearchOpen(false);
                                     setSearchQuery("");
                                   }}
                                   className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--bg-secondary)] transition-colors text-left"
                                 >
                                   <img src={w.img} alt="" className="w-8 h-8 object-contain bg-white rounded-lg p-1" />
                                   <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-[var(--text-primary)] truncate">{w.name}</span>
                                     <span className="text-[8px] text-gray-400 uppercase font-black tracking-tighter">{w.brand}</span>
                                   </div>
                                 </button>
                               ))}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                       
                       <button 
                         onClick={() => setSearchOpen(false)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--text-primary)]"
                       >
                         <X size={14} />
                       </button>
                     </div>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            {/* Mobile Search Overlay Full Screen */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl z-[200] md:hidden flex flex-col p-6 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-12">
                     <span className="text-xs font-black uppercase tracking-widest text-gray-400">Search the Vault</span>
                     <button 
                       onClick={() => setSearchOpen(false)}
                       className="p-3 rounded-full border border-[var(--border-color)] text-[var(--text-primary)]"
                     >
                       <X size={24} />
                     </button>
                  </div>

                  <div className="relative mb-10">
                    <input 
                      autoFocus
                      type="text"
                      placeholder="Search the pieces..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }
                      }}
                      className="w-full bg-transparent border-b-2 border-[var(--text-primary)] py-6 pr-16 text-3xl font-black text-[var(--text-primary)] placeholder:text-gray-300 focus:outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (searchQuery.trim()) {
                          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-[var(--text-primary)] hover:scale-110 transition-transform"
                    >
                      <Search size={28} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Trending Prototypes</div>
                     {[
                       { label: "Girls watches under 5,000", q: "girls watches under 5000" },
                       { label: "Luxury Collection", q: "luxury" },
                       { label: "Boys Sport watches", q: "boys sport" },
                       { label: "Smart Watches under 2000", q: "smart watches under 2000" }
                     ].map(item => (
                       <button 
                         key={item.q}
                         onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(item.q)}`);
                            setSearchOpen(false);
                            setSearchQuery("");
                         }}
                         className="text-left text-xl font-bold text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors flex items-center justify-between group"
                       >
                         {item.label}
                         <Zap size={16} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </button>
                     ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
  
            <Link to="/wishlist" className="hidden sm:flex text-gray-400 hover:text-[var(--text-primary)] transition-colors relative p-2 min-w-[44px] min-h-[44px] items-center justify-center group" aria-label="Wishlist">
              <Heart size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              {wishlist.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-rose-500 text-white text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>
  
            <Link to="/cart" className="text-gray-400 hover:text-[var(--text-primary)] transition-colors relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center group" aria-label="Cart">
              <ShoppingBag size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
  
            <div className="hidden sm:block h-5 w-[1px] bg-[var(--border-color)]"></div>
  
            {!isAuthenticated ? (
              <Link to="/login" className="hidden sm:flex items-center gap-2 text-[13px] font-bold text-[var(--text-accent)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest">
                <User size={18} />
                <span>Login</span>
              </Link>
            ) : (
              <button 
                onClick={handleLogoutClick} 
                className="hidden sm:flex items-center gap-2 text-[13px] font-bold text-[var(--text-accent)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest"
              >
                <span>Logout</span>
              </button>
            )}
  
            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden text-[var(--text-primary)] p-3 -mr-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors active:scale-95" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Menu Overlay - Full screen with scroll lock */}
        {/* Mobile Menu Overlay - Full screen Professional Mode */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 w-screen h-[100dvh] bg-[var(--bg-primary)] z-[9999] overflow-y-auto flex flex-col overscroll-contain"
            >
              {/* Mobile Menu Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black tracking-tighter text-[var(--text-primary)] uppercase">Menu</span>
                    <button 
                      onClick={toggleTheme}
                      className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] sm:hidden"
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg border border-[var(--border-color)] text-rose-500 sm:hidden">
                       <Heart size={16} fill={wishlist.length > 0 ? "currentColor" : "none"} />
                    </Link>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
              </div>

              <div className="flex-1 flex flex-col gap-8 px-8 py-10">
                <div className="flex flex-col gap-6">
                   {navItems.map((item) => (
                     <div key={item.name} className="flex flex-col gap-6">
                      <Link 
                        to={item.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter hover:text-[var(--text-accent)] transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="flex flex-col gap-4 pl-6 border-l-2 border-[var(--border-color)]">
                          {item.submenu.map(sub => (
                            <Link 
                              key={sub.name} 
                              to={sub.href} 
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-lg font-bold text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors py-1"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                     </div>
                   ))}
                </div>
                
                <div className="mt-10 pt-10 border-t border-[var(--border-color)]">
                  {!isAuthenticated ? (
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3"
                    >
                      <User size={24} /> LOGIN / SIGNUP
                    </Link>
                  ) : (
                    <button 
                      onClick={handleLogoutClick} 
                      className="text-xl font-bold text-rose-500 flex items-center gap-3"
                    >
                      <User size={24} /> LOGOUT
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={logoutModalOpen} 
        onClose={() => setLogoutModalOpen(false)} 
        onConfirm={confirmLogout} 
      />
    </>
  );
};

export default Navbar;

