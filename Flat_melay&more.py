from graphviz import Digraph

# Sample Mealy Machine input
mealy_machine = {
    'states': ['A', 'B', 'C'],
    'input_symbols': ['0', '1'],
    'transitions': {
        'A': {'0': ('B', 'y'), '1': ('C', 'z')},
        'B': {'0': ('A', 'x'), '1': ('C', 'z')},
        'C': {'0': ('C', 'z'), '1': ('A', 'x')}
    },
    'initial_state': 'A'
}

# Convert to Moore Machine
def convert_to_moore(mealy):
    moore_states = {}
    state_map = {}  # maps (original_state, output) to new Moore state name
    counter = 0

    # Step 1: Generate new states for each unique (state, output)
    for state in mealy['states']:
        for symbol in mealy['input_symbols']:
            next_state, output = mealy['transitions'][state][symbol]
            if (next_state, output) not in state_map:
                new_state = f"{next_state}_{output}"
                state_map[(next_state, output)] = new_state
                moore_states[new_state] = {'output': output, 'transitions': {}}

    # Step 2: Set transitions in the new Moore machine
    for state in mealy['states']:
        for symbol in mealy['input_symbols']:
            next_state, output = mealy['transitions'][state][symbol]
            from_state = None
            # Get current Moore version of source state
            for key, val in state_map.items():
                if key[0] == state:
                    from_state = val
            to_state = state_map[(next_state, output)]
            if from_state:
                moore_states[from_state]['transitions'][symbol] = to_state

    initial_moore_state = None
    for key, val in state_map.items():
        if key[0] == mealy['initial_state']:
            initial_moore_state = val
            break

    return moore_states, initial_moore_state

# Draw Moore Machine
def draw_moore_machine(moore_states, initial_state, filename='moore_machine'):
    dot = Digraph(format='png')
    dot.attr(rankdir='LR')

    for state, data in moore_states.items():
        dot.node(state, f"{state}\n{data['output']}")

    for state, data in moore_states.items():
        for input_symbol, next_state in data['transitions'].items():
            dot.edge(state, next_state, label=input_symbol)

    dot.render(filename, cleanup=True)
    print(f"Moore machine diagram saved as {filename}.png")

# === Main ===
moore_machine, moore_initial = convert_to_moore(mealy_machine)
draw_moore_machine(moore_machine, moore_initial)
