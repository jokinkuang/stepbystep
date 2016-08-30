/*!
 * PageCache v0.01
 *
 * Released under the MIT license, powered By jQuery
 *
 * JokinKuang
 * 2016-08-08
 */
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("PageCache requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
    // Pass this if window is not defined yet
    // Jokin: upper factory === function(window, noGlobal), if noGlobal is false
    // means this Object is Global which can access by window.$PC or $PC or PageCache
    // if noGlobal is true means PageCache is one part of other modules
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var Log = {
      DEBUG: 2,
      INFO: 1,
      ERROR: 0,
      level: 1,
      owner: "[PageCache]",
      _log: function(level, info) {
        if (Log.level >= level && console) {
          console.log(info);
        }
      },
      error: function(info, obj) {
        if (typeof(info) === 'string') {
          //none
        } else {
          obj = info;
          info = "";
        }
        Log._log(Log.ERROR, Log.owner + "[ERROR]>>" + info);
        if (obj) {
          Log._log(Log.ERROR, obj);
        }
      },
      info: function(info, obj) {
        if (typeof(info) === 'string') {
          //none
        } else {
          obj = info;
          info = "";
        }
        Log._log(Log.INFO, Log.owner + "[INFO]>>" + info);
        if (obj) {
          Log._log(Log.INFO, obj);
        }
      },
      debug: function(info, obj) {
        if (typeof(info) === 'string') {
          //none
        } else {
          obj = info;
          info = "";
        }
        Log._log(Log.DEBUG, Log.owner + "[DEBUG]>>" + info);
        if (obj) {
          Log._log(Log.DEBUG, obj);
        }
      }
  };

  // Copryright
  Log.info("/* PageCache v0.01 Released under MIT license by JokinKuang @2016 */");

  // Object Init
  var PageCache = function(url, isForce, callback, errCallback) {
    // $PC() or $PC("")
    if (! url) {
      return this;
    }

    // $PC("url", callback) or $PC("url", callback, errCallback)
    if (typeof(isForce) === 'function' && typeof(callback) === 'function') {
        errCallback = callback;
    }
    if (typeof(isForce) === 'function') {
        callback = isForce;
    }

    // $PC("url") or $PC("url", false) or $PC("url", callback)
    if (typeof(isForce) === 'function' || ! isForce) {
      isForce = false;
    }

    // Get From PageCache
    if (! isForce) {
      if (PageCache.cache[url] && PageCache.cache[url].state == 1) {
        Log.debug("cache hit: " + url);
        if (callback) {
          callback(PageCache.cache[url]);
        }
        return this;
      }
      if (PageCache.cache[url] && PageCache.cache[url].state == 0) {
        Log.debug("cache hit but still requesting: " + url);
        if (callback) {
          PageCache.cache[url].funs.push(callback);
        }
        if (errCallback) {
          PageCache.cache[url].errFuns.push(errCallback);
        }
        return this;
      }
      Log.debug("cache Not hit: " + url)
    }

    // new CacheData
    PageCache.cache[url] = new CacheData(url, callback, errCallback);

    // Run
    if (url.search('callback=?') < 0) {
      PageCache.fn.doAjax(url);
    } else {
      PageCache.fn.doJsonp(url);
    }
  }

  // Cache Structure
  PageCache.cache = {
  };
  function CacheData(url, func, errFunc){
    this.url = url;
    this.funs = [];
    if (func) {
      this.funs.push(func);
    };
    this.errFuns = [];
    if (errFunc) {
      this.errFuns.push(errFunc);
    }
    this.type = "";
    this.state = 0;
    this.response = "";
    this.json = {};
    this.xmlhttp = {};
    this.jsonp = {};
    this.update = function(options) {
      if (options.type) { this.type = options.type; }
      if (options.state) { this.state = options.state; }
      if (options.response) { this.response = options.response; }
      if (options.json) { this.json = options.json; }
      if (options.xmlhttp) { this.xmlhttp = options.xmlhttp; }
      if (options.jsonp) { this.jsonp = options.jsonp; }
    };
    this.successCall = function() {
      Log.debug("successCall>>", this);
      for (var i in this.funs) {
        if (this.funs[i]) {
          if (this.type === 'json') {
            this.funs[i](this.json, this.state, this.xmlhttp);
          } else if (this.type === 'jsonp') {
            this.funs[i](this.json, this.state, this.jsonp);
          }
        }
      }
    };
    this.errorCall = function() {
      Log.debug("errorCall>>", this);
      for (var i in this.errFuns) {
        if (this.errFuns[i]) {
          if (this.type === 'json') {
            this.errFuns[i](this.state, this.xmlhttp);
          } else if (this.type === 'jsonp') {
            this.errFuns[i](this.state, this.jsonp);
          }
        }
      }
    };
  }

  PageCache.jsonp = {timeout: 30 * 1000};

  // Functions
  PageCache.fn = PageCache.prototype = {
    _toJson: function(text) {
      try {
        var json = eval('(' + text + ')');
        return json;
      } catch (e) {
        Log.error(e);
        return;
      }
    },
    _getUrlParam: function(name) {
      var re = /<meta.*charset=([^"]+).*?>/i;     // "/reg/i" i means ignore letter CASE
      var charset = document.documentElement.innerHTML.match(re)[1];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); // the same as /(^|&)XXXXX/i
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        Log.debug("document charset "+charset);
        Log.debug("before decode:", r[2]);
        Log.debug("unescape decode:", unescape(r[2]));
        Log.debug("decodeURIComponent decode:", decodeURIComponent(r[2]));
        if (charset == "utf-8") {
          return decodeURIComponent(r[2]);
        } else {
          return unescape(r[2]);
        }
      }
      return null;
    },
    _getJsonpParamName: function() {
      var reg = new RegExp("([^|&]+)=jsonp", "ig");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return r[1];
      } else {
        return null;
      }
    },
    doAjax: function(url) {
      var _xmlhttp;
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
          _xmlhttp = new XMLHttpRequest();
      } else {                    // code for IE6, IE5
          _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      _xmlhttp.onreadystatechange = function() {
          if (_xmlhttp.readyState == 4) {
            if (_xmlhttp.status == 200) {
              var _cacheData = PageCache.cache[url];
              if (! _cacheData) {
                Log.error("Ajax>>PageCache Inner Error");
                return;
              }
              _cacheData.update({type: "json", state: 1, response: _xmlhttp.responseText,
                                 json: PageCache.fn._toJson(_xmlhttp.responseText), xmlhttp: _xmlhttp});
              _cacheData.successCall();
            } else {
              Log.debug(_xmlhttp);
              var _cacheData = PageCache.cache[url];
              if (! _cacheData) {
                Log.error("Ajax>>PageCache Inner Error");
                return;
              }
              _cacheData.update({type: "json", state: 0, response: _xmlhttp.responseText, json: {}, xmlhttp: _xmlhttp});
              _cacheData.errorCall();
            }
          }
      }
      _xmlhttp.open("GET", url, true);
      _xmlhttp.send();
    },
    doJsonp: function(url) {
      // random a function name
      var _callbackName = ('jsonp_' + Math.random()).replace(".", "");
      var _jsonpUrl = url.replace(/callback=\?/ig, 'callback='+_callbackName)

      // create a <script> tag and add into the window
      var _tag = document.getElementsByTagName('head')[0];
      var _script = document.createElement('script');
      _tag.appendChild(_script);

      // the jsonp callback function
      window[_callbackName] = function (json) {
          _tag.removeChild(_script);
          clearTimeout(_script.timer);
          window[_callbackName] = null;

          var _cacheData = PageCache.cache[url];
          if (! _cacheData) {
            Log.error("Jsonp>>PageCache Inner Error");
            return;
          }
          _cacheData.update({type: "jsonp", state: 1, response: json, json: json, jsonp: _script});
          _cacheData.successCall();
      };

      // run
      _script.src = _jsonpUrl;

      // timeout
      _script.timer = setTimeout(function () {
        Log.error("Jsonp>>Timeout " + _jsonpUrl);
        window[_callbackName] = null;
        _tag.removeChild(_script);

        var _cacheData = PageCache.cache[url];
        if (! _cacheData) {
          Log.error("Jsonp>>PageCache Inner Error");
          return;
        }
        _cacheData.update({type: "jsonp", state: 0, jsonp: _script});
        _cacheData.errorCall();
      }, PageCache.jsonp.timeout);
    }
  };

  var
    // Map over PageCache in case of overwrite
    _PageCache = window.PageCache,

    // Map over the $PC in case of overwrite
    _$PC = window.$PC;

  PageCache.noConflict = function(deep) {
      if (window.$PC === PageCache) {
          window.$PC = _$PC;
      }
      if (deep && window.PageCache === PageCache) {
          window.PageCache = _PageCache;
      }
      return PageCache;
  };

  if (! noGlobal) {
      window.PageCache = window.$PC = PageCache;
      window.PageCache.Log = window.$PC.Log = Log;
  }

return PageCache;
});
