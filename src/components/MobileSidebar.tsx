import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Wrench, 
  Play, 
  Zap, 
  PlayCircle,
  User,
  GitBranch,
  HelpCircle,
  X
} from 'lucide-react';
import type { Section } from '../App';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections = [
  { id: 'learn' as Section, icon: BookOpen, label: 'Learn', color: 'text-blue-400' },
  { id: 'build' as Section, icon: Wrench, label: 'Build', color: 'text-green-400' },
  { id: 'simulate' as Section, icon: Play, label: 'Simulate', color: 'text-purple-400' },
  { id: 'optimize' as Section, icon: Zap, label: 'Optimize', color: 'text-yellow-400' },
  { id: 'playlist' as Section, icon: PlayCircle, label: 'Playlist', color: 'text-red-400' },
  { id: 'qa' as Section, icon: HelpCircle, label: 'Q&A', color: 'text-cyan-400' },
  { id: 'profile' as Section, icon: User, label: 'Profile', color: 'text-pink-400' },
];

export function MobileSidebar({ isOpen, onClose, activeSection, onSectionChange }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-black/30 backdrop-blur-xl border-r border-white/10 z-50 md:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-sm">
                    <GitBranch className="w-6 h-6 text-primary-400" />
                  </div>
                  <span className="text-white font-semibold text-lg">Menu</span>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-slate-300" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => onSectionChange(section.id)}
                      className={`
                        relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 text-left
                        ${isActive 
                          ? 'bg-white/10 backdrop-blur-sm' 
                          : 'hover:bg-white/5 backdrop-blur-sm'
                        }
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon 
                        className={`w-6 h-6 relative z-10 ${
                          isActive ? section.color : 'text-slate-400'
                        }`} 
                      />
                      <span className={`font-medium relative z-10 ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {section.label}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-slate-400 text-sm text-center">
                  Regex Automata Visualizer
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}