/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/telemetry/block-change.tsx":
/*!*******************************************!*\
  !*** ./src/js/telemetry/block-change.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./telemetry */ "./src/js/telemetry/telemetry.ts");



/**
 * BlockChangeMonitor component.
 *
 * This is a React component that monitors changes in the WordPress block editor.
 * It does not render anything, but it uses the useEffect hook to subscribe to changes in the block editor when the component is mounted.
 * When the block editor changes, it checks if blocks have been added or removed by comparing the current list of blocks with the previous one.
 * If a block has been added or removed, it logs a message to the console.
 * When the component is unmounted, it unsubscribes from the block editor changes.
 *
 * @since 3.12.0
 */
var BlockChangeMonitor = function () {
  /**
   * The prefix of the block's name.
   * @type {string}
   */
  var parselyBlockPrefix = 'wp-parsely/';
  /**
   * The useEffect hook is used to subscribe to changes in the block editor when the component is mounted.
   * It first gets the current list of blocks and creates a Set of the block IDs.
   * Then, it subscribes to changes in the block editor.
   * When the block editor changes, it gets the new list of blocks and creates a new Set of the block IDs.
   * It checks if the size of the new block IDs Set is different from the last one, indicating that a block has been added or removed.
   * If a block has been added or removed, it logs a message to the console.
   * Finally, it updates the last block IDs with the new block IDs for the next comparison.
   * When the component is unmounted, it unsubscribes from the block editor changes.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var getBlockList = function () {
      return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
    };
    var lastBlockIds = new Set(getBlockList().map(function (block) {
      return block.clientId;
    }));
    var unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(function () {
      var newBlockList = getBlockList();
      var newBlockIds = new Set(newBlockList.map(function (block) {
        return block.clientId;
      }));
      if (newBlockIds.size !== lastBlockIds.size) {
        var blocksAdded = newBlockIds.size > lastBlockIds.size;
        var changedBlockList = blocksAdded ? newBlockList : Array.from(lastBlockIds);
        for (var _i = 0, changedBlockList_1 = changedBlockList; _i < changedBlockList_1.length; _i++) {
          var block = changedBlockList_1[_i];
          if (blocksAdded) {
            // block is a BlockInstance when blocks are added
            var blockInstance = block;
            if (blockInstance.name.startsWith(parselyBlockPrefix) && !lastBlockIds.has(blockInstance.clientId)) {
              _telemetry__WEBPACK_IMPORTED_MODULE_2__["default"].trackEvent('block_added', {
                block: blockInstance.name
              });
            }
          } else {
            // block is a string (client ID) when blocks are removed
            var clientId = block;
            if (!newBlockIds.has(clientId)) {
              _telemetry__WEBPACK_IMPORTED_MODULE_2__["default"].trackEvent('block_removed', {
                block: clientId
              });
            }
          }
        }
      }
      lastBlockIds = newBlockIds;
    });
    return function () {
      unsubscribe();
    };
  }, []);
  return null; // This component does not render anything
};

/* harmony default export */ __webpack_exports__["default"] = (BlockChangeMonitor);

/***/ }),

/***/ "./src/js/telemetry/telemetry.ts":
/*!***************************************!*\
  !*** ./src/js/telemetry/telemetry.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_change__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block-change */ "./src/js/telemetry/block-change.tsx");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
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



/**
 * Telemetry class.
 * @class
 * @since 3.12.0
 */
