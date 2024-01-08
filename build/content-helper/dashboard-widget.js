/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-helper/common/content-helper-error-message.tsx":
/*!********************************************************************!*\
  !*** ./src/content-helper/common/content-helper-error-message.tsx ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentHelperErrorMessage: function() { return /* binding */ ContentHelperErrorMessage; },
/* harmony export */   EmptyCredentialsMessage: function() { return /* binding */ EmptyCredentialsMessage; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

/**
 * Returns an error message JSX Element that can contain HTML.
 *
 * Warning: Any HTML passed to this function must be sanitized.
 *
 * @since 3.9.0
 *
 * @param {ContentHelperErrorMessageProps} props The error message's props.
 *
 * @return {JSX.Element} The error message JSX Element.
 */
var ContentHelperErrorMessage = function (props) {
  if (props === void 0) {
    props = null;
  }
  var innerHtml = '';
  if (props === null || props === void 0 ? void 0 : props.children) {
    innerHtml = props.children;
  }
  var classNames = 'content-helper-error-message';
  if (props === null || props === void 0 ? void 0 : props.className) {
    classNames += ' ' + props.className;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: classNames,
    "data-testid": props === null || props === void 0 ? void 0 : props.testId,
    dangerouslySetInnerHTML: {
      __html: innerHtml
    }
  });
};
/**
 * Returns a customized error message JSX Element for when credentials are
 * empty.
 *
 * @since 3.9.0
 *
 * @param {ContentHelperErrorMessageProps|null} props The error message's props.
 *
 * @return {JSX.Element} The error message JSX Element.
 */
var EmptyCredentialsMessage = function (props) {
  if (props === void 0) {
    props = null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ContentHelperErrorMessage, {
    className: props === null || props === void 0 ? void 0 : props.className,
    testId: "empty-credentials-message",
    children: window.wpParselyEmptyCredentialsMessage
  });
};

/***/ }),

/***/ "./src/content-helper/common/content-helper-error.tsx":
/*!************************************************************!*\
  !*** ./src/content-helper/common/content-helper-error.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentHelperError: function() { return /* binding */ ContentHelperError; },
/* harmony export */   ContentHelperErrorCode: function() { return /* binding */ ContentHelperErrorCode; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _content_helper_error_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content-helper-error-message */ "./src/content-helper/common/content-helper-error-message.tsx");
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Enumeration of all the possible errors that might get thrown or processed by
 * the Content Helper during error handling. All errors thrown by the Content
 * Helper should start with a "ch_" prefix.
 */
var ContentHelperErrorCode;
(function (ContentHelperErrorCode) {
  ContentHelperErrorCode["CannotFormulateApiQuery"] = "ch_cannot_formulate_api_query";
  ContentHelperErrorCode["FetchError"] = "fetch_error";
  ContentHelperErrorCode["HttpRequestFailed"] = "http_request_failed";
  ContentHelperErrorCode[ContentHelperErrorCode["ParselyApiForbidden"] = 403] = "ParselyApiForbidden";
  ContentHelperErrorCode["ParselyApiResponseContainsError"] = "ch_response_contains_error";
  ContentHelperErrorCode["ParselyApiReturnedNoData"] = "ch_parsely_api_returned_no_data";
  ContentHelperErrorCode["ParselyApiReturnedTooManyResults"] = "ch_parsely_api_returned_too_many_results";
  ContentHelperErrorCode[ContentHelperErrorCode["ParselyApiUnauthorized"] = 401] = "ParselyApiUnauthorized";
  ContentHelperErrorCode["PluginCredentialsNotSetMessageDetected"] = "parsely_credentials_not_set_message_detected";
  ContentHelperErrorCode["PluginSettingsApiSecretNotSet"] = "parsely_api_secret_not_set";
  ContentHelperErrorCode["PluginSettingsSiteIdNotSet"] = "parsely_site_id_not_set";
  ContentHelperErrorCode["PostIsNotPublished"] = "ch_post_not_published";
})(ContentHelperErrorCode || (ContentHelperErrorCode = {}));
/**
 * Extends the standard JS Error class for use with the Content Helper.
 *
 * @see https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
 */
