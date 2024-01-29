# Setup

## Initializing Project

```
npm create vite@latest my-app -- --template react-ts
cd my-app
git init
npm i
```

## Testing Library

Simple and complete testing utilities that encourage good testing practices.

```
npm install vitest @vitest/ui --save-dev
```

`package.json`

```json
...
  "scripts": {
    ...
    "test": "vitest run",
    "test:ui": "vitest --ui",
    "test:watch": "vitest"
  },
...
```

```
npm install jsdom --save-dev
npm install @testing-library/jest-dom @testing-library/react --save-dev
```

`testSetup.ts`

```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

`vite.config.ts`

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.ts',
  },
});
```

`src/App.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('should work as expected', async () => {
    render(<App />);

    const buttonElement = screen.getByText(
      /Click on the Vite and React logos to learn more/i,
    );

    expect(buttonElement).toBeInTheDocument();
  });
});
```

## ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

```
npm i -D eslint eslint-plugin-react @typescript-eslint/eslint-plugin eslint-plugin-jsx-a11y
```

`.eslintrc.cjs`

```cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // !
    '@typescript-eslint/no-extra-non-null-assertion': 'off', // !!
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'no-async-promise-executor': 'off',
    'no-extra-boolean-cast': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

`.eslintignore`

```
# don't ever lint node_modules
node_modules
node_modules/*

# don't lint build output (make sure it's set to your correct build folder name)
dist
build

# don't lint nyc coverage output
coverage
src/serviceWorker.ts
```

`package.json`

```json
...
  "scripts": {
    ...
    "lint:fix": "eslint '*/**/*.{js,ts,tsx}' --fix",
    "lint": "eslint '*/**/*.{js,ts,tsx}'"
  },
...
```

## Prettier

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

```
npm i -D prettier
```

`.prettierrc`

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all"
}
```

`.prettierignore`

```
build
dist
coverage
```

`package.json`

```json
...
  "scripts": {
    ...
    "tidy": "prettier '*/**/*.{js,ts,tsx,json,md,html}' --write"
  },
...
```

## lint-staged

Run linters **against staged Git files** and don't let 💩 slip into your code base!

```
npm i -D lint-staged
```

`package.json`

```json
...
  "lint-staged": {
    "*.{js,ts,tsx,json,md,html}": [
      "prettier --write"
    ]
  }
...
```

## Husky

Husky is a package that allows custom scripts to be ran against your Git repository. These scripts trigger actions in response to specific events, so they can help you automate your development lifecycle.

```
npm i -D husky
npm pkg set scripts.prepare="husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged && npm run lint && npx vitest --watch=false --silent --passWithNoTests"
```

## commitlint

commitlint checks if your commit messages meet the conventional commit format.

```
npm install --save-dev @commitlint/{config-conventional,cli}
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

`commitlint.config.cjs`

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

## Absolute Imports

Absolute imports should always be configured and used because it makes it easier to move files around and avoid messy import paths such as `../../../Component`. Wherever you move the file, all the imports will remain intact.

`tsconfig.json`

```json
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  ...
}
```

`vite.config.ts`

```ts
...
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
```

## References

- [Vite - Getting Started](https://vitejs.dev/guide/)
- [npm - scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [Vitest - Getting Started](https://vitest.dev/guide/)
- [Testing Library - React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [npm - eslint](https://www.npmjs.com/package/eslint)
- [npm - prettier](https://www.npmjs.com/package/prettier)
- [Using Prettier and ESLint to automate formatting and fixing JavaScript](https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/#managing-eslint-rules-avoid-conflict-prettier)
- [npm - lint-staged](https://www.npmjs.com/package/lint-staged)
- [npm - husky](https://www.npmjs.com/package/husky)
- [git - Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Altlassian - Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitHub - commitlint](https://github.com/conventional-changelog/commitlint)
- [GitHub - Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-configuration.md#absolute-imports)
