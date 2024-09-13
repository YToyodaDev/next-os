import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['./dist'],
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);
