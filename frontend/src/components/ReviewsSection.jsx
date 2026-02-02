import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Watch } from 'lucide-react';

// Enhanced Data Structure as requested
const reviews = [
  {
    id: 1,
    name: "Vikram Malhotra",
    location: "Mumbai, India",
    role: "Horological Journalist",
    content: "The curation here is astounding. Finding rare Breitling and JLC pieces under one roof in Bharat is a game-changer for collectors like myself.",
    rating: 5,
    watchModel: "Breitling Navitimer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Anjali Sharma",
    location: "Bangalore, India",
    role: "Luxury Consultant",
    content: "Minimalism is hard to get right. Pre-See-Jan nailed it with the Lady Precision series. The search 'Buy Guide' is incredibly intuitive.",
    rating: 5,
    watchModel: "Lady Precision 28mm",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Rohan Dasgupta",
    location: "Delhi, India",
    role: "Investment Banker",
    content: "Luxury is in the details. From the packaging to the real-time tracking, this is by far the most premium watch buying experience in the country.",
    rating: 5,
    watchModel: "Omega Speedmaster",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Meera Iyer",
    location: "Chennai, India",
    role: "Jewelry Designer",
    content: "The aesthetic of the site matches the quality of the timepieces. I found my perfect Cartier Panthère through their specialized Occasion Shop.",
    rating: 5,
    watchModel: "Cartier Panthère",
    avatar: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Alexander Vance",
    location: "London, UK",
    role: "Global Collector",
    content: "The Wrist-Fit engine recommended the Precision Master 40. It's the first watch that actually feels like it belongs on my wrist. Unparalleled service.",
    rating: 4,
    watchModel: "Precision Master 40",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Arjun Kulkarni",
    location: "Pune, India",
    role: "Tech Entrepreneur",
    content: "Finally, a platform that understands the intersection of tech and tradition. The Smart Watch collection is the best I've seen in India.",
    rating: 5,
    watchModel: "Apple Watch Ultra 2",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Priya Venkatesh",
    location: "Hyderabad, India",
    role: "Software Architect",
    content: "The delivery to Hyderabad was seamless. The packaging itself is a work of art. It felt like receiving a gift from a dear friend.",
    rating: 5,
    watchModel: "Tissot PRX 35mm",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Rajesh Khanna",
    location: "Jaipur, India",
    role: "Heritage Hotelier",
    content: "I appreciate the focus on heritage and modern aesthetics. The collection resonates with my personal style and the service is impeccable.",
    rating: 5,
    watchModel: "Longines Master Collection",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Sarah Jenkins",
    location: "New York, USA",
    role: "Fashion Editor",
    content: "Discovered this gem while researching emerging markets. The curation beats many established European boutiques I've visited.",
    rating: 5,
    watchModel: "Cartier Tank Must",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  // isPaused removed as auto-play is disabled

  // Responsive logic for items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    
    // Initial call
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / itemsPerSlide);

  /* Auto-play removed as per request */
  
  // Navigation handlers

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-4 block"
            >
              The Verdict
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] italic tracking-tighter leading-[0.9] uppercase"
            >
              Trusted by the <br/>
              <span className="text-gray-500/50">Discerning Few.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col items-end gap-6">
            {/* Restored Social Proof Card */}
            <div className="flex items-center gap-4 bg-[var(--bg-tertiary)] p-4 md:p-6 rounded-2xl border border-[var(--border-color)] group hover:border-[var(--text-accent)] transition-all shadow-sm card-premium">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[var(--bg-secondary)] bg-[var(--bg-tertiary)] overflow-hidden relative z-0 group-hover:z-10 transition-all duration-300">
                     <img src={`https://i.pravatar.cc/100?img=${i+25}`} alt="Verified User" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   </div>
                 ))}
               </div>
               <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[var(--text-accent)] fill-[var(--text-accent)]" />)}
                  </div>
                  <p className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">4.9/5 Rating (2.4k Reviews)</p>
               </div>
            </div>

            {/* Desktop Controls Removed - Moving to Bottom */}
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeIndex}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {reviews.slice(activeIndex * itemsPerSlide, (activeIndex + 1) * itemsPerSlide).map((review, idx) => (
                  <div 
                    key={review.id}
                    className="flex flex-col h-full bg-[var(--bg-secondary)] card-premium rounded-[2.5rem] p-10 relative group shadow-[0_20px_60px_rgba(47,95,163,0.05)]"
                  >
                     {/* Quote Icon Background */}
                     <Quote className="absolute top-10 right-10 text-[var(--text-primary)] opacity-5 group-hover:opacity-10 transition-opacity duration-500" size={80} />

                     {/* Rating */}
                     <div className="flex gap-1 mb-6">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={12} 
                           className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"} 
                         />
                       ))}
                     </div>

                     {/* Content */}
                     <p className="text-[var(--text-primary)]/90 text-lg leading-relaxed font-medium mb-10 flex-grow relative z-10">
                       "{review.content}"
                     </p>

                     {/* Footer Info */}
                     <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-[var(--border-color)]">
                          <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-[var(--text-primary)] text-sm uppercase tracking-wide">{review.name}</h4>
                          <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] block mb-1">{review.role}</span>
                          
                          <div className="flex items-center gap-3 mt-2 opacity-60 text-[10px] font-bold uppercase tracking-wider">
                             <div className="flex items-center gap-1">
                               <MapPin size={10} /> {review.location}
                             </div>
                             <div className="w-1 h-1 bg-current rounded-full" />
                             <div className="flex items-center gap-1">
                               <Watch size={10} /> {review.watchModel}
                             </div>
                          </div>
                        </div>
                     </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls (Bottom, Centered, No Slider) */}
        <div className="mt-16 flex justify-center items-center gap-8">
           <button 
             onClick={prevSlide}
             disabled={activeIndex === 0}
             className={`w-16 h-16 rounded-full border border-[var(--border-color)] flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 ${activeIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:scale-95'}`}
             aria-label="Previous reviews"
           >
             <ChevronLeft size={28} />
           </button>

           <button 
             onClick={nextSlide}
             disabled={activeIndex === totalPages - 1}
             className={`w-16 h-16 rounded-full border border-[var(--border-color)] flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 ${activeIndex === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:scale-95'}`}
             aria-label="Next reviews"
           >
             <ChevronRight size={28} />
           </button>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
