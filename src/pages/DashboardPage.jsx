import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const i18n = {
  en: {
    title: "Upload Document for Analysis",
    subtitle: "Supports PDFs and Images. Highly secure and private.",
    dragDrop: "Drag & Drop your file here",
    orBrowse: "or click to browse",
    analyzeBtn: "Analyze Document",
    analyzing: "Scanning Document..."
  },
  hi: {
    title: "विश्लेषण के लिए दस्तावेज़ अपलोड करें",
    subtitle: "PDF और छवियों का समर्थन करता है। अत्यधिक सुरक्षित और निजी।",
    dragDrop: "अपनी फ़ाइल यहाँ खींचें और छोड़ें",
    orBrowse: "या ब्राउज़ करने के लिए क्लिक करें",
    analyzeBtn: "दस्तावेज़ का विश्लेषण करें",
    analyzing: "दस्तावेज़ स्कैन हो रहा है..."
  }
};

const DashboardPage = ({ language }) => {
  const t = i18n[language];
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Connect to the Python FastAPI backend
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error("API Request Failed");

      const data = await response.json();
      const fileUrl = URL.createObjectURL(file);
      
      navigate('/results', { state: { resultData: data, fileUrl } });

    } catch (error) {
      console.error("Error analyzing document:", error);
      setIsAnalyzing(false);
      alert("Failed to connect to the backend engine. Ensure the Python server is running.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex-1 flex flex-col items-center pt-20 px-6 w-full max-w-4xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-gray-400">{t.subtitle}</p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`w-full glass-panel border-2 border-dashed ${file ? 'border-neon-blue bg-neon-blue/5' : 'border-white/20 hover:border-white/50'} p-12 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden min-h-[400px]`}
        onClick={() => !isAnalyzing && document.getElementById('fileUpload').click()}
      >
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-900 z-30 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Animated Background Grid - Faded properly */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F0FF08_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

              {/* Central Scanner UI */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-10 mt-6 pointer-events-none">
                
                {/* Outer Rotating Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-neon-blue/20 border-t-neon-blue/80 border-b-neon-blue/80"
                />
                
                {/* Middle Counter-Rotating Ring */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-neon-purple/20 border-l-neon-purple/80 border-r-neon-purple/80 shadow-[0_0_15px_rgba(176,38,255,0.3)]"
                />

                {/* Inner Static Glow Core */}
                <div className="absolute inset-10 rounded-full bg-neon-blue/10 blur-xl" />

                {/* Masked Laser Container */}
                <div className="absolute inset-8 rounded-full overflow-hidden flex items-center justify-center bg-dark-800/50 border border-white/5 backdrop-blur-sm">
                  <File size={48} className="text-neon-blue mb-2 shadow-neon-blue/50" />
                  
                  {/* Laser Scanning Line restricted to circle */}
                  <motion.div 
                    animate={{ top: ["-10%", "110%", "-10%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_4px_#00F0FF]"
                  />
                  {/* Laser wash gradient */}
                  <motion.div 
                    animate={{ top: ["-10%", "110%", "-10%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent to-neon-blue/30 -translate-y-full"
                  />
                </div>
              </div>

              {/* Scanning Text Group */}
              <div className="flex flex-col items-center relative z-10 space-y-4">
                <motion.h3 
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple tracking-[0.2em] uppercase"
                >
                  {t.analyzing}
                </motion.h3>
                
                <div className="flex gap-3 text-xs md:text-sm text-neon-blue/70 font-mono tracking-widest bg-dark-800/80 px-4 py-1.5 rounded-full border border-neon-blue/20">
                  <span className="text-neon-purple">[</span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}>PIXEL_EXTRACT</motion.span>
                  <span className="text-white/30">|</span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}>NEURAL_MAP</motion.span>
                  <span className="text-neon-purple">]</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-64 md:w-80 h-1.5 bg-dark-800 rounded-full mt-10 overflow-hidden relative z-10 border border-white/5">
                 <motion.div 
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 3.5, ease: "circOut" }}
                   className="h-full rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite]"
                 >
                   <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent opacity-50 blur-[2px]" />
                 </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input type="file" id="fileUpload" className="hidden" onChange={(e) => setFile(e.target.files[0])}/>
        
        {/* Only show upload contents if not analyzing */}
        {!isAnalyzing && (
          <>
            {!file ? (
              <>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50 border border-white/5 group-hover:border-neon-blue/30 transition-colors"
                >
                  <UploadCloud size={48} className="text-neon-purple drop-shadow-[0_0_10px_rgba(176,38,255,0.4)]" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{t.dragDrop}</h3>
                <p className="text-gray-400">{t.orBrowse}</p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                 <div className="relative">
                   <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full" />
                   <File size={72} className="text-neon-blue mb-6 relative z-10" />
                 </div>
                 <p className="text-2xl font-semibold">{file.name}</p>
                 <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-neon-green/10 border border-neon-green/30 rounded-full">
                   <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_5px_#00FF9D]" /> 
                   <span className="text-sm text-neon-green font-medium">Ready for inspection</span>
                 </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: file ? 1 : 0, y: file ? 0 : 20 }}
        className="mt-12 group w-full max-w-xs"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
          disabled={isAnalyzing || !file}
          className="w-full relative px-8 py-4 bg-neon-purple/90 border border-neon-purple text-white font-bold rounded-xl overflow-hidden disabled:opacity-50 transition-transform active:scale-95 shadow-[0_0_15px_rgba(176,38,255,0.4)] hover:shadow-[0_0_25px_rgba(176,38,255,0.6)]"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
          <span className="relative z-10">{t.analyzeBtn}</span>
        </button>
      </motion.div>

    </motion.div>
  );
};

export default DashboardPage;
