import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

export function SimulateSection() {
  const [inputString, setInputString] = useState('aab');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);

  const steps = [
    { state: 'q0', input: 'a', transition: 'q0 → q1' },
    { state: 'q1', input: 'a', transition: 'q1 → q1' },
    { state: 'q1', input: 'b', transition: 'q1 → q2' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">String Simulation</h2>
        <p className="text-slate-300">
          Step through automata execution with input strings
        </p>
      </motion.div>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Input String</h3>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Enter test string..."
          />
          
          <div className="flex items-center space-x-3 mt-4">
            <motion.button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${isSimulating 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isSimulating ? 'Pause' : 'Start'}</span>
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentStep(0)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Speed: {simulationSpeed}ms
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Current State</h3>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">q{currentStep}</span>
            </div>
            <p className="text-slate-300">
              Reading: <span className="text-yellow-400 font-mono font-bold">
                {inputString[currentStep] || 'End'}
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Step Trace */}
      <motion.div
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Execution Trace</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Step</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Current State</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Input Symbol</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Transition</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <motion.tr
                  key={index}
                  className={`
                    border-b border-white/10 transition-all duration-200
                    ${index === currentStep ? 'bg-blue-500/20' : 'hover:bg-white/5'}
                  `}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-3 px-4 text-white font-medium">{index + 1}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-mono">
                      {step.state}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-mono">
                      {step.input}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{step.transition}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}