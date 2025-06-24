import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { optimizeRegex, type OptimizationSuggestion, type PerformanceMetrics } from '../utils/regexOptimizer';

export function OptimizeSection() {
  const [inputRegex, setInputRegex] = useState('(a|a)*b');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!inputRegex.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const result = optimizeRegex(inputRegex);
      setSuggestions(result.suggestions);
      setMetrics(result.metrics);
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Optimization error:', error);
      setSuggestions([]);
      setMetrics(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSuggestions([]);
    setMetrics(null);
    setHasAnalyzed(false);
    setInputRegex('(a|a)*b');
  };

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
          disabled={isAnalyzing}
        />

        <div className="flex items-center space-x-3">
          <motion.button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputRegex.trim()}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200
              ${isAnalyzing 
                ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
              }
            `}
            whileHover={{ scale: !isAnalyzing && inputRegex.trim() ? 1.02 : 1 }}
            whileTap={{ scale: !isAnalyzing && inputRegex.trim() ? 0.98 : 1 }}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Analyze & Optimize</span>
              </>
            )}
          </motion.button>

          {hasAnalyzed && (
            <motion.button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Results */}
      {hasAnalyzed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Suggestions */}
          <motion.div
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Optimization Suggestions</h3>
            
            {suggestions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-green-400 font-semibold mb-1">Already Optimized!</p>
                <p className="text-slate-400 text-sm">No improvements found for this regex.</p>
              </div>
            ) : (
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
                        ${suggestion.severity === 'high' ? 'bg-red-500/20' : 
                          suggestion.severity === 'medium' ? 'bg-yellow-500/20' : 'bg-blue-500/20'}
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
            )}
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Performance Impact</h3>
            
            {metrics && (
              <div className="space-y-4">
                <div className={`
                  p-4 rounded-lg border
                  ${suggestions.length > 0 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-blue-500/10 border-blue-500/20'
                  }
                `}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className={`w-5 h-5 ${suggestions.length > 0 ? 'text-green-400' : 'text-blue-400'}`} />
                    <span className={`font-semibold ${suggestions.length > 0 ? 'text-green-400' : 'text-blue-400'}`}>
                      {suggestions.length > 0 ? 'Optimization Available' : 'Analysis Complete'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">States:</span>
                      <div className="text-white font-semibold">
                        {metrics.originalStates} → {metrics.optimizedStates} 
                        <span className={`ml-1 ${metrics.stateReduction > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                          ({metrics.stateReduction > 0 ? '-' : ''}{metrics.stateReduction}%)
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Transitions:</span>
                      <div className="text-white font-semibold">
                        {metrics.originalTransitions} → {metrics.optimizedTransitions}
                        <span className={`ml-1 ${metrics.transitionReduction > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                          ({metrics.transitionReduction > 0 ? '-' : ''}{metrics.transitionReduction}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Memory Usage</span>
                    <span className={`font-semibold ${metrics.memoryImprovement > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                      {metrics.memoryImprovement > 0 ? '-' : ''}{metrics.memoryImprovement}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.max(100 - metrics.memoryImprovement, 20)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Matching Speed</span>
                    <span className={`font-semibold ${metrics.speedImprovement > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                      {metrics.speedImprovement > 0 ? '+' : ''}{metrics.speedImprovement}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(50 + metrics.speedImprovement, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Complexity</span>
                    <span className={`font-semibold ${metrics.complexityReduction > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                      {metrics.complexityReduction > 0 ? '-' : ''}{metrics.complexityReduction}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.max(100 - metrics.complexityReduction, 15)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}