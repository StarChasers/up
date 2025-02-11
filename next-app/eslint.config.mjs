import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    plugins: ['import', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          bracketSpacing: true,
          jsxSingleQuote: true,
          printWidth: 80,
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'lf',
          parser: 'typescript',
        },
      ],
      'import/order': [
        'error',
        {
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
    },
  }),
]

export default eslintConfig
