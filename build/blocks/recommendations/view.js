/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/recommendations/actions.js":
/*!***********************************************!*\
  !*** ./src/blocks/recommendations/actions.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setError": function() { return /* binding */ setError; },
/* harmony export */   "setLoaded": function() { return /* binding */ setLoaded; },
/* harmony export */   "setRecommendations": function() { return /* binding */ setRecommendations; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/blocks/recommendations/constants.js");

var setError = function setError(_ref) {
  var error = _ref.error;
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__.RECOMMENDATIONS_BLOCK_ERROR,
    error: error
  };
};
var setRecommendations = function setRecommendations(_ref2) {
  var recommendations = _ref2.recommendations;
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__.RECOMMENDATIONS_BLOCK_RECOMMENDATIONS,
    recommendations: recommendations
  };
};
var setLoaded = function setLoaded() {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__.RECOMMENDATIONS_BLOCK_LOADED
  };
};

/***/ }),

/***/ "./src/blocks/recommendations/components/parsely-recommendations-fetcher.js":
/*!**********************************************************************************!*\
  !*** ./src/blocks/recommendations/components/parsely-recommendations-fetcher.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions */ "./src/blocks/recommendations/actions.js");
/* harmony import */ var _recommendations_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../recommendations-store */ "./src/blocks/recommendations/recommendations-store.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



/**
 * External dependencies
 */




/**
 * Internal dependencies
 */



var updateDelay = 300; // The Block's update delay in the Block Editor when settings/props change.

var ParselyRecommendationsFetcher = function ParselyRecommendationsFetcher(_ref) {
  var boost = _ref.boost,
      limit = _ref.limit,
      sort = _ref.sort,
      isEditMode = _ref.isEditMode;

  var _useRecommendationsSt = (0,_recommendations_store__WEBPACK_IMPORTED_MODULE_9__.useRecommendationsStore)(),
      dispatch = _useRecommendationsSt.dispatch;

  var query = {
    boost: boost,
    limit: limit,
    sort: sort,
    url: window.location.href
  };

  function fetchRecommendationsFromWpApi() {
    return _fetchRecommendationsFromWpApi.apply(this, arguments);
  }

  function _fetchRecommendationsFromWpApi() {
    _fetchRecommendationsFromWpApi = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
                path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.addQueryArgs)('/wp-parsely/v1/related', {
                  query: query
                })
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _fetchRecommendationsFromWpApi.apply(this, arguments);
  }

  function fetchRecommendations() {
    return _fetchRecommendations.apply(this, arguments);
  }

  function _fetchRecommendations() {
    _fetchRecommendations = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
      var _response, _response2;

      var response, error, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return fetchRecommendationsFromWpApi();

            case 3:
              response = _context2.sent;
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              error = _context2.t0;

            case 9:
              if ((_response = response) !== null && _response !== void 0 && _response.error) {
                error = response.error;
              }

              if (!error) {
                _context2.next = 13;
                break;
              }

              dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_8__.setError)({
                error: error
              }));
              return _context2.abrupt("return");

            case 13:
              data = ((_response2 = response) === null || _response2 === void 0 ? void 0 : _response2.data) || []; // When in the editor, change URLs to # for better screen reader experience.

              if (isEditMode) {
                data = data.map(function (obj) {
                  return _objectSpread(_objectSpread({}, obj), {}, {
                    url: '#'
                  });
                });
              }

              dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_8__.setRecommendations)({
                recommendations: data
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return _fetchRecommendations.apply(this, arguments);
  }

  var apiMemoProps = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.values(query));

  var updateRecommendationsWhenPropsChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useCallback)(fetchRecommendations, apiMemoProps);
  var debouncedUpdate = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useDebounce)(updateRecommendationsWhenPropsChange, updateDelay);
  /**
   * Fetch recommendations:
   * - On component mount
   * - When an attribute changes that affects the API call.
   *   (This happens in the Editor context when someone changes a setting.)
   */

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(debouncedUpdate, apiMemoProps); // This is a data-only component and does not render

  return null;
};

/* harmony default export */ __webpack_exports__["default"] = (ParselyRecommendationsFetcher);

/***/ }),

/***/ "./src/blocks/recommendations/components/parsely-recommendations-list-item.js":
/*!************************************************************************************!*\
  !*** ./src/blocks/recommendations/components/parsely-recommendations-list-item.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


/**
 * External dependencies
 */


var getImageForLink = function getImageForLink(_ref) {
  var imagestyle = _ref.imagestyle,
      imageUrl = _ref.imageUrl,
      thumbUrlMedium = _ref.thumbUrlMedium;
  return imagestyle === 'original' ? imageUrl : thumbUrlMedium;
};

