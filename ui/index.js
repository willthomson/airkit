/**
 * @fileoverview Utility functions related to the UI.
 */


/**
 * Creates a style element and inserts it into the head of the document.
 * @param {Object} rules An object containing CSS rules. Example:
 *
 *    {
 *        'body': {
 *            'font-weight': bold',
 *            'color': 'red'
 *        },
 *        'div.hero': {
 *            'font-size': '20px'
 *        }
 *    }
 *
 * @return {Element} Created style element.
 */
function createStyle(rules) {
  var content = [];
  for (var selector in rules) {
      if (!rules.hasOwnProperty(selector)) {
        continue;
      }
      var declarations = rules[selector];
      var declarationsToAdd = [];
      for (var key in declarations) {
        if (!declarations.hasOwnProperty(key)) {
          continue;
        }
        var value = declarations[key];
        declarationsToAdd.push(key + ':' + value);
      }
      content.push(selector + '{' + declarationsToAdd.join(';') + '}');
  }
  content = content.join('');
  var styleEl = document.createElement('style');
  styleEl.textContent = content;
  document.head.appendChild(styleEl);
  return styleEl;
}


module.exports = {
  createStyle: createStyle
};
