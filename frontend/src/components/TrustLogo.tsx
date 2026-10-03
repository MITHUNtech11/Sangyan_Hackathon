import React from 'react';

interface TrustLogoProps {
  className?: string;
}

export const TrustLogo: React.FC<TrustLogoProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="trustShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="trustAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="trustGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0284c7" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Rounded Container with subtle border */}
        <rect width="48" height="48" rx="13" fill="url(#trustShieldGradient)" />
        <rect x="1" y="1" width="46" height="46" rx="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" />

        {/* Heraldic Security Shield Contour */}
        <path
          d="M24 9.5L12.5 14.5V23.5C12.5 30.6 17.4 37.2 24 39C30.6 37.2 35.5 30.6 35.5 23.5V14.5L24 9.5Z"
          fill="white"
          fillOpacity="0.14"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Inner Verification Checkmark */}
        <path
          d="M19 24.2L22.5 27.7L29.5 20.2"
          stroke="url(#trustAccentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trustGlow)"
        />

        {/* Top Integrity Beacon Star */}
        <circle cx="24" cy="15" r="1.6" fill="#38bdf8" />
      </svg>
    </div>
  );
};
