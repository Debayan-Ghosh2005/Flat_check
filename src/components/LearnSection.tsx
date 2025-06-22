import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Lightbulb, Code, GitBranch } from 'lucide-react';

export function LearnSection() {
  const concepts = [
    {
      title: "Regular Expressions",
      description: "Pattern matching language for describing sets of strings",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      examples: ["a*", "(a|b)*", "a+b*c?"]
    },
    {
      title: "Non-deterministic Finite Automaton (NFA)",
      description: "State machine that can be in multiple states simultaneously",
      icon: GitBranch,
      color: "from-green-500 to-emerald-500",
      examples: ["ε-transitions", "Multiple paths", "Thompson's construction"]
    },
    {
      title: "Deterministic Finite Automaton (DFA)",
      description: "State machine with exactly one transition per symbol",
      icon: ArrowRight,
      color: "from-purple-500 to-pink-500",
      examples: ["Subset construction", "Unique paths", "Efficient matching"]
    },
    {
      title: "Minimization",
      description: "Reducing DFA to smallest equivalent automaton",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      examples: ["Equivalent states", "Partition refinement", "Optimal size"]
    }
  ];

  const conversionSteps = [
    { from: "Regex", to: "NFA", method: "Thompson's Construction" },
    { from: "NFA", to: "DFA", method: "Subset Construction" },
    { from: "DFA", to: "Min-DFA", method: "Partition Refinement" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="text-center py-12 px-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">
          Understanding Regex and Automata
        </h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Learn how regular expressions are converted to finite automata through a series of 
          algorithmic transformations. Explore the theory behind pattern matching and state machines.
        </p>
      </motion.div>

      {/* Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => {
          const Icon = concept.icon;
          return (
            <motion.div
              key={concept.title}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${concept.color} p-3 mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{concept.title}</h3>
              <p className="text-slate-300 mb-4">{concept.description}</p>
              <div className="flex flex-wrap gap-2">
                {concept.examples.map((example, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-white/10 text-slate-200 font-mono"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Conversion Process */}
      <motion.div
        className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Conversion Process
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          {conversionSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">{step.from}</span>
                </div>
                <p className="text-slate-300 text-sm font-medium">{step.method}</p>
              </div>
              {index < conversionSteps.length - 1 && (
                <ArrowRight className="w-8 h-8 text-slate-400 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Interactive Examples */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Common Regex Patterns</h3>
          <div className="space-y-3">
            {[
              { pattern: "a*", description: "Zero or more 'a'" },
              { pattern: "(a|b)*", description: "Any sequence of 'a' or 'b'" },
              { pattern: "a+b*c?", description: "One+ 'a', zero+ 'b', optional 'c'" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <code className="text-green-400 font-mono font-semibold">{item.pattern}</code>
                <span className="text-slate-300">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Algorithm Complexity</h3>
          <div className="space-y-3">
            {[
              { algorithm: "Thompson's Construction", complexity: "O(n)" },
              { algorithm: "Subset Construction", complexity: "O(2^n)" },
              { algorithm: "DFA Minimization", complexity: "O(n log n)" }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-white font-medium">{item.algorithm}</span>
                <code className="text-yellow-400 font-mono">{item.complexity}</code>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}