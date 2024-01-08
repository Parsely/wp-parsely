/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-helper/common/components/beta-badge/component.tsx":
/*!***********************************************************************!*\
  !*** ./src/content-helper/common/components/beta-badge/component.tsx ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BetaBadge: function() { return /* binding */ BetaBadge; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _css_common_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/common.scss */ "./src/content-helper/common/css/common.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



/**
 * The BetaBadge component displays a badge with the specified text, color, and size.
 *
 * @since 3.13.0
 *
 * @param {BetaBadgeProps} props - The properties for the BetaBadge component.
 *
 * @return {JSX.Element} The BetaBadge component.
 */
var BetaBadge = function (_a) {
  var _b = _a.text,
    text = _b === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Beta', 'wp-parsely') : _b,
    _c = _a.color,
    color = _c === void 0 ? 'var(--parsely-green)' : _c,
    _d = _a.fontSize,
    fontSize = _d === void 0 ? '0.75rem' : _d;
  var badgeStyle = {
    backgroundColor: color,
    fontSize: fontSize
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wp-parsely-beta-badge",
    style: badgeStyle,
    children: text
  });
};

/***/ }),

/***/ "./src/content-helper/common/components/beta-badge/index.ts":
/*!******************************************************************!*\
  !*** ./src/content-helper/common/components/beta-badge/index.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BetaBadge: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.BetaBadge; }
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/content-helper/common/components/beta-badge/component.tsx");


/***/ }),

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

/***/ "./src/content-helper/common/icons/leaf-icon.tsx":
/*!*******************************************************!*\
  !*** ./src/content-helper/common/icons/leaf-icon.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeafIcon: function() { return /* binding */ LeafIcon; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

var LeafIcon = function (_a) {
  var _b = _a.size,
    size = _b === void 0 ? 24 : _b,
    _c = _a.className,
    className = _c === void 0 ? 'wp-parsely-icon' : _c;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    className: className,
    height: size,
    viewBox: "0 0 60 65",
    width: size,
    xmlns: "http://www.w3.org/2000/svg",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fill: "#5ba745",
      d: "M23.72,51.53c0-.18,0-.34-.06-.52a13.11,13.11,0,0,0-2.1-5.53A14.74,14.74,0,0,0,19.12,43c-.27-.21-.5-.11-.51.22l-.24,3.42c0,.33-.38.35-.49,0l-1.5-4.8a1.4,1.4,0,0,0-.77-.78,23.91,23.91,0,0,0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34,0-.45.21-.25.49l2.06,3.76c.2.27,0,.54-.29.33l-4.51-3.6a3.68,3.68,0,0,0-2.86-.48c-1,.16-2.44.46-2.44.46a.68.68,0,0,0-.39.25.73.73,0,0,0-.14.45S.41,43,.54,44a3.63,3.63,0,0,0,1.25,2.62L6.48,50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5,0-.4.37,0,0,.69,1.89,1.31,3.16a24,24,0,0,0,1.66,2.74,1.34,1.34,0,0,0,1,.52l5,.13c.33,0,.41.38.1.48L7.51,58c-.31.1-.34.35-.07.55a14.29,14.29,0,0,0,3.05,1.66,13.09,13.09,0,0,0,5.9.5,25.13,25.13,0,0,0,4.34-1,9.55,9.55,0,0,1-.08-1.2,9.32,9.32,0,0,1,3.07-6.91"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fill: "#5ba745",
      d: "M59.7,41.53a.73.73,0,0,0-.14-.45.68.68,0,0,0-.39-.25s-1.43-.3-2.44-.46a3.64,3.64,0,0,0-2.86.48l-4.51,3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49,0,0-2,.15-3.39.39a23.91,23.91,0,0,0-3.1.84,1.4,1.4,0,0,0-.77.78l-1.5,4.8c-.11.32-.48.3-.49,0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74,14.74,0,0,0-2.44,2.47A13.11,13.11,0,0,0,36.34,51c0,.18,0,.34-.06.52a9.26,9.26,0,0,1,3,8.1,24.1,24.1,0,0,0,4.34,1,13.09,13.09,0,0,0,5.9-.5,14.29,14.29,0,0,0,3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38,1.38,0,0,0,1-.52A24.6,24.6,0,0,0,57,52.92c.61-1.27,1.31-3.16,1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63,3.63,0,0,0,59.46,44c.13-1,.24-2.47.24-2.47"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fill: "#5ba745",
      d: "M46.5,25.61c0-.53-.35-.72-.8-.43l-4.86,2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2,2,0,0,0,.28-1.68,36.51,36.51,0,0,0-2.19-4.89,34,34,0,0,0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28,5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54,2.54,0,0,0-.66-1.64S35,4.27,33.88,3.27,30.78.69,30.78.69a1.29,1.29,0,0,0-1.54,0s-1.88,1.49-3.12,2.59-2.48,2.35-2.48,2.35A2.5,2.5,0,0,0,23,7.27l.27,8.93c0,.53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77,35.77,0,0,0-3,4.2,35.55,35.55,0,0,0-2,4.62,2,2,0,0,0,.27,1.67l4.67,6.24c.33.42.23,1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6,18.6,0,0,0,.83,5.07,20.16,20.16,0,0,0,5.37,7.77c3.19,3,5.93,7.8,7.45,11.08A9.6,9.6,0,0,1,30,49.09a9.31,9.31,0,0,1,2.86.45c1.52-3.28,4.26-8.11,7.44-11.09a20.46,20.46,0,0,0,5.09-7,19,19,0,0,0,1.11-5.82"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fill: "#5ba745",
      d: "M36.12,58.44A6.12,6.12,0,1,1,30,52.32a6.11,6.11,0,0,1,6.12,6.12"
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/excerpt-generator/components/excerpt-panel.tsx":
/*!***************************************************************************!*\
  !*** ./src/content-helper/excerpt-generator/components/excerpt-panel.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcerptPanel: function() { return /* binding */ ExcerptPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/wordcount */ "@wordpress/wordcount");
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/icons/leaf-icon */ "./src/content-helper/common/icons/leaf-icon.tsx");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../provider */ "./src/content-helper/excerpt-generator/provider.ts");
/* harmony import */ var _common_components_beta_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/components/beta-badge */ "./src/content-helper/common/components/beta-badge/index.ts");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
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




