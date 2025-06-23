import type { AutomataData } from './regexParser';

export interface SimulationStep {
  currentState: string;
  inputSymbol: string;
  nextState: string;
  action: string;
}

export interface SimulationResult {
  steps: SimulationStep[];
  accepted: boolean;
}

export function simulateAutomaton(automata: AutomataData, inputString: string): SimulationResult {
  const steps: SimulationStep[] = [];
  
  // Find start state
  const startState = automata.nodes.find(node => node.type === 'start');
  if (!startState) {
    return { steps: [], accepted: false };
  }

  // Find accept states
  const acceptStates = new Set(
    automata.nodes.filter(node => node.type === 'accept').map(node => node.id)
  );

  let currentState = startState.id;
  
  // Process each input symbol
  for (let i = 0; i < inputString.length; i++) {
    const symbol = inputString[i];
    
    // Find transition for current state and symbol
    const transition = automata.edges.find(edge => 
      edge.source === currentState && 
      (edge.label === symbol || edge.label.includes(symbol))
    );

    if (transition) {
      steps.push({
        currentState,
        inputSymbol: symbol,
        nextState: transition.target,
        action: `Read '${symbol}', transition to ${transition.target}`
      });
      currentState = transition.target;
    } else {
      // No valid transition found
      steps.push({
        currentState,
        inputSymbol: symbol,
        nextState: currentState,
        action: `No transition for '${symbol}' - reject`
      });
      return { steps, accepted: false };
    }
  }

  // Check if final state is accepting
  const accepted = acceptStates.has(currentState);
  
  return { steps, accepted };
}

// Enhanced simulation for more complex patterns
export function simulateAutomatonAdvanced(automata: AutomataData, inputString: string): SimulationResult {
  const steps: SimulationStep[] = [];
  
  // Handle epsilon transitions and more complex logic
  const startState = automata.nodes.find(node => node.type === 'start');
  if (!startState) {
    return { steps: [], accepted: false };
  }

  const acceptStates = new Set(
    automata.nodes.filter(node => node.type === 'accept').map(node => node.id)
  );

  let currentStates = new Set([startState.id]);
  
  // Add epsilon closure for start state
  currentStates = getEpsilonClosure(automata, currentStates);
  
  for (let i = 0; i < inputString.length; i++) {
    const symbol = inputString[i];
    const nextStates = new Set<string>();
    
    // For each current state, find transitions
    for (const state of currentStates) {
      const transitions = automata.edges.filter(edge => 
        edge.source === state && 
        edge.label === symbol &&
        edge.type !== 'epsilon'
      );
      
      transitions.forEach(transition => {
        nextStates.add(transition.target);
      });
    }
    
    if (nextStates.size === 0) {
      steps.push({
        currentState: Array.from(currentStates).join(','),
        inputSymbol: symbol,
        nextState: 'reject',
        action: `No valid transitions for '${symbol}'`
      });
      return { steps, accepted: false };
    }
    
    // Add epsilon closure
    const nextStatesWithEpsilon = getEpsilonClosure(automata, nextStates);
    
    steps.push({
      currentState: Array.from(currentStates).join(','),
      inputSymbol: symbol,
      nextState: Array.from(nextStatesWithEpsilon).join(','),
      action: `Process '${symbol}'`
    });
    
    currentStates = nextStatesWithEpsilon;
  }
  
  // Check if any current state is accepting
  const accepted = Array.from(currentStates).some(state => acceptStates.has(state));
  
  return { steps, accepted };
}

function getEpsilonClosure(automata: AutomataData, states: Set<string>): Set<string> {
  const closure = new Set(states);
  const stack = Array.from(states);
  
  while (stack.length > 0) {
    const state = stack.pop()!;
    
    // Find epsilon transitions from this state
    const epsilonTransitions = automata.edges.filter(edge => 
      edge.source === state && edge.type === 'epsilon'
    );
    
    epsilonTransitions.forEach(transition => {
      if (!closure.has(transition.target)) {
        closure.add(transition.target);
        stack.push(transition.target);
      }
    });
  }
  
  return closure;
}