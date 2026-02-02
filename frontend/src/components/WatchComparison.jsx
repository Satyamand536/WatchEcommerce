import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Glasses, 
  Coins, 
  Check,
  X,
  Scale,
  Maximize2
} from 'lucide-react';

const translateSpecs = (watch) => {
  const insights = [];
  
  // 1. Wrist Comfort Insight
  const dial = watch.technicalSpecs?.dialSize || 40;
  if (dial < 38) {
    insights.push({ 
      label: 'Wrist Comfort', 
      insight: 'Ultra-light, disappears on the wrist. Ideal for long days.', 
      score: 95,
      type: 'comfort'
    });
  } else if (dial <= 42) {
    insights.push({ 
      label: 'Wrist Comfort', 
      insight: 'Well-balanced center of gravity. Fits under shirt cuffs.', 
      score: 85,
      type: 'comfort'
    });
  } else {
    insights.push({ 
      label: 'Wrist Comfort', 
      insight: 'Substantial presence. Built for those who like to feel their piece.', 
      score: 70,
      type: 'comfort'
    });
  }

  // 2. Office Suitability
  if (watch.suitableFor.includes('Office')) {
    insights.push({ 
      label: 'Office Presence', 
      insight: 'Dignified and understated. Commands respect without shouting.', 
      score: 98,
      type: 'office'
    });
  } else {
    insights.push({ 
      label: 'Office Presence', 
      insight: 'Leans casual. Better for creative or weekend environments.', 
      score: 60,
      type: 'office'
    });
  }

  // 3. Premium Feel (Material based)
  const mat = watch.technicalSpecs?.caseMaterial || '';
  if (mat.includes('Gold') || mat.includes('Platinum')) {
    insights.push({ 
      label: 'Premium Feel', 
      insight: 'Heirloom quality. Reflects light with extreme precision.', 
      score: 100,
      type: 'premium'
    });
  } else if (mat.includes('Titanium') || mat.includes('Ceramic')) {
    insights.push({ 
      label: 'Premium Feel', 
      insight: 'Technologically advanced. Scientific luxury feel.', 
      score: 90,
      type: 'premium'
    });
  } else {
    insights.push({ 
      label: 'Premium Feel', 
      insight: 'Workhorse durability. High-grade industrial finish.', 
      score: 80,
      type: 'premium'
    });
  }

  // 4. Value for Money
  const price = watch.price;
  if (price < 15000) {
    insights.push({ label: 'Value Metric', insight: 'Incredible specs for the price entry point.', score: 95, type: 'value' });
  } else if (price < 100000) {
    insights.push({ label: 'Value Metric', insight: 'Balanced investment. Retains value through brand heritage.', score: 85, type: 'value' });
  } else {
    insights.push({ label: 'Value Metric', insight: 'Pure luxury investment. Paying for elite craftsmanship.', score: 75, type: 'value' });
  }

  return insights;
};

const WatchComparison = ({ watchA, watchB }) => {
  if (!watchA || !watchB) return null;

  const insightsA = translateSpecs(watchA);
  const insightsB = translateSpecs(watchB);

  return (
    <div className="py-24 transition-colors duration-500">
      <div className="flex flex-col items-center mb-16">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 text-center block">Comparative Analysis</span>
        <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] italic tracking-tighter text-center max-w-2xl leading-[0.9] uppercase">Human Intel <br/><span className="text-gray-500">vs. Tech Specs.</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border-color)] rounded-[3.5rem] overflow-hidden border border-[var(--border-color)] shadow-2xl">
        {/* Watch A Column */}
        <div className="bg-[var(--bg-secondary)] p-12 lg:p-16 transition-colors duration-500">
          <div className="flex flex-col items-center mb-16">
            <div className="w-56 h-56 mb-8 bg-white dark:bg-zinc-800 rounded-[2.5rem] border border-[var(--border-color)] p-2 flex items-center justify-center group hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-700">
              <img src={watchA.img || watchA.images?.[0]} alt={watchA.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            </div>
            <h3 className="text-3xl font-black text-[var(--text-primary)] italic text-center leading-none mb-3 uppercase tracking-tighter">{watchA.name}</h3>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{watchA.brand}</span>
          </div>

          <div className="space-y-10">
            {insightsA.map((insight, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">{insight.label}</span>
                  <span className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter">{insight.score}%</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-primary)] rounded-full mb-4 overflow-hidden border border-[var(--border-color)]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${insight.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                    className="h-full bg-[var(--text-primary)]"
                  />
                </div>
                <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-500 uppercase tracking-widest">"{insight.insight}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch B Column */}
        <div className="bg-[var(--bg-primary)] p-12 lg:p-16 transition-colors duration-500 border-l border-[var(--border-color)]">
          <div className="flex flex-col items-center mb-16">
            <div className="w-56 h-56 mb-8 bg-white dark:bg-zinc-800 rounded-[2.5rem] border border-[var(--border-color)] p-2 flex items-center justify-center group hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-700">
              <img src={watchB.img || watchB.images?.[0]} alt={watchB.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            </div>
            <h3 className="text-3xl font-black text-[var(--text-primary)] italic text-center leading-none mb-3 uppercase tracking-tighter">{watchB.name}</h3>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{watchB.brand}</span>
          </div>

          <div className="space-y-10">
            {insightsB.map((insight, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">{insight.label}</span>
                  <span className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter">{insight.score}%</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full mb-4 overflow-hidden border border-[var(--border-color)]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${insight.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                    className="h-full bg-[var(--text-primary)]"
                  />
                </div>
                <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-500 uppercase tracking-widest">"{insight.insight}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchComparison;
