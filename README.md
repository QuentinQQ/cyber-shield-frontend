# 🌐 World We Created

A youth-focused, interactive web platform designed to protect teenagers from **cyberbullying** through immersive storytelling, scenario-based decision-making, and real-time feedback.

> ✊ Empowering awareness. 🛡️ Encouraging action. 💬 Changing conversations.

---

## 📋 Table of Contents
1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Links](#links)
6. 🚀 [Code Structure & Architecture](#code-structure--architecture)
7. 🚀 [More](#more)

---

## 🤖 Introduction

[🌍 Visit the site](https://worldwecreated.org/)

**World We Created** is an interactive educational platform aiming to raise awareness of online bullying through immersive storytelling, scenario branching, and emotional engagement. Built with performance and modularity in mind, this is the **frontend repository** of the project.

---

## ⚙️ Tech Stack

- ⚡️ [Vite](https://vitejs.dev/) – Fast build tool
- ⚛️ [React](https://react.dev/) – Component-based UI library
- 🧠 [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- 💎 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- 🎞️ [React Player](https://github.com/cookpete/react-player) – Rich media player integration
- 🧩 Modular architecture with reusable components

---

## 🔋 Features

- 📺 **Scenario-Based Gameplay** – Users experience branching paths with choices.
- 💬 **Comment Evaluation** – Like/dislike comments with real-time feedback.
- 📊 **Interactive Feedback** – Visual stats, score summaries, and performance insights.
- 📱 **Responsive UI** – Optimized across devices using Tailwind CSS.
- 🧠 **AI Integration (via backend)** – Sentiment & bullying detection feedback.

---

## 🤸 Quick Start

### 🧰 Prerequisites

- Node.js >= 18
- npm or yarn

### 📦 Cloning the Repository

```bash
git clone https://github.com/QuentinQQ/cyber-shield-frontend.git
```
```bash
cd worldwecreated-frontend
```
### 📥 Installation
```bash
npm install
# or
yarn install
```
### 🔐 Set Up Environment Variables
```
VITE_API_BASE_URL=https://your-api-url.com
VITE_AI_TOKEN=your-token-here
```

### ▶️ Running the Project
```
npm run dev
# or
yarn dev
```
App will be served at: http://localhost:5173


## 🔗 Links

[🌍 Demo site](https://worldwecreated.org/)

## 🚀 Code Structure & Architecture
The project follows the MVVM (Model–View–ViewModel) architectural pattern to ensure a clear separation of concerns and maintainable codebase.

```
📁 src/
 ┣ 📂assets          # Static assets (images, audio, icons, etc.)
 ┣ 📂components      # Reusable UI components (buttons, overlays, etc.)
 ┣ 📂data            # Store the simple fixed data website used
 ┣ 📂pages           # Page-level components corresponding to routes
 ┣ 📂hooks           # ViewModels for managing UI logic and state
 ┣ 📂services        # API calls, utilities, and backend interaction logic
 ┣ 📂types           # TypeScript types and interfaces
 ┣ 📂hooks           # Custom hooks for state and effect management
 ┗ 📂utils           # Common logic processing method
📜 App.tsx
📜 main.tsx
📜 .env
```
### 🧩 Key Folder Roles

* **`assets/`**
  Static content like logos, background images, videos, and sound effects.

* **`components/`**
  Stateless UI elements used across pages (e.g., `PrimaryButton`, `OptionCard`).

* **`data/`**
  Static JSON/config-like data. For example: scenario graph, feedback text, labels.

* **`pages/`**
  Top-level views like `HomePage`, `GamePage`, `ResultPage`. Each corresponds to a route.

* **`hooks/`**
  Serves as the **ViewModel** layer in MVVM. Includes logic like scenario progression, comment evaluation, etc.

* **`services/`**
  Encapsulates all **Model** interactions. Handles API communication (e.g., `getComments`, `submitResult`).

* **`types/`**
  Stores global types/interfaces (e.g., `Comment`, `ScenarioNode`, `APIResponse`).

* **`utils/`**
  Reusable logic tools (e.g., `calculateScore`, `formatTime`, `shuffleArray`).

---

### 🧱 Entry Files

* **`App.tsx`**
  Main app component. Defines the high-level structure and routing using `React Router`.

* **`main.tsx`**
  App bootstrap. Initializes the React app and renders `<App />` to the DOM.

* **`.env`**
  Contains sensitive and configurable variables (e.g., `VITE_API_BASE_URL`, `VITE_AI_TOKEN`).
---