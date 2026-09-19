import React, { useState, useEffect } from 'react';
import { assetUrl } from '../utils/assetUrl';

interface SafeProductImageProps {
  src: string;
  alt: string;
  className?: string;
  productName?: string;
  category?: string;
  accentColor?: string;
  fallbackSrc?: string;
}

export const SafeProductImage: React.FC<SafeProductImageProps> = ({
  src,
  alt,
  className = '',
  productName = 'RND Nutrition Supplement',
  category = 'Protein',
  accentColor = '#eab308',
  fallbackSrc,
}) => {
  // 0: primary src, 1: secondary fallback URL, 2: tertiary inline SVG render
  const [errorLevel, setErrorLevel] = useState<number>(0);
  const [attemptedUrls, setAttemptedUrls] = useState<string[]>([]);

  // Reset error state if the requested source changes
  useEffect(() => {
    setErrorLevel(0);
    setAttemptedUrls([]);
  }, [src]);

  const primaryUrl = assetUrl(src);
  const backupUrl = fallbackSrc ? assetUrl(fallbackSrc) : assetUrl('/rnd-whey-isolate.svg');
  const tertiaryUrl = assetUrl('/rnd-cre-amp.svg');

  const handleError = () => {
    if (errorLevel === 0) {
      // First failure: try alternative reliable SVG asset
      setErrorLevel(1);
    } else if (errorLevel === 1) {
      // Second failure: try tertiary reliable SVG
      setErrorLevel(2);
    } else {
      // Third failure: render vector SVG directly to completely eliminate broken image icon
      setErrorLevel(3);
    }
  };

  // If level 3, render full vector SVG DOM directly (no network request, cannot fail)
  if (errorLevel >= 3) {
    const cleanTitle = (productName || alt || 'RND SUPPLEMENT').toUpperCase();
    const cleanCategory = (category || 'CLINICAL NUTRITION').toUpperCase();

    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 400 480"
          className="w-full h-full max-h-72 object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`safeTubGrad_${accentColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0c10" />
              <stop offset="15%" stopColor="#1e2430" />
              <stop offset="35%" stopColor="#374151" />
              <stop offset="50%" stopColor="#4b5563" />
              <stop offset="65%" stopColor="#2a3240" />
              <stop offset="85%" stopColor="#141820" />
              <stop offset="100%" stopColor="#080a0e" />
            </linearGradient>

            <linearGradient id={`safeGoldLid_${accentColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="75%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* Tub Shadow */}
          <ellipse cx="200" cy="455" rx="140" ry="18" fill="#000000" opacity="0.6" />

          {/* Main Body */}
          <rect
            x="85"
            y="110"
            width="230"
            height="330"
            rx="28"
            fill={`url(#safeTubGrad_${accentColor.replace('#', '')})`}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Screw Lid */}
          <rect
            x="115"
            y="65"
            width="170"
            height="52"
            rx="10"
            fill={`url(#safeGoldLid_${accentColor.replace('#', '')})`}
            stroke="#1f2937"
            strokeWidth="2"
          />
          {/* Lid Ribs */}
          {[130, 150, 170, 190, 210, 230, 250, 270].map((rx, idx) => (
            <line key={idx} x1={rx} y1="70" x2={rx} y2="112" stroke="#451a03" strokeWidth="2" opacity="0.5" />
          ))}

          {/* Shiny Label Center */}
          <rect x="95" y="160" width="210" height="230" rx="12" fill="#090a0f" stroke="#1f2937" strokeWidth="1.5" />

          {/* Accent Header Bar */}
          <rect x="95" y="160" width="210" height="34" rx="12" fill={accentColor} opacity="0.9" />
          <text x="200" y="182" fill="#090a0f" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle" letterSpacing="1">
            RND TITANIUM CLINICAL
          </text>

          {/* Category Pill */}
          <rect x="130" y="206" width="140" height="18" rx="9" fill="#1f2937" />
          <text x="200" y="219" fill="#e5e7eb" fontFamily="sans-serif" fontWeight="800" fontSize="8.5" textAnchor="middle" letterSpacing="0.5">
            {cleanCategory}
          </text>

          {/* Product Title on Label */}
          <text x="200" y="255" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="13" textAnchor="middle">
            {cleanTitle.length > 22 ? cleanTitle.substring(0, 20) + '...' : cleanTitle}
          </text>
          <text x="200" y="275" fill="#fbbf24" fontFamily="sans-serif" fontWeight="800" fontSize="9" textAnchor="middle" letterSpacing="0.5">
            100% CLINICAL DOSAGES
          </text>

          {/* Trustified & 50% Higher Absorption Badge */}
          <circle cx="200" cy="325" r="28" fill="#18181b" stroke={accentColor} strokeWidth="2" />
          <text x="200" y="322" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle">
            50%
          </text>
          <text x="200" y="335" fill="#fbbf24" fontFamily="sans-serif" fontWeight="800" fontSize="6.5" textAnchor="middle">
            ABSORPTION
          </text>

          {/* Veg Dot */}
          <rect x="270" y="355" width="18" height="18" rx="3" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
          <circle cx="279" cy="364" r="4" fill="#16a34a" />

          {/* Net Weight */}
          <text x="115" y="372" fill="#9ca3af" fontFamily="sans-serif" fontWeight="700" fontSize="8.5">
            100% Lab Tested
          </text>

          {/* Specular Gloss Line */}
          <path d="M 140 120 L 155 120 L 150 430 L 135 430 Z" fill="#ffffff" opacity="0.08" />
        </svg>
      </div>
    );
  }

  let currentSrcToUse = primaryUrl;
  if (errorLevel === 1) {
    currentSrcToUse = backupUrl;
  } else if (errorLevel === 2) {
    currentSrcToUse = tertiaryUrl;
  }

  return (
    <img
      src={currentSrcToUse}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
};