var ParselyRecommendationsListItem = function ParselyRecommendationsListItem(_ref2) {
  var imageAlt = _ref2.imageAlt,
      imagestyle = _ref2.imagestyle,
      _ref2$recommendation = _ref2.recommendation,
      linkTitle = _ref2$recommendation.title,
      linkUrl = _ref2$recommendation.url,
      imageUrl = _ref2$recommendation.image_url,
      thumbUrlMedium = _ref2$recommendation.thumb_url_medium,
      showimages = _ref2.showimages;
  var imageForLink = showimages && getImageForLink({
    imagestyle: imagestyle,
    imageUrl: imageUrl,
    thumbUrlMedium: thumbUrlMedium
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: linkUrl,
    className: "parsely-recommendations-link"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, {
    className: "parsely-recommendations-card",
    size: "custom"
  }, imageForLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardMedia, {
    className: "parsely-recommendations-cardmedia"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "parsely-recommendations-image",
    src: imageForLink,
    alt: imageAlt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, {
    className: "parsely-recommendations-cardbody"
  }, linkTitle))));
};

/* harmony default export */ __webpack_exports__["default"] = (ParselyRecommendationsListItem);

/***/ }),

/***/ "./src/blocks/recommendations/components/parsely-recommendations-list.js":
/*!*******************************************************************************!*\
  !*** ./src/blocks/recommendations/components/parsely-recommendations-list.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _parsely_recommendations_list_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parsely-recommendations-list-item */ "./src/blocks/recommendations/components/parsely-recommendations-list-item.js");


/**
 * External dependencies
 */

/**
 * Internal dependencies
 */



var ParselyRecommendationsList = function ParselyRecommendationsList(_ref) {
  var imagestyle = _ref.imagestyle,
      recommendations = _ref.recommendations,
      showimages = _ref.showimages;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "parsely-recommendations-list"
  }, recommendations.map(function (recommendation, index) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_parsely_recommendations_list_item__WEBPACK_IMPORTED_MODULE_2__["default"], {
      imagestyle: imagestyle,
      imageAlt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image for link', 'wp-parsely'),
      key: index,
      recommendation: recommendation,
      showimages: showimages
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ParselyRecommendationsList);

/***/ }),

/***/ "./src/blocks/recommendations/components/parsely-recommendations-title.js":
/*!********************************************************************************!*\
  !*** ./src/blocks/recommendations/components/parsely-recommendations-title.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


var ParselyRecommendationsTitle = function ParselyRecommendationsTitle(_ref) {
  var title = _ref.title;
  return title ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "parsely-recommendations-list-title"
  }, title) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};

/* harmony default export */ __webpack_exports__["default"] = (ParselyRecommendationsTitle);

/***/ }),

/***/ "./src/blocks/recommendations/components/parsely-recommendations.js":
/*!**************************************************************************!*\
  !*** ./src/blocks/recommendations/components/parsely-recommendations.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ParselyRecommendations; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _parsely_recommendations_fetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parsely-recommendations-fetcher */ "./src/blocks/recommendations/components/parsely-recommendations-fetcher.js");
/* harmony import */ var _parsely_recommendations_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parsely-recommendations-list */ "./src/blocks/recommendations/components/parsely-recommendations-list.js");
/* harmony import */ var _parsely_recommendations_title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parsely-recommendations-title */ "./src/blocks/recommendations/components/parsely-recommendations-title.js");
/* harmony import */ var _recommendations_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../recommendations-store */ "./src/blocks/recommendations/recommendations-store.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */





function ParselyRecommendations(_ref) {
  var boost = _ref.boost,
      limit = _ref.limit,
      imagestyle = _ref.imagestyle,
      isEditMode = _ref.isEditMode,
      personalized = _ref.personalized,
      showimages = _ref.showimages,
      sort = _ref.sort,
      title = _ref.title;

  var _useRecommendationsSt = (0,_recommendations_store__WEBPACK_IMPORTED_MODULE_6__.useRecommendationsStore)(),
      _useRecommendationsSt2 = _useRecommendationsSt.state,
      error = _useRecommendationsSt2.error,
      isLoaded = _useRecommendationsSt2.isLoaded,
      recommendations = _useRecommendationsSt2.recommendations;

  function getErrorMessage() {
    var message = "".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error:', 'wp-parsely'), " ").concat(JSON.stringify(error));
    var httpError = message.includes('"errors":{"http_request_failed"') || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(error) === 'object' && (error === null || error === void 0 ? void 0 : error.code) === 'fetch_error';

    if (httpError) {
      message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The Parse.ly Recommendations API is not accessible. You may be offline.', 'wp-parsely');
    } else if (message.includes('{"errors":{"403":["Forbidden"]},"error_data":[]}')) {
      message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Access denied. Please verify that your Site ID is valid.', 'wp-parsely');
    } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(error) === 'object' && (error === null || error === void 0 ? void 0 : error.code) === 'rest_no_route') {
      message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The REST route is unavailable. To use it, wp_parsely_enable_related_api_proxy should be true.', 'wp-parsely');
    }

    return message;
  } // Show error messages within the WordPress Block Editor when needed.


  var errorMessage;

  if (isLoaded && isEditMode) {
    if (error) {
      errorMessage = getErrorMessage();
    } else if (Array.isArray(recommendations) && !(recommendations !== null && recommendations !== void 0 && recommendations.length)) {
      errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No recommendations found.', 'wp-parsely');
    }
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_parsely_recommendations_fetcher__WEBPACK_IMPORTED_MODULE_3__["default"], {
    boost: boost,
    limit: limit,
    personalized: personalized,
    sort: sort,
    isEditMode: isEditMode
  }), !isLoaded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "parsely-recommendations-loading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading…', 'wp-parsely')), errorMessage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "parsely-recommendations-error"
  }, errorMessage), isLoaded && !!(recommendations !== null && recommendations !== void 0 && recommendations.length) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_parsely_recommendations_title__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: title
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_parsely_recommendations_list__WEBPACK_IMPORTED_MODULE_4__["default"], {
    imagestyle: imagestyle,
    recommendations: recommendations,
    showimages: showimages
  })));
}

