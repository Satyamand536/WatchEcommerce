import React, { useState } from 'react';
import { Moon, Sun, Info, Eye, Zap } from 'lucide-react';
import R1 from "../assets/R1.png"; // Using a Diver watch for best lume effect

const TheLumeMaster = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <section className={`py-24 transition-colors duration-1000 ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 transition-colors ${isDark ? 'bg-amber-900/30 text-amber-500' : 'bg-black text-white'}`}>
                {isDark ? <Zap size={14} className="animate-pulse" /> : <Eye size={14} />}
                {isDark ? "Super-LumiNova™ Active" : "Daylight Visibility"}
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                The Lume <br />
                <span className={isDark ? "text-amber-500 transition-colors" : "text-gray-400 transition-colors"}>Master</span>
              </h2>
            </div>

            <p className={`text-lg leading-relaxed max-w-lg transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Experience the legendary glow of premium Bharatiya timepieces. Our "Night Mode" simulation shows you exactly how your watch performs in total darkness.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border transition-all ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Duration</h4>
                 <p className="text-2xl font-black">8 Hours+</p>
                 <p className="text-xs text-gray-500 mt-1">Sustained intensity</p>
              </div>
              <div className={`p-6 rounded-3xl border transition-all ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Material</h4>
                 <p className="text-2xl font-black">Grade X1</p>
                 <p className="text-xs text-gray-500 mt-1">Non-radioactive</p>
              </div>
            </div>

            <button 
              onClick={() => setIsDark(!isDark)}
              className={`w-full md:w-auto px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.05] active:scale-95 shadow-xl ${isDark ? 'bg-amber-500 text-black' : 'bg-black text-white'}`}
            >
              {isDark ? <Sun className="fill-current" /> : <Moon />}
              {isDark ? "Turn Lights On" : "Try Night Mode"}
            </button>
          </div>

          {/* Visualization Side */}
          <div className="lg:w-1/2 relative">
            {/* The "Dark Room" Container */}
            <div className={`relative aspect-square rounded-[60px] flex items-center justify-center overflow-hidden transition-all duration-1000 shadow-2xl ${isDark ? 'bg-black p-12 ring-1 ring-amber-500/20' : 'bg-white p-12'}`}>
              
               {/* Background Glow */}
               <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-0'}`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] animate-pulse"></div>
               </div>

               {/* Watch Container */}
               <div className="relative z-10 w-full h-full flex items-center justify-center">
                  {/* Base Watch Image */}
                  <img 
                    src={R1} 
                    alt="Lume Watch" 
                    className={`w-full h-full object-contain transition-all duration-1000 pointer-events-none ${isDark ? 'brightness-[0.2] contrast-[1.2]' : 'brightness-100'}`}
                  />
                  
                  {/* LUME OVERLAY - The Magic Part */}
                  <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                      <img 
                        src={R1} 
                        alt="Lume Overlay" 
                        className="w-full h-full object-contain mix-blend-screen invert-[0.3] sepia-[1] saturate-[15] hue-rotate-[120deg] brightness-[2] blur-[1px] drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                      />
                      {/* Subtler Green Glow on Hands/Markers */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-1/2 h-1/2 bg-green-400/20 blur-[60px] rounded-full animate-pulse"></div>
                      </div>
                  </div>
               </div>

               {/* Dark Room HUD */}
               <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Live Simulation</span>
               </div>
            </div>

            {/* Specialist Note */}
            <div className={`mt-10 p-6 rounded-3xl border flex gap-4 transition-all ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="p-3 bg-blue-500/10 rounded-xl h-fit">
                <Info size={18} className="text-blue-500" />
              </div>
              <p className={`text-xs leading-relaxed transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <strong>Expert Tip:</strong> Divers' watches require the highest grade of lume for underwater legibility. We use Bharatiya-grade LumiNova™ which captures light during the day to glow for up to 10 hours.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheLumeMaster;
