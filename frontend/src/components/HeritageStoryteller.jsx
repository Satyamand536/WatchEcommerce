import React from 'react';
import { History, Anchor, Compass, Rocket, Award } from 'lucide-react';

const timelineData = [
  {
    year: "1735",
    title: "The Dawn of Horology",
    description: "The first watchmaking workshops emerge in the heart of Bharat. Craftsmanship was a family legacy, passed down through generations of silent precision.",
    icon: <History className="w-6 h-6" />,
    milestone: "Founding of the Oldest Brands"
  },
  {
    year: "1904",
    title: "Conquering the Skies",
    description: "The first practical pilot's watch is born, allowing aviators to keep their hands on the controls while tracking time. Luxury meets utility in the stratosphere.",
    icon: <Compass className="w-6 h-6" />,
    milestone: "Birth of the Pilot's Watch"
  },
  {
    year: "1953",
    title: "Into the Abyss",
    description: "Watches descend to the deepest parts of the ocean. Water-resistance becomes an art form, protecting mechanical heartbeats from crushing pressures.",
    icon: <Anchor className="w-6 h-6" />,
    milestone: "The Professional Diver Era"
  },
  {
    year: "1969",
    title: "One Giant Leap",
    description: "ChronoElite watches (inspired by legacy) land on the lunar surface. Zero gravity, vacuum, and extreme temperatures couldn't stop the mechanical tick.",
    icon: <Rocket className="w-6 h-6" />,
    milestone: "The First Watch on the Moon"
  },
  {
    year: "Today",
    title: "A Timeless Future",
    description: "Modern innovations meet classical aesthetics. Every ChronoElite piece is a bridge between three centuries of heritage and the avant-garde of tomorrow.",
    icon: <Award className="w-6 h-6" />,
    milestone: "The Pinnacle of Craft"
  }
];

const HeritageStoryteller = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 text-gray-500 mb-4">
             <div className="w-12 h-px bg-gray-300"></div>
             <span className="text-xs font-black uppercase tracking-[0.4em]">The Heritage Storyteller</span>
             <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">Three Centuries <br /> of Precision</h2>
        </div>

        {/* Timeline Desktop */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden lg:block"></div>

          <div className="space-y-32">
            {timelineData.map((item, index) => (
              <div 
                key={item.year}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 relative ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text Side */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`space-y-4 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                     <div className="text-6xl font-serif font-black text-gray-200">{item.year}</div>
                     <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-sm max-w-md mx-auto lg:mx-0 inline-block">
                       {item.description}
                     </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-lg z-10 hidden lg:flex">
                   {item.icon}
                </div>

                {/* Image/Milestone Side */}
                <div className="lg:w-1/2">
                   <div className={`p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-center min-h-[160px] ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12 text-right'}`}>
                      <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Milestone</div>
                      <div className="text-xl font-serif italic font-bold text-black max-w-xs mx-auto lg:mx-0 inline-block">
                        "{item.milestone}"
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-40 text-center">
             <div className="inline-block p-12 bg-black text-white rounded-[60px] relative max-w-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50"></div>
                <div className="relative z-10">
                   <h4 className="text-3xl font-serif font-bold mb-6 italic">"Be part of the legacy."</h4>
                   <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                     Every ChronoElite timepiece carries the accumulated wisdom of three centuries. When you wear one, you don't just wear a watch—you carry history.
                   </p>
                   <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                     Explore History
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeritageStoryteller;
