import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['{src,tests}/**/*.{ts,tsx}'],

        plugins: {
            prettier: prettierPlugin,
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],

        rules: {
            'no-unused-vars': ['warn'],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    {
        files: ['{src,tests}/**/*.{ts,tsx}'],

        extends: [tseslint.configs.recommendedTypeChecked],

        languageOptions: {
            parserOptions: {
                project: './tsconfig.app.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
        },
    },
]);
