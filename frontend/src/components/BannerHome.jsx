import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import video from "../assets/bannervideo.mp4";
import BL1 from '../assets/BL1.png';
import BM1 from '../assets/BM1.png';
import BR1 from '../assets/BR1.png';
import { motion } from "framer-motion";

const BannerHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    },
    hover: { 
      y: -40, 
      scale: 1.15,
      rotateZ: 0,
      transition: { duration: 0.4, ease: "backOut" }
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Background Media - RESTORED & CLEAR */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24"
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 max-w-4xl">
           <span className="inline-block text-[9px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-white uppercase mb-3 sm:mb-4 drop-shadow-md">PRECISION ENGINEERING × MMXXIV</span>
           <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-4 sm:mb-6 drop-shadow-2xl">
             PRECISION <br/> <span className="text-white/40">IN TIME.</span>
           </h1>
           <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-3xl mx-auto leading-relaxed sm:leading-loose drop-shadow-md px-4">
             Crafted for the <span className="text-white font-bold">leaders</span> and <span className="text-white font-bold">creators</span> who make every second count. 
             Pre-See-Jan watches are built to last a lifetime with <span className="text-white font-bold">scratch-resistant glass</span> and <span className="text-white font-bold">water resistance</span>. 
             <br/><span className="block mt-4 text-white/80 italic text-xs tracking-widest uppercase">Not sure what fits you? Let our <span className="text-white font-bold border-b border-white/30">AI Recommendation Engine</span> find your perfect match.</span>
           </p>
        </motion.div>

        {/* Floating Product Cards - RESTORED POP-OUT EFFECT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl pb-20 mt-10">
           {/* Card 1 */}
           <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="relative cursor-pointer flex flex-col items-center group"
           >
              <div className="h-64 flex items-center justify-center z-10 transition-transform duration-500">
                 <img src={BL1} alt="Heritage" className="max-h-full object-contain filter drop-shadow-[0_35px_35px_rgba(255,255,255,0.2)]" />
              </div>
              <div className="mt-6 text-center">
                 <h3 className="text-xl font-black text-white italic tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Heritage</h3>
              </div>
           </motion.div>

           {/* Card 2 - Featured */}
           <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="relative cursor-pointer flex flex-col items-center group z-20"
           >
              <div className="h-80 flex items-center justify-center z-10 transition-transform duration-500">
                 <img src={BM1} alt="Limited" className="max-h-full object-contain filter drop-shadow-[0_45px_45px_rgba(255,255,255,0.3)] scale-110" />
              </div>
              <div className="mt-8 text-center">
                 <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Limited</h3>
              </div>
           </motion.div>

           {/* Card 3 - Symmetrical to Card 1 */}
           <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="relative cursor-pointer flex flex-col items-center group z-20"
           >
              <div className="h-64 flex items-center justify-center z-10 transition-transform duration-500">
                 <img src={BR1} alt="Precision" className="max-h-full object-contain filter drop-shadow-[0_35px_35px_rgba(255,255,255,0.2)]" />
              </div>
              <div className="mt-6 text-center">
                 <h3 className="text-xl font-black text-white italic tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Modern</h3>
              </div>
           </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default BannerHome;
