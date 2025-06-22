import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, Table, Download, ZoomIn } from 'lucide-react';
import { createAutomataGraph } from '../utils/automataGraph';

interface AutomataVisualizerProps {
  regex: string;
  type: 'regex' | 'nfa' | 'dfa' | 'min-dfa';
}

export function AutomataVisualizer({ regex, type }: AutomataVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && regex) {
      // Clean up previous instance
      if (cyRef.current) {
        cyRef.current.destroy();
      }

      // Create new graph
      cyRef.current = createAutomataGraph(containerRef.current, regex, type);
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [regex, type]);

  const handleExportPNG = () => {
    if (cyRef.current) {
      const png = cyRef.current.png({ scale: 2, full: true });
      const link = document.createElement('a');
      link.download = `${type}-${regex}.png`;
      link.href = png;
      link.click();
    }
  };

  const handleFitToView = () => {
    if (cyRef.current) {
      cyRef.current.fit();
    }
  };

  return (
    <motion.div
      className="h-full min-h-[600px] rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {type.toUpperCase()} Visualization
              </h3>
              <p className="text-sm text-slate-300">
                Pattern: <code className="text-green-400 font-mono">{regex}</code>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleFitToView}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Fit to view"
            >
              <ZoomIn className="w-4 h-4 text-slate-300" />
            </motion.button>
            
            <motion.button
              onClick={handleExportPNG}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Export as PNG"
            >
              <Download className="w-4 h-4 text-slate-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[500px] bg-gradient-to-br from-slate-900/50 to-purple-900/50"
        style={{ minHeight: '500px' }}
      />

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          className="p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">
                <span className="text-white font-medium">States:</span> 
                {getStateCount(type)}
              </span>
              <span className="text-slate-300">
                <span className="text-white font-medium">Transitions:</span> 
                {getTransitionCount(type)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-slate-300 text-xs">Start State</span>
              <div className="w-3 h-3 rounded-full bg-red-400 ml-4"></div>
              <span className="text-slate-300 text-xs">Accept State</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function getStateCount(type: string): number {
  // Mock data - in real implementation, this would come from the automata
  switch (type) {
    case 'nfa': return 6;
    case 'dfa': return 4;
    case 'min-dfa': return 3;
    default: return 0;
  }
}

function getTransitionCount(type: string): number {
  // Mock data - in real implementation, this would come from the automata
  switch (type) {
    case 'nfa': return 8;
    case 'dfa': return 6;
    case 'min-dfa': return 5;
    default: return 0;
  }
}