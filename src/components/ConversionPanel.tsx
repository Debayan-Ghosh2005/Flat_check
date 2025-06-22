import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GitBranch, Minimize, Zap } from 'lucide-react';

interface ConversionPanelProps {
  currentStep: 'regex' | 'nfa' | 'dfa' | 'min-dfa';
  onStepChange: (step: 'regex' | 'nfa' | 'dfa' | 'min-dfa') => void;
}

const steps = [
  {
    id: 'regex' as const,
    label: 'Regex',
    description: 'Regular Expression',
    icon: GitBranch,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'nfa' as const,
    label: 'NFA',
    description: 'Non-deterministic FA',
    icon: ArrowRight,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'dfa' as const,
    label: 'DFA',
    description: 'Deterministic FA',
    icon: Minimize,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'min-dfa' as const,
    label: 'Min-DFA',
    description: 'Minimized DFA',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
];

export function ConversionPanel({ currentStep, onStepChange }: ConversionPanelProps) {
  return (
    <motion.div
      className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Conversion Steps</h3>
      
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
          
          return (
            <motion.button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`
                w-full p-4 rounded-lg border transition-all duration-200 text-left
                ${isActive 
                  ? 'bg-white/10 border-white/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} p-2
                  ${isActive ? 'shadow-lg' : ''}
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{steps.findIndex(s => s.id === currentStep) + 1}/{steps.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}