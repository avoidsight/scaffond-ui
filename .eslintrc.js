// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    "parser": "babel-eslint"
  },
  rules: {
    'no-irregular-whitespace': 0,
    'vue/multi-word-component-names': 0,
    'no-debugger': 0,
    'no-unused-vars': 0,
    'vue/return-in-computed-property': 0,
    'no-undef': 0,
    'require-atomic-updates': 0,
    'no-unreachable': 0,
    'vue/valid-v-for': 0,
    'vue/require-valid-default-prop': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'no-dupe-keys': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-empty': 0,
    'no-useless-escape': 0,
    'no-unused-labels': 0,
    'vue/no-mutating-props': 0,
    'no-extra-semi': 0,
    'vue/no-mutating-props': 0,
    'no-prototype-builtins': 0,
    'vue/require-prop-type-constructor': 0
  } // 用来自定义一些符合个人或者团队的规则
}