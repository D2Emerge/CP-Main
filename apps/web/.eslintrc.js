module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
    'react-hooks',
    'import',
  ],
  ignorePatterns: [
    '.next/',
    'out/',
    'node_modules/',
    'public/',
    'src/api/generated/',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  rules: {
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-debugger': 'error',
    'no-shadow': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^next'],
          ['^@?\\w'],
          ['^(@code-project)(/.*|$)'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*', './../*'],
            message: 'Please use absolute import with @ instead',
          },
          {
            group: ['src/assets/images/*', 'src/assets/icons/*'],
            message: 'Import assets through the assets index file',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{test,spec}.{js,ts,jsx,tsx}', '**/*.e2e.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [
        '*.config.{js,ts}',
        'next.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
