import React, { useState } from 'react';
import { Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Brand } from '../data';

interface ProductImageProps {
  src: string;
  alt: string;
  brand: Brand | string;
  className?: string;
  hueRotate?: number;
}

const brandColors: Record<string, string> = {
  'Nike': 'from-orange-500 to-red-600',
  'Adidas': 'from-blue-600 to-indigo-800',
  'New Balance': 'from-slate-500 to-slate-700',
  'ASICS': 'from-sky-400 to-blue-600',
  'Puma': 'from-zinc-800 to-black',
  'default': 'from-zinc-400 to-zinc-600'
};

export function ProductImage({ src, alt, brand, className = '', hueRotate = 0 }: ProductImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Fallback to brand-themed placeholder if image fails to load
  if (imgError) {
    const gradient = brandColors[brand] || brandColors.default;
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${gradient} ${className} overflow-hidden shadow-inner`}>
        {/* Abstract Mesh/Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px]" />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative z-10 flex flex-col items-center p-6 text-center transform transition-transform hover:scale-105 duration-500">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-xl">
            <ImageIcon className="w-8 h-8 text-white/80" />
          </div>
          <span className="text-white font-display font-bold uppercase tracking-wider text-lg leading-tight drop-shadow-md mb-2">
            {alt}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white/90 font-sans text-xs uppercase tracking-widest shadow-sm">
            {brand}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} bg-zinc-100 overflow-hidden`}>
      {!imgLoaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-200" />
      )}
      <img
        src={src}
        alt={alt}
        style={{ filter: hueRotate ? `hue-rotate(${hueRotate}deg)` : 'none' }}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          setImgError(true);
        }}
      />
    </div>
  );
}
