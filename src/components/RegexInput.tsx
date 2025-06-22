import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface RegexInputProps {
  regex: string;
  onChange: (regex: string) => void;
}

const examples = [
  { pattern: 'a*', description: 'Zero or more a' },
  { pattern: '(a|b)*', description: 'Any sequence of a or b' },
  { pattern: 'a+b*c?', description: 'One+ a, zero+ b, optional c' },
  { pattern: '(ab|cd)*', description: 'Alternating ab or cd' },
];

export function RegexInput({ regex, onChange }: RegexInputProps) {
  const [isValid, setIsValid] = useState(true);
  const [showExamples, setShowExamples] = useState(false);

  const validateRegex = (pattern: string) => {
    try {
      new RegExp(pattern);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (value: string) => {
    onChange(value);
    setIsValid(validateRegex(value));
  };

  return (
    <motion.div
      className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <Code className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Regular Expression</h3>
      </div>

      {/* Input Field */}
      <div className="relative mb-4">
        <input
          type="text"
          value={regex}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter regex pattern..."
          className={`
            w-full px-4 py-3 rounded-lg bg-white/10 border-2 transition-all duration-200
            font-mono text-lg text-white placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            ${isValid 
              ? 'border-green-500/50 focus:border-green-500' 
              : 'border-red-500/50 focus:border-red-500'
            }
          `}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValid ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
        </div>
      </div>

      {/* Validation Message */}
      {!isValid && (
        <motion.div
          className="flex items-center space-x-2 text-red-400 text-sm mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Invalid regular expression syntax</span>
        </motion.div>
      )}

      {/* Examples Toggle */}
      <motion.button
        onClick={() => setShowExamples(!showExamples)}
        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <Lightbulb className="w-4 h-4" />
        <span className="text-sm font-medium">
          {showExamples ? 'Hide Examples' : 'Show Examples'}
        </span>
      </motion.button>

      {/* Examples */}
      {showExamples && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {examples.map((example, index) => (
            <motion.button
              key={example.pattern}
              onClick={() => handleChange(example.pattern)}
              className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between">
                <code className="text-green-400 font-mono font-semibold">
                  {example.pattern}
                </code>
                <span className="text-slate-300 text-sm">
                  {example.description}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}