var ContentHelperError = /** @class */function (_super) {
  __extends(ContentHelperError, _super);
  function ContentHelperError(message, code, prefix) {
    if (prefix === void 0) {
      prefix = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error: ', 'wp-parsely');
    }
    var _this = _super.call(this, prefix + message) || this;
    _this.hint = null;
    _this.name = _this.constructor.name;
    _this.code = code;
    // Errors for which we should not retry a fetch operation.
    var noRetryFetchErrors = [ContentHelperErrorCode.ParselyApiForbidden, ContentHelperErrorCode.ParselyApiResponseContainsError, ContentHelperErrorCode.ParselyApiReturnedNoData, ContentHelperErrorCode.ParselyApiReturnedTooManyResults, ContentHelperErrorCode.ParselyApiUnauthorized, ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected, ContentHelperErrorCode.PluginSettingsApiSecretNotSet, ContentHelperErrorCode.PluginSettingsSiteIdNotSet, ContentHelperErrorCode.PostIsNotPublished];
    _this.retryFetch = !noRetryFetchErrors.includes(_this.code);
    // Set the prototype explicitly.
    Object.setPrototypeOf(_this, ContentHelperError.prototype);
    return _this;
  }
  /**
   * Renders the error's message.
   *
   * @param {ContentHelperErrorMessageProps|null} props The props needed for the function.
   *
   * @return {JSX.Element} The resulting JSX Element.
   */
  ContentHelperError.prototype.Message = function (props) {
    if (props === void 0) {
      props = null;
    }
    // Handle cases where credentials are not set.
    var CredentialsNotSetErrorCodes = [ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected, ContentHelperErrorCode.PluginSettingsSiteIdNotSet, ContentHelperErrorCode.PluginSettingsApiSecretNotSet];
    if (CredentialsNotSetErrorCodes.includes(this.code)) {
      return (0,_content_helper_error_message__WEBPACK_IMPORTED_MODULE_2__.EmptyCredentialsMessage)(props);
    }
    // Errors that need a hint.
    if (this.code === ContentHelperErrorCode.FetchError) {
      this.hint = this.Hint((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.', 'wp-parsely'));
    }
    if (this.code === ContentHelperErrorCode.ParselyApiForbidden) {
      this.hint = this.Hint((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.", 'wp-parsely'));
    }
    if (this.code === ContentHelperErrorCode.HttpRequestFailed) {
      this.hint = this.Hint((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API cannot be reached. Please verify that you are online.', 'wp-parsely'));
    }
    // Errors that need rephrasing.
    if (this.code === ContentHelperErrorCode.ParselyApiUnauthorized) {
      this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This feature is accessible to select customers participating in its beta testing.', 'wp-parsely');
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_content_helper_error_message__WEBPACK_IMPORTED_MODULE_2__.ContentHelperErrorMessage, {
      className: props === null || props === void 0 ? void 0 : props.className,
      testId: "error",
      children: "<p>".concat(this.message, "</p>").concat(this.hint ? this.hint : '')
    });
  };
  /**
   * Shows a hint in order to provide clarity in regards to the error.
   *
   * @param {string} hint The hint to display
   */
  ContentHelperError.prototype.Hint = function (hint) {
    return "<p className=\"content-helper-error-message-hint\" data-testid=\"content-helper-error-message-hint\"><strong>".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hint:', 'wp-parsely'), "</strong> ").concat(hint, "</p>");
  };
  return ContentHelperError;
}(Error);


/***/ }),

/***/ "./src/content-helper/common/icons/edit-icon.tsx":
/*!*******************************************************!*\
  !*** ./src/content-helper/common/icons/edit-icon.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditIcon: function() { return /* binding */ EditIcon; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

var EditIcon = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    "aria-hidden": "true",
    version: "1.1",
    viewBox: "0 0 15 15",
    width: "15",
    height: "15",
    xmlns: "http://www.w3.org/2000/svg",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M0 14.0025V11.0025L7.5 3.5025L10.5 6.5025L3 14.0025H0ZM12 5.0025L13.56 3.4425C14.15 2.8525 14.15 1.9025 13.56 1.3225L12.68 0.4425C12.09 -0.1475 11.14 -0.1475 10.56 0.4425L9 2.0025L12 5.0025Z"
    })
  });
};

