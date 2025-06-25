import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { LearnSection } from './components/LearnSection';
import { BuildSection } from './components/BuildSection';
import { SimulateSection } from './components/SimulateSection';
import { OptimizeSection } from './components/OptimizeSection';
import { PlaylistSection } from './components/PlaylistSection';
import { ProfileSection } from './components/ProfileSection';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';

export type Section = 'learn' | 'build' | 'simulate' | 'optimize' | 'playlist' | 'profile';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('learn');
  const [isDark, setIsDark] = useDarkMode();

  const renderSection = () => {
    switch (activeSection) {
      case 'learn':
        return <LearnSection />;
      case 'build':
        return <BuildSection />;
      case 'simulate':
        return <SimulateSection />;
      case 'optimize':
        return <OptimizeSection />;
      case 'playlist':
        return <PlaylistSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <LearnSection />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Dark Mode Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        {/* Main Layout */}
        <div className="flex">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <main className="flex-1 ml-20 p-8 pb-20">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  Regex Automata Visualizer
                </h1>
                <p className="text-slate-300 text-lg">
                  Convert regular expressions to finite automata with interactive visualizations
                </p>
              </motion.div>

              {/* Section Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

        {/* Author Credit */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center py-4">
            <p className="text-slate-300 text-sm font-medium">
              Made by <span className="text-white font-semibold">Debayan Ghosh</span> <span className="text-red-400">❤️</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;