/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/telemetry/block-change.tsx":
/*!*******************************************!*\
  !*** ./src/js/telemetry/block-change.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockChangeMonitor: function() { return /* binding */ BlockChangeMonitor; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./telemetry */ "./src/js/telemetry/telemetry.ts");
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
 * WordPress dependencies
 */


/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies

/**
 * Internal dependencies
 */

/**
 * BlockChangeMonitor is a React component that monitors changes in the WordPress block editor.
 * It tracks the addition and removal of blocks that start with the 'wp-parsely/' prefix.
 * This component does not render anything.
 *
 * @since 3.12.0
 *
 * @return {null} This component does not render anything.
 */
var BlockChangeMonitor = function () {
  /**
   * The prefix of the blocks to monitor.
   *
   * @since 3.12.0
   */
  var parselyBlockPrefix = 'wp-parsely/';
  /**
   * This useEffect hook is used to monitor changes in the WordPress block editor.
   * It delays the initialization to avoid reacting to the initial block load.
   * It subscribes to changes in the block editor when the component is mounted.
   * When the block editor changes, it checks if blocks have been added or removed by comparing the current
   * list of blocks with the previous one.
   * If a block has been added or removed, it sends a telemetry event to the server.
   * When the component is unmounted, it clears the initialization timeout.
   *
   * @since 3.12.0
   * @since 3.14.0 Improved detection by comparing current and previous block states directly.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Debounce interval to save CPU cycles with the frequent editor updates.
    var debounceInterval = 1000; // In milliseconds.
    var unsubscribe;
    var initialize = function () {
      var previousBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
      /**
       * Checks if blocks have been added or removed and sends telemetry events accordingly.
       *
       * @since 3.14.0
       */
      var checkBlocks = function () {
        var currentBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
        var currentBlockIds = currentBlocks.map(function (block) {
          return block.clientId;
        });
        var previousBlockIds = previousBlocks.map(function (block) {
          return block.clientId;
        });
        // Find added blocks.
        var addedBlocks = currentBlocks.filter(function (block) {
          return !previousBlockIds.includes(block.clientId);
        });
        addedBlocks.forEach(function (block) {
          if (block.name.startsWith(parselyBlockPrefix)) {
            _telemetry__WEBPACK_IMPORTED_MODULE_3__.Telemetry.trackEvent('block_added', {
              block: block.name
            });
          }
        });
        // Find removed blocks.
        var removedBlockIds = previousBlockIds.filter(function (id) {
          return !currentBlockIds.includes(id);
        });
        removedBlockIds.forEach(function (id) {
          var removedBlock = previousBlocks.find(function (block) {
            return block.clientId === id;
          });
          if (removedBlock && removedBlock.name.startsWith(parselyBlockPrefix)) {
            _telemetry__WEBPACK_IMPORTED_MODULE_3__.Telemetry.trackEvent('block_removed', {
              block: removedBlock.name
            });
          }
        });
        // Update the previousBlocks for the next check.
        previousBlocks = currentBlocks;
      };
      // Debounce the checkBlocks function to save CPU cycles with the frequent editor updates.
      var debouncedCheckBlocks = lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(checkBlocks, debounceInterval);
      unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(debouncedCheckBlocks, 'core/block-editor');
      return unsubscribe;
    };
    /**
     * Checks if the editor is ready to be monitored.
     * It waits for the editor to be clean or to have at least one block, and it resolves when it's ready.
     *
     * @since 3.14.0
     */
    var isEditorReady = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2 /*return*/, new Promise(function (resolve) {
            var unsubscribeEditorReady = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(function () {
              if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').isCleanNewPost() || (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlockCount() > 0) {
                unsubscribeEditorReady();
                resolve();
              }
            });
          })];
        });
      });
    };
    // Initialize the block change monitor when the editor is ready.
    isEditorReady().then(initialize);
    return function () {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return null; // This component does not render anything.
};

/***/ }),

/***/ "./src/js/telemetry/telemetry.ts":
/*!***************************************!*\
  !*** ./src/js/telemetry/telemetry.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Telemetry: function() { return /* binding */ Telemetry; },
/* harmony export */   trackEvent: function() { return /* binding */ trackEvent; }
/* harmony export */ });
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
 *
 * @since 3.12.0
 */
