import React from 'react';
import { motion } from 'framer-motion';

const DocumentScanner = () => {
  return (
    <div className="relative w-[350px] h-[480px] rounded-xl border border-white/20 bg-dark-800/50 backdrop-blur-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:skew-y-3 md:-rotate-3 transform-gpu">
      
      {/* Document Content Mock */}
      <div className="absolute inset-4 p-4 border border-white/10 flex flex-col gap-4 opacity-40">
        <div className="w-1/2 h-8 bg-white/20 rounded mx-auto mb-4" />
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-white/10 rounded-full shrink-0" />
          <div className="flex-1 flex flex-col gap-2 justify-center">
             <div className="w-full h-3 bg-white/20 rounded" />
             <div className="w-4/5 h-3 bg-white/20 rounded" />
             <div className="w-3/4 h-3 bg-white/20 rounded" />
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded mt-4" />
        <div className="w-full h-2 bg-white/10 rounded" />
        <div className="w-2/3 h-2 bg-white/10 rounded" />
        <div className="flex justify-between mt-auto">
          <div className="w-20 h-8 bg-white/20 rounded" />
          <div className="w-32 h-10 bg-white/20 rounded" />
        </div>
      </div>

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute left-0 w-full h-[2px] bg-neon-blue shadow-[0_0_15px_3px_#00F0FF] z-10"
      />

      {/* Glowing region under scanner */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent to-neon-blue/20 -translate-y-full z-0 pointer-events-none mix-blend-screen"
      />
      
      {/* Suspicious Red Heatmap blips appearing randomly */}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-16 right-8 w-20 h-10 bg-neon-red/40 rounded-full blur-xl mix-blend-screen pointer-events-none"
      />

       <motion.div 
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-1/3 left-1/4 w-12 h-12 bg-neon-purple/40 rounded-full blur-xl mix-blend-screen pointer-events-none"
      />
    </div>
  );
};

export default DocumentScanner;
