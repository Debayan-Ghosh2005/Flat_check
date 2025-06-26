import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward, CheckCircle, XCircle } from 'lucide-react';
import { parseRegexToNFA, convertNFAToDFA, type AutomataData } from '../utils/regexParser';
import { simulateAutomaton, type SimulationStep } from '../utils/simulator';

export function SimulateSection() {
  const [inputString, setInputString] = useState('aab');
  const [regex, setRegex] = useState('a*b');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [automataType, setAutomataType] = useState<'nfa' | 'dfa'>('dfa');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate simulation steps when regex or input changes
  useEffect(() => {
    if (regex && inputString) {
      try {
        const nfa = parseRegexToNFA(regex);
        const automata = automataType === 'nfa' ? nfa : convertNFAToDFA(nfa);
        const simulationResult = simulateAutomaton(automata, inputString);
        setSteps(simulationResult.steps);
        setIsAccepted(simulationResult.accepted);
        setCurrentStep(0);
      } catch (error) {
        console.error('Simulation error:', error);
        setSteps([]);
        setIsAccepted(null);
      }
    }
  }, [regex, inputString, automataType]);

  // Handle simulation playback
  useEffect(() => {
    if (isSimulating && currentStep < steps.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, simulationSpeed);
    } else if (currentStep >= steps.length) {
      setIsSimulating(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isSimulating, currentStep, steps.length, simulationSpeed]);

  const handleStartPause = () => {
    if (currentStep >= steps.length) {
      // Reset if at end
      setCurrentStep(0);
      setIsSimulating(true);
    } else {
      setIsSimulating(!isSimulating);
    }
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStep(0);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const handleStepForward = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const getCurrentState = () => {
    if (currentStep === 0) return steps[0]?.currentState || 'q0';
    if (currentStep > 0 && currentStep <= steps.length) {
      return steps[currentStep - 1]?.nextState || 'q0';
    }
    return 'q0';
  };

  const getCurrentSymbol = () => {
    if (currentStep < inputString.length) {
      return inputString[currentStep];
    }
    return 'End';
  };

  const getSimulationStatus = () => {
    if (currentStep >= steps.length) {
      return isAccepted ? 'Accepted' : 'Rejected';
    }
    return 'Running';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">String Simulation</h2>
        <p className="text-slate-300 text-sm md:text-base">
          Step through automata execution with input strings
        </p>
      </motion.div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Regular Expression
              </label>
              <input
                type="text"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter regex pattern..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Test String
              </label>
              <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter test string..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Automaton Type
              </label>
              <select
                value={automataType}
                onChange={(e) => setAutomataType(e.target.value as 'nfa' | 'dfa')}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="dfa">DFA (Deterministic)</option>
                <option value="nfa">NFA (Non-deterministic)</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-6">
            <motion.button
              onClick={handleStartPause}
              disabled={steps.length === 0}
              className={`
                flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
                ${isSimulating 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: steps.length > 0 ? 1.05 : 1 }}
              whileTap={{ scale: steps.length > 0 ? 0.95 : 1 }}
            >
              {isSimulating ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4" />}
              <span>{isSimulating ? 'Pause' : 'Start'}</span>
            </motion.button>
            
            <motion.button
              onClick={handleStepForward}
              disabled={currentStep >= steps.length}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              whileHover={{ scale: currentStep < steps.length ? 1.05 : 1 }}
              whileTap={{ scale: currentStep < steps.length ? 0.95 : 1 }}
            >
              <FastForward className="w-3 h-3 md:w-4 md:h-4" />
              <span>Step</span>
            </motion.button>
            
            <motion.button
              onClick={handleReset}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 font-medium text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
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
          className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Current State</h3>
          <div className="text-center">
            <div className={`
              w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300
              ${currentStep >= steps.length 
                ? (isAccepted ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-red-500 to-pink-500')
                : 'bg-gradient-to-br from-blue-500 to-purple-500'
              }
            `}>
              <span className="text-white font-bold text-lg md:text-xl">{getCurrentState()}</span>
            </div>
            <p className="text-slate-300 mb-2 text-sm md:text-base">
              Reading: <span className="text-yellow-400 font-mono font-bold">
                {getCurrentSymbol()}
              </span>
            </p>
            <p className="text-slate-300 mb-4 text-sm md:text-base">
              Step: {currentStep} / {steps.length}
            </p>
            
            {/* Status Badge */}
            <div className="flex items-center justify-center space-x-2">
              {currentStep >= steps.length && (
                <>
                  {isAccepted ? (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  )}
                  <span className={`font-semibold text-sm md:text-base ${isAccepted ? 'text-green-400' : 'text-red-400'}`}>
                    {getSimulationStatus()}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Step Trace */}
      <motion.div
        className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-white mb-4">Execution Trace</h3>
        
        {steps.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm md:text-base">Enter a regex and test string to see the simulation trace</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-slate-300 font-medium text-xs md:text-sm">Step</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-slate-300 font-medium text-xs md:text-sm">Current State</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-slate-300 font-medium text-xs md:text-sm">Input Symbol</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-slate-300 font-medium text-xs md:text-sm">Next State</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-slate-300 font-medium text-xs md:text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step, index) => (
                  <motion.tr
                    key={index}
                    className={`
                      border-b border-white/10 transition-all duration-200
                      ${index < currentStep ? 'bg-green-500/10' : 
                        index === currentStep ? 'bg-blue-500/20' : 'hover:bg-white/5'}
                    `}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-2 md:py-3 px-2 md:px-4 text-white font-medium text-xs md:text-sm">{index + 1}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4">
                      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">
                        {step.currentState}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4">
                      <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-mono text-xs">
                        {step.inputSymbol}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4">
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 font-mono text-xs">
                        {step.nextState}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-slate-300 text-xs md:text-sm">{step.action}</td>
                  </motion.tr>
                ))}
                
                {/* Final state row */}
                {currentStep >= steps.length && (
                  <motion.tr
                    className={`border-b border-white/10 ${isAccepted ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <td className="py-2 md:py-3 px-2 md:px-4 text-white font-medium text-xs md:text-sm">Final</td>
                    <td className="py-2 md:py-3 px-2 md:px-4">
                      <span className={`px-2 py-1 rounded font-mono text-xs ${
                        isAccepted ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {getCurrentState()}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4">
                      <span className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 font-mono text-xs">
                        End
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4">-</td>
                    <td className={`py-2 md:py-3 px-2 md:px-4 font-semibold text-xs md:text-sm ${isAccepted ? 'text-green-400' : 'text-red-400'}`}>
                      {isAccepted ? 'Accept' : 'Reject'}
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}