/***/ }),

/***/ "./src/blocks/recommendations/constants.js":
/*!*************************************************!*\
  !*** ./src/blocks/recommendations/constants.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RECOMMENDATIONS_BLOCK_ERROR": function() { return /* binding */ RECOMMENDATIONS_BLOCK_ERROR; },
/* harmony export */   "RECOMMENDATIONS_BLOCK_LOADED": function() { return /* binding */ RECOMMENDATIONS_BLOCK_LOADED; },
/* harmony export */   "RECOMMENDATIONS_BLOCK_RECOMMENDATIONS": function() { return /* binding */ RECOMMENDATIONS_BLOCK_RECOMMENDATIONS; }
/* harmony export */ });
var RECOMMENDATIONS_BLOCK_ERROR = 'RECOMMENDATIONS_BLOCK_ERROR';
var RECOMMENDATIONS_BLOCK_LOADED = 'RECOMMENDATIONS_BLOCK_LOADED';
var RECOMMENDATIONS_BLOCK_RECOMMENDATIONS = 'RECOMMENDATIONS_BLOCK_RECOMMENDATIONS';

/***/ }),

/***/ "./src/blocks/recommendations/recommendations-store.js":
/*!*************************************************************!*\
  !*** ./src/blocks/recommendations/recommendations-store.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRecommendationsStore": function() { return /* binding */ useRecommendationsStore; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/blocks/recommendations/constants.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


var RecommendationsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createContext)();

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_4__.RECOMMENDATIONS_BLOCK_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoaded: true,
        error: action.error,
        recommendations: undefined
      });

    case _constants__WEBPACK_IMPORTED_MODULE_4__.RECOMMENDATIONS_BLOCK_LOADED:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoaded: true
      });

    case _constants__WEBPACK_IMPORTED_MODULE_4__.RECOMMENDATIONS_BLOCK_RECOMMENDATIONS:
      {
        var recommendations = action.recommendations;

        if (!Array.isArray(recommendations)) {
          return _objectSpread(_objectSpread({}, state), {}, {
            recommendations: undefined
          });
        }

        var validRecommendations = recommendations.map( // eslint-disable-next-line camelcase
        function (_ref) {
          var title = _ref.title,
              url = _ref.url,
              image_url = _ref.image_url,
              thumb_url_medium = _ref.thumb_url_medium;
          return {
            title: title,
            url: url,
            image_url: image_url,
            // eslint-disable-line camelcase
            thumb_url_medium: thumb_url_medium // eslint-disable-line camelcase

          };
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          isLoaded: true,
          error: undefined,
          recommendations: validRecommendations
        });
      }

    default:
      return _objectSpread({}, state);
  }
};

var RecommendationsStore = function RecommendationsStore(props) {
  var _window$PARSELY, _window$PARSELY$confi;

  var defaultState = {
    isLoaded: false,
    recommendations: undefined,
    uuid: (_window$PARSELY = window.PARSELY) === null || _window$PARSELY === void 0 ? void 0 : (_window$PARSELY$confi = _window$PARSELY.config) === null || _window$PARSELY$confi === void 0 ? void 0 : _window$PARSELY$confi.uuid,
    clientId: props.clientId
  };

  var _useReducer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useReducer)(reducer, defaultState),
      _useReducer2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(RecommendationsContext.Provider, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    value: {
      state: state,
      dispatch: dispatch
    }
  }, props));
};

var useRecommendationsStore = function useRecommendationsStore() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(RecommendationsContext);
};
/* harmony default export */ __webpack_exports__["default"] = (RecommendationsStore);

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*************************************!*\
  !*** external "regeneratorRuntime" ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["regeneratorRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayLikeToArray; }
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithHoles; }
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _asyncToGenerator; }
/* harmony export */ });
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArrayLimit; }
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableRest; }
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _slicedToArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _unsupportedIterableToArray; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

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
/*!********************************************!*\
  !*** ./src/blocks/recommendations/view.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_parsely_recommendations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/parsely-recommendations */ "./src/blocks/recommendations/components/parsely-recommendations.js");
/* harmony import */ var _recommendations_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recommendations-store */ "./src/blocks/recommendations/recommendations-store.js");



/**
 * External dependencies
 */


/**
 * Internal dependencies
 */



_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  var blocks = document.querySelectorAll('.wp-block-wp-parsely-recommendations');
  blocks.forEach(function (block, i) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_recommendations_store__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_parsely_recommendations__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, block.dataset, {
      key: i
    }))), block);
  });
});
}();
/******/ })()
;
//# sourceMappingURL=view.js.map