import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Floating3DCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // degree intensity, default 12
  glare?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Floating3DCard: React.FC<Floating3DCardProps> = ({
  children,
  className = '',
  depth = 10,
  glare = true,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized offset from center [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`perspective-1000 select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full h-full rounded-2xl bg-neutral-900/90 border border-neutral-800/80 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_20px_2px_rgba(16,185,129,0.15)] hover:border-neutral-700/80 transition-shadow duration-500 overflow-hidden backdrop-blur-md"
      >
        {/* Specular glare overlay */}
        {glare && isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 mix-blend-overlay z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 70%)`,
            }}
          />
        )}

        {/* Content with 3D Z-index lifting */}
        <div className="relative z-10 h-full w-full" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
