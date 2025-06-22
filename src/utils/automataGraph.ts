import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Register the dagre layout
cytoscape.use(dagre);

export function createAutomataGraph(
  container: HTMLElement, 
  regex: string, 
  type: 'regex' | 'nfa' | 'dfa' | 'min-dfa'
) {
  // Mock automata data - in a real implementation, this would be generated from the regex
  const automataData = generateMockAutomata(regex, type);

  const cy = cytoscape({
    container,
    elements: automataData,
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

function generateMockAutomata(regex: string, type: string) {
  // This is a simplified mock - real implementation would parse the regex
  const baseNodes = [
    { data: { id: 'q0', label: 'q0', type: 'start' } },
    { data: { id: 'q1', label: 'q1' } },
    { data: { id: 'q2', label: 'q2', type: 'accept' } },
  ];

  const baseEdges = [
    { data: { id: 'e1', source: 'q0', target: 'q1', label: 'a' } },
    { data: { id: 'e2', source: 'q1', target: 'q2', label: 'b' } },
  ];

  // Add complexity based on type
  switch (type) {
    case 'nfa':
      return [
        ...baseNodes,
        { data: { id: 'q3', label: 'q3' } },
        ...baseEdges,
        { data: { id: 'e3', source: 'q0', target: 'q0', label: 'a' } },
        { data: { id: 'e4', source: 'q1', target: 'q3', label: 'ε', type: 'epsilon' } },
      ];
    
    case 'dfa':
      return [
        ...baseNodes,
        ...baseEdges,
        { data: { id: 'e3', source: 'q0', target: 'q0', label: 'a' } },
      ];
    
    case 'min-dfa':
      return [
        { data: { id: 'q0', label: 'q0', type: 'start' } },
        { data: { id: 'q1', label: 'q1', type: 'accept' } },
        { data: { id: 'e1', source: 'q0', target: 'q1', label: 'a*b' } },
      ];
    
    default:
      return [...baseNodes, ...baseEdges];
  }
}