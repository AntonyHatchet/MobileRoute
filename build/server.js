module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  /**
   * Module dependencies.
   */
  var serverApp = __webpack_require__(32);
  var debug = __webpack_require__(33)("MobileRoute");
  var http = __webpack_require__(38);
  
  /**
   * Get port from environment and store in Express.
   */
  
  var port = normalizePort(process.env.PORT || "3000");
  serverApp.set("port", port);
  
  /**
   * Create HTTP server.
   */
  
  var server = http.createServer(serverApp);
  console.log("Server started");
  /**
   * Listen on provided port, on all network interfaces.
   */
  
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
  
  /**
   * Normalize a port into a number, string, or false.
   */
  
  function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var keyMirror = _interopRequire(__webpack_require__(12));
  
  var ActionTypes = keyMirror({
  
    AUTH_SIGNIN: null,
    LOAD_PAGE: null,
    LOAD_PAGE_SUCCESS: null,
    LOAD_PAGE_ERROR: null,
    CHANGE_LOCATION: null
  
  });
  
  module.exports = ActionTypes;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Flux = _interopRequire(__webpack_require__(35));
  
  var PayloadSources = _interopRequire(__webpack_require__(5));
  
  var assign = _interopRequire(__webpack_require__(4));
  
  /**
   * A singleton that operates as the central hub for application updates.
   * For more information visit https://facebook.github.io/flux/
   */
  var Dispatcher = assign(new Flux.Dispatcher(), {
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction: function handleServerAction(action) {
      var payload = {
        source: PayloadSources.SERVER_ACTION,
        action: action
      };
      this.dispatch(payload);
    },
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function handleViewAction(action) {
      var payload = {
        source: PayloadSources.VIEW_ACTION,
        action: action
      };
      console.log(payload, "Dispatcher VIEW_ACTION");
      this.dispatch(payload);
    }
  
  });
  
  module.exports = Dispatcher;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Object.assign
   */
  
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
  
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
  
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
  
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
  
      var from = Object(nextSource);
  
      // We don't currently support accessors nor proxies. Therefore this
      // copy cannot throw. If we ever supported this then we must handle
      // exceptions and side-effects. We don't support symbols so they won't
      // be transferred.
  
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
  
    return to;
  };
  
  module.exports = assign;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var keyMirror = _interopRequire(__webpack_require__(12));
  
  var PayloadSources = keyMirror({
  
    VIEW_ACTION: null,
    SERVER_ACTION: null
  
  });
  
  module.exports = PayloadSources;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var PayloadSources = _interopRequire(__webpack_require__(5));
  
  var EventEmitter = _interopRequire(__webpack_require__(13));
  
  var assign = _interopRequire(__webpack_require__(4));
  
  var CHANGE_EVENT = "change";
  
  var _users = {};
  
  if (true) {
    _users.Test = "Test";
  }
  var SessionStore = assign({}, EventEmitter.prototype, {
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    isLoggedIn: function isLoggedIn(user) {
      return user in _users ? _users[user] : {
        name: "Пользователь не найден",
        type: "notfound"
      };
    },
  
    /**
     * Emits change event to all registered event listeners.
     *
     * @returns {Boolean} Indication if we've emitted an event.
     */
    emitChange: function emitChange() {
      return this.emit(CHANGE_EVENT);
    },
  
    /**
     * Register a new change event listener.
     *
     * @param {function} callback Callback function.
     */
    onChange: function onChange(callback) {
      this.on(CHANGE_EVENT, callback);
    },
  
    /**
     * Remove change event listener.
     *
     * @param {function} callback Callback function.
     */
    off: function off(callback) {
      this.off(CHANGE_EVENT, callback);
    }
  
  });
  
  SessionStore.dispatcherToken = Dispatcher.register(function (payload) {
    var action = payload.action;
    if (action.actionType === ActionTypes.AUTH_SIGNIN) {
      if (!action.err) {
        _users[action.data.id] = action.data;
        SessionStore.emitChange();
      }
      // Do nothing
    }
  });
  module.exports = SessionStore;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(10));
  
  var http = _interopRequire(__webpack_require__(41));
  
  module.exports = {
  
    navigateTo: function navigateTo(path) {
      if (ExecutionEnvironment.canUseDOM) {
        window.history.pushState({}, document.title, path);
      }
      Dispatcher.handleViewAction({
        actionType: ActionTypes.CHANGE_LOCATION, path: path
      });
    },
  
    loadPage: function loadPage(path, cb) {
      Dispatcher.handleViewAction({
        actionType: ActionTypes.LOAD_PAGE, path: path
      });
  
      http.get("/api/page" + path).accept("application/json").end(function (err, res) {
        Dispatcher.handleServerAction({
          actionType: ActionTypes.LOAD_PAGE, path: path, err: err, page: res.body
        });
        if (cb) {
          cb();
        }
      });
    },
  
    loginUser: function loginUser(data, callback) {
      localStorage.clear();
      localStorage.setItem("session", JSON.stringify(data));
      Dispatcher.handleViewAction({
        actionType: ActionTypes.AUTH_SIGNIN,
        data: data
      });
      callback(null, "User authorized");
    }
  
  };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var invariant = _interopRequire(__webpack_require__(11));
  
  var NavigationMixin = _interopRequire(__webpack_require__(15));
  
  var AppStore = _interopRequire(__webpack_require__(9));
  
  var SessionStore = _interopRequire(__webpack_require__(6));
  
  var Navbar = _interopRequire(__webpack_require__(26));
  
  var ContentPage = _interopRequire(__webpack_require__(17));
  
  var NotFoundPage = _interopRequire(__webpack_require__(27));
  
  var AsidePanel = _interopRequire(__webpack_require__(16));
  
  var Map = _interopRequire(__webpack_require__(28));
  
  var RT = _interopRequire(__webpack_require__(29));
  
  var Landing = _interopRequire(__webpack_require__(18));
  
  
  
  
  var Application = React.createClass({
    displayName: "Application",
    mixins: [NavigationMixin],
  
    propTypes: {
      user: React.PropTypes.object.isRequired,
      path: React.PropTypes.string.isRequired,
      onSetTitle: React.PropTypes.func.isRequired,
      onSetMeta: React.PropTypes.func.isRequired,
      onPageNotFound: React.PropTypes.func.isRequired
    },
    render: function render() {
      console.log(this.props.user.id, "this.props.user.id");
      var auth = SessionStore.isLoggedIn(this.props.user.id);
      console.log(auth, "auth user.id");
      var page = AppStore.getPage(this.props.path);
      invariant(page !== undefined, "Failed to load page content.");
      this.props.onSetTitle(page.title);
  
      if (page.type === "notfound") {
        this.props.onPageNotFound();
        return React.createElement(NotFoundPage, page);
      }
      if (auth.type === "notfound") {
        console.log("Не авторизован");
        this.props.path = "/";
      }
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { className: "App" },
          this.props.path === "/" ? React.createElement(Landing, null) : React.createElement(
            "div",
            { className: "navigation" },
            React.createElement(Navbar, null),
            React.createElement(AsidePanel, null)
          ),
          this.props.path === "/map" && React.createElement(
            "div",
            { className: "map-container" },
            React.createElement(Map, null),
            React.createElement(RT, null)
          )
        )
      );
    }
  });
  
  module.exports = Application;
  /* jshint ignore:end */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var PayloadSources = _interopRequire(__webpack_require__(5));
  
  var EventEmitter = _interopRequire(__webpack_require__(13));
  
  var assign = _interopRequire(__webpack_require__(4));
  
  var CHANGE_EVENT = "change";
  
  var _pages = {};
  var _loading = false;
  
  if (true) {
    _pages["/"] = { title: "Home Page" };
    _pages["/privacy"] = { title: "Privacy Policy" };
    _pages["/map"] = { title: "Map" };
  }
  //console.log(_pages,'_pages started');
  var AppStore = assign({}, EventEmitter.prototype, {
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    getPage: function getPage(path) {
      //console.log(_pages,'getPage');
      //console.log(path,'getPage');
      //console.log(_pages[path],'_pages[path] getPage');
      return path in _pages ? _pages[path] : {
        title: "Page Not Found",
        type: "notfound"
      };
    },
  
    /**
     * Emits change event to all registered event listeners.
     *
     * @returns {Boolean} Indication if we've emitted an event.
     */
    emitChange: function emitChange() {
      return this.emit(CHANGE_EVENT);
    },
  
    /**
     * Register a new change event listener.
     *
     * @param {function} callback Callback function.
     */
    onChange: function onChange(callback) {
      this.on(CHANGE_EVENT, callback);
    },
  
    /**
     * Remove change event listener.
     *
     * @param {function} callback Callback function.
     */
    off: function off(callback) {
      this.off(CHANGE_EVENT, callback);
    }
  
  });
  
  AppStore.dispatcherToken = Dispatcher.register(function (payload) {
    var action = payload.action;
  
    switch (action.actionType) {
  
      case ActionTypes.LOAD_PAGE:
        if (action.source === PayloadSources.VIEW_ACTION) {
          _loading = true;
        } else {
          if (!action.err) {
            _pages[action.path] = action.page;
            //console.log(_pages,'ActionTypes.LOAD_PAGE');
          }
        }
        AppStore.emitChange();
        break;
  
      default:
      // Do nothing
    }
  });
  
  module.exports = AppStore;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */
  
  /*jslint evil: true */
  
  "use strict";
  
  var canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
  
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {
  
    canUseDOM: canUseDOM,
  
    canUseWorkers: typeof Worker !== 'undefined',
  
    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),
  
    canUseViewport: canUseDOM && !!window.screen,
  
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
  
  };
  
  module.exports = ExecutionEnvironment;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (true) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  "use strict";
  
  var invariant = __webpack_require__(11);
  
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (true ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };
  
  module.exports = keyMirror;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("eventemitter3");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(10));
  
  var AppActions = _interopRequire(__webpack_require__(7));
  
  var NavigationMixin = {
    componentDidMount: function componentDidMount() {
      if (ExecutionEnvironment.canUseDOM) {
        window.addEventListener("popstate", this.handlePopState);
        window.addEventListener("click", this.handleClick);
      }
    },
  
    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener("popstate", this.handlePopState);
      window.removeEventListener("click", this.handleClick);
    },
  
    handleClick: function handleClick(event) {
      if (event.button === 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) {
        return;
      }
  
      // Ensure link
      var el = event.target;
      while (el && el.nodeName !== "A") {
        el = el.parentNode;
      }
      if (!el || el.nodeName !== "A") {
        return;
      }
  
      // Ignore if tag has
      // 1. "download" attribute
      // 2. rel="external" attribute
      if (el.getAttribute("download") || el.getAttribute("rel") === "external") {
        return;
      }
  
      // Ensure non-hash for the same path
      var link = el.getAttribute("href");
      if (el.pathname === location.pathname && (el.hash || "#" === link)) {
        return;
      }
  
      // Check for mailto: in the href
      if (link && link.indexOf("mailto:") > -1) {
        return;
      }
  
      // Check target
      if (el.target) {
        return;
      }
  
      // X-origin
      var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
      if (!(el.href && el.href.indexOf(origin) === 0)) {
        return;
      }
  
      // Rebuild path
      var path = el.pathname + el.search + (el.hash || "");
  
      event.preventDefault();
      AppActions.loadPage(path, function () {
        AppActions.navigateTo(path);
      });
    }
  
  };
  
  module.exports = NavigationMixin;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Aside = React.createClass({
    displayName: "Aside",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "aside",
          null,
          React.createElement(
            "div",
            { className: "nav-collapse", id: "sidebar" },
            React.createElement(
              "ul",
              { className: "sidebar-menu", id: "nav-accordion" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-map-marker", href: "/map" },
                  " Карта"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-tasks", href: "/tasks" },
                  " Задачи"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-user", href: "/profile" },
                  " Настройки профиля"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-calendar", href: "/calendar" },
                  " Календарь"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-text-size", href: "/privacy" },
                  " Настройки"
                )
              )
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Aside;
  /* jshint ignore:end */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var ContentPage = React.createClass({
    displayName: "ContentPage",
  
  
    propTypes: {
      body: React.PropTypes.string.isRequired
    },
  
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var title = _props.title;
      var body = _props.body;
      var other = _props.other;
  
  
      /* jshint ignore:start */
      return React.createElement("main", { className: "ContentPage " + className,
        dangerouslySetInnerHTML: { __html: body } });
      /* jshint ignore:end */
    }
  
  });
  
  module.exports = ContentPage;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Header = _interopRequire(__webpack_require__(23));
  
  var About = _interopRequire(__webpack_require__(19));
  
  var Contact = _interopRequire(__webpack_require__(20));
  
  var Service = _interopRequire(__webpack_require__(25));
  
  var Price = _interopRequire(__webpack_require__(24));
  
  var Footer = _interopRequire(__webpack_require__(22));
  
  var Features = _interopRequire(__webpack_require__(21));
  
  var Landing = React.createClass({
    displayName: "Landing",
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { className: "ContentPage" },
          React.createElement(Header, null),
          React.createElement(About, null),
          React.createElement(Service, null),
          React.createElement(Features, null),
          React.createElement(Price, null),
          React.createElement(Contact, null),
          React.createElement(Footer, null)
        )
      );
    }
  });
  
  module.exports = Landing;
  /* jshint ignore:end */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var About = React.createClass({
    displayName: "About",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { id: "About", className: "about" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "about-info" },
              React.createElement(
                "div",
                { className: "col-md-8 about-left" },
                React.createElement(
                  "h2",
                  null,
                  "Работает на вас"
                ),
                React.createElement(
                  "p",
                  null,
                  "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit."
                ),
                React.createElement(
                  "div",
                  { className: "sc-icons" },
                  React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement("span", { className: "icon1" })
                  ),
                  React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement("span", { className: "icon2" })
                  ),
                  React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement("span", { className: "icon3" })
                  ),
                  React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement("span", { classNameName: "icon4" })
                  )
                )
              ),
              React.createElement(
                "div",
                { classNameName: "col-md-4 about-right" },
                React.createElement("img", { classNameName: "img-responsive", alt: "", src: "images/carry-bags.png" })
              ),
              React.createElement("div", { className: "clearfix" })
            )
          )
        )
      );
    }
  
  });
  
  module.exports = About;
  /* jshint ignore:end */

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Contact = React.createClass({
    displayName: "Contact",
    getInitialState: function () {
      return {
        name: "Ваше имя",
        mail: "Ваш email",
        theme: "Тема"
      };
    },
    handleChange: function (event) {
      this.setState({ name: event.target.name }, { mail: event.target.mail }, { theme: event.target.theme });
    },
  
    render: function render() {
      var name = this.state.name;
      var mail = this.state.mail;
      var theme = this.state.theme;
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { id: "Contact", className: "contact" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "h3",
              null,
              "Связжитесь с нами"
            ),
            React.createElement(
              "div",
              { className: "contact-us" },
              React.createElement(
                "div",
                { className: "col-md-6 contact-info" },
                React.createElement(
                  "ul",
                  { className: "icon-menu" },
                  React.createElement(
                    "li",
                    { className: "ion" },
                    React.createElement(
                      "a",
                      { href: "#" },
                      React.createElement("img", { src: "images/01.png" })
                    )
                  ),
                  React.createElement(
                    "li",
                    { className: "fon" },
                    React.createElement(
                      "p",
                      null,
                      "111000, Россия, Москва, Тверская д1"
                    )
                  )
                ),
                React.createElement(
                  "form",
                  null,
                  React.createElement("input", { className: "text", type: "text", value: name, onChange: this.handleChange }),
                  React.createElement("input", { className: "text", type: "text", value: mail, onChange: this.handleChange }),
                  React.createElement("input", { className: "text", type: "text", value: theme, onChange: this.handleChange })
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-6 contact-intro" },
                React.createElement(
                  "div",
                  { className: "contact-information" },
                  React.createElement(
                    "ul",
                    { className: "contact-in" },
                    React.createElement("li", { className: "iod" }),
                    React.createElement(
                      "li",
                      { className: "ion" },
                      React.createElement(
                        "a",
                        { href: "#" },
                        React.createElement("img", { src: "images/02.png" })
                      )
                    ),
                    React.createElement(
                      "li",
                      { className: "elt" },
                      React.createElement(
                        "p",
                        null,
                        "(0271) 123 - 456"
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "contact-infor" },
                  React.createElement(
                    "ul",
                    { className: "contact-is" },
                    React.createElement("li", { className: "iod-1" }),
                    React.createElement(
                      "li",
                      { className: "ion" },
                      React.createElement(
                        "a",
                        { href: "#" },
                        React.createElement("img", { src: "images/03.png" })
                      )
                    ),
                    React.createElement(
                      "li",
                      { className: "elt-1" },
                      React.createElement(
                        "p",
                        null,
                        React.createElement(
                          "a",
                          { href: "" },
                          "client@mobileroute.com"
                        )
                      )
                    )
                  ),
                  React.createElement("textarea", { defaultValue: "Message..." }),
                  React.createElement("input", { type: "submit" })
                )
              ),
              React.createElement("div", { classNameName: "clearfix" })
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Contact;
  /* jshint ignore:end */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Features = React.createClass({
    displayName: "Features",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { id: "Features", className: "Features" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "Features-info" },
              React.createElement(
                "div",
                { className: "Features-info-top" },
                React.createElement(
                  "h3",
                  null,
                  "Lorem Ipsum Dolor Sit Amet"
                ),
                React.createElement(
                  "p",
                  null,
                  "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper."
                )
              ),
              React.createElement(
                "div",
                { className: "slider" },
                React.createElement(
                  "ul",
                  { id: "slider1", className: "rslides" },
                  React.createElement(
                    "li",
                    null,
                    React.createElement("img", { alt: "", src: "images/slider.png" })
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement("img", { alt: "", src: "images/slider.png" })
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement("img", { alt: "", src: "images/slider.png" })
                  )
                )
              )
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Features;
  /* jshint ignore:end */

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Footer = React.createClass({
    displayName: "Footer",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { className: "footer" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "copy-rights" },
              React.createElement(
                "p",
                null,
                "Powered by",
                React.createElement(
                  "a",
                  { href: "http://MobileRoute.com/" },
                  " MobileRoute."
                )
              )
            ),
            React.createElement(
              "a",
              { id: "toTop", href: "#" },
              React.createElement("span", { id: "toTopHover", href: "#" })
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Footer;
  /* jshint ignore:end */

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var App = _interopRequire(__webpack_require__(8));
  
  var SessionStore = _interopRequire(__webpack_require__(6));
  
  var AppActions = _interopRequire(__webpack_require__(7));
  
  var ModalLogin = React.createClass({
    displayName: "ModalLogin",
    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "modal fade", id: "myModal", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel", "aria-hidden": "true" },
          React.createElement(
            "div",
            { className: "modal-dialog" },
            React.createElement(
              "div",
              { className: "modal-content" },
              React.createElement(
                "div",
                { className: "modal-header" },
                React.createElement(
                  "button",
                  { type: "button", className: "close", "data-dismiss": "modal" },
                  React.createElement(
                    "span",
                    { "aria-hidden": "true" },
                    "×"
                  ),
                  React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Закрыть"
                  )
                ),
                React.createElement(
                  "h4",
                  { className: "modal-title", id: "myModalLabel" },
                  "Авторизация"
                )
              ),
              React.createElement(
                "div",
                { className: "modal-body" },
                React.createElement(
                  "form",
                  null,
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { htmlFor: "exampleInputEmail1" },
                      "Логин"
                    ),
                    React.createElement("input", { type: "text", className: "form-control", id: "exampleInputEmail1", placeholder: "Введите логин", ref: "name", defaultValue: "" })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { htmlFor: "exampleInputPassword1" },
                      "Пароль"
                    ),
                    React.createElement("input", { type: "password", className: "form-control", id: "exampleInputPassword1", placeholder: "Введите пароль", ref: "pass", defaultValue: "" })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "modal-footer" },
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                  "Закрыть"
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary", onClick: this.authReq },
                  "Войти"
                )
              )
            )
          )
        )
      );
    },
    authReq: function (e) {
      e.preventDefault();
      var data = {
        name: this.refs.name.getDOMNode().value,
        pass: this.refs.pass.getDOMNode().value
      };
      if (!data) {
        console.log("err");
      }
      var ws = new WebSocket("ws://185.49.69.143:20080");
      ws.onopen = function () {
        console.log("conected");
        //      console.log(data.name, "name", data.pass, 'pass');
        ws.send(JSON.stringify({
          pid: 1,
          method: "auth.login",
          data: { login: data.name, password: data.pass }
        }));
      };
      ws.onmessage = function (message) {
        var str = JSON.parse(message.data.substring(0, message.data.length - 1));
        console.log(str, "onmessage");
        switch (str.type) {
          case "response":
            AppActions.loginUser(str.data, function (err, callback) {
              if (err) {
                throw err;
              }
              console.log(callback);
              AppActions.loadPage("/map", function (err) {
                if (err) {
                  throw err;
                }
                AppActions.navigateTo("/map");
              });
            });
            break;
          case "error":
            console.log(str, "error");
            break;
          default:
            console.log(str, "default");
            break;
        }
      };
    }
  });
  
  var ModalRegistration = React.createClass({
    displayName: "ModalRegistration",
    render: function () {
      return React.createElement(
        Modal,
        _extends({}, this.props, { bsStyle: "primary", title: "Регистрация", animation: false }),
        React.createElement("div", { className: "modal-body" }),
        React.createElement(
          "div",
          { className: "modal-footer" },
          React.createElement(
            Button,
            { onClick: this.props.onRequestHide },
            "Close"
          )
        )
      );
    }
  });
  
  var Header = React.createClass({
    displayName: "Header",
    render: function render() {
      return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "header-info" },
            React.createElement(
              "div",
              { className: "logo" },
              React.createElement(
                "a",
                { href: "#" },
                React.createElement("img", { className: "img-responsive", alt: "Mobile Route", src: "images/logo.png" })
              )
            ),
            React.createElement(
              "div",
              { className: "header-right" },
              React.createElement(
                "div",
                { className: "menu" },
                React.createElement(
                  "span",
                  { className: "menu" },
                  "Меню"
                ),
                React.createElement(
                  "ul",
                  { className: "navigatoin" },
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#Home" },
                      "Главная"
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#About" },
                      "Узнать больше"
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#Services" },
                      "Услуги"
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#Features" },
                      "Примеры"
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#Price" },
                      "Цены"
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(
                      "a",
                      { className: "scroll", href: "#Contact" },
                      "Контакты"
                    )
                  ),
                  React.createElement(
                    "button",
                    { type: "button", className: "btn btn-primary", "data-toggle": "modal", "data-target": "#myModal" },
                    "Войти"
                  )
                )
              )
            ),
            React.createElement(ModalLogin, null)
          )
        ),
        React.createElement(
          "div",
          { id: "Home", className: "header-bottom" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "col-sm-4 h-left" },
              React.createElement("span", null)
            ),
            React.createElement(
              "div",
              { className: "col-sm-8 h-right" },
              React.createElement(
                "h1",
                null,
                "Маршрутизатор вашего бизнеса."
              ),
              React.createElement(
                "p",
                null,
                "Lollipop liquorice lollipop ice cream cheesecake halvah jelly-o. Gummies lollipop macaroon marshmallow icing. Cookie chupa chups cake dessert lollipop marzipan donut apple pie. Cookie cotton candy oat cake sweet roll topping apple pie marzipan."
              ),
              React.createElement(
                "div",
                { className: "buttons" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "button",
                    { className: "btn btn-success btn-lg" },
                    "Начать сейчас"
                  )
                )
              )
            )
          ),
          React.createElement("div", { className: "clearfix" })
        )
      );
    }
  
  });
  
  module.exports = Header;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Price = React.createClass({
    displayName: "Price",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { id: "Price", className: "price" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "price-info" },
              React.createElement(
                "h3",
                null,
                "Что подойдет именно вам"
              ),
              React.createElement(
                "p",
                null,
                "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
              )
            ),
            React.createElement(
              "div",
              { className: "price-grid" },
              React.createElement(
                "div",
                { className: "price-column" },
                React.createElement(
                  "div",
                  { className: "price-col-top" },
                  React.createElement(
                    "h4",
                    null,
                    "ECONOMY"
                  ),
                  React.createElement(
                    "div",
                    { className: "price-col-bottom" },
                    React.createElement(
                      "h2",
                      null,
                      "5$"
                    ),
                    React.createElement("span", { className: "p-line" }),
                    React.createElement(
                      "ul",
                      { className: "pr-list" },
                      React.createElement(
                        "li",
                        null,
                        "2 GB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "до 3 Участников"
                      )
                    ),
                    React.createElement(
                      "a",
                      { href: "#" },
                      "Начать сейчас"
                    )
                  )
                ),
                React.createElement("div", { className: "clearfix" })
              ),
              React.createElement(
                "div",
                { className: "price-column" },
                React.createElement(
                  "div",
                  { className: "price-col-top-in" },
                  React.createElement(
                    "h4",
                    null,
                    "PERSONAL"
                  ),
                  React.createElement(
                    "div",
                    { className: "price-col-bottom-in" },
                    React.createElement(
                      "h2",
                      null,
                      "15$"
                    ),
                    React.createElement("span", { className: "p-line" }),
                    React.createElement(
                      "ul",
                      { className: "pr-list" },
                      React.createElement(
                        "li",
                        null,
                        "2 GB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "до 15 Участников"
                      )
                    ),
                    React.createElement(
                      "a",
                      { href: "#" },
                      "Начать сейчас"
                    )
                  )
                ),
                React.createElement("div", { className: "clearfix" })
              ),
              React.createElement(
                "div",
                { className: "price-column" },
                React.createElement(
                  "div",
                  { className: "price-col-top-inn" },
                  React.createElement(
                    "h4",
                    null,
                    "BUSINESS"
                  ),
                  React.createElement(
                    "div",
                    { className: "price-col-bottom-inn" },
                    React.createElement(
                      "h2",
                      null,
                      "20$"
                    ),
                    React.createElement("span", { className: "p-line" }),
                    React.createElement(
                      "ul",
                      { className: "pr-list" },
                      React.createElement(
                        "li",
                        null,
                        "2 GB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "200MB"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "UNLIMITED"
                      ),
                      React.createElement(
                        "li",
                        null,
                        "от 15 Участников"
                      )
                    ),
                    React.createElement(
                      "a",
                      { href: "#" },
                      "Начать сейчас"
                    )
                  )
                ),
                React.createElement("div", { className: "clearfix" })
              ),
              React.createElement("div", { className: "clearfix" })
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Price;
  /* jshint ignore:end */

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Services = React.createClass({
    displayName: "Services",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          { id: "Services", className: "services" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "services-grids" },
              React.createElement(
                "div",
                { className: "col-md-4 grids-info" },
                React.createElement("i", { className: "icon1" }),
                React.createElement(
                  "h3",
                  null,
                  "Title Goes Here"
                ),
                React.createElement(
                  "p",
                  null,
                  "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat"
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-4 grids-info" },
                React.createElement("i", { className: "icon2" }),
                React.createElement(
                  "h3",
                  null,
                  "Title Goes Here"
                ),
                React.createElement(
                  "p",
                  null,
                  "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat"
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-4 grids-info" },
                React.createElement("i", { className: "icon3" }),
                React.createElement(
                  "h3",
                  null,
                  "Title Goes Here"
                ),
                React.createElement(
                  "p",
                  null,
                  "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat"
                )
              ),
              React.createElement("div", { className: "clearfix" })
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Services;
  /* jshint ignore:end */

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Navbar = React.createClass({
    displayName: "Navbar",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "header",
          { className: "header-app black-bg" },
          React.createElement(
            "div",
            { className: "sidebar-toggle-box" },
            React.createElement("div", { className: "fa fa-bars tooltips", "data-placement": "right", "data-original-title": "Toggle Navigation" })
          ),
          React.createElement(
            "a",
            { href: "/map", className: "logo" },
            React.createElement(
              "b",
              null,
              "MOBILE ROUTE"
            )
          ),
          React.createElement(
            "div",
            { className: "top-menu" },
            React.createElement(
              "ul",
              { className: "nav pull-right top-menu" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "logout", href: "/" },
                  "Logout"
                )
              )
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Navbar;
  //logo start-->
  //logo end-->

  /* jshint ignore:end */

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  //require('./NotFoundPage.less');
  
  var React = _interopRequire(__webpack_require__(1));
  
  var NotFoundPage = React.createClass({
    displayName: "NotFoundPage",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Page Not Found"
          ),
          React.createElement(
            "p",
            null,
            "Sorry, but the page you were trying to view does not exist."
          )
        )
      );
    }
  
  });
  
  module.exports = NotFoundPage;
  /* jshint ignore:end */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var cords = [[51.508, -0.11], [52.508, -0.11], [53.508, -1.11], [43.508, -1.11]];
  var point;
  "use strict";
  module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function () {
      return {
        map: {}
      };
    },
    componentDidMount: function () {
      var map = L.map("map").setView([52.505, -0.09], 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
      }).addTo(map);
      L.polyline(cords, {
        color: "red",
        weight: 3
      }).addTo(map);
      function circle(point) {
        L.circle(point, 50, {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5
        }).addTo(map);
      }
      function pointAdd(points) {
        for (var i = 0; i < points.length; i++) {
          point = points[i];
          circle(point);
        }
      }
      pointAdd(cords);
      this.setState({ map: map });
      window.map = this;
    },
    render: function () {
      return (
        /* jshint ignore:start */
        React.createElement("div", { id: "map" })
      )
      /* jshint ignore:end */
      ;
    }
  });

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Griddle = _interopRequire(__webpack_require__(37));
  
  "use strict";
  module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function () {
      return {
        Data: {}
      };
    },
    componentDidMount: function () {
      var Data = [{
        id: 0,
        name: "Mayer Leonard",
        city: "Kapowsin",
        state: "Hawaii",
        country: "United Kingdom",
        company: "Ovolo",
        favoriteNumber: 7
      }, {
        id: 1,
        name: "Koch Becker",
        city: "Johnsonburg",
        state: "New Jersey",
        country: "Madagascar",
        company: "Eventage",
        favoriteNumber: 2
      }, {
        id: 2,
        name: "Lowery Hopkins",
        city: "Blanco",
        state: "Arizona",
        country: "Ukraine",
        company: "Comtext",
        favoriteNumber: 3
      }, {
        id: 3,
        name: "Walters Mays",
        city: "Glendale",
        state: "Illinois",
        country: "New Zealand",
        company: "Corporana",
        favoriteNumber: 6
      }, {
        id: 4,
        name: "Shaw Lowe",
        city: "Coultervillle",
        state: "Wyoming",
        country: "Ecuador",
        company: "Isologica",
        favoriteNumber: 2
      }, {
        id: 5,
        name: "Shaw Lowe",
        city: "Coultervillle",
        state: "Wyoming",
        country: "Ecuador",
        company: "Isologica",
        favoriteNumber: 2
      }];
      this.setState({ Data: Data });
    },
    render: function () {
      return (
        /* jshint ignore:start */
        React.createElement(Griddle, { results: this.state.Data, tableClassName: "table", columns: ["id", "name", "city", "state", "country"] })
      )
      /* jshint ignore:end */
      ;
    }
  });

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var pages = {};
  pages.index = {
    path: "/",
    body: "",
    attributes: { title: "Mobile Route" }
  };
  pages.login = {
    path: "/login",
    body: "<p>1</p>",
    attributes: { title: "login" }
  };
  pages.dashboard = {
    path: "/dashboard",
    body: "<p>2</p>",
    attributes: { title: "dashboards" }
  };
  pages.map = {
    path: "/map",
    body: "<p>3</p>",
    attributes: { title: "Map" }
  };
  pages.tasks = {
    path: "/tasks",
    body: "<p>4</p>",
    attributes: { title: "Tasks" }
  };
  pages.calendar = {
    path: "/calendar",
    body: "<p>5</p>",
    attributes: { title: "Calendar" }
  };
  pages.privacy = {
    path: "/privacy",
    body: "<p>6</p>",
    attributes: { title: "Privacy Policy" }
  };
  pages.profile = {
    path: "/profile",
    body: "<p>7</p>",
    attributes: { title: "Profile" }
  };
  
  module.exports = pages;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  /**
   * Created by anton_gorshenin on 10.03.2015.
   */
  var React = __webpack_require__(1);
  var fs = __webpack_require__(36);
  var _ = __webpack_require__(39);
  var path = __webpack_require__(14);
  var AppStore = __webpack_require__(9);
  var SessionStore = __webpack_require__(6);
  var Dispatcher = __webpack_require__(3);
  var ActionTypes = __webpack_require__(2);
  var App = new React.createFactory(__webpack_require__(8));
  var templateFile = path.join(__dirname, "templates/index.html");
  var template = _.template(fs.readFileSync(templateFile, "utf8"));
  //
  // Server-side rendering
  // -----------------------------------------------------------------------------
  // The top-level React component + HTML template for it
  // Load pages from the `/fakeDB/pages` folder into the AppStore
  module.exports = function (answer) {
    (function () {
      var assign = __webpack_require__(4);
      var sourcePages = __webpack_require__(30);
      var getPages = function () {
        var pages = [];
        for (var i in sourcePages) {
          var attr = sourcePages[i];
          var page = assign({}, { path: attr.path, body: attr.body }, attr.attributes);
          Dispatcher.handleServerAction({
            actionType: ActionTypes.LOAD_PAGE,
            path: attr.path,
            page: page
          });
        }
        return pages;
      };
      return getPages(sourcePages);
    })();
    answer.get("/api/page/*", function (req, res) {
      var urlPath = req.path.substr(9);
      var page = AppStore.getPage(urlPath);
      page.user = SessionStore.isLoggedIn("Test");
      res.send(page);
    });
    answer.get("*", function (req, res) {
      var data = { description: "" };
      var app = new App({
        user: {},
        path: req.path,
        onSetTitle: function (title) {
          data.title = title;
        },
        onSetMeta: function (name, content) {
          data[name] = content;
        },
        onPageNotFound: function () {
          res.status(404);
        }
      });
      data.body = React.renderToString(app);
      var html = template(data);
      res.send(html);
    });
  };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var express = __webpack_require__(34);
  var path = __webpack_require__(14);
  //var favicon = require('serve-favicon');
  var logger = __webpack_require__(40);
  var React = __webpack_require__(1);
  var server = express();
  server.use(express["static"](path.join(__dirname)));
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  server.use(logger("dev"));
  //use router
  __webpack_require__(31)(server);
  // error handlers
  // development error handler
  // will print stacktrace
  
  if (server.get("env") === "development") {
    server.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }
  // production error handler
  // no stacktraces leaked to user
  server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });
  module.exports = server;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("debug");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("flux");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("griddle-react");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("http");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("morgan");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDFjYjk0YmNiZmI3MTc0ODM2MzMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9iaW4vc3RhcnR1cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29uc3RhbnRzL0FjdGlvblR5cGVzLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29yZS9EaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zdG9yZXMvU2Vzc2lvblN0b3JlLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXZlbnRlbWl0dGVyM1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qcyIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXNpZGVQYW5lbC9Bc2lkZVBhbmVsLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZS9Db250ZW50UGFnZS5qcyIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9MYW5kaW5nLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9Db250YWN0LmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9Gb290ZXIuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9IZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9QcmljZS5qcyIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL1NlcnZpY2VzLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vL2Q6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL09TTWFwL09TTWFwLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9SVC9SVC5qcyIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qcyIsIndlYnBhY2s6Ly8vZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL3JvdXRlcy9yZWFjdFJvdXRlLmpzIiwid2VicGFjazovLy9kOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZsdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyaWRkbGUtcmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxhQUFhLEVBQUU7QUFDdkMsVUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN2QyxTQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7QUFDOUIsU0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDbEIsZUFBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO0FBQ3BCLGFBQUssRUFBRSxHQUFHO09BQ1gsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0o7OztBQUdELFFBQU0sQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdkMsT0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLE9BQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ2xCLGFBQU8sRUFBRSxHQUFHLENBQUMsT0FBTztBQUNwQixXQUFLLEVBQUUsRUFBRTtLQUNWLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFFBQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDOzs7Ozs7QUNsQ3ZCLG9DOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEseUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDAxY2I5NGJjYmZiNzE3NDgzNjMzXG4gKiovIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG52YXIgc2VydmVyQXBwID0gcmVxdWlyZSgnLi4vc2VydmVyLmpzJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdNb2JpbGVSb3V0ZScpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5cbi8qKlxuICogR2V0IHBvcnQgZnJvbSBlbnZpcm9ubWVudCBhbmQgc3RvcmUgaW4gRXhwcmVzcy5cbiAqL1xuXG52YXIgcG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAnMzAwMCcpO1xuc2VydmVyQXBwLnNldCgncG9ydCcsIHBvcnQpO1xuXG4vKipcbiAqIENyZWF0ZSBIVFRQIHNlcnZlci5cbiAqL1xuXG52YXIgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoc2VydmVyQXBwKTtcbmNvbnNvbGUubG9nKFwiU2VydmVyIHN0YXJ0ZWRcIik7XG4vKipcbiAqIExpc3RlbiBvbiBwcm92aWRlZCBwb3J0LCBvbiBhbGwgbmV0d29yayBpbnRlcmZhY2VzLlxuICovXG5cbnNlcnZlci5saXN0ZW4ocG9ydCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgb25FcnJvcik7XG5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIG9uTGlzdGVuaW5nKTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBwb3J0IGludG8gYSBudW1iZXIsIHN0cmluZywgb3IgZmFsc2UuXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplUG9ydCh2YWwpIHtcbiAgdmFyIHBvcnQgPSBwYXJzZUludCh2YWwsIDEwKTtcblxuICBpZiAoaXNOYU4ocG9ydCkpIHtcbiAgICAvLyBuYW1lZCBwaXBlXG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGlmIChwb3J0ID49IDApIHtcbiAgICAvLyBwb3J0IG51bWJlclxuICAgIHJldHVybiBwb3J0O1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImVycm9yXCIgZXZlbnQuXG4gKi9cblxuZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICBpZiAoZXJyb3Iuc3lzY2FsbCAhPT0gJ2xpc3RlbicpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIHZhciBiaW5kID0gdHlwZW9mIHBvcnQgPT09ICdzdHJpbmcnXG4gICAgPyAnUGlwZSAnICsgcG9ydFxuICAgIDogJ1BvcnQgJyArIHBvcnQ7XG5cbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xuICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICBjYXNlICdFQUNDRVMnOlxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJyk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFQUREUklOVVNFJzpcbiAgICAgIGNvbnNvbGUuZXJyb3IoYmluZCArICcgaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImxpc3RlbmluZ1wiIGV2ZW50LlxuICovXG5cbmZ1bmN0aW9uIG9uTGlzdGVuaW5nKCkge1xuICB2YXIgYWRkciA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIHZhciBiaW5kID0gdHlwZW9mIGFkZHIgPT09ICdzdHJpbmcnXG4gICAgPyAncGlwZSAnICsgYWRkclxuICAgIDogJ3BvcnQgJyArIGFkZHIucG9ydDtcbiAgZGVidWcoJ0xpc3RlbmluZyBvbiAnICsgYmluZCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2Jpbi9zdGFydHVwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbnZhciBBY3Rpb25UeXBlcyA9IGtleU1pcnJvcih7XG5cbiAgQVVUSF9TSUdOSU46IG51bGwsXG4gIExPQURfUEFHRTogbnVsbCxcbiAgTE9BRF9QQUdFX1NVQ0NFU1M6IG51bGwsXG4gIExPQURfUEFHRV9FUlJPUjogbnVsbCxcbiAgQ0hBTkdFX0xPQ0FUSU9OOiBudWxsXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvblR5cGVzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanNcbiAqKi8iLCIvKlxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEZsdXggZnJvbSAnZmx1eCc7XG5pbXBvcnQgUGF5bG9hZFNvdXJjZXMgZnJvbSAnLi4vY29uc3RhbnRzL1BheWxvYWRTb3VyY2VzJztcbmltcG9ydCBhc3NpZ24gZnJvbSAncmVhY3QvbGliL09iamVjdC5hc3NpZ24nO1xuXG4vKipcbiAqIEEgc2luZ2xldG9uIHRoYXQgb3BlcmF0ZXMgYXMgdGhlIGNlbnRyYWwgaHViIGZvciBhcHBsaWNhdGlvbiB1cGRhdGVzLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gdmlzaXQgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vZmx1eC9cbiAqL1xudmFyIERpc3BhdGNoZXIgPSBhc3NpZ24obmV3IEZsdXguRGlzcGF0Y2hlcigpLCB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHNlcnZlci5cbiAgICovXG4gIGhhbmRsZVNlcnZlckFjdGlvbihhY3Rpb24pIHtcbiAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgIHNvdXJjZTogUGF5bG9hZFNvdXJjZXMuU0VSVkVSX0FDVElPTixcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkZXRhaWxzIG9mIHRoZSBhY3Rpb24sIGluY2x1ZGluZyB0aGUgYWN0aW9uJ3NcbiAgICogdHlwZSBhbmQgYWRkaXRpb25hbCBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxuICAgKi9cbiAgaGFuZGxlVmlld0FjdGlvbihhY3Rpb24pIHtcbiAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgIHNvdXJjZTogUGF5bG9hZFNvdXJjZXMuVklFV19BQ1RJT04sXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH07XG4gICAgY29uc29sZS5sb2cocGF5bG9hZCxcIkRpc3BhdGNoZXIgVklFV19BQ1RJT05cIik7XG4gICAgdGhpcy5kaXNwYXRjaChwYXlsb2FkKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb3JlL0Rpc3BhdGNoZXIuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XG5cbnZhciBQYXlsb2FkU291cmNlcyA9IGtleU1pcnJvcih7XG5cbiAgVklFV19BQ1RJT046IG51bGwsXG4gIFNFUlZFUl9BQ1RJT046IG51bGxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bG9hZFNvdXJjZXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi4vY29yZS9EaXNwYXRjaGVyJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICcuLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnO1xuaW1wb3J0IFBheWxvYWRTb3VyY2VzIGZyb20gJy4uL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbic7XG5cbnZhciBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcblxudmFyIF91c2VycyA9IHt9O1xuXG5pZiAoX19TRVJWRVJfXykge1xuICBfdXNlcnNbJ1Rlc3QnXSA9ICdUZXN0Jztcbn1cbnZhciBTZXNzaW9uU3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICAvKipcbiAgICogR2V0cyBwYWdlIGRhdGEgYnkgdGhlIGdpdmVuIFVSTCBwYXRoLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBVUkwgcGF0aC5cbiAgICogQHJldHVybnMgeyp9IFBhZ2UgZGF0YS5cbiAgICovXG4gIGlzTG9nZ2VkSW4odXNlcikge1xuICAgIHJldHVybiB1c2VyIGluIF91c2VycyA/IF91c2Vyc1t1c2VyXSA6IHtcbiAgICAgIG5hbWU6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0LnQtNC10L0nLFxuICAgICAgdHlwZTogJ25vdGZvdW5kJ1xuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVtaXRzIGNoYW5nZSBldmVudCB0byBhbGwgcmVnaXN0ZXJlZCBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBJbmRpY2F0aW9uIGlmIHdlJ3ZlIGVtaXR0ZWQgYW4gZXZlbnQuXG4gICAqL1xuICBlbWl0Q2hhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBuZXcgY2hhbmdlIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIGNoYW5nZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBvZmYoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9mZihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfVxuXG59KTtcblxuU2Vzc2lvblN0b3JlLmRpc3BhdGNoZXJUb2tlbiA9IERpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgdmFyIGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuICBpZiAoYWN0aW9uLmFjdGlvblR5cGUgPT09IEFjdGlvblR5cGVzLkFVVEhfU0lHTklOKSB7XG4gICAgICBpZiAoIWFjdGlvbi5lcnIpIHtcbiAgICAgICAgX3VzZXJzW2FjdGlvbi5kYXRhLmlkXSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICBTZXNzaW9uU3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgfVxuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25TdG9yZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL1Nlc3Npb25TdG9yZS5qc1xuICoqLyIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XG5pbXBvcnQgRXhlY3V0aW9uRW52aXJvbm1lbnQgZnJvbSAncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JztcbmltcG9ydCBodHRwIGZyb20gJ3N1cGVyYWdlbnQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYXZpZ2F0ZVRvKHBhdGgpIHtcbiAgICBpZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBwYXRoKTtcbiAgICB9XG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkNIQU5HRV9MT0NBVElPTiwgcGF0aDogcGF0aFxuICAgIH0pO1xuICB9LFxuXG4gIGxvYWRQYWdlKHBhdGgsIGNiKSB7XG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSwgcGF0aDogcGF0aFxuICAgIH0pO1xuXG4gICAgaHR0cC5nZXQoJy9hcGkvcGFnZScgKyBwYXRoKVxuICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBEaXNwYXRjaGVyLmhhbmRsZVNlcnZlckFjdGlvbih7XG4gICAgICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLCBwYXRoOiBwYXRoLCBlcnI6IGVyciwgcGFnZTogcmVzLmJvZHlcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9LFxuXG4gIGxvZ2luVXNlcihkYXRhLCBjYWxsYmFjayl7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkFVVEhfU0lHTklOLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICAgIGNhbGxiYWNrKG51bGwsXCJVc2VyIGF1dGhvcml6ZWRcIik7XG4gIH1cblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAncmVhY3QvbGliL2ludmFyaWFudCc7XG5pbXBvcnQgTmF2aWdhdGlvbk1peGluIGZyb20gJy4vTmF2aWdhdGlvbk1peGluJztcbmltcG9ydCBBcHBTdG9yZSBmcm9tICcuLi8uLi9zdG9yZXMvQXBwU3RvcmUnO1xuaW1wb3J0IFNlc3Npb25TdG9yZSBmcm9tICcuLi8uLi9zdG9yZXMvU2Vzc2lvblN0b3JlJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vTmF2aWdhdGlvbic7XG5pbXBvcnQgQ29udGVudFBhZ2UgZnJvbSAnLi4vQ29udGVudFBhZ2UnO1xuaW1wb3J0IE5vdEZvdW5kUGFnZSBmcm9tICcuLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEFzaWRlUGFuZWwgZnJvbSAnLi4vQXNpZGVQYW5lbCc7XG5pbXBvcnQgTWFwIGZyb20gJy4uL09TTWFwJztcbmltcG9ydCBSVCBmcm9tICcuLi9SVC9SVCc7XG5pbXBvcnQgTGFuZGluZyBmcm9tICcuLi9MYW5kaW5nL0xhbmRpbmcuanMnXG5cblxudmFyIEFwcGxpY2F0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtOYXZpZ2F0aW9uTWl4aW5dLFxuXG4gIHByb3BUeXBlczoge1xuICAgIHVzZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZXRUaXRsZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNldE1ldGE6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25QYWdlTm90Rm91bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMudXNlci5pZCxcInRoaXMucHJvcHMudXNlci5pZFwiKTtcbiAgICB2YXIgYXV0aCA9IFNlc3Npb25TdG9yZS5pc0xvZ2dlZEluKHRoaXMucHJvcHMudXNlci5pZCk7XG4gICAgY29uc29sZS5sb2coYXV0aCxcImF1dGggdXNlci5pZFwiKTtcbiAgICB2YXIgcGFnZSA9IEFwcFN0b3JlLmdldFBhZ2UodGhpcy5wcm9wcy5wYXRoKTtcbiAgICBpbnZhcmlhbnQocGFnZSAhPT0gdW5kZWZpbmVkLCAnRmFpbGVkIHRvIGxvYWQgcGFnZSBjb250ZW50LicpO1xuICAgIHRoaXMucHJvcHMub25TZXRUaXRsZShwYWdlLnRpdGxlKTtcblxuICAgIGlmIChwYWdlLnR5cGUgPT09ICdub3Rmb3VuZCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25QYWdlTm90Rm91bmQoKTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE5vdEZvdW5kUGFnZSwgcGFnZSk7XG4gICAgfVxuICAgIGlmIChhdXRoLnR5cGUgPT09ICdub3Rmb3VuZCcpe1xuICAgICAgY29uc29sZS5sb2coJ9Cd0LUg0LDQstGC0L7RgNC40LfQvtCy0LDQvScpO1xuICAgICAgdGhpcy5wcm9wcy5wYXRoID0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAgICAgIHt0aGlzLnByb3BzLnBhdGggPT09ICcvJyA/XG4gICAgICAgIDxMYW5kaW5nLz46XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgIDxOYXZiYXIvPlxuICAgICAgICAgIDxBc2lkZVBhbmVsLz5cbiAgICAgICAgPC9kaXY+fVxuICAgICAgICB7dGhpcy5wcm9wcy5wYXRoID09PSAnL21hcCcgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtY29udGFpbmVyXCI+XG4gICAgICAgIDxNYXAvPlxuICAgICAgICA8UlQvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4uL2NvcmUvRGlzcGF0Y2hlcic7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcbmltcG9ydCBQYXlsb2FkU291cmNlcyBmcm9tICcuLi9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJztcbmltcG9ydCBhc3NpZ24gZnJvbSAncmVhY3QvbGliL09iamVjdC5hc3NpZ24nO1xuXG52YXIgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG5cbnZhciBfcGFnZXMgPSB7fTtcbnZhciBfbG9hZGluZyA9IGZhbHNlO1xuXG5pZiAoX19TRVJWRVJfXykge1xuICBfcGFnZXNbJy8nXSA9IHt0aXRsZTogJ0hvbWUgUGFnZSd9O1xuICBfcGFnZXNbJy9wcml2YWN5J10gPSB7dGl0bGU6ICdQcml2YWN5IFBvbGljeSd9O1xuICBfcGFnZXNbJy9tYXAnXSA9IHt0aXRsZTogJ01hcCd9O1xufVxuLy9jb25zb2xlLmxvZyhfcGFnZXMsJ19wYWdlcyBzdGFydGVkJyk7XG52YXIgQXBwU3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICAvKipcbiAgICogR2V0cyBwYWdlIGRhdGEgYnkgdGhlIGdpdmVuIFVSTCBwYXRoLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBVUkwgcGF0aC5cbiAgICogQHJldHVybnMgeyp9IFBhZ2UgZGF0YS5cbiAgICovXG4gIGdldFBhZ2UocGF0aCkge1xuICAgIC8vY29uc29sZS5sb2coX3BhZ2VzLCdnZXRQYWdlJyk7XG4gICAgLy9jb25zb2xlLmxvZyhwYXRoLCdnZXRQYWdlJyk7XG4gICAgLy9jb25zb2xlLmxvZyhfcGFnZXNbcGF0aF0sJ19wYWdlc1twYXRoXSBnZXRQYWdlJyk7XG4gICAgcmV0dXJuIHBhdGggaW4gX3BhZ2VzID8gX3BhZ2VzW3BhdGhdIDoge1xuICAgICAgdGl0bGU6ICdQYWdlIE5vdCBGb3VuZCcsXG4gICAgICB0eXBlOiAnbm90Zm91bmQnXG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAgICovXG4gIGVtaXRDaGFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdChDSEFOR0VfRVZFTlQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgb25DaGFuZ2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2hhbmdlIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIG9mZihjYWxsYmFjaykge1xuICAgIHRoaXMub2ZmKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9XG5cbn0pO1xuXG5BcHBTdG9yZS5kaXNwYXRjaGVyVG9rZW4gPSBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG5cbiAgICBjYXNlIEFjdGlvblR5cGVzLkxPQURfUEFHRTpcbiAgICAgIGlmIChhY3Rpb24uc291cmNlID09PSBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTikge1xuICAgICAgICBfbG9hZGluZyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWFjdGlvbi5lcnIpIHtcbiAgICAgICAgICBfcGFnZXNbYWN0aW9uLnBhdGhdID0gYWN0aW9uLnBhZ2U7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhfcGFnZXMsJ0FjdGlvblR5cGVzLkxPQURfUEFHRScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBEbyBub3RoaW5nXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuLypqc2xpbnQgZXZpbDogdHJ1ZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlNaXJyb3JcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2tleU1pcnJvci5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudGVtaXR0ZXIzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJldmVudGVtaXR0ZXIzXCJcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicGF0aFwiXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBFeGVjdXRpb25FbnZpcm9ubWVudCBmcm9tICdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xyXG5cclxudmFyIE5hdmlnYXRpb25NaXhpbiA9IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVQb3BTdGF0ZSk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVQb3BTdGF0ZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVDbGljayhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW5zdXJlIGxpbmtcclxuICAgIHZhciBlbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIHdoaWxlIChlbCAmJiBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7XHJcbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICAgIGlmICghZWwgfHwgZWwubm9kZU5hbWUgIT09ICdBJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWdub3JlIGlmIHRhZyBoYXNcclxuICAgIC8vIDEuIFwiZG93bmxvYWRcIiBhdHRyaWJ1dGVcclxuICAgIC8vIDIuIHJlbD1cImV4dGVybmFsXCIgYXR0cmlidXRlXHJcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGVsLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVuc3VyZSBub24taGFzaCBmb3IgdGhlIHNhbWUgcGF0aFxyXG4gICAgdmFyIGxpbmsgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGlmIChlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgJyMnID09PSBsaW5rKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIG1haWx0bzogaW4gdGhlIGhyZWZcclxuICAgIGlmIChsaW5rICYmIGxpbmsuaW5kZXhPZignbWFpbHRvOicpID4gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRhcmdldFxyXG4gICAgaWYgKGVsLnRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gWC1vcmlnaW5cclxuICAgIHZhciBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICtcclxuICAgICAgKHdpbmRvdy5sb2NhdGlvbi5wb3J0ID8gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQgOiAnJyk7XHJcbiAgICBpZiAoIShlbC5ocmVmICYmIGVsLmhyZWYuaW5kZXhPZihvcmlnaW4pID09PSAwKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVidWlsZCBwYXRoXHJcbiAgICB2YXIgcGF0aCA9IGVsLnBhdGhuYW1lICsgZWwuc2VhcmNoICsgKGVsLmhhc2ggfHwgJycpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBBcHBBY3Rpb25zLmxvYWRQYWdlKHBhdGgsICgpID0+IHtcclxuICAgICAgQXBwQWN0aW9ucy5uYXZpZ2F0ZVRvKHBhdGgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbk1peGluO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEFzaWRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGFzaWRlPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1jb2xsYXBzZVwiIGlkPVwic2lkZWJhclwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzaWRlYmFyLW1lbnVcIiBpZD1cIm5hdi1hY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1hcC1tYXJrZXJcIiBocmVmPVwiL21hcFwiPiDQmtCw0YDRgtCwPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10YXNrc1wiIGhyZWY9XCIvdGFza3NcIj4g0JfQsNC00LDRh9C4PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXCIgaHJlZj1cIi9wcm9maWxlXCI+INCd0LDRgdGC0YDQvtC50LrQuCDQv9GA0L7RhNC40LvRjzwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY2FsZW5kYXJcIiBocmVmPVwiL2NhbGVuZGFyXCI+INCa0LDQu9C10L3QtNCw0YDRjDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGV4dC1zaXplXCIgaHJlZj1cIi9wcml2YWN5XCI+INCd0LDRgdGC0YDQvtC50LrQuDwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hc2lkZT5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc2lkZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Bc2lkZVBhbmVsL0FzaWRlUGFuZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBDb250ZW50UGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHsgY2xhc3NOYW1lLCB0aXRsZSwgYm9keSwgb3RoZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgcmV0dXJuIDxtYWluIGNsYXNzTmFtZT17J0NvbnRlbnRQYWdlICcgKyBjbGFzc05hbWV9XG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogYm9keX19IC8+O1xuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGVudFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2UvQ29udGVudFBhZ2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9IZWFkZXIuanMnO1xyXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi9jb21wb25lbnRzL0Fib3V0JztcclxuaW1wb3J0IENvbnRhY3QgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRhY3QnO1xyXG5pbXBvcnQgU2VydmljZSBmcm9tICcuL2NvbXBvbmVudHMvU2VydmljZXMnO1xyXG5pbXBvcnQgUHJpY2UgZnJvbSAnLi9jb21wb25lbnRzL1ByaWNlJztcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvRm9vdGVyJztcclxuaW1wb3J0IEZlYXR1cmVzIGZyb20gJy4vY29tcG9uZW50cy9GZWF0dXJlcyc7XHJcblxyXG52YXIgTGFuZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGVudFBhZ2VcIj5cclxuICAgICAgICA8SGVhZGVyLz5cclxuICAgICAgICA8QWJvdXQvPlxyXG4gICAgICAgIDxTZXJ2aWNlLz5cclxuICAgICAgICA8RmVhdHVyZXMvPlxyXG4gICAgICAgIDxQcmljZS8+XHJcbiAgICAgICAgPENvbnRhY3QvPlxyXG4gICAgICAgIDxGb290ZXIvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFuZGluZztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvTGFuZGluZy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIkFib3V0XCIgY2xhc3NOYW1lPVwiYWJvdXRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFib3V0LWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTggYWJvdXQtbGVmdFwiPlxuICAgICAgICAgICAgICA8aDI+0KDQsNCx0L7RgtCw0LXRgiDQvdCwINCy0LDRgTwvaDI+XG4gICAgICAgICAgICAgIDxwPlRoaXMgaXMgUGhvdG9zaG9wJ3MgdmVyc2lvbiBvZiBMb3JlbSBJcHN1bS4gUHJvaW4gZ3JhdmlkYSBuaWJoIHZlbCB2ZWxpdCBhdWN0b3IgYWxpcXVldC4gQWVuZWFuIHNvbGxpY2l0dWRpbiwgbG9yZW0gcXVpcyBiaWJlbmR1bSBhdWN0b3IsIG5pc2kgZWxpdCBjb25zZXF1YXQgaXBzdW0sIG5lYyBzYWdpdHRpcyBzZW0gbmliaCBpZCBlbGl0LiBEdWlzIHNlZCBvZGlvIHNpdCBhbWV0IG5pYmggdnVscHV0YXRlIGN1cnN1cyBhIHNpdCBhbWV0IG1hdXJpcy4gTW9yYmkgYWNjdW1zYW4gaXBzdW0gdmVsaXQuPC9wPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjLWljb25zXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24xXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbjJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uM1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZU5hbWU9XCJpY29uNFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZU5hbWU9XCJjb2wtbWQtNCBhYm91dC1yaWdodFwiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZU5hbWU9XCJpbWctcmVzcG9uc2l2ZVwiIGFsdD1cIlwiIHNyYz17XCJpbWFnZXMvY2FycnktYmFncy5wbmdcIn0vPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9BYm91dC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIENvbnRhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICfQktCw0YjQtSDQuNC80Y8nLFxuICAgICAgbWFpbDogJ9CS0LDRiCBlbWFpbCcsXG4gICAgICB0aGVtZTogJ9Ci0LXQvNCwJ1xuICAgIH07XG4gIH0sXG4gIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiBldmVudC50YXJnZXQubmFtZX0se21haWw6IGV2ZW50LnRhcmdldC5tYWlsfSx7dGhlbWU6IGV2ZW50LnRhcmdldC50aGVtZX0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuc3RhdGUubmFtZTtcbiAgICB2YXIgbWFpbCA9IHRoaXMuc3RhdGUubWFpbDtcbiAgICB2YXIgdGhlbWUgPSB0aGlzLnN0YXRlLnRoZW1lO1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8ZGl2IGlkPVwiQ29udGFjdFwiIGNsYXNzTmFtZT1cImNvbnRhY3RcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8aDM+0KHQstGP0LfQttC40YLQtdGB0Ywg0YEg0L3QsNC80Lg8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC11c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb250YWN0LWluZm9cIj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImljb24tbWVudVwiPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtcImltYWdlcy8wMS5wbmdcIn0vPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZm9uXCI+XG4gICAgICAgICAgICAgICAgICA8cD4xMTEwMDAsINCg0L7RgdGB0LjRjywg0JzQvtGB0LrQstCwLCDQotCy0LXRgNGB0LrQsNGPINC0MTwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidGV4dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bWFpbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGVtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb250YWN0LWludHJvXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1pbmZvcm1hdGlvblwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb250YWN0LWluXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaW9kXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17XCJpbWFnZXMvMDIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJlbHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+KDAyNzEpIDEyMyAtIDQ1NjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1pbmZvclwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb250YWN0LWlzXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaW9kLTFcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtcImltYWdlcy8wMy5wbmdcIn0vPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImVsdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJcIj5jbGllbnRAbW9iaWxlcm91dGUuY29tPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICA8dGV4dGFyZWEgZGVmYXVsdFZhbHVlPVwiTWVzc2FnZS4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFjdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvQ29udGFjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEZlYXR1cmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIkZlYXR1cmVzXCIgY2xhc3NOYW1lPVwiRmVhdHVyZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkZlYXR1cmVzLWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRmVhdHVyZXMtaW5mby10b3BcIj5cbiAgICAgICAgICAgICAgPGgzPkxvcmVtIElwc3VtIERvbG9yIFNpdCBBbWV0PC9oMz5cbiAgICAgICAgICAgICAgPHA+VXQgd2lzaSBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaSB0YXRpb24gdWxsYW1jb3JwZXIuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlclwiPlxuICAgICAgICAgICAgICA8dWwgaWQ9XCJzbGlkZXIxXCIgY2xhc3NOYW1lPVwicnNsaWRlc1wiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmVhdHVyZXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0ZlYXR1cmVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3B5LXJpZ2h0c1wiPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIFBvd2VyZWQgYnlcbiAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9Nb2JpbGVSb3V0ZS5jb20vXCI+IE1vYmlsZVJvdXRlLjwvYT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YSBpZD1cInRvVG9wXCIgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgIDxzcGFuIGlkPVwidG9Ub3BIb3ZlclwiIGhyZWY9JyMnPjwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9Gb290ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL0FwcC9BcHAuanMnO1xyXG5pbXBvcnQgU2Vzc2lvblN0b3JlIGZyb20gJy4uLy4uLy4uL3N0b3Jlcy9TZXNzaW9uU3RvcmUuanMnO1xyXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xyXG5cclxudmFyIE1vZGFsTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJteU1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+0JfQsNC60YDRi9GC0Yw8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cIm15TW9kYWxMYWJlbFwiPtCQ0LLRgtC+0YDQuNC30LDRhtC40Y88L2g0PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhhbXBsZUlucHV0RW1haWwxXCI+0JvQvtCz0LjQvTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJleGFtcGxlSW5wdXRFbWFpbDFcIiBwbGFjZWhvbGRlcj1cItCS0LLQtdC00LjRgtC1INC70L7Qs9C40L1cIiByZWY9XCJuYW1lXCIgZGVmYXVsdFZhbHVlPVwiXCIvPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhhbXBsZUlucHV0UGFzc3dvcmQxXCI+0J/QsNGA0L7Qu9GMPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImV4YW1wbGVJbnB1dFBhc3N3b3JkMVwiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMXCIgcmVmPVwicGFzc1wiIGRlZmF1bHRWYWx1ZT1cIlwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5hdXRoUmVxfT7QktC+0LnRgtC4PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG4gIGF1dGhSZXE6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBkYXRhID0ge1xyXG4gICAgICBuYW1lIDogdGhpcy5yZWZzLm5hbWUuZ2V0RE9NTm9kZSgpLnZhbHVlLFxyXG4gICAgICBwYXNzIDogdGhpcy5yZWZzLnBhc3MuZ2V0RE9NTm9kZSgpLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgaWYgKCFkYXRhKXtcclxuICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpfVxyXG4gICAgdmFyIHdzID0gbmV3IFdlYlNvY2tldChcIndzOi8vMTg1LjQ5LjY5LjE0MzoyMDA4MFwiKTtcclxuICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2NvbmVjdGVkJyk7XHJcbi8vICAgICAgY29uc29sZS5sb2coZGF0YS5uYW1lLCBcIm5hbWVcIiwgZGF0YS5wYXNzLCAncGFzcycpO1xyXG4gICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBcInBpZFwiOiAxLFxyXG4gICAgICAgIFwibWV0aG9kXCI6IFwiYXV0aC5sb2dpblwiLFxyXG4gICAgICAgIFwiZGF0YVwiOiB7XCJsb2dpblwiOiBkYXRhLm5hbWUsIFwicGFzc3dvcmRcIjogZGF0YS5wYXNzfVxyXG4gICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgdmFyIHN0ciA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhLnN1YnN0cmluZygwLCBtZXNzYWdlLmRhdGEubGVuZ3RoIC0gMSkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdHIsICdvbm1lc3NhZ2UnKTtcclxuICAgICAgc3dpdGNoIChzdHIudHlwZSl7XHJcbiAgICAgICAgICAgICAgY2FzZSAncmVzcG9uc2UnOlxyXG4gICAgICAgICAgICAgICAgQXBwQWN0aW9ucy5sb2dpblVzZXIoc3RyLmRhdGEsIGZ1bmN0aW9uKGVycixjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVyclxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgQXBwQWN0aW9ucy5sb2FkUGFnZShcIi9tYXBcIiwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVyclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8oXCIvbWFwXCIpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RyLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdHIsICdkZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBNb2RhbFJlZ2lzdHJhdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE1vZGFsIHsuLi50aGlzLnByb3BzfSBic1N0eWxlPVwicHJpbWFyeVwiIHRpdGxlPVwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1wiIGFuaW1hdGlvbj17ZmFsc2V9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uUmVxdWVzdEhpZGV9PkNsb3NlPC9CdXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybihcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItaW5mb1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ29cIj5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJpbWctcmVzcG9uc2l2ZVwiIGFsdD1cIk1vYmlsZSBSb3V0ZVwiIHNyYz17XCJpbWFnZXMvbG9nby5wbmdcIn0vPlxyXG4gICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtZW51XCI+0JzQtdC90Y48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2aWdhdG9pblwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNIb21lXCI+0JPQu9Cw0LLQvdCw0Y88L2E+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI0Fib3V0XCI+0KPQt9C90LDRgtGMINCx0L7Qu9GM0YjQtTwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjU2VydmljZXNcIj7Qo9GB0LvRg9Cz0Lg8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI0ZlYXR1cmVzXCI+0J/RgNC40LzQtdGA0Ys8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI1ByaWNlXCI+0KbQtdC90Ys8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI0NvbnRhY3RcIj7QmtC+0L3RgtCw0LrRgtGLPC9hPlxyXG4gICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNteU1vZGFsXCI+0JLQvtC50YLQuDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxNb2RhbExvZ2luIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwiSG9tZVwiIGNsYXNzTmFtZT1cImhlYWRlci1ib3R0b21cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTQgaC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tOCBoLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgPGgxPtCc0LDRgNGI0YDRg9GC0LjQt9Cw0YLQvtGAINCy0LDRiNC10LPQviDQsdC40LfQvdC10YHQsC48L2gxPlxyXG4gICAgICAgICAgICAgIDxwPkxvbGxpcG9wIGxpcXVvcmljZSBsb2xsaXBvcCBpY2UgY3JlYW0gY2hlZXNlY2FrZSBoYWx2YWggamVsbHktby4gR3VtbWllcyBsb2xsaXBvcCBtYWNhcm9vbiBtYXJzaG1hbGxvdyBpY2luZy4gQ29va2llIGNodXBhIGNodXBzIGNha2UgZGVzc2VydCBsb2xsaXBvcCBtYXJ6aXBhbiBkb251dCBhcHBsZSBwaWUuIENvb2tpZSBjb3R0b24gY2FuZHkgb2F0IGNha2Ugc3dlZXQgcm9sbCB0b3BwaW5nIGFwcGxlIHBpZSBtYXJ6aXBhbi48L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tbGdcIj7QndCw0YfQsNGC0Ywg0YHQtdC50YfQsNGBPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvSGVhZGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgUHJpY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8ZGl2IGlkPVwiUHJpY2VcIiBjbGFzc05hbWU9XCJwcmljZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtaW5mb1wiPlxuICAgICAgICAgICAgPGgzPtCn0YLQviDQv9C+0LTQvtC50LTQtdGCINC40LzQtdC90L3QviDQstCw0Lw8L2gzPlxuICAgICAgICAgICAgPHA+VXQgd2lzaSBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaSB0YXRpb24gdWxsYW1jb3JwZXIgc3VzY2lwaXQgbG9ib3J0aXMgbmlzbCB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWdyaWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sdW1uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sLXRvcFwiPlxuICAgICAgICAgICAgICAgIDxoND5FQ09OT01ZPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC1ib3R0b21cIj5cbiAgICAgICAgICAgICAgICAgIDxoMj41JDwvaDI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLWxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicHItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+MiBHQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT7QtNC+IDMg0KPRh9Cw0YHRgtC90LjQutC+0LI8L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+0J3QsNGH0LDRgtGMINGB0LXQudGH0LDRgTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtdG9wLWluXCI+XG4gICAgICAgICAgICAgICAgPGg0PlBFUlNPTkFMPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC1ib3R0b20taW5cIj5cbiAgICAgICAgICAgICAgICAgIDxoMj4xNSQ8L2gyPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInByLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIgR0I8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+0LTQviAxNSDQo9GH0LDRgdGC0L3QuNC60L7QsjwvbGk+XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj7QndCw0YfQsNGC0Ywg0YHQtdC50YfQsNGBPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sLXRvcC1pbm5cIj5cbiAgICAgICAgICAgICAgICAgIDxoND5CVVNJTkVTUzwvaDQ+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC1ib3R0b20taW5uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj4yMCQ8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLWxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPjIgR0I8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICA8bGk+0L7RgiAxNSDQo9GH0LDRgdGC0L3QuNC60L7QsjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+0J3QsNGH0LDRgtGMINGB0LXQudGH0LDRgTwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcmljZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvUHJpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBTZXJ2aWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgaWQ9XCJTZXJ2aWNlc1wiIGNsYXNzTmFtZT1cInNlcnZpY2VzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXJ2aWNlcy1ncmlkc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24xXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24yXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24zXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9TZXJ2aWNlcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIE5hdmJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiaGVhZGVyLWFwcCBibGFjay1iZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGViYXItdG9nZ2xlLWJveFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmEgZmEtYmFycyB0b29sdGlwc1wiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiVG9nZ2xlIE5hdmlnYXRpb25cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1sb2dvIHN0YXJ0LS0+XG4gICAgICAgIDxhIGhyZWY9XCIvbWFwXCIgY2xhc3NOYW1lPVwibG9nb1wiPjxiPk1PQklMRSBST1VURTwvYj48L2E+XG4gICAgICAgIDwhLS1sb2dvIGVuZC0tPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wLW1lbnVcIj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IHB1bGwtcmlnaHQgdG9wLW1lbnVcIj5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJsb2dvdXRcIiBocmVmPVwiL1wiPkxvZ291dDwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2YmFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy9yZXF1aXJlKCcuL05vdEZvdW5kUGFnZS5sZXNzJyk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBOb3RGb3VuZFBhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+UGFnZSBOb3QgRm91bmQ8L2gxPlxuICAgICAgICA8cD5Tb3JyeSwgYnV0IHRoZSBwYWdlIHlvdSB3ZXJlIHRyeWluZyB0byB2aWV3IGRvZXMgbm90IGV4aXN0LjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdEZvdW5kUGFnZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGQ6L015REVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Ob3RGb3VuZFBhZ2UvTm90Rm91bmRQYWdlLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxudmFyIGNvcmRzID0gW1s1MS41MDgsIC0wLjExXSxbNTIuNTA4LCAtMC4xMV0sWzUzLjUwOCwgLTEuMTFdLFs0My41MDgsIC0xLjExXV07XHJcbnZhciBwb2ludDtcclxuJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hcDoge31cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzUyLjUwNSwgLTAuMDldLCAxMyk7XHJcbiAgICBMLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIEwucG9seWxpbmUoY29yZHMse1xyXG4gICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgIHdlaWdodDogM1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIGZ1bmN0aW9uIGNpcmNsZShwb2ludCl7XHJcbiAgICAgIEwuY2lyY2xlKHBvaW50LCA1MCwge1xyXG4gICAgICAgIGNvbG9yOiAncmVkJyxcclxuICAgICAgICBmaWxsQ29sb3I6ICcjZjAzJyxcclxuICAgICAgICBmaWxsT3BhY2l0eTogMC41XHJcbiAgICAgIH0pLmFkZFRvKG1hcCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb2ludEFkZChwb2ludHMpe1xyXG4gICAgICBmb3IgKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgcG9pbnQgPSBwb2ludHNbaV07XHJcbiAgICAgICAgY2lyY2xlKHBvaW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcG9pbnRBZGQoY29yZHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWFwOiBtYXB9KTtcclxuICAgIHdpbmRvdy5tYXAgPSB0aGlzO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgICAgPGRpdiBpZD1cIm1hcFwiLz5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvT1NNYXAvT1NNYXAuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgR3JpZGRsZSBmcm9tJ2dyaWRkbGUtcmVhY3QnO1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIERhdGE6IHt9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIERhdGEgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImlkXCI6IDAsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiTWF5ZXIgTGVvbmFyZFwiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkthcG93c2luXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIkhhd2FpaVwiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIlVuaXRlZCBLaW5nZG9tXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiT3ZvbG9cIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogMSxcclxuICAgICAgICBcIm5hbWVcIjogXCJLb2NoIEJlY2tlclwiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkpvaG5zb25idXJnXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIk5ldyBKZXJzZXlcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJNYWRhZ2FzY2FyXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiRXZlbnRhZ2VcIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogMixcclxuICAgICAgICBcIm5hbWVcIjogXCJMb3dlcnkgSG9wa2luc1wiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkJsYW5jb1wiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJBcml6b25hXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiVWtyYWluZVwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIkNvbXRleHRcIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDNcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogMyxcclxuICAgICAgICBcIm5hbWVcIjogXCJXYWx0ZXJzIE1heXNcIixcclxuICAgICAgICBcImNpdHlcIjogXCJHbGVuZGFsZVwiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJJbGxpbm9pc1wiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIk5ldyBaZWFsYW5kXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiQ29ycG9yYW5hXCIsXHJcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiA2XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImlkXCI6IDQsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiU2hhdyBMb3dlXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiQ291bHRlcnZpbGxsZVwiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJXeW9taW5nXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiRWN1YWRvclwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIklzb2xvZ2ljYVwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogMlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiA1LFxyXG4gICAgICAgIFwibmFtZVwiOiBcIlNoYXcgTG93ZVwiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkNvdWx0ZXJ2aWxsbGVcIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiV3lvbWluZ1wiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIkVjdWFkb3JcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJJc29sb2dpY2FcIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDJcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe0RhdGE6IERhdGF9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xyXG4gICAgICA8R3JpZGRsZSByZXN1bHRzPXt0aGlzLnN0YXRlLkRhdGF9IHRhYmxlQ2xhc3NOYW1lPVwidGFibGVcIiBjb2x1bW5zPXtbXCJpZFwiLFwibmFtZVwiLCBcImNpdHlcIiwgXCJzdGF0ZVwiLCBcImNvdW50cnlcIl19IC8+XHJcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvUlQvUlQuanNcbiAqKi8iLCJ2YXIgcGFnZXMgPSB7fTtcbnBhZ2VzLmluZGV4ID0ge1xuICBwYXRoOiAnLycsXG4gIGJvZHk6ICcnLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdNb2JpbGUgUm91dGUnIH1cbn07XG5wYWdlcy5sb2dpbiA9IHtcbiAgcGF0aDogJy9sb2dpbicsXG4gIGJvZHk6ICc8cD4xPC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ2xvZ2luJ31cbn07XG5wYWdlcy5kYXNoYm9hcmQgPSB7XG4gIHBhdGg6ICcvZGFzaGJvYXJkJyxcbiAgYm9keTogJzxwPjI8L3A+JyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnZGFzaGJvYXJkcyd9XG59O1xucGFnZXMubWFwID0ge1xuICBwYXRoOiAnL21hcCcsXG4gIGJvZHk6ICc8cD4zPC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ01hcCcgfVxufTtcbnBhZ2VzLnRhc2tzID0ge1xuICBwYXRoOiAnL3Rhc2tzJyxcbiAgYm9keTogJzxwPjQ8L3A+JyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnVGFza3MnfVxufTtcbnBhZ2VzLmNhbGVuZGFyID0ge1xuICBwYXRoOiAnL2NhbGVuZGFyJyxcbiAgYm9keTogJzxwPjU8L3A+JyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnQ2FsZW5kYXInfVxufTtcbnBhZ2VzLnByaXZhY3kgPSB7XG4gIHBhdGg6ICcvcHJpdmFjeScsXG4gIGJvZHk6ICc8cD42PC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ1ByaXZhY3kgUG9saWN5J31cbn07XG5wYWdlcy5wcm9maWxlID0ge1xuICBwYXRoOiAnL3Byb2ZpbGUnLFxuICBib2R5OiAnPHA+NzwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdQcm9maWxlJ31cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFnZXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qc1xuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGFudG9uX2dvcnNoZW5pbiBvbiAxMC4wMy4yMDE1LlxyXG4gKi9cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxudmFyIF8gPSByZXF1aXJlKCAnbG9kYXNoJyk7XHJcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG52YXIgQXBwU3RvcmUgPXJlcXVpcmUoJy4uL3N0b3Jlcy9BcHBTdG9yZScpO1xyXG52YXIgU2Vzc2lvblN0b3JlID1yZXF1aXJlKCcuLi9zdG9yZXMvU2Vzc2lvblN0b3JlJyk7XHJcbnZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSggJy4uL2NvcmUvRGlzcGF0Y2hlcicpO1xyXG52YXIgQWN0aW9uVHlwZXMgPSByZXF1aXJlKCAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJyk7XHJcbnZhciBBcHAgPSBuZXcgUmVhY3QuY3JlYXRlRmFjdG9yeShyZXF1aXJlKCcuLi9jb21wb25lbnRzL0FwcCcpKTtcclxudmFyIHRlbXBsYXRlRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcpO1xyXG52YXIgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZUZpbGUsICd1dGY4JykpO1xyXG4vL1xyXG4vLyBTZXJ2ZXItc2lkZSByZW5kZXJpbmdcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gVGhlIHRvcC1sZXZlbCBSZWFjdCBjb21wb25lbnQgKyBIVE1MIHRlbXBsYXRlIGZvciBpdFxyXG4vLyBMb2FkIHBhZ2VzIGZyb20gdGhlIGAvZmFrZURCL3BhZ2VzYCBmb2xkZXIgaW50byB0aGUgQXBwU3RvcmVcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbnN3ZXIpIHtcclxuICAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XHJcbiAgICB2YXIgc291cmNlUGFnZXMgPSByZXF1aXJlKCcuLi9kYi9mYWtlREInKTtcclxuICAgIHZhciBnZXRQYWdlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHBhZ2VzID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgaW4gc291cmNlUGFnZXMpIHtcclxuICAgICAgICB2YXIgYXR0ciA9IHNvdXJjZVBhZ2VzW2ldO1xyXG4gICAgICAgIHZhciBwYWdlID0gYXNzaWduKHt9LCB7cGF0aDogYXR0ci5wYXRoLCBib2R5OiBhdHRyLmJvZHl9LCBhdHRyLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSxcclxuICAgICAgICAgIHBhdGg6IGF0dHIucGF0aCxcclxuICAgICAgICAgIHBhZ2U6IHBhZ2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFnZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGdldFBhZ2VzKHNvdXJjZVBhZ2VzKTtcclxuICB9KSgpO1xyXG4gIGFuc3dlci5nZXQoJy9hcGkvcGFnZS8qJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgIHZhciB1cmxQYXRoID0gcmVxLnBhdGguc3Vic3RyKDkpO1xyXG4gICAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHVybFBhdGgpO1xyXG4gICAgcGFnZS51c2VyID0gU2Vzc2lvblN0b3JlLmlzTG9nZ2VkSW4oJ1Rlc3QnKTtcclxuICAgIHJlcy5zZW5kKHBhZ2UpO1xyXG4gIH0pO1xyXG4gIGFuc3dlci5nZXQoJyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcclxuICAgICAgdmFyIGRhdGEgPSB7ZGVzY3JpcHRpb246ICcnfTtcclxuICAgICAgdmFyIGFwcCA9IG5ldyBBcHAoe1xyXG4gICAgICAgIHVzZXI6IHt9LFxyXG4gICAgICAgIHBhdGg6IHJlcS5wYXRoLFxyXG4gICAgICAgIG9uU2V0VGl0bGU6IGZ1bmN0aW9uICh0aXRsZSkge1xyXG4gICAgICAgICAgZGF0YS50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25TZXRNZXRhOiBmdW5jdGlvbiAobmFtZSwgY29udGVudCkge1xyXG4gICAgICAgICAgZGF0YVtuYW1lXSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblBhZ2VOb3RGb3VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGRhdGEuYm9keSA9IFJlYWN0LnJlbmRlclRvU3RyaW5nKGFwcCk7XHJcbiAgICAgIHZhciBodG1sID0gdGVtcGxhdGUoZGF0YSk7XHJcbiAgICAgIHJlcy5zZW5kKGh0bWwpO1xyXG4gIH0pO1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL3JvdXRlcy9yZWFjdFJvdXRlLmpzXG4gKiovIiwidmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbi8vdmFyIGZhdmljb24gPSByZXF1aXJlKCdzZXJ2ZS1mYXZpY29uJyk7XG52YXIgbG9nZ2VyID0gcmVxdWlyZSgnbW9yZ2FuJyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIHNlcnZlciA9IGV4cHJlc3MoKTtcbnNlcnZlci51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSkpKTtcbi8vIHVuY29tbWVudCBhZnRlciBwbGFjaW5nIHlvdXIgZmF2aWNvbiBpbiAvcHVibGljXG4vL2FwcC51c2UoZmF2aWNvbihfX2Rpcm5hbWUgKyAnL3B1YmxpYy9mYXZpY29uLmljbycpKTtcbnNlcnZlci51c2UobG9nZ2VyKCdkZXYnKSk7XG4vL3VzZSByb3V0ZXJcbnJlcXVpcmUoJy4vcm91dGVzL3JlYWN0Um91dGUnKShzZXJ2ZXIpO1xuLy8gZXJyb3IgaGFuZGxlcnNcbi8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcbi8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXG5pZiAoc2VydmVyLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgc2VydmVyLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIGVycm9yOiBlcnJcbiAgICB9KTtcbiAgfSk7XG59XG4vLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcbi8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5zZXJ2ZXIudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5yZW5kZXIoJ2Vycm9yJywge1xuICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgIGVycm9yOiB7fVxuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkOi9NeURFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhZDovTXlERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL3NlcnZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmbHV4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmbHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZzXCJcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JpZGRsZS1yZWFjdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ3JpZGRsZS1yZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImh0dHBcIlxuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaFwiXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9yZ2FuXCJcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwic3VwZXJhZ2VudFwiXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InNlcnZlci5qcyJ9