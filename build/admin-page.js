(window["webpackJsonp_"] = window["webpackJsonp_"] || []).push([["style-admin-page"],{

/***/ "./src/js/lib/admin-page/style.scss":
/*!******************************************!*\
  !*** ./src/js/lib/admin-page/style.scss ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"admin-page": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp_"] = window["webpackJsonp_"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/lib/admin-page/index.js","style-admin-page"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./src/js/lib/admin-page/components/App.js":
/*!*************************************************!*\
  !*** ./src/js/lib/admin-page/components/App.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _settings_api_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../settings-api-client */ "./src/js/lib/settings-api-client.js");
/* harmony import */ var _Setting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Setting */ "./src/js/lib/admin-page/components/Setting.js");
/* harmony import */ var _SiteDetails__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SiteDetails */ "./src/js/lib/admin-page/components/SiteDetails.js");
/* harmony import */ var _WipeMetadataCache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./WipeMetadataCache */ "./src/js/lib/admin-page/components/WipeMetadataCache.js");
/* harmony import */ var _WipeMetadataModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./WipeMetadataModal */ "./src/js/lib/admin-page/components/WipeMetadataModal.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */







var App = function App() {
  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      settings = _useState2[0],
      setSettings = _useState2[1];

  var _useState3 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])('general'),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      currentTab = _useState4[0],
      setCurrentTab = _useState4[1];

  var _useState5 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState5, 2),
      loaded = _useState6[0],
      setLoaded = _useState6[1];

  var _useState7 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState7, 2),
      notice = _useState8[0],
      setNotice = _useState8[1];

  var _useState9 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState9, 2),
      updatingSettings = _useState10[0],
      setUpdatingSettings = _useState10[1];

  var _useState11 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState11, 2),
      displayModal = _useState12[0],
      setDisplayModal = _useState12[1];

  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    Object(_settings_api_client__WEBPACK_IMPORTED_MODULE_6__["fetchSettings"])().then(function (settingsFromServer) {
      setSettings(settingsFromServer);
      setLoaded(true);
    }, function (errorFromServer) {
      console.error(errorFromServer);
      setNotice({
        content: 'Could not read settings from the site.',
        isDismissible: false,
        status: 'error'
      });
    });
  }, []);

  var removeNotice = function removeNotice() {
    return setNotice(false);
  };

  var handleInputChange = function handleInputChange(_ref) {
    var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    removeNotice();
    setSettings(_objectSpread(_objectSpread({}, settings), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, name, value)));
  };

  var displayDiv = function displayDiv(divClass, currentState) {
    return divClass === currentState ? '' : 'inactive';
  };

  var showModal = function showModal(val) {
    setDisplayModal(val);
  };

  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee(e) {
      var settingsFromServer;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              setUpdatingSettings(true);
              removeNotice();
              _context.prev = 3;
              _context.next = 6;
              return Object(_settings_api_client__WEBPACK_IMPORTED_MODULE_6__["saveSettingsToServer"])(settings);

            case 6:
              settingsFromServer = _context.sent;
              setSettings(settingsFromServer);
              setNotice({
                content: 'Settings Successfully Updated!'
              });
              setCurrentTab('general');
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              setNotice({
                content: 'Something went wrong! Please review your settings and try again.',
                status: 'error'
              });
              console.error(_context.t0);

            case 16:
              setUpdatingSettings(false);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 12]]);
    }));

    return function handleFormSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var setMetadataFlag = function setMetadataFlag(val) {
    return setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      parsely_wipe_metadata_cache: val
    }));
  };

  var _setCurrentTab = function _setCurrentTab(tab) {
    removeNotice();
    setCurrentTab(tab);
  };

  var nav = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("nav", {
    className: "controls"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "nav-control",
    onClick: function onClick() {
      return _setCurrentTab('general');
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("span", {
    className: "".concat(currentTab === 'general' ? 'active' : '')
  }, "General")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "nav-control",
    onClick: function onClick() {
      return _setCurrentTab('advanced');
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("span", {
    className: "".concat(currentTab === 'advanced' ? 'active' : '')
  }, "Advanced")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "nav-control",
    onClick: function onClick() {
      return _setCurrentTab('debug');
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("span", {
    className: "".concat(currentTab === 'debug' ? 'active' : '')
  }, "Debug")));
  var form = settings && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("form", {
    className: "settings-form",
    onSubmit: function onSubmit(e) {
      return handleFormSubmit(e);
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "settings-holder"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "tab-body general ".concat(displayDiv('general', currentTab))
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    disabled: updatingSettings,
    name: "apikey",
    value: settings.apikey,
    label: "Site ID",
    onChange: handleInputChange,
    note: "Your SiteID is your own site domain"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "apiSecret",
    value: 'no secret given',
    label: "API Secret",
    onChange: handleInputChange,
    note: "Your API Secret is your secret code to access our API"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "logo",
    value: settings.logo,
    label: "Logo",
    onChange: handleInputChange,
    note: "You can pass a URL to set your site's logo"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "track_post_types",
    value: settings.track_post_types,
    label: "Track Post Types",
    onChange: handleInputChange,
    note: "...."
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "track_page_types",
    value: settings.track_page_types,
    label: "Track Page Types",
    onChange: handleInputChange,
    note: "...."
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "tab-body advanced ".concat(displayDiv('advanced', currentTab))
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "meta_type",
    value: settings.meta_type,
    label: "Metadata Type",
    onChange: handleInputChange,
    note: "Choose the metadata format for us to track"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "custom_taxonomy_section",
    value: settings.custom_taxonomy_section,
    label: "Custom Taxonomy Section",
    onChange: handleInputChange,
    note: "Default: Category. Choose the default taxonomy to map to Parse.ly sections"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "content_id_prefix",
    value: settings.content_id_prefix,
    label: "Content ID Prefix",
    onChange: handleInputChange,
    note: "Choose a custom prefix for your content"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "disable_javascript",
    value: settings.disable_javascript,
    label: "Disable Javascript",
    onChange: handleInputChange,
    note: "Default: Off. Disable our javascript tracking if you use a separate system for JS tracking"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "disable_amp",
    value: settings.disable_amp,
    label: "Disable AMP",
    onChange: handleInputChange,
    note: "Default: On. Disable our AMP tracking if you use a separate system to track AMP content"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "use_top_level_cats",
    value: settings.use_top_level_cats,
    label: "Use Top-Level Categories",
    onChange: handleInputChange,
    note: "Default: On. Choose if you want the first top-level category to be mapped to Parse.ly"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "cats_as_tags",
    value: settings.cats_as_tags,
    label: "Categories as Tags",
    onChange: handleInputChange,
    note: "Default: On. Choose if you want your non-primary categories to appear as tags"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "track_authenticated_users",
    value: settings.track_authenticated_users,
    label: "Track Authenticated Users",
    onChange: handleInputChange,
    note: "Default: On."
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "lowercase_tags",
    value: settings.lowercase_tags,
    label: "Lowercase Tags",
    onChange: handleInputChange,
    note: "Default: On. Choose if you want your tags to be converted to lower case"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "force_https_canonicals",
    value: settings.force_https_canonicals,
    label: "Force HTTPS Canonical URLs",
    onChange: handleInputChange,
    note: "Default: Off. Choose if you want your canonicals to use the HTTPS scheme"
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "tab-body debug ".concat(displayDiv('debug', currentTab))
  }, displayModal ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_WipeMetadataModal__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onConfirm: setMetadataFlag,
    apikey: settings.apikey,
    modalControl: showModal,
    setting: {
      parsely_wipe_metadata_cache: settings.parsely_wipe_metadata_cache
    }
  }) : '', Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "metadata_secret",
    value: settings.metadata_secret,
    label: "Metadata Secret",
    onChange: handleInputChange,
    note: "The metadata secret provided to you by Parse.ly"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_WipeMetadataCache__WEBPACK_IMPORTED_MODULE_9__["default"], {
    setting: {
      parsely_wipe_metadata_cache: settings.parsely_wipe_metadata_cache
    },
    label: "Wipe Metadata Cache",
    onClick: showModal,
    note: "This will wipe all of your site's metadata and resend all metadata to Parse.ly"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_SiteDetails__WEBPACK_IMPORTED_MODULE_8__["default"], {
    apikey: settings.apikey,
    postsToTrack: settings.track_post_types,
    pagesToTrack: settings.track_page_types,
    pluginVersion: "2.5",
    phpVersion: "7.4.1"
  }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("input", {
    disabled: updatingSettings,
    type: "submit",
    className: "button-primary",
    value: "do the thing!"
  }));
  var isError = (notice === null || notice === void 0 ? void 0 : notice.status) === 'error';
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {
    className: "settings-container"
  }, loaded && notice && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["SnackbarList"], {
    onRemove: removeNotice,
    notices: [{
      content: notice.content,
      className: isError && 'settings-error'
    }]
  }), !loaded && isError && !notice.isDismissible && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["Notice"], {
    status: "error",
    isDismissible: false
  }, notice.content), !loaded && !isError && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["createElement"])("h2", null, "Loading..."), loaded && nav, loaded && form);
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/js/lib/admin-page/components/Setting.js":
/*!*****************************************************!*\
  !*** ./src/js/lib/admin-page/components/Setting.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/js/lib/admin-page/constants.js");


/**
 * External dependencies
 */

