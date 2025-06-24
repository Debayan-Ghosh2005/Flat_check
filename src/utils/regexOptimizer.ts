export interface OptimizationSuggestion {
  type: 'redundancy' | 'efficiency' | 'simplification' | 'performance';
  severity: 'high' | 'medium' | 'low';
  original: string;
  optimized: string;
  description: string;
  impact: string;
}

export interface PerformanceMetrics {
  originalStates: number;
  optimizedStates: number;
  stateReduction: number;
  originalTransitions: number;
  optimizedTransitions: number;
  transitionReduction: number;
  memoryImprovement: number;
  speedImprovement: number;
  complexityReduction: number;
}

export interface OptimizationResult {
  suggestions: OptimizationSuggestion[];
  metrics: PerformanceMetrics;
  optimizedRegex: string;
}

export function optimizeRegex(regex: string): OptimizationResult {
  const suggestions: OptimizationSuggestion[] = [];
  let optimizedRegex = regex;
  
  // Rule 1: Remove redundant alternations like (a|a)
  const redundantAlternation = /\(([^|()]+)\|\1\)/g;
  if (redundantAlternation.test(regex)) {
    const matches = regex.match(redundantAlternation);
    if (matches) {
      matches.forEach(match => {
        const inner = match.replace(/[()]/g, '').split('|')[0];
        suggestions.push({
          type: 'redundancy',
          severity: 'high',
          original: match,
          optimized: inner,
          description: 'Remove redundant alternation',
          impact: '50% reduction in states'
        });
        optimizedRegex = optimizedRegex.replace(match, inner);
      });
    }
  }

  // Rule 2: Simplify quantifier combinations like a+a* -> a+
  const quantifierSimplification = /([a-zA-Z])\+\1\*/g;
  if (quantifierSimplification.test(regex)) {
    suggestions.push({
      type: 'efficiency',
      severity: 'medium',
      original: regex.match(quantifierSimplification)?.[0] || 'a+a*',
      optimized: regex.match(quantifierSimplification)?.[0]?.replace(/\+.*\*/, '+') || 'a+',
      description: 'Simplify quantifier combination',
      impact: '25% faster matching'
    });
    optimizedRegex = optimizedRegex.replace(quantifierSimplification, '$1+');
  }

  // Rule 3: Remove unnecessary grouping like (a) -> a
  const unnecessaryGrouping = /\(([a-zA-Z])\)/g;
  if (unnecessaryGrouping.test(regex) && !regex.includes('|')) {
    const matches = regex.match(unnecessaryGrouping);
    if (matches) {
      matches.forEach(match => {
        const inner = match.replace(/[()]/g, '');
        suggestions.push({
          type: 'simplification',
          severity: 'low',
          original: match,
          optimized: inner,
          description: 'Remove unnecessary grouping',
          impact: '10% less memory usage'
        });
        optimizedRegex = optimizedRegex.replace(match, inner);
      });
    }
  }

  // Rule 4: Optimize character classes [a] -> a
  const singleCharClass = /\[([a-zA-Z])\]/g;
  if (singleCharClass.test(regex)) {
    const matches = regex.match(singleCharClass);
    if (matches) {
      matches.forEach(match => {
        const inner = match.replace(/[\[\]]/g, '');
        suggestions.push({
          type: 'simplification',
          severity: 'low',
          original: match,
          optimized: inner,
          description: 'Simplify single character class',
          impact: '5% performance improvement'
        });
        optimizedRegex = optimizedRegex.replace(match, inner);
      });
    }
  }

  // Rule 5: Optimize empty alternations like (|a) -> a?
  const emptyAlternation = /\(\|([^)]+)\)/g;
  if (emptyAlternation.test(regex)) {
    const matches = regex.match(emptyAlternation);
    if (matches) {
      matches.forEach(match => {
        const inner = match.replace(/\(\|([^)]+)\)/, '$1?');
        suggestions.push({
          type: 'efficiency',
          severity: 'medium',
          original: match,
          optimized: inner,
          description: 'Convert empty alternation to optional',
          impact: '30% fewer states'
        });
        optimizedRegex = optimizedRegex.replace(match, inner);
      });
    }
  }

  // Calculate performance metrics
  const metrics = calculateMetrics(regex, optimizedRegex, suggestions);

  return {
    suggestions,
    metrics,
    optimizedRegex
  };
}

