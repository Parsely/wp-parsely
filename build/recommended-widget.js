/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/widgets/recommended/index.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/lib/cookies/index.js":
/*!*************************************!*\
  !*** ./src/js/lib/cookies/index.js ***!
  \*************************************/
/*! exports provided: getCookieValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookieValue", function() { return getCookieValue; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/lib/cookies/utils.js");
/**
 * Internal dependencies
 */

/**
 * Get the value of a particular cookie
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @param {string} key Which cookie value to get
 * @return {string | undefined} The value of the specified key, or `undefined` if it's not set.
 */

var getCookieValue = function getCookieValue(key) {
  var row = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["documentCookieWrapper"])().split('; ').find(function (r) {
    return r.startsWith("".concat(key, "="));
  });
  return row === null || row === void 0 ? void 0 : row.split('=')[1];
};

/***/ }),

/***/ "./src/js/lib/cookies/utils.js":
/*!*************************************!*\
  !*** ./src/js/lib/cookies/utils.js ***!
  \*************************************/
/*! exports provided: documentCookieWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentCookieWrapper", function() { return documentCookieWrapper; });
/**
 * Wrapper to allow us to mock document.cookie in automated testing
 *
 * @return {string} document.cookie
 */
function documentCookieWrapper() {
  var _document$cookie, _document;

  return (_document$cookie = (_document = document) === null || _document === void 0 ? void 0 : _document.cookie) !== null && _document$cookie !== void 0 ? _document$cookie : '';
}

/***/ }),

/***/ "./src/js/widgets/recommended/index.js":
/*!*********************************************!*\
  !*** ./src/js/widgets/recommended/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/cookies */ "./src/js/lib/cookies/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


var VISITOR_COOKIE_KEY_NAME = '_parsely_visitor';

function widgetLoad(_ref) {
  var displayAuthor = _ref.displayAuthor,
      displayDirection = _ref.displayDirection,
      apiUrl = _ref.apiUrl,
      imgSrc = _ref.imgSrc,
      permalink = _ref.permalink,
      personalized = _ref.personalized,
      jQuery = _ref.jQuery,
      widgetId = _ref.widgetId;
  var uuid = false;
  var cookieVal = Object(_lib_cookies__WEBPACK_IMPORTED_MODULE_2__["getCookieValue"])(VISITOR_COOKIE_KEY_NAME);

  if (cookieVal) {
    try {
      uuid = JSON.parse(unescape(cookieVal)).id;
    } catch (e) {}
  }

  var fullUrl = apiUrl;

  if (personalized && uuid) {
    fullUrl += "&uuid=".concat(uuid);
  } else {
    fullUrl += "&url=".concat(encodeURIComponent(permalink));
  }

  var parentDiv = jQuery.find("#".concat(widgetId));

  if (parentDiv.length === 0) {
    parentDiv = jQuery.find('.Parsely_Recommended_Widget');
  } // make sure page is not attempting to load widget twice in the same spot


  if (jQuery(parentDiv).find('div.parsely-recommendation-widget').length > 0) {
    return;
  }

  var outerDiv = jQuery('<div>').addClass('parsely-recommendation-widget').appendTo(parentDiv);

  if (imgSrc !== 'none') {
    outerDiv.addClass('display-thumbnail');
  }

  if (displayDirection) {
    outerDiv.addClass('list-' + displayDirection);
  }

  var outerList = jQuery('<ul>').addClass('parsely-recommended-widget').appendTo(outerDiv);
  jQuery.getJSON(fullUrl, function (data) {
    jQuery.each(data.data, function (key, value) {
      var widgetEntry = jQuery('<li>').addClass('parsely-recommended-widget-entry').attr('id', 'parsely-recommended-widget-item' + key);
      var textDiv = jQuery('<div>').addClass('parsely-text-wrapper');

      if (imgSrc === 'parsely_thumb') {
        jQuery('<img>').attr('src', value.thumb_url_medium).appendTo(widgetEntry);
      } else if (imgSrc === 'original') {
        jQuery('<img>').attr('src', value.image_url).appendTo(widgetEntry);
      }

      var itmId = "?itm_campaign=".concat(widgetId);
      var itmMedium = '&itmMedium=site_widget';
      var itmSource = '&itmSource=parsely_recommended_widget';
      var itmContent = '&itm_content=widget_item-' + key;
      var itmLink = value.url + itmId + itmMedium + itmSource + itmContent;
      var postTitle = jQuery('<div>').attr('class', 'parsely-recommended-widget-title');
      var postLink = jQuery('<a>').attr('href', itmLink).text(value.title);
      postTitle.append(postLink);
      textDiv.append(postTitle);

      if (displayAuthor) {
        var authorLink = jQuery('<div>').attr('class', 'parsely-recommended-widget-author').text(value.author);
        textDiv.append(authorLink);
      }

      widgetEntry.append(textDiv); // set up the rest of entry

      outerList.append(widgetEntry);
    });
    outerDiv.append(outerList);
  });
}

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  var _global = global,
      jQuery = _global.jQuery,
      wpParselyRecommended = _global.wpParselyRecommended;
  widgetLoad(_objectSpread(_objectSpread({}, wpParselyRecommended), {}, {
    jQuery: jQuery
  }));
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["domReady"]; }());

/***/ })

/******/ });
//# sourceMappingURL=recommended-widget.js.map