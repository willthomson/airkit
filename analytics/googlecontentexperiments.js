/**
 * @fileoverview Google Content Experiments utility functions.
 */

var objects = require('../utils/objects');
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
  var styleEl = document.createElement('style');
  styleEl.textContent = '[' + attrName + ']:not([' + attrName +
        '="' + enabledVariation + '"]) { display: none !important }';
  document.getElementsByTagName('head')[0].appendChild(styleEl);
}


module.exports = {
  init: init
};
