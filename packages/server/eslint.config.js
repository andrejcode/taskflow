import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        es2020: true,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      security: eslintPluginSecurity,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'import/extensions': 'off',
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
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
    },
  }
);
