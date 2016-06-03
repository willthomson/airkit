/**
 * @fileoverview Google Content Experiments utility functions.
 */

var objects = require('../utils/objects');
var uri = require('../utils/uri');

var initted = false;

var defaultConfig = {
  attributeName: 'data-ak-gcx',
  parameterName: 'variation'
};


/**
 * Loads GCX library and then initializes variations.
 * @param {string} experimentId GCX experiment ID.
 */
function init(experimentId, opt_config) {
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }

  if (initted) {
    return;
  }

  // By default, experimented elements are hidden.
  var styleEl = document.createElement('style');
  styleEl.textContent = '[' + config.attributeName + '] { display: none !important }';
  document.getElementsByTagName('head')[0].appendChild(styleEl);

  if (window.cxApi) {
    initVariations(config);
  } else {
    var scriptEl = document.createElement('script');
    scriptEl.src = '//www.google-analytics.com/cx/api.js?experiment=' + experimentId;
    document.getElementsByTagName('head')[0].appendChild(scriptEl);
    scriptEl.onload = function() {
      initVariations(config);
    };
  }
  initted = true;
}


function setVariationShown(chosenVariationId, config) {
  var els = document.querySelectorAll('[' + config.attributeName + ']');
  [].forEach.call(els, function(el) {
    var eachVariationId = el.getAttribute(config.attributeName);
    var enabled = eachVariationId == chosenVariationId;
    if (enabled) {
      el.setAttribute(config.attributeName + '--active', eachVariationId);
      el.removeAttribute(config.attributeName);
    }
  });
}


function initVariations(config) {
  var variationFromParam = uri.getParameterValue(config.parameterName);
  if (variationFromParam) {
    var variation = variationFromParam;
  } else {
    var variation = window.cxApi.chooseVariation();
  }
  setVariationShown(variation, config);
}


module.exports = {
  init: init
};
