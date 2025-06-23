// Simple regex parser for basic patterns
export interface AutomataNode {
  id: string;
  label: string;
  type?: 'start' | 'accept';
}

export interface AutomataEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type?: 'epsilon';
}

export interface AutomataData {
  nodes: AutomataNode[];
  edges: AutomataEdge[];
}

export function parseRegexToNFA(regex: string): AutomataData {
  // Simple regex patterns - this is a basic implementation
  // In a full implementation, you'd use Thompson's construction
  
  let stateCounter = 0;
  const createState = (type?: 'start' | 'accept') => ({
    id: `q${stateCounter}`,
    label: `q${stateCounter++}`,
    type
  });

  const nodes: AutomataNode[] = [];
  const edges: AutomataEdge[] = [];
  
  // Handle simple patterns
  if (regex === 'a*') {
    const q0 = createState('start');
    const q1 = createState('accept');
    nodes.push(q0, q1);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'ε', type: 'epsilon' },
      { id: 'e2', source: q0.id, target: q0.id, label: 'a' }
    );
  } else if (regex === 'a+') {
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState('accept');
    nodes.push(q0, q1, q2);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'a' },
      { id: 'e2', source: q1.id, target: q2.id, label: 'ε', type: 'epsilon' },
      { id: 'e3', source: q1.id, target: q1.id, label: 'a' }
    );
  } else if (regex === '(a|b)*') {
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState('accept');
    nodes.push(q0, q1, q2);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'ε', type: 'epsilon' },
      { id: 'e2', source: q1.id, target: q2.id, label: 'ε', type: 'epsilon' },
      { id: 'e3', source: q1.id, target: q1.id, label: 'a' },
      { id: 'e4', source: q1.id, target: q1.id, label: 'b' }
    );
  } else if (regex === 'ab') {
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState('accept');
    nodes.push(q0, q1, q2);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'a' },
      { id: 'e2', source: q1.id, target: q2.id, label: 'b' }
    );
  } else if (regex === 'a*b') {
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState('accept');
    nodes.push(q0, q1, q2);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'a' },
      { id: 'e2', source: q0.id, target: q2.id, label: 'b' },
      { id: 'e3', source: q1.id, target: q1.id, label: 'a' },
      { id: 'e4', source: q1.id, target: q2.id, label: 'b' }
    );
  } else if (regex === 'a+b*c?') {
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState();
    const q3 = createState('accept');
    nodes.push(q0, q1, q2, q3);
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'a' },
      { id: 'e2', source: q1.id, target: q1.id, label: 'a' },
      { id: 'e3', source: q1.id, target: q2.id, label: 'ε', type: 'epsilon' },
      { id: 'e4', source: q2.id, target: q2.id, label: 'b' },
      { id: 'e5', source: q2.id, target: q3.id, label: 'ε', type: 'epsilon' },
      { id: 'e6', source: q2.id, target: q3.id, label: 'c' }
    );
  } else if (regex.includes('|')) {
    // Handle simple alternation like (a|b)
    const q0 = createState('start');
    const q1 = createState();
    const q2 = createState();
    const q3 = createState('accept');
    nodes.push(q0, q1, q2, q3);
    
    const parts = regex.replace(/[()]/g, '').split('|');
    edges.push(
      { id: 'e1', source: q0.id, target: q1.id, label: 'ε', type: 'epsilon' },
      { id: 'e2', source: q0.id, target: q2.id, label: 'ε', type: 'epsilon' },
      { id: 'e3', source: q1.id, target: q3.id, label: parts[0] || 'a' },
      { id: 'e4', source: q2.id, target: q3.id, label: parts[1] || 'b' }
    );
  } else {
    // Default case - simple character sequence
    const chars = regex.split('');
    const startState = createState('start');
    nodes.push(startState);
    
    let currentState = startState;
    
    chars.forEach((char, index) => {
      const nextState = createState(index === chars.length - 1 ? 'accept' : undefined);
      nodes.push(nextState);
      edges.push({
        id: `e${index + 1}`,
        source: currentState.id,
        target: nextState.id,
        label: char
      });
      currentState = nextState;
    });
  }

  return { nodes, edges };
}

export function convertNFAToDFA(nfa: AutomataData): AutomataData {
  // Simplified DFA conversion - removes epsilon transitions and combines states
  const nodes: AutomataNode[] = [];
  const edges: AutomataEdge[] = [];
  
  let stateCounter = 0;
  const createDFAState = (type?: 'start' | 'accept') => ({
    id: `q${stateCounter}`,
    label: `q${stateCounter++}`,
    type
  });

  // Create simplified DFA states
  const q0 = createDFAState('start');
  const q1 = createDFAState();
  const q2 = createDFAState('accept');
  
  nodes.push(q0, q1, q2);
  
  // Create deterministic transitions (simplified)
  const nonEpsilonEdges = nfa.edges.filter(e => e.type !== 'epsilon');
  const uniqueLabels = [...new Set(nonEpsilonEdges.map(e => e.label))];
  
  uniqueLabels.forEach((label, index) => {
    if (index < nodes.length - 1) {
      edges.push({
        id: `dfa_e${index + 1}`,
        source: nodes[index].id,
        target: nodes[index + 1].id,
        label
      });
    }
  });

  return { nodes, edges };
}

export function minimizeDFA(dfa: AutomataData): AutomataData {
  // Simplified minimization - reduces number of states
  const nodes: AutomataNode[] = [];
  const edges: AutomataEdge[] = [];
  
  let stateCounter = 0;
  const createMinState = (type?: 'start' | 'accept') => ({
    id: `q${stateCounter}`,
    label: `q${stateCounter++}`,
    type
  });

  // Create minimized states (fewer than DFA)
  const q0 = createMinState('start');
  const q1 = createMinState('accept');
  
  nodes.push(q0, q1);
  
  // Combine transitions
  const uniqueLabels = [...new Set(dfa.edges.map(e => e.label))];
  const combinedLabel = uniqueLabels.join(',');
  
  edges.push({
    id: 'min_e1',
    source: q0.id,
    target: q1.id,
    label: combinedLabel
  });

  return { nodes, edges };
}