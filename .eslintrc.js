module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard-with-typescript',
    'plugin:import/typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'import/no-cycle': [2, { maxDepth: 2 }],
  },
  plugins: ['@typescript-eslint'],
}
