import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TechBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      bgRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
      bgRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={bgRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#06060A]"
      style={{
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
      }}
    >
      {/* 1. Underlying Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#130E24] to-[#06060A] opacity-70" />

      {/* 2. Pleasant Live Animations: Ambient Slow-Floating Stardust */}
      {/* Extremely subtle, beautiful drifting motes of light */}
      {[...Array(30)].map((_, i) => (
        <motion.div
           key={`star-${i}`}
           className="absolute rounded-full bg-white"
           style={{
             width: Math.random() * 2 + 1 + 'px',
             height: Math.random() * 2 + 1 + 'px',
             left: Math.random() * 100 + '%',
             top: Math.random() * 100 + '%',
             opacity: Math.random() * 0.3 + 0.1,
             boxShadow: '0 0 8px rgba(255,255,255,0.8)'
           }}
           animate={{
             y: [0, -(Math.random() * 150 + 50)],
             opacity: [0, 0.7, 0],
             scale: [0.8, 1.5, 0.8]
           }}
           transition={{
             duration: Math.random() * 10 + 15,
             repeat: Infinity,
             ease: "linear",
             delay: Math.random() * 10
           }}
        />
      ))}

      {/* 3. Pleasant Live Animations: Breathing Geometric Rings */}
      {/* These barely move and give a very high-end, calm technical vibe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div 
          className="absolute w-[60vh] h-[60vh] rounded-full border border-neon-blue/[0.04]"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 90] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[80vh] h-[80vh] rounded-full border border-neon-purple/[0.03]"
          animate={{ scale: [1, 1.02, 1], rotate: [0, -90] }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 4. Interactive Masked Grid mapping to mouse */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(rgba(0,240,255,0.25)_1px,transparent_1px)] bg-[size:30px_30px]"
        style={{
          WebkitMaskImage: `radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y), 
            black, 
            transparent 100%
          )`,
          maskImage: `radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y), 
            black, 
            transparent 100%
          )`
        }}
      />

      {/* 5. Mouse Flashlight Auras */}
      <div 
        className="absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y), 
            rgba(0, 240, 255, 0.08),
            transparent 50%
          )`
        }}
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(
            200px circle at var(--mouse-x) var(--mouse-y), 
            rgba(176, 38, 255, 0.12),
            transparent 50%
          )`
        }}
      />
      
      {/* 6. Live Breathing Ambient corner glows */}
      {/* Pulsing softly to give the application a "breathing" living feel */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-neon-purple/15 rounded-full blur-[130px] mix-blend-screen" 
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon-blue/15 rounded-full blur-[130px] mix-blend-screen" 
      />
    </div>
  );
};

export default TechBackground;
