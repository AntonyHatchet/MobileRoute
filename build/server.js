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

  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _ = _interopRequire(__webpack_require__(28));
  
  var fs = _interopRequire(__webpack_require__(25));
  
  var path = _interopRequire(__webpack_require__(29));
  
  var express = _interopRequire(__webpack_require__(22));
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Dispatcher = _interopRequire(__webpack_require__(3));
  
  var ActionTypes = _interopRequire(__webpack_require__(2));
  
  var AppStore = _interopRequire(__webpack_require__(7));
  
  var server = express();
  
  server.set("port", process.env.PORT || 5000);
  server.use(express["static"](path.join(__dirname)));
  
  //
  // Page API
  // -----------------------------------------------------------------------------
  server.get("/api/page/*", function (req, res) {
    var path = req.path.substr(9);
    var page = AppStore.getPage(path);
    res.send(page);
  });
  
  //
  // Server-side rendering
  // -----------------------------------------------------------------------------
  
  // The top-level React component + HTML template for it
  var App = React.createFactory(__webpack_require__(11));
  var templateFile = path.join(__dirname, "templates/index.html");
  var template = _.template(fs.readFileSync(templateFile, "utf8"));
  
  server.get("*", function (req, res) {
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
  
  // Load pages from the `/src/content/` folder into the AppStore
  (function () {
    var assign = __webpack_require__(4);
    var fm = __webpack_require__(24);
    var jade = __webpack_require__(27);
    var sourceDir = path.join(__dirname, "./content");
    var getFiles = function (dir) {
      var pages = [];
      fs.readdirSync(dir).forEach(function (file) {
        var stat = fs.statSync(path.join(dir, file));
        if (stat && stat.isDirectory()) {
          pages = pages.concat(getFiles(file));
        } else {
          // Convert the file to a Page object
          var filename = path.join(dir, file);
          var url = filename.substr(sourceDir.length, filename.length - sourceDir.length - 5).replace("\\", "/");
          if (url.indexOf("/index", url.length - 6) !== -1) {
            url = url.substr(0, url.length - (url.length > 6 ? 6 : 5));
          }
          var source = fs.readFileSync(filename, "utf8");
          var content = fm(source);
          var html = jade.render(content.body, null, "  ");
          var page = assign({}, { path: url, body: html }, content.attributes);
          Dispatcher.handleServerAction({
            actionType: ActionTypes.LOAD_PAGE,
            path: url,
            page: page
          });
        }
      });
      return pages;
    };
    return getFiles(sourceDir);
  })();
  
  server.listen(server.get("port"), function () {
    if (process.send) {
      process.send("online");
    } else {
      console.log("The server is running at http://localhost:" + server.get("port"));
    }
  });

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
  
  var Flux = _interopRequire(__webpack_require__(23));
  
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
  
  var http = _interopRequire(__webpack_require__(30));
  
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
  
  var EventEmitter = _interopRequire(__webpack_require__(21));
  
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

  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  __webpack_require__(20);
  
  var React = _interopRequire(__webpack_require__(1));
  
  var invariant = _interopRequire(__webpack_require__(9));
  
  var AppActions = _interopRequire(__webpack_require__(5));
  
  var NavigationMixin = _interopRequire(__webpack_require__(12));
  
  var AppStore = _interopRequire(__webpack_require__(7));
  
  var Navbar = _interopRequire(__webpack_require__(15));
  
  var ContentPage = _interopRequire(__webpack_require__(14));
  
  var NotFoundPage = _interopRequire(__webpack_require__(16));
  
  var AsidePanel = _interopRequire(__webpack_require__(13));
  
  var Map = _interopRequire(__webpack_require__(17));
  
  var RT = _interopRequire(__webpack_require__(18));
  
  
  
  
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
          this.props.path != "/" && React.createElement(
            "div",
            { className: "navigation" },
            React.createElement(Navbar, null),
            React.createElement(AsidePanel, null)
          ),
          this.props.path === "/map" ? React.createElement(
            "div",
            { className: "map-container" },
            React.createElement(Map, null),
            React.createElement(RT, null)
          ) : React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "h2",
              null,
              page.title
            )
          ),
          this.props.path != "/map" && React.createElement(ContentPage, _extends({ className: "container" }, page)),
          this.props.path != "/map" && React.createElement(
            "div",
            { className: "navbar-footer" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "p",
                { className: "text-muted" },
                React.createElement(
                  "span",
                  null,
                  "© MobileRoute"
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement(
                    "a",
                    { href: "/" },
                    "Home"
                  )
                ),
                React.createElement(
                  "span",
                  null,
                  React.createElement(
                    "a",
                    { href: "/privacy" },
                    "Privacy"
                  )
                )
              )
            )
          )
        )
      );
    }
  
  });
  
  module.exports = Application;
  /* jshint ignore:end */

