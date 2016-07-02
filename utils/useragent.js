/**
 * @fileoverview Utility functions related to the user agent.
 */


function isMobile() {
  return isIOS() || isAndroid();
}


function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}


function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}


function isIE() {
  return /MSIE\/\d+/.test(navigator.userAgent);
}


function isIEorEdge() {
  return /Edge\/\d+/.test(navigator.userAgent) ||
      /MSIE\/\d+/.test(navigator.userAgent) ||
      /Trident\/\d+/.test(navigator.userAgent);
}


module.exports = {
  isAndroid: isAndroid,
  isIOS: isIOS,
  isIE: isIE,
  isIEorEdge: isIEorEdge,
  isMobile: isMobile
};
