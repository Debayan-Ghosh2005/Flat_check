from graphviz import Digraph

# Sample Moore Machine input (can be replaced with your own)
moore_machine = {
    'states': ['A', 'B', 'C'],
    'input_symbols': ['0', '1'],
    'transitions': {
        'A': {'0': 'B', '1': 'C'},
        'B': {'0': 'A', '1': 'C'},
        'C': {'0': 'C', '1': 'A'}
    },
    'output': {
        'A': 'x',
        'B': 'y',
        'C': 'z'
    },
    'initial_state': 'A'
}

# Convert to Mealy Machine
def convert_to_mealy(moore):
    mealy_transitions = {}
    for state in moore['states']:
        mealy_transitions[state] = {}
        for symbol in moore['input_symbols']:
            next_state = moore['transitions'][state][symbol]
            output = moore['output'][next_state]  # output of destination state
            mealy_transitions[state][symbol] = (next_state, output)
    return mealy_transitions

# Draw Mealy Machine
def draw_mealy_machine(mealy_transitions, filename='mealy_machine'):
    dot = Digraph(format='png')
    dot.attr(rankdir='LR')

    for state in mealy_transitions:
        dot.node(state)

    for state in mealy_transitions:
        for input_symbol in mealy_transitions[state]:
            next_state, output = mealy_transitions[state][input_symbol]
            label = f"{input_symbol}/{output}"
            dot.edge(state, next_state, label=label)

    dot.render(filename, cleanup=True)
    print(f"Mealy machine diagram saved as {filename}.png")

# Main process
mealy_machine = convert_to_mealy(moore_machine)
draw_mealy_machine(mealy_machine)