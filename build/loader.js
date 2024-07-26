/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-helper/common/utils/constants.ts":
/*!******************************************************!*\
  !*** ./src/content-helper/common/utils/constants.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DASHBOARD_BASE_URL: function() { return /* binding */ DASHBOARD_BASE_URL; },
/* harmony export */   Metric: function() { return /* binding */ Metric; },
/* harmony export */   PUBLIC_API_BASE_URL: function() { return /* binding */ PUBLIC_API_BASE_URL; },
/* harmony export */   Period: function() { return /* binding */ Period; },
/* harmony export */   PostFilterType: function() { return /* binding */ PostFilterType; },
/* harmony export */   getMetricDescription: function() { return /* binding */ getMetricDescription; },
/* harmony export */   getPeriodDescription: function() { return /* binding */ getPeriodDescription; },
/* harmony export */   isInEnum: function() { return /* binding */ isInEnum; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

var DASHBOARD_BASE_URL = 'https://dash.parsely.com';
var PUBLIC_API_BASE_URL = 'https://api.parsely.com/v2';
/**
 * Periods that are available in the Content Helper.
 *
 * @since 3.10.0
 * @since 3.11.0 Moved to constants.ts.
 */
var Period;
(function (Period) {
  Period["Minutes10"] = "10m";
  Period["Hour"] = "1h";
  Period["Hours2"] = "2h";
  Period["Hours4"] = "4h";
  Period["Hours24"] = "24h";
  Period["Days7"] = "7d";
  Period["Days30"] = "30d";
})(Period || (Period = {}));
/**
 * Metrics that are available in the Content Helper.
 *
 * @since 3.10.0
 * @since 3.11.0 Moved to constants.ts.
 */
var Metric;
(function (Metric) {
  Metric["Views"] = "views";
  Metric["AvgEngaged"] = "avg_engaged";
})(Metric || (Metric = {}));
/**
 * Post filter types that are available in the Content Helper.
 *
 * @since 3.11.0
 */
var PostFilterType;
(function (PostFilterType) {
  PostFilterType["Author"] = "author";
  PostFilterType["Section"] = "section";
  PostFilterType["Tag"] = "tag";
  PostFilterType["Unavailable"] = "unavailable";
})(PostFilterType || (PostFilterType = {}));
/**
 * Returns whether the passed value is present in the given enum.
 *
 * @since 3.11.0
 *
 * @param {string|number} value      The value to check for.
 * @param {Object}        enumObject The enum to check against.
 */
var isInEnum = function (value, enumObject) {
  return Object.values(enumObject).includes(value);
};
/**
 * Returns a text description representing the passed period.
 *
 * @since 3.11.0
 *
 * @param {Period}  period    The period for which to create the description.
 * @param {boolean} lowercase Whether to return the description in lowercase.
 *
 * @return {string} The period description.
 */
function getPeriodDescription(period, lowercase) {
  if (lowercase === void 0) {
    lowercase = false;
  }
  var timeValue = parseInt(period, 10);
  var timeUnit = period.charAt(period.length - 1);
  var description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Unknown Period', 'wp-parsely');
  /* eslint-disable @wordpress/valid-sprintf */
  switch (timeUnit) {
    case 'm':
      if (1 === timeValue) {
        description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Last Minute', 'wp-parsely');
        break;
      }
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of minutes */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last %1$d Minute', 'Last %1$d Minutes', timeValue, 'wp-parsely'), timeValue);
      break;
    case 'h':
      if (1 === timeValue) {
        description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Last Hour', 'wp-parsely');
        break;
      }
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of hours */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last %1$d Hour', 'Last %1$d Hours', timeValue, 'wp-parsely'), timeValue);
      break;
    case 'd':
      if (1 === timeValue) {
        description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Last Day', 'wp-parsely');
        break;
      }
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of days */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last %1$d Day', 'Last %1$d Days', timeValue, 'wp-parsely'), timeValue);
      break;
  }
  /* eslint-enable @wordpress/valid-sprintf */
  if (lowercase) {
    return description.toLocaleLowerCase();
  }
  return description;
}
/**
 * Returns a text description representing the passed metric.
 *
 * @since 3.11.0
 *
 * @param {Metric} metric The metric for which to create the description.
 *
 * @return {string} The metric description.
 */
function getMetricDescription(metric) {
  switch (metric) {
    case Metric.Views:
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page Views', 'wp-parsely');
    case Metric.AvgEngaged:
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avg. Time', 'wp-parsely');
    default:
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Unknown Metric', 'wp-parsely');
  }
}

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/lib/loader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wpParselyInitCustom: function() { return /* binding */ wpParselyInitCustom; }
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);