/***/ }),

/***/ "./src/content-helper/common/icons/open-link-icon.tsx":
/*!************************************************************!*\
  !*** ./src/content-helper/common/icons/open-link-icon.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OpenLinkIcon: function() { return /* binding */ OpenLinkIcon; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

var OpenLinkIcon = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    "aria-hidden": "true",
    version: "1.1",
    viewBox: "0 0 16 16",
    width: "16",
    height: "16",
    xmlns: "http://www.w3.org/2000/svg",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M0 3.29592C0 2.73237 0.456853 2.27551 1.02041 2.27551H4.08165C4.50432 2.27551 4.84696 2.61815 4.84696 3.04082C4.84696 3.46349 4.50432 3.80613 4.08165 3.80613H1.53062V11.9694H9.69391V9.6735C9.69391 9.25083 10.0366 8.90819 10.4592 8.90819C10.8819 8.90819 11.2245 9.25083 11.2245 9.6735V12.4796C11.2245 13.0432 10.7677 13.5 10.2041 13.5H1.02041C0.456854 13.5 0 13.0432 0 12.4796V3.29592Z"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M12.531 1.22415C12.8299 1.52303 12.8299 2.00759 12.531 2.30646L6.15342 8.68404C5.85455 8.98291 5.36998 8.98291 5.07111 8.68404C4.77224 8.38517 4.77224 7.9006 5.07111 7.60173L11.4487 1.22415C11.7476 0.925282 12.2321 0.925282 12.531 1.22415Z"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M6.63268 1.51012C6.63268 1.08745 6.97532 0.744812 7.39799 0.744812H12.2449C12.6676 0.744812 13.0103 1.08745 13.0103 1.51012V6.35708C13.0103 6.77975 12.6676 7.12239 12.2449 7.12239C11.8223 7.12239 11.4796 6.77975 11.4796 6.35708V2.27543H7.39799C6.97532 2.27543 6.63268 1.93279 6.63268 1.51012Z"
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/common/select.tsx":
/*!**********************************************!*\
  !*** ./src/content-helper/common/select.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: function() { return /* binding */ Select; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

/**
 * Returns a select element according to the passed props.
 *
 * @since 3.10.0
 *
 * @param {FilterSelectProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
var Select = function (_a) {
  var defaultValue = _a.defaultValue,
    items = _a.items,
    onChange = _a.onChange;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
    onChange: onChange,
    value: defaultValue,
    children: items.map(function (item) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
        value: item[0],
        children: item[1]
      }, item[0]);
    })
  });
};

/***/ }),

/***/ "./src/content-helper/common/utils/api.ts":
/*!************************************************!*\
  !*** ./src/content-helper/common/utils/api.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getApiPeriodParams: function() { return /* binding */ getApiPeriodParams; },
/* harmony export */   getApiPeriodStartDate: function() { return /* binding */ getApiPeriodStartDate; }
/* harmony export */ });
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "./src/content-helper/common/utils/date.ts");

/**
 * Gets `period_start` and `period_end` params for API.
 *
 * @param {Period} period Number of days for which to calculate the period range.
 *
 * @return {ApiPeriodRange} API query params.
 */
function getApiPeriodParams(period) {
  return {
    period_start: period,
    period_end: ''
  };
}
/**
 * Gets period start date for API.
 *
 * @param {number} days Number of days for which to calculate the period start
 *                      date.
 *
 * @return {string} period start date.
 */
function getApiPeriodStartDate(days) {
  return (0,_date__WEBPACK_IMPORTED_MODULE_0__.removeDaysFromDate)(new Date(), days - 1) + 'T00:00';
}

/***/ }),

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
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of minutes */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last Minute', 'Last %1$d Minutes', timeValue, 'wp-parsely'), timeValue);
      break;
    case 'h':
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of hours */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last Hour', 'Last %1$d Hours', timeValue, 'wp-parsely'), timeValue);
      break;
    case 'd':
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)( /* translators: 1: Number of days */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Last Day', 'Last %1$d Days', timeValue, 'wp-parsely'), timeValue);
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

/***/ "./src/content-helper/common/utils/date.ts":
/*!*************************************************!*\
  !*** ./src/content-helper/common/utils/date.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canProcessDate: function() { return /* binding */ canProcessDate; },
