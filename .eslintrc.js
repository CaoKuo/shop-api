module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'comma-dangle': ['error', 'always-multiline'],
        'no-console': 'warn',
        indent: ['error', 4],
        semi: ['error', 'always'],
    },
};
