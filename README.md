## Weather Agent Chat InterfaceA
modern, responsive chat interface for interacting with a weather agent API. Built with React, TypeScript, and Tailwind CSS v4.


## Features
- Real-time Streaming Responses - Get weather information as it's generated.
- Dark/Light Theme Toggle - Seamless theme switching with smooth transitions.
- Reaction System - Provide feedback with thumbs up/down on agent responses.
- Share Functionality - Export conversations as text or shareable links.
- Responsive Design - Works perfectly on desktop, tablet, and mobile devices.
- Animated UI - Beautiful animations and transitions throughout.
- Error Handling - Comprehensive error messages and loading states.


## Live Demo
https://weather-chat-agent-lime.vercel.app/


## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn


## Installation and Setup

1. Clone the repository
```
git clone https://github.com/KajweAtharva/weather-chat-agent/
cd weather-chat-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```


## Build for Production
To create a production build:
```
npm run build
```

To preview the production build locally:
```
npm run preview
```


## Project Structure
```
weather-chat-app/
├── public/
│   └── logo.svg                 # Application logo
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Animated background elements
│   │   ├── ChatHeader.tsx            # Header with theme toggle & actions
│   │   ├── ChatInput.tsx             # Message input component
│   │   ├── ChatMessages.tsx          # Message display with reactions
│   │   └── ShareModal.tsx            # Share functionality modal
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   ├── utils/
│   │   └── api.ts                    # Weather agent API integration
│   ├── App.tsx                       # Main application component
│   ├── index.css                     # Global styles & animations
│   └── main.tsx                      # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


## Technologies Used
- React 18 - UI library
- TypeScript - Type safety
- Vite - Fast build tool
- Tailwind CSS v4 - Utility-first CSS framework
- Lucide React - Icon library
- Weather Agent API - Mastra cloud weather agent endpoint

Author - GitHub: @KajweAtharva
Email: kajweatharva@gmail.com


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
