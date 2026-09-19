import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const FloatingBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-neutral-950">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_70%,rgba(6,182,212,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_90%,rgba(245,158,11,0.06),rgba(255,255,255,0))]" />

      {/* Modern 3D Floating Orbs that react to mouse position */}
      <motion.div
        animate={{
          x: mousePos.x * 25,
          y: mousePos.y * 25,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: mousePos.x * -35,
          y: mousePos.y * -35,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
        className="absolute top-2/3 right-10 w-[480px] h-[480px] rounded-full bg-cyan-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: mousePos.x * 15,
          y: mousePos.y * 15,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 70 }}
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-amber-500/05 blur-2xl"
      />

      {/* Geometric 3D Floating Grid Lines with faint depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%)',
        }}
      />
    </div>
  );
};
