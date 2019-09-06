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


function isChrome() {
  return navigator.userAgent.indexOf('Chrome') != -1 && !isEdge();
}


function isSafari() {
  return !isChrome() && navigator.userAgent.indexOf('Safari') != -1;
}


function isFirefox() {
  return navigator.userAgent.indexOf('Firefox') != -1;
}


function isIE() {
  return /MSIE\/\d+/.test(navigator.userAgent);
}


function isEdge() {
  return navigator.userAgent.indexOf('Edge') != -1;
}


function isIEorEdge() {
  return /Edge\/\d+/.test(navigator.userAgent) ||
      /MSIE\/\d+/.test(navigator.userAgent) ||
      /Trident\/\d+/.test(navigator.userAgent);
}


module.exports = {
  isAndroid: isAndroid,
  isChrome: isChrome,
  isEdge: isEdge,
  isFirefox: isFirefox,
  isIOS: isIOS,
  isIE: isIE,
  isIEorEdge: isIEorEdge,
  isMobile: isMobile,
  isSafari: isSafari
};
