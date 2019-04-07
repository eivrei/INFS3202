module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false
      }
    }
  ]
};
