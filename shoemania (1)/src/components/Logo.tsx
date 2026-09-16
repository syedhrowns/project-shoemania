import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "w-5 h-5", size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Modern Architectural Geometric 'S-M' Kinetic Sneaker Emblem */}
      {/* Top Forward Dynamic Wing - Clean Sharp Monogram Upper */}
      <path 
        d="M6.5 10.5C6.5 8.5 8.2 7 10.5 7H23C24.8 7 25.8 8.8 24.8 10.2L19.8 16H11C8.5 16 6.5 13.5 6.5 10.5Z" 
        fill="currentColor"
      />
      {/* Bottom Kinetic Propulsion Sole - Geometric Wave */}
      <path 
        d="M25.5 21.5C25.5 23.5 23.8 25 21.5 25H9C7.2 25 6.2 23.2 7.2 21.8L12.2 16H21C23.5 16 25.5 18.5 25.5 21.5Z" 
        fill="currentColor"
      />
      {/* Precision Apex Center Slash (Speed Accent) */}
      <path 
        d="M13.5 13.5L18.5 18.5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  showText = true, 
  size = 'md',
  className = ''
}) => {
  const iconSizes = {
    sm: { container: 'w-7 h-7', icon: 'w-4 h-4' },
    md: { container: 'w-8 h-8', icon: 'w-4.5 h-4.5' },
    lg: { container: 'w-10 h-10', icon: 'w-5.5 h-5.5' },
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${iconSizes[size].container} bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-sm border border-zinc-700/60 shrink-0`}>
        <LogoIcon className={iconSizes[size].icon} />
      </div>
      {showText && (
        <span className={`font-display font-black tracking-widest text-zinc-900 ${textSizes[size]} whitespace-nowrap`}>
          SHOEMANIA
        </span>
      )}
    </div>
  );
};
