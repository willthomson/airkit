/**
 * @fileoverview Creates a YouTube player in a modal.
 */

var classes = require('../utils/classes');
var dom = require('../utils/dom');
var events = require('../utils/events');
var objects = require('../utils/objects');
var useragent = require('../utils/useragent');


var initted = false;
var player = null;
var defaultConfig = {
  useHandlerOnMobile: true,
  history: false,
  historyNamePrefix: 'video:',
  transitionDuration: 300,
  className: 'ak-youtubemodal',
  playerVars: {
    'autohide': 1,
    'autoplay': 1,
    'fs': 1,
    'modestbranding': 1,
    'rel': 0,
    'showinfo': 0,
    'iv_load_policy': 3
  }
};


/**
 * Plays a YouTube video in a modal dialog.
 * @constructor
 */
function YouTubeModal(config) {
  this.config = config;
  this.initDom_();

  var func = function(targetEl) {
    var data = 'data-' + this.config.className + '-video-id';
    var videoId = targetEl.getAttribute(data);
    if (videoId) {
      this.play(videoId);
    }
  }.bind(this);

  // Loads YouTube iframe API.
  events.addDelegatedListener(document, 'click', func);
  var tag = document.createElement('script');
  tag.setAttribute('src', 'https://www.youtube.com/iframe_api');
  document.body.appendChild(tag);
}


/**
 * Creates the DOM for the YouTube modal.
 * @private
 */
YouTubeModal.prototype.initDom_ = function() {
  var createDom = dom.createDom;
  var el = createDom('div', this.config.className);
  var closeEl = createDom('div', this.config.className + '-x');
  el.appendChild(closeEl);
  el.appendChild(createDom('div', this.config.className + '-player'));
  el.appendChild(createDom('div', this.config.className + '-mask'));
  document.body.appendChild(el);
  closeEl.addEventListener('click', function() {
    this.setActive_(false);
  }.bind(this));

  if (this.config.history) {
    window.addEventListener('popstate', this.onHistoryChange_.bind(this));
  }
};


/**
 * Sets the modal's visibility.
 * @param {Boolean} enabled Whether the modal should be visible.
 */
YouTubeModal.prototype.setVisible = function(enabled) {
  // Plays or pauses depending on visibility.
  if (player) {
    // Delay call to give player time to load.
    window.setTimeout(function() {
      if (enabled) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }, 100);
  }

  var _keyToggle = function(e) {
    if (e.keyCode == 27) {
      this.setActive_(false);
      document.body.removeEventListener('keydown', _keyToggle);
    }
  }.bind(this);

  if (enabled) {
    document.body.addEventListener('keydown', _keyToggle);
  } else {
    document.body.removeEventListener('keydown', _keyToggle);
  }

  var lightboxEl = document.querySelector('.' + this.config.className);
  window.setTimeout(function() {
    classes.enable(lightboxEl, this.config.className + '--enabled', enabled);
  }.bind(this), enabled ? 0 : this.config.transitionDuration);
  window.setTimeout(function() {
    classes.enable(lightboxEl, this.config.className + '--visible', enabled);
  }.bind(this), enabled ? this.config.transitionDuration : 0);
};


/**
 * Sets whether the modal is active (and thus visible and playing). Handles history state if applicable.
 * @param {Boolean} active Whether the modal is active.
 * @param {=string} opt_videoId Video ID to use in the history hash.
 * @param {=Boolean} opt_updateState Whether to update the history state.
 * @private
 */
YouTubeModal.prototype.setActive_ = function(active, opt_videoId, opt_updateState) {
  if (!this.config.history) {
    this.setVisible(active);
    return;
  }

  this.setVisible(active);
  if (opt_updateState === false) {
    return;
  }
  var videoId = opt_videoId || this.activeVideoId_;
  if (active) {
    window.history.pushState(
        {'videoId': videoId}, '',
        '#' + this.config.historyNamePrefix + videoId);
  } else {
    window.history.pushState(
        {'videoId': null}, '', window.location.pathname);
  }
};


/**
 * Callback for changes to the history state.
 * @param {Event} e Pop state event.
 * @private
 */
YouTubeModal.prototype.onHistoryChange_ = function(e) {
  if (e.state && e.state['videoId']) {
    this.play(e.state['videoId'], false);
  } else {
    this.setVisible(false);
  }
};


/**
 * Plays a YouTube video.
 * @param {string} videoId Video ID to play.
 * @param {=Boolean} opt_updateState Whether to update the history state.
 */
YouTubeModal.prototype.play = function(videoId, opt_updateState) {
  var useHandler = (
      this.config.useHandlerOnMobile
      && (useragent.isIOS() || useragent.isAndroid()));

  if (useHandler) {
    window.location.href = 'https://m.youtube.com/watch?v=' + videoId;
    return;
  }

  this.setActive_(true, videoId, opt_updateState);
  if (player && videoId == this.activeVideoId_) {
    return;
  } else if (player && videoId != this.activeVideoId_) {
    player.loadVideoById(videoId, 0, 'large');
    this.activeVideoId_ = videoId;
    return;
  }
  var playerEl = document.querySelector('.' + this.config.className + '-player');
  var options = {
    'videoId': videoId,
    'playerVars': objects.clone(this.config.playerVars)
  };
  player = new YT.Player(playerEl, options);
  this.activeVideoId_ = videoId;
}


/**
 * Initializes a YouTube modal dialog singleton.
 * @param {Object=} opt_config Config options.
 */
function init(opt_config) {
  if (initted) {
    return;
  }
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }

  new YouTubeModal(config);
  initted = true;
}


module.exports = {
  init: init
};
