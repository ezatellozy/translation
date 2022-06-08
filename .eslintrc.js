module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-confusing-v-for-v-if': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/this-in-template': 'off',
    'vue/attributes-order': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/order-in-components': 'off',
    'vue/no-template-shadow': 'off',
  },
}
