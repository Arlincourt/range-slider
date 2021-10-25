module.exports = {
  env: {
    es6: true,
    jquery: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json' 
  },
  plugins: ['@typescript-eslint'],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "import/extensions": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-shadow": "off",
    "no-new": "off",
  },
  settings: {
    'import/resolver': {
      node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
      },
  },
  }
};