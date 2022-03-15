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
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json' 
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "import/extensions": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-shadow": "off",
    "no-new": "off",
    "class-methods-use-this": "off",
    "semi-style": ["error", "last"],
    "semi": "error"
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