/**
 * Internal dependencies
 */



var Setting = function Setting(_ref) {
  var name = _ref.name,
      note = _ref.note,
      value = _ref.value,
      onChange = _ref.onChange,
      label = _ref.label;

  var _onChange = function _onChange(newValue) {
    return onChange([name, newValue]);
  };

  var input;

  if (_constants__WEBPACK_IMPORTED_MODULE_2__["PSEUDO_BOOLEAN_SETTINGS"].includes(name)) {
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["ToggleControl"], {
      name: name,
      label: label,
      onChange: _onChange,
      checked: value
    });
  } else if (['track_post_types', 'track_page_types'].includes(name)) {
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["SelectControl"], {
      multiple: true,
      label: label,
      options: [{
        value: value,
        label: value
      }] // TODO: Load eligible post types from the back end...somehow.
      ,
      value: value,
      name: name,
      onChange: _onChange
    });
  } else {
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["TextControl"], {
      className: "text-input",
      label: label,
      name: name,
      value: value,
      onChange: _onChange
    });
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "setting-item--container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "setting-item"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "setting-item--control"
  }, input, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
    className: "subtext"
  }, note))));
};

/* harmony default export */ __webpack_exports__["default"] = (Setting);

/***/ }),

/***/ "./src/js/lib/admin-page/components/SiteDetails.js":
/*!*********************************************************!*\
  !*** ./src/js/lib/admin-page/components/SiteDetails.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);




var SiteDetails = function SiteDetails(_ref) {
  var apikey = _ref.apikey,
      postsToTrack = _ref.postsToTrack,
      pagesToTrack = _ref.pagesToTrack,
      phpVersion = _ref.phpVersion,
      pluginVersion = _ref.pluginVersion;

  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isCopied = _useState2[0],
      setIsCopied = _useState2[1];

  var copyToClipboard = function copyToClipboard() {
    var el = document.createElement('textarea');
    el.value = "Site ID: ".concat(apikey, ", PHP Version: ").concat(phpVersion, ", Post Types to track: ").concat(postsToTrack, ", Pages to Track: ").concat(pagesToTrack, ", Plugin Version: ").concat(pluginVersion);
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsCopied(true);
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "site-details-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "site-detail"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "details-label"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Site Details")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "details-info"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "details-info-item"
  }, "Parsely Site ID: ", apikey), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "details-info-item"
  }, "PHP Version: ", phpVersion), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "details-info-item"
  }, "Post Types to Track: ", postsToTrack), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "details-info-item"
  }, "Page Types to Track: ", pagesToTrack), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "details-info-item"
  }, "Plugin Version: ", pluginVersion), isCopied ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, "Copied!") : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", {
    onClick: function onClick() {
      return copyToClipboard();
    },
    className: "copy-cta"
  }, "Copy to Clipboard"))));
};

/* harmony default export */ __webpack_exports__["default"] = (SiteDetails);

