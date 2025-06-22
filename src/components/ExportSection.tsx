import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileImage, FileText, Code, Database } from 'lucide-react';

export function ExportSection() {
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'svg' | 'json' | 'dot'>('png');

  const formats = [
    { id: 'png', label: 'PNG Image', icon: FileImage, description: 'High-quality raster image' },
    { id: 'svg', label: 'SVG Vector', icon: FileText, description: 'Scalable vector graphics' },
    { id: 'json', label: 'JSON Data', icon: Code, description: 'Automata structure data' },
    { id: 'dot', label: 'DOT Graph', icon: Database, description: 'Graphviz format' },
  ];

  const handleExport = () => {
    // Mock export functionality
    console.log(`Exporting as ${selectedFormat}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Export Automata</h2>
        <p className="text-slate-300">
          Save your automata in various formats for documentation or further processing
        </p>
      </motion.div>

      {/* Format Selection */}
      <motion.div
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormat === format.id;
            
            return (
              <motion.button
                key={format.id}
                onClick={() => setSelectedFormat(format.id as any)}
                className={`
                  p-4 rounded-lg border transition-all duration-200 text-left
                  ${isSelected 
                    ? 'bg-white/10 border-white/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {format.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{format.description}</p>
                {isSelected && (
                  <motion.div
                    className="mt-2 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Export Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Quality (for images)
              </label>
              <input
                type="range"
                min="1"
                max="4"
                defaultValue="2"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Include metadata</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-300">Transparent background</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Include transition table</span>
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
          
          <div className="aspect-video bg-white/5 rounded-lg border border-white/10 mb-4 flex items-center justify-center">
            <div className="text-center">
              <FileImage className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-400">Export preview will appear here</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 mb-4">
            <div className="flex justify-between">
              <span>File size:</span>
              <span>~45 KB</span>
            </div>
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span>800 × 600 px</span>
            </div>
          </div>

          <motion.button
            onClick={handleExport}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            <span>Export {selectedFormat.toUpperCase()}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}