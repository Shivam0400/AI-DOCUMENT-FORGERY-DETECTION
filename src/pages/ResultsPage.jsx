import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, FileWarning, Search, SplitSquareHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage = ({ language }) => {
  const { state } = useLocation();
  const [activeReason, setActiveReason] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  // Fallback to empty if accessed directly without uploading
  const resultData = state?.resultData || {
    status: 'UNKNOWN',
    confidence: 0,
    reasons: []
  };
  const fileUrl = state?.fileUrl || '/sample.png';

  const { status, confidence, reasons } = resultData;
  const isForged = status === 'FORGED';
  
  // Statically map Tailwind classes to avoid purge issues
  const themeStyles = {
    text: isForged ? 'text-neon-red' : 'text-neon-green',
    border: isForged ? 'border-neon-red' : 'border-neon-green',
    bgLight: isForged ? 'bg-neon-red/10' : 'bg-neon-green/10',
    borderLight: isForged ? 'border-neon-red/30' : 'border-neon-green/30',
    borderL: isForged ? 'border-l-neon-red' : 'border-l-neon-green',
    shadow: isForged ? 'drop-shadow-[0_0_10px_rgba(255,58,58,0.5)]' : 'drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]',
    boxShadowHover: isForged ? 'shadow-[0_0_15px_rgba(255,58,58,0.3)]' : 'shadow-[0_0_15px_rgba(0,255,157,0.3)]',
    boxHex: isForged ? '#FF3A3A' : '#00FF9D',
    gradient: isForged ? 'from-red-600 to-neon-red' : 'from-green-600 to-neon-green',
    textMuted: isForged ? 'text-red-400' : 'text-green-400'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 md:p-8 gap-8 overflow-hidden h-[calc(100vh-100px)]"
    >
      
      {/* LEFT PANEL: Document View */}
      <div className="w-full md:w-3/5 h-full flex flex-col gap-4">
        <div className="flex justify-between items-center glass-panel p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Search className="text-neon-blue" />
            Inspection View
          </h2>
          <button 
            onClick={() => setCompareMode(!compareMode)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${compareMode ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'border-white/20 hover:border-white/50 text-gray-300'}`}
          >
            <SplitSquareHorizontal size={18} />
            {compareMode ? 'Comparison Active' : 'Original vs Tampered'}
          </button>
        </div>

        <div className="flex-1 glass-panel relative overflow-hidden flex items-center justify-center p-8 bg-dark-900/50">
          <div className="relative w-full max-w-lg aspect-[3/4] bg-white rounded shadow-lg shadow-black/50 overflow-hidden">
             {/* Document Image Placeholder / Actual Image */}
             <div 
               className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-90" 
               style={{ backgroundImage: `url('${fileUrl}')` }}
             />
             
             {compareMode && (
               <motion.div 
                 initial={{ width: '100%' }}
                 animate={{ width: '50%' }}
                 className="absolute inset-y-0 right-0 bg-black/80 flex items-center justify-center border-l-2 border-neon-blue overflow-hidden"
               >
                 <div className="text-white/50 -rotate-90 whitespace-nowrap text-2xl font-bold tracking-widest absolute">ORIGINAL RECONSTRUCTED</div>
               </motion.div>
             )}

             {/* Heatmap/Bounding Boxes Overlay */}
             {!compareMode && reasons.map((reason) => (
                reason.region && (
                  <motion.div
                    key={`box-${reason.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: activeReason === reason.id ? 1 : (activeReason === null ? 0.6 : 0.2),
                      scale: 1,
                      borderColor: activeReason === reason.id ? themeStyles.boxHex : '#B026FF',
                      boxShadow: activeReason === reason.id ? `0 0 15px rgba(255,58,58,0.8), inset 0 0 15px rgba(255,58,58,0.3)` : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute border-2 rounded-sm ${isForged ? 'bg-red-500/20' : 'bg-green-500/20'} mix-blend-multiply`}
                    style={{
                      top: reason.region.top,
                      left: reason.region.left,
                      width: reason.region.width,
                      height: reason.region.height,
                      zIndex: activeReason === reason.id ? 10 : 5
                    }}
                  />
                )
             ))}

             {/* Scanning Line overlay for effect when entering */}
             <motion.div 
                animate={{ top: ['0%', '100%'], opacity: [0.5, 0] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute left-0 w-full h-[2px] bg-neon-blue shadow-[0_0_15px_3px_#00F0FF] z-20 pointer-events-none"
             />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Explainability */}
      <div className="w-full md:w-2/5 h-full flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10 md:pb-0">
        
        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-panel p-6 ${themeStyles.borderLight} relative overflow-hidden`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${themeStyles.bgLight} rounded-full blur-3xl -translate-y-1/2 translate-x-1/4`} />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Analysis Result</p>
              <h2 className={`text-3xl font-black ${themeStyles.text} ${themeStyles.shadow}`}>{status}</h2>
            </div>
            {isForged ? <FileWarning size={48} className="text-neon-red" /> : <CheckCircle size={48} className="text-neon-green" />}
          </div>

          <div className="mt-6 relative z-10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Confidence Score</span>
              <span className={`font-bold ${themeStyles.textMuted}`}>{confidence}%</span>
            </div>
            <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${confidence}%` }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                 className={`h-full bg-gradient-to-r ${themeStyles.gradient} relative`}
               >
                 <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse mix-blend-overlay" />
               </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Reasons List */}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
            AI Explanations
          </h3>
          
          {reasons.length === 0 && (
             <p className="text-gray-500 italic">No explanation data provided.</p>
          )}

          {reasons.map((reason, idx) => (
             <motion.div 
               key={reason.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 + (idx * 0.1) }}
               onClick={() => setActiveReason(activeReason === reason.id ? null : reason.id)}
               className={`glass-panel p-5 cursor-pointer transition-all duration-300 border-l-4 ${
                 activeReason === reason.id 
                 ? `bg-dark-800/80 ${themeStyles.borderL} ${themeStyles.boxShadowHover} scale-[1.02]` 
                 : 'border-l-transparent hover:border-l-neon-purple hover:bg-dark-800/40'
               }`}
             >
               <div className="flex items-center gap-3 mb-2">
                 {reason.region ? <AlertTriangle size={18} className={activeReason === reason.id ? themeStyles.text : 'text-neon-purple'} /> : <Search size={18} className="text-neon-blue" />}
                 <h4 className={`font-semibold ${activeReason === reason.id ? 'text-white' : 'text-gray-300'}`}>
                   {reason.title}
                 </h4>
               </div>
               <AnimatePresence>
                 {(activeReason === reason.id || activeReason === null) && (
                   <motion.p 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="text-sm text-gray-400 leading-relaxed ml-7 mt-2"
                   >
                     {reason.desc}
                   </motion.p>
                 )}
               </AnimatePresence>
             </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="mt-6 border-t border-white/10 pt-6"
        >
          <Link to="/dashboard" className="w-full text-sm font-medium text-neon-blue hover:text-white flex items-center justify-center gap-2 py-3 border border-neon-blue/30 rounded-lg hover:bg-neon-blue/20 hover:border-neon-blue transition-all">
            Analyze Another Document
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ResultsPage;