/***/ }),

/***/ "./src/js/lib/admin-page/components/WipeMetadataCache.js":
/*!***************************************************************!*\
  !*** ./src/js/lib/admin-page/components/WipeMetadataCache.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


var WipeMetadataCache = function WipeMetadataCache(_ref) {
  var setting = _ref.setting,
      label = _ref.label,
      note = _ref.note,
      _onClick = _ref.onClick;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "wipe-metadata-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
    className: "wipe-metadata-label"
  }, label), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "wipe-metadata-controls"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    type: "button",
    className: "wipe-metadata-button",
    onClick: function onClick() {
      return _onClick(true);
    }
  }, "Wipe your metadata?"), note, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "wipe-metadata-warning"
  }, setting.parsely_wipe_metadata_cache ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, "DANGER: METADATA WILL BE WIPED UPON FORM SUBMISSION") : ''))));
};

/* harmony default export */ __webpack_exports__["default"] = (WipeMetadataCache);

/***/ }),

/***/ "./src/js/lib/admin-page/components/WipeMetadataModal.js":
/*!***************************************************************!*\
  !*** ./src/js/lib/admin-page/components/WipeMetadataModal.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);





var WipeMetadataModal = function WipeMetadataModal(_ref) {
  var setting = _ref.setting,
      apikey = _ref.apikey,
      onConfirm = _ref.onConfirm,
      modalControl = _ref.modalControl;

  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  var _useState3 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(setting.parsely_wipe_metadata_cache),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      flagSet = _useState4[0],
      setFlagSet = _useState4[1];

  var setFlag = function setFlag(val) {
    if (!val) {
      setMessage('');
      setFlagSet(false);
      onConfirm(val);
    }

    if (val && message === apikey) {
      onConfirm(val);
    }

    modalControl(false);
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "modal-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    onClick: function onClick() {
      return setFlag(false);
    },
    className: "modal-background"
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "modal"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("strong", null, "Type ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
    className: "code"
  }, apikey), " below and then click Confirm if you really want to delete all stored metadata. This action cannot be undone"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["TextControl"], {
    className: "text-input",
    label: "Wipe Metadata Cache",
    onChange: setMessage
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("button", {
    className: "button-secondary",
    type: "button",
    onClick: function onClick() {
      return setFlag(false);
    }
  }, "Cancel"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("button", {
    type: "button",
    className: "button-primary ".concat(message !== apikey ? 'disabled' : ''),
    onClick: function onClick() {
      return setFlag(true);
    }
  }, "Confirm"), flagSet ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("button", {
    className: "button-secondary",
    onClick: function onClick() {
      return setFlag(false);
    }
  }, "Undo") : ''));
};

/* harmony default export */ __webpack_exports__["default"] = (WipeMetadataModal);

