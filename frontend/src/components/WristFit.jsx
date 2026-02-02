import React, { useState } from 'react';
import { Ruler, CheckCircle, Info, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const WristFit = () => {
  const [wristSize, setWristSize] = useState(7); // default 7 inches

  const getRecommendation = (size) => {
    if (size < 6) {
      return {
        range: "34mm - 38mm",
        title: "Elegance in Proportion",
        insight: "For more slender wrists, smaller dials (34-38mm) provide an elegant, vintage-inspired look. They sit comfortably within the wrist's width, ensuring the lugs don't overhang.",
        confidence: "Commonly preferred for formal occasions and slim profiles.",
        filter: "men" // fallback for demo
      };
    } else if (size <= 7.2) {
      return {
        range: "38mm - 42mm",
        title: "The Golden Ratio",
        insight: "This is the 'sweet spot' for most watch enthusiasts. A 40mm dial offers a modern presence that balances boldness with daily-wear comfort.",
        confidence: "The most versatile choice for both dress and sports watches.",
        filter: "all"
      };
    } else {
      return {
        range: "42mm - 46mm",
        title: "Bold Presence",
        insight: "Larger wrists can easily carry substantial 44mm+ timepieces. These sizes emphasize the watch's mechanical complexity and craftsmanship.",
        confidence: "Ideal for diving watches and chronographs where legibility is key.",
        filter: "all"
      };
    }
  };

  const recommendation = getRecommendation(wristSize);

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">The Science of Fit</h2>
          <p className="text-gray-600 italic font-[pacifico] text-lg">"A watch should not just tell time; it should tell your story with comfort."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Simulator Tool - Left Side */}
          <div className="lg:col-span-7">
            <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <Ruler className="w-64 h-64 -rotate-45" />
               </div>
               
               <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-black text-white rounded-2xl">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">WristFit™ Simulator</h3>
                    <p className="text-sm text-gray-500">Fine-tune your personal proportion</p>
                  </div>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-gray-600 font-medium uppercase tracking-widest text-xs">Wrist Circumference</span>
                      <div className="text-right">
                        <span className="text-5xl font-bold text-black leading-none">{wristSize}</span>
                        <span className="text-xl font-medium text-gray-400 ml-2">in</span>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="9" 
                      step="0.1" 
                      value={wristSize} 
                      onChange={(e) => setWristSize(parseFloat(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black"
                    />
                    <div className="flex justify-between mt-4 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                      <span>Petite</span>
                      <span>Average</span>
                      <span>Robust</span>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-gray-200 flex gap-4 shadow-sm group hover:border-black transition-colors">
                    <Info className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">How to measure?</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Wrap a flexible tape measure just below the wrist bone. If you're between sizes, consider if you prefer a "snug" or "relaxed" aesthetic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Action - Right Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border-t-8 border-black">
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <CheckCircle className="w-4 h-4 text-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Specialist Insight</span>
              </div>
              
              <div className="mb-10">
                <h4 className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-2">Ideal Diameter</h4>
                <p className="text-5xl md:text-6xl font-bold tracking-tighter text-black">
                  {recommendation.range}
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <h5 className="text-xl font-bold text-gray-900 mb-3">{recommendation.title}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    "{recommendation.insight}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {recommendation.confidence}
                  </p>
                </div>
              </div>

              <Link 
                to="/watches" 
                className="w-full py-5 bg-black text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
              >
                Shop {recommendation.range} Collection
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>

            {/* Horology Guide Section */}
            <div className="p-8 bg-gray-900 text-white rounded-[40px] relative overflow-hidden">
               <div className="flex items-center gap-3 mb-4">
                 <BookOpen className="w-5 h-5 text-gray-400" />
                 <h4 className="font-bold text-sm uppercase tracking-widest">Horology Guide</h4>
               </div>
               <p className="text-xs text-gray-400 leading-relaxed italic">
                 "Watch fitting is balance of lug-to-lug distance and wrist width. A perfect fit ensures the bracelet drapes naturally, preventing the watch from rotating or feeling top-heavy."
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WristFit;
