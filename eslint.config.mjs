import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import config from '@pixi/extension-scripts/eslint';

export default tseslint.config(config, eslintPluginPrettierRecommended, {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                printWidth: 120,
                tabWidth: 4,
            },
            {
                usePrettierrc: false,
            },
        ],
        '@stylistic/indent': 'off',
        '@stylistic/brace-style': 'off',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error', { allowProtectedClassPropertyAccess: true }],
    },
});