var Telemetry = /** @class */function () {
  /**
   * Private constructor to prevent direct object creation.
   * This is necessary because this class is a singleton.
   *
   * @since 3.12.0
   */
  function Telemetry() {
    /**
     * The queue of events to be tracked.
     *
     * @since 3.12.0
     * @access private
     */
    this._tkq = [];
    /**
     * Whether the tracking library has been loaded.
     *
     * @since 3.12.0
     * @access protected
     */
    this.isLoaded = false;
    /**
     * Whether the tracking is enabled.
     * Looks for the `wpParselyTracksTelemetry` global object. If it exists, telemetry is enabled.
     *
     * @since 3.12.0
     * @access protected
     */
    this.isEnabled = false;
    if (typeof wpParselyTracksTelemetry !== 'undefined') {
      this.isEnabled = true;
      this.loadTrackingLibrary();
    }
  }
  /**
   * Returns the singleton instance of the Telemetry class.
   * If the instance does not exist, it is created.
   *
   * @since 3.12.0
   *
   * @return {Telemetry} The singleton instance of the Telemetry class.
   */
  Telemetry.getInstance = function () {
    if (!window.wpParselyTelemetryInstance) {
      Object.defineProperty(window, 'wpParselyTelemetryInstance', {
        value: new Telemetry(),
        writable: false,
        configurable: false,
        enumerable: false // This makes it not show up in console enumerations.
      });
    }

    return window.wpParselyTelemetryInstance;
  };
  /**
   * Loads the tracking library.
   *
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
  /**
   * Tracks an event.
   * This method is static, so it can be called directly from the class.
   * It first checks if the telemetry is enabled, and if not, it bails.
   * Then, ensures that the telemetry library is loaded by calling `waitUntilLoaded`.
   * Finally, it calls the `trackEvent` method on the singleton instance of the Telemetry class.
   *
   * @since 3.12.0
   *
   * @param {string}     eventName  The name of the event to track.
   * @param {EventProps} properties The properties of the event to track.
   *
   * @return {Promise<void>}        A Promise that resolves when the event has been tracked.
   */
  Telemetry.trackEvent = function (eventName_1) {
    return __awaiter(this, arguments, void 0, function (eventName, properties) {
      var telemetry;
      if (properties === void 0) {
        properties = {};
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            telemetry = Telemetry.getInstance();
            // If telemetry is not enabled, bail.
            if (!telemetry.isTelemetryEnabled()) {
              return [2 /*return*/];
            }

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
   * @since 3.12.0
   *
   * @return {Promise<void>} A Promise that resolves when the telemetry library is loaded.
   */
  Telemetry.waitUntilLoaded = function () {
    return new Promise(function (resolve, reject) {
      var telemetry = Telemetry.getInstance();
      if (!telemetry.isTelemetryEnabled()) {
        reject('Telemetry not enabled');
        return;
      }
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
   * @since 3.12.0
   *
   * @param {string}     eventName  The name of the event to track.
   * @param {EventProps} properties The properties of the event to track.
   */
  Telemetry.prototype.trackEvent = function (eventName, properties) {
    var _a;
    if (!this.isLoaded) {
      // eslint-disable-next-line no-console
      console.error('Error tracking event: Telemetry not loaded');
      return;
    }
    // Validate if the event name has the correct prefix, if not, append it.
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
    // Push the event to the queue.
    (_a = this._tkq) === null || _a === void 0 ? void 0 : _a.push(['recordEvent', eventName, properties]);
  };
  /**
   * Checks if the telemetry is enabled.
   *
   * @since 3.12.0
   */
  Telemetry.prototype.isTelemetryEnabled = function () {
    return this.isEnabled;
  };
  /**
   * Checks if a property is valid.
   * A property is valid if it matches the PROPERTY_REGEX.
   *
   * @since 3.12.0
   *
   * @param {string} property The property to check.
   *
   * @return {boolean} `true` if the property is valid, `false` otherwise.
   */
  Telemetry.prototype.isProprietyValid = function (property) {
    return Telemetry.PROPERTY_REGEX.test(property);
  };
  /**
   * Checks if an event name is valid.
   * An event name is valid if it matches the EVENT_NAME_REGEX.
   *
   * @since 3.12.0
   *
   * @param {string} eventName The event name to check.
   *
   * @return {boolean} `true` if the event name is valid, `false` otherwise.
   */
  Telemetry.prototype.isEventNameValid = function (eventName) {
    return Telemetry.EVENT_NAME_REGEX.test(eventName);
  };
  /**
   * Prepares the properties of an event.
   * This method sanitizes the properties, sets the `parsely_version` property,
   * and sets user-specific properties if they exist.
   *
   * @since 3.12.0
   *
   * @param {EventProps} properties The properties to prepare.
   *
   * @return {EventProps} The prepared properties.
   */
  Telemetry.prototype.prepareProperties = function (properties) {
    properties = this.sanitizeProperties(properties);
    properties.parsely_version = wpParselyTracksTelemetry.version;
    // Set user-specific properties.
    if (wpParselyTracksTelemetry.user) {
      properties._ut = wpParselyTracksTelemetry.user.type;
      properties._ui = wpParselyTracksTelemetry.user.id;
    }
    // If VIP environment, set the vipgo_env property.
    if (wpParselyTracksTelemetry.vipgo_env) {
      properties.vipgo_env = wpParselyTracksTelemetry.vipgo_env;
    }
    return this.sanitizeProperties(properties);
  };
  /**
   * Sanitizes the properties of an event.
   * This method creates a new object and copies over all valid properties
   * from the original properties.
   *
   * @since 3.12.0
   *
   * @param {EventProps} properties The properties to sanitize.
   *
   * @return {EventProps} The sanitized properties.
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
   *
   * @since 3.12.0
   * @access private
   */
  Telemetry.TRACKS_PREFIX = 'wpparsely_';
  /**
   * The regex used to validate event names.
   *
   * @since 3.12.0
   * @access private
   */
  Telemetry.EVENT_NAME_REGEX = /^(([a-z0-9]+)_){2}([a-z0-9_]+)$/;
  /**
   * The regex used to validate event properties.
   *
   * @since 3.12.0
   * @access private
   */
  Telemetry.PROPERTY_REGEX = /^[a-z_][a-z0-9_]*$/;
  return Telemetry;
}();

var trackEvent = Telemetry.trackEvent;

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************************!*\
  !*** ./src/js/telemetry/init.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _block_change__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block-change */ "./src/js/telemetry/block-change.tsx");
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


// Initialize the telemetry module.
var telemetry = _telemetry__WEBPACK_IMPORTED_MODULE_2__.Telemetry.getInstance();
// Set up the events.
if (telemetry.isTelemetryEnabled()) {
  /**
   * The events to be tracked.
   *
   * @since 3.12.0
   */
  var events = [_block_change__WEBPACK_IMPORTED_MODULE_3__.BlockChangeMonitor];
  var EventsComponent_1 = _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(void 0, __spreadArray([_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null], events.map(function (EventComponent) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventComponent);
  }), false));
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('wp-parsely-tracks-js-events', {
    render: function () {
      return EventsComponent_1;
    }
  });
}
}();
/******/ })()
;
//# sourceMappingURL=telemetry.js.map