var Telemetry = /** @class */function () {
  /**
   * Private constructor to prevent direct object creation.
   * This is necessary because this class is a singleton.
   * @since 3.12.0
   */
  function Telemetry() {
    /**
     * The queue of events to be tracked.
     * @private
     */
    this._tkq = [];
    /**
     * Whether the tracking library has been loaded.
     * @protected
     */
    this.isLoaded = false;
    this.loadTrackingLibrary();
  }
  /**
   * Returns the singleton instance of the Telemetry class.
   * If the instance does not exist, it is created.
   * @return {Telemetry} The singleton instance of the Telemetry class.
   * @since 3.12.0
   */
  Telemetry.getInstance = function () {
    if (!window.wpParselyTelemetryInstance) {
      Object.defineProperty(window, 'wpParselyTelemetryInstance', {
        value: new Telemetry(),
        writable: false,
        configurable: false,
        enumerable: false // This makes it not show up in console enumerations
      });
    }

    return window.wpParselyTelemetryInstance;
  };
  /**
   * Loads the tracking library.
   * @return {void}
   * @since 3.12.0
   */
  Telemetry.prototype.loadTrackingLibrary = function () {
    var _this = this;
    var script = document.createElement('script');
    script.async = true;
    script.src = '//stats.wp.com/w.js';
    script.onload = function () {
      _this.isLoaded = true;
      _this._tkq = window._tkq || [];
    };
    document.head.appendChild(script);
  };
  Telemetry.prototype.setupEvents = function () {
    var EventsComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_block_change__WEBPACK_IMPORTED_MODULE_1__["default"]));
    (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)('wp-parsely-tracks-js-events', {
      render: function () {
        return EventsComponent;
      }
    });
  };
  /**
   * Tracks an event.
   * This method is static, so it can be called directly from the class.
   * It first ensures that the telemetry library is loaded by calling `waitUntilLoaded`.
   * Then, it calls the `trackEvent` method on the singleton instance of the Telemetry class.
   *
   * @param {string}     eventName  The name of the event to track.
   * @param {EventProps} properties The properties of the event to track.
   * @return {Promise<void>}        A Promise that resolves when the event has been tracked.
   * @since 3.12.0
   */
  Telemetry.trackEvent = function (eventName, properties) {
    if (properties === void 0) {
      properties = {};
    }
    return __awaiter(this, void 0, void 0, function () {
      var telemetry;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            telemetry = Telemetry.getInstance();
            return [4 /*yield*/, Telemetry.waitUntilLoaded()];
          case 1:
            _a.sent();
            telemetry.trackEvent(eventName, properties);
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Waits until the telemetry library is loaded.
   * This method is static, so it can be called directly from the class.
   * It checks every 100ms if the telemetry library is loaded, and resolves when it is.
   * If the library is not loaded after 10 seconds, it rejects.
   *
   * @return {Promise<void>} A Promise that resolves when the telemetry library is loaded.
   * @since 3.12.0
   */
  Telemetry.waitUntilLoaded = function () {
    return new Promise(function (resolve, reject) {
      var telemetry = Telemetry.getInstance();
      if (telemetry.isLoaded) {
        resolve();
        return;
      }
      var timeout = 0;
      var interval = setInterval(function () {
        if (telemetry.isLoaded) {
          clearInterval(interval);
          resolve();
        }
        timeout += 100;
        if (timeout >= 10000) {
          clearInterval(interval);
          reject('Telemetry library not loaded');
        }
      }, 100);
    });
  };
  /**
   * Tracks an event.
   * This method is called by the static `trackEvent` method.
   * It first checks if the telemetry library is loaded.
   * Then, it validates the event name and the event properties.
   * Finally, it pushes the event to the `_tkq` array.
   *
   * @param {string}     eventName  The name of the event to track.
   * @param {EventProps} properties The properties of the event to track.
   * @since 3.12.0
   */
  Telemetry.prototype.trackEvent = function (eventName, properties) {
    var _a;
    if (!this.isLoaded) {
      // eslint-disable-next-line no-console
      console.error('Error tracking event: Telemetry not loaded');
      return;
    }
    // Validate if the event name has the correct prefix, if not, append it
    if (eventName.indexOf(Telemetry.TRACKS_PREFIX) !== 0) {
      eventName = Telemetry.TRACKS_PREFIX + eventName;
    }
    // Validate the event name.
    if (!this.isEventNameValid(eventName)) {
      // eslint-disable-next-line no-console
      console.error('Error tracking event: Invalid event name');
      return;
    }
    properties = this.prepareProperties(properties);
    // Push the event to the queue
    (_a = this._tkq) === null || _a === void 0 ? void 0 : _a.push(['recordEvent', eventName, properties]);
  };
  /**
   * Checks if a property is valid.
   * A property is valid if it matches the PROPERTY_REGEX.
   *
   * @param {string} property The property to check.
   * @return {boolean} `true` if the property is valid, `false` otherwise.
   * @since 3.12.0
   */
  Telemetry.prototype.isProprietyValid = function (property) {
    return Telemetry.PROPERTY_REGEX.test(property);
  };
  /**
   * Checks if an event name is valid.
   * An event name is valid if it matches the EVENT_NAME_REGEX.
   *
   * @param {string} eventName The event name to check.
   * @return {boolean} `true` if the event name is valid, `false` otherwise.
   * @since 3.12.0
   */
  Telemetry.prototype.isEventNameValid = function (eventName) {
    return Telemetry.EVENT_NAME_REGEX.test(eventName);
  };
  /**
   * Prepares the properties of an event.
   * This method sanitizes the properties, sets the `parsely_version` property,
   * and sets user-specific properties if they exist.
   *
   * @param {EventProps} properties The properties to prepare.
   * @return {EventProps} The prepared properties.
   * @since 3.12.0
   */
  Telemetry.prototype.prepareProperties = function (properties) {
    properties = this.sanitizeProperties(properties);
    properties.parsely_version = window.wpParselyTracksTelemetry.version;
    // Set user-specific properties
    if (window.wpParselyTracksTelemetry.user) {
      properties._ut = window.wpParselyTracksTelemetry.user.type;
      properties._ui = window.wpParselyTracksTelemetry.user.id;
    }
    return this.sanitizeProperties(properties);
  };
  /**
   * Sanitizes the properties of an event.
   * This method creates a new object and copies over all valid properties from the original properties.
   *
   * @param {EventProps} properties The properties to sanitize.
   * @return {EventProps} The sanitized properties.
   * @since 3.12.0
   */
  Telemetry.prototype.sanitizeProperties = function (properties) {
    var _this = this;
    var sanitizedProperties = {};
    Object.keys(properties).forEach(function (property) {
      if (_this.isProprietyValid(property)) {
        sanitizedProperties[property] = properties[property];
      }
    });
    return sanitizedProperties;
  };
  /**
   * The prefix used for all events.
   * @private
   */
  Telemetry.TRACKS_PREFIX = 'wpparsely_';
  /**
   * The regex used to validate event names.
   * @private
   */
  Telemetry.EVENT_NAME_REGEX = /^(([a-z0-9]+)_){2}([a-z0-9_]+)$/;
  /**
   * The regex used to validate event properties.
   * @private
   */
  Telemetry.PROPERTY_REGEX = /^[a-z_][a-z0-9_]*$/;
  return Telemetry;
}();
/* harmony default export */ __webpack_exports__["default"] = (Telemetry);

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["plugins"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./src/js/telemetry/init.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_change__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block-change */ "./src/js/telemetry/block-change.tsx");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};




// Initialize the telemetry module.
_telemetry__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
// Set up the events.
/**
 * The events to be tracked.
 *
 * @since 3.12.0
 */
var events = [_block_change__WEBPACK_IMPORTED_MODULE_2__["default"]];
var EventsComponent = _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement.apply(void 0, __spreadArray([_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null], events.map(function (EventComponent) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(EventComponent);
}), false));
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('wp-parsely-tracks-js-events', {
  render: function () {
    return EventsComponent;
  }
});
}();
/******/ })()
;
//# sourceMappingURL=telemetry.js.map