/**
 * The PostExcerptGenerator component displays the excerpt textarea and the Parse.ly AI controls.
 *
 * @since 3.13.0
 */
var PostExcerptGenerator = function () {
  var _a = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false),
    isLoading = _a[0],
    setLoading = _a[1];
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(''),
    generatedExcerpt = _b[0],
    setGeneratedExcerpt = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(),
    error = _c[0],
    setError = _c[1];
  var editPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.store).editPost;
  var excerptGeneratorProvider = new _provider__WEBPACK_IMPORTED_MODULE_9__.ExcerptGeneratorProvider();
  // Get the current excerpt, post content, and post title.
  var _d = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(function (select) {
      var _a, _b;
      var _c = select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.store),
        getEditedPostAttribute = _c.getEditedPostAttribute,
        getEditedPostContent = _c.getEditedPostContent;
      var content = getEditedPostContent();
      if (!content) {
        content = '';
      }
      var document = new window.DOMParser().parseFromString(content, 'text/html');
      var documentRawText = ((_a = document.body.textContent) !== null && _a !== void 0 ? _a : document.body.innerText) || '';
      // Keep only one break line (\n) between blocks.
      content = documentRawText.replace(/\n{2,}/g, '\n').trim();
      return {
        excerpt: (_b = getEditedPostAttribute('excerpt')) !== null && _b !== void 0 ? _b : '',
        postContent: content,
        postTitle: getEditedPostAttribute('title')
      };
    }, []),
    excerpt = _d.excerpt,
    postContent = _d.postContent,
    postTitle = _d.postTitle;
  var hasGeneratedExcerpt = generatedExcerpt.length > 0;
  var wordCount = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_6__.count)(generatedExcerpt || excerpt, 'words', {});
  var wordCountString = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)(
  // Translators: %1$s the number of words in the excerpt.
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__._n)('%1$s word', '%1$s words', wordCount, 'wp-parsely'), wordCount);
  // Scroll the textarea to the top when the generated excerpt changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    var textarea = document.querySelector('.editor-post-excerpt textarea');
    if (textarea) {
      textarea.scrollTop = 0;
    }
  }, [generatedExcerpt]);
  /**
   * Generates an excerpt using the Parse.ly AI.
   *
   * @since 3.13.0
   */
  var generateExcerpt = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var requestedExcerpt, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_11__.Telemetry.trackEvent('excerpt_generator_pressed');
            return [4 /*yield*/, excerptGeneratorProvider.generateExcerpt(postTitle, postContent)];
          case 2:
            requestedExcerpt = _a.sent();
            setGeneratedExcerpt(requestedExcerpt);
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            setError(err_1);
            return [3 /*break*/, 5];
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Accepts the generated excerpt and updates the post.
   *
   * @since 3.13.0
   */
  var acceptGeneratedExcerpt = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, editPost({
              excerpt: generatedExcerpt
            })];
          case 1:
            _a.sent();
            setGeneratedExcerpt('');
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_11__.Telemetry.trackEvent('excerpt_generator_accepted');
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Discards the generated excerpt.
   *
   * @since 3.13.0
   */
  var discardGeneratedExcerpt = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setGeneratedExcerpt('');
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_11__.Telemetry.trackEvent('excerpt_generator_discarded');
        return [2 /*return*/];
      });
    });
  };
  /**
   * Returns the value for the excerpt textarea.
   *
   * @since 3.13.0
   */
  var getExcerptTextareaValue = function () {
    if (hasGeneratedExcerpt) {
      return generatedExcerpt;
    }
    return excerpt;
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "editor-post-excerpt",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      style: {
        position: 'relative'
      },
      children: [isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: 'editor-post-excerpt__spinner' + (wordCount > 0 ? ' has-word-count' : ''),
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextareaControl, {
        __nextHasNoMarginBottom: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Write an excerpt (optional)', 'wp-parsely'),
        className: "editor-post-excerpt__textarea",
        onChange: function (value) {
          return editPost({
            excerpt: value
          });
        },
        disabled: isLoading || hasGeneratedExcerpt,
        value: getExcerptTextareaValue(),
        help: wordCount ? wordCountString : null
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ExternalLink, {
      href: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('https://wordpress.org/documentation/article/page-post-settings-sidebar/#excerpt', 'wp-parsely'),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Learn more about manual excerpts', 'wp-parsely')
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wp-parsely-excerpt-generator",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wp-parsely-excerpt-generator-header",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_8__.LeafIcon, {
          size: 20
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wp-parsely-excerpt-generator-header-label",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parse.ly AI', 'wp-parsely')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_components_beta_badge__WEBPACK_IMPORTED_MODULE_10__.BetaBadge, {})]
      }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Notice, {
        status: "info",
        isDismissible: false,
        className: "wp-parsely-excerpt-generator-error",
        children: error.Message()
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wp-parsely-excerpt-generator-controls",
        children: hasGeneratedExcerpt ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
            variant: "secondary",
            onClick: acceptGeneratedExcerpt,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Accept', 'wp-parsely')
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
            isDestructive: true,
            variant: "secondary",
            onClick: discardGeneratedExcerpt,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Discard', 'wp-parsely')
          })]
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          onClick: generateExcerpt,
          variant: "primary",
          isBusy: isLoading,
          disabled: isLoading,
          children: isLoading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Generating…', 'wp-parsely') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Generate Excerpt', 'wp-parsely')
        })
      })]
    })]
  });
};
/**
 * The ExcerptPanel component verifies that the current post type supports excerpts,
 * and then renders the PostExcerptGenerator component.
 *
 * @since 3.13.0
 */
