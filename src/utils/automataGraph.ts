import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { parseRegexToNFA, convertNFAToDFA, minimizeDFA, type AutomataData } from './regexParser';

// Register the dagre layout
cytoscape.use(dagre);

export function createAutomataGraph(
  container: HTMLElement, 
  regex: string, 
  type: 'regex' | 'nfa' | 'dfa' | 'min-dfa'
) {
  // Generate actual automata data based on the regex and type
  const automataData = generateAutomataFromRegex(regex, type);

  // Convert to cytoscape format
  const elements = [
    ...automataData.nodes.map(node => ({ data: node })),
    ...automataData.edges.map(edge => ({ data: edge }))
  ];

  const cy = cytoscape({
    container,
    elements,
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#3B82F6',
          'border-color': '#1E40AF',
          'border-width': 2,
          'color': '#FFFFFF',
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'font-size': '14px',
          'font-weight': 'bold',
          'width': '40px',
          'height': '40px',
        }
      },
      {
        selector: 'node[type="start"]',
        style: {
          'background-color': '#10B981',
          'border-color': '#047857',
        }
      },
      {
        selector: 'node[type="accept"]',
        style: {
          'background-color': '#EF4444',
          'border-color': '#B91C1C',
          'border-width': 4,
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#64748B',
          'target-arrow-color': '#64748B',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'text-rotation': 'autorotate',
          'text-margin-y': -10,
          'color': '#F1F5F9',
          'font-size': '12px',
          'font-weight': 'bold',
        }
      },
      {
        selector: 'edge[type="epsilon"]',
        style: {
          'line-color': '#8B5CF6',
          'target-arrow-color': '#8B5CF6',
          'line-style': 'dashed',
        }
      }
    ],
    layout: {
      name: 'dagre',
      directed: true,
      spacingFactor: 1.5,
      rankDir: 'LR',
      animate: true,
      animationDuration: 500,
    }
  });

  // Add interactivity
  cy.on('tap', 'node', function(evt) {
    const node = evt.target;
    console.log('Node clicked:', node.data());
  });

  cy.on('tap', 'edge', function(evt) {
    const edge = evt.target;
    console.log('Edge clicked:', edge.data());
  });

  return cy;
}

function generateAutomataFromRegex(regex: string, type: string): AutomataData {
  // Start with NFA generation from regex
  const nfa = parseRegexToNFA(regex);
  
  switch (type) {
    case 'nfa':
      return nfa;
    
    case 'dfa':
      return convertNFAToDFA(nfa);
    
    case 'min-dfa':
      const dfa = convertNFAToDFA(nfa);
      return minimizeDFA(dfa);
    
    default:
      return nfa;
  }
}