/* harmony export */   convertDateToString: function() { return /* binding */ convertDateToString; },
/* harmony export */   getDateInUserLang: function() { return /* binding */ getDateInUserLang; },
/* harmony export */   getSmartShortDate: function() { return /* binding */ getSmartShortDate; },
/* harmony export */   removeDaysFromDate: function() { return /* binding */ removeDaysFromDate; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

var SHORT_DATE_FORMAT = {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};
var SHORT_DATE_FORMAT_WITHOUT_YEAR = {
  month: 'short',
  day: 'numeric'
};
var DATE_NOT_AVAILABLE_MESSAGE = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date N/A', 'wp-parsely');
/**
 * Returns whether the passed date can be processed further.
 *
 * @param {Date} date The date to be examined.
 * @return {boolean} Whether the date can be processed further.
 */
function canProcessDate(date) {
  // Return false if the date is not a valid Date object.
  if (isNaN(+date)) {
    return false;
  }
  // Return false if the date is the Unix Epoch time.
  return 0 !== date.getTime();
}
function getDateInUserLang(date, options) {
  if (false === canProcessDate(date)) {
    return DATE_NOT_AVAILABLE_MESSAGE;
  }
  return Intl.DateTimeFormat(document.documentElement.lang || 'en', options).format(date);
}
/**
 * Returns the passed date in short format or in short format without year (if
 * the passed date is within the current year), respecting the user's language.
 *
 * @param {Date} date The date to be formatted.
 * @return {string} The resulting date in its final format.
 */
function getSmartShortDate(date) {
  if (false === canProcessDate(date)) {
    return DATE_NOT_AVAILABLE_MESSAGE;
  }
  var dateFormat = SHORT_DATE_FORMAT;
  if (date.getUTCFullYear() === new Date().getUTCFullYear()) {
    dateFormat = SHORT_DATE_FORMAT_WITHOUT_YEAR;
  }
  return Intl.DateTimeFormat(document.documentElement.lang || 'en', dateFormat).format(date);
}
/**
 * Removes the given number of days from a "YYYY-MM-DD" string, and returns
 * the result in the same format.
 *
 * @param {Date}   date The date to be processed.
 * @param {number} days The number of days to remove from the date.
 * @return {string} The resulting date in "YYYY-MM-DD" format.
 */
function removeDaysFromDate(date, days) {
  if (false === Number.isInteger(days)) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('days parameter must be an integer', 'wp-parsely');
  }
  if (false === canProcessDate(date)) {
    return DATE_NOT_AVAILABLE_MESSAGE;
  }
  var pastDate = new Date(date);
  pastDate.setDate(pastDate.getDate() - days);
  return convertDateToString(pastDate);
}
/**
 * Converts a date to a string in "YYYY-MM-DD" format.
 *
 * @param {Date} date The  date to format.
 * @return {string} The date in "YYYY-MM-DD" format.
 */
function convertDateToString(date) {
  if (false === canProcessDate(date)) {
    return DATE_NOT_AVAILABLE_MESSAGE;
  }
  return date.toISOString().substring(0, 10);
}

/***/ }),

/***/ "./src/content-helper/common/utils/number.ts":
/*!***************************************************!*\
  !*** ./src/content-helper/common/utils/number.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatToImpreciseNumber: function() { return /* binding */ formatToImpreciseNumber; }
/* harmony export */ });
/**
 * Implements the "Imprecise Number" functionality of the Parse.ly dashboard.
 *
 * Note: This function is not made to process float numbers.
 *
 * @param {string} value          The number to process. It can be formatted.
 * @param {number} fractionDigits The number of desired fraction digits.
 * @param {string} glue           A string to put between the number and unit.
 * @return {string} The number formatted as an imprecise number.
 */
