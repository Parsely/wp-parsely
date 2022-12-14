/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["hooks"];

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
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/lib/loader.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wpParselyInitCustom": function() { return /* binding */ wpParselyInitCustom; }
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
  const customOnLoad = () => window.wpParselyHooks.doAction('wpParselyOnLoad');
  /**
   * The `wpParselyOnReady` hook gets called with the `onReady` event of the `window.PARSELY` object.
   * All functions enqueued on that hook will be executed on that event according to their priorities. Those
   * functions should not expect any parameters and shouldn't return any.
   */


  const customOnReady = () => window.wpParselyHooks.doAction('wpParselyOnReady'); // Construct window.PARSELY object.


  if (typeof window.PARSELY === 'object') {
    if (typeof window.PARSELY.onload !== 'function') {
      window.PARSELY.onload = customOnLoad;
    } else {
      const oldOnLoad = window.PARSELY.onload;

      window.PARSELY.onload = function () {
        if (oldOnLoad) {
          oldOnLoad();
        }

        customOnLoad();
      };
    }

    if (typeof window.PARSELY.onReady !== 'function') {
      window.PARSELY.onReady = customOnReady;
    } else {
      const oldOnReady = window.PARSELY.onReady;

      window.PARSELY.onReady = function () {
        if (oldOnReady) {
          oldOnReady();
        }

        customOnReady();
      };
    }
  } else {
    window.PARSELY = {
      onload: customOnLoad,
      onReady: customOnReady
    };
  } // Disable autotrack if it was set as such in settings.


  if (window.wpParselyDisableAutotrack === true) {
    window.PARSELY.autotrack = false;
  }
}
wpParselyInitCustom();
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*****************************************!*\
  !*** ./src/js/lib/uuid-profile-call.js ***!
  \*****************************************/
// Only enqueuing the action if the site has a defined API key.
if (typeof window.wpParselyApiKey !== 'undefined') {
  window.wpParselyHooks.addAction('wpParselyOnLoad', 'wpParsely', uuidProfileCall);
}

async function uuidProfileCall() {
  var _global$PARSELY, _global$PARSELY$confi;

  const uuid = (_global$PARSELY = __webpack_require__.g.PARSELY) === null || _global$PARSELY === void 0 ? void 0 : (_global$PARSELY$confi = _global$PARSELY.config) === null || _global$PARSELY$confi === void 0 ? void 0 : _global$PARSELY$confi.parsely_site_uuid;

  if (!(window.wpParselyApiKey && uuid)) {
    return;
  }

  const url = `https://api.parsely.com/v2/profile?apikey=${encodeURIComponent(window.wpParselyApiKey)}&uuid=${encodeURIComponent(uuid)}&url=${encodeURIComponent(window.location.href)}`;
  return fetch(url);
}
}();
/******/ })()
;
//# sourceMappingURL=loader.js.map