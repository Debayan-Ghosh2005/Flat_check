import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RegexInput } from './RegexInput';
import { AutomataVisualizer } from './AutomataVisualizer';
import { ConversionPanel } from './ConversionPanel';

export function BuildSection() {
  const [regex, setRegex] = useState('a*b');
  const [currentAutomata, setCurrentAutomata] = useState<'regex' | 'nfa' | 'dfa' | 'min-dfa'>('regex');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Build Automata</h2>
        <p className="text-slate-300 text-sm md:text-base">
          Enter a regular expression and visualize its conversion to finite automata
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Left Panel - Input & Controls */}
        <div className="xl:col-span-1 space-y-4 md:space-y-6">
          <RegexInput regex={regex} onChange={setRegex} />
          <ConversionPanel 
            currentStep={currentAutomata} 
            onStepChange={setCurrentAutomata} 
          />
        </div>

        {/* Right Panel - Visualization */}
        <div className="xl:col-span-2">
          <AutomataVisualizer 
            regex={regex} 
            type={currentAutomata} 
          />
        </div>
      </div>
    </div>
  );
}