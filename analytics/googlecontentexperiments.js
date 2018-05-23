/**
 * @fileoverview Google Content Experiments utility functions.
 */

var objects = require('../utils/objects');
var ui = require('../ui');
var uri = require('../utils/uri');

var defaultConfig = {
  attributeName: 'data-ak-gcx',
  setVariationShown: true,
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
  var variationFromParam = parseInt(uri.getParameterValue(config.parameterName));
  var variation = 0;
  if (variationFromParam && typeof variationFromParam == 'number' || variationFromParam == 0) {
    variation = variationFromParam;
    if (window.cxApi) {
      window.cxApi.setChosenVariation(variation);
    }
  } else if (window.cxApi) {
    variation = window.cxApi.chooseVariation();
  }
  if (config.setVariationShown) {
    setVariationShown(variation, config);
  } else {
    setVariationDataAttribute(variation, config);
  }
}


function setVariationDataAttribute(enabledVariation, config) {
  var attrName = config.attributeName;
  var selector = '[' + attrName + ']';
  var els = document.querySelectorAll(selector);
  if (!els.length) {
    return;
  }
  [].forEach.call(els, function(el) {
    el.setAttribute(attrName, enabledVariation);
  });
}


function setVariationShown(enabledVariation, config) {
  var attrName = config.attributeName;
  var selector = '[' + attrName + ']:not([' + attrName +
        '="' + enabledVariation + '"])';
  var rules = {};
  rules[selector] = {'display': 'none !important'};
  ui.createStyle(rules);
}


module.exports = {
  init: init
};
