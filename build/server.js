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
  
  var serverApp = __webpack_require__(30);
  var debug = __webpack_require__(31)("MobileRoute");
  var http = __webpack_require__(37);
  
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

  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var keyMirror = _interopRequire(__webpack_require__(10));
  
  var ActionTypes = keyMirror({
  
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
  
  var Flux = _interopRequire(__webpack_require__(34));
  
  var PayloadSources = _interopRequire(__webpack_require__(6));
  
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
      console.log(payload);
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

  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(8));
  
  var http = _interopRequire(__webpack_require__(40));
  
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
    }
  
  };

/***/ },
/* 6 */
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
  
  var keyMirror = _interopRequire(__webpack_require__(10));
  
  var PayloadSources = keyMirror({
  
    VIEW_ACTION: null,
    SERVER_ACTION: null
  
  });
  
  module.exports = PayloadSources;

/***/ },
/* 7 */
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
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var PayloadSources = _interopRequire(__webpack_require__(6));
  
  var EventEmitter = _interopRequire(__webpack_require__(32));
  
  var assign = _interopRequire(__webpack_require__(4));
  
  var CHANGE_EVENT = "change";
  
  var _pages = {};
  var _loading = false;
  
  if (true) {
    _pages["/"] = { title: "Home Page" };
    _pages["/privacy"] = { title: "Privacy Policy" };
    _pages["/map"] = { title: "Map" };
  }
  
  var AppStore = assign({}, EventEmitter.prototype, {
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    getPage: function getPage(path) {
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
          }
        }
        AppStore.emitChange();
        break;
  
      default:
        // Do nothing
        console.log(PayloadSources);
    }
  });
  
  module.exports = AppStore;

