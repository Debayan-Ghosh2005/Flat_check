# ⚙️ Regex to Automata Visualizer

[![Netlify Status](https://api.netlify.com/api/v1/badges/c4b07c15-f78e-4836-b552-c999505d9cca/deploy-status)](https://app.netlify.com/projects/flat-pro/deploys)  
🔗 **Live Demo**: [https://flat-pro.netlify.app/](https://flat-pro.netlify.app/)

A sleek, modern, and interactive web application to visualize the transformation of **regular expressions** into **finite automata** (NFA, DFA, Minimized DFA).  
This is a **frontend-only tool** built with `React.js`, designed to be educational and developer-friendly with live graph simulation and advanced UI.

---

## 🚀 Features

### 🖊️ Regex Input Panel
- Code-style editor with **syntax highlighting** and **live validation**
- Built-in **examples dropdown** (e.g., `a*b|c`, `(a|b)*abb`)
- Uses **JetBrains Mono / Fira Code** for a developer-focused experience

### 🔄 Automata Conversion
- Convert:
  - `Regex ➜ NFA` (Thompson’s Construction)
  - `NFA ➜ DFA`
  - `DFA ➜ Minimized DFA`
- View transitions in:
  - 🧮 **Tabular form**
  - 📈 **Graphical diagram**

### 🧠 Learn Panel
- Step-by-step explanation of:
  - Regex ➜ NFA ➜ DFA ➜ Minimized DFA
- Visual learning with tooltips and diagrams

### 🕹️ Simulate
- Input test strings (e.g., `aab`, `abb`)
- **Live state transition** animations
- Highlighting current state as input progresses

### ⚡ Optimize
- Suggestions for **regex simplification**
- Preview of equivalent minimized automaton

### 🧾 Export Options
- 📤 Export graph as **PNG / SVG**
- 💾 Download **JSON / DOT** representations of automata

---

## 🖼️ Screenshots

![App Screenshot](./2085e977-e8cb-4c83-b02b-89f9c56d6f80.png)

---

## 🎨 Design Highlights

- 🌓 Dark Mode toggle
- 🧊 Glassmorphism / Neumorphism panels
- 🎞️ Smooth animations with Framer Motion
- 📱 Responsive UI for mobile & desktop
- 🧭 Sidebar navigation with Lucide icons

---

## 📡 API (Internal)

- `/convert/regex-to-nfa`: Transforms regex into NFA
- `/convert/nfa-to-dfa`: Transforms NFA into DFA
- `/minimize/dfa`: Returns minimized DFA
- `/simulate`: Runs string simulation on given automaton

*(These are internal JS modules, not exposed via network)*

---

## 🧩 Tech Stack

| Category       | Stack                     |
|----------------|---------------------------|
| Framework      | React.js + Vite           |
| Styling        | TailwindCSS               |
| Animations     | Framer Motion             |
| Graph Library  | cytoscape.js              |
| Fonts          | Fira Code / JetBrains Mono|
| Icons          | Lucide / Feather Icons    |

---

## 🧠 App Sections

- 🧠 **Learn** – Theory with visual diagrams
- ✍️ **Build** – Enter regex and generate automata
- 🎮 **Simulate** – Input strings and watch transitions
- ⚡ **Optimize** – Regex rewriting and efficiency tips
- 📁 **Export** – Download automata graphs and tables


---

## 📜 License  
This project is open-source under the MIT License.  
[View License](LICENSE)

---

## 🤝 Contributing  
Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.


---

## ✨ Author  
Made with 💻 by Debayan Ghosh  
[GitHub](https://github.com/debayan-ghosh) | [LinkedIn](https://www.linkedin.com/in/debayan-ghosh)
