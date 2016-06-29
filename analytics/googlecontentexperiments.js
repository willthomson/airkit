/**
 * @fileoverview Google Content Experiments utility functions.
 */

var objects = require('../utils/objects');
var ui = require('../utils/ui');
var uri = require('../utils/uri');

var defaultConfig = {
  attributeName: 'data-ak-gcx',
  parameterName: 'variation'
};


/**
 * Loads GCX library and then initializes variations.
 */
function init(opt_config) {
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }
  initVariations(config);
}


function initVariations(config) {
  var variationFromParam = uri.getParameterValue(config.parameterName);
  var variation = 0;
  if (variationFromParam) {
    variation = variationFromParam;
    if (window.cxApi) {
      window.cxApi.setChosenVariation(variation);
    }
  } else if (window.cxApi) {
    variation = window.cxApi.chooseVariation();
  }
  setVariationShown(variation, config);
}


function setVariationShown(enabledVariation, config) {
  var attrName = config.attributeName;
  var selector = '[' + attrName + ']:not([' + attrName +
        '="' + enabledVariation + '"])';
  var value = 'display: none !important';
  var items = [[selector, value]];
  ui.createStyle(items);
}


module.exports = {
  init: init
};
