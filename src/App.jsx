import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ResultsPage from './pages/ResultsPage'
import TechBackground from './components/TechBackground'

function App() {
  const [language, setLanguage] = useState('en')
  const location = useLocation()

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-white selection:bg-neon-blue selection:text-dark-900 overflow-x-hidden relative">
      <TechBackground />
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<LandingPage language={language} />} />
            <Route path="/dashboard" element={<DashboardPage language={language} />} />
            <Route path="/results" element={<ResultsPage language={language} />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