var ExcerptPanel = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.PostTypeSupportCheck, {
    supportKeys: "excerpt",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__.PluginDocumentSettingPanel, {
      name: "parsely-post-excerpt",
      title: "Excerpt",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PostExcerptGenerator, {})
    })
  });
};

/***/ }),

/***/ "./src/content-helper/excerpt-generator/provider.ts":
/*!**********************************************************!*\
  !*** ./src/content-helper/excerpt-generator/provider.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcerptGeneratorProvider: function() { return /* binding */ ExcerptGeneratorProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
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

/**
 * Provides the generate excerpt functionality to be used in other components.
 *
 * @since 3.13.0
 */
var ExcerptGeneratorProvider = /** @class */function () {
  function ExcerptGeneratorProvider() {}
  /**
   * Generates an excerpt for a given post.
   *
   * @param {string} title   The title of the post.
   * @param {string} content The content of the post.
   *
   * @return {Promise<string>} The generated excerpt.
   */
  ExcerptGeneratorProvider.prototype.generateExcerpt = function (title, content) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var response, wpError_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)('/wp-parsely/v1/content-suggestions/suggest-meta-description', {
                title: title,
                content: content
              })
            })];
          case 1:
            response = _b.sent();
            return [3 /*break*/, 3];
          case 2:
            wpError_1 = _b.sent();
            return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__.ContentHelperError(wpError_1.message, wpError_1.code))];
          case 3:
            if (response === null || response === void 0 ? void 0 : response.error) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__.ContentHelperError(response.error.message, _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__.ContentHelperErrorCode.ParselyApiResponseContainsError))];
            }
            return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : ''];
        }
      });
    });
  };
  return ExcerptGeneratorProvider;
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