/***/ },
/* 12 */
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
/* 13 */
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
                  " Map"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-tasks", href: "/tasks" },
                  " Tasks"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-user", href: "/profile" },
                  " Profile"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-calendar", href: "/calendar" },
                  " Calendar"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-comment", href: "/Chat" },
                  " Chat"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "glyphicon glyphicon-text-size", href: "/privacy" },
                  " Privacy"
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
/* 14 */
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
/* 15 */
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
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Navbar = React.createClass({
    displayName: "Navbar",
  
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "header",
          { className: "header black-bg" },
          React.createElement(
            "div",
            { className: "sidebar-toggle-box" },
            React.createElement("div", { className: "fa fa-bars tooltips", "data-placement": "right", "data-original-title": "Toggle Navigation" })
          ),
          React.createElement(
            "a",
            { href: "/", className: "logo" },
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
                  { className: "logout", href: "/privacy" },
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  /** @jsx React.DOM */
  /*jshint indent: 2, node: true, nomen: true, browser: true*/
  /*global React */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  /** @jsx React.DOM */
  /** @jsx React.DOM */
  var React = _interopRequire(__webpack_require__(1));
  
  var Griddle = _interopRequire(__webpack_require__(26));
  
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = function() {
  	var list = [];
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  	return list;
  }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  exports.push([module.id, "/*\n * React.js Starter Kit\n * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n", ""]);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("eventemitter3");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("flux");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("front-matter");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("griddle-react");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("jade");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDAyZjk2YzU2NTBkNGE5ZWI0YjAiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29uc3RhbnRzL0FjdGlvblR5cGVzLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvcmUvRGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2FjdGlvbnMvQXBwQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXBwL05hdmlnYXRpb25NaXhpbi5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FzaWRlUGFuZWwvQXNpZGVQYW5lbC5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlL0NvbnRlbnRQYWdlLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvTm90Rm91bmRQYWdlL05vdEZvdW5kUGFnZS5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL09TTWFwL09TTWFwLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvUm91dGVUYWJsZS9SVC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5sZXNzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50ZW1pdHRlcjNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmx1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZyb250LW1hdHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JpZGRsZS1yZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImphZGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBLGNBQVksQ0FBQzs7OztNQUVOLENBQUMsdUNBQU0sRUFBUTs7TUFDZixFQUFFLHVDQUFNLEVBQUk7O01BQ1osSUFBSSx1Q0FBTSxFQUFNOztNQUNoQixPQUFPLHVDQUFNLEVBQVM7O01BQ3RCLEtBQUssdUNBQU0sQ0FBTzs7TUFDbEIsVUFBVSx1Q0FBTSxDQUFtQjs7TUFDbkMsV0FBVyx1Q0FBTSxDQUF5Qjs7TUFDMUMsUUFBUSx1Q0FBTSxDQUFtQjs7QUFFeEMsTUFBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7O0FBRXZCLFFBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBRSxDQUFDO0FBQy9DLFFBQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxVQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0FBS2pELFFBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMzQyxRQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLE9BQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDaEIsQ0FBQyxDQUFDOzs7Ozs7O0FBT0gsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxtQkFBTyxDQUFDLEVBQWtCLENBQUMsQ0FBQyxDQUFDO0FBQzNELE1BQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDaEUsTUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOztBQUVqRSxRQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDakMsUUFBSSxJQUFJLEdBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDN0IsUUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFDaEIsVUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0FBQ2QsZ0JBQVUsRUFBRSxVQUFTLEtBQUssRUFBRTtBQUFFLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO09BQUU7QUFDbkQsZUFBUyxFQUFFLFVBQVMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUFFLFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7T0FBRTtBQUM1RCxvQkFBYyxFQUFFLFlBQVc7QUFBRSxXQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQUU7S0FDaEQsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixPQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2hCLENBQUMsQ0FBQzs7O0FBR0gsR0FBQyxZQUFXO0FBQ1YsUUFBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxDQUF5QixDQUFDLENBQUM7QUFDaEQsUUFBSSxFQUFFLEdBQUcsbUJBQU8sQ0FBQyxFQUFjLENBQUMsQ0FBQztBQUNqQyxRQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLEVBQU0sQ0FBQyxDQUFDO0FBQzNCLFFBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELFFBQUksUUFBUSxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQzNCLFVBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ3pDLFlBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM3QyxZQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDOUIsZUFBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEMsTUFBTTs7QUFFTCxjQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwQyxjQUFJLEdBQUcsR0FBRyxRQUFRLENBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDL0QsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0QixjQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDaEQsZUFBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDNUQ7QUFDRCxjQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvQyxjQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsY0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqRCxjQUFJLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25FLG9CQUFVLENBQUMsa0JBQWtCLENBQUM7QUFDNUIsc0JBQVUsRUFBRSxXQUFXLENBQUMsU0FBUztBQUNqQyxnQkFBSSxFQUFFLEdBQUc7QUFDVCxnQkFBSSxFQUFFLElBQUk7V0FDWCxDQUFDLENBQUM7U0FDSjtPQUNGLENBQUMsQ0FBQztBQUNILGFBQU8sS0FBSyxDQUFDO0tBQ2QsQ0FBQztBQUNGLFdBQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzVCLEdBQUcsQ0FBQzs7QUFFTCxRQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsWUFBVztBQUMzQyxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4QixNQUFNO0FBQ0wsYUFBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDaEY7R0FDRixDQUFDLEM7Ozs7OztBQ2xHRixvQzs7Ozs7Ozs7Ozs7Ozs7QUNRQSxjQUFZLENBQUM7Ozs7TUFFTixTQUFTLHVDQUFNLEVBQXFCOztBQUUzQyxNQUFJLFdBQVcsR0FBRyxTQUFTLENBQUM7O0FBRTFCLGFBQVMsRUFBRSxJQUFJO0FBQ2YscUJBQWlCLEVBQUUsSUFBSTtBQUN2QixtQkFBZSxFQUFFLElBQUk7QUFDckIsbUJBQWUsRUFBRSxJQUFJOztHQUV0QixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLEM7Ozs7Ozs7Ozs7Ozs7O0FDYjVCLGNBQVksQ0FBQzs7OztNQUVOLElBQUksdUNBQU0sRUFBTTs7TUFDaEIsY0FBYyx1Q0FBTSxDQUE2Qjs7TUFDakQsTUFBTSx1Q0FBTSxDQUF5Qjs7Ozs7O0FBTTVDLE1BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTs7Ozs7O0FBTTdDLHNCQUFrQiw4QkFBQyxNQUFNLEVBQUU7QUFDekIsVUFBSSxPQUFPLEdBQUc7QUFDWixjQUFNLEVBQUUsY0FBYyxDQUFDLGFBQWE7QUFDcEMsY0FBTSxFQUFFLE1BQU07T0FDZixDQUFDO0FBQ0YsVUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4Qjs7Ozs7O0FBTUQsb0JBQWdCLDRCQUFDLE1BQU0sRUFBRTtBQUN2QixVQUFJLE9BQU8sR0FBRztBQUNaLGNBQU0sRUFBRSxjQUFjLENBQUMsV0FBVztBQUNsQyxjQUFNLEVBQUUsTUFBTTtPQUNmLENBQUM7QUFDRixVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCOztHQUVGLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQzs7Ozs7O0FDOUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUF5Qiw4QkFBOEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQSxjQUFZLENBQUM7Ozs7TUFFTixVQUFVLHVDQUFNLENBQW9COztNQUNwQyxXQUFXLHVDQUFNLENBQTBCOztNQUMzQyxvQkFBb0IsdUNBQU0sQ0FBZ0M7O01BQzFELElBQUksdUNBQU0sRUFBWTs7QUFFN0IsUUFBTSxDQUFDLE9BQU8sR0FBRzs7QUFFZixjQUFVLHNCQUFDLElBQUksRUFBRTtBQUNmLFVBQUksb0JBQW9CLENBQUMsU0FBUyxFQUFFO0FBQ2xDLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO09BQ3BEOztBQUVELGdCQUFVLENBQUMsZ0JBQWdCLENBQUM7QUFDMUIsa0JBQVUsRUFBRSxXQUFXLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJO09BQ3BELENBQUMsQ0FBQztLQUNKOztBQUVELFlBQVEsb0JBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNqQixnQkFBVSxDQUFDLGdCQUFnQixDQUFDO0FBQzFCLGtCQUFVLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSTtPQUM5QyxDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQ3pCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUMxQixHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ2pCLGtCQUFVLENBQUMsa0JBQWtCLENBQUM7QUFDNUIsb0JBQVUsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7U0FDeEUsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxFQUFFLEVBQUU7QUFDTixZQUFFLEVBQUUsQ0FBQztTQUNOO09BQ0YsQ0FBQyxDQUFDO0tBQ047O0dBRUYsQzs7Ozs7Ozs7Ozs7Ozs7QUNwQ0QsY0FBWSxDQUFDOzs7O01BRU4sU0FBUyx1Q0FBTSxFQUFxQjs7QUFFM0MsTUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDOztBQUU3QixlQUFXLEVBQUUsSUFBSTtBQUNqQixpQkFBYSxFQUFFLElBQUk7O0dBRXBCLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQzs7Ozs7Ozs7Ozs7Ozs7QUNYL0IsY0FBWSxDQUFDOzs7O01BRU4sVUFBVSx1Q0FBTSxDQUFvQjs7TUFDcEMsV0FBVyx1Q0FBTSxDQUEwQjs7TUFDM0MsY0FBYyx1Q0FBTSxDQUE2Qjs7TUFDakQsWUFBWSx1Q0FBTSxFQUFlOztNQUNqQyxNQUFNLHVDQUFNLENBQXlCOztBQUU1QyxNQUFJLFlBQVksR0FBRyxRQUFRLENBQUM7O0FBRTVCLE1BQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixNQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLE1BQUksSUFBVSxFQUFFO0FBQ2QsVUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQ25DLFVBQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0FBQy9DLFVBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztHQUNqQzs7QUFFRCxNQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7O0FBUWhELFdBQU8sbUJBQUMsSUFBSSxFQUFFO0FBQ1osYUFBTyxJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRztBQUNyQyxhQUFLLEVBQUUsZ0JBQWdCO0FBQ3ZCLFlBQUksRUFBRSxVQUFVO09BQ2pCLENBQUM7S0FDSDs7Ozs7OztBQU9ELGNBQVUsd0JBQUc7QUFDWCxhQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDaEM7Ozs7Ozs7QUFPRCxZQUFRLG9CQUFDLFFBQVEsRUFBRTtBQUNqQixVQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNqQzs7Ozs7OztBQU9ELE9BQUcsZUFBQyxRQUFRLEVBQUU7QUFDWixVQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNsQzs7R0FFRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQzFELFFBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0FBRTVCLFlBQVEsTUFBTSxDQUFDLFVBQVU7O0FBRXZCLFdBQUssV0FBVyxDQUFDLFNBQVM7QUFDeEIsWUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQUU7QUFDaEQsa0JBQVEsR0FBRyxJQUFJLENBQUM7U0FDakIsTUFBTTtBQUNMLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2Ysa0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztXQUNuQztTQUNGO0FBQ0QsZ0JBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN0QixjQUFNOztBQUVSOztBQUVKLGVBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBQUEsS0FDeEI7R0FFRixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLEM7Ozs7OztBQzlGekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFxQztBQUNyQztBQUNBO0FBQ0EsT0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTBDLHlCQUF5QixFQUFFO0FBQ3JFO0FBQ0E7O0FBRUEsNEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBNkIsc0JBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFjO0FBQ2QsZ0JBQWM7QUFDZDtBQUNBLGFBQVcsT0FBTztBQUNsQixjQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzFDQSxjQUFZLENBQUM7Ozs7OztzQkFFTixFQUFZOztNQUVaLEtBQUssdUNBQU0sQ0FBTzs7TUFDbEIsU0FBUyx1Q0FBTSxDQUFxQjs7TUFDcEMsVUFBVSx1Q0FBTSxDQUEwQjs7TUFDMUMsZUFBZSx1Q0FBTSxFQUFtQjs7TUFDeEMsUUFBUSx1Q0FBTSxDQUF1Qjs7TUFDckMsTUFBTSx1Q0FBTSxFQUFlOztNQUMzQixXQUFXLHVDQUFNLEVBQWdCOztNQUNqQyxZQUFZLHVDQUFNLEVBQWlCOztNQUNuQyxVQUFVLHVDQUFNLEVBQWU7O01BQy9CLEdBQUcsdUNBQU0sRUFBVTs7TUFDbkIsRUFBRSx1Q0FBTSxFQUFrQjs7Ozs7QUFHakMsTUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFDbEMsVUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDOztBQUV6QixhQUFTLEVBQUU7QUFDVCxVQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxnQkFBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0MsZUFBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDMUMsb0JBQWMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0tBQ2hEOztBQUVELFVBQU0sb0JBQUc7QUFDUCxVQUFJLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsZUFBUyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQztBQUM5RCxVQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWxDLFVBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7QUFDNUIsWUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM1QixlQUFPLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO09BQ2hEO0FBQ0Q7OztBQUdFOztZQUFLLFNBQVMsRUFBQyxLQUFLO1VBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFDckI7O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDdkIsb0JBQUMsTUFBTSxPQUFFO1lBQ1Qsb0JBQUMsVUFBVSxPQUFFO1dBQ1g7VUFHTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEdBQ3hCOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCLG9CQUFDLEdBQUcsT0FBRTtZQUNOLG9CQUFDLEVBQUUsT0FBRTtXQUNELEdBQ047O2NBQUssU0FBUyxFQUFDLFdBQVc7WUFDeEI7OztjQUFLLElBQUksQ0FBQyxLQUFLO2FBQU07V0FDakI7VUFHUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLElBQ3pCLG9CQUFDLFdBQVcsYUFBQyxTQUFTLEVBQUMsV0FBVyxJQUFLLElBQUksRUFBRztVQUc1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLElBQzNCOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsV0FBVztjQUN4Qjs7a0JBQUcsU0FBUyxFQUFDLFlBQVk7Z0JBQ3ZCOzs7O2lCQUEwQjtnQkFDMUI7OztrQkFBTTs7c0JBQUcsSUFBSSxFQUFDLEdBQUc7O21CQUFTO2lCQUFPO2dCQUNqQzs7O2tCQUFNOztzQkFBRyxJQUFJLEVBQUMsVUFBVTs7bUJBQVk7aUJBQU87ZUFDekM7YUFDQTtXQUNGOztPQUVGLENBRU47S0FDSDs7R0FFRixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQy9FN0IsY0FBWSxDQUFDOzs7O01BRU4sS0FBSyx1Q0FBTSxDQUFPOztNQUNsQixvQkFBb0IsdUNBQU0sQ0FBZ0M7O01BQzFELFVBQVUsdUNBQU0sQ0FBMEI7O0FBRWpELE1BQUksZUFBZSxHQUFHOztBQUVwQixxQkFBaUIsK0JBQUc7QUFDbEIsVUFBSSxvQkFBb0IsQ0FBQyxTQUFTLEVBQUU7QUFDbEMsY0FBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekQsY0FBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDcEQ7S0FDRjs7QUFFRCx3QkFBb0Isa0NBQUc7QUFDckIsWUFBTSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUQsWUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdkQ7O0FBRUQsa0JBQWMsMEJBQUMsS0FBSyxFQUFFO0FBQ3BCLFVBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNmLFlBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7T0FHN0IsTUFBTTtBQUNMLGtCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDakQ7S0FDRjs7QUFFRCxlQUFXLHVCQUFDLEtBQUssRUFBRTtBQUNqQixVQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtBQUNwRyxlQUFPO09BQ1I7OztBQUdELFVBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDdEIsYUFBTyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7QUFDaEMsVUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7T0FDcEI7QUFDRCxVQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO0FBQzlCLGVBQU87T0FDUjs7Ozs7QUFLRCxVQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDeEUsZUFBTztPQUNSOzs7QUFHRCxVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLFVBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxFQUFFO0FBQ2xFLGVBQU87T0FDUjs7O0FBR0QsVUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUN4QyxlQUFPO09BQ1I7OztBQUdELFVBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtBQUNiLGVBQU87T0FDUjs7O0FBR0QsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUNwRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDM0QsVUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDL0MsZUFBTztPQUNSOzs7QUFHRCxVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQzs7QUFFckQsV0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLGdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFNO0FBQzlCLGtCQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzdCLENBQUMsQ0FBQztLQUNKOztHQUVGLENBQUM7O0FBRUYsUUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLEM7Ozs7Ozs7Ozs7Ozs7O0FDckZoQyxjQUFZLENBQUM7Ozs7TUFFTixLQUFLLHVDQUFNLENBQU87O0FBRXpCLE1BQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7QUFFNUIsVUFBTSxvQkFBRztBQUNQOztBQUVFOzs7VUFDRTs7Y0FBSyxTQUFTLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxTQUFTO1lBQ3hDOztnQkFBSSxTQUFTLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxlQUFlO2NBQzdDOzs7Z0JBQUk7O29CQUFHLFNBQVMsRUFBQyxnQ0FBZ0MsRUFBQyxJQUFJLEVBQUMsTUFBTTs7aUJBQVM7ZUFBSztjQUMzRTs7O2dCQUFJOztvQkFBRyxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsSUFBSSxFQUFDLFFBQVE7O2lCQUFXO2VBQUs7Y0FDMUU7OztnQkFBSTs7b0JBQUcsU0FBUyxFQUFDLDBCQUEwQixFQUFDLElBQUksRUFBQyxVQUFVOztpQkFBYTtlQUFLO2NBQzdFOzs7Z0JBQUk7O29CQUFHLFNBQVMsRUFBQyw4QkFBOEIsRUFBQyxJQUFJLEVBQUMsV0FBVzs7aUJBQWM7ZUFBSztjQUNuRjs7O2dCQUFJOztvQkFBRyxTQUFTLEVBQUMsNkJBQTZCLEVBQUMsSUFBSSxFQUFDLE9BQU87O2lCQUFVO2VBQUs7Y0FDMUU7OztnQkFBSTs7b0JBQUcsU0FBUyxFQUFDLCtCQUErQixFQUFDLElBQUksRUFBQyxVQUFVOztpQkFBYTtlQUFLO2FBQy9FO1dBQ0Q7O09BQ0EsQ0FFUjtLQUNIOztHQUVGLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0J2QixjQUFZLENBQUM7Ozs7TUFFTixLQUFLLHVDQUFNLENBQU87O0FBRXpCLE1BQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7QUFFbEMsYUFBUyxFQUFFO0FBQ1QsVUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7S0FDeEM7O0FBRUQsVUFBTSxvQkFBRzttQkFDaUMsSUFBSSxDQUFDLEtBQUs7VUFBNUMsU0FBUyxVQUFULFNBQVM7VUFBRSxLQUFLLFVBQUwsS0FBSztVQUFFLElBQUksVUFBSixJQUFJO1VBQUUsS0FBSyxVQUFMLEtBQUs7Ozs7QUFHbkMsYUFBTyw4QkFBTSxTQUFTLEVBQUUsY0FBYyxHQUFHLFNBQVU7QUFDakQsK0JBQXVCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQzs7S0FFL0M7O0dBRUYsQ0FBQyxDQUFDOztBQUVILFFBQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDOzs7Ozs7Ozs7Ozs7OztBQ3JCNUIsY0FBWSxDQUFDOzs7O01BRU4sS0FBSyx1Q0FBTSxDQUFPOztBQUV6QixNQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7O0FBRTdCLFVBQU0sb0JBQUc7QUFDUDs7QUFFRTs7WUFBUSxTQUFTLEVBQUMsaUJBQWlCO1VBQ2pDOztjQUFLLFNBQVMsRUFBQyxvQkFBb0I7WUFDakMsNkJBQUssU0FBUyxFQUFDLHFCQUFxQixFQUFDLGtCQUFlLE9BQU8sRUFBQyx1QkFBb0IsbUJBQW1CLEdBQU87V0FDdEc7VUFFTjs7Y0FBRyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxNQUFNO1lBQUM7Ozs7YUFBbUI7V0FBSTtVQUdwRDs7Y0FBSyxTQUFTLEVBQUMsVUFBVTtZQUN2Qjs7Z0JBQUksU0FBUyxFQUFDLHlCQUF5QjtjQUNyQzs7O2dCQUFJOztvQkFBRyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxVQUFVOztpQkFBVztlQUFLO2FBQ3REO1dBQ0Q7O09BQ0MsQ0FFVDtLQUNIOztHQUVGLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQ3JDeEIsY0FBWSxDQUFDOzs7Ozs7TUFJTixLQUFLLHVDQUFNLENBQU87O0FBRXpCLE1BQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7QUFFbkMsVUFBTSxvQkFBRztBQUNQOztBQUVFOzs7VUFDRTs7OztXQUF1QjtVQUN2Qjs7OztXQUFrRTs7T0FDOUQsQ0FFTjtLQUNIOztHQUVGLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7TUNsQnZCLEtBQUssdUNBQU0sQ0FBTzs7QUFDekIsTUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUUsTUFBSSxLQUFLLENBQUM7QUFDVixjQUFZLENBQUM7QUFDYixRQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7O0FBQ2pDLG1CQUFlLEVBQUUsWUFBWTtBQUMzQixhQUFPO0FBQ0wsV0FBRyxFQUFFLEVBQUU7T0FDUixDQUFDO0tBQ0g7QUFDRCxxQkFBaUIsRUFBRSxZQUFXO0FBQzVCLFVBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsT0FBQyxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRTtBQUNyRCxtQkFBVyxFQUFFLDRFQUEwRTtPQUN4RixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsT0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDZixhQUFLLEVBQUUsS0FBSztBQUNaLGNBQU0sRUFBRSxDQUFDO09BQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkLGVBQVMsTUFBTSxDQUFDLEtBQUssRUFBQztBQUNwQixTQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDbEIsZUFBSyxFQUFFLEtBQUs7QUFDWixtQkFBUyxFQUFFLE1BQU07QUFDakIscUJBQVcsRUFBRSxHQUFHO1NBQ2pCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDZjtBQUNELGVBQVMsUUFBUSxDQUFDLE1BQU0sRUFBQztBQUN2QixhQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyxlQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtPQUNGO0FBQ0QsY0FBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hCLFVBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztBQUMxQixZQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztLQUNuQjtBQUNELFVBQU0sRUFBRSxZQUFZO0FBQ2xCOztBQUVJLHFDQUFLLEVBQUUsRUFBQyxLQUFLO09BQUU7O09BRWpCO0tBQ0g7R0FDRixDQUFDLEM7Ozs7Ozs7Ozs7OztNQzVDSyxLQUFLLHVDQUFNLENBQU87O01BQ2xCLE9BQU8sdUNBQUssRUFBZTs7QUFFbEMsY0FBWSxDQUFDO0FBQ2IsUUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOztBQUNqQyxtQkFBZSxFQUFFLFlBQVk7QUFDM0IsYUFBTztBQUNMLFlBQUksRUFBRSxFQUFFO09BQ1QsQ0FBQztLQUNIO0FBQ0QscUJBQWlCLEVBQUUsWUFBVztBQUM1QixVQUFJLElBQUksR0FBRyxDQUNUO0FBQ0UsWUFBTSxDQUFDO0FBQ1AsY0FBUSxlQUFlO0FBQ3ZCLGNBQVEsVUFBVTtBQUNsQixlQUFTLFFBQVE7QUFDakIsaUJBQVcsZ0JBQWdCO0FBQzNCLGlCQUFXLE9BQU87QUFDbEIsd0JBQWtCLENBQUM7T0FDcEIsRUFDRDtBQUNFLFlBQU0sQ0FBQztBQUNQLGNBQVEsYUFBYTtBQUNyQixjQUFRLGFBQWE7QUFDckIsZUFBUyxZQUFZO0FBQ3JCLGlCQUFXLFlBQVk7QUFDdkIsaUJBQVcsVUFBVTtBQUNyQix3QkFBa0IsQ0FBQztPQUNwQixFQUNEO0FBQ0UsWUFBTSxDQUFDO0FBQ1AsY0FBUSxnQkFBZ0I7QUFDeEIsY0FBUSxRQUFRO0FBQ2hCLGVBQVMsU0FBUztBQUNsQixpQkFBVyxTQUFTO0FBQ3BCLGlCQUFXLFNBQVM7QUFDcEIsd0JBQWtCLENBQUM7T0FDcEIsRUFDRDtBQUNFLFlBQU0sQ0FBQztBQUNQLGNBQVEsY0FBYztBQUN0QixjQUFRLFVBQVU7QUFDbEIsZUFBUyxVQUFVO0FBQ25CLGlCQUFXLGFBQWE7QUFDeEIsaUJBQVcsV0FBVztBQUN0Qix3QkFBa0IsQ0FBQztPQUNwQixFQUNEO0FBQ0UsWUFBTSxDQUFDO0FBQ1AsY0FBUSxXQUFXO0FBQ25CLGNBQVEsZUFBZTtBQUN2QixlQUFTLFNBQVM7QUFDbEIsaUJBQVcsU0FBUztBQUNwQixpQkFBVyxXQUFXO0FBQ3RCLHdCQUFrQixDQUFDO09BQ3BCLEVBQ0Q7QUFDRSxZQUFNLENBQUM7QUFDUCxjQUFRLFdBQVc7QUFDbkIsY0FBUSxlQUFlO0FBQ3ZCLGVBQVMsU0FBUztBQUNsQixpQkFBVyxTQUFTO0FBQ3BCLGlCQUFXLFdBQVc7QUFDdEIsd0JBQWtCLENBQUM7T0FDcEIsQ0FDRixDQUFDO0FBQ0YsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQzdCO0FBQ0QsVUFBTSxFQUFFLFlBQVk7QUFDbEI7O0FBRUUsNEJBQUMsT0FBTyxJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssRUFBQyxjQUFjLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUU7T0FBRzs7T0FFaEg7S0FDSDtHQUNGLENBQUMsQzs7Ozs7O0FDOUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EsMENBQXdDLGdCQUFnQjtBQUN4RCxNQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDZkE7QUFDQSxpUjs7Ozs7O0FDREEsNEM7Ozs7OztBQ0FBLHNDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEseUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQwMmY5NmM1NjUwZDRhOWViNGIwXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2NvcmUvRGlzcGF0Y2hlcic7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnO1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJy4vc3RvcmVzL0FwcFN0b3JlJztcblxudmFyIHNlcnZlciA9IGV4cHJlc3MoKTtcblxuc2VydmVyLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDApKTtcbnNlcnZlci51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSkpKTtcblxuLy9cbi8vIFBhZ2UgQVBJXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuc2VydmVyLmdldCgnL2FwaS9wYWdlLyonLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICB2YXIgcGF0aCA9IHJlcS5wYXRoLnN1YnN0cig5KTtcbiAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHBhdGgpO1xuICByZXMuc2VuZChwYWdlKTtcbn0pO1xuXG4vL1xuLy8gU2VydmVyLXNpZGUgcmVuZGVyaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCArIEhUTUwgdGVtcGxhdGUgZm9yIGl0XG52YXIgQXBwID0gUmVhY3QuY3JlYXRlRmFjdG9yeShyZXF1aXJlKCcuL2NvbXBvbmVudHMvQXBwJykpO1xudmFyIHRlbXBsYXRlRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcpO1xudmFyIHRlbXBsYXRlID0gXy50ZW1wbGF0ZShmcy5yZWFkRmlsZVN5bmModGVtcGxhdGVGaWxlLCAndXRmOCcpKTtcblxuc2VydmVyLmdldCgnKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHZhciBkYXRhID0ge2Rlc2NyaXB0aW9uOiAnJ307XG4gIHZhciBhcHAgPSBuZXcgQXBwKHtcbiAgICBwYXRoOiByZXEucGF0aCxcbiAgICBvblNldFRpdGxlOiBmdW5jdGlvbih0aXRsZSkgeyBkYXRhLnRpdGxlID0gdGl0bGU7IH0sXG4gICAgb25TZXRNZXRhOiBmdW5jdGlvbihuYW1lLCBjb250ZW50KSB7IGRhdGFbbmFtZV0gPSBjb250ZW50OyB9LFxuICAgIG9uUGFnZU5vdEZvdW5kOiBmdW5jdGlvbigpIHsgcmVzLnN0YXR1cyg0MDQpOyB9XG4gIH0pO1xuICBkYXRhLmJvZHkgPSBSZWFjdC5yZW5kZXJUb1N0cmluZyhhcHApO1xuICB2YXIgaHRtbCA9IHRlbXBsYXRlKGRhdGEpO1xuICByZXMuc2VuZChodG1sKTtcbn0pO1xuXG4vLyBMb2FkIHBhZ2VzIGZyb20gdGhlIGAvc3JjL2NvbnRlbnQvYCBmb2xkZXIgaW50byB0aGUgQXBwU3RvcmVcbihmdW5jdGlvbigpIHtcbiAgdmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG4gIHZhciBmbSA9IHJlcXVpcmUoJ2Zyb250LW1hdHRlcicpO1xuICB2YXIgamFkZSA9IHJlcXVpcmUoJ2phZGUnKTtcbiAgdmFyIHNvdXJjZURpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2NvbnRlbnQnKTtcbiAgdmFyIGdldEZpbGVzID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgdmFyIHBhZ2VzID0gW107XG4gICAgZnMucmVhZGRpclN5bmMoZGlyKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdGF0ID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKGRpciwgZmlsZSkpO1xuICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHBhZ2VzID0gcGFnZXMuY29uY2F0KGdldEZpbGVzKGZpbGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIGZpbGUgdG8gYSBQYWdlIG9iamVjdFxuICAgICAgICB2YXIgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZGlyLCBmaWxlKTtcbiAgICAgICAgdmFyIHVybCA9IGZpbGVuYW1lLlxuICAgICAgICAgIHN1YnN0cihzb3VyY2VEaXIubGVuZ3RoLCBmaWxlbmFtZS5sZW5ndGggLSBzb3VyY2VEaXIubGVuZ3RoIC0gNSlcbiAgICAgICAgICAucmVwbGFjZSgnXFxcXCcsICcvJyk7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignL2luZGV4JywgdXJsLmxlbmd0aCAtIDYpICE9PSAtMSkge1xuICAgICAgICAgIHVybCA9IHVybC5zdWJzdHIoMCwgdXJsLmxlbmd0aCAtICh1cmwubGVuZ3RoID4gNiA/IDYgOiA1KSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKTtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBmbShzb3VyY2UpO1xuICAgICAgICB2YXIgaHRtbCA9IGphZGUucmVuZGVyKGNvbnRlbnQuYm9keSwgbnVsbCwgJyAgJyk7XG4gICAgICAgIHZhciBwYWdlID0gYXNzaWduKHt9LCB7cGF0aDogdXJsLCBib2R5OiBodG1sfSwgY29udGVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgRGlzcGF0Y2hlci5oYW5kbGVTZXJ2ZXJBY3Rpb24oe1xuICAgICAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSxcbiAgICAgICAgICBwYXRoOiB1cmwsXG4gICAgICAgICAgcGFnZTogcGFnZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH07XG4gIHJldHVybiBnZXRGaWxlcyhzb3VyY2VEaXIpO1xufSkoKTtcblxuc2VydmVyLmxpc3RlbihzZXJ2ZXIuZ2V0KCdwb3J0JyksIGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5zZW5kKSB7XG4gICAgcHJvY2Vzcy5zZW5kKCdvbmxpbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JyArIHNlcnZlci5nZXQoJ3BvcnQnKSk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL3NlcnZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcclxuXHJcbnZhciBBY3Rpb25UeXBlcyA9IGtleU1pcnJvcih7XHJcblxyXG4gIExPQURfUEFHRTogbnVsbCxcclxuICBMT0FEX1BBR0VfU1VDQ0VTUzogbnVsbCxcclxuICBMT0FEX1BBR0VfRVJST1I6IG51bGwsXHJcbiAgQ0hBTkdFX0xPQ0FUSU9OOiBudWxsXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWN0aW9uVHlwZXM7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanNcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgRmx1eCBmcm9tICdmbHV4JztcclxuaW1wb3J0IFBheWxvYWRTb3VyY2VzIGZyb20gJy4uL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcyc7XHJcbmltcG9ydCBhc3NpZ24gZnJvbSAncmVhY3QvbGliL09iamVjdC5hc3NpZ24nO1xyXG5cclxuLyoqXHJcbiAqIEEgc2luZ2xldG9uIHRoYXQgb3BlcmF0ZXMgYXMgdGhlIGNlbnRyYWwgaHViIGZvciBhcHBsaWNhdGlvbiB1cGRhdGVzLlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiB2aXNpdCBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L1xyXG4gKi9cclxudmFyIERpc3BhdGNoZXIgPSBhc3NpZ24obmV3IEZsdXguRGlzcGF0Y2hlcigpLCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xyXG4gICAqIHR5cGUgYW5kIGFkZGl0aW9uYWwgZGF0YSBjb21pbmcgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqL1xyXG4gIGhhbmRsZVNlcnZlckFjdGlvbihhY3Rpb24pIHtcclxuICAgIHZhciBwYXlsb2FkID0ge1xyXG4gICAgICBzb3VyY2U6IFBheWxvYWRTb3VyY2VzLlNFUlZFUl9BQ1RJT04sXHJcbiAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kaXNwYXRjaChwYXlsb2FkKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkZXRhaWxzIG9mIHRoZSBhY3Rpb24sIGluY2x1ZGluZyB0aGUgYWN0aW9uJ3NcclxuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXHJcbiAgICovXHJcbiAgaGFuZGxlVmlld0FjdGlvbihhY3Rpb24pIHtcclxuICAgIHZhciBwYXlsb2FkID0ge1xyXG4gICAgICBzb3VyY2U6IFBheWxvYWRTb3VyY2VzLlZJRVdfQUNUSU9OLFxyXG4gICAgICBhY3Rpb246IGFjdGlvblxyXG4gICAgfTtcclxuICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb3JlL0Rpc3BhdGNoZXIuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcclxuaW1wb3J0IEV4ZWN1dGlvbkVudmlyb25tZW50IGZyb20gJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCc7XHJcbmltcG9ydCBodHRwIGZyb20gJ3N1cGVyYWdlbnQnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIG5hdmlnYXRlVG8ocGF0aCkge1xyXG4gICAgaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5DSEFOR0VfTE9DQVRJT04sIHBhdGg6IHBhdGhcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGxvYWRQYWdlKHBhdGgsIGNiKSB7XHJcbiAgICBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5MT0FEX1BBR0UsIHBhdGg6IHBhdGhcclxuICAgIH0pO1xyXG5cclxuICAgIGh0dHAuZ2V0KCcvYXBpL3BhZ2UnICsgcGF0aClcclxuICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXHJcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgRGlzcGF0Y2hlci5oYW5kbGVTZXJ2ZXJBY3Rpb24oe1xyXG4gICAgICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLCBwYXRoOiBwYXRoLCBlcnI6IGVyciwgcGFnZTogcmVzLmJvZHlcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcclxuXHJcbnZhciBQYXlsb2FkU291cmNlcyA9IGtleU1pcnJvcih7XHJcblxyXG4gIFZJRVdfQUNUSU9OOiBudWxsLFxyXG4gIFNFUlZFUl9BQ1RJT046IG51bGxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXlsb2FkU291cmNlcztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcy5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XG5pbXBvcnQgUGF5bG9hZFNvdXJjZXMgZnJvbSAnLi4vY29uc3RhbnRzL1BheWxvYWRTb3VyY2VzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJztcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuXG52YXIgX3BhZ2VzID0ge307XG52YXIgX2xvYWRpbmcgPSBmYWxzZTtcblxuaWYgKF9fU0VSVkVSX18pIHtcbiAgX3BhZ2VzWycvJ10gPSB7dGl0bGU6ICdIb21lIFBhZ2UnfTtcbiAgX3BhZ2VzWycvcHJpdmFjeSddID0ge3RpdGxlOiAnUHJpdmFjeSBQb2xpY3knfTtcbiAgX3BhZ2VzWycvbWFwJ10gPSB7dGl0bGU6ICdNYXAnfTtcbn1cblxudmFyIEFwcFN0b3JlID0gYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgLyoqXG4gICAqIEdldHMgcGFnZSBkYXRhIGJ5IHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVVJMIHBhdGguXG4gICAqIEByZXR1cm5zIHsqfSBQYWdlIGRhdGEuXG4gICAqL1xuICBnZXRQYWdlKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aCBpbiBfcGFnZXMgPyBfcGFnZXNbcGF0aF0gOiB7XG4gICAgICB0aXRsZTogJ1BhZ2UgTm90IEZvdW5kJyxcbiAgICAgIHR5cGU6ICdub3Rmb3VuZCdcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSW5kaWNhdGlvbiBpZiB3ZSd2ZSBlbWl0dGVkIGFuIGV2ZW50LlxuICAgKi9cbiAgZW1pdENoYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KENIQU5HRV9FVkVOVCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IGNoYW5nZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBvbkNoYW5nZShjYWxsYmFjaykge1xuICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgb2ZmKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vZmYoQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH1cblxufSk7XG5cbkFwcFN0b3JlLmRpc3BhdGNoZXJUb2tlbiA9IERpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgdmFyIGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcblxuICAgIGNhc2UgQWN0aW9uVHlwZXMuTE9BRF9QQUdFOlxuICAgICAgaWYgKGFjdGlvbi5zb3VyY2UgPT09IFBheWxvYWRTb3VyY2VzLlZJRVdfQUNUSU9OKSB7XG4gICAgICAgIF9sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghYWN0aW9uLmVycikge1xuICAgICAgICAgIF9wYWdlc1thY3Rpb24ucGF0aF0gPSBhY3Rpb24ucGFnZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQXBwU3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRG8gbm90aGluZ1xuY29uc29sZS5sb2coUGF5bG9hZFNvdXJjZXMpXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9zdG9yZXMvQXBwU3RvcmUuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXhlY3V0aW9uRW52aXJvbm1lbnRcbiAqL1xuXG4vKmpzbGludCBldmlsOiB0cnVlICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOlxuICAgIGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlNaXJyb3JcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2tleU1pcnJvci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICcuL0FwcC5sZXNzJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAncmVhY3QvbGliL2ludmFyaWFudCc7XG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25NaXhpbiBmcm9tICcuL05hdmlnYXRpb25NaXhpbic7XG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmVzL0FwcFN0b3JlJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vTmF2aWdhdGlvbic7XG5pbXBvcnQgQ29udGVudFBhZ2UgZnJvbSAnLi4vQ29udGVudFBhZ2UnO1xuaW1wb3J0IE5vdEZvdW5kUGFnZSBmcm9tICcuLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEFzaWRlUGFuZWwgZnJvbSAnLi4vQXNpZGVQYW5lbCc7XG5pbXBvcnQgTWFwIGZyb20gJy4uL09TTWFwJztcbmltcG9ydCBSVCBmcm9tICcuLi9Sb3V0ZVRhYmxlL1JUJztcblxuXG52YXIgQXBwbGljYXRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW05hdmlnYXRpb25NaXhpbl0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgcGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2V0VGl0bGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25TZXRNZXRhOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uUGFnZU5vdEZvdW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBwYWdlID0gQXBwU3RvcmUuZ2V0UGFnZSh0aGlzLnByb3BzLnBhdGgpO1xuICAgIGludmFyaWFudChwYWdlICE9PSB1bmRlZmluZWQsICdGYWlsZWQgdG8gbG9hZCBwYWdlIGNvbnRlbnQuJyk7XG4gICAgdGhpcy5wcm9wcy5vblNldFRpdGxlKHBhZ2UudGl0bGUpO1xuXG4gICAgaWYgKHBhZ2UudHlwZSA9PT0gJ25vdGZvdW5kJykge1xuICAgICAgdGhpcy5wcm9wcy5vblBhZ2VOb3RGb3VuZCgpO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90Rm91bmRQYWdlLCBwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAgICAgIHt0aGlzLnByb3BzLnBhdGggIT0gJy8nICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgPE5hdmJhci8+XG4gICAgICAgICAgICA8QXNpZGVQYW5lbC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtcbiAgICAgICAgdGhpcy5wcm9wcy5wYXRoID09PSAnL21hcCcgP1xuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPE1hcC8+XG4gICAgICAgICAgICA8UlQvPlxuICAgICAgICAgIDwvZGl2PjpcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGgyPntwYWdlLnRpdGxlfTwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgIHRoaXMucHJvcHMucGF0aCAhPSAnL21hcCcgJiZcbiAgICAgICAgPENvbnRlbnRQYWdlIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIHsuLi5wYWdlfS8+XG4gICAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5wYXRoICE9ICcvbWFwJyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1mb290ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1tdXRlZFwiPlxuICAgICAgICAgICAgICA8c3Bhbj7CqSBNb2JpbGVSb3V0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj1cIi9cIj5Ib21lPC9hPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj1cIi9wcml2YWN5XCI+UHJpdmFjeTwvYT48L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9+L2pzaGludC1sb2FkZXIhQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanNcbiAqKi8iLCIvKlxyXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRXhlY3V0aW9uRW52aXJvbm1lbnQgZnJvbSAncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JztcclxuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnLi4vLi4vYWN0aW9ucy9BcHBBY3Rpb25zJztcclxuXHJcbnZhciBOYXZpZ2F0aW9uTWl4aW4gPSB7XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuc3RhdGUpIHtcclxuICAgICAgdmFyIHBhdGggPSBldmVudC5zdGF0ZS5wYXRoO1xyXG4gICAgICAvLyBUT0RPOiBSZXBsYWNlIGN1cnJlbnQgbG9jYXRpb25cclxuICAgICAgLy8gcmVwbGFjZShwYXRoLCBldmVudC5zdGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8od2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kbGVDbGljayhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW5zdXJlIGxpbmtcclxuICAgIHZhciBlbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIHdoaWxlIChlbCAmJiBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7XHJcbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICAgIGlmICghZWwgfHwgZWwubm9kZU5hbWUgIT09ICdBJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWdub3JlIGlmIHRhZyBoYXNcclxuICAgIC8vIDEuIFwiZG93bmxvYWRcIiBhdHRyaWJ1dGVcclxuICAgIC8vIDIuIHJlbD1cImV4dGVybmFsXCIgYXR0cmlidXRlXHJcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGVsLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVuc3VyZSBub24taGFzaCBmb3IgdGhlIHNhbWUgcGF0aFxyXG4gICAgdmFyIGxpbmsgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGlmIChlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgJyMnID09PSBsaW5rKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIG1haWx0bzogaW4gdGhlIGhyZWZcclxuICAgIGlmIChsaW5rICYmIGxpbmsuaW5kZXhPZignbWFpbHRvOicpID4gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRhcmdldFxyXG4gICAgaWYgKGVsLnRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gWC1vcmlnaW5cclxuICAgIHZhciBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICtcclxuICAgICAgKHdpbmRvdy5sb2NhdGlvbi5wb3J0ID8gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQgOiAnJyk7XHJcbiAgICBpZiAoIShlbC5ocmVmICYmIGVsLmhyZWYuaW5kZXhPZihvcmlnaW4pID09PSAwKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVidWlsZCBwYXRoXHJcbiAgICB2YXIgcGF0aCA9IGVsLnBhdGhuYW1lICsgZWwuc2VhcmNoICsgKGVsLmhhc2ggfHwgJycpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBBcHBBY3Rpb25zLmxvYWRQYWdlKHBhdGgsICgpID0+IHtcclxuICAgICAgQXBwQWN0aW9ucy5uYXZpZ2F0ZVRvKHBhdGgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbk1peGluO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9BcHAvTmF2aWdhdGlvbk1peGluLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBBc2lkZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgIDxhc2lkZT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtY29sbGFwc2VcIiBpZD1cInNpZGViYXJcIj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic2lkZWJhci1tZW51XCIgaWQ9XCJuYXYtYWNjb3JkaW9uXCI+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1tYXAtbWFya2VyXCIgaHJlZj1cIi9tYXBcIj4gTWFwPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10YXNrc1wiIGhyZWY9XCIvdGFza3NcIj4gVGFza3M8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcIiBocmVmPVwiL3Byb2ZpbGVcIj4gUHJvZmlsZTwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY2FsZW5kYXJcIiBocmVmPVwiL2NhbGVuZGFyXCI+IENhbGVuZGFyPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jb21tZW50XCIgaHJlZj1cIi9DaGF0XCI+IENoYXQ8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRleHQtc2l6ZVwiIGhyZWY9XCIvcHJpdmFjeVwiPiBQcml2YWN5PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2FzaWRlPlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzaWRlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvYW50b25fZ29yc2hlbmluL0Rlc2t0b3AvREVWL3JlYWN0LXN0YXJ0ZXIta2l0L34vanNoaW50LWxvYWRlciFDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvc3JjL2NvbXBvbmVudHMvQXNpZGVQYW5lbC9Bc2lkZVBhbmVsLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnZhciBDb250ZW50UGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHsgY2xhc3NOYW1lLCB0aXRsZSwgYm9keSwgb3RoZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgcmV0dXJuIDxtYWluIGNsYXNzTmFtZT17J0NvbnRlbnRQYWdlICcgKyBjbGFzc05hbWV9XG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogYm9keX19IC8+O1xuICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGVudFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZS9Db250ZW50UGFnZS5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTmF2YmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXIgYmxhY2stYmdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlYmFyLXRvZ2dsZS1ib3hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhIGZhLWJhcnMgdG9vbHRpcHNcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cIlRvZ2dsZSBOYXZpZ2F0aW9uXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tbG9nbyBzdGFydC0tPlxuICAgICAgICA8YSBocmVmPVwiL1wiIGNsYXNzTmFtZT1cImxvZ29cIj48Yj5NT0JJTEUgUk9VVEU8L2I+PC9hPlxuICAgICAgICA8IS0tbG9nbyBlbmQtLT5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcC1tZW51XCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBwdWxsLXJpZ2h0IHRvcC1tZW51XCI+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwibG9nb3V0XCIgaHJlZj1cIi9wcml2YWN5XCI+TG9nb3V0PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZiYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vcmVxdWlyZSgnLi9Ob3RGb3VuZFBhZ2UubGVzcycpO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgTm90Rm91bmRQYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlBhZ2UgTm90IEZvdW5kPC9oMT5cbiAgICAgICAgPHA+U29ycnksIGJ1dCB0aGUgcGFnZSB5b3Ugd2VyZSB0cnlpbmcgdG8gdmlldyBkb2VzIG5vdCBleGlzdC48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RGb3VuZFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Ob3RGb3VuZFBhZ2UvTm90Rm91bmRQYWdlLmpzXG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG4vKmpzaGludCBpbmRlbnQ6IDIsIG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlLCBicm93c2VyOiB0cnVlKi9cbi8qZ2xvYmFsIFJlYWN0ICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIGNvcmRzID0gW1s1MS41MDgsIC0wLjExXSxbNTIuNTA4LCAtMC4xMV0sWzUzLjUwOCwgLTEuMTFdLFs0My41MDgsIC0xLjExXV07XG52YXIgcG9pbnQ7XG4ndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hcDoge31cbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcCA9IEwubWFwKCdtYXAnKS5zZXRWaWV3KFs1Mi41MDUsIC0wLjA5XSwgMTMpO1xuICAgIEwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xuICAgIH0pLmFkZFRvKG1hcCk7XG4gICAgTC5wb2x5bGluZShjb3Jkcyx7XG4gICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICB3ZWlnaHQ6IDNcbiAgICB9KS5hZGRUbyhtYXApO1xuICAgIGZ1bmN0aW9uIGNpcmNsZShwb2ludCl7XG4gICAgICBMLmNpcmNsZShwb2ludCwgNTAsIHtcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICBmaWxsQ29sb3I6ICcjZjAzJyxcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuNVxuICAgICAgfSkuYWRkVG8obWFwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9pbnRBZGQocG9pbnRzKXtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxwb2ludHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgcG9pbnQgPSBwb2ludHNbaV07XG4gICAgICAgIGNpcmNsZShwb2ludCk7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50QWRkKGNvcmRzKTtcbiAgICB0aGlzLnNldFN0YXRlKHttYXA6IG1hcH0pO1xuICAgIHdpbmRvdy5tYXAgPSB0aGlzO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgICA8ZGl2IGlkPVwibWFwXCIvPlxuICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICApO1xuICB9XG59KTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9PU01hcC9PU01hcC5qc1xuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuLyoqIEBqc3ggUmVhY3QuRE9NICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdyaWRkbGUgZnJvbSdncmlkZGxlLXJlYWN0JztcblxuJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBEYXRhOiB7fVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgRGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAwLFxuICAgICAgICBcIm5hbWVcIjogXCJNYXllciBMZW9uYXJkXCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkthcG93c2luXCIsXG4gICAgICAgIFwic3RhdGVcIjogXCJIYXdhaWlcIixcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiVW5pdGVkIEtpbmdkb21cIixcbiAgICAgICAgXCJjb21wYW55XCI6IFwiT3ZvbG9cIixcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiA3XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDEsXG4gICAgICAgIFwibmFtZVwiOiBcIktvY2ggQmVja2VyXCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkpvaG5zb25idXJnXCIsXG4gICAgICAgIFwic3RhdGVcIjogXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgIFwiY291bnRyeVwiOiBcIk1hZGFnYXNjYXJcIixcbiAgICAgICAgXCJjb21wYW55XCI6IFwiRXZlbnRhZ2VcIixcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiAyXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDIsXG4gICAgICAgIFwibmFtZVwiOiBcIkxvd2VyeSBIb3BraW5zXCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkJsYW5jb1wiLFxuICAgICAgICBcInN0YXRlXCI6IFwiQXJpem9uYVwiLFxuICAgICAgICBcImNvdW50cnlcIjogXCJVa3JhaW5lXCIsXG4gICAgICAgIFwiY29tcGFueVwiOiBcIkNvbXRleHRcIixcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiAzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDMsXG4gICAgICAgIFwibmFtZVwiOiBcIldhbHRlcnMgTWF5c1wiLFxuICAgICAgICBcImNpdHlcIjogXCJHbGVuZGFsZVwiLFxuICAgICAgICBcInN0YXRlXCI6IFwiSWxsaW5vaXNcIixcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiTmV3IFplYWxhbmRcIixcbiAgICAgICAgXCJjb21wYW55XCI6IFwiQ29ycG9yYW5hXCIsXG4gICAgICAgIFwiZmF2b3JpdGVOdW1iZXJcIjogNlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiA0LFxuICAgICAgICBcIm5hbWVcIjogXCJTaGF3IExvd2VcIixcbiAgICAgICAgXCJjaXR5XCI6IFwiQ291bHRlcnZpbGxsZVwiLFxuICAgICAgICBcInN0YXRlXCI6IFwiV3lvbWluZ1wiLFxuICAgICAgICBcImNvdW50cnlcIjogXCJFY3VhZG9yXCIsXG4gICAgICAgIFwiY29tcGFueVwiOiBcIklzb2xvZ2ljYVwiLFxuICAgICAgICBcImZhdm9yaXRlTnVtYmVyXCI6IDJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogNSxcbiAgICAgICAgXCJuYW1lXCI6IFwiU2hhdyBMb3dlXCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkNvdWx0ZXJ2aWxsbGVcIixcbiAgICAgICAgXCJzdGF0ZVwiOiBcIld5b21pbmdcIixcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiRWN1YWRvclwiLFxuICAgICAgICBcImNvbXBhbnlcIjogXCJJc29sb2dpY2FcIixcbiAgICAgICAgXCJmYXZvcml0ZU51bWJlclwiOiAyXG4gICAgICB9XG4gICAgXTtcbiAgICB0aGlzLnNldFN0YXRlKHtEYXRhOiBEYXRhfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICA8R3JpZGRsZSByZXN1bHRzPXt0aGlzLnN0YXRlLkRhdGF9IHRhYmxlQ2xhc3NOYW1lPVwidGFibGVcIiBjb2x1bW5zPXtbXCJpZFwiLFwibmFtZVwiLCBcImNpdHlcIiwgXCJzdGF0ZVwiLCBcImNvdW50cnlcIl19IC8+XG4gICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICk7XG4gIH1cbn0pO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9hbnRvbl9nb3JzaGVuaW4vRGVza3RvcC9ERVYvcmVhY3Qtc3RhcnRlci1raXQvfi9qc2hpbnQtbG9hZGVyIUM6L1VzZXJzL2FudG9uX2dvcnNoZW5pbi9EZXNrdG9wL0RFVi9yZWFjdC1zdGFydGVyLWtpdC9zcmMvY29tcG9uZW50cy9Sb3V0ZVRhYmxlL1JULmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxhbnRvbl9nb3JzaGVuaW5cXFxcRGVza3RvcFxcXFxERVZcXFxccmVhY3Qtc3RhcnRlci1raXRcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qXFxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZXZlbnRlbWl0dGVyM1wiXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmbHV4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmbHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnJvbnQtbWF0dGVyXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmcm9udC1tYXR0ZXJcIlxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmlkZGxlLXJlYWN0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJncmlkZGxlLXJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiamFkZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiamFkZVwiXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibG9kYXNoXCJcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicGF0aFwiXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVyYWdlbnRcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInN1cGVyYWdlbnRcIlxuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJzZXJ2ZXIuanMifQ==