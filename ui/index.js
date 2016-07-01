/**
 * @fileoverview Utility functions related to the UI.
 */


/**
 * Creates a style element and inserts it into the head of the document.
 * @param {Array.Object} rules A list of rules to insert into the created
 *     style. Rules must contain a `selector` key, and a `declarations` key,
 *     which is a list. Example:
 *     
 *     [{
 *         selector: 'body',
 *         declarations: [
 *             'font-weight: bold',
 *             'color: red'
 *         ]
 *      }].
 * @return {Element} Created style element.
 */
function createStyle(rules) {
  var content = [];
  [].forEach.call(rules, function(rule) {
    var selector = rule.selector;
    var declarations = [];
    rule.declarations.forEach(function(declaration) {
      declarations.push(declaration.replace(/-+$/, ''));
    });
    declarations = declarations.join(';');
    content.push(' ' + selector + ' { ' + declarations + ' }' + ' ');
  });
  content = content.join('');
  var styleEl = document.createElement('style');
  styleEl.textContent = content;
  document.head.appendChild(styleEl);
  return styleEl;
}


module.exports = {
  createStyle: createStyle
};
