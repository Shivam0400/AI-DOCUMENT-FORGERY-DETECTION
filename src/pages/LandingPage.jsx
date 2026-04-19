import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileScan, ShieldAlert, Zap } from 'lucide-react';
import DocumentScanner from '../components/DocumentScanner';

const i18n = {
  en: {
    heroTitle1: "Detect.",
    heroTitle2: "Explain.",
    heroTitle3: "Trust.",
    subtitle: "Advanced Explainable AI for Document Forgery Detection. Uncover tampering with precision heatmap overlays and transparent reasoning.",
    cta: "Upload Document",
    feature1Title: "Explainable AI",
    feature1Desc: "Understand exactly why a document was flagged with detailed step-by-step reasoning.",
    feature2Title: "Heatmap Detection",
    feature2Desc: "Visualizes the precise regions of pixel manipulation and font inconsistencies.",
    feature3Title: "Real-time Processing",
    feature3Desc: "Get results instantly, powered by high-speed neural networks."
  },
  hi: {
    heroTitle1: "पहचानें।",
    heroTitle2: "समझें।",
    heroTitle3: "भरोसा करें।",
    subtitle: "दस्तावेज़ जालसाजी का पता लगाने के लिए उन्नत AI। सटीक हीटमैप और स्पष्ट कारणों के साथ छेड़छाड़ को उजागर करें।",
    cta: "दस्तावेज़ अपलोड करें",
    feature1Title: "समझाने योग्य AI",
    feature1Desc: "समझें कि दस्तावेज़ को क्यों फ़्लैग किया गया है, विस्तृत चरण-दर-चरण तर्क के साथ।",
    feature2Title: "हीटमैप डिटेक्शन",
    feature2Desc: "पिक्सेल हेरफेर और फ़ॉन्ट विसंगतियों के सटीक क्षेत्रों की कल्पना करता है।",
    feature3Title: "रीयल-टाइम प्रोसेसिंग",
    feature3Desc: "हाई-स्पीड न्यूरल नेटवर्क द्वारा संचालित, तुरंत परिणाम प्राप्त करें।"
  }
};

const LandingPage = ({ language }) => {
  const t = i18n[language];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center pt-10 md:pt-20 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full w-max">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-xs text-neon-blue font-medium uppercase tracking-wider">System Online</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            <span className="block text-white mb-2">{t.heroTitle1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 mb-2">{t.heroTitle2}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-300">{t.heroTitle3}</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl">
            {t.subtitle}
          </p>

          <Link to="/dashboard" className="w-max">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-4 bg-neon-blue text-dark-900 font-bold rounded-lg overflow-hidden relative group w-max"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {t.cta}
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] w-full flex justify-center items-center perspective-1000"
        >
          <DocumentScanner />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 md:mt-32 w-full">
        <FeatureCard 
          icon={<ShieldAlert className="text-neon-purple mb-4" size={32} />} 
          title={t.feature1Title} 
          desc={t.feature1Desc} 
          delay={0.4} 
        />
        <FeatureCard 
          icon={<FileScan className="text-neon-blue mb-4" size={32} />} 
          title={t.feature2Title} 
          desc={t.feature2Desc} 
          delay={0.5} 
        />
        <FeatureCard 
          icon={<Zap className="text-neon-green mb-4" size={32} />} 
          title={t.feature3Title} 
          desc={t.feature3Desc} 
          delay={0.6} 
        />
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="glass-panel p-8 hover:border-neon-blue/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all group"
  >
    <div className="transform group-hover:scale-110 transition-transform duration-300 origin-left">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

export default LandingPage;