window.wpParselyHooks = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.createHooks)();
function wpParselyInitCustom() {
  /**
   * The `wpParselyOnLoad` hook gets called with the `onload` event of the `window.PARSELY` object.
   * All functions enqueued on that hook will be executed on that event according to their priorities. Those
   * functions should not expect any parameters and shouldn't return any.
   */
  var customOnLoad = function () {
    var _a;
    return (_a = window.wpParselyHooks) === null || _a === void 0 ? void 0 : _a.doAction('wpParselyOnLoad');
  };
  /**
   * The `wpParselyOnReady` hook gets called with the `onReady` event of the `window.PARSELY` object.
   * All functions enqueued on that hook will be executed on that event according to their priorities. Those
   * functions should not expect any parameters and shouldn't return any.
   */
  var customOnReady = function () {
    var _a;
    return (_a = window.wpParselyHooks) === null || _a === void 0 ? void 0 : _a.doAction('wpParselyOnReady');
  };
  // Construct window.PARSELY object.
  if (typeof window.PARSELY === 'object') {
    if (typeof window.PARSELY.onload !== 'function') {
      window.PARSELY.onload = customOnLoad;
    } else {
      var oldOnLoad_1 = window.PARSELY.onload;
      window.PARSELY.onload = function () {
        if (oldOnLoad_1) {
          oldOnLoad_1();
        }
        customOnLoad();
      };
    }
    if (typeof window.PARSELY.onReady !== 'function') {
      window.PARSELY.onReady = customOnReady;
    } else {
      var oldOnReady_1 = window.PARSELY.onReady;
      window.PARSELY.onReady = function () {
        if (oldOnReady_1) {
          oldOnReady_1();
        }
        customOnReady();
      };
    }
  } else {
    window.PARSELY = {
      onload: customOnLoad,
      onReady: customOnReady
    };
  }
  // Disable autotrack if it was set as such in settings.
  if (window.wpParselyDisableAutotrack === true) {
    window.PARSELY.autotrack = false;
  }
}
wpParselyInitCustom();
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*****************************************!*\
  !*** ./src/js/lib/uuid-profile-call.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content_helper_common_utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../content-helper/common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var _a;

// Only enqueuing the action if the site has a defined Site ID.
if (typeof window.wpParselySiteId !== 'undefined') {
  (_a = window.wpParselyHooks) === null || _a === void 0 ? void 0 : _a.addAction('wpParselyOnLoad', 'wpParsely', uuidProfileCall);
}
function uuidProfileCall() {
  return __awaiter(this, void 0, void 0, function () {
    var uuid, url;
    var _a, _b;
    return __generator(this, function (_c) {
      uuid = (_b = (_a = window.PARSELY) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.parsely_site_uuid;
      if (!(window.wpParselySiteId && uuid)) {
        return [2 /*return*/];
      }
      url = "".concat(_content_helper_common_utils_constants__WEBPACK_IMPORTED_MODULE_0__.PUBLIC_API_BASE_URL, "/profile?apikey=").concat(encodeURIComponent(window.wpParselySiteId), "&uuid=").concat(encodeURIComponent(uuid), "&url=").concat(encodeURIComponent(window.location.href));
      return [2 /*return*/, fetch(url)];
    });
  });
}
}();
/******/ })()
;
//# sourceMappingURL=loader.js.map