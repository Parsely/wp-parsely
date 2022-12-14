/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib/personalization.js":
/*!***************************************!*\
  !*** ./src/js/lib/personalization.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUuidFromVisitorCookie": function() { return /* binding */ getUuidFromVisitorCookie; },
/* harmony export */   "getVisitorCookie": function() { return /* binding */ getVisitorCookie; },
/* harmony export */   "getVisitorCookieRaw": function() { return /* binding */ getVisitorCookieRaw; }
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/**
 * External dependencies
 */

const VISITOR_COOKIE_KEY_NAME = '_parsely_visitor';
function getVisitorCookieRaw() {
  return js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get(VISITOR_COOKIE_KEY_NAME);
}
function getVisitorCookie() {
  const cookieVal = getVisitorCookieRaw();

  if (!cookieVal) {
    return undefined;
  }

  const unescapedCookieVal = unescape(cookieVal);

  try {
    return JSON.parse(unescapedCookieVal);
  } catch (e) {
    return undefined;
  }
}
function getUuidFromVisitorCookie() {
  var _getVisitorCookie;

  return (_getVisitorCookie = getVisitorCookie()) === null || _getVisitorCookie === void 0 ? void 0 : _getVisitorCookie.id;
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
/*! js-cookie v3.0.1 | MIT */
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
  function set (key, value, attributes) {
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

    key = encodeURIComponent(key)
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
      key + '=' + converter.write(value, key) + stringifiedAttributes)
  }

  function get (key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
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
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
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

/* harmony default export */ __webpack_exports__["default"] = (api);


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
  !*** ./src/js/widgets/recommended.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_personalization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/personalization */ "./src/js/lib/personalization.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */



function constructUrl(apiUrl, permalink, personalized) {
  if (personalized) {
    const uuid = (0,_lib_personalization__WEBPACK_IMPORTED_MODULE_1__.getUuidFromVisitorCookie)();

    if (uuid) {
      return `${apiUrl}&uuid=${encodeURIComponent(uuid)}`;
    }
  }

  return `${apiUrl}&url=${encodeURIComponent(permalink)}`;
}

function constructWidget(widget) {
  const apiUrl = widget.getAttribute('data-parsely-widget-api-url');
  const permalink = widget.getAttribute('data-parsely-widget-permalink');
  const personalized = widget.getAttribute('data-parsely-widget-personalized') === 'true';
  const url = constructUrl(apiUrl, permalink, personalized);
  return {
    outerDiv: widget,
    url,
    displayAuthor: widget.getAttribute('data-parsely-widget-display-author') === 'true',
    displayDirection: widget.getAttribute('data-parsely-widget-display-direction'),
    imgDisplay: widget.getAttribute('data-parsely-widget-img-display'),
    widgetId: widget.getAttribute('data-parsely-widget-id')
  };
}

function renderWidget(data, _ref) {
  let {
    outerDiv,
    displayAuthor,
    displayDirection,
    imgDisplay,
    widgetId
  } = _ref;

  if (imgDisplay !== 'none') {
    outerDiv.classList.add('display-thumbnail');
  }

  if (displayDirection) {
    outerDiv.classList.add('list-' + displayDirection);
  }

  const outerList = document.createElement('ul');
  outerList.className = 'parsely-recommended-widget';
  outerDiv.appendChild(outerList);

  for (const [key, value] of Object.entries(data.data)) {
    const widgetEntry = document.createElement('li');
    widgetEntry.className = 'parsely-recommended-widget-entry';
    widgetEntry.setAttribute('id', 'parsely-recommended-widget-item' + key);
    const textDiv = document.createElement('div');
    textDiv.className = 'parsely-text-wrapper';
    const thumbnailImg = document.createElement('img');

    if (imgDisplay === 'parsely_thumb') {
      thumbnailImg.setAttribute('src', value.thumb_url_medium);
    } else if (imgDisplay === 'original') {
      thumbnailImg.setAttribute('src', value.image_url);
    }

    widgetEntry.appendChild(thumbnailImg);
    const itmId = `?itm_campaign=${widgetId}`;
    const itmMedium = '&itmMedium=site_widget';
    const itmSource = '&itmSource=parsely_recommended_widget';
    const itmContent = '&itm_content=widget_item-' + key;
    const itmLink = value.url + itmId + itmMedium + itmSource + itmContent;
    const postTitle = document.createElement('div');
    postTitle.className = 'parsely-recommended-widget-title';
    const postLink = document.createElement('a');
    postLink.setAttribute('href', itmLink);
    postLink.textContent = value.title;
    postTitle.appendChild(postLink);
    textDiv.appendChild(postTitle);

    if (displayAuthor) {
      const authorLink = document.createElement('div');
      authorLink.className = 'parsely-recommended-widget-author';
      authorLink.textContent = value.author;
      textDiv.appendChild(authorLink);
    }

    widgetEntry.appendChild(textDiv);
    outerList.appendChild(widgetEntry);
  }

  outerDiv.appendChild(outerList);
  outerDiv.closest('.widget.Recommended_Widget').classList.remove('parsely-recommended-widget-hidden');
}

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const widgetDOMElements = document.querySelectorAll('.parsely-recommended-widget');
  const widgetObjects = Array.from(widgetDOMElements).map(constructWidget);
  const widgetsGroupedByUrl = widgetObjects.reduce((acc, curr) => {
    if (!acc[curr.url]) {
      acc[curr.url] = [];
    }

    acc[curr.url].push(curr);
    return acc;
  }, {});
  Object.entries(widgetsGroupedByUrl).forEach(_ref2 => {
    let [url, widgets] = _ref2;
    fetch(url).then(response => response.json()).then(data => {
      widgets.forEach(widget => {
        renderWidget(data, widget);
      });
    });
  });
});
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!****************************************!*\
  !*** ./src/css/recommended-widget.css ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=recommended-widget.js.map