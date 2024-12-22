import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'build'] },
  {
    env: {
      node: true,
      es2020: true,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      security,
    },
    rules: {
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/test/**', '**/tests/**'] },
      ],
      'no-use-before-define': ['error', { functions: false }],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
      'import/prefer-default-export': 'off',
      'callback-return': 'error',
      'handle-callback-err': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'security/detect-eval-with-expression': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-child-process': 'warn',
      'security/detect-object-injection': 'warn',
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
    },
  }
);