function formatToImpreciseNumber(value, fractionDigits, glue) {
  if (fractionDigits === void 0) {
    fractionDigits = 1;
  }
  if (glue === void 0) {
    glue = '';
  }
  var number = parseInt(value.replace(/\D/g, ''), 10);
  if (number < 1000) {
    return value;
  } else if (number < 10000) {
    fractionDigits = 1;
  }
  var unitNames = {
    1000: 'k',
    '1,000,000': 'M',
    '1,000,000,000': 'B',
    '1,000,000,000,000': 'T',
    '1,000,000,000,000,000': 'Q'
  };
  var currentNumber = number;
  var currentNumberAsString = number.toString();
  var unit = '';
  var previousNumber = 0;
  Object.entries(unitNames).forEach(function (_a) {
    var thousands = _a[0],
      suffix = _a[1];
    var thousandsInt = parseInt(thousands.replace(/\D/g, ''), 10);
    if (number >= thousandsInt) {
      currentNumber = number / thousandsInt;
      var precision = fractionDigits;
      // For over 10 units, we reduce the precision to 1 fraction digit.
      if (currentNumber % 1 > 1 / previousNumber) {
        precision = currentNumber > 10 ? 1 : 2;
      }
      // Precision override, where we want to show 2 fraction digits.
      var zeroes = parseFloat(currentNumber.toFixed(2)) === parseFloat(currentNumber.toFixed(0));
      precision = zeroes ? 0 : precision;
      currentNumberAsString = currentNumber.toFixed(precision);
      unit = suffix;
    }
    previousNumber = thousandsInt;
  });
  return currentNumberAsString + glue + unit;
}

/***/ }),

/***/ "./src/content-helper/common/utils/post.tsx":
/*!**************************************************!*\
  !*** ./src/content-helper/common/utils/post.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostListItemMetric: function() { return /* binding */ PostListItemMetric; },
/* harmony export */   getPostEditUrl: function() { return /* binding */ getPostEditUrl; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./src/content-helper/common/utils/number.ts");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);


/**
 * WordPress dependencies
 */

/**
 * Returns a span element with the desired metric data for the Post.
 *
 * Currently, only the `views` and `avg_engaged` metrics are supported.
 *
 * @since 3.10.0
 * @since 3.11.0 Moved into to post.tsx.
 *
 * @param {PostListItemMetricProps} props The component's props.
 *
 * @return {JSX.Element} The resulting JSX Element.
 */
function PostListItemMetric(_a) {
  var metric = _a.metric,
    post = _a.post,
    avgEngagedIcon = _a.avgEngagedIcon,
    viewsIcon = _a.viewsIcon;
  if ('views' === metric) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "parsely-top-post-metric-data",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Number of Views', 'wp-parsely')
      }), viewsIcon, (0,_number__WEBPACK_IMPORTED_MODULE_1__.formatToImpreciseNumber)(post.views.toString())]
    });
  }
  if ('avg_engaged' === metric) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "parsely-top-post-metric-data",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Average Time', 'wp-parsely')
      }), avgEngagedIcon, post.avgEngaged]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "parsely-top-post-metric-data",
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('-', 'wp-parsely')
  });
}
/**
 * Gets edit url of the post.
 *
 * @since 3.7.0
 *
 * @param {number} postId ID of the post.
 *
 * @return {string} Edit url of the post.
 */
function getPostEditUrl(postId) {
  return "/wp-admin/post.php?post=".concat(postId, "&action=edit");
}

/***/ }),

/***/ "./src/content-helper/common/verify-credentials.tsx":
/*!**********************************************************!*\
  !*** ./src/content-helper/common/verify-credentials.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerifyCredentials: function() { return /* binding */ VerifyCredentials; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _content_helper_error_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content-helper-error-message */ "./src/content-helper/common/content-helper-error-message.tsx");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

/**
 * Internal dependencies
 */

/**
 * Returns the passed children or an error message JSX Element if credentials
 * are empty.
 *
 * @since 3.9.0
 *
 * @param {VerifyCredentialsProps}              props             The component's props.
 * @param {ContentHelperErrorMessageProps|null} errorMessageProps The error message's props.
 *
 * @return {JSX.Element} The passed JSX Element or the error message JSX Element.
 */
var VerifyCredentials = function (_a, errorMessageProps) {
  var children = _a.children;
  if (errorMessageProps === void 0) {
    errorMessageProps = null;
  }
  if (window.wpParselyEmptyCredentialsMessage) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_content_helper_error_message__WEBPACK_IMPORTED_MODULE_1__.EmptyCredentialsMessage, __assign({}, errorMessageProps));
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: children
  });
};