/***/ }),

/***/ "./src/js/lib/admin-page/constants.js":
/*!********************************************!*\
  !*** ./src/js/lib/admin-page/constants.js ***!
  \********************************************/
/*! exports provided: PSEUDO_BOOLEAN_SETTINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PSEUDO_BOOLEAN_SETTINGS", function() { return PSEUDO_BOOLEAN_SETTINGS; });
var PSEUDO_BOOLEAN_SETTINGS = ['disable_javascript', 'disable_amp', 'use_top_level_cats', 'cats_as_tags', 'track_authenticated_users', 'lowercase_tags', 'force_https_canonicals'];

/***/ }),

/***/ "./src/js/lib/admin-page/index.js":
/*!****************************************!*\
  !*** ./src/js/lib/admin-page/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App */ "./src/js/lib/admin-page/components/App.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/js/lib/admin-page/style.scss");





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  wp.element.render(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], null), document.getElementById('wp-parsely-react-entrypoint'));
  var keyEl = document.querySelector('#apikey');
  var requiresRecrawlNotice = document.querySelectorAll('.parsely-form-controls[data-requires-recrawl="true"] .help-text');

  if (!(keyEl && requiresRecrawlNotice.length)) {
    return;
  }

  var notice = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["sprintf"])(
  /* translators: %s: The API Key that will be used to request a recrawl */
  Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('<strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a>'), keyEl.value, 'wp-parsely');
  [].forEach.call(requiresRecrawlNotice, function (node) {
    var descWrapper = document.createElement('p');
    descWrapper.className = 'description';
    descWrapper.innerHTML = notice;
    node.appendChild(descWrapper);
  });
});

/***/ }),

/***/ "./src/js/lib/settings-api-client.js":
/*!*******************************************!*\
  !*** ./src/js/lib/settings-api-client.js ***!
  \*******************************************/
/*! exports provided: fetchSettings, saveSettingsToServer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSettings", function() { return fetchSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSettingsToServer", function() { return saveSettingsToServer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _admin_page_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-page/constants */ "./src/js/lib/admin-page/constants.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


var SETTINGS_PATH = '/wp-parsely/v1/settings';
var fetchSettings = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
              path: SETTINGS_PATH
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchSettings() {
    return _ref.apply(this, arguments);
  };
}();
var saveSettingsToServer = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(settings) {
    var formattedSettings;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // The validation for these settings requires them to be sent as strings: "true" or "false"
            formattedSettings = _admin_page_constants__WEBPACK_IMPORTED_MODULE_4__["PSEUDO_BOOLEAN_SETTINGS"].reduce(function (accumulator, value) {
              return _objectSpread(_objectSpread({}, accumulator), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, value, settings[value] ? 'true' : 'false'));
            }, {});
            return _context2.abrupt("return", _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
              path: SETTINGS_PATH,
              method: 'POST',
              data: {
                settings: _objectSpread(_objectSpread({}, settings), formattedSettings)
              }
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function saveSettingsToServer(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*************************************!*\
  !*** external "regeneratorRuntime" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["regeneratorRuntime"]; }());

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["domReady"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=admin-page.js.map