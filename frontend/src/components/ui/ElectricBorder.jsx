import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ElectricBorder = ({
  children,
  className = '',
  borderWidth = 2,
  glowColor = '#00ff88',
  animationDuration = 3,
  cornerRadius = 12,
  animated = true
}) => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!animated || !pathRef.current) return;
    
    const path = pathRef.current;
    const length = path.getTotalLength();
    
    // Set up the path for animation
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    
    // Trigger animation
    const animate = () => {
      path.style.transition = 'none';
      path.style.strokeDashoffset = length;
      
      setTimeout(() => {
        path.style.transition = `stroke-dashoffset ${animationDuration}s linear`;
        path.style.strokeDashoffset = '0';
      }, 10);
    };
    
    animate();
    
    if (animated) {
      const interval = setInterval(animate, animationDuration * 1000 + 500);
      return () => clearInterval(interval);
    }
  }, [animated, animationDuration]);

  return (
    <div className={`relative ${className}`} style={{ borderRadius: `${cornerRadius}px` }}>
      {/* SVG Electric Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ borderRadius: `${cornerRadius}px`, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: glowColor, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#fff', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: glowColor, stopOpacity: 1 }} />
          </linearGradient>
          
          <filter id="electricGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect
          ref={pathRef}
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="none"
          stroke="url(#electricGradient)"
          strokeWidth={borderWidth}
          filter="url(#electricGlow)"
          style={{
            vectorEffect: 'non-scaling-stroke'
          }}
        />
      </svg>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
