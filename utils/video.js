/**
 * @fileoverview Utility functions related to videos.
 */

var ui = require('./ui');
var useragent = require('./useragent');


var defaultConfig = {
  videoAttributeName: 'data-ak-video-fallback'
};


/**
 * Shows or hides video elements and their corresponding image elements
 * depending on whether the user agent can play video.
 *
 * Fallback is only implemented between video and images, not video formats.
 * You should rely on the video element's default behavior with <source> tags
 * to support fallback between video formats. As a result, you should probably
 * always include at least a mp4 video, as mp4 is the most compatible.
 *
 * This is opinionated and will not enable video for mobile devices.
 *
 * (1) Set up a DOM structure:
 *
 *   <div data-ak-video-fallback>
 *     <video>...</video>
 *     <img>
 *   </div>
 *
 * (2) Run at the top of the page (to avoid FOUC):
 *
 *   initVideoFallback();
 */
function initVideoFallback(opt_attributeName) {
  var videoAttributeName = opt_attributeName || defaultConfig.videoAttributeName;
  var videoEl = document.createElement('video');
  var canPlayVideo = Boolean(videoEl.canPlayType) && !useragent.isMobile();
  var videoSelector = '[' + videoAttributeName + '] video';
  var imageSelector = '[' + videoAttributeName + '] img';
  var hidden = 'display: none !important';
  var styles = [];
  if (canPlayVideo) {
    styles.push([imageSelector, hidden]);
  } else {
    styles.push([videoSelector, hidden]);
  }
  ui.createStyle(styles);
}


module.exports = {
  initVideoFallback: initVideoFallback
};
