module.exports = {
  env: {
    browser: true,
    // node: true,
    es6: true,
    jest: true
  },
  plugins: ["simple-import-sort"],
  extends: [
    "airbnb-typescript",
  ],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules:  {
    // "ter-indent": [2, {"FunctionDeclaration": {"parameters": "first"}}],

    "sort-imports": "off",
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": "off",
    "simple-import-sort/sort": "warn",
    "max-classes-per-file": 0,

    "react/jsx-props-no-spreading": 0,
    "react/destructuring-assignment": 0,
    "react-a11y-event-has-role": 0,
    "react-a11y-anchors": 0,

    "no-underscore-dangle": 0,
    "no-restricted-syntax": [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      }, {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      }
    ]
  }
}
