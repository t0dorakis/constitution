import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        myCustomGlobal: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn'],
      semi: ['warn', 'never'],
    },
    extends: ['prettier'],
  },
]
