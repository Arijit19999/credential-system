# React + TypeScript + Vite

> A minimal setup to get **React** working in **Vite** with Hot Module Replacement (HMR) and a set of ESLint rules.

---

## 📦 Available Plugins

Currently, two official plugins are available:

| Plugin | Fast Refresh Engine |
| ------ | ------------------- |
| [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) | [Babel](https://babeljs.io/) — or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown) |
| [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) | [SWC](https://swc.rs/) |

---

## ⚛️ React Compiler

The **React Compiler** is **not enabled** on this template because of its impact on dev and build performance.

To add it, see the [React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

---

## 🔧 Expanding the ESLint Configuration

If you are developing a **production application**, we recommend updating the configuration to enable **type-aware lint rules**:

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

### React-Specific Lint Rules

You can also install [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

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