/***/ }),

/***/ "./src/content-helper/dashboard-widget/components/top-posts-list-item.tsx":
/*!********************************************************************************!*\
  !*** ./src/content-helper/dashboard-widget/components/top-posts-list-item.tsx ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopPostListItem: function() { return /* binding */ TopPostListItem; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_icons_edit_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/icons/edit-icon */ "./src/content-helper/common/icons/edit-icon.tsx");
/* harmony import */ var _common_icons_open_link_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/icons/open-link-icon */ "./src/content-helper/common/icons/open-link-icon.tsx");
/* harmony import */ var _common_utils_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils/date */ "./src/content-helper/common/utils/date.ts");
/* harmony import */ var _common_utils_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/post */ "./src/content-helper/common/utils/post.tsx");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */




/**
 * Returns a single list item depicting a post.
 *
 * @param {PostListItemProps} props The component's props.
 */
function TopPostListItem(_a) {
  var metric = _a.metric,
    post = _a.post;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
    className: "parsely-top-post",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "parsely-top-post-content",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ListItemThumbnail, {
        post: post
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "parsely-top-post-data",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_utils_post__WEBPACK_IMPORTED_MODULE_5__.PostListItemMetric, {
          metric: metric,
          post: post
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PostListItemTitle, {
          post: post
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          className: "parsely-top-post-icon-link",
          href: post.url,
          target: "_blank",
          rel: "noreferrer",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "screen-reader-text",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View Post (opens in new tab)', 'wp-parsely')
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_open_link_icon__WEBPACK_IMPORTED_MODULE_3__.OpenLinkIcon, {})]
        }), 0 !== post.postId && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          className: "parsely-top-post-icon-link",
          href: (0,_common_utils_post__WEBPACK_IMPORTED_MODULE_5__.getPostEditUrl)(post.postId),
          target: "_blank",
          rel: "noreferrer",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "screen-reader-text",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit Post (opens in new tab)', 'wp-parsely')
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_edit_icon__WEBPACK_IMPORTED_MODULE_2__.EditIcon, {})]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "parsely-top-post-metadata",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "parsely-top-post-date",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "screen-reader-text",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'wp-parsely')
            }), (0,_common_utils_date__WEBPACK_IMPORTED_MODULE_4__.getSmartShortDate)(new Date(post.date))]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "parsely-top-post-author",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "screen-reader-text",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Author', 'wp-parsely')
            }), post.author]
          })]
        })]
      })]
    })
  }, post.id);
}
/**
 * Returns the Post thumbnail with its div container. Returns an empty div if
 * the post has no thumbnail.
 *
 * @param {PostData} post The Post from which to get the data.
 */
function ListItemThumbnail(_a) {
  var post = _a.post;
  if (post.thumbnailUrl) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "parsely-top-post-thumbnail",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail', 'wp-parsely')
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
        src: post.thumbnailUrl,
        alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post thumbnail', 'wp-parsely')
      })]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "parsely-top-post-thumbnail",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "screen-reader-text",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post thumbnail not available', 'wp-parsely')
    })
  });
}
/**
 * Returns the Post title as a link (for editing the Post) or a div if the Post
 * has no valid ID.
 *
 * @param {TopPostDataProps} props The component's props.
 */
function PostListItemTitle(_a) {
  var post = _a.post;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
    className: "parsely-top-post-title",
    href: post.dashUrl,
    target: "_blank",
    rel: "noreferrer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "screen-reader-text",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View in Parse.ly (opens in new tab)', 'wp-parsely')
    }), post.title]
  });
}

/***/ }),

/***/ "./src/content-helper/dashboard-widget/components/top-posts.tsx":
/*!**********************************************************************!*\
  !*** ./src/content-helper/dashboard-widget/components/top-posts.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopPosts: function() { return /* binding */ TopPosts; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/select */ "./src/content-helper/common/select.tsx");
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../provider */ "./src/content-helper/dashboard-widget/provider.ts");
/* harmony import */ var _top_posts_list_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./top-posts-list-item */ "./src/content-helper/dashboard-widget/components/top-posts-list-item.tsx");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
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








