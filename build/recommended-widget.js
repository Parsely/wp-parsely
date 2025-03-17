/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib/personalization.ts":
/*!***************************************!*\
  !*** ./src/js/lib/personalization.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUuidFromVisitorCookie: function() { return /* binding */ getUuidFromVisitorCookie; },
/* harmony export */   getVisitorCookie: function() { return /* binding */ getVisitorCookie; },
/* harmony export */   getVisitorCookieRaw: function() { return /* binding */ getVisitorCookieRaw; }
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/**
 * External dependencies
 */

var VISITOR_COOKIE_KEY_NAME = '_parsely_visitor';
function getVisitorCookieRaw() {
  return js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get(VISITOR_COOKIE_KEY_NAME);
}
function getVisitorCookie() {
  var cookieVal = getVisitorCookieRaw();
  if (!cookieVal) {
    return undefined;
  }
  var unescapedCookieVal = unescape(cookieVal);
  try {
    return JSON.parse(unescapedCookieVal);
  } catch (e) {
    return undefined;
  }
}
function getUuidFromVisitorCookie() {
  var _a;
  return (_a = getVisitorCookie()) === null || _a === void 0 ? void 0 : _a.id;
}

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ api; }
/* harmony export */ });
/*! js-cookie v3.0.5 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (name, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      name + '=' + converter.write(value, name) + stringifiedAttributes)
  }

  function get (name) {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);

        if (name === found) {
          break
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar
  }

  return Object.create(
    {
      set,
      get,
      remove: function (name, attributes) {
        set(
          name,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */




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
/*!***************************************!*\
  !*** ./src/js/widgets/recommended.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_personalization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/personalization */ "./src/js/lib/personalization.ts");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

function constructUrl(apiUrl, permalink, personalized) {
  if (personalized) {
    var uuid = (0,_lib_personalization__WEBPACK_IMPORTED_MODULE_1__.getUuidFromVisitorCookie)();
    if (uuid) {
      return "".concat(apiUrl, "&uuid=").concat(encodeURIComponent(uuid));
    }
  }
  return "".concat(apiUrl, "&url=").concat(encodeURIComponent(permalink));
}
function constructWidget(widget) {
  var _a, _b;
  var apiUrl = (_a = widget.getAttribute('data-parsely-widget-api-url')) !== null && _a !== void 0 ? _a : '';
  var permalink = (_b = widget.getAttribute('data-parsely-widget-permalink')) !== null && _b !== void 0 ? _b : '';
  var personalized = widget.getAttribute('data-parsely-widget-personalized') === 'true';
  var url = constructUrl(apiUrl, permalink, personalized);
  return {
    outerDiv: widget,
    url: url,
    displayAuthor: widget.getAttribute('data-parsely-widget-display-author') === 'true',
    displayDirection: widget.getAttribute('data-parsely-widget-display-direction'),
    imgDisplay: widget.getAttribute('data-parsely-widget-img-display'),
    widgetId: widget.getAttribute('data-parsely-widget-id')
  };
}
function renderWidget(data, _a) {
  var _b;
  var outerDiv = _a.outerDiv,
    displayAuthor = _a.displayAuthor,
    displayDirection = _a.displayDirection,
    imgDisplay = _a.imgDisplay,
    widgetId = _a.widgetId;
  if (imgDisplay !== 'none') {
    outerDiv.classList.add('display-thumbnail');
  }
  if (displayDirection) {
    outerDiv.classList.add('list-' + displayDirection);
  }
  var outerList = document.createElement('ul');
  outerList.className = 'parsely-recommended-widget';
  outerDiv.appendChild(outerList);
  for (var _i = 0, _c = Object.entries(data.data); _i < _c.length; _i++) {
    var _d = _c[_i],
      key = _d[0],
      value = _d[1];
    var widgetEntry = document.createElement('li');
    widgetEntry.className = 'parsely-recommended-widget-entry';
    widgetEntry.setAttribute('id', 'parsely-recommended-widget-item' + key);
    var textDiv = document.createElement('div');
    textDiv.className = 'parsely-text-wrapper';
    var thumbnailImg = document.createElement('img');
    if (imgDisplay === 'parsely_thumb') {
      thumbnailImg.setAttribute('src', value.thumb_url_medium);
    } else if (imgDisplay === 'original') {
      thumbnailImg.setAttribute('src', value.image_url);
    }
    widgetEntry.appendChild(thumbnailImg);
    var itmId = "?itm_campaign=".concat(widgetId);
    var itmMedium = '&itmMedium=site_widget';
    var itmSource = '&itmSource=parsely_recommended_widget';
    var itmContent = '&itm_content=widget_item-' + key;
    var itmLink = value.url + itmId + itmMedium + itmSource + itmContent;
    var postTitle = document.createElement('div');
    postTitle.className = 'parsely-recommended-widget-title';
    var postLink = document.createElement('a');
    postLink.setAttribute('href', itmLink);
    postLink.textContent = value.title;
    postTitle.appendChild(postLink);
    textDiv.appendChild(postTitle);
    if (displayAuthor) {
      var authorLink = document.createElement('div');
      authorLink.className = 'parsely-recommended-widget-author';
      authorLink.textContent = value.author;
      textDiv.appendChild(authorLink);
    }
    widgetEntry.appendChild(textDiv);
    outerList.appendChild(widgetEntry);
  }
  outerDiv.appendChild(outerList);
  (_b = outerDiv.closest('.widget.Recommended_Widget')) === null || _b === void 0 ? void 0 : _b.classList.remove('parsely-recommended-widget-hidden');
}
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var widgetDOMElements = document.querySelectorAll('.parsely-recommended-widget');
  var widgetObjects = Array.from(widgetDOMElements).map(function (widget) {
    return constructWidget(widget);
  });
  var widgetsGroupedByUrl = widgetObjects.reduce(function (acc, curr) {
    if (!acc[curr.url]) {
      acc[curr.url] = [];
    }
    acc[curr.url].push(curr);
    return acc;
  }, {});
  Object.entries(widgetsGroupedByUrl).forEach(function (_a) {
    var url = _a[0],
      widgets = _a[1];
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      widgets.forEach(function (widget) {
        renderWidget(data, widget);
      });
    });
  });
});
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*****************************************!*\
  !*** ./src/css/recommended-widget.scss ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=recommended-widget.js.map