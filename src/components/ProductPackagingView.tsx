import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { SafeProductImage } from './SafeProductImage';

interface ProductPackagingViewProps {
  imageSrc: string;
  alt: string;
  badge?: string;
  accentColor?: string;
  className?: string;
  floatAnimation?: boolean;
}

export const ProductPackagingView: React.FC<ProductPackagingViewProps> = ({
  imageSrc,
  alt,
  badge,
  accentColor = '#10b981',
  className = '',
  floatAnimation = true,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 ${className}`}>
      {/* Dynamic Ambient Color Halo */}
      <div
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-30 transition-all duration-500 pointer-events-none -z-10"
        style={{ backgroundColor: accentColor }}
      />

      {/* Floating 3D Packaging Tub Container */}
      <motion.div
        animate={
          floatAnimation
            ? {
                y: [-6, 6, -6],
                rotateZ: [-1, 1, -1],
              }
            : {}
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex items-center justify-center"
      >
        <SafeProductImage
          src={imageSrc}
          alt={alt}
          productName={alt}
          accentColor={accentColor}
          fallbackSrc="/rnd-cre-amp.svg"
          className="max-h-56 w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] filter transition-transform duration-500 hover:scale-105"
        />

        {/* Floating Quality Badge in front */}
        {badge && (
          <motion.div
            animate={{ y: [2, -3, 2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-black/60 pointer-events-none"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{badge}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Dynamic 3D Ground Shadow that scales inversely to float height */}
      <motion.div
        animate={
          floatAnimation
            ? {
                scaleX: [1, 0.85, 1],
                scaleY: [1, 0.75, 1],
                opacity: [0.7, 0.4, 0.7],
              }
            : {}
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-40 h-4 mt-2 rounded-full bg-black/80 blur-md pointer-events-none"
      />
    </div>
  );
};
