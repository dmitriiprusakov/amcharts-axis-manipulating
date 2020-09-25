module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-config-property-sort-order-smacss'
  ],
  plugins: [
    // "stylelint-no-px"
  ],

  rules: {
    'at-rule-no-unknown': null
    // "meowtec/no-px": [
    //   true,
    //   { ignore: ["font", "border", "margin", "1px", "2px"] }
    // ]
  }
};