/***/ "./src/content-helper/common/css/common.scss":
/*!***************************************************!*\
  !*** ./src/content-helper/common/css/common.scss ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

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

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "@wordpress/wordcount":
/*!***********************************!*\
  !*** external ["wp","wordcount"] ***!
  \***********************************/
/***/ (function(module) {

module.exports = window["wp"]["wordcount"];

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
/*!********************************************************************!*\
  !*** ./src/content-helper/excerpt-generator/excerpt-generator.tsx ***!
  \********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_excerpt_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/excerpt-panel */ "./src/content-helper/excerpt-generator/components/excerpt-panel.tsx");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

// TODO: Get the plugin ID from the editor sidebar file.
var PARSELY_SIDEBAR_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';
/**
 * The ExcerptGenerator function registers the custom excerpt panel and removes
 * the default excerpt panel.
 *
 * @since 3.13.0
 *
 * @param {never}  settings Settings from the plugins.registerPlugin filter. Not used.
 * @param {string} name     The plugin name.
 */
var ExcerptGenerator = function (settings, name) {
  var _a, _b;
  if (name !== PARSELY_SIDEBAR_PLUGIN_ID) {
    return settings;
  }
  var isJetpackAiEnabled = (_a = window === null || window === void 0 ? void 0 : window.Jetpack_Editor_Initial_State) === null || _a === void 0 ? void 0 : _a.available_blocks['ai-content-lens'];
  if (isJetpackAiEnabled) {
    // eslint-disable-next-line no-console
    console.log('Parse.ly: Jetpack AI is enabled and will be disabled.');
    // Remove Jetpack AI excerpt block.
    // https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/jetpack/extensions/plugins/ai-content-lens/editor.js#L52-L56
    (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.removeFilter)('blocks.registerBlockType', 'jetpack/ai-content-lens-features');
  }
  // Register the custom excerpt panel.
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)('wp-parsely-excerpt-generator', {
    render: _components_excerpt_panel__WEBPACK_IMPORTED_MODULE_3__.ExcerptPanel
  });
  // Remove the excerpt panel by dispatching an action.
  (_b = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/edit-post')) === null || _b === void 0 ? void 0 : _b.removeEditorPanel('post-excerpt');
  return settings;
};
// Add the ExcerptGenerator function to the plugins.registerPlugin filter.
// Priority is set to 1000 to ensure that the function runs as late as possible.
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('plugins.registerPlugin', 'wp-parsely-excerpt-generator', ExcerptGenerator, 1000);
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*********************************************************************!*\
  !*** ./src/content-helper/excerpt-generator/excerpt-generator.scss ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=excerpt-generator.js.map