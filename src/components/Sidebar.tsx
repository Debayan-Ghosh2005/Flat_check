import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Wrench, 
  Play, 
  Zap, 
  PlayCircle,
  User,
  GitBranch,
  HelpCircle
} from 'lucide-react';
import type { Section } from '../App';

interface SidebarProps {
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

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-8 z-40">
      {/* Logo */}
      <motion.div
        className="mb-8 p-3 rounded-xl bg-primary-500/20 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GitBranch className="w-8 h-8 text-primary-400" />
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                relative p-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-white/10 backdrop-blur-sm' 
                  : 'hover:bg-white/5 backdrop-blur-sm'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={section.label}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl"
                  layoutId="activeSection"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                className={`w-6 h-6 relative z-10 ${
                  isActive ? section.color : 'text-slate-400'
                }`} 
              />
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}