var FETCH_RETRIES = 1;
/**
 * List of the top posts.
 */
function TopPosts() {
  var _this = this;
  var _a = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
    loading = _a[0],
    setLoading = _a[1];
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(),
    error = _b[0],
    setError = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    posts = _c[0],
    setPosts = _c[1];
  var _d = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Period.Days7),
    period = _d[0],
    setPeriodFilter = _d[1];
  var _e = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Metric.Views),
    metric = _e[0],
    setMetricFilter = _e[1];
  var _f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(1),
    page = _f[0],
    setPage = _f[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var provider = new _provider__WEBPACK_IMPORTED_MODULE_6__.DashboardWidgetProvider();
    var fetchPosts = function (retries) {
      return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
          provider.getTopPosts(period, metric, page).then(function (result) {
            setPosts(result);
            setLoading(false);
          }).catch(function (err) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (!(retries > 0 && err.retryFetch)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (r) {
                      return setTimeout(r, 500);
                    })];
                  case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchPosts(retries - 1)];
                  case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                  case 3:
                    setLoading(false);
                    setError(err);
                    _a.label = 4;
                  case 4:
                    return [2 /*return*/];
                }
              });
            });
          });

          return [2 /*return*/];
        });
      });
    };

    setLoading(true);
    fetchPosts(FETCH_RETRIES);
    return function () {
      setLoading(false);
      setPosts([]);
      setError(undefined);
    };
  }, [period, metric, page]);
  /**
   * Tracks the filter changes.
   *
   * @since 3.12.0
   *
   * @param {string} filter The filter name.
   * @param {Object} props  The filter properties.
   */
  var trackFilterChanges = function (filter, props) {
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('dash_widget_filter_changed', __assign({
      filter: filter
    }, props));
  };
  var filters = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "parsely-top-posts-filters",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_select__WEBPACK_IMPORTED_MODULE_4__.Select, {
      defaultValue: period,
      items: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Period).map(function (value) {
        return [value, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.getPeriodDescription)(value)];
      }),
      onChange: function (event) {
        if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.isInEnum)(event.target.value, _common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Period)) {
          setPeriodFilter(event.target.value);
          trackFilterChanges('period', {
            period: event.target.value
          });
          setPage(1);
        }
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_select__WEBPACK_IMPORTED_MODULE_4__.Select, {
      defaultValue: metric,
      items: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Metric).map(function (value) {
        return [value, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.getMetricDescription)(value)];
      }),
      onChange: function (event) {
        if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.isInEnum)(event.target.value, _common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.Metric)) {
          setMetricFilter(event.target.value);
          trackFilterChanges('metric', {
            metric: event.target.value
          });
          setPage(1);
        }
      }
    })]
  });
  var navigation = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "parsely-top-posts-navigation",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
      className: "parsely-top-posts-navigation-prev",
      disabled: page <= 1,
      onClick: function () {
        setPage(page - 1);
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('dash_widget_navigation', {
          navigation: 'previous',
          to_page: page - 1
        });
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<< Previous', 'wp-parsely')
    }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Current page */(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Page %1$d', 'wp-parsely'), page), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
      className: "parsely-top-posts-navigation-next",
      disabled: !loading && posts.length < _provider__WEBPACK_IMPORTED_MODULE_6__.TOP_POSTS_DEFAULT_LIMIT,
      onClick: function () {
        setPage(page + 1);
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('dash_widget_navigation', {
          navigation: 'next',
          to_page: page + 1
        });
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Next >>', 'wp-parsely')
    })]
  });
  // Show error message.
  if (error) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [filters, error.Message(), page > 1 && navigation]
    });
  }
  var spinner = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "parsely-spinner-wrapper",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [filters, loading ? spinner : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ol", {
      className: "parsely-top-posts",
      style: {
        counterReset: 'item ' + (page - 1) * _provider__WEBPACK_IMPORTED_MODULE_6__.TOP_POSTS_DEFAULT_LIMIT
      },
      children: posts.map(function (post) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_top_posts_list_item__WEBPACK_IMPORTED_MODULE_7__.TopPostListItem, {
          metric: metric,
          post: post
        }, post.id);
      })
    }), (posts.length >= _provider__WEBPACK_IMPORTED_MODULE_6__.TOP_POSTS_DEFAULT_LIMIT || page > 1) && navigation]
  });
}