function calculateMetrics(original: string, optimized: string, suggestions: OptimizationSuggestion[]): PerformanceMetrics {
  // Estimate states and transitions based on regex complexity
  const originalComplexity = calculateComplexity(original);
  const optimizedComplexity = calculateComplexity(optimized);
  
  const originalStates = Math.max(3, Math.floor(originalComplexity * 1.5));
  const optimizedStates = Math.max(2, Math.floor(optimizedComplexity * 1.5));
  const stateReduction = Math.round(((originalStates - optimizedStates) / originalStates) * 100);
  
  const originalTransitions = Math.max(2, originalComplexity);
  const optimizedTransitions = Math.max(1, optimizedComplexity);
  const transitionReduction = Math.round(((originalTransitions - optimizedTransitions) / originalTransitions) * 100);
  
  // Calculate improvement percentages based on suggestions
  const hasHighSeverity = suggestions.some(s => s.severity === 'high');
  const hasMediumSeverity = suggestions.some(s => s.severity === 'medium');
  
  let memoryImprovement = 0;
  let speedImprovement = 0;
  let complexityReduction = 0;
  
  if (hasHighSeverity) {
    memoryImprovement = Math.min(45, stateReduction + 20);
    speedImprovement = Math.min(30, stateReduction + 10);
    complexityReduction = Math.min(60, stateReduction + 30);
  } else if (hasMediumSeverity) {
    memoryImprovement = Math.min(25, stateReduction + 10);
    speedImprovement = Math.min(20, stateReduction + 5);
    complexityReduction = Math.min(35, stateReduction + 15);
  } else if (suggestions.length > 0) {
    memoryImprovement = Math.min(15, stateReduction + 5);
    speedImprovement = Math.min(10, stateReduction);
    complexityReduction = Math.min(20, stateReduction + 5);
  }

  return {
    originalStates,
    optimizedStates,
    stateReduction: Math.max(0, stateReduction),
    originalTransitions,
    optimizedTransitions,
    transitionReduction: Math.max(0, transitionReduction),
    memoryImprovement,
    speedImprovement,
    complexityReduction
  };
}

function calculateComplexity(regex: string): number {
  let complexity = 1;
  
  // Count special characters that increase complexity
  const specialChars = /[*+?{}|()[\]\\]/g;
  const matches = regex.match(specialChars);
  if (matches) {
    complexity += matches.length;
  }
  
  // Count alternations
  const alternations = regex.match(/\|/g);
  if (alternations) {
    complexity += alternations.length * 2;
  }
  
  // Count quantifiers
  const quantifiers = regex.match(/[*+?]/g);
  if (quantifiers) {
    complexity += quantifiers.length;
  }
  
  // Count groups
  const groups = regex.match(/\(/g);
  if (groups) {
    complexity += groups.length;
  }
  
  return Math.max(1, complexity);
}

// Predefined optimization patterns for common cases
export const commonOptimizations = {
  '(a|a)*': 'a*',
  '(b|b)+': 'b+',
  '(a|a)*b': 'a*b',
  'a+a*': 'a+',
  'b*b+': 'b+',
  '(a)': 'a',
  '(b)': 'b',
  '[a]': 'a',
  '[b]': 'b',
  '(|a)': 'a?',
  '(|b)': 'b?',
  'a{1}': 'a',
  'b{1}': 'b',
  'a{0,1}': 'a?',
  'b{0,1}': 'b?'
};