/***/ },
/* 8 */
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
/* 9 */
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
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  "use strict";
  
  var invariant = __webpack_require__(9);
  
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var invariant = _interopRequire(__webpack_require__(9));
  
  var AppActions = _interopRequire(__webpack_require__(5));
  
  var NavigationMixin = _interopRequire(__webpack_require__(13));
  
  var AppStore = _interopRequire(__webpack_require__(7));
  
  var Navbar = _interopRequire(__webpack_require__(24));
  
  var ContentPage = _interopRequire(__webpack_require__(15));
  
  var NotFoundPage = _interopRequire(__webpack_require__(25));
  
  var AsidePanel = _interopRequire(__webpack_require__(14));
  
  var Map = _interopRequire(__webpack_require__(26));
  
  var RT = _interopRequire(__webpack_require__(27));
  
  var Landing = _interopRequire(__webpack_require__(16));
  
  
  
  
  var Application = React.createClass({
    displayName: "Application",
    mixins: [NavigationMixin],
  
    propTypes: {
      path: React.PropTypes.string.isRequired,
      onSetTitle: React.PropTypes.func.isRequired,
      onSetMeta: React.PropTypes.func.isRequired,
      onPageNotFound: React.PropTypes.func.isRequired
    },
    render: function render() {
      var page = AppStore.getPage(this.props.path);
      invariant(page !== undefined, "Failed to load page content.");
      this.props.onSetTitle(page.title);
  
      if (page.type === "notfound") {
        this.props.onPageNotFound();
        return React.createElement(NotFoundPage, page);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(8));
  
  var AppActions = _interopRequire(__webpack_require__(5));
  
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
  
    handlePopState: function handlePopState(event) {
      if (event.state) {
        var path = event.state.path;
        // TODO: Replace current location
        // replace(path, event.state);
      } else {
        AppActions.navigateTo(window.location.pathname);
      }
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Header = _interopRequire(__webpack_require__(21));
  
  var About = _interopRequire(__webpack_require__(17));
  
  var Contact = _interopRequire(__webpack_require__(18));
  
  var Service = _interopRequire(__webpack_require__(23));
  
  var Price = _interopRequire(__webpack_require__(22));
  
  var Footer = _interopRequire(__webpack_require__(20));
  
  var Features = _interopRequire(__webpack_require__(19));
  
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var ModalLogin = React.createClass({
    displayName: "ModalLogin",
    getInitialState: function () {
      return {
        name: "",
        pass: ""
      };
    },
    handleChange: function (event) {
      this.setState({ name: event.target.name, pass: event.target.pass });
    },
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
                    React.createElement("input", { type: "text", className: "form-control", id: "exampleInputEmail1", placeholder: "Введите логин", ref: "name", defaultValue: this.props.name, onChange: this.handleChange })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { htmlFor: "exampleInputPassword1" },
                      "Пароль"
                    ),
                    React.createElement("input", { type: "password", className: "form-control", id: "exampleInputPassword1", placeholder: "Введите пароль", ref: "pass", defaultValue: this.props.pass, onChange: this.handleChange })
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
        console.log(data.name, "name", data.pass, "pass");
        ws.send(JSON.stringify({
          pid: 1,
          method: "auth.login",
          data: { login: data.name, password: data.pass }
        }));
      };
      ws.onmessage = function (message) {
        var str = message.data.substring(0, message.data.length - 1);
        console.log(JSON.parse(str));
      };
    }
  });
  var authReq = function (event) {
    event.preventDefault();
    console.log(event, "event from auth");
    //var ws = new WebSocket("ws://185.49.69.143:20080");
    //ws.onopen = function () {
    //  console.log('conected');
    //  ws.send(JSON.stringify({
    //    "pid": 1,
    //    "method": "auth.login",
    //    "data": {"login": event.name, "password": event.pass}
    //  }));
    //};
    //ws.onmessage = function (message) {
    //  var str = message.data.substring(0, message.data.length - 1);
    //  console.log(JSON.parse(str))
    //};
  };
  
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
                    { bsStyle: "primary", bsSize: "medium", "data-toggle": "modal", "data-target": "#myModal" },
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
                  ),
                  React.createElement(
                    "button",
                    { className: "btn btn-warning btn-lg", href: "#About" },
                    "Узнать больше"
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Griddle = _interopRequire(__webpack_require__(36));
  
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  /**
   * Created by anton_gorshenin on 10.03.2015.
   */
  var React = __webpack_require__(1);
  var fs = __webpack_require__(35);
  var _ = __webpack_require__(38);
  var path = __webpack_require__(11);
  var AppStore = __webpack_require__(7);
  var Dispatcher = __webpack_require__(3);
  var ActionTypes = __webpack_require__(2);
  var App = React.createFactory(__webpack_require__(12));
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
      var sourcePages = __webpack_require__(28);
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
      res.send(page);
    });
    answer.get("*", function (req, res) {
      var data = { description: "" };
      var app = new App({
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var express = __webpack_require__(33);
  var path = __webpack_require__(11);
  //var favicon = require('serve-favicon');
  var logger = __webpack_require__(39);
  var React = __webpack_require__(1);
  var server = express();
  server.use(express["static"](path.join(__dirname)));
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  server.use(logger("dev"));
  //use router
  __webpack_require__(29)(server);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("debug");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("eventemitter3");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("flux");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("griddle-react");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("http");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("morgan");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQxMWQ0YzlhZmY5YzkwNTI5YzQiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYmluL3N0YXJ0dXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29yZS9EaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcy5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zdG9yZXMvQXBwU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FzaWRlUGFuZWwvQXNpZGVQYW5lbC5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlL0NvbnRlbnRQYWdlLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9MYW5kaW5nLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0Fib3V0LmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0NvbnRhY3QuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRm9vdGVyLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9QcmljZS5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9TZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9PU01hcC9PU01hcC5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL1JUL1JULmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9yb3V0ZXMvcmVhY3RSb3V0ZS5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudGVtaXR0ZXIzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZsdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyaWRkbGUtcmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ2xDQSxNQUFJLFNBQVMsR0FBRyxtQkFBTyxDQUFDLEVBQWMsQ0FBQyxDQUFDO0FBQ3hDLE1BQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUMsTUFBSSxJQUFJLEdBQUcsbUJBQU8sQ0FBQyxFQUFNLENBQUMsQ0FBQzs7Ozs7O0FBTTNCLE1BQUksSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFD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SSxHQUFHLENBQUMsQ0FBQztBQUM5QixTQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNsQixlQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87QUFDcEIsYUFBSyxFQUFFLEdBQUc7T0FDWCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSjs7O0FBR0QsUUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN2QyxPQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7QUFDOUIsT0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDbEIsYUFBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO0FBQ3BCLFdBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsUUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLEM7Ozs7OztBQ2pDdkIsb0M7Ozs7OztBQ0FBLDRDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEseUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGJkMTFkNGM5YWZmOWM5MDUyOWM0XG4gKiovIiwiLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL1xyXG5cclxudmFyIHNlcnZlckFwcCA9IHJlcXVpcmUoJy4uL3NlcnZlci5qcycpO1xyXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdNb2JpbGVSb3V0ZScpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgcG9ydCBmcm9tIGVudmlyb25tZW50IGFuZCBzdG9yZSBpbiBFeHByZXNzLlxyXG4gKi9cclxuXHJcbnZhciBwb3J0ID0gbm9ybWFsaXplUG9ydChwcm9jZXNzLmVudi5QT1JUIHx8ICczMDAwJyk7XHJcbnNlcnZlckFwcC5zZXQoJ3BvcnQnLCBwb3J0KTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgSFRUUCBzZXJ2ZXIuXHJcbiAqL1xyXG5cclxudmFyIHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHNlcnZlckFwcCk7XHJcbmNvbnNvbGUubG9nKFwiU2VydmVyIHN0YXJ0ZWRcIik7XHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gcHJvdmlkZWQgcG9ydCwgb24gYWxsIG5ldHdvcmsgaW50ZXJmYWNlcy5cclxuICovXHJcblxyXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xyXG5zZXJ2ZXIub24oJ2Vycm9yJywgb25FcnJvcik7XHJcbnNlcnZlci5vbignbGlzdGVuaW5nJywgb25MaXN0ZW5pbmcpO1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSBhIHBvcnQgaW50byBhIG51bWJlciwgc3RyaW5nLCBvciBmYWxzZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVQb3J0KHZhbCkge1xyXG4gIHZhciBwb3J0ID0gcGFyc2VJbnQodmFsLCAxMCk7XHJcblxyXG4gIGlmIChpc05hTihwb3J0KSkge1xyXG4gICAgLy8gbmFtZWQgcGlwZVxyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9XHJcblxyXG4gIGlmIChwb3J0ID49IDApIHtcclxuICAgIC8vIHBvcnQgbnVtYmVyXHJcbiAgICByZXR1cm4gcG9ydDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImVycm9yXCIgZXZlbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xyXG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG5cclxuICB2YXIgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJ1xyXG4gICAgPyAnUGlwZSAnICsgcG9ydFxyXG4gICAgOiAnUG9ydCAnICsgcG9ydDtcclxuXHJcbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xyXG4gIHN3aXRjaCAoZXJyb3IuY29kZSkge1xyXG4gICAgY2FzZSAnRUFDQ0VTJzpcclxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJyk7XHJcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdFQUREUklOVVNFJzpcclxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyBpcyBhbHJlYWR5IGluIHVzZScpO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwibGlzdGVuaW5nXCIgZXZlbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb25MaXN0ZW5pbmcoKSB7XHJcbiAgdmFyIGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xyXG4gIHZhciBiaW5kID0gdHlwZW9mIGFkZHIgPT09ICdzdHJpbmcnXHJcbiAgICA/ICdwaXBlICcgKyBhZGRyXHJcbiAgICA6ICdwb3J0ICcgKyBhZGRyLnBvcnQ7XHJcbiAgZGVidWcoJ0xpc3RlbmluZyBvbiAnICsgYmluZCk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2Jpbi9zdGFydHVwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xyXG5cclxudmFyIEFjdGlvblR5cGVzID0ga2V5TWlycm9yKHtcclxuXHJcbiAgTE9BRF9QQUdFOiBudWxsLFxyXG4gIExPQURfUEFHRV9TVUNDRVNTOiBudWxsLFxyXG4gIExPQURfUEFHRV9FUlJPUjogbnVsbCxcclxuICBDSEFOR0VfTE9DQVRJT046IG51bGxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb25UeXBlcztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9BY3Rpb25UeXBlcy5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRmx1eCBmcm9tICdmbHV4JztcbmltcG9ydCBQYXlsb2FkU291cmNlcyBmcm9tICcuLi9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbic7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gdGhhdCBvcGVyYXRlcyBhcyB0aGUgY2VudHJhbCBodWIgZm9yIGFwcGxpY2F0aW9uIHVwZGF0ZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiB2aXNpdCBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L1xuICovXG52YXIgRGlzcGF0Y2hlciA9IGFzc2lnbihuZXcgRmx1eC5EaXNwYXRjaGVyKCksIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGV0YWlscyBvZiB0aGUgYWN0aW9uLCBpbmNsdWRpbmcgdGhlIGFjdGlvbidzXG4gICAqIHR5cGUgYW5kIGFkZGl0aW9uYWwgZGF0YSBjb21pbmcgZnJvbSB0aGUgc2VydmVyLlxuICAgKi9cbiAgaGFuZGxlU2VydmVyQWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5TRVJWRVJfQUNUSU9OLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9O1xuICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXG4gICAqL1xuICBoYW5kbGVWaWV3QWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTixcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcbiAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29yZS9EaXNwYXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi4vY29yZS9EaXNwYXRjaGVyJztcclxuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XHJcbmltcG9ydCBFeGVjdXRpb25FbnZpcm9ubWVudCBmcm9tICdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgaHR0cCBmcm9tICdzdXBlcmFnZW50JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICBuYXZpZ2F0ZVRvKHBhdGgpIHtcclxuICAgIGlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuQ0hBTkdFX0xPQ0FUSU9OLCBwYXRoOiBwYXRoXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBsb2FkUGFnZShwYXRoLCBjYikge1xyXG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLCBwYXRoOiBwYXRoXHJcbiAgICB9KTtcclxuXHJcbiAgICBodHRwLmdldCgnL2FwaS9wYWdlJyArIHBhdGgpXHJcbiAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSwgcGF0aDogcGF0aCwgZXJyOiBlcnIsIHBhZ2U6IHJlcy5ib2R5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICBjYigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2FjdGlvbnMvQXBwQWN0aW9ucy5qc1xuICoqLyIsIi8qXHJcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XHJcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG52YXIgUGF5bG9hZFNvdXJjZXMgPSBrZXlNaXJyb3Ioe1xyXG5cclxuICBWSUVXX0FDVElPTjogbnVsbCxcclxuICBTRVJWRVJfQUNUSU9OOiBudWxsXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGF5bG9hZFNvdXJjZXM7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanNcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcclxuaW1wb3J0IFBheWxvYWRTb3VyY2VzIGZyb20gJy4uL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcyc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XHJcbmltcG9ydCBhc3NpZ24gZnJvbSAncmVhY3QvbGliL09iamVjdC5hc3NpZ24nO1xyXG5cclxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xyXG5cclxudmFyIF9wYWdlcyA9IHt9O1xyXG52YXIgX2xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbmlmIChfX1NFUlZFUl9fKSB7XHJcbiAgX3BhZ2VzWycvJ10gPSB7dGl0bGU6ICdIb21lIFBhZ2UnfTtcclxuICBfcGFnZXNbJy9wcml2YWN5J10gPSB7dGl0bGU6ICdQcml2YWN5IFBvbGljeSd9O1xyXG4gIF9wYWdlc1snL21hcCddID0ge3RpdGxlOiAnTWFwJ307XHJcbn1cclxuXHJcbnZhciBBcHBTdG9yZSA9IGFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHBhZ2UgZGF0YSBieSB0aGUgZ2l2ZW4gVVJMIHBhdGguXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBVUkwgcGF0aC5cclxuICAgKiBAcmV0dXJucyB7Kn0gUGFnZSBkYXRhLlxyXG4gICAqL1xyXG4gIGdldFBhZ2UocGF0aCkge1xyXG4gICAgcmV0dXJuIHBhdGggaW4gX3BhZ2VzID8gX3BhZ2VzW3BhdGhdIDoge1xyXG4gICAgICB0aXRsZTogJ1BhZ2UgTm90IEZvdW5kJyxcclxuICAgICAgdHlwZTogJ25vdGZvdW5kJ1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cclxuICAgKi9cclxuICBlbWl0Q2hhbmdlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1pdChDSEFOR0VfRVZFTlQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgbmV3IGNoYW5nZSBldmVudCBsaXN0ZW5lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cclxuICAgKi9cclxuICBvZmYoY2FsbGJhY2spIHtcclxuICAgIHRoaXMub2ZmKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuQXBwU3RvcmUuZGlzcGF0Y2hlclRva2VuID0gRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xyXG4gIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcclxuXHJcbiAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xyXG5cclxuICAgIGNhc2UgQWN0aW9uVHlwZXMuTE9BRF9QQUdFOlxyXG4gICAgICBpZiAoYWN0aW9uLnNvdXJjZSA9PT0gUGF5bG9hZFNvdXJjZXMuVklFV19BQ1RJT04pIHtcclxuICAgICAgICBfbG9hZGluZyA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24uZXJyKSB7XHJcbiAgICAgICAgICBfcGFnZXNbYWN0aW9uLnBhdGhdID0gYWN0aW9uLnBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gRG8gbm90aGluZ1xyXG5jb25zb2xlLmxvZyhQYXlsb2FkU291cmNlcylcclxuICB9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuLypqc2xpbnQgZXZpbDogdHJ1ZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgb2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaiksXG4gICAgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nXG4gICkgOiBpbnZhcmlhbnQob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKTtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicGF0aFwiXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3JlYWN0L2xpYi9pbnZhcmlhbnQnO1xuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnLi4vLi4vYWN0aW9ucy9BcHBBY3Rpb25zJztcbmltcG9ydCBOYXZpZ2F0aW9uTWl4aW4gZnJvbSAnLi9OYXZpZ2F0aW9uTWl4aW4nO1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJy4uLy4uL3N0b3Jlcy9BcHBTdG9yZSc7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL05hdmlnYXRpb24nO1xuaW1wb3J0IENvbnRlbnRQYWdlIGZyb20gJy4uL0NvbnRlbnRQYWdlJztcbmltcG9ydCBOb3RGb3VuZFBhZ2UgZnJvbSAnLi4vTm90Rm91bmRQYWdlJztcbmltcG9ydCBBc2lkZVBhbmVsIGZyb20gJy4uL0FzaWRlUGFuZWwnO1xuaW1wb3J0IE1hcCBmcm9tICcuLi9PU01hcCc7XG5pbXBvcnQgUlQgZnJvbSAnLi4vUlQvUlQnO1xuaW1wb3J0IExhbmRpbmcgZnJvbSAnLi4vTGFuZGluZy9MYW5kaW5nLmpzJ1xuXG5cbnZhciBBcHBsaWNhdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbTmF2aWdhdGlvbk1peGluXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZXRUaXRsZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNldE1ldGE6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25QYWdlTm90Rm91bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciBwYWdlID0gQXBwU3RvcmUuZ2V0UGFnZSh0aGlzLnByb3BzLnBhdGgpO1xuICAgIGludmFyaWFudChwYWdlICE9PSB1bmRlZmluZWQsICdGYWlsZWQgdG8gbG9hZCBwYWdlIGNvbnRlbnQuJyk7XG4gICAgdGhpcy5wcm9wcy5vblNldFRpdGxlKHBhZ2UudGl0bGUpO1xuXG4gICAgaWYgKHBhZ2UudHlwZSA9PT0gJ25vdGZvdW5kJykge1xuICAgICAgdGhpcy5wcm9wcy5vblBhZ2VOb3RGb3VuZCgpO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90Rm91bmRQYWdlLCBwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XG4gICAgICB7dGhpcy5wcm9wcy5wYXRoID09PSAnLycgP1xuICAgICAgICA8TGFuZGluZy8+OlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgICA8TmF2YmFyLz5cbiAgICAgICAgICA8QXNpZGVQYW5lbC8+XG4gICAgICAgIDwvZGl2Pn1cbiAgICAgICAge3RoaXMucHJvcHMucGF0aCA9PT0gJy9tYXAnICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLWNvbnRhaW5lclwiPlxuICAgICAgICA8TWFwLz5cbiAgICAgICAgPFJULz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFeGVjdXRpb25FbnZpcm9ubWVudCBmcm9tICdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnO1xuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnLi4vLi4vYWN0aW9ucy9BcHBBY3Rpb25zJztcblxudmFyIE5hdmlnYXRpb25NaXhpbiA9IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcbiAgfSxcblxuICBoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuICAgIGlmIChldmVudC5zdGF0ZSkge1xuICAgICAgdmFyIHBhdGggPSBldmVudC5zdGF0ZS5wYXRoO1xuICAgICAgLy8gVE9ETzogUmVwbGFjZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgICAvLyByZXBsYWNlKHBhdGgsIGV2ZW50LnN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQXBwQWN0aW9ucy5uYXZpZ2F0ZVRvKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBsaW5rXG4gICAgdmFyIGVsID0gZXZlbnQudGFyZ2V0O1xuICAgIHdoaWxlIChlbCAmJiBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7XG4gICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIGlmICghZWwgfHwgZWwubm9kZU5hbWUgIT09ICdBJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElnbm9yZSBpZiB0YWcgaGFzXG4gICAgLy8gMS4gXCJkb3dubG9hZFwiIGF0dHJpYnV0ZVxuICAgIC8vIDIuIHJlbD1cImV4dGVybmFsXCIgYXR0cmlidXRlXG4gICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIG5vbi1oYXNoIGZvciB0aGUgc2FtZSBwYXRoXG4gICAgdmFyIGxpbmsgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICBpZiAoZWwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lICYmIChlbC5oYXNoIHx8ICcjJyA9PT0gbGluaykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbWFpbHRvOiBpbiB0aGUgaHJlZlxuICAgIGlmIChsaW5rICYmIGxpbmsuaW5kZXhPZignbWFpbHRvOicpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0YXJnZXRcbiAgICBpZiAoZWwudGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gWC1vcmlnaW5cbiAgICB2YXIgb3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArXG4gICAgICAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICBpZiAoIShlbC5ocmVmICYmIGVsLmhyZWYuaW5kZXhPZihvcmlnaW4pID09PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlYnVpbGQgcGF0aFxuICAgIHZhciBwYXRoID0gZWwucGF0aG5hbWUgKyBlbC5zZWFyY2ggKyAoZWwuaGFzaCB8fCAnJyk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIEFwcEFjdGlvbnMubG9hZFBhZ2UocGF0aCwgKCkgPT4ge1xuICAgICAgQXBwQWN0aW9ucy5uYXZpZ2F0ZVRvKHBhdGgpO1xuICAgIH0pO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbk1peGluO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEFzaWRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGFzaWRlPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1jb2xsYXBzZVwiIGlkPVwic2lkZWJhclwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzaWRlYmFyLW1lbnVcIiBpZD1cIm5hdi1hY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1hcC1tYXJrZXJcIiBocmVmPVwiL21hcFwiPiDQmtCw0YDRgtCwPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10YXNrc1wiIGhyZWY9XCIvdGFza3NcIj4g0JfQsNC00LDRh9C4PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXCIgaHJlZj1cIi9wcm9maWxlXCI+INCd0LDRgdGC0YDQvtC50LrQuCDQv9GA0L7RhNC40LvRjzwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY2FsZW5kYXJcIiBocmVmPVwiL2NhbGVuZGFyXCI+INCa0LDQu9C10L3QtNCw0YDRjDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGV4dC1zaXplXCIgaHJlZj1cIi9wcml2YWN5XCI+INCd0LDRgdGC0YDQvtC50LrQuDwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hc2lkZT5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc2lkZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FzaWRlUGFuZWwvQXNpZGVQYW5lbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIENvbnRlbnRQYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIHRpdGxlLCBib2R5LCBvdGhlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICByZXR1cm4gPG1haW4gY2xhc3NOYW1lPXsnQ29udGVudFBhZ2UgJyArIGNsYXNzTmFtZX1cbiAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBib2R5fX0gLz47XG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250ZW50UGFnZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlL0NvbnRlbnRQYWdlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyLmpzJztcbmltcG9ydCBBYm91dCBmcm9tICcuL2NvbXBvbmVudHMvQWJvdXQnO1xuaW1wb3J0IENvbnRhY3QgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRhY3QnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9jb21wb25lbnRzL1NlcnZpY2VzJztcbmltcG9ydCBQcmljZSBmcm9tICcuL2NvbXBvbmVudHMvUHJpY2UnO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvRm9vdGVyJztcbmltcG9ydCBGZWF0dXJlcyBmcm9tICcuL2NvbXBvbmVudHMvRmVhdHVyZXMnO1xuXG52YXIgTGFuZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRlbnRQYWdlXCI+XG4gICAgICAgIDxIZWFkZXIvPlxuICAgICAgICA8QWJvdXQvPlxuICAgICAgICA8U2VydmljZS8+XG4gICAgICAgIDxGZWF0dXJlcy8+XG4gICAgICAgIDxQcmljZS8+XG4gICAgICAgIDxDb250YWN0Lz5cbiAgICAgICAgPEZvb3Rlci8+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGFuZGluZztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvTGFuZGluZy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIkFib3V0XCIgY2xhc3NOYW1lPVwiYWJvdXRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFib3V0LWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTggYWJvdXQtbGVmdFwiPlxuICAgICAgICAgICAgICA8aDI+0KDQsNCx0L7RgtCw0LXRgiDQvdCwINCy0LDRgTwvaDI+XG4gICAgICAgICAgICAgIDxwPlRoaXMgaXMgUGhvdG9zaG9wJ3MgdmVyc2lvbiBvZiBMb3JlbSBJcHN1bS4gUHJvaW4gZ3JhdmlkYSBuaWJoIHZlbCB2ZWxpdCBhdWN0b3IgYWxpcXVldC4gQWVuZWFuIHNvbGxpY2l0dWRpbiwgbG9yZW0gcXVpcyBiaWJlbmR1bSBhdWN0b3IsIG5pc2kgZWxpdCBjb25zZXF1YXQgaXBzdW0sIG5lYyBzYWdpdHRpcyBzZW0gbmliaCBpZCBlbGl0LiBEdWlzIHNlZCBvZGlvIHNpdCBhbWV0IG5pYmggdnVscHV0YXRlIGN1cnN1cyBhIHNpdCBhbWV0IG1hdXJpcy4gTW9yYmkgYWNjdW1zYW4gaXBzdW0gdmVsaXQuPC9wPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjLWljb25zXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24xXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbjJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uM1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZU5hbWU9XCJpY29uNFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZU5hbWU9XCJjb2wtbWQtNCBhYm91dC1yaWdodFwiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZU5hbWU9XCJpbWctcmVzcG9uc2l2ZVwiIGFsdD1cIlwiIHNyYz17XCJpbWFnZXMvY2FycnktYmFncy5wbmdcIn0vPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0Fib3V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgQ29udGFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ9CS0LDRiNC1INC40LzRjycsXG4gICAgICBtYWlsOiAn0JLQsNGIIGVtYWlsJyxcbiAgICAgIHRoZW1lOiAn0KLQtdC80LAnXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe25hbWU6IGV2ZW50LnRhcmdldC5uYW1lfSx7bWFpbDogZXZlbnQudGFyZ2V0Lm1haWx9LHt0aGVtZTogZXZlbnQudGFyZ2V0LnRoZW1lfSk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBuYW1lID0gdGhpcy5zdGF0ZS5uYW1lO1xuICAgIHZhciBtYWlsID0gdGhpcy5zdGF0ZS5tYWlsO1xuICAgIHZhciB0aGVtZSA9IHRoaXMuc3RhdGUudGhlbWU7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgaWQ9XCJDb250YWN0XCIgY2xhc3NOYW1lPVwiY29udGFjdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMz7QodCy0Y/Qt9C20LjRgtC10YHRjCDRgSDQvdCw0LzQuDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWN0LXVzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02IGNvbnRhY3QtaW5mb1wiPlxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaWNvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImlvblwiPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e1wiaW1hZ2VzLzAxLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmb25cIj5cbiAgICAgICAgICAgICAgICAgIDxwPjExMTAwMCwg0KDQvtGB0YHQuNGPLCDQnNC+0YHQutCy0LAsINCi0LLQtdGA0YHQutCw0Y8g0LQxPC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXttYWlsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidGV4dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoZW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02IGNvbnRhY3QtaW50cm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWN0LWluZm9ybWF0aW9uXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbnRhY3QtaW5cIj5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJpb2RcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtcImltYWdlcy8wMi5wbmdcIn0vPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImVsdFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD4oMDI3MSkgMTIzIC0gNDU2PC9wPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWN0LWluZm9yXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbnRhY3QtaXNcIj5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJpb2QtMVwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e1wiaW1hZ2VzLzAzLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZWx0LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiPmNsaWVudEBtb2JpbGVyb3V0ZS5jb208L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBkZWZhdWx0VmFsdWU9XCJNZXNzYWdlLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWVOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0NvbnRhY3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBGZWF0dXJlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgaWQ9XCJGZWF0dXJlc1wiIGNsYXNzTmFtZT1cIkZlYXR1cmVzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJGZWF0dXJlcy1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkZlYXR1cmVzLWluZm8tdG9wXCI+XG4gICAgICAgICAgICAgIDxoMz5Mb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldDwvaDM+XG4gICAgICAgICAgICAgIDxwPlV0IHdpc2kgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2kgdGF0aW9uIHVsbGFtY29ycGVyLjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJcIj5cbiAgICAgICAgICAgICAgPHVsIGlkPVwic2xpZGVyMVwiIGNsYXNzTmFtZT1cInJzbGlkZXNcIj5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8aW1nIGFsdD1cIlwiIHNyYz17XCJpbWFnZXMvc2xpZGVyLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGFsdD1cIlwiIHNyYz17XCJpbWFnZXMvc2xpZGVyLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIGFsdD1cIlwiIHNyYz17XCJpbWFnZXMvc2xpZGVyLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZlYXR1cmVzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0ZlYXR1cmVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3B5LXJpZ2h0c1wiPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIFBvd2VyZWQgYnlcbiAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9Nb2JpbGVSb3V0ZS5jb20vXCI+IE1vYmlsZVJvdXRlLjwvYT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YSBpZD1cInRvVG9wXCIgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgIDxzcGFuIGlkPVwidG9Ub3BIb3ZlclwiIGhyZWY9JyMnPjwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0Zvb3Rlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIE1vZGFsTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHBhc3M6ICcnXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe25hbWU6IGV2ZW50LnRhcmdldC5uYW1lLHBhc3M6IGV2ZW50LnRhcmdldC5wYXNzfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPVwibXlNb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj7Ql9Cw0LrRgNGL0YLRjDwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cIm15TW9kYWxMYWJlbFwiPtCQ0LLRgtC+0YDQuNC30LDRhtC40Y88L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleGFtcGxlSW5wdXRFbWFpbDFcIj7Qm9C+0LPQuNC9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJleGFtcGxlSW5wdXRFbWFpbDFcIiBwbGFjZWhvbGRlcj1cItCS0LLQtdC00LjRgtC1INC70L7Qs9C40L1cIiByZWY9XCJuYW1lXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLm5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhhbXBsZUlucHV0UGFzc3dvcmQxXCI+0J/QsNGA0L7Qu9GMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJleGFtcGxlSW5wdXRQYXNzd29yZDFcIiBwbGFjZWhvbGRlcj1cItCS0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjFwiIHJlZj1cInBhc3NcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucGFzc30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuYXV0aFJlcX0+0JLQvtC50YLQuDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIGF1dGhSZXE6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBuYW1lICAgICA6IHRoaXMucmVmcy5uYW1lLmdldERPTU5vZGUoKS52YWx1ZSxcbiAgICAgIHBhc3MgOiB0aGlzLnJlZnMucGFzcy5nZXRET01Ob2RlKCkudmFsdWVcbiAgICB9O1xuXG4gICAgaWYgKCFkYXRhKXtcbiAgICBjb25zb2xlLmxvZyhcImVyclwiKX1cbiAgICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly8xODUuNDkuNjkuMTQzOjIwMDgwXCIpO1xuICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb25lY3RlZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YS5uYW1lLCBcIm5hbWVcIiwgZGF0YS5wYXNzLCAncGFzcycpXG4gICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgXCJwaWRcIjogMSxcbiAgICAgICAgXCJtZXRob2RcIjogXCJhdXRoLmxvZ2luXCIsXG4gICAgICAgIFwiZGF0YVwiOiB7XCJsb2dpblwiOiBkYXRhLm5hbWUsIFwicGFzc3dvcmRcIjogZGF0YS5wYXNzfVxuICAgICAgfSkpO1xuICAgIH07XG4gICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBzdHIgPSBtZXNzYWdlLmRhdGEuc3Vic3RyaW5nKDAsIG1lc3NhZ2UuZGF0YS5sZW5ndGggLSAxKTtcbiAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2Uoc3RyKSlcbiAgICB9O1xuICB9XG59KTtcbnZhciBhdXRoUmVxID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coZXZlbnQsXCJldmVudCBmcm9tIGF1dGhcIik7XG4gIC8vdmFyIHdzID0gbmV3IFdlYlNvY2tldChcIndzOi8vMTg1LjQ5LjY5LjE0MzoyMDA4MFwiKTtcbiAgLy93cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIC8vICBjb25zb2xlLmxvZygnY29uZWN0ZWQnKTtcbiAgLy8gIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAvLyAgICBcInBpZFwiOiAxLFxuICAvLyAgICBcIm1ldGhvZFwiOiBcImF1dGgubG9naW5cIixcbiAgLy8gICAgXCJkYXRhXCI6IHtcImxvZ2luXCI6IGV2ZW50Lm5hbWUsIFwicGFzc3dvcmRcIjogZXZlbnQucGFzc31cbiAgLy8gIH0pKTtcbiAgLy99O1xuICAvL3dzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIC8vICB2YXIgc3RyID0gbWVzc2FnZS5kYXRhLnN1YnN0cmluZygwLCBtZXNzYWdlLmRhdGEubGVuZ3RoIC0gMSk7XG4gIC8vICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHN0cikpXG4gIC8vfTtcbn07XG5cbnZhciBNb2RhbFJlZ2lzdHJhdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIHsuLi50aGlzLnByb3BzfSBic1N0eWxlPVwicHJpbWFyeVwiIHRpdGxlPVwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1wiIGFuaW1hdGlvbj17ZmFsc2V9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25SZXF1ZXN0SGlkZX0+Q2xvc2U8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ29cIj5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImltZy1yZXNwb25zaXZlXCIgYWx0PVwiTW9iaWxlIFJvdXRlXCIgc3JjPXtcImltYWdlcy9sb2dvLnBuZ1wifS8+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWVudVwiPtCc0LXQvdGOPC9zcGFuPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZpZ2F0b2luXCI+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjSG9tZVwiPtCT0LvQsNCy0L3QsNGPPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNBYm91dFwiPtCj0LfQvdCw0YLRjCDQsdC+0LvRjNGI0LU8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI1NlcnZpY2VzXCI+0KPRgdC70YPQs9C4PC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNGZWF0dXJlc1wiPtCf0YDQuNC80LXRgNGLPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNQcmljZVwiPtCm0LXQvdGLPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNDb250YWN0XCI+0JrQvtC90YLQsNC60YLRizwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gYnNTdHlsZT1cInByaW1hcnlcIiBic1NpemU9XCJtZWRpdW1cIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjbXlNb2RhbFwiPtCS0L7QudGC0Lg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPE1vZGFsTG9naW4gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJIb21lXCIgY2xhc3NOYW1lPVwiaGVhZGVyLWJvdHRvbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00IGgtbGVmdFwiPlxuICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTggaC1yaWdodFwiPlxuICAgICAgICAgICAgICA8aDE+0JzQsNGA0YjRgNGD0YLQuNC30LDRgtC+0YAg0LLQsNGI0LXQs9C+INCx0LjQt9C90LXRgdCwLjwvaDE+XG4gICAgICAgICAgICAgIDxwPkxvbGxpcG9wIGxpcXVvcmljZSBsb2xsaXBvcCBpY2UgY3JlYW0gY2hlZXNlY2FrZSBoYWx2YWggamVsbHktby4gR3VtbWllcyBsb2xsaXBvcCBtYWNhcm9vbiBtYXJzaG1hbGxvdyBpY2luZy4gQ29va2llIGNodXBhIGNodXBzIGNha2UgZGVzc2VydCBsb2xsaXBvcCBtYXJ6aXBhbiBkb251dCBhcHBsZSBwaWUuIENvb2tpZSBjb3R0b24gY2FuZHkgb2F0IGNha2Ugc3dlZXQgcm9sbCB0b3BwaW5nIGFwcGxlIHBpZSBtYXJ6aXBhbi48L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tbGdcIj7QndCw0YfQsNGC0Ywg0YHQtdC50YfQsNGBPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1sZ1wiIGhyZWY9XCIjQWJvdXRcIj7Qo9C30L3QsNGC0Ywg0LHQvtC70YzRiNC1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0hlYWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIFByaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIlByaWNlXCIgY2xhc3NOYW1lPVwicHJpY2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWluZm9cIj5cbiAgICAgICAgICAgIDxoMz7Qp9GC0L4g0L/QvtC00L7QudC00LXRgiDQuNC80LXQvdC90L4g0LLQsNC8PC9oMz5cbiAgICAgICAgICAgIDxwPlV0IHdpc2kgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2kgdGF0aW9uIHVsbGFtY29ycGVyIHN1c2NpcGl0IGxvYm9ydGlzIG5pc2wgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbHVtblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC10b3BcIj5cbiAgICAgICAgICAgICAgICA8aDQ+RUNPTk9NWTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tXCI+XG4gICAgICAgICAgICAgICAgICA8aDI+NSQ8L2gyPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInByLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIgR0I8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+0LTQviAzINCj0YfQsNGB0YLQvdC40LrQvtCyPC9saT5cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPtCd0LDRh9Cw0YLRjCDRgdC10LnRh9Cw0YE8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sdW1uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sLXRvcC1pblwiPlxuICAgICAgICAgICAgICAgIDxoND5QRVJTT05BTDwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tLWluXCI+XG4gICAgICAgICAgICAgICAgICA8aDI+MTUkPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtbGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaT4yIEdCPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPtC00L4gMTUg0KPRh9Cw0YHRgtC90LjQutC+0LI8L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+0J3QsNGH0LDRgtGMINGB0LXQudGH0LDRgTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC10b3AtaW5uXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+QlVTSU5FU1M8L2g0PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tLWlublwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+MjAkPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicHItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT4yIEdCPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPtC+0YIgMTUg0KPRh9Cw0YHRgtC90LjQutC+0LI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPtCd0LDRh9Cw0YLRjCDRgdC10LnRh9Cw0YE8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJpY2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvUHJpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBTZXJ2aWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgaWQ9XCJTZXJ2aWNlc1wiIGNsYXNzTmFtZT1cInNlcnZpY2VzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXJ2aWNlcy1ncmlkc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24xXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24yXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24zXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL1NlcnZpY2VzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTmF2YmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXItYXBwIGJsYWNrLWJnXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci10b2dnbGUtYm94XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYSBmYS1iYXJzIHRvb2x0aXBzXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJUb2dnbGUgTmF2aWdhdGlvblwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLWxvZ28gc3RhcnQtLT5cbiAgICAgICAgPGEgaHJlZj1cIi9tYXBcIiBjbGFzc05hbWU9XCJsb2dvXCI+PGI+TU9CSUxFIFJPVVRFPC9iPjwvYT5cbiAgICAgICAgPCEtLWxvZ28gZW5kLS0+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3AtbWVudVwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgcHVsbC1yaWdodCB0b3AtbWVudVwiPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImxvZ291dFwiIGhyZWY9XCIvXCI+TG9nb3V0PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZiYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vcmVxdWlyZSgnLi9Ob3RGb3VuZFBhZ2UubGVzcycpO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTm90Rm91bmRQYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlBhZ2UgTm90IEZvdW5kPC9oMT5cbiAgICAgICAgPHA+U29ycnksIGJ1dCB0aGUgcGFnZSB5b3Ugd2VyZSB0cnlpbmcgdG8gdmlldyBkb2VzIG5vdCBleGlzdC48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RGb3VuZFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Ob3RGb3VuZFBhZ2UvTm90Rm91bmRQYWdlLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxudmFyIGNvcmRzID0gW1s1MS41MDgsIC0wLjExXSxbNTIuNTA4LCAtMC4xMV0sWzUzLjUwOCwgLTEuMTFdLFs0My41MDgsIC0xLjExXV07XHJcbnZhciBwb2ludDtcclxuJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hcDoge31cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzUyLjUwNSwgLTAuMDldLCAxMyk7XHJcbiAgICBMLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIEwucG9seWxpbmUoY29yZHMse1xyXG4gICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgIHdlaWdodDogM1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIGZ1bmN0aW9uIGNpcmNsZShwb2ludCl7XHJcbiAgICAgIEwuY2lyY2xlKHBvaW50LCA1MCwge1xyXG4gICAgICAgIGNvbG9yOiAncmVkJyxcclxuICAgICAgICBmaWxsQ29sb3I6ICcjZjAzJyxcclxuICAgICAgICBmaWxsT3BhY2l0eTogMC41XHJcbiAgICAgIH0pLmFkZFRvKG1hcCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb2ludEFkZChwb2ludHMpe1xyXG4gICAgICBmb3IgKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgcG9pbnQgPSBwb2ludHNbaV07XHJcbiAgICAgICAgY2lyY2xlKHBvaW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcG9pbnRBZGQoY29yZHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWFwOiBtYXB9KTtcclxuICAgIHdpbmRvdy5tYXAgPSB0aGlzO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgICAgPGRpdiBpZD1cIm1hcFwiLz5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9PU01hcC9PU01hcC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBHcmlkZGxlIGZyb20nZ3JpZGRsZS1yZWFjdCc7XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgRGF0YToge31cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgRGF0YSA9IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogMCxcclxuICAgICAgICBcIm5hbWVcIjogXCJNYXllciBMZW9uYXJkXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiS2Fwb3dzaW5cIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiSGF3YWlpXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiVW5pdGVkIEtpbmdkb21cIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJPdm9sb1wiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogN1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIktvY2ggQmVja2VyXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiSm9obnNvbmJ1cmdcIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiTmV3IEplcnNleVwiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIk1hZGFnYXNjYXJcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJFdmVudGFnZVwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogMlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAyLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIkxvd2VyeSBIb3BraW5zXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiQmxhbmNvXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIkFyaXpvbmFcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJVa3JhaW5lXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiQ29tdGV4dFwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogM1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAzLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIldhbHRlcnMgTWF5c1wiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkdsZW5kYWxlXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIklsbGlub2lzXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiTmV3IFplYWxhbmRcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJDb3Jwb3JhbmFcIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDZcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogNCxcclxuICAgICAgICBcIm5hbWVcIjogXCJTaGF3IExvd2VcIixcclxuICAgICAgICBcImNpdHlcIjogXCJDb3VsdGVydmlsbGxlXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIld5b21pbmdcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJFY3VhZG9yXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiSXNvbG9naWNhXCIsXHJcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiAyXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImlkXCI6IDUsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiU2hhdyBMb3dlXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiQ291bHRlcnZpbGxsZVwiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJXeW9taW5nXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiRWN1YWRvclwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIklzb2xvZ2ljYVwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogMlxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7RGF0YTogRGF0YX0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgIDxHcmlkZGxlIHJlc3VsdHM9e3RoaXMuc3RhdGUuRGF0YX0gdGFibGVDbGFzc05hbWU9XCJ0YWJsZVwiIGNvbHVtbnM9e1tcImlkXCIsXCJuYW1lXCIsIFwiY2l0eVwiLCBcInN0YXRlXCIsIFwiY291bnRyeVwiXX0gLz5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL1JUL1JULmpzXG4gKiovIiwidmFyIHBhZ2VzID0ge307XG5wYWdlcy5pbmRleCA9IHtcbiAgcGF0aDogJy8nLFxuICBib2R5OiAnJyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnTW9iaWxlIFJvdXRlJyB9XG59O1xucGFnZXMubG9naW4gPSB7XG4gIHBhdGg6ICcvbG9naW4nLFxuICBib2R5OiAnPHA+MTwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdsb2dpbid9XG59O1xucGFnZXMuZGFzaGJvYXJkID0ge1xuICBwYXRoOiAnL2Rhc2hib2FyZCcsXG4gIGJvZHk6ICc8cD4yPC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ2Rhc2hib2FyZHMnfVxufTtcbnBhZ2VzLm1hcCA9IHtcbiAgcGF0aDogJy9tYXAnLFxuICBib2R5OiAnPHA+MzwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdNYXAnIH1cbn07XG5wYWdlcy50YXNrcyA9IHtcbiAgcGF0aDogJy90YXNrcycsXG4gIGJvZHk6ICc8cD40PC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ1Rhc2tzJ31cbn07XG5wYWdlcy5jYWxlbmRhciA9IHtcbiAgcGF0aDogJy9jYWxlbmRhcicsXG4gIGJvZHk6ICc8cD41PC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ0NhbGVuZGFyJ31cbn07XG5wYWdlcy5wcml2YWN5ID0ge1xuICBwYXRoOiAnL3ByaXZhY3knLFxuICBib2R5OiAnPHA+NjwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdQcml2YWN5IFBvbGljeSd9XG59O1xucGFnZXMucHJvZmlsZSA9IHtcbiAgcGF0aDogJy9wcm9maWxlJyxcbiAgYm9keTogJzxwPjc8L3A+JyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnUHJvZmlsZSd9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZ2VzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSBhbnRvbl9nb3JzaGVuaW4gb24gMTAuMDMuMjAxNS5cbiAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgXyA9IHJlcXVpcmUoICdsb2Rhc2gnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIEFwcFN0b3JlID1yZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSggJy4uL2NvcmUvRGlzcGF0Y2hlcicpO1xudmFyIEFjdGlvblR5cGVzID0gcmVxdWlyZSggJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcycpO1xudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkocmVxdWlyZSgnLi4vY29tcG9uZW50cy9BcHAnKSk7XG52YXIgdGVtcGxhdGVGaWxlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ3RlbXBsYXRlcy9pbmRleC5odG1sJyk7XG52YXIgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZUZpbGUsICd1dGY4JykpO1xuLy9cbi8vIFNlcnZlci1zaWRlIHJlbmRlcmluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoZSB0b3AtbGV2ZWwgUmVhY3QgY29tcG9uZW50ICsgSFRNTCB0ZW1wbGF0ZSBmb3IgaXRcbi8vIExvYWQgcGFnZXMgZnJvbSB0aGUgYC9mYWtlREIvcGFnZXNgIGZvbGRlciBpbnRvIHRoZSBBcHBTdG9yZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbiAgICB2YXIgc291cmNlUGFnZXMgPSByZXF1aXJlKCcuLi9kYi9mYWtlREInKTtcbiAgICB2YXIgZ2V0UGFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgaW4gc291cmNlUGFnZXMpIHtcbiAgICAgICAgdmFyIGF0dHIgPSBzb3VyY2VQYWdlc1tpXTtcbiAgICAgICAgdmFyIHBhZ2UgPSBhc3NpZ24oe30sIHtwYXRoOiBhdHRyLnBhdGgsIGJvZHk6IGF0dHIuYm9keX0sIGF0dHIuYXR0cmlidXRlcyk7XG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5MT0FEX1BBR0UsXG4gICAgICAgICAgcGF0aDogYXR0ci5wYXRoLFxuICAgICAgICAgIHBhZ2U6IHBhZ2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnZXM7XG4gICAgfTtcbiAgICByZXR1cm4gZ2V0UGFnZXMoc291cmNlUGFnZXMpO1xuICB9KSgpO1xuICBhbnN3ZXIuZ2V0KCcvYXBpL3BhZ2UvKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgdmFyIHVybFBhdGggPSByZXEucGF0aC5zdWJzdHIoOSk7XG4gICAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHVybFBhdGgpO1xuICAgIHJlcy5zZW5kKHBhZ2UpO1xuICB9KTtcbiAgYW5zd2VyLmdldCgnKicsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgdmFyIGRhdGEgPSB7ZGVzY3JpcHRpb246ICcnfTtcbiAgICAgIHZhciBhcHAgPSBuZXcgQXBwKHtcbiAgICAgICAgcGF0aDogcmVxLnBhdGgsXG4gICAgICAgIG9uU2V0VGl0bGU6IGZ1bmN0aW9uICh0aXRsZSkge1xuICAgICAgICAgIGRhdGEudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXRNZXRhOiBmdW5jdGlvbiAobmFtZSwgY29udGVudCkge1xuICAgICAgICAgIGRhdGFbbmFtZV0gPSBjb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBvblBhZ2VOb3RGb3VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkYXRhLmJvZHkgPSBSZWFjdC5yZW5kZXJUb1N0cmluZyhhcHApO1xuICAgICAgdmFyIGh0bWwgPSB0ZW1wbGF0ZShkYXRhKTtcbiAgICAgIHJlcy5zZW5kKGh0bWwpO1xuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvcm91dGVzL3JlYWN0Um91dGUuanNcbiAqKi8iLCJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy92YXIgZmF2aWNvbiA9IHJlcXVpcmUoJ3NlcnZlLWZhdmljb24nKTtcbnZhciBsb2dnZXIgPSByZXF1aXJlKCdtb3JnYW4nKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgc2VydmVyID0gZXhwcmVzcygpO1xuc2VydmVyLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lKSkpO1xuLy8gdW5jb21tZW50IGFmdGVyIHBsYWNpbmcgeW91ciBmYXZpY29uIGluIC9wdWJsaWNcbi8vYXBwLnVzZShmYXZpY29uKF9fZGlybmFtZSArICcvcHVibGljL2Zhdmljb24uaWNvJykpO1xuc2VydmVyLnVzZShsb2dnZXIoJ2RldicpKTtcbi8vdXNlIHJvdXRlclxucmVxdWlyZSgnLi9yb3V0ZXMvcmVhY3RSb3V0ZScpKHNlcnZlcik7XG4vLyBlcnJvciBoYW5kbGVyc1xuLy8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuLy8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5pZiAoc2VydmVyLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgc2VydmVyLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIGVycm9yOiBlcnJcbiAgICB9KTtcbiAgfSk7XG59XG4vLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcbi8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5zZXJ2ZXIudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5yZW5kZXIoJ2Vycm9yJywge1xuICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgIGVycm9yOiB7fVxuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc2VydmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImRlYnVnXCJcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZXZlbnRlbWl0dGVyM1wiXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmbHV4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmbHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZzXCJcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JpZGRsZS1yZWFjdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ3JpZGRsZS1yZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImh0dHBcIlxuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaFwiXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9yZ2FuXCJcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwic3VwZXJhZ2VudFwiXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InNlcnZlci5qcyJ9