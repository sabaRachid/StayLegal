module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // pour le type-check
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended', // règles TS
    'plugin:react/recommended', // règles React
    'plugin:react-native/all', // règles React Native
    'prettier', // désactive les règles ESLint qui entrent en conflit avec Prettier
    'plugin:prettier/recommended', // affiche les erreurs Prettier en erreurs ESLint
  ],
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Exemple de règles custom
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react-native/no-inline-styles': 'warn',
    'react/prop-types': 'off', // on utilise TS pour les props
  },
};
