var datetoggle = require('../dates/datetoggle');
var objects = require('../utils/objects');
var uri = require('../utils/uri');


var defaultConfig = {
  applyCacheBuster: true,
  evergreen: false,
  nowParameterName: 'ak-now',
  prodParameterName: 'ak-dynamicdata-prod'
};


var _cacheBuster = (new Date()).getTime();
var _xhrCache = _xhrCache || {};


function _xhr(url, cb) {
  if (url in _xhrCache) {
    return cb(_xhrCache[url]);
  }
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.addEventListener('load', function() {
    var text = req.responseText;
    var result = JSON.parse(text);
    _xhrCache[url] = result;
    cb(result);
  });
  req.send();
};


/**
 * Normalizes staging data to become the same format as prod data.
 */
function processStagingResp(resp, now, evergreen, opt_locale) {
  var keysToData = {};
  for (var key in resp) {
    [].forEach.call(resp[key], function(datedRow) {
      if (opt_locale) {
        if (opt_locale.toLowerCase() != datedRow['locale'].toLowerCase()) {
          return;
        }
      }
      var start =  datedRow['start_date'] ? new Date(datedRow['start_date']) : null;
      var end = datedRow['end_date'] ? new Date(datedRow['end_date']) : null;
      if (evergreen) {
        var isEnabled = datetoggle.isEnabledNow(start, null, now);
      } else {
        var isEnabled = datetoggle.isEnabledNow(start, end, now);
      }
      if (isEnabled) {
        keysToData[key] = datedRow;
      }
    });
  }
  return keysToData;
}


function get(userConfig, opt_locale) {
  var config = objects.clone(defaultConfig);
  objects.merge(config, userConfig);
  var dateFromParam = uri.getParameterValue(config.nowParameterName);
  var now = dateFromParam ? new Date(dateFromParam) : new Date();
  var isProd = true;
  var isProdFromParam = uri.getParameterValue(config.prodParameterName);
  var evergreen = config['evergreen'];
  var file = config['file'];
  var url = file['prod'];
  if (!isProdFromParam && 'staging' in file && file['staging']) {
    isProd = false;
    url = file['staging'];
  }
  if (config.applyCacheBuster) {
    url = url + '?cb=' + _cacheBuster;
  }
  return new Promise(function(resolve, reject) {
    _xhr(url, function(resp) {
      if (!isProd) {
        resp = processStagingResp(resp, now, evergreen, opt_locale);
      }
      resolve(resp);
    });
  });
}


module.exports = {
  get: get
};
