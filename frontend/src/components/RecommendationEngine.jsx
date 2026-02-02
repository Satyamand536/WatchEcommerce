import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Sparkles, 
  Dumbbell, 
  ChevronRight,
  Plus,
  TrendingUp,
  Star,
  CheckCircle2,
  ChevronLeft,
  Info,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';
import { toast } from 'react-toastify';
import WatchImage from './ui/WatchImage';
import { WATCHES } from '../assets/dummywdata';

const steps = [
  {
    id: 'wristSize',
    title: 'Your Wrist Profile',
    question: 'How would you describe your wrist size?',
    options: [
      { label: 'Small', sub: '5.5 - 6.5 in / 140-165mm', value: 'Small' },
      { label: 'Medium', sub: '6.5 - 7.25 in / 165-185mm', value: 'Medium' },
      { label: 'Large', sub: '7.25 - 8 in / 185-205mm', value: 'Large' },
      { label: 'Extra Large', sub: '> 8 in / > 205mm', value: 'Extra Large' },
    ]
  },
  {
    id: 'usage',
    title: 'Daily Rhythm',
    question: 'Where will this piece spend most of its time?',
    options: [
      { label: 'Office', sub: 'Business, Corporate, Client Meetings', value: 'Office', icon: <Briefcase size={20} /> },
      { label: 'Daily Wear', sub: 'Casual, Errands, Home', value: 'Daily Wear', icon: <Briefcase size={20} /> }, 
      { label: 'Party', sub: 'Social, Nights Out, Events', value: 'Party', icon: <Briefcase size={20} /> },
      { label: 'Sports', sub: 'Active, Gym, Swimming', value: 'Sports', icon: <Dumbbell size={20} /> },
    ]
  },
  {
    id: 'style',
    title: 'Aesthetic Lens',
    question: 'Which visual language speaks to you?',
    options: [
      { label: 'Minimal', sub: 'Clean, understated, functional', value: 'Minimal' },
      { label: 'Luxury', sub: 'Elite materials, statement', value: 'Luxury' },
      { label: 'Sporty', sub: 'Rugged, tool-watch focus', value: 'Sporty' },
    ]
  }
];

