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
  
  var http = _interopRequire(__webpack_require__(42));
  
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
  
  var Router = __webpack_require__(41);
  var Pages = Router.Pages;
  var Page = Router.Page;
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
  
  var Bootstrap = _interopRequire(__webpack_require__(40));
  
  var ButtonToolbar = Bootstrap.ButtonToolbar;
  var Modal = Bootstrap.Modal;
  var ModalTrigger = Bootstrap.ModalTrigger;
  var Button = Bootstrap.Button;
  
  var MyModal = React.createClass({
    displayName: "MyModal",
    render: function () {
      return React.createElement(
        Modal,
        _extends({}, this.props, { bsStyle: "primary", title: "Modal heading", animation: false }),
        React.createElement("div", { className: "modal-body" }),
        React.createElement(
          "div",
          { className: "modal-footer" },
          React.createElement(
            Button,
            { onClick: this.props.onRequestHide },
            "Close"
          ),
          React.createElement(
            Button,
            { onClick: this.props.onRequestHide },
            "Войти"
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
                    ModalTrigger,
                    { modal: React.createElement(MyModal, null) },
                    React.createElement(
                      Button,
                      { bsStyle: "primary", bsSize: "large" },
                      "Launch demo modal"
                    )
                  )
                )
              )
            )
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
                  ButtonToolbar,
                  null,
                  React.createElement(
                    ModalTrigger,
                    { modal: React.createElement(MyModal, null) },
                    React.createElement(
                      Button,
                      { bsStyle: "success", bsSize: "large" },
                      "Начать сейчас"
                    )
                  ),
                  React.createElement(
                    ModalTrigger,
                    { modal: React.createElement(MyModal, null) },
                    React.createElement(
                      Button,
                      { bsStyle: "warning", bsSize: "large" },
                      "Узнать больше"
                    )
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

  module.exports = require("react-bootstrap");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("react-router-component");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWJmZjE5Y2Y2NWVkZDdkNzFmOGUiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYmluL3N0YXJ0dXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29yZS9EaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcy5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zdG9yZXMvQXBwU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2tleU1pcnJvci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FzaWRlUGFuZWwvQXNpZGVQYW5lbC5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlL0NvbnRlbnRQYWdlLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9MYW5kaW5nLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0Fib3V0LmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0NvbnRhY3QuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRm9vdGVyLmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9QcmljZS5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0xhbmRpbmcvY29tcG9uZW50cy9TZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9PU01hcC9PU01hcC5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL1JUL1JULmpzIiwid2VicGFjazovLy9jOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9yb3V0ZXMvcmVhY3RSb3V0ZS5qcyIsIndlYnBhY2s6Ly8vYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudGVtaXR0ZXIzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZsdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyaWRkbGUtcmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtYm9vdHN0cmFwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWNvbXBvbmVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVyYWdlbnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7Ozs7QUNsQ0EsTUFBSSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxFQUFjLENBQUMsQ0FBQztBQUN4QyxNQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLEVBQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzVDLE1BQUks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Q0FBQyxDQUFDO0dBQ0o7OztBQUdELFFBQU0sQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdkMsT0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLE9BQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ2xCLGFBQU8sRUFBRSxHQUFHLENBQUMsT0FBTztBQUNwQixXQUFLLEVBQUUsRUFBRTtLQUNWLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFFBQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDOzs7Ozs7QUNqQ3ZCLG9DOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsc0M7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSxpQzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLDhDOzs7Ozs7QUNBQSxxRDs7Ozs7O0FDQUEseUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGViZmYxOWNmNjVlZGQ3ZDcxZjhlXG4gKiovIiwiLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL1xyXG5cclxudmFyIHNlcnZlckFwcCA9IHJlcXVpcmUoJy4uL3NlcnZlci5qcycpO1xyXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdNb2JpbGVSb3V0ZScpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgcG9ydCBmcm9tIGVudmlyb25tZW50IGFuZCBzdG9yZSBpbiBFeHByZXNzLlxyXG4gKi9cclxuXHJcbnZhciBwb3J0ID0gbm9ybWFsaXplUG9ydChwcm9jZXNzLmVudi5QT1JUIHx8ICczMDAwJyk7XHJcbnNlcnZlckFwcC5zZXQoJ3BvcnQnLCBwb3J0KTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgSFRUUCBzZXJ2ZXIuXHJcbiAqL1xyXG5cclxudmFyIHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHNlcnZlckFwcCk7XHJcbmNvbnNvbGUubG9nKFwiU2VydmVyIHN0YXJ0ZWRcIik7XHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gcHJvdmlkZWQgcG9ydCwgb24gYWxsIG5ldHdvcmsgaW50ZXJmYWNlcy5cclxuICovXHJcblxyXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xyXG5zZXJ2ZXIub24oJ2Vycm9yJywgb25FcnJvcik7XHJcbnNlcnZlci5vbignbGlzdGVuaW5nJywgb25MaXN0ZW5pbmcpO1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSBhIHBvcnQgaW50byBhIG51bWJlciwgc3RyaW5nLCBvciBmYWxzZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVQb3J0KHZhbCkge1xyXG4gIHZhciBwb3J0ID0gcGFyc2VJbnQodmFsLCAxMCk7XHJcblxyXG4gIGlmIChpc05hTihwb3J0KSkge1xyXG4gICAgLy8gbmFtZWQgcGlwZVxyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9XHJcblxyXG4gIGlmIChwb3J0ID49IDApIHtcclxuICAgIC8vIHBvcnQgbnVtYmVyXHJcbiAgICByZXR1cm4gcG9ydDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImVycm9yXCIgZXZlbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xyXG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG5cclxuICB2YXIgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJ1xyXG4gICAgPyAnUGlwZSAnICsgcG9ydFxyXG4gICAgOiAnUG9ydCAnICsgcG9ydDtcclxuXHJcbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xyXG4gIHN3aXRjaCAoZXJyb3IuY29kZSkge1xyXG4gICAgY2FzZSAnRUFDQ0VTJzpcclxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJyk7XHJcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdFQUREUklOVVNFJzpcclxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyBpcyBhbHJlYWR5IGluIHVzZScpO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwibGlzdGVuaW5nXCIgZXZlbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb25MaXN0ZW5pbmcoKSB7XHJcbiAgdmFyIGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xyXG4gIHZhciBiaW5kID0gdHlwZW9mIGFkZHIgPT09ICdzdHJpbmcnXHJcbiAgICA/ICdwaXBlICcgKyBhZGRyXHJcbiAgICA6ICdwb3J0ICcgKyBhZGRyLnBvcnQ7XHJcbiAgZGVidWcoJ0xpc3RlbmluZyBvbiAnICsgYmluZCk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2Jpbi9zdGFydHVwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xyXG5cclxudmFyIEFjdGlvblR5cGVzID0ga2V5TWlycm9yKHtcclxuXHJcbiAgTE9BRF9QQUdFOiBudWxsLFxyXG4gIExPQURfUEFHRV9TVUNDRVNTOiBudWxsLFxyXG4gIExPQURfUEFHRV9FUlJPUjogbnVsbCxcclxuICBDSEFOR0VfTE9DQVRJT046IG51bGxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb25UeXBlcztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9BY3Rpb25UeXBlcy5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRmx1eCBmcm9tICdmbHV4JztcbmltcG9ydCBQYXlsb2FkU291cmNlcyBmcm9tICcuLi9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbic7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gdGhhdCBvcGVyYXRlcyBhcyB0aGUgY2VudHJhbCBodWIgZm9yIGFwcGxpY2F0aW9uIHVwZGF0ZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiB2aXNpdCBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L1xuICovXG52YXIgRGlzcGF0Y2hlciA9IGFzc2lnbihuZXcgRmx1eC5EaXNwYXRjaGVyKCksIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGV0YWlscyBvZiB0aGUgYWN0aW9uLCBpbmNsdWRpbmcgdGhlIGFjdGlvbidzXG4gICAqIHR5cGUgYW5kIGFkZGl0aW9uYWwgZGF0YSBjb21pbmcgZnJvbSB0aGUgc2VydmVyLlxuICAgKi9cbiAgaGFuZGxlU2VydmVyQWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5TRVJWRVJfQUNUSU9OLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9O1xuICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXG4gICAqL1xuICBoYW5kbGVWaWV3QWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTixcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcbiAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29yZS9EaXNwYXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi4vY29yZS9EaXNwYXRjaGVyJztcclxuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XHJcbmltcG9ydCBFeGVjdXRpb25FbnZpcm9ubWVudCBmcm9tICdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgaHR0cCBmcm9tICdzdXBlcmFnZW50JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICBuYXZpZ2F0ZVRvKHBhdGgpIHtcclxuICAgIGlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuQ0hBTkdFX0xPQ0FUSU9OLCBwYXRoOiBwYXRoXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBsb2FkUGFnZShwYXRoLCBjYikge1xyXG4gICAgRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLCBwYXRoOiBwYXRoXHJcbiAgICB9KTtcclxuXHJcbiAgICBodHRwLmdldCgnL2FwaS9wYWdlJyArIHBhdGgpXHJcbiAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSwgcGF0aDogcGF0aCwgZXJyOiBlcnIsIHBhZ2U6IHJlcy5ib2R5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICBjYigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2FjdGlvbnMvQXBwQWN0aW9ucy5qc1xuICoqLyIsIi8qXHJcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XHJcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG52YXIgUGF5bG9hZFNvdXJjZXMgPSBrZXlNaXJyb3Ioe1xyXG5cclxuICBWSUVXX0FDVElPTjogbnVsbCxcclxuICBTRVJWRVJfQUNUSU9OOiBudWxsXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGF5bG9hZFNvdXJjZXM7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanNcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcclxuaW1wb3J0IFBheWxvYWRTb3VyY2VzIGZyb20gJy4uL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcyc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XHJcbmltcG9ydCBhc3NpZ24gZnJvbSAncmVhY3QvbGliL09iamVjdC5hc3NpZ24nO1xyXG5cclxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xyXG5cclxudmFyIF9wYWdlcyA9IHt9O1xyXG52YXIgX2xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbmlmIChfX1NFUlZFUl9fKSB7XHJcbiAgX3BhZ2VzWycvJ10gPSB7dGl0bGU6ICdIb21lIFBhZ2UnfTtcclxuICBfcGFnZXNbJy9wcml2YWN5J10gPSB7dGl0bGU6ICdQcml2YWN5IFBvbGljeSd9O1xyXG4gIF9wYWdlc1snL21hcCddID0ge3RpdGxlOiAnTWFwJ307XHJcbn1cclxuXHJcbnZhciBBcHBTdG9yZSA9IGFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHBhZ2UgZGF0YSBieSB0aGUgZ2l2ZW4gVVJMIHBhdGguXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBVUkwgcGF0aC5cclxuICAgKiBAcmV0dXJucyB7Kn0gUGFnZSBkYXRhLlxyXG4gICAqL1xyXG4gIGdldFBhZ2UocGF0aCkge1xyXG4gICAgcmV0dXJuIHBhdGggaW4gX3BhZ2VzID8gX3BhZ2VzW3BhdGhdIDoge1xyXG4gICAgICB0aXRsZTogJ1BhZ2UgTm90IEZvdW5kJyxcclxuICAgICAgdHlwZTogJ25vdGZvdW5kJ1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cclxuICAgKi9cclxuICBlbWl0Q2hhbmdlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1pdChDSEFOR0VfRVZFTlQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgbmV3IGNoYW5nZSBldmVudCBsaXN0ZW5lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cclxuICAgKi9cclxuICBvZmYoY2FsbGJhY2spIHtcclxuICAgIHRoaXMub2ZmKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuQXBwU3RvcmUuZGlzcGF0Y2hlclRva2VuID0gRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xyXG4gIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcclxuXHJcbiAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xyXG5cclxuICAgIGNhc2UgQWN0aW9uVHlwZXMuTE9BRF9QQUdFOlxyXG4gICAgICBpZiAoYWN0aW9uLnNvdXJjZSA9PT0gUGF5bG9hZFNvdXJjZXMuVklFV19BQ1RJT04pIHtcclxuICAgICAgICBfbG9hZGluZyA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24uZXJyKSB7XHJcbiAgICAgICAgICBfcGFnZXNbYWN0aW9uLnBhdGhdID0gYWN0aW9uLnBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gRG8gbm90aGluZ1xyXG5jb25zb2xlLmxvZyhQYXlsb2FkU291cmNlcylcclxuICB9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuLypqc2xpbnQgZXZpbDogdHJ1ZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgb2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaiksXG4gICAgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nXG4gICkgOiBpbnZhcmlhbnQob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKTtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicGF0aFwiXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLWNvbXBvbmVudCcpO1xudmFyIFBhZ2VzID0gUm91dGVyLlBhZ2VzO1xudmFyIFBhZ2UgPSBSb3V0ZXIuUGFnZTtcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAncmVhY3QvbGliL2ludmFyaWFudCc7XG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25NaXhpbiBmcm9tICcuL05hdmlnYXRpb25NaXhpbic7XG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmVzL0FwcFN0b3JlJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vTmF2aWdhdGlvbic7XG5pbXBvcnQgQ29udGVudFBhZ2UgZnJvbSAnLi4vQ29udGVudFBhZ2UnO1xuaW1wb3J0IE5vdEZvdW5kUGFnZSBmcm9tICcuLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEFzaWRlUGFuZWwgZnJvbSAnLi4vQXNpZGVQYW5lbCc7XG5pbXBvcnQgTWFwIGZyb20gJy4uL09TTWFwJztcbmltcG9ydCBSVCBmcm9tICcuLi9SVC9SVCc7XG5pbXBvcnQgTGFuZGluZyBmcm9tICcuLi9MYW5kaW5nL0xhbmRpbmcuanMnXG5cblxudmFyIEFwcGxpY2F0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtOYXZpZ2F0aW9uTWl4aW5dLFxuXG4gIHByb3BUeXBlczoge1xuICAgIHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvblNldFRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2V0TWV0YTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblBhZ2VOb3RGb3VuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHRoaXMucHJvcHMucGF0aCk7XG4gICAgaW52YXJpYW50KHBhZ2UgIT09IHVuZGVmaW5lZCwgJ0ZhaWxlZCB0byBsb2FkIHBhZ2UgY29udGVudC4nKTtcbiAgICB0aGlzLnByb3BzLm9uU2V0VGl0bGUocGFnZS50aXRsZSk7XG5cbiAgICBpZiAocGFnZS50eXBlID09PSAnbm90Zm91bmQnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUGFnZU5vdEZvdW5kKCk7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChOb3RGb3VuZFBhZ2UsIHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAgICAgIHt0aGlzLnByb3BzLnBhdGggPT09ICcvJyA/XG4gICAgICAgIDxMYW5kaW5nLz46XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgIDxOYXZiYXIvPlxuICAgICAgICAgIDxBc2lkZVBhbmVsLz5cbiAgICAgICAgPC9kaXY+fVxuICAgICAgICB7dGhpcy5wcm9wcy5wYXRoID09PSAnL21hcCcgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtY29udGFpbmVyXCI+XG4gICAgICAgIDxNYXAvPlxuICAgICAgICA8UlQvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEV4ZWN1dGlvbkVudmlyb25tZW50IGZyb20gJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCc7XG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xuXG52YXIgTmF2aWdhdGlvbk1peGluID0ge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUG9wU3RhdGUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICB9LFxuXG4gIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnN0YXRlKSB7XG4gICAgICB2YXIgcGF0aCA9IGV2ZW50LnN0YXRlLnBhdGg7XG4gICAgICAvLyBUT0RPOiBSZXBsYWNlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAgIC8vIHJlcGxhY2UocGF0aCwgZXZlbnQuc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8od2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAxIHx8IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSB8fCBldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGxpbmtcbiAgICB2YXIgZWwgPSBldmVudC50YXJnZXQ7XG4gICAgd2hpbGUgKGVsICYmIGVsLm5vZGVOYW1lICE9PSAnQScpIHtcbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgaWYgKCFlbCB8fCBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWdub3JlIGlmIHRhZyBoYXNcbiAgICAvLyAxLiBcImRvd25sb2FkXCIgYXR0cmlidXRlXG4gICAgLy8gMi4gcmVsPVwiZXh0ZXJuYWxcIiBhdHRyaWJ1dGVcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGVsLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgbm9uLWhhc2ggZm9yIHRoZSBzYW1lIHBhdGhcbiAgICB2YXIgbGluayA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmIChlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgJyMnID09PSBsaW5rKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBtYWlsdG86IGluIHRoZSBocmVmXG4gICAgaWYgKGxpbmsgJiYgbGluay5pbmRleE9mKCdtYWlsdG86JykgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRhcmdldFxuICAgIGlmIChlbC50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBYLW9yaWdpblxuICAgIHZhciBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICtcbiAgICAgICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgIGlmICghKGVsLmhyZWYgJiYgZWwuaHJlZi5pbmRleE9mKG9yaWdpbikgPT09IDApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVidWlsZCBwYXRoXG4gICAgdmFyIHBhdGggPSBlbC5wYXRobmFtZSArIGVsLnNlYXJjaCArIChlbC5oYXNoIHx8ICcnKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgQXBwQWN0aW9ucy5sb2FkUGFnZShwYXRoLCAoKSA9PiB7XG4gICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8ocGF0aCk7XG4gICAgfSk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZpZ2F0aW9uTWl4aW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvTmF2aWdhdGlvbk1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgQXNpZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8YXNpZGU+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2LWNvbGxhcHNlXCIgaWQ9XCJzaWRlYmFyXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNpZGViYXItbWVudVwiIGlkPVwibmF2LWFjY29yZGlvblwiPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tbWFwLW1hcmtlclwiIGhyZWY9XCIvbWFwXCI+INCa0LDRgNGC0LA8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRhc2tzXCIgaHJlZj1cIi90YXNrc1wiPiDQl9Cw0LTQsNGH0Lg8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcIiBocmVmPVwiL3Byb2ZpbGVcIj4g0J3QsNGB0YLRgNC+0LnQutC4INC/0YDQvtGE0LjQu9GPPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhclwiIGhyZWY9XCIvY2FsZW5kYXJcIj4g0JrQsNC70LXQvdC00LDRgNGMPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10ZXh0LXNpemVcIiBocmVmPVwiL3ByaXZhY3lcIj4g0J3QsNGB0YLRgNC+0LnQutC4PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2FzaWRlPlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzaWRlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXNpZGVQYW5lbC9Bc2lkZVBhbmVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgQ29udGVudFBhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgYm9keTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB7IGNsYXNzTmFtZSwgdGl0bGUsIGJvZHksIG90aGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgIHJldHVybiA8bWFpbiBjbGFzc05hbWU9eydDb250ZW50UGFnZSAnICsgY2xhc3NOYW1lfVxuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IGJvZHl9fSAvPjtcbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRlbnRQYWdlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2UvQ29udGVudFBhZ2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9IZWFkZXIuanMnO1xuaW1wb3J0IEFib3V0IGZyb20gJy4vY29tcG9uZW50cy9BYm91dCc7XG5pbXBvcnQgQ29udGFjdCBmcm9tICcuL2NvbXBvbmVudHMvQ29udGFjdCc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL2NvbXBvbmVudHMvU2VydmljZXMnO1xuaW1wb3J0IFByaWNlIGZyb20gJy4vY29tcG9uZW50cy9QcmljZSc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IEZlYXR1cmVzIGZyb20gJy4vY29tcG9uZW50cy9GZWF0dXJlcyc7XG5cbnZhciBMYW5kaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGVudFBhZ2VcIj5cbiAgICAgICAgPEhlYWRlci8+XG4gICAgICAgIDxBYm91dC8+XG4gICAgICAgIDxTZXJ2aWNlLz5cbiAgICAgICAgPEZlYXR1cmVzLz5cbiAgICAgICAgPFByaWNlLz5cbiAgICAgICAgPENvbnRhY3QvPlxuICAgICAgICA8Rm9vdGVyLz5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYW5kaW5nO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9MYW5kaW5nLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgQWJvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8ZGl2IGlkPVwiQWJvdXRcIiBjbGFzc05hbWU9XCJhYm91dFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJvdXQtaW5mb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOCBhYm91dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxoMj7QoNCw0LHQvtGC0LDQtdGCINC90LAg0LLQsNGBPC9oMj5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdCBpcHN1bSwgbmVjIHNhZ2l0dGlzIHNlbSBuaWJoIGlkIGVsaXQuIER1aXMgc2VkIG9kaW8gc2l0IGFtZXQgbmliaCB2dWxwdXRhdGUgY3Vyc3VzIGEgc2l0IGFtZXQgbWF1cmlzLiBNb3JiaSBhY2N1bXNhbiBpcHN1bSB2ZWxpdC48L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2MtaWNvbnNcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbjFcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uMlwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24zXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lTmFtZT1cImljb240XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lTmFtZT1cImNvbC1tZC00IGFib3V0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lTmFtZT1cImltZy1yZXNwb25zaXZlXCIgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9jYXJyeS1iYWdzLnBuZ1wifS8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvQWJvdXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBDb250YWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAn0JLQsNGI0LUg0LjQvNGPJyxcbiAgICAgIG1haWw6ICfQktCw0YggZW1haWwnLFxuICAgICAgdGhlbWU6ICfQotC10LzQsCdcbiAgICB9O1xuICB9LFxuICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bmFtZTogZXZlbnQudGFyZ2V0Lm5hbWV9LHttYWlsOiBldmVudC50YXJnZXQubWFpbH0se3RoZW1lOiBldmVudC50YXJnZXQudGhlbWV9KTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLnN0YXRlLm5hbWU7XG4gICAgdmFyIG1haWwgPSB0aGlzLnN0YXRlLm1haWw7XG4gICAgdmFyIHRoZW1lID0gdGhpcy5zdGF0ZS50aGVtZTtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIkNvbnRhY3RcIiBjbGFzc05hbWU9XCJjb250YWN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgzPtCh0LLRj9C30LbQuNGC0LXRgdGMINGBINC90LDQvNC4PC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhY3QtdXNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTYgY29udGFjdC1pbmZvXCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpY29uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaW9uXCI+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17XCJpbWFnZXMvMDEucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZvblwiPlxuICAgICAgICAgICAgICAgICAgPHA+MTExMDAwLCDQoNC+0YHRgdC40Y8sINCc0L7RgdC60LLQsCwg0KLQstC10YDRgdC60LDRjyDQtDE8L3A+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidGV4dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e21haWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhlbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTYgY29udGFjdC1pbnRyb1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhY3QtaW5mb3JtYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29udGFjdC1pblwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImlvZFwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e1wiaW1hZ2VzLzAyLnBuZ1wifS8+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZWx0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPigwMjcxKSAxMjMgLSA0NTY8L3A+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhY3QtaW5mb3JcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29udGFjdC1pc1wiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImlvZC0xXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17XCJpbWFnZXMvMDMucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJlbHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiXCI+Y2xpZW50QG1vYmlsZXJvdXRlLmNvbTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgPHRleHRhcmVhIGRlZmF1bHRWYWx1ZT1cIk1lc3NhZ2UuLi5cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZU5hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhY3Q7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvQ29udGFjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIEZlYXR1cmVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIkZlYXR1cmVzXCIgY2xhc3NOYW1lPVwiRmVhdHVyZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkZlYXR1cmVzLWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRmVhdHVyZXMtaW5mby10b3BcIj5cbiAgICAgICAgICAgICAgPGgzPkxvcmVtIElwc3VtIERvbG9yIFNpdCBBbWV0PC9oMz5cbiAgICAgICAgICAgICAgPHA+VXQgd2lzaSBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaSB0YXRpb24gdWxsYW1jb3JwZXIuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlclwiPlxuICAgICAgICAgICAgICA8dWwgaWQ9XCJzbGlkZXIxXCIgY2xhc3NOYW1lPVwicnNsaWRlc1wiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtcImltYWdlcy9zbGlkZXIucG5nXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmVhdHVyZXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRmVhdHVyZXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgRm9vdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcHktcmlnaHRzXCI+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgUG93ZXJlZCBieVxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL01vYmlsZVJvdXRlLmNvbS9cIj4gTW9iaWxlUm91dGUuPC9hPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxhIGlkPVwidG9Ub3BcIiBocmVmPVwiI1wiPlxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b1RvcEhvdmVyXCIgaHJlZj0nIyc+PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvRm9vdGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEJvb3RzdHJhcCBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xudmFyIEJ1dHRvblRvb2xiYXIgPSBCb290c3RyYXAuQnV0dG9uVG9vbGJhcjtcbnZhciBNb2RhbCA9IEJvb3RzdHJhcC5Nb2RhbDtcbnZhciBNb2RhbFRyaWdnZXIgPSBCb290c3RyYXAuTW9kYWxUcmlnZ2VyO1xudmFyIEJ1dHRvbiA9IEJvb3RzdHJhcC5CdXR0b247XG5cbnZhciBNeU1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgey4uLnRoaXMucHJvcHN9IGJzU3R5bGU9XCJwcmltYXJ5XCIgdGl0bGU9XCJNb2RhbCBoZWFkaW5nXCIgYW5pbWF0aW9uPXtmYWxzZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vblJlcXVlc3RIaWRlfT5DbG9zZTwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vblJlcXVlc3RIaWRlfT7QktC+0LnRgtC4PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59KTtcblxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItaW5mb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvXCI+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJpbWctcmVzcG9uc2l2ZVwiIGFsdD1cIk1vYmlsZSBSb3V0ZVwiIHNyYz17XCJpbWFnZXMvbG9nby5wbmdcIn0vPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1lbnVcIj7QnNC10L3Rjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2aWdhdG9pblwiPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJzY3JvbGxcIiBocmVmPVwiI0hvbWVcIj7Qk9C70LDQstC90LDRjzwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjQWJvdXRcIj7Qo9C30L3QsNGC0Ywg0LHQvtC70YzRiNC1PC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic2Nyb2xsXCIgaHJlZj1cIiNTZXJ2aWNlc1wiPtCj0YHQu9GD0LPQuDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjRmVhdHVyZXNcIj7Qn9GA0LjQvNC10YDRizwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjUHJpY2VcIj7QptC10L3RizwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInNjcm9sbFwiIGhyZWY9XCIjQ29udGFjdFwiPtCa0L7QvdGC0LDQutGC0Ys8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPE1vZGFsVHJpZ2dlciBtb2RhbD17PE15TW9kYWwgLz59PlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJwcmltYXJ5XCIgYnNTaXplPVwibGFyZ2VcIj5MYXVuY2ggZGVtbyBtb2RhbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9Nb2RhbFRyaWdnZXI+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJIb21lXCIgY2xhc3NOYW1lPVwiaGVhZGVyLWJvdHRvbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00IGgtbGVmdFwiPlxuICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTggaC1yaWdodFwiPlxuICAgICAgICAgICAgICA8aDE+0JzQsNGA0YjRgNGD0YLQuNC30LDRgtC+0YAg0LLQsNGI0LXQs9C+INCx0LjQt9C90LXRgdCwLjwvaDE+XG4gICAgICAgICAgICAgIDxwPkxvbGxpcG9wIGxpcXVvcmljZSBsb2xsaXBvcCBpY2UgY3JlYW0gY2hlZXNlY2FrZSBoYWx2YWggamVsbHktby4gR3VtbWllcyBsb2xsaXBvcCBtYWNhcm9vbiBtYXJzaG1hbGxvdyBpY2luZy4gQ29va2llIGNodXBhIGNodXBzIGNha2UgZGVzc2VydCBsb2xsaXBvcCBtYXJ6aXBhbiBkb251dCBhcHBsZSBwaWUuIENvb2tpZSBjb3R0b24gY2FuZHkgb2F0IGNha2Ugc3dlZXQgcm9sbCB0b3BwaW5nIGFwcGxlIHBpZSBtYXJ6aXBhbi48L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxuICAgICAgICAgICAgICAgICAgPE1vZGFsVHJpZ2dlciBtb2RhbD17PE15TW9kYWwgLz59PlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJzdWNjZXNzXCIgYnNTaXplPVwibGFyZ2VcIj7QndCw0YfQsNGC0Ywg0YHQtdC50YfQsNGBPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICA8L01vZGFsVHJpZ2dlcj5cbiAgICAgICAgICAgICAgICAgIDxNb2RhbFRyaWdnZXIgbW9kYWw9ezxNeU1vZGFsIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwid2FybmluZ1wiIGJzU2l6ZT1cImxhcmdlXCI+0KPQt9C90LDRgtGMINCx0L7Qu9GM0YjQtTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9Nb2RhbFRyaWdnZXI+XG4gICAgICAgICAgICAgICAgPC9CdXR0b25Ub29sYmFyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL0hlYWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIFByaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdiBpZD1cIlByaWNlXCIgY2xhc3NOYW1lPVwicHJpY2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWluZm9cIj5cbiAgICAgICAgICAgIDxoMz7Qp9GC0L4g0L/QvtC00L7QudC00LXRgiDQuNC80LXQvdC90L4g0LLQsNC8PC9oMz5cbiAgICAgICAgICAgIDxwPlV0IHdpc2kgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2kgdGF0aW9uIHVsbGFtY29ycGVyIHN1c2NpcGl0IGxvYm9ydGlzIG5pc2wgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbHVtblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC10b3BcIj5cbiAgICAgICAgICAgICAgICA8aDQ+RUNPTk9NWTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tXCI+XG4gICAgICAgICAgICAgICAgICA8aDI+NSQ8L2gyPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInByLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIgR0I8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+0LTQviAzINCj0YfQsNGB0YLQvdC40LrQvtCyPC9saT5cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPtCd0LDRh9Cw0YLRjCDRgdC10LnRh9Cw0YE8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sdW1uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2UtY29sLXRvcC1pblwiPlxuICAgICAgICAgICAgICAgIDxoND5QRVJTT05BTDwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tLWluXCI+XG4gICAgICAgICAgICAgICAgICA8aDI+MTUkPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtbGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaT4yIEdCPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjIwME1CPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+VU5MSU1JVEVEPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPtC00L4gMTUg0KPRh9Cw0YHRgtC90LjQutC+0LI8L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+0J3QsNGH0LDRgtGMINGB0LXQudGH0LDRgTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlLWNvbC10b3AtaW5uXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+QlVTSU5FU1M8L2g0PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZS1jb2wtYm90dG9tLWlublwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+MjAkPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicHItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT4yIEdCPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICA8bGk+MjAwTUI8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT5VTkxJTUlURUQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaT4yMDBNQjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPlVOTElNSVRFRDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpPtC+0YIgMTUg0KPRh9Cw0YHRgtC90LjQutC+0LI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPtCd0LDRh9Cw0YLRjCDRgdC10LnRh9Cw0YE8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJpY2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9MYW5kaW5nL2NvbXBvbmVudHMvUHJpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBTZXJ2aWNlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxkaXYgaWQ9XCJTZXJ2aWNlc1wiIGNsYXNzTmFtZT1cInNlcnZpY2VzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXJ2aWNlcy1ncmlkc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24xXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24yXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncmlkcy1pbmZvXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24zXCI+PC9pPlxuICAgICAgICAgICAgICA8aDM+VGl0bGUgR29lcyBIZXJlPC9oMz5cbiAgICAgICAgICAgICAgPHA+VGhpcyBpcyBQaG90b3Nob3AncyB2ZXJzaW9uIG9mIExvcmVtIElwc3VtLiBQcm9pbiBncmF2aWRhIG5pYmggdmVsIHZlbGl0IGF1Y3RvciBhbGlxdWV0LiBBZW5lYW4gc29sbGljaXR1ZGluLCBsb3JlbSBxdWlzIGJpYmVuZHVtIGF1Y3RvciwgbmlzaSBlbGl0IGNvbnNlcXVhdDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTGFuZGluZy9jb21wb25lbnRzL1NlcnZpY2VzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTmF2YmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXItYXBwIGJsYWNrLWJnXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci10b2dnbGUtYm94XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYSBmYS1iYXJzIHRvb2x0aXBzXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJUb2dnbGUgTmF2aWdhdGlvblwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLWxvZ28gc3RhcnQtLT5cbiAgICAgICAgPGEgaHJlZj1cIi9tYXBcIiBjbGFzc05hbWU9XCJsb2dvXCI+PGI+TU9CSUxFIFJPVVRFPC9iPjwvYT5cbiAgICAgICAgPCEtLWxvZ28gZW5kLS0+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3AtbWVudVwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgcHVsbC1yaWdodCB0b3AtbWVudVwiPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImxvZ291dFwiIGhyZWY9XCIvXCI+TG9nb3V0PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZiYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vcmVxdWlyZSgnLi9Ob3RGb3VuZFBhZ2UubGVzcycpO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTm90Rm91bmRQYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlBhZ2UgTm90IEZvdW5kPC9oMT5cbiAgICAgICAgPHA+U29ycnksIGJ1dCB0aGUgcGFnZSB5b3Ugd2VyZSB0cnlpbmcgdG8gdmlldyBkb2VzIG5vdCBleGlzdC48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RGb3VuZFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Ob3RGb3VuZFBhZ2UvTm90Rm91bmRQYWdlLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxudmFyIGNvcmRzID0gW1s1MS41MDgsIC0wLjExXSxbNTIuNTA4LCAtMC4xMV0sWzUzLjUwOCwgLTEuMTFdLFs0My41MDgsIC0xLjExXV07XHJcbnZhciBwb2ludDtcclxuJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hcDoge31cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzUyLjUwNSwgLTAuMDldLCAxMyk7XHJcbiAgICBMLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIEwucG9seWxpbmUoY29yZHMse1xyXG4gICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgIHdlaWdodDogM1xyXG4gICAgfSkuYWRkVG8obWFwKTtcclxuICAgIGZ1bmN0aW9uIGNpcmNsZShwb2ludCl7XHJcbiAgICAgIEwuY2lyY2xlKHBvaW50LCA1MCwge1xyXG4gICAgICAgIGNvbG9yOiAncmVkJyxcclxuICAgICAgICBmaWxsQ29sb3I6ICcjZjAzJyxcclxuICAgICAgICBmaWxsT3BhY2l0eTogMC41XHJcbiAgICAgIH0pLmFkZFRvKG1hcCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb2ludEFkZChwb2ludHMpe1xyXG4gICAgICBmb3IgKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgcG9pbnQgPSBwb2ludHNbaV07XHJcbiAgICAgICAgY2lyY2xlKHBvaW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcG9pbnRBZGQoY29yZHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWFwOiBtYXB9KTtcclxuICAgIHdpbmRvdy5tYXAgPSB0aGlzO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgICAgPGRpdiBpZD1cIm1hcFwiLz5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9PU01hcC9PU01hcC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBHcmlkZGxlIGZyb20nZ3JpZGRsZS1yZWFjdCc7XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgRGF0YToge31cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgRGF0YSA9IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogMCxcclxuICAgICAgICBcIm5hbWVcIjogXCJNYXllciBMZW9uYXJkXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiS2Fwb3dzaW5cIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiSGF3YWlpXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiVW5pdGVkIEtpbmdkb21cIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJPdm9sb1wiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogN1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIktvY2ggQmVja2VyXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiSm9obnNvbmJ1cmdcIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiTmV3IEplcnNleVwiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIk1hZGFnYXNjYXJcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJFdmVudGFnZVwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogMlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAyLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIkxvd2VyeSBIb3BraW5zXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiQmxhbmNvXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIkFyaXpvbmFcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJVa3JhaW5lXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiQ29tdGV4dFwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogM1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAzLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIldhbHRlcnMgTWF5c1wiLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIkdsZW5kYWxlXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIklsbGlub2lzXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiTmV3IFplYWxhbmRcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCJDb3Jwb3JhbmFcIixcclxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDZcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogNCxcclxuICAgICAgICBcIm5hbWVcIjogXCJTaGF3IExvd2VcIixcclxuICAgICAgICBcImNpdHlcIjogXCJDb3VsdGVydmlsbGxlXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIld5b21pbmdcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJFY3VhZG9yXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiSXNvbG9naWNhXCIsXHJcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiAyXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImlkXCI6IDUsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiU2hhdyBMb3dlXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiQ291bHRlcnZpbGxsZVwiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJXeW9taW5nXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiRWN1YWRvclwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIklzb2xvZ2ljYVwiLFxyXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogMlxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7RGF0YTogRGF0YX0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgIDxHcmlkZGxlIHJlc3VsdHM9e3RoaXMuc3RhdGUuRGF0YX0gdGFibGVDbGFzc05hbWU9XCJ0YWJsZVwiIGNvbHVtbnM9e1tcImlkXCIsXCJuYW1lXCIsIFwiY2l0eVwiLCBcInN0YXRlXCIsIFwiY291bnRyeVwiXX0gLz5cclxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL1JUL1JULmpzXG4gKiovIiwidmFyIHBhZ2VzID0ge307XG5wYWdlcy5pbmRleCA9IHtcbiAgcGF0aDogJy8nLFxuICBib2R5OiAnJyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnTW9iaWxlIFJvdXRlJyB9XG59O1xucGFnZXMubG9naW4gPSB7XG4gIHBhdGg6ICcvbG9naW4nLFxuICBib2R5OiAnPHA+MTwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdsb2dpbid9XG59O1xucGFnZXMuZGFzaGJvYXJkID0ge1xuICBwYXRoOiAnL2Rhc2hib2FyZCcsXG4gIGJvZHk6ICc8cD4yPC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ2Rhc2hib2FyZHMnfVxufTtcbnBhZ2VzLm1hcCA9IHtcbiAgcGF0aDogJy9tYXAnLFxuICBib2R5OiAnPHA+MzwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdNYXAnIH1cbn07XG5wYWdlcy50YXNrcyA9IHtcbiAgcGF0aDogJy90YXNrcycsXG4gIGJvZHk6ICc8cD40PC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ1Rhc2tzJ31cbn07XG5wYWdlcy5jYWxlbmRhciA9IHtcbiAgcGF0aDogJy9jYWxlbmRhcicsXG4gIGJvZHk6ICc8cD41PC9wPicsXG4gIGF0dHJpYnV0ZXM6eyB0aXRsZTogJ0NhbGVuZGFyJ31cbn07XG5wYWdlcy5wcml2YWN5ID0ge1xuICBwYXRoOiAnL3ByaXZhY3knLFxuICBib2R5OiAnPHA+NjwvcD4nLFxuICBhdHRyaWJ1dGVzOnsgdGl0bGU6ICdQcml2YWN5IFBvbGljeSd9XG59O1xucGFnZXMucHJvZmlsZSA9IHtcbiAgcGF0aDogJy9wcm9maWxlJyxcbiAgYm9keTogJzxwPjc8L3A+JyxcbiAgYXR0cmlidXRlczp7IHRpdGxlOiAnUHJvZmlsZSd9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZ2VzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2RiL2Zha2VEQi5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSBhbnRvbl9nb3JzaGVuaW4gb24gMTAuMDMuMjAxNS5cbiAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgXyA9IHJlcXVpcmUoICdsb2Rhc2gnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIEFwcFN0b3JlID1yZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSggJy4uL2NvcmUvRGlzcGF0Y2hlcicpO1xudmFyIEFjdGlvblR5cGVzID0gcmVxdWlyZSggJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcycpO1xudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkocmVxdWlyZSgnLi4vY29tcG9uZW50cy9BcHAnKSk7XG52YXIgdGVtcGxhdGVGaWxlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ3RlbXBsYXRlcy9pbmRleC5odG1sJyk7XG52YXIgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZUZpbGUsICd1dGY4JykpO1xuLy9cbi8vIFNlcnZlci1zaWRlIHJlbmRlcmluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoZSB0b3AtbGV2ZWwgUmVhY3QgY29tcG9uZW50ICsgSFRNTCB0ZW1wbGF0ZSBmb3IgaXRcbi8vIExvYWQgcGFnZXMgZnJvbSB0aGUgYC9mYWtlREIvcGFnZXNgIGZvbGRlciBpbnRvIHRoZSBBcHBTdG9yZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbiAgICB2YXIgc291cmNlUGFnZXMgPSByZXF1aXJlKCcuLi9kYi9mYWtlREInKTtcbiAgICB2YXIgZ2V0UGFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgaW4gc291cmNlUGFnZXMpIHtcbiAgICAgICAgdmFyIGF0dHIgPSBzb3VyY2VQYWdlc1tpXTtcbiAgICAgICAgdmFyIHBhZ2UgPSBhc3NpZ24oe30sIHtwYXRoOiBhdHRyLnBhdGgsIGJvZHk6IGF0dHIuYm9keX0sIGF0dHIuYXR0cmlidXRlcyk7XG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5MT0FEX1BBR0UsXG4gICAgICAgICAgcGF0aDogYXR0ci5wYXRoLFxuICAgICAgICAgIHBhZ2U6IHBhZ2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnZXM7XG4gICAgfTtcbiAgICByZXR1cm4gZ2V0UGFnZXMoc291cmNlUGFnZXMpO1xuICB9KSgpO1xuICBhbnN3ZXIuZ2V0KCcvYXBpL3BhZ2UvKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgdmFyIHVybFBhdGggPSByZXEucGF0aC5zdWJzdHIoOSk7XG4gICAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHVybFBhdGgpO1xuICAgIHJlcy5zZW5kKHBhZ2UpO1xuICB9KTtcbiAgYW5zd2VyLmdldCgnKicsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgdmFyIGRhdGEgPSB7ZGVzY3JpcHRpb246ICcnfTtcbiAgICAgIHZhciBhcHAgPSBuZXcgQXBwKHtcbiAgICAgICAgcGF0aDogcmVxLnBhdGgsXG4gICAgICAgIG9uU2V0VGl0bGU6IGZ1bmN0aW9uICh0aXRsZSkge1xuICAgICAgICAgIGRhdGEudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXRNZXRhOiBmdW5jdGlvbiAobmFtZSwgY29udGVudCkge1xuICAgICAgICAgIGRhdGFbbmFtZV0gPSBjb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBvblBhZ2VOb3RGb3VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkYXRhLmJvZHkgPSBSZWFjdC5yZW5kZXJUb1N0cmluZyhhcHApO1xuICAgICAgdmFyIGh0bWwgPSB0ZW1wbGF0ZShkYXRhKTtcbiAgICAgIHJlcy5zZW5kKGh0bWwpO1xuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvcm91dGVzL3JlYWN0Um91dGUuanNcbiAqKi8iLCJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy92YXIgZmF2aWNvbiA9IHJlcXVpcmUoJ3NlcnZlLWZhdmljb24nKTtcbnZhciBsb2dnZXIgPSByZXF1aXJlKCdtb3JnYW4nKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgc2VydmVyID0gZXhwcmVzcygpO1xuc2VydmVyLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lKSkpO1xuLy8gdW5jb21tZW50IGFmdGVyIHBsYWNpbmcgeW91ciBmYXZpY29uIGluIC9wdWJsaWNcbi8vYXBwLnVzZShmYXZpY29uKF9fZGlybmFtZSArICcvcHVibGljL2Zhdmljb24uaWNvJykpO1xuc2VydmVyLnVzZShsb2dnZXIoJ2RldicpKTtcbi8vdXNlIHJvdXRlclxucmVxdWlyZSgnLi9yb3V0ZXMvcmVhY3RSb3V0ZScpKHNlcnZlcik7XG4vLyBlcnJvciBoYW5kbGVyc1xuLy8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuLy8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5pZiAoc2VydmVyLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgc2VydmVyLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIGVycm9yOiBlcnJcbiAgICB9KTtcbiAgfSk7XG59XG4vLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcbi8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5zZXJ2ZXIudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5yZW5kZXIoJ2Vycm9yJywge1xuICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgIGVycm9yOiB7fVxuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIWM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc2VydmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImRlYnVnXCJcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZXZlbnRlbWl0dGVyM1wiXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmbHV4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmbHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZzXCJcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JpZGRsZS1yZWFjdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZ3JpZGRsZS1yZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImh0dHBcIlxuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaFwiXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9yZ2FuXCJcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdC1ib290c3RyYXBcIlxuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItY29tcG9uZW50XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItY29tcG9uZW50XCJcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwic3VwZXJhZ2VudFwiXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InNlcnZlci5qcyJ9