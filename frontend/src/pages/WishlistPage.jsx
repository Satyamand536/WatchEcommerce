import React from 'react';
import { useCart } from '../CartContext';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WatchImage from '../components/ui/WatchImage';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addItem, cart } = useCart();
  const { theme } = useTheme();

  const isInCart = (id) => cart.some(item => String(item._id || item.id) === String(id));

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <Link to="/watches" className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={14} /> Back to Gallery
            </Link>
            <h1 className="text-5xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none mb-2 uppercase">Your Wishlist.</h1>
            <p className="text-gray-500 text-sm font-medium">Pieces reserved for your future acquisition.</p>
          </div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-[var(--border-color)] pb-1">
            {wishlist.length} {wishlist.length === 1 ? 'PIECE' : 'PIECES'} ARCHIVED
          </div>
        </div>

        {!wishlist.length ? (
          <div className="py-20 text-center">
            <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--border-color)]">
              <Heart size={40} className="text-gray-500/20" />
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter mb-4 uppercase">Wishlist Empty</h2>
            <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium">Discover timepieces that speak to your ambition and add them here.</p>
            <Link to="/watches" className="inline-block px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlist.map((watch) => (
                <motion.div
                  key={watch.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-color)] overflow-hidden flex flex-col hover:border-[var(--text-primary)] transition-all duration-500 shadow-sm hover:shadow-2xl"
                >
                  <div className="aspect-square relative flex items-center justify-center p-10 bg-white dark:bg-zinc-900/50">
                    <Link to={`/watch/${watch.id}`} className="w-full h-full flex items-center justify-center">
                      <WatchImage src={watch.img} alt={watch.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </Link>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking delete
                        e.stopPropagation();
                        toggleWishlist(watch);
                      }}
                      className="absolute top-6 right-6 p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg z-10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{watch.brand}</span>
                      <h3 className="text-xl font-black text-[var(--text-primary)] italic tracking-tight">{watch.name}</h3>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <span className="text-lg font-black text-[var(--text-primary)] italic tracking-tighter">₹ {(watch?.price ?? 0).toLocaleString('en-IN')}</span>
                      
                      <button 
                        onClick={() => addItem(watch)}
                        disabled={isInCart(watch.id)}
                        className={`flex-1 h-12 px-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all min-h-[44px] ${
                          isInCart(watch.id)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg'
                        }`}
                      >
                        {isInCart(watch.id) ? 'Secured in Bag' : 'Add to Bag'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
