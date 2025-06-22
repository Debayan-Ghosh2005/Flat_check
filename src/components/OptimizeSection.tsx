import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export function OptimizeSection() {
  const [inputRegex, setInputRegex] = useState('(a|a)*b');

  const suggestions = [
    {
      type: 'redundancy',
      severity: 'high',
      original: '(a|a)*',
      optimized: 'a*',
      description: 'Remove redundant alternation',
      impact: '50% reduction in states'
    },
    {
      type: 'efficiency',
      severity: 'medium',
      original: 'a+a*',
      optimized: 'a+',
      description: 'Simplify quantifier combination',
      impact: '25% faster matching'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Regex Optimization</h2>
        <p className="text-slate-300">
          Analyze and optimize regular expressions for better performance
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Regex Analysis</h3>
        </div>

        <input
          type="text"
          value={inputRegex}
          onChange={(e) => setInputRegex(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 mb-4"
          placeholder="Enter regex to optimize..."
        />

        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze & Optimize
        </motion.button>
      </motion.div>

      {/* Optimization Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suggestions */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Optimization Suggestions</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    p-1 rounded mt-1
                    ${suggestion.severity === 'high' ? 'bg-red-500/20' : 'bg-yellow-500/20'}
                  `}>
                    {suggestion.severity === 'high' ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">
                      {suggestion.description}
                    </h4>
                    <div className="mb-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-slate-400">Original:</span>
                        <code className="bg-red-500/20 text-red-300 px-2 py-1 rounded font-mono">
                          {suggestion.original}
                        </code>
                      </div>
                      <div className="flex items-center space-x-2 text-sm mt-1">
                        <span className="text-slate-400">Optimized:</span>
                        <code className="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono">
                          {suggestion.optimized}
                        </code>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{suggestion.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Performance Impact</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-400">Optimization Applied</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">States Reduced:</span>
                  <div className="text-white font-semibold">6 → 3 (50%)</div>
                </div>
                <div>
                  <span className="text-slate-400">Transitions:</span>
                  <div className="text-white font-semibold">8 → 4 (50%)</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Memory Usage</span>
                <span className="text-green-400 font-semibold">-45%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '55%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Matching Speed</span>
                <span className="text-green-400 font-semibold">+30%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Complexity</span>
                <span className="text-green-400 font-semibold">-60%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}