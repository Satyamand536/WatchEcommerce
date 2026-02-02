import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"; // Clean localized fallback

const WatchImage = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If source is missing or invalid, immediately show fallback state logic
  const imageSource = error || !src ? FALLBACK_IMAGE : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[var(--bg-secondary)] animate-pulse" />
      )}
      
      <img
        src={imageSource}
        alt={alt || "Luxury Timepiece"}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
             setError(true);
             setLoaded(true); // Show fallback immediately
          }
        }}
        loading="lazy"
        {...props}
      />
      
      {/* Error Badge - Optional: only show if specifically desired, otherwise silence is golden */}
      {error && (
        <div className="absolute top-2 right-2 bg-black/10 backdrop-blur-sm p-1 rounded-full hidden">
           <ImageOff size={10} className="text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default WatchImage;