/***/ }),

/***/ "./src/content-helper/dashboard-widget/provider.ts":
/*!*********************************************************!*\
  !*** ./src/content-helper/dashboard-widget/provider.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardWidgetProvider: function() { return /* binding */ DashboardWidgetProvider; },
/* harmony export */   TOP_POSTS_DEFAULT_LIMIT: function() { return /* binding */ TOP_POSTS_DEFAULT_LIMIT; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils/api */ "./src/content-helper/common/utils/api.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
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
 * Internal dependencies
 */


var TOP_POSTS_DEFAULT_LIMIT = 5;
var DashboardWidgetProvider = /** @class */function () {
  function DashboardWidgetProvider() {}
  /**
   * Returns the site's top posts.
   *
   * @param {Period} period The period to fetch data for.
   * @param {Metric} metric The metric to sort by.
   * @param {number} page   The page to fetch, defaults to the first page.
   *
   * @return {Promise<Array<PostData>>} Object containing message and posts.
   */
  DashboardWidgetProvider.prototype.getTopPosts = function (period, metric, page) {
    if (page === void 0) {
      page = 1;
    }
    return __awaiter(this, void 0, void 0, function () {
      var data, contentHelperError_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = [];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3,, 4]);
            return [4 /*yield*/, this.fetchTopPostsFromWpEndpoint(period, metric, page)];
          case 2:
            data = _a.sent();
            return [3 /*break*/, 4];
          case 3:
            contentHelperError_1 = _a.sent();
            return [2 /*return*/, Promise.reject(contentHelperError_1)];
          case 4:
            if (0 === data.length) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Top Posts data is available.', 'wp-parsely'), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperErrorCode.ParselyApiReturnedNoData, ''))];
            }
            return [2 /*return*/, data];
        }
      });
    });
  };
  /**
   * Fetches the site's top posts data from the WordPress REST API.
   *
   * @param {Period} period The period to fetch data for.
   * @param {Metric} metric The metric to sort by.
   * @param {number} page   The page to fetch.
   *
   * @return {Promise<Array<PostData>>} Array of fetched posts.
   */
  DashboardWidgetProvider.prototype.fetchTopPostsFromWpEndpoint = function (period, metric, page) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var response, wpError_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)('/wp-parsely/v1/stats/posts/', __assign(__assign({
                limit: TOP_POSTS_DEFAULT_LIMIT
              }, (0,_common_utils_api__WEBPACK_IMPORTED_MODULE_4__.getApiPeriodParams)(period)), {
                sort: metric,
                page: page,
                itm_source: 'wp-parsely-content-helper'
              }))
            })];
          case 1:
            response = _b.sent();
            return [3 /*break*/, 3];
          case 2:
            wpError_1 = _b.sent();
            return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperError(wpError_1.message, wpError_1.code))];
          case 3:
            if (response === null || response === void 0 ? void 0 : response.error) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperError(response.error.message, _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperErrorCode.ParselyApiResponseContainsError))];
            }
            return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []];
        }
      });
    });
  };
  return DashboardWidgetProvider;
}();


/***/ }),

/***/ "./src/js/telemetry/telemetry.ts":
/*!***************************************!*\
  !*** ./src/js/telemetry/telemetry.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

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
/*!******************************************************************!*\
  !*** ./src/content-helper/dashboard-widget/dashboard-widget.tsx ***!
  \******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_verify_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/verify-credentials */ "./src/content-helper/common/verify-credentials.tsx");
/* harmony import */ var _components_top_posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/top-posts */ "./src/content-helper/dashboard-widget/components/top-posts.tsx");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


window.addEventListener('load', function () {
  var container = document.querySelector('#wp-parsely-dashboard-widget > .inside');
  if (null !== container) {
    var root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_2__.VerifyCredentials, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_top_posts__WEBPACK_IMPORTED_MODULE_3__.TopPosts, {})
    }));
  }
}, false);
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*******************************************************************!*\
  !*** ./src/content-helper/dashboard-widget/dashboard-widget.scss ***!
  \*******************************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=dashboard-widget.js.map