const RecommendationEngine = ({ onRecommendation }) => {
  const { theme } = useTheme();
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());

  const handleSelect = (field, value) => {
    const newSelections = { ...selections, [field]: value };
    setSelections(newSelections);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations(newSelections);
    }
  };

  const generateRecommendations = async (finalSelections) => {
    setIsLoading(true);
    let localResults = [];
    
    try {
      // 1. Prepare payload for Backend Engine
      const payload = {
        wristSize: finalSelections.wristSize,
        usage: finalSelections.usage,
        style: finalSelections.style,
        budget: 50000000 // Default high budget for unrestricted search
      };

      // 2. Fetch from Live API
      const { data } = await axios.post('http://localhost:5000/api/watches/recommend', payload);
      
      if (data && data.length > 0) {
        localResults = data;
      } else {
        throw new Error("Empty API result");
      }
    } catch (error) {
       console.warn("Recommendation API failed or empty, using local smart sync.");
       
       // Local Smart Filtering Logic
       localResults = WATCHES.filter(w => {
         // A. Wrist Fit Logic
         let sizeMatch = true;
         const d = w.dialSize || 40;
         if (finalSelections.wristSize === 'Small' && d > 38) sizeMatch = false;
         if (finalSelections.wristSize === 'Large' && d < 42) sizeMatch = false;
         if (finalSelections.wristSize === 'Extra Large' && d < 44) sizeMatch = false;

         // B. Usage & Style Logic (Fuzzy)
         let styleMatch = false;
         const sub = finalSelections.usage?.toLowerCase();
         const look = finalSelections.style?.toLowerCase();

         const tags = (w.styleTags || []).map(t => t.toLowerCase());
         const cat = w.category?.toLowerCase() || "";

         if (sub === 'office' && (cat === 'classic' || tags.includes('formal') || tags.includes('minimalist'))) styleMatch = true;
         if (sub === 'daily wear' && (cat === 'classic' || tags.includes('casual') || cat === 'smart')) styleMatch = true;
         if (sub === 'party' && (cat === 'luxury' || tags.includes('fashion') || tags.includes('gold'))) styleMatch = true;
         if (sub === 'sports' && (cat === 'sport' || tags.includes('rugged') || tags.includes('tough'))) styleMatch = true;

         // Aesthetic override
         if (look === 'luxury' && cat === 'luxury') styleMatch = true;
         if (look === 'sporty' && cat === 'sport') styleMatch = true;
         if (look === 'minimal' && (tags.includes('minimalist') || tags.includes('clean'))) styleMatch = true;

         return (sizeMatch || styleMatch) && Math.random() > 0.3; // Add slight randomness for variety
       }).slice(0, 3); // Top 3 recommendations

       // Fallback if filtering is too strict
       if (localResults.length === 0) {
         localResults = WATCHES.sort(() => 0.5 - Math.random()).slice(0, 3);
       }

       // Add generic recommendation reasons for local results
       localResults = localResults.map(w => {
         const sid = String(w.id || w.sku || w._id);
         return {
           ...w,
           id: sid,
           _id: sid, // Ensure ID mapping
           recommendationReason: `Perfect balance of ${finalSelections.wristSize} proportions and ${finalSelections.usage} functionality.`
         };
       });
    } finally {
      setTimeout(() => {
        setResults(localResults.slice(0, 5));
        setIsLoading(false);
      }, 1000);
    }
  };

  const stepVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  if (results) {
    return (
      <div className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2">WristFit Optimized</h2>
            <p className="text-[var(--text-secondary)] font-medium">Precision selection based on your specific biometrics.</p>
          </div>
          <button 
            onClick={() => { setResults(null); setCurrentStep(0); setSelections({}); setAddedItems(new Set()); }}
            className="text-[10px] font-black text-gray-500 hover:text-[var(--text-primary)] uppercase tracking-widest border-b border-[var(--border-color)] pb-1 transition-colors"
          >
            Reset Analysis
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((watch) => (
            <motion.div 
               key={watch._id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2.5rem] overflow-hidden group hover:border-[var(--text-primary)]/20 transition-all duration-500"
            >
                 <Link to={`/watch/${watch._id}`} className="aspect-square bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center p-4 border border-[var(--border-color)] overflow-hidden">
                  <WatchImage src={watch.images?.[0] || watch.img} alt={watch.name} className="w-full h-full object-contain hover:scale-110 transition-transform duration-700" />
                 </Link>
               
               <div className="p-8">
                 <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-black bg-[var(--text-primary)] text-[var(--bg-primary)] px-3 py-1 rounded-full tracking-tighter">DIAL {watch.wristFit?.dialSize || watch.dialSize}mm</span>
                   <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{watch.brand}</span>
                 </div>
                 
                 <div className="flex-1">
                    <Link to={`/watch/${watch._id}`}>
                       <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight italic hover:text-gray-500 transition-colors uppercase">{watch.name}</h3>
                    </Link>
                 </div>

                 <div className="bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-color)] mb-8 mt-6">
                    <div className="flex gap-3 items-start text-xs font-medium text-[var(--text-secondary)]">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed tracking-tight">{watch.recommendationReason}</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => {
                     if (!addedItems.has(watch._id)) {
                       addItem(watch);
                       toast.success(`${watch.name} added to cart!`);
                       setAddedItems(prev => new Set(prev).add(watch._id));
                     }
                   }}
                   disabled={addedItems.has(watch._id)}
                   className={`w-full py-5 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl ${addedItems.has(watch._id) ? 'bg-emerald-600 text-white opacity-90 cursor-default' : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-zinc-800 dark:hover:bg-zinc-200'}`}
                 >
                   {addedItems.has(watch._id) ? "Added to Cart" : "Add to Cart"}
                 </button>
               </div>
            </motion.div>
          ))}
          
          {results.length === 0 && (
            <div className="col-span-full py-32 text-center bg-[var(--bg-secondary)] rounded-[3rem] border-2 border-dashed border-[var(--border-color)]">
              <div className="w-20 h-20 bg-[var(--bg-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Info size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter mb-2">PRECISION GAP</h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">None of our current pieces met your high-confidence threshold. Adjust your profile for a broader search.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      {/* Progress Bar */}
      <div className="flex gap-3 mb-16">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${i <= currentStep ? 'bg-[var(--text-primary)]' : 'bg-[var(--border-color)]'}`}></div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           variants={stepVariants}
           initial="enter"
           animate="center"
           exit="exit"
           transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          <span className="inline-block text-[10px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 md:mb-4">ENGINE STEP 0{currentStep + 1} / 03</span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] italic tracking-tighter mb-4 md:mb-6 uppercase leading-none">{steps[currentStep].title}</h2>
          <p className="text-lg md:text-2xl text-[var(--text-secondary)] mb-8 md:mb-14 font-medium leading-tight">{steps[currentStep].question}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
            {steps[currentStep].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(steps[currentStep].id, opt.value)}
                className="group p-6 md:p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] text-left hover:border-[var(--text-primary)] transition-all duration-500 relative overflow-hidden active:scale-95 touch-manipulation"
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-black group-hover:text-[var(--bg-primary)] transition-colors uppercase italic tracking-tighter">{opt.label}</span>
                    <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-[var(--bg-primary)]/60 transition-colors font-bold mt-1 line-clamp-1">{opt.sub}</span>
                  </div>
                  {opt.icon && <div className="text-gray-400 group-hover:text-[var(--bg-primary)] transition-colors shrink-0 ml-2">{opt.icon}</div>}
                </div>
                <div className="absolute inset-0 bg-[var(--text-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-16">
        {currentStep > 0 ? (
          <button 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors"
          >
            <ChevronLeft size={16} /> Previous Phase
          </button>
        ) : <div></div>}
        
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
           <Zap size={14} className="text-amber-400" /> Secure Protocol Active
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-xl z-[200] flex flex-col items-center justify-center">
          <div className="w-24 h-24 border-t-2 border-[var(--text-primary)] rounded-full animate-spin mb-8"></div>
          <p className="text-[var(--text-primary)] font-black tracking-tighter text-3xl italic animate-pulse uppercase">Syncing Perfection...</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine;
