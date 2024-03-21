/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/chart-bar.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chart-bar.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const chartBar = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z",
  clipRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (chartBar);
//# sourceMappingURL=chart-bar.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/check.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const check = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
}));
/* harmony default export */ __webpack_exports__["default"] = (check);
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/copy-small.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/copy-small.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const copySmall = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M5.625 5.5h9.75c.069 0 .125.056.125.125v9.75a.125.125 0 0 1-.125.125h-9.75a.125.125 0 0 1-.125-.125v-9.75c0-.069.056-.125.125-.125ZM4 5.625C4 4.728 4.728 4 5.625 4h9.75C16.273 4 17 4.728 17 5.625v9.75c0 .898-.727 1.625-1.625 1.625h-9.75A1.625 1.625 0 0 1 4 15.375v-9.75Zm14.5 11.656v-9H20v9C20 18.8 18.77 20 17.251 20H6.25v-1.5h11.001c.69 0 1.249-.528 1.249-1.219Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (copySmall);
//# sourceMappingURL=copy-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/edit.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/edit.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pencil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pencil */ "./node_modules/@wordpress/icons/build-module/library/pencil.js");
/**
 * Internal dependencies
 */


/* harmony default export */ __webpack_exports__["default"] = (_pencil__WEBPACK_IMPORTED_MODULE_0__["default"]);
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/external.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/external.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const external = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19.5 4.5h-7V6h4.44l-5.97 5.97 1.06 1.06L18 7.06v4.44h1.5v-7Zm-13 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3H17v3a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h3V5.5h-3Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (external);
//# sourceMappingURL=external.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/link.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const link = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (link);
//# sourceMappingURL=link.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/more-horizontal.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more-horizontal.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const moreHorizontal = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11 13h2v-2h-2v2zm-6 0h2v-2H5v2zm12-2v2h2v-2h-2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (moreHorizontal);
//# sourceMappingURL=more-horizontal.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more-vertical.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const moreVertical = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (moreVertical);
//# sourceMappingURL=more-vertical.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/pencil.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pencil.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const pencil = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (pencil);
//# sourceMappingURL=pencil.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/people.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/people.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const people = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
  fillRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (people);
//# sourceMappingURL=people.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/pin-small.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pin-small.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const pinSmall = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10.97 10.159a3.382 3.382 0 0 0-2.857.955l1.724 1.723-2.836 2.913L7 17h1.25l2.913-2.837 1.723 1.723a3.38 3.38 0 0 0 .606-.825c.33-.63.446-1.343.35-2.032L17 10.695 13.305 7l-2.334 3.159Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (pinSmall);
//# sourceMappingURL=pin-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/pin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pin.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const pin = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m21.5 9.1-6.6-6.6-4.2 5.6c-1.2-.1-2.4.1-3.6.7-.1 0-.1.1-.2.1-.5.3-.9.6-1.2.9l3.7 3.7-5.7 5.7v1.1h1.1l5.7-5.7 3.7 3.7c.4-.4.7-.8.9-1.2.1-.1.1-.2.2-.3.6-1.1.8-2.4.6-3.6l5.6-4.1zm-7.3 3.5.1.9c.1.9 0 1.8-.4 2.6l-6-6c.8-.4 1.7-.5 2.6-.4l.9.1L15 4.9 19.1 9l-4.9 3.6z"
}));
/* harmony default export */ __webpack_exports__["default"] = (pin);
//# sourceMappingURL=pin.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/reset.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/reset.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M7 11.5h10V13H7z"
}));
/* harmony default export */ __webpack_exports__["default"] = (reset);
//# sourceMappingURL=reset.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/rotate-left.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/rotate-left.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const rotateLeft = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4V2.2L9 4.8l3 2.5V5.5c3.6 0 6.5 2.9 6.5 6.5 0 2.9-1.9 5.3-4.5 6.2v.2l-.1-.2c-.4.1-.7.2-1.1.2l.2 1.5c.3 0 .6-.1 1-.2 3.5-.9 6-4 6-7.7 0-4.4-3.6-8-8-8zm-7.9 7l1.5.2c.1-1.2.5-2.3 1.2-3.2l-1.1-.9C4.8 8.2 4.3 9.6 4.1 11zm1.5 1.8l-1.5.2c.1.7.3 1.4.5 2 .3.7.6 1.3 1 1.8l1.2-.8c-.3-.5-.6-1-.8-1.5s-.4-1.1-.4-1.7zm1.5 5.5c1.1.9 2.4 1.4 3.8 1.6l.2-1.5c-1.1-.1-2.2-.5-3.1-1.2l-.9 1.1z"
}));
/* harmony default export */ __webpack_exports__["default"] = (rotateLeft);
//# sourceMappingURL=rotate-left.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/seen.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/seen.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const seen = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M3.99961 13C4.67043 13.3354 4.6703 13.3357 4.67017 13.3359L4.67298 13.3305C4.67621 13.3242 4.68184 13.3135 4.68988 13.2985C4.70595 13.2686 4.7316 13.2218 4.76695 13.1608C4.8377 13.0385 4.94692 12.8592 5.09541 12.6419C5.39312 12.2062 5.84436 11.624 6.45435 11.0431C7.67308 9.88241 9.49719 8.75 11.9996 8.75C14.502 8.75 16.3261 9.88241 17.5449 11.0431C18.1549 11.624 18.6061 12.2062 18.9038 12.6419C19.0523 12.8592 19.1615 13.0385 19.2323 13.1608C19.2676 13.2218 19.2933 13.2686 19.3093 13.2985C19.3174 13.3135 19.323 13.3242 19.3262 13.3305L19.3291 13.3359C19.3289 13.3357 19.3288 13.3354 19.9996 13C20.6704 12.6646 20.6703 12.6643 20.6701 12.664L20.6697 12.6632L20.6688 12.6614L20.6662 12.6563L20.6583 12.6408C20.6517 12.6282 20.6427 12.6108 20.631 12.5892C20.6078 12.5459 20.5744 12.4852 20.5306 12.4096C20.4432 12.2584 20.3141 12.0471 20.1423 11.7956C19.7994 11.2938 19.2819 10.626 18.5794 9.9569C17.1731 8.61759 14.9972 7.25 11.9996 7.25C9.00203 7.25 6.82614 8.61759 5.41987 9.9569C4.71736 10.626 4.19984 11.2938 3.85694 11.7956C3.68511 12.0471 3.55605 12.2584 3.4686 12.4096C3.42484 12.4852 3.39142 12.5459 3.36818 12.5892C3.35656 12.6108 3.34748 12.6282 3.34092 12.6408L3.33297 12.6563L3.33041 12.6614L3.32948 12.6632L3.32911 12.664C3.32894 12.6643 3.32879 12.6646 3.99961 13ZM11.9996 16C13.9326 16 15.4996 14.433 15.4996 12.5C15.4996 10.567 13.9326 9 11.9996 9C10.0666 9 8.49961 10.567 8.49961 12.5C8.49961 14.433 10.0666 16 11.9996 16Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (seen);
//# sourceMappingURL=seen.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const trash = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (trash);
//# sourceMappingURL=trash.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/undo.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/undo.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const undo = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"
}));
/* harmony default export */ __webpack_exports__["default"] = (undo);
//# sourceMappingURL=undo.js.map

/***/ }),

/***/ "./src/content-helper/common/components/input-range/component.tsx":
/*!************************************************************************!*\
  !*** ./src/content-helper/common/components/input-range/component.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputRange: function() { return /* binding */ InputRange; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

/**
 * Component that renders a hybrid input range control.
 * On one side you have the number control and on the other side the range control.
 *
 * @since 3.14.0
 *
 * @param {InputRangeProps} props The component's props.
 */
var InputRange = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    max = _a.max,
    min = _a.min,
    suffix = _a.suffix,
    size = _a.size,
    label = _a.label,
    initialPosition = _a.initialPosition,
    disabled = _a.disabled,
    className = _a.className;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "parsely-inputrange-control ".concat(className ? className : ''),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
      className: 'parsely-inputrange-control__label',
      level: 3,
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: 'parsely-inputrange-control__controls',
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
        disabled: disabled,
        value: value,
        suffix: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControlSuffixWrapper, {
          children: suffix
        }),
        size: size !== null && size !== void 0 ? size : '__unstable-large',
        min: min,
        max: max,
        onChange: function (newValue) {
          var numericValue = parseInt(newValue, 10);
          if (isNaN(numericValue)) {
            return;
          }
          onChange(numericValue);
        }
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
        disabled: disabled,
        value: value,
        showTooltip: false,
        initialPosition: initialPosition,
        onChange: function (newValue) {
          onChange(newValue);
        },
        withInputField: false,
        min: min,
        max: max
      })]
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/common/components/input-range/index.ts":
/*!*******************************************************************!*\
  !*** ./src/content-helper/common/components/input-range/index.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputRange: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.InputRange; }
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/content-helper/common/components/input-range/component.tsx");


/***/ }),

/***/ "./src/content-helper/common/components/persona-selector/component.tsx":
/*!*****************************************************************************!*\
  !*** ./src/content-helper/common/components/persona-selector/component.tsx ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARSELY_PERSONAS: function() { return /* binding */ PARSELY_PERSONAS; },
/* harmony export */   PersonaSelector: function() { return /* binding */ PersonaSelector; },
/* harmony export */   getLabel: function() { return /* binding */ getLabel; },
/* harmony export */   isCustomPersona: function() { return /* binding */ isCustomPersona; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/edit.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _icons_more_arrow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons/more-arrow */ "./src/content-helper/common/icons/more-arrow.tsx");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

/**
 * List of the available personas.
 * Each persona has a label and an optional icon.
 *
 * @since 3.13.0
 */
var PARSELY_PERSONAS = {
  journalist: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Journalist', 'wp-parsely')
  },
  editorialWriter: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Editorial Writer', 'wp-parsely')
  },
  investigativeReporter: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Investigative Reporter', 'wp-parsely')
  },
  techAnalyst: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tech Analyst', 'wp-parsely')
  },
  businessAnalyst: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Business Analyst', 'wp-parsely')
  },
  culturalCommentator: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cultural Commentator', 'wp-parsely')
  },
  scienceCorrespondent: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Science Correspondent', 'wp-parsely')
  },
  politicalAnalyst: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Political Analyst', 'wp-parsely')
  },
  healthWellnessAdvocate: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Health and Wellness Advocate', 'wp-parsely')
  },
  environmentalJournalist: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Environmental Journalist', 'wp-parsely')
  },
  custom: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom Persona', 'wp-parsely'),
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  }
};
var PERSONAS_LIST = Object.keys(PARSELY_PERSONAS);
/**
 * Returns the value for a given persona.
 *
 * @since 3.13.0
 *
 * @param {PersonaProp} persona The persona to get the label for.
 *
 * @return {string} The value for the given persona.
 */
var getLabel = function (persona) {
  if (persona === 'custom' || persona === '') {
    return PARSELY_PERSONAS.custom.label;
  }
  if (isCustomPersona(persona)) {
    return persona;
  }
  return PARSELY_PERSONAS[persona].label;
};
/**
 * Returns whether a given persona is a custom persona.
 *
 * @since 3.13.0
 *
 * @param {PersonaProp} persona
 *
 * @return {boolean} Whether the given persona is a custom persona.
 */
var isCustomPersona = function (persona) {
  return !PERSONAS_LIST.includes(persona) || persona === 'custom';
};
/**
 * CustomPersona component.
 *
 * Allows the user to enter a custom persona.
 *
 * @since 3.13.0
 *
 * @param {CustomPersonaProps} props The properties for the CustomPersona component.
 */
var CustomPersona = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(''),
    customPersona = _b[0],
    setCustomPersona = _b[1];
  var debouncedOnChange = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(onChange, 500);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "parsely-persona-selector-custom",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: customPersona || value,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter a custom persona…', 'wp-parsely'),
      onChange: function (newPersona) {
        // If the persona is empty, set it to an empty string, and avoid debouncing.
        if ('' === newPersona) {
          onChange('');
          setCustomPersona('');
          return;
        }
        // Truncate the persona to 32 characters.
        if (newPersona.length > 32) {
          newPersona = newPersona.slice(0, 32);
        }
        debouncedOnChange(newPersona);
        setCustomPersona(newPersona);
      }
    })
  });
};
/**
 * Persona Selector dropdown menu.
 *
 * Allows the user to select the persona for their AI generated content.
 *
 * @since 3.13.0
 *
 * @param {PersonaSelectorProps} props The properties for the PersonaSelector component.
 */
var PersonaSelector = function (_a) {
  var persona = _a.persona,
    _b = _a.value,
    value = _b === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a persona…', 'wp-parsely') : _b,
    _c = _a.label,
    label = _c === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Persona', 'wp-parsely') : _c,
    onChange = _a.onChange,
    onDropdownChange = _a.onDropdownChange,
    _d = _a.disabled,
    disabled = _d === void 0 ? false : _d,
    _e = _a.allowCustom,
    allowCustom = _e === void 0 ? false : _e;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Disabled, {
    isDisabled: disabled,
    children: [label && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wp-parsely-dropdown-label",
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Persona', 'wp-parsely'),
      className: 'parsely-persona-selector-dropdown' + (disabled ? ' is-disabled' : ''),
      popoverProps: {
        className: 'wp-parsely-popover'
      },
      toggleProps: {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "parsely-persona-selector-label",
            children: isCustomPersona(persona) ? PARSELY_PERSONAS.custom.label : value
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons_more_arrow__WEBPACK_IMPORTED_MODULE_5__.MoreArrow, {})]
        })
      },
      children: function (_a) {
        var onClose = _a.onClose;
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Persona', 'wp-parsely'),
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: PERSONAS_LIST.map(function (singlePersona) {
              if (!allowCustom && singlePersona === 'custom') {
                return null;
              }
              var personaData = PARSELY_PERSONAS[singlePersona];
              var isSelected = singlePersona === persona || isCustomPersona(persona) && singlePersona === 'custom';
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                isSelected: isSelected,
                className: isSelected ? 'is-selected' : '',
                role: "menuitemradio",
                onClick: function () {
                  onDropdownChange === null || onDropdownChange === void 0 ? void 0 : onDropdownChange(singlePersona);
                  onChange(singlePersona);
                  onClose();
                  // Focus the input when the custom persona is selected.
                  if (singlePersona === 'custom') {
                    // Wait for the input to be rendered.
                    setTimeout(function () {
                      var inputElement = document.querySelector(".parsely-persona-selector-custom input");
                      if (inputElement) {
                        inputElement.focus();
                      }
                    }, 0);
                  }
                },
                children: [personaData.icon && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  icon: personaData.icon
                }), personaData.label]
              }, singlePersona);
            })
          })
        });
      }
    }), allowCustom && isCustomPersona(persona) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CustomPersona, {
      onChange: function (currentPersona) {
        if ('' === currentPersona) {
          onChange('custom');
          return;
        }
        onChange(currentPersona);
      },
      value: persona === 'custom' ? '' : persona
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/common/components/persona-selector/index.ts":
/*!************************************************************************!*\
  !*** ./src/content-helper/common/components/persona-selector/index.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARSELY_PERSONAS: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.PARSELY_PERSONAS; },
/* harmony export */   PersonaSelector: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.PersonaSelector; },
/* harmony export */   getPersonaLabel: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.getLabel; }
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/content-helper/common/components/persona-selector/component.tsx");


/***/ }),

/***/ "./src/content-helper/common/components/tone-selector/component.tsx":
/*!**************************************************************************!*\
  !*** ./src/content-helper/common/components/tone-selector/component.tsx ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARSELY_TONES: function() { return /* binding */ PARSELY_TONES; },
/* harmony export */   ToneSelector: function() { return /* binding */ ToneSelector; },
/* harmony export */   getLabel: function() { return /* binding */ getLabel; },
/* harmony export */   isCustomTone: function() { return /* binding */ isCustomTone; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/edit.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _icons_more_arrow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons/more-arrow */ "./src/content-helper/common/icons/more-arrow.tsx");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

/**
 * List of the available tones.
 * Each tone has a label and an optional icon.
 *
 * @since 3.13.0
 */
var PARSELY_TONES = {
  neutral: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Neutral', 'wp-parsely')
  },
  formal: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Formal', 'wp-parsely')
  },
  humorous: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Humorous', 'wp-parsely')
  },
  confident: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Confident', 'wp-parsely')
  },
  provocative: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Provocative', 'wp-parsely')
  },
  serious: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Serious', 'wp-parsely')
  },
  inspirational: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Inspirational', 'wp-parsely')
  },
  skeptical: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Skeptical', 'wp-parsely')
  },
  conversational: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Conversational', 'wp-parsely')
  },
  analytical: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Analytical', 'wp-parsely')
  },
  custom: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom Tone', 'wp-parsely'),
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  }
};
var TONE_LIST = Object.keys(PARSELY_TONES);
/**
 * Returns the value for a given tone.
 *
 * @since 3.13.0
 *
 * @param {ToneProp} tone The tone to get the label for.
 *
 * @return {string} The value for the given tone.
 */
var getLabel = function (tone) {
  if (tone === 'custom' || tone === '') {
    return PARSELY_TONES.custom.label;
  }
  if (isCustomTone(tone)) {
    return tone;
  }
  return PARSELY_TONES[tone].label;
};
/**
 * Returns whether a given tone is a custom tone.
 *
 * @since 3.13.0
 *
 * @param {ToneProp} tone
 *
 * @return {boolean} Whether the given tone is a custom tone.
 */
var isCustomTone = function (tone) {
  return !TONE_LIST.includes(tone) || tone === 'custom';
};
/**
 * Custom Tone component.
 *
 * Allows the user to enter a custom tone.
 *
 * @since 3.13.0
 *
 * @param {CustomToneProps} props The properties for the CustomTone component.
 */
var CustomTone = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(''),
    customTone = _b[0],
    setCustomTone = _b[1];
  var debouncedOnChange = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(onChange, 500);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "parsely-tone-selector-custom",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: customTone || value,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter a custom tone', 'wp-parsely'),
      onChange: function (newTone) {
        // If the tone is empty, set it to an empty string, and avoid debouncing.
        if ('' === newTone) {
          onChange('');
          setCustomTone('');
          return;
        }
        // Truncate the tone to 32 characters.
        if (newTone.length > 32) {
          newTone = newTone.slice(0, 32);
        }
        debouncedOnChange(newTone);
        setCustomTone(newTone);
      }
    })
  });
};
/**
 * Tone Selector dropdown menu.
 *
 * Allows the user to select a tone for their AI generated content.
 *
 * @since 3.13.0
 *
 * @param {ToneSelectorProps} props The properties for the ToneSelector component.
 */
var ToneSelector = function (_a) {
  var tone = _a.tone,
    _b = _a.value,
    value = _b === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a tone', 'wp-parsely') : _b,
    _c = _a.label,
    label = _c === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tone', 'wp-parsely') : _c,
    onChange = _a.onChange,
    onDropdownChange = _a.onDropdownChange,
    _d = _a.disabled,
    disabled = _d === void 0 ? false : _d,
    _e = _a.allowCustom,
    allowCustom = _e === void 0 ? false : _e;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Disabled, {
    isDisabled: disabled,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wp-parsely-dropdown-label",
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tone', 'wp-parsely'),
      className: 'parsely-tone-selector-dropdown' + (disabled ? ' is-disabled' : ''),
      popoverProps: {
        className: 'wp-parsely-popover'
      },
      toggleProps: {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "parsely-tone-selector-label",
            children: isCustomTone(tone) ? PARSELY_TONES.custom.label : value
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons_more_arrow__WEBPACK_IMPORTED_MODULE_5__.MoreArrow, {})]
        })
      },
      children: function (_a) {
        var onClose = _a.onClose;
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a tone', 'wp-parsely'),
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: TONE_LIST.map(function (singleTone) {
              if (!allowCustom && singleTone === 'custom') {
                return null;
              }
              var toneData = PARSELY_TONES[singleTone];
              var isSelected = singleTone === tone || isCustomTone(tone) && singleTone === 'custom';
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                isSelected: isSelected,
                className: isSelected ? 'is-selected' : '',
                role: "menuitemradio",
                onClick: function () {
                  onDropdownChange === null || onDropdownChange === void 0 ? void 0 : onDropdownChange(singleTone);
                  onChange(singleTone);
                  onClose();
                  // Focus the input when the custom tone is selected.
                  if (singleTone === 'custom') {
                    // Wait for the input to be rendered.
                    setTimeout(function () {
                      var inputElement = document.querySelector(".parsely-tone-selector-custom input");
                      if (inputElement) {
                        inputElement.focus();
                      }
                    }, 0);
                  }
                },
                children: [toneData.icon && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  icon: toneData.icon
                }), toneData.label]
              }, singleTone);
            })
          })
        });
      }
    }), allowCustom && isCustomTone(tone) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CustomTone, {
      onChange: function (currentTone) {
        if ('' === currentTone) {
          onChange('custom');
          return;
        }
        onChange(currentTone);
      },
      value: tone === 'custom' ? '' : tone
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/common/components/tone-selector/index.ts":
/*!*********************************************************************!*\
  !*** ./src/content-helper/common/components/tone-selector/index.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARSELY_TONES: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.PARSELY_TONES; },
/* harmony export */   ToneSelector: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.ToneSelector; },
/* harmony export */   getToneLabel: function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.getLabel; }
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/content-helper/common/components/tone-selector/component.tsx");


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
  ContentHelperErrorCode["PluginCredentialsNotSetMessageDetected"] = "parsely_credentials_not_set_message_detected";
  ContentHelperErrorCode["PluginSettingsApiSecretNotSet"] = "parsely_api_secret_not_set";
  ContentHelperErrorCode["PluginSettingsSiteIdNotSet"] = "parsely_site_id_not_set";
  ContentHelperErrorCode["PostIsNotPublished"] = "ch_post_not_published";
  // Suggestions API.
  ContentHelperErrorCode["ParselySuggestionsApiAuthUnavailable"] = "AUTH_UNAVAILABLE";
  ContentHelperErrorCode["ParselySuggestionsApiNoAuthentication"] = "NO_AUTHENTICATION";
  ContentHelperErrorCode["ParselySuggestionsApiNoAuthorization"] = "NO_AUTHORIZATION";
  ContentHelperErrorCode["ParselySuggestionsApiNoData"] = "NO_DATA";
  ContentHelperErrorCode["ParselySuggestionsApiOpenAiError"] = "OPENAI_ERROR";
  ContentHelperErrorCode["ParselySuggestionsApiOpenAiSchema"] = "OPENAI_SCHEMA";
  ContentHelperErrorCode["ParselySuggestionsApiOpenAiUnavailable"] = "OPENAI_UNAVAILABLE";
  ContentHelperErrorCode["ParselySuggestionsApiSchemaError"] = "SCHEMA_ERROR";
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
    var noRetryFetchErrors = [ContentHelperErrorCode.ParselyApiForbidden, ContentHelperErrorCode.ParselyApiResponseContainsError, ContentHelperErrorCode.ParselyApiReturnedNoData, ContentHelperErrorCode.ParselyApiReturnedTooManyResults, ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected, ContentHelperErrorCode.PluginSettingsApiSecretNotSet, ContentHelperErrorCode.PluginSettingsSiteIdNotSet, ContentHelperErrorCode.PostIsNotPublished,
    // Don't perform any fetch retries for the Suggestions API due to
    // its time-consuming operations.
    ContentHelperErrorCode.ParselySuggestionsApiAuthUnavailable, ContentHelperErrorCode.ParselySuggestionsApiNoAuthentication, ContentHelperErrorCode.ParselySuggestionsApiNoAuthorization, ContentHelperErrorCode.ParselySuggestionsApiNoData, ContentHelperErrorCode.ParselySuggestionsApiOpenAiError, ContentHelperErrorCode.ParselySuggestionsApiOpenAiSchema, ContentHelperErrorCode.ParselySuggestionsApiOpenAiUnavailable, ContentHelperErrorCode.ParselySuggestionsApiSchemaError];
    _this.retryFetch = !noRetryFetchErrors.includes(_this.code);
    // Set the prototype explicitly.
    Object.setPrototypeOf(_this, ContentHelperError.prototype);
    // Errors that need rephrasing.
    if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiNoAuthorization) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This AI-powered feature is opt-in. To gain access, please submit a request ' + '<a href="https://wpvip.com/parsely-content-helper/" target="_blank" rel="noreferrer">here</a>.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiOpenAiError || _this.code === ContentHelperErrorCode.ParselySuggestionsApiOpenAiUnavailable) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API returned an internal server error. Please retry with a different input, or try again later.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.HttpRequestFailed && _this.message.includes('cURL error 28')) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API did not respond in a timely manner. Please try again later.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiSchemaError) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API returned a validation error. Please try again with different parameters.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiNoData) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API couldn\'t find any relevant data to fulfill the request. Please retry with a different input.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiOpenAiSchema) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API returned an incorrect response. Please try again later.', 'wp-parsely');
    } else if (_this.code === ContentHelperErrorCode.ParselySuggestionsApiAuthUnavailable) {
      _this.message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API is currently unavailable. Please try again later.', 'wp-parsely');
    }
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
    if (this.code === ContentHelperErrorCode.ParselyApiForbidden || this.code === ContentHelperErrorCode.ParselySuggestionsApiNoAuthentication) {
      this.hint = this.Hint((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.", 'wp-parsely'));
    }
    if (this.code === ContentHelperErrorCode.HttpRequestFailed) {
      this.hint = this.Hint((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Parse.ly API cannot be reached. Please verify that you are online.', 'wp-parsely'));
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

/***/ "./src/content-helper/common/icons/ai-icon.tsx":
/*!*****************************************************!*\
  !*** ./src/content-helper/common/icons/ai-icon.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AiIcon: function() { return /* binding */ AiIcon; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var AiIcon = function (_a) {
  var _b = _a.size,
    size = _b === void 0 ? 24 : _b,
    _c = _a.className,
    className = _c === void 0 ? 'wp-parsely-icon' : _c;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M8.18983 5.90381L8.83642 7.54325L10.4758 8.18983L8.83642 8.8364L8.18983 10.4759L7.54324 8.8364L5.90381 8.18983L7.54324 7.54325L8.18983 5.90381Z"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M15.048 5.90381L15.9101 8.08972L18.0961 8.95186L15.9101 9.81397L15.048 11.9999L14.1859 9.81397L12 8.95186L14.1859 8.08972L15.048 5.90381Z"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M11.238 10.4761L12.3157 13.2085L15.048 14.2861L12.3157 15.3638L11.238 18.0962L10.1603 15.3638L7.42798 14.2861L10.1603 13.2085L11.238 10.4761Z"
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/common/icons/clock-icon.tsx":
/*!********************************************************!*\
  !*** ./src/content-helper/common/icons/clock-icon.tsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClockIcon: function() { return /* binding */ ClockIcon; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

var ClockIcon = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z",
      fill: "#1E1E1E"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M11 12L12 7L13 12H11Z",
      fill: "#1E1E1E"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M12 13C12.5523 13 13 12.5523 13 12H11C11 12.5523 11.4477 13 12 13Z",
      fill: "#1E1E1E"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      d: "M12.8144 11.3845L15.6429 15.6271L11.4002 12.7987L12.8144 11.3845Z",
      fill: "#1E1E1E"
    })]
  });
};

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

/***/ "./src/content-helper/common/icons/more-arrow.tsx":
/*!********************************************************!*\
  !*** ./src/content-helper/common/icons/more-arrow.tsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoreArrow: function() { return /* binding */ MoreArrow; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

var MoreArrow = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M13.5034 7.91642L9 12.0104L4.49662 7.91642L5.25337 7.08398L8.99999 10.49L12.7466 7.08398L13.5034 7.91642Z",
      fill: "#1E1E1E"
    })
  });
};

/***/ }),

/***/ "./src/content-helper/common/settings/index.ts":
/*!*****************************************************!*\
  !*** ./src/content-helper/common/settings/index.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsProvider: function() { return /* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_2__.SettingsProvider; },
/* harmony export */   useSettings: function() { return /* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_2__.useSettings; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/content-helper/common/settings/store.ts");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./provider */ "./src/content-helper/common/settings/provider.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/content-helper/common/settings/types/index.ts");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Exports
 */

// Export all the settings types.

/**
 * Initializes the settings store.
 *
 * @since 3.14.0
 */
function initSettings() {
  // Check if the store is already registered.
  var isStoreRegistered = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)(_store__WEBPACK_IMPORTED_MODULE_1__.STORE_NAME) !== undefined;
  // Register the store if it's not already registered.
  if (!isStoreRegistered) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_store__WEBPACK_IMPORTED_MODULE_1__.SettingsStore);
  }
}
// Initialize the settings store.
initSettings();

/***/ }),

/***/ "./src/content-helper/common/settings/provider.tsx":
/*!*********************************************************!*\
  !*** ./src/content-helper/common/settings/provider.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsProvider: function() { return /* binding */ SettingsProvider; },
/* harmony export */   useSettings: function() { return /* binding */ useSettings; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/content-helper/common/settings/store.ts");
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
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

/**
 * The Settings context.
 *
 * @since 3.14.0
 */
var SettingsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createContext)({
  settings: {},
  setSettings: function () {
    // eslint-disable-next-line no-console
    console.error('WP Parse.ly: setSettings not implemented');
  }
});
/**
 * Hook to get the settings from the context.
 * Should only be used within a SettingsProvider.
 *
 * @since 3.14.0
 *
 * @template T - The type of settings to retrieve, defaults to Settings.
 *
 * @return {SettingsContextType<T>} The settings context.
 *
 * @throws {Error} Throws an error if used outside of a SettingsProvider.
 *
 * @example
 * // Using the useSettings hook with a specific type
 * const { settings, setSettings } = useSettings<SidebarSettings>();
 */
var useSettings = function () {
  var context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
/**
 * Saves the settings into the WordPress database whenever a dependency update
 * occurs.
 *
 * @since 3.13.0
 * @since 3.14.0 Moved from `content-helper/common/hooks/useSaveSettings.ts`.
 *
 * @param { string }    endpoint The settings endpoint to send the data to.
 * @param { Settings }  data     The data to send.
 * @param { ReactDeps } deps     The deps array that triggers saving.
 */
var useSaveSettings = function (endpoint, data, deps) {
  var isFirstRender = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    // Don't save settings on the first render.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/wp-parsely/v1/user-meta/content-helper/' + endpoint,
      method: 'PUT',
      data: data
    });
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
/**
 * The SettingsProvider component.
 *
 * Provides the settings context to its children.
 * It also saves the settings to the WordPress database whenever a setting change occurs.
 * The settings are saved to the WordPress database using the useSaveSettings hook.
 *
 * @since 3.14.0
 *
 * @param { SettingsProviderProps } props The component's props.
 *
 * @return { JSX.Element } The SettingsProvider component.
 */
var SettingsProvider = function (_a) {
  var children = _a.children,
    endpoint = _a.endpoint,
    defaultSettings = _a.defaultSettings;
  // Get the current settings from the store.
  var storedSettings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    var settings = select(_store__WEBPACK_IMPORTED_MODULE_4__.SettingsStore).getSettings(endpoint);
    // Set the default settings if empty.
    if (!settings) {
      settings = defaultSettings;
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.SettingsStore).setSettings(endpoint, defaultSettings).then(function () {});
    }
    return {
      storedSettings: settings
    };
  }, [defaultSettings, endpoint]).storedSettings;
  // Internal state for storing the settings.
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(storedSettings),
    internalSettings = _b[0],
    setInternalSettings = _b[1];
  var setPartialSettings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.SettingsStore).setPartialSettings;
  /**
   * Updates the settings in the internal state and in the store.
   *
   * @since 3.14.0
   *
   * @param {Partial<Settings>} updatedSettings The updated settings.
   */
  var updateSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (updatedSettings) {
    setInternalSettings(function (currentSettings) {
      return __assign(__assign({}, currentSettings), updatedSettings);
    });
    setPartialSettings(endpoint, updatedSettings);
  }, [endpoint, setPartialSettings]);
  /**
   * Saves the settings into the WordPress database whenever a setting change
   * occurs.
   *
   * internalSettings is the dependency, because we only want to save the settings
   * when they change, and save it with the value in the store (storedSettings).
   *
   * @since 3.14.0
   */
  useSaveSettings(endpoint, storedSettings, [internalSettings]);
  // Memoize the provider value to avoid unnecessary re-renders.
  var providerValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(function () {
    return {
      settings: storedSettings,
      setSettings: updateSettings
    };
  }, [storedSettings, updateSettings]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsContext.Provider, {
    value: providerValue,
    children: children
  });
};

/***/ }),

/***/ "./src/content-helper/common/settings/store.ts":
/*!*****************************************************!*\
  !*** ./src/content-helper/common/settings/store.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: function() { return /* binding */ STORE_NAME; },
/* harmony export */   SettingsStore: function() { return /* binding */ SettingsStore; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
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
 * WordPress dependencies
 */

// Default state.
var DEFAULT_STATE = {};
// Store name.
var STORE_NAME = 'wp-parsely/settings';
// Reducer.
var reducer = function (state, action) {
  var _a, _b;
  if (state === void 0) {
    state = DEFAULT_STATE;
  }
  switch (action.type) {
    case 'SET_SETTINGS':
      {
        return __assign(__assign({}, state), (_a = {}, _a[action.endpoint] = action.settings, _a));
      }
    case 'SET_PARTIAL_SETTINGS':
      {
        var currentSettings = state[action.endpoint] || {};
        var updatedSettings = __assign(__assign({}, currentSettings), action.partialSettings);
        return __assign(__assign({}, state), (_b = {}, _b[action.endpoint] = updatedSettings, _b));
      }
    default:
      return state;
  }
};
// Actions.
var actions = {
  setSettings: function (endpoint, settings) {
    return {
      type: 'SET_SETTINGS',
      endpoint: endpoint,
      settings: settings
    };
  },
  setPartialSettings: function (endpoint, partialSettings) {
    return {
      type: 'SET_PARTIAL_SETTINGS',
      endpoint: endpoint,
      partialSettings: partialSettings
    };
  }
};
// Selectors.
var selectors = {
  getSettings: function (state, endpoint) {
    return state[endpoint];
  }
};
// Create and register the store.
var SettingsStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(STORE_NAME, {
  initialState: DEFAULT_STATE,
  reducer: reducer,
  actions: actions,
  selectors: selectors
});

/***/ }),

/***/ "./src/content-helper/common/settings/types/index.ts":
/*!***********************************************************!*\
  !*** ./src/content-helper/common/settings/types/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


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

/***/ "./src/content-helper/common/utils/functions.ts":
/*!******************************************************!*\
  !*** ./src/content-helper/common/utils/functions.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeRegExp: function() { return /* binding */ escapeRegExp; }
/* harmony export */ });
/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @since 3.14.0
 * @since 3.14.1 Moved from `editor-sidebar/smart-linking/utils.ts` to `common/utils/functions.ts`.
 *
 * @param { string } string The string to be escaped.
 *
 * @return { string } The escaped string.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string.
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
      className: "parsely-post-metric-data",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Number of Views', 'wp-parsely')
      }), viewsIcon, (0,_number__WEBPACK_IMPORTED_MODULE_1__.formatToImpreciseNumber)(post.views.toString())]
    });
  }
  if ('avg_engaged' === metric) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "parsely-post-metric-data",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Average Time', 'wp-parsely')
      }), avgEngagedIcon, post.avgEngaged]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "parsely-post-metric-data",
    children: "-"
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

/***/ "./src/content-helper/editor-sidebar/editor-sidebar.tsx":
/*!**************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/editor-sidebar.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSettingsFromJson: function() { return /* binding */ getSettingsFromJson; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chart-bar.js");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_icons_edit_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/icons/edit-icon */ "./src/content-helper/common/icons/edit-icon.tsx");
/* harmony import */ var _common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/icons/leaf-icon */ "./src/content-helper/common/icons/leaf-icon.tsx");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _smart_linking_smart_linking__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./smart-linking/smart-linking */ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx");
/* harmony import */ var _tabs_sidebar_performance_tab__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tabs/sidebar-performance-tab */ "./src/content-helper/editor-sidebar/tabs/sidebar-performance-tab.tsx");
/* harmony import */ var _tabs_sidebar_tools_tab__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tabs/sidebar-tools-tab */ "./src/content-helper/editor-sidebar/tabs/sidebar-tools-tab.tsx");
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
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */








var BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';
/**
 * Gets the settings from the passed JSON.
 *
 * If missing settings or invalid values are detected, they get set to their
 * defaults. This function prevents crashes when settings cannot be fetched or
 * they happen to be corrupt.
 *
 * @since 3.13.0
 *
 * @param {string} settingsJson The JSON containing the settings.
 *
 * @return {SidebarSettings} The resulting settings object.
 */
var getSettingsFromJson = function (settingsJson) {
  if (settingsJson === void 0) {
    settingsJson = '';
  }
  // Default settings object.
  var defaultSettings = {
    InitialTabName: 'tools',
    PerformanceStatsSettings: {
      Period: _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Period.Days7,
      VisiblePanels: ['overview', 'categories', 'referrers'],
      VisibleDataPoints: ['views', 'visitors', 'avgEngaged', 'recirculation']
    },
    RelatedPostsFilterBy: _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.PostFilterType.Unavailable,
    RelatedPostsFilterValue: '',
    RelatedPostsMetric: _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Metric.Views,
    RelatedPostsOpen: false,
    RelatedPostsPeriod: _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Period.Days7,
    SmartLinkingMaxLinks: _smart_linking_smart_linking__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_MAX_LINKS,
    SmartLinkingMaxLinkWords: _smart_linking_smart_linking__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_MAX_LINK_WORDS,
    SmartLinkingOpen: false,
    TitleSuggestionsSettings: {
      Open: false,
      Tone: 'neutral',
      Persona: 'journalist'
    }
  };
  // If the settings are empty, try to get them from the global variable.
  if ('' === settingsJson) {
    settingsJson = window.wpParselyContentHelperSettings;
  }
  var parsedSettings;
  try {
    parsedSettings = JSON.parse(settingsJson);
  } catch (e) {
    // Return defaults when parsing failed or the string is empty.
    return defaultSettings;
  }
  // Merge parsed settings with default settings.
  var mergedSettings = __assign(__assign({}, defaultSettings), parsedSettings);
  // Fix invalid values if any are found.
  if (typeof mergedSettings.InitialTabName !== 'string') {
    mergedSettings.InitialTabName = defaultSettings.InitialTabName;
  }
  if (typeof mergedSettings.PerformanceStatsSettings !== 'object') {
    mergedSettings.PerformanceStatsSettings = defaultSettings.PerformanceStatsSettings;
  }
  if (!(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.isInEnum)(mergedSettings.PerformanceStatsSettings.Period, _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Period)) {
    mergedSettings.PerformanceStatsSettings.Period = defaultSettings.PerformanceStatsSettings.Period;
  }
  if (!Array.isArray(mergedSettings.PerformanceStatsSettings.VisiblePanels)) {
    mergedSettings.PerformanceStatsSettings.VisiblePanels = defaultSettings.PerformanceStatsSettings.VisiblePanels;
  }
  if (!Array.isArray(mergedSettings.PerformanceStatsSettings.VisibleDataPoints)) {
    mergedSettings.PerformanceStatsSettings.VisibleDataPoints = defaultSettings.PerformanceStatsSettings.VisibleDataPoints;
  }
  if (!(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.isInEnum)(mergedSettings.RelatedPostsFilterBy, _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.PostFilterType)) {
    mergedSettings.RelatedPostsFilterBy = defaultSettings.RelatedPostsFilterBy;
  }
  if (typeof mergedSettings.RelatedPostsFilterValue !== 'string') {
    mergedSettings.RelatedPostsFilterValue = defaultSettings.RelatedPostsFilterValue;
  }
  if (!(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.isInEnum)(mergedSettings.RelatedPostsMetric, _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Metric)) {
    mergedSettings.RelatedPostsMetric = defaultSettings.RelatedPostsMetric;
  }
  if (typeof mergedSettings.RelatedPostsOpen !== 'boolean') {
    mergedSettings.RelatedPostsOpen = defaultSettings.RelatedPostsOpen;
  }
  if (!(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.isInEnum)(mergedSettings.RelatedPostsPeriod, _common_utils_constants__WEBPACK_IMPORTED_MODULE_11__.Period)) {
    mergedSettings.RelatedPostsPeriod = defaultSettings.RelatedPostsPeriod;
  }
  if (typeof mergedSettings.SmartLinkingMaxLinks !== 'number') {
    mergedSettings.SmartLinkingMaxLinks = defaultSettings.SmartLinkingMaxLinks;
  }
  if (typeof mergedSettings.SmartLinkingMaxLinkWords !== 'number') {
    mergedSettings.SmartLinkingMaxLinkWords = defaultSettings.SmartLinkingMaxLinkWords;
  }
  if (typeof mergedSettings.SmartLinkingOpen !== 'boolean') {
    mergedSettings.SmartLinkingOpen = defaultSettings.SmartLinkingOpen;
  }
  if (typeof mergedSettings.TitleSuggestionsSettings !== 'object') {
    mergedSettings.TitleSuggestionsSettings = defaultSettings.TitleSuggestionsSettings;
  }
  if (typeof mergedSettings.TitleSuggestionsSettings.Open !== 'boolean') {
    mergedSettings.TitleSuggestionsSettings.Open = defaultSettings.TitleSuggestionsSettings.Open;
  }
  if (typeof mergedSettings.TitleSuggestionsSettings.Tone !== 'string') {
    mergedSettings.TitleSuggestionsSettings.Tone = defaultSettings.TitleSuggestionsSettings.Tone;
  }
  if (typeof mergedSettings.TitleSuggestionsSettings.Persona !== 'string') {
    mergedSettings.TitleSuggestionsSettings.Persona = defaultSettings.TitleSuggestionsSettings.Persona;
  }
  return mergedSettings;
};
/**
 * Returns the Content Helper Editor Sidebar.
 *
 * @since 3.4.0
 *
 * @return {JSX.Element} The Content Helper Editor Sidebar.
 */
var ContentHelperEditorSidebar = function () {
  var _a = (0,_common_settings__WEBPACK_IMPORTED_MODULE_10__.useSettings)(),
    settings = _a.settings,
    setSettings = _a.setSettings;
  /**
   * Track sidebar opening.
   *
   * @since 3.12.0
   */
  var activeComplementaryArea = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    // @ts-ignore getActiveComplementaryArea exists in the interface store.
    return select('core/interface').getActiveComplementaryArea('core/edit-post');
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (activeComplementaryArea === 'wp-parsely-block-editor-sidebar/wp-parsely-content-helper') {
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_7__.Telemetry.trackEvent('editor_sidebar_opened');
    }
  }, [activeComplementaryArea]);
  /**
   * Track sidebar panel opening and closing.
   *
   * @since 3.12.0
   *
   * @param {string}  panel The panel name.
   * @param {boolean} next  Whether the panel is open or closed.
   */
  var trackToggle = function (panel, next) {
    if (next) {
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_7__.Telemetry.trackEvent('editor_sidebar_panel_opened', {
        panel: panel
      });
    } else {
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_7__.Telemetry.trackEvent('editor_sidebar_panel_closed', {
        panel: panel
      });
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_3__.PluginSidebar, {
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_9__.LeafIcon, {
      className: "wp-parsely-sidebar-icon"
    }),
    name: "wp-parsely-content-helper",
    className: "wp-parsely-content-helper",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parse.ly', 'wp-parsely'),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_settings__WEBPACK_IMPORTED_MODULE_10__.SettingsProvider, {
      endpoint: "editor-sidebar-settings",
      defaultSettings: getSettingsFromJson(),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
        className: "wp-parsely-sidebar-main-panel",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
          className: "wp-parsely-sidebar-tabs",
          initialTabName: settings.InitialTabName,
          tabs: [{
            icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_edit_icon__WEBPACK_IMPORTED_MODULE_8__.EditIcon, {}),
            name: 'tools',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Tools', 'wp-parsely')
          }, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"],
            name: 'performance',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Performance', 'wp-parsely')
          }],
          onSelect: function (tabName) {
            setSettings(__assign(__assign({}, settings), {
              InitialTabName: tabName
            }));
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_7__.Telemetry.trackEvent('editor_sidebar_tab_selected', {
              tab: tabName
            });
          },
          children: function (tab) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              children: [tab.name === 'tools' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tabs_sidebar_tools_tab__WEBPACK_IMPORTED_MODULE_14__.SidebarToolsTab, {
                trackToggle: trackToggle
              }), tab.name === 'performance' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tabs_sidebar_performance_tab__WEBPACK_IMPORTED_MODULE_13__.SidebarPerformanceTab, {
                period: settings.PerformanceStatsSettings.Period
              })]
            });
          }
        })
      })
    })
  });
};
// Registering Plugin to WordPress Block Editor.
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__.registerPlugin)(BLOCK_PLUGIN_ID, {
  icon: _common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_9__.LeafIcon,
  render: function () {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_settings__WEBPACK_IMPORTED_MODULE_10__.SettingsProvider, {
      endpoint: "editor-sidebar-settings",
      defaultSettings: getSettingsFromJson(),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ContentHelperEditorSidebar, {})
    });
  }
});
// Initialize Smart Linking.
(0,_smart_linking_smart_linking__WEBPACK_IMPORTED_MODULE_12__.initSmartLinking)();

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/component-panel-categories.tsx":
/*!**********************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/component-panel-categories.tsx ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceCategoriesPanel: function() { return /* binding */ PerformanceCategoriesPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _common_utils_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/number */ "./src/content-helper/common/utils/number.ts");
/* harmony import */ var _component_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component-panel */ "./src/content-helper/editor-sidebar/performance-details/component-panel.tsx");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */



/**
 * The PerformanceCategoriesPanel component.
 *
 * Renders the Categories panel in the Performance tab.
 *
 * @since 3.14.0
 *
 * @param { PerformanceCategoriesPanelProps } props The component's props.
 *
 * @return { JSX.Element } The PerformanceCategoriesPanel JSX Element.
 */
var PerformanceCategoriesPanel = function (_a) {
  var data = _a.data,
    isLoading = _a.isLoading;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric.Views),
    metric = _b[0],
    setMetric = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    isOpen = _c[0],
    setIsOpen = _c[1];
  // Remove unneeded totals to simplify upcoming map() calls.
  if (!isLoading) {
    delete data.referrers.types['totals'];
  }
  // Returns an internationalized referrer title based on the passed key.
  var getKeyTitle = function (key) {
    switch (key) {
      case 'social':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Social', 'wp-parsely');
      case 'search':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search', 'wp-parsely');
      case 'other':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Other', 'wp-parsely');
      case 'internal':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Internal', 'wp-parsely');
      case 'direct':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Direct', 'wp-parsely');
    }
    return key;
  };
  /* translators: %s: metric description */
  var subtitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By %s', 'wp-parsely'), (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.getMetricDescription)(metric));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_component_panel__WEBPACK_IMPORTED_MODULE_6__.PerformanceStatPanel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Categories', 'wp-parsely'),
    level: 3,
    subtitle: subtitle,
    isOpen: isOpen,
    onClick: function () {
      return setIsOpen(!isOpen);
    },
    children: [isOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "panel-settings",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        value: metric,
        prefix: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By: ', 'wp-parsely'),
        onChange: function (selection) {
          if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.isInEnum)(selection, _common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric)) {
            setMetric(selection);
          }
        },
        children: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric).map(function (value) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
            value: value,
            disabled: 'avg_engaged' === value,
            children: [(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.getMetricDescription)(value), 'avg_engaged' === value && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' (coming soon)', 'wp-parsely')]
          }, value);
        })
      })
    }), isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "parsely-spinner-wrapper",
      "data-testid": "parsely-spinner-wrapper",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "multi-percentage-bar",
        children: Object.entries(data.referrers.types).map(function (_a) {
          var key = _a[0],
            value = _a[1];
          var ariaLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Referrer type, 2: Percentage value, %%: Escaped percent sign */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('%1$s: %2$s%%', 'wp-parsely'), getKeyTitle(key), value.viewsPercentage);
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip
          /* translators: %s: percentage value */, {
            /* translators: %s: percentage value */
            text: "".concat(getKeyTitle(key), " - ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('%s%%', 'wp-parsely'), value.viewsPercentage)),
            delay: 150,
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              "aria-label": ariaLabel,
              className: 'bar-fill ' + key,
              style: {
                width: value.viewsPercentage + '%'
              }
            })
          }, key);
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "percentage-bar-labels",
        children: Object.entries(data.referrers.types).map(function (_a) {
          var key = _a[0],
            value = _a[1];
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: 'single-label ' + key,
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: 'label-color ' + key
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "label-text",
              children: getKeyTitle(key)
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "label-value",
              children: (0,_common_utils_number__WEBPACK_IMPORTED_MODULE_5__.formatToImpreciseNumber)(value.views)
            })]
          }, key);
        })
      })]
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/component-panel-overview.tsx":
/*!********************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/component-panel-overview.tsx ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceOverviewPanel: function() { return /* binding */ PerformanceOverviewPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/seen.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/people.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/rotate-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/reset.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more-horizontal.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_icons_clock_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/icons/clock-icon */ "./src/content-helper/common/icons/clock-icon.tsx");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_utils_number__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/utils/number */ "./src/content-helper/common/utils/number.ts");
/* harmony import */ var _component_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component-panel */ "./src/content-helper/editor-sidebar/performance-details/component-panel.tsx");
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




/**
 * List of available data points to display in the Overview panel.
 *
 * @since 3.14.0
 */
var availableDataPoints = [{
  name: 'views',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page Views', 'wp-parsely'),
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
}, {
  name: 'visitors',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visitors', 'wp-parsely'),
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
}, {
  name: 'avgEngaged',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Avg. Engaged', 'wp-parsely'),
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_clock_icon__WEBPACK_IMPORTED_MODULE_4__.ClockIcon, {})
}, {
  name: 'recirculation',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Recirculation', 'wp-parsely'),
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
  smallText: true
}];
/**
 * Checks if a data point is visible in the sidebar settings.
 *
 * @since 3.14.0
 *
 * @param { SidebarSettings } settings The sidebar settings.
 * @param { string }          name     The name of the data point.
 *
 * @return { boolean } Whether the data point is visible.
 */
var isDataPointVisible = function (settings, name) {
  return settings.PerformanceStatsSettings.VisibleDataPoints.includes(name);
};
/**
 * A single data point to display in the Overview panel.
 *
 * @since 3.14.0
 *
 * @param { DataPointProps } props The component's props.
 *
 * @return { JSX.Element | null } The DataPoint JSX Element, or null if it's not visible.
 */
var DataPoint = function (_a) {
  var title = _a.title,
    value = _a.value,
    icon = _a.icon,
    smallText = _a.smallText,
    _b = _a.isVisible,
    isVisible = _b === void 0 ? true : _b;
  if (!isVisible) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "data-point",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
      size: 24,
      icon: icon
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "data-point-title",
      children: title
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: 'data-point-value' + (smallText ? ' is-small' : ''),
      children: value
    })]
  });
};
/**
 * A grid of data points to display in the Overview panel.
 *
 * @since 3.14.0
 *
 * @param { PerformanceDataPointsProp } props The component's props.
 */
var PerformanceDataPoints = function (_a) {
  var dataPoints = _a.dataPoints;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "performance-data-points",
    children: dataPoints.map(function (_a) {
      var title = _a.title,
        value = _a.value,
        icon = _a.icon,
        smallText = _a.smallText,
        isVisible = _a.isVisible;
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DataPoint, {
        title: title,
        value: value,
        icon: icon,
        smallText: smallText,
        isVisible: isVisible
      }, title);
    })
  });
};
/**
 * A dropdown menu for the Overview panel.
 *
 * @since 3.14.0
 *
 * @param { OverviewMenuProps } props The component's props.
 */
var OverviewMenu = function (_a) {
  var onClose = _a.onClose;
  var _b = (0,_common_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)(),
    settings = _b.settings,
    setSettings = _b.setSettings;
  /**
   * Toggles a data point's visibility in the sidebar settings.
   *
   * @since 3.14.0
   *
   * @param { string } dataPoint The name of the data point.
   */
  var toggleDataPoint = function (dataPoint) {
    // Check if the dataPoint is in the settings.PerformanceStatsSettings.VisibleDataPoints array
    // If it is, remove it with setSettings, if not, add it.
    if (isDataPointVisible(settings, dataPoint)) {
      setSettings({
        PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
          VisibleDataPoints: settings.PerformanceStatsSettings.VisibleDataPoints.filter(function (p) {
            return p !== dataPoint;
          })
        })
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_3__.Telemetry.trackEvent('editor_sidebar_performance_datapoint_hidden', {
        datapoint: dataPoint
      });
    } else {
      setSettings({
        PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
          VisibleDataPoints: __spreadArray(__spreadArray([], settings.PerformanceStatsSettings.VisibleDataPoints, true), [dataPoint], false)
        })
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_3__.Telemetry.trackEvent('editor_sidebar_performance_datapoint_shown', {
        datapoint: dataPoint
      });
    }
  };
  /**
   * Handles a click on a menu item.
   *
   * @since 3.14.0
   *
   * @param { string } selection
   */
  var onClick = function (selection) {
    toggleDataPoint(selection);
    onClose();
  };
  /**
   * Resets all data points to their default visibility.
   *
   * @since 3.14.0
   */
  var resetAll = function () {
    setSettings({
      PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
        VisibleDataPoints: ['views', 'visitors', 'avgEngaged', 'recirculation']
      })
    });
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_3__.Telemetry.trackEvent('editor_sidebar_performance_datapoints_reset');
    onClose();
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Performance Stats', 'wp-parsely'),
      children: availableDataPoints.map(function (value) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
          icon: isDataPointVisible(settings, value.name) ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
          onClick: function () {
            return onClick(value.name);
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
            icon: value.icon
          }), value.title]
        }, value.name);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: resetAll,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset all', 'wp-parsely')
      })
    })]
  });
};
/**
 * The Overview panel for the Performance Stats Sidebar.
 *
 * @since 3.14.0
 *
 * @param { PerformanceOverviewPanelProps } props The component's props.
 */
var PerformanceOverviewPanel = function (_a) {
  var data = _a.data,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var settings = (0,_common_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)().settings;
  var dataPointsWithValues = [];
  if (!isLoading) {
    dataPointsWithValues = availableDataPoints.map(function (dataPoint) {
      var value;
      switch (dataPoint.name) {
        case 'views':
          value = (0,_common_utils_number__WEBPACK_IMPORTED_MODULE_6__.formatToImpreciseNumber)(data.views);
          break;
        case 'visitors':
          value = (0,_common_utils_number__WEBPACK_IMPORTED_MODULE_6__.formatToImpreciseNumber)(data.visitors);
          break;
        case 'avgEngaged':
          value = data.avgEngaged;
          break;
        default:
          value = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Coming soon!', 'wp-parsely');
          break;
      }
      return __assign(__assign({}, dataPoint), {
        value: value,
        isVisible: isDataPointVisible(settings, dataPoint.name)
      });
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_panel__WEBPACK_IMPORTED_MODULE_7__.PerformanceStatPanel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Overview', 'wp-parsely'),
    level: 3,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
    dropdownChildren: function (_a) {
      var onClose = _a.onClose;
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OverviewMenu, {
        onClose: onClose
      });
    },
    children: isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "parsely-spinner-wrapper",
      "data-testid": "parsely-spinner-wrapper",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PerformanceDataPoints, {
      dataPoints: dataPointsWithValues
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/component-panel-referrers.tsx":
/*!*********************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/component-panel-referrers.tsx ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceReferrersPanel: function() { return /* binding */ PerformanceReferrersPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _component_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component-panel */ "./src/content-helper/editor-sidebar/performance-details/component-panel.tsx");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


/**
 * The Referrers panel for the Performance Stats Sidebar.
 *
 * @since 3.14.0
 *
 * @param { PerformanceReferrersPanelProps } props The component's props.
 *
 * @return { JSX.Element } The PerformanceReferrersPanel JSX Element.
 */
var PerformanceReferrersPanel = function (_a) {
  var data = _a.data,
    isLoading = _a.isLoading;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric.Views),
    metric = _b[0],
    setMetric = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    isOpen = _c[0],
    setIsOpen = _c[1];
  /* translators: %s: metric description */
  var subtitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By %s', 'wp-parsely'), (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.getMetricDescription)(metric));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_component_panel__WEBPACK_IMPORTED_MODULE_5__.PerformanceStatPanel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Referrers', 'wp-parsely'),
    subtitle: subtitle,
    level: 3,
    isOpen: isOpen,
    onClick: function () {
      return setIsOpen(!isOpen);
    },
    children: [isOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "panel-settings",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        value: metric,
        prefix: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By: ', 'wp-parsely'),
        onChange: function (selection) {
          if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.isInEnum)(selection, _common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric)) {
            setMetric(selection);
          }
        },
        children: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.Metric).map(function (value) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
            value: value,
            disabled: 'avg_engaged' === value,
            children: [(0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_4__.getMetricDescription)(value), 'avg_engaged' === value && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' (coming soon)', 'wp-parsely')]
          }, value);
        })
      })
    }), isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "parsely-spinner-wrapper",
      "data-testid": "parsely-spinner-wrapper",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "referrers-list",
      children: Object.entries(data.referrers.top).map(function (_a) {
        var key = _a[0],
          value = _a[1];
        if (key === 'totals') {
          return null;
        }
        var referrerUrl = key;
        if (key === 'direct') {
          referrerUrl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Direct', 'wp-parsely');
        }
        /* translators: %s: Percentage value, %%: Escaped percent sign */
        var ariaLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('%s%%', 'wp-parsely'), value.viewsPercentage); // eslint-disable-line @wordpress/valid-sprintf
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "referrers-row",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "referrers-row-title",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: referrerUrl
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "referrers-row-bar",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              "aria-label": ariaLabel,
              className: "percentage-bar",
              style: {
                '--bar-fill': value.viewsPercentage + '%'
              }
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "referrers-row-value",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: value.views
            })
          })]
        }, key);
      })
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/component-panel.tsx":
/*!***********************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/component-panel.tsx ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceStatPanel: function() { return /* binding */ PerformanceStatPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

/**
 * The PerformanceStatPanel component.
 * This component is the raw panel used to display performance stats.
 *
 * If `dropdownChildren` is set, it will be used as the DropdownMenu.
 * if `controls` is set, it will be used to render the DropdownMenu.
 *
 * @since 3.14.0
 *
 * @param { PerformanceStatPanelProps } props The component's props.
 *
 * @return { JSX.Element } The PerformanceStatPanel JSX Element.
 */
var PerformanceStatPanel = function (_a) {
  var title = _a.title,
    icon = _a.icon,
    subtitle = _a.subtitle,
    _b = _a.level,
    level = _b === void 0 ? 2 : _b,
    children = _a.children,
    controls = _a.controls,
    onClick = _a.onClick,
    isOpen = _a.isOpen,
    isLoading = _a.isLoading,
    dropdownChildren = _a.dropdownChildren;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "performance-stat-panel",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
      className: 'panel-header level-' + level,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
        level: level,
        children: title
      }), subtitle && !isOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "panel-subtitle",
        children: subtitle
      }), controls && !dropdownChildren && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, {
        icon: icon,
        label: "Select a direction",
        toggleProps: {
          isSmall: true
        },
        controls: controls
      }), dropdownChildren && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, {
        icon: icon,
        label: "Select a direction",
        toggleProps: {
          isSmall: true
        },
        children: dropdownChildren
      }), icon && !dropdownChildren && !controls && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        icon: icon,
        isSmall: true,
        isPressed: isOpen,
        onClick: onClick
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "panel-body",
      children: isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "parsely-spinner-wrapper",
        "data-testid": "parsely-spinner-wrapper",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
      }) : children
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/component.tsx":
/*!*****************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/component.tsx ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceStats: function() { return /* binding */ PerformanceStats; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/reset.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _component_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component-panel */ "./src/content-helper/editor-sidebar/performance-details/component-panel.tsx");
/* harmony import */ var _component_panel_categories__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component-panel-categories */ "./src/content-helper/editor-sidebar/performance-details/component-panel-categories.tsx");
/* harmony import */ var _component_panel_overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component-panel-overview */ "./src/content-helper/editor-sidebar/performance-details/component-panel-overview.tsx");
/* harmony import */ var _component_panel_referrers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component-panel-referrers */ "./src/content-helper/editor-sidebar/performance-details/component-panel-referrers.tsx");
/* harmony import */ var _performance_details_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./performance-details.scss */ "./src/content-helper/editor-sidebar/performance-details/performance-details.scss");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./provider */ "./src/content-helper/editor-sidebar/performance-details/provider.ts");
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













// Number of attempts to fetch the data before displaying an error.
var FETCH_RETRIES = 1;
/**
 * List of available panels to display in the Performance Stats menu.
 *
 * @since 3.14.0
 */
var availablePanels = [{
  name: 'overview',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Overview', 'wp-parsely')
}, {
  name: 'categories',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Referrer Categories', 'wp-parsely')
}, {
  name: 'referrers',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Referrers', 'wp-parsely')
}];
/**
 * Checks if a panel is visible in the sidebar settings.
 *
 * @since 3.14.0
 *
 * @param { SidebarSettings } settings The sidebar settings.
 * @param { string }          panel    The name of the panel.
 *
 * @return { boolean } True if the panel is visible, false otherwise.
 */
var isPanelVisible = function (settings, panel) {
  return settings.PerformanceStatsSettings.VisiblePanels.includes(panel);
};
/**
 * PerformanceStatsMenu dropdown menu component.
 *
 * @since 3.14.0
 *
 * @param { Function } onClose Callback to close the dropdown menu.
 *
 * @return { JSX.Element } The dropdown menu JSX Element.
 */
var PerformanceStatsMenu = function (_a) {
  var onClose = _a.onClose;
  var _b = (0,_common_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)(),
    settings = _b.settings,
    setSettings = _b.setSettings;
  /**
   * Toggles a panel's visibility in the sidebar settings.
   * If the panel is forced, it will not be toggled.
   *
   * @since 3.14.0
   *
   * @param { string } panel The name of the panel to toggle.
   */
  var togglePanel = function (panel) {
    var _a;
    // Do not toggle panels that are forced to be visible.
    if ((_a = availablePanels.find(function (p) {
      return p.name === panel;
    })) === null || _a === void 0 ? void 0 : _a.forced) {
      return;
    }
    // Check if the panel is in the settings.PerformanceStatsSettings.VisiblePanels array
    // If it is, remove it with setSettings, if not, add it.
    if (isPanelVisible(settings, panel)) {
      setSettings({
        PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
          VisiblePanels: settings.PerformanceStatsSettings.VisiblePanels.filter(function (p) {
            return p !== panel;
          })
        })
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('editor_sidebar_performance_panel_closed', {
        panel: panel
      });
    } else {
      setSettings({
        PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
          VisiblePanels: __spreadArray(__spreadArray([], settings.PerformanceStatsSettings.VisiblePanels, true), [panel], false)
        })
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('editor_sidebar_performance_panel_opened', {
        panel: panel
      });
    }
  };
  /**
   * Handles the click event on a menu item.
   *
   * @since 3.14.0
   *
   * @param { string } selection The name of the selected panel.
   */
  var onClick = function (selection) {
    togglePanel(selection);
    onClose();
  };
  /**
   * Resets all panels to their default visibility.
   *
   * @since 3.14.0
   */
  var resetAll = function () {
    setSettings({
      PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
        VisiblePanels: availablePanels.map(function (panel) {
          return panel.name;
        })
      })
    });
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('editor_sidebar_performance_panels_reset');
    onClose();
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Performance Stats', 'wp-parsely'),
      children: availablePanels.map(function (item) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
          disabled: item.forced,
          icon: isPanelVisible(settings, item.name) ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
          onClick: function () {
            return onClick(item.name);
          },
          children: item.label
        }, item.name);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: resetAll,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reset all', 'wp-parsely')
      })
    })]
  });
};
/**
 * PerformanceStats component.
 *
 * @since 3.14.0
 *
 * @param { PerformanceStatsProps } props The component's properties.
 */
var PerformanceStats = function (_a) {
  var period = _a.period;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(),
    error = _c[0],
    setError = _c[1];
  var _d = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(),
    postDetails = _d[0],
    setPostDetails = _d[1];
  var _e = (0,_common_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)(),
    settings = _e.settings,
    setSettings = _e.setSettings;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var provider = new _provider__WEBPACK_IMPORTED_MODULE_12__.PerformanceDetailsProvider();
    var fetchPosts = function (retries) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          provider.getPerformanceDetails(period).then(function (result) {
            setPostDetails(result);
            setLoading(false);
          }).catch(function (err) {
            return __awaiter(void 0, void 0, void 0, function () {
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
                    setError(err);
                    setLoading(false);
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
      setError(undefined);
    };
  }, [period]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wp-parsely-performance-panel",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_panel__WEBPACK_IMPORTED_MODULE_7__.PerformanceStatPanel, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Performance Stats', 'wp-parsely'),
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"],
      dropdownChildren: function (_a) {
        var onClose = _a.onClose;
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PerformanceStatsMenu, {
          onClose: onClose
        });
      },
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "panel-settings",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          size: "__unstable-large",
          value: settings.PerformanceStatsSettings.Period,
          prefix: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControlPrefixWrapper, {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Period: ', 'wp-parsely')
          }),
          onChange: function (selection) {
            if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_6__.isInEnum)(selection, _common_utils_constants__WEBPACK_IMPORTED_MODULE_6__.Period)) {
              setSettings({
                PerformanceStatsSettings: __assign(__assign({}, settings.PerformanceStatsSettings), {
                  Period: selection
                })
              });
              _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('editor_sidebar_performance_period_changed', {
                period: selection
              });
            }
          },
          children: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_6__.Period).map(function (value) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: value,
              children: (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_6__.getPeriodDescription)(value)
            }, value);
          })
        })
      })
    }), error ? error.Message() : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [isPanelVisible(settings, 'overview') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_panel_overview__WEBPACK_IMPORTED_MODULE_9__.PerformanceOverviewPanel, {
        data: postDetails,
        isLoading: loading
      }), isPanelVisible(settings, 'categories') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_panel_categories__WEBPACK_IMPORTED_MODULE_8__.PerformanceCategoriesPanel, {
        data: postDetails,
        isLoading: loading
      }), isPanelVisible(settings, 'referrers') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_panel_referrers__WEBPACK_IMPORTED_MODULE_10__.PerformanceReferrersPanel, {
        data: postDetails,
        isLoading: loading
      })]
    }), window.wpParselyPostUrl && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "wp-parsely-view-post",
      variant: 'primary',
      onClick: function () {
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('editor_sidebar_view_post_pressed');
      },
      href: window.wpParselyPostUrl,
      rel: "noopener",
      target: "_blank",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('View this in Parse.ly', 'wp-parsely')
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/provider.ts":
/*!***************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/provider.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerformanceDetailsProvider: function() { return /* binding */ PerformanceDetailsProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/api */ "./src/content-helper/common/utils/api.ts");
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


/**
 * Provides current post details data for use in other components.
 */
var PerformanceDetailsProvider = /** @class */function () {
  function PerformanceDetailsProvider() {
    this.itmSource = 'wp-parsely-content-helper';
  }
  /**
   * Returns details about the post that is currently being edited within the
   * WordPress Block Editor.
   *
   * @param {Period} period The period for which to fetch data.
   *
   * @return {Promise<PerformanceData>} The current post's details.
   */
  PerformanceDetailsProvider.prototype.getPerformanceDetails = function (period) {
    return __awaiter(this, void 0, void 0, function () {
      var editor, postUrl, performanceData, referrerData, contentHelperError_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            editor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor');
            // We cannot show data for non-published posts.
            if (false === editor.isCurrentPostPublished()) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This post is not published, so its details are unavailable.', 'wp-parsely'), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.PostIsNotPublished, ''))];
            }
            postUrl = editor.getPermalink();
            if (null === postUrl) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("The post's URL returned null.", 'wp-parsely'), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.PostIsNotPublished))];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4,, 5]);
            return [4 /*yield*/, this.fetchPerformanceDataFromWpEndpoint(period, postUrl)];
          case 2:
            performanceData = _a.sent();
            return [4 /*yield*/, this.fetchReferrerDataFromWpEndpoint(period, postUrl, performanceData.views)];
          case 3:
            referrerData = _a.sent();
            return [3 /*break*/, 5];
          case 4:
            contentHelperError_1 = _a.sent();
            return [2 /*return*/, Promise.reject(contentHelperError_1)];
          case 5:
            return [2 /*return*/, __assign(__assign({}, performanceData), {
              referrers: referrerData
            })];
        }
      });
    });
  };
  /**
   * Fetches the performance data for the current post from the WordPress REST
   * API.
   *
   * @param {Period} period  The period for which to fetch data.
   * @param {string} postUrl
   *
   * @return {Promise<PerformanceData> } The current post's details.
   */
  PerformanceDetailsProvider.prototype.fetchPerformanceDataFromWpEndpoint = function (period, postUrl) {
    return __awaiter(this, void 0, void 0, function () {
      var response, wpError_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_3__.addQueryArgs)('/wp-parsely/v1/stats/post/detail', __assign(__assign({}, (0,_common_utils_api__WEBPACK_IMPORTED_MODULE_5__.getApiPeriodParams)(period)), {
                itm_source: this.itmSource,
                url: postUrl
              }))
            })];
          case 1:
            response = _a.sent();
            return [3 /*break*/, 3];
          case 2:
            wpError_1 = _a.sent();
            return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError(wpError_1.message, wpError_1.code))];
          case 3:
            if (response === null || response === void 0 ? void 0 : response.error) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError(response.error.message, _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.ParselyApiResponseContainsError))];
            }
            // No data was returned.
            if (response.data.length === 0) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: URL of the published post */
              (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The post %s has 0 views, or the Parse.ly API returned no data.', 'wp-parsely'), postUrl), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.ParselyApiReturnedNoData, ''))];
            }
            // Data for multiple URLs was returned.
            if (response.data.length > 1) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: URL of the published post */
              (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Multiple results were returned for the post %s by the Parse.ly API.', 'wp-parsely'), postUrl), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.ParselyApiReturnedTooManyResults))];
            }
            return [2 /*return*/, response.data[0]];
        }
      });
    });
  };
  /**
   * Fetches referrer data for the current post from the WordPress REST API.
   *
   * @param {Period} period     The period for which to fetch data.
   * @param {string} postUrl    The post's URL.
   * @param {string} totalViews Total post views (including direct views).
   *
   * @return {Promise<PerformanceReferrerData>} The post's referrer data.
   */
  PerformanceDetailsProvider.prototype.fetchReferrerDataFromWpEndpoint = function (period, postUrl, totalViews) {
    return __awaiter(this, void 0, void 0, function () {
      var response, wpError_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_3__.addQueryArgs)('/wp-parsely/v1/referrers/post/detail', __assign(__assign({}, (0,_common_utils_api__WEBPACK_IMPORTED_MODULE_5__.getApiPeriodParams)(period)), {
                itm_source: this.itmSource,
                total_views: totalViews,
                url: postUrl
              }))
            })];
          case 1:
            response = _a.sent();
            return [3 /*break*/, 3];
          case 2:
            wpError_2 = _a.sent();
            return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError(wpError_2.message, wpError_2.code))];
          case 3:
            if (response === null || response === void 0 ? void 0 : response.error) {
              return [2 /*return*/, Promise.reject(new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperError(response.error.message, _common_content_helper_error__WEBPACK_IMPORTED_MODULE_4__.ContentHelperErrorCode.ParselyApiResponseContainsError))];
            }
            return [2 /*return*/, response.data];
        }
      });
    });
  };
  return PerformanceDetailsProvider;
}();


/***/ }),

/***/ "./src/content-helper/editor-sidebar/related-posts/component-filter-settings.tsx":
/*!***************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/related-posts/component-filter-settings.tsx ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelatedPostsFilterSettings: function() { return /* binding */ RelatedPostsFilterSettings; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

/**
 * Returns the filter types ToggleGroupControl component.
 *
 * @since 3.14.0
 *
 * @param {FilterTypesProps} props The component's props.
 */
var FilterTypes = function (_a) {
  var filter = _a.filter,
    label = _a.label,
    postData = _a.postData,
    props = __rest(_a, ["filter", "label", "postData"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "related-posts-filter-types",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: label ? label : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter by', 'wp-parsely'),
      value: filter.type,
      onChange: function (value) {
        return props.onFilterTypeChange(value);
      },
      isBlock: true,
      children: [postData.tags.length >= 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Tag,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tag', 'wp-parsely')
      }), postData.categories.length >= 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Section,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Section', 'wp-parsely')
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Author,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Author', 'wp-parsely')
      })]
    })
  });
};
/**
 * Returns the filter values ComboboxControl component.
 *
 * @since 3.14.0
 *
 * @param {FilterValuesProps} props The component's props.
 */
var FilterValues = function (_a) {
  var filter = _a.filter,
    postData = _a.postData,
    props = __rest(_a, ["filter", "postData"]);
  /**
   * Returns the options that will populate the ComboboxControl.
   *
   * @since 3.11.0
   *
   * @return {ComboboxControlOption[]} The resulting ComboboxControl options.
   */
  var getOptions = function () {
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Tag === filter.type) {
      return postData.tags.map(function (tag) {
        return {
          value: tag,
          label: tag
        };
      });
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Section === filter.type) {
      return postData.categories.map(function (section) {
        return {
          value: section,
          label: section
        };
      });
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Author === filter.type) {
      return postData.authors.map(function (author) {
        return {
          value: author,
          label: author
        };
      });
    }
    return [];
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "related-posts-filter-values",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ComboboxControl, {
      __next40pxDefaultSize: true,
      allowReset: true,
      onChange: function (selection) {
        return props.onFilterValueChange(selection);
      },
      options: getOptions(),
      value: filter.value
    })
  });
};
/**
 * Returns the filter settings component.
 *
 * @since 3.14.0
 *
 * @param {FilterControlsProps} props The component's props.
 */
var RelatedPostsFilterSettings = function (_a) {
  var filter = _a.filter,
    postData = _a.postData,
    label = _a.label,
    props = __rest(_a, ["filter", "postData", "label"]);
  /**
   * Returns whether the filter values ComboboxControl should be displayed.
   *
   * @since 3.11.0
   *
   * @return {boolean} Whether to display the filter values ComboboxControl.
   */
  var shouldDisplayFilterValues = function () {
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Tag === filter.type && postData.tags.length > 1 || _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Section === filter.type && postData.categories.length > 1 || _common_utils_constants__WEBPACK_IMPORTED_MODULE_3__.PostFilterType.Author === filter.type && postData.authors.length > 1) {
      return true;
    }
    return false;
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FilterTypes, {
      filter: filter,
      label: label,
      onFilterTypeChange: props.onFilterTypeChange,
      postData: postData
    }), shouldDisplayFilterValues() && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FilterValues, {
      filter: filter,
      onFilterValueChange: props.onFilterValueChange,
      postData: postData
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/related-posts/component-item.tsx":
/*!****************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/related-posts/component-item.tsx ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelatedPostItem: function() { return /* binding */ RelatedPostItem; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/seen.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/copy-small.js");
/* harmony import */ var _common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/icons/leaf-icon */ "./src/content-helper/common/icons/leaf-icon.tsx");
/* harmony import */ var _common_utils_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/functions */ "./src/content-helper/common/utils/functions.ts");
/* harmony import */ var _common_utils_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/utils/post */ "./src/content-helper/common/utils/post.tsx");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



/**
 * Returns a vertical divider.
 *
 * @since 3.14.0
 */
var VerticalDivider = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1",
    height: "40",
    viewBox: "0 0 1 40",
    fill: "none",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Rect, {
      width: "1",
      height: "40",
      fill: "#cccccc"
    })
  });
};
/**
 * Returns a single related post item.
 *
 * @since 3.14.0
 *
 * @param { PostListItemProps } props The component's props.
 */
var RelatedPostItem = function (_a) {
  var metric = _a.metric,
    post = _a.post,
    postContent = _a.postContent;
  var createNotice = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/notices').createNotice;
  /**
   * Checks if a hyperlink is present in the content by using a regular expression.
   *
   * @since 3.14.1
   *
   * @param { string } content
   * @param { string } rawUrl
   *
   * @return { boolean } Whether the link is present in the content.
   */
  var isLinkPresentInContent = function (content, rawUrl) {
    var escapedUrl = (0,_common_utils_functions__WEBPACK_IMPORTED_MODULE_5__.escapeRegExp)(rawUrl);
    var regexPattern = new RegExp("<a [^>]*href=[\"'](http://|https://)?.*".concat(escapedUrl, ".*[\"'][^>]*>"), 'i');
    return regexPattern.test(content);
  };
  var isLinked = postContent && isLinkPresentInContent(postContent, post.rawUrl);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "related-post-single",
    "data-testid": "related-post-single",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "related-post-title",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
        href: post.url,
        target: "_blank",
        rel: "noreferrer",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "screen-reader-text",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('View on website (opens new tab)', 'wp-parsely')
        }), post.title]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "related-post-actions",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "related-post-info",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "related-post-metric",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_utils_post__WEBPACK_IMPORTED_MODULE_6__.PostListItemMetric, {
              metric: metric,
              post: post,
              viewsIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
              }),
              avgEngagedIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
                icon: "clock",
                size: 24
              })
            })
          }), isLinked && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "related-post-linked",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
              text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This post is linked in the content', 'wp-parsely'),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
                size: 24
              })
            })
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VerticalDivider, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
            iconSize: 24,
            onClick: function () {
              navigator.clipboard.writeText(post.rawUrl).then(function () {
                createNotice('success', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('URL copied to clipboard', 'wp-parsely'), {
                  type: 'snackbar',
                  isDismissible: true
                });
              });
            },
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Copy URL to clipboard', 'wp-parsely')
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_4__.LeafIcon, {}),
            iconSize: 18,
            href: post.dashUrl,
            target: '_blank',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('View in Parse.ly', 'wp-parsely')
          })]
        })]
      })
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/related-posts/component.tsx":
/*!***********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/related-posts/component.tsx ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelatedPostsPanel: function() { return /* binding */ RelatedPostsPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
/* harmony import */ var _component_filter_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component-filter-settings */ "./src/content-helper/editor-sidebar/related-posts/component-filter-settings.tsx");
/* harmony import */ var _component_item__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component-item */ "./src/content-helper/editor-sidebar/related-posts/component-item.tsx");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./provider */ "./src/content-helper/editor-sidebar/related-posts/provider.ts");
/* harmony import */ var _related_posts_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./related-posts.scss */ "./src/content-helper/editor-sidebar/related-posts/related-posts.scss");
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


// eslint-disable-next-line import/named












var FETCH_RETRIES = 1;
/**
 * The Related Posts panel in the Editor Sidebar.
 *
 * @since 3.14.0
 */
var RelatedPostsPanel = function () {
  var _a = (0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.useSettings)(),
    settings = _a.settings,
    setSettings = _a.setSettings;
  var period = settings.RelatedPostsPeriod;
  var metric = settings.RelatedPostsMetric;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({
      authors: [],
      categories: [],
      tags: []
    }),
    postData = _b[0],
    setPostData = _b[1];
  /**
   * Returns the current Post's ID, tags and categories.
   *
   * @since 3.11.0
   * @since 3.14.0 Moved from `editor-sidebar.tsx`.
   */
  var _c = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(function (select) {
      var getEditedPostAttribute = select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_5__.store).getEditedPostAttribute;
      var getEntityRecords = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getEntityRecords;
      var authorRecords = getEntityRecords('root', 'user', {
        include: getEditedPostAttribute('author')
      });
      var categoryRecords = getEntityRecords('taxonomy', 'category', {
        include: getEditedPostAttribute('categories')
      });
      var tagRecords = getEntityRecords('taxonomy', 'post_tag', {
        include: getEditedPostAttribute('tags')
      });
      return {
        authors: authorRecords,
        categories: categoryRecords,
        tags: tagRecords
      };
    }, []),
    authors = _c.authors,
    categories = _c.categories,
    tags = _c.tags;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function () {
    // Set the post data only when all required properties have become
    // available.
    if (authors && categories && tags) {
      setPostData({
        authors: authors.map(function (a) {
          return a.name;
        }),
        categories: categories.map(function (c) {
          return c.name;
        }),
        tags: tags.map(function (t) {
          return t.name;
        })
      });
    }
  }, [authors, categories, tags]);
  var _d = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(true),
    loading = _d[0],
    setLoading = _d[1];
  var _e = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(),
    error = _e[0],
    setError = _e[1];
  var _f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(),
    message = _f[0],
    setMessage = _f[1];
  var _g = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)([]),
    posts = _g[0],
    setPosts = _g[1];
  var _h = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)({
      type: settings.RelatedPostsFilterBy,
      value: settings.RelatedPostsFilterValue
    }),
    filter = _h[0],
    setFilter = _h[1];
  var _j = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(undefined),
    postContent = _j[0],
    setPostContent = _j[1];
  var debouncedSetPostContent = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(setPostContent, 1000);
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(function (select) {
    var getEditedPostContent = select('core/editor').getEditedPostContent;
    debouncedSetPostContent(getEditedPostContent());
  }, [debouncedSetPostContent]);
  /**
   * Updates all filter settings.
   *
   * @since 3.13.0
   * @since 3.14.0 Renamed from `handleRelatedPostsFilterChange` and
   * moved from the editor sidebar to the related posts component.
   *
   * @param {PostFilterType} filterBy The new filter type.
   * @param {string}         value    The new filter value.
   */
  var onFilterChange = function (filterBy, value) {
    setSettings({
      RelatedPostsFilterBy: filterBy,
      RelatedPostsFilterValue: value
    });
  };
  /**
   * Updates the metric setting.
   *
   * @since 3.14.0
   *
   * @param {string} selection The new metric.
   */
  var onMetricChange = function (selection) {
    if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.isInEnum)(selection, _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.Metric)) {
      setSettings({
        RelatedPostsMetric: selection
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('related_posts_metric_changed', {
        metric: selection
      });
    }
  };
  /**
   * Updates the period setting.
   *
   * @since 3.14.0
   *
   * @param {string} selection The new period.
   */
  var onPeriodChange = function (selection) {
    if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.isInEnum)(selection, _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.Period)) {
      setSettings({
        RelatedPostsPeriod: selection
      });
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('related_posts_period_changed', {
        period: selection
      });
    }
  };
  /**
   * Updates the filter type and sets its default value.
   *
   * @since 3.11.0
   *
   * @param {string} newFilterType The new filter type.
   */
  var updateFilterType = function (newFilterType) {
    if ((0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.isInEnum)(newFilterType, _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType)) {
      var value = '';
      var type = newFilterType;
      if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Tag === type) {
        value = postData.tags[0];
      }
      if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Section === type) {
        value = postData.categories[0];
      }
      if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Author === type) {
        value = postData.authors[0];
      }
      if ('' !== value) {
        onFilterChange(type, value);
        setFilter({
          type: type,
          value: value
        });
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_8__.Telemetry.trackEvent('related_posts_filter_type_changed', {
          filter_type: type
        });
      }
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function () {
    /**
     * Returns whether the post data passed into this component is empty.
     *
     * @since 3.14.0
     *
     * @return {boolean} Whether the post data is empty.
     */
    var isPostDataEmpty = function () {
      return Object.values(postData).every(function (value) {
        return 0 === value.length;
      });
    };
    /**
     * Returns the initial filter settings.
     *
     * The selection is based on whether the Post has tags or categories
     * assigned to it. Otherwise, the filter is set to the first author.
     *
     * @since 3.11.0
     *
     * @return {PostFilter} The initial filter settings.
     */
    var getInitialFilterSettings = function () {
      var value = '';
      var type = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Unavailable;
      if (postData.tags.length >= 1) {
        type = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Tag;
        value = postData.tags[0];
      } else if (postData.categories.length >= 1) {
        type = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Section;
        value = postData.categories[0];
      } else {
        type = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Author;
        value = postData.authors[0];
      }
      return {
        type: type,
        value: value
      };
    };
    var fetchPosts = function (retries) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          _provider__WEBPACK_IMPORTED_MODULE_13__.RelatedPostsProvider.getRelatedPosts(period, metric, filter).then(function (result) {
            setPosts(result.posts);
            setMessage(result.message);
            setLoading(false);
          }).catch(function (err) {
            return __awaiter(void 0, void 0, void 0, function () {
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

    var filterTypeIsTag = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Tag === filter.type;
    var filterTypeIsSection = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Section === filter.type;
    var filterTypeIsUnavailable = _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Unavailable === filter.type;
    var noTagsExist = 0 === postData.tags.length;
    var noCategoriesExist = 0 === postData.categories.length;
    var tagIsUnavailable = filterTypeIsTag && !postData.tags.includes(filter.value);
    var sectionIsUnavailable = filterTypeIsSection && !postData.categories.includes(filter.value);
    setLoading(true);
    if (filterTypeIsUnavailable || filterTypeIsTag && noTagsExist || filterTypeIsSection && noCategoriesExist) {
      if (!isPostDataEmpty()) {
        setFilter(getInitialFilterSettings());
      }
    } else if (tagIsUnavailable) {
      setFilter({
        type: _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Tag,
        value: postData.tags[0]
      });
    } else if (sectionIsUnavailable) {
      setFilter({
        type: _common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Section,
        value: postData.categories[0]
      });
    } else {
      fetchPosts(FETCH_RETRIES);
    }
    return function () {
      setLoading(false);
      setPosts([]);
      setMessage('');
      setError(undefined);
    };
  }, [period, metric, filter, postData]);
  /**
   * Updates the filter value.
   *
   * @param {string} newFilterValue The new filter value.
   *
   * @since 3.11.0
   */
  var updateFilterValue = function (newFilterValue) {
    if (typeof newFilterValue === 'string') {
      onFilterChange(filter.type, newFilterValue);
      setFilter(__assign(__assign({}, filter), {
        value: newFilterValue
      }));
    }
  };
  /**
   * Returns the top related posts message.
   *
   * If the filter is by Author: "Top related posts by [post_author] in the [period]."
   * If the filter is by Section: "Top related posts in the “[section_name]” section in the [period]."
   * If the filter is by Tag: "Top related posts with the “[wp_term name]” tag in the [period]."
   *
   * @since 3.14.0
   */
  var getTopRelatedPostsMessage = function () {
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Tag === filter.type) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)( /* translators: 1: tag name, 2: period */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Top related posts with the “%1$s” tag in the %2$s.', 'wp-parsely'), filter.value, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.getPeriodDescription)(period, true));
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Section === filter.type) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)( /* translators: 1: section name, 2: period */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Top related posts in the “%1$s” section in the %2$s.', 'wp-parsely'), filter.value, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.getPeriodDescription)(period, true));
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.PostFilterType.Author === filter.type) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)( /* translators: 1: author name, 2: period */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Top related posts by %1$s in the %2$s.', 'wp-parsely'), filter.value, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.getPeriodDescription)(period, true));
    }
    // Fallback to the default message.
    return message !== null && message !== void 0 ? message : '';
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wp-parsely-related-posts",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "related-posts-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Find top-performing related posts based on a key metric.', 'wp-parsely')
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "related-posts-body",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "related-posts-settings",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          size: "__unstable-large",
          onChange: function (value) {
            return onMetricChange(value);
          },
          prefix: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControlPrefixWrapper, {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Metric: ', 'wp-parsely')
          }),
          value: metric,
          children: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.Metric).map(function (value) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: value,
              children: (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.getMetricDescription)(value)
            }, value);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          size: "__unstable-large",
          value: period,
          prefix: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControlPrefixWrapper, {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Period: ', 'wp-parsely'), " "]
          }),
          onChange: function (selection) {
            return onPeriodChange(selection);
          },
          children: Object.values(_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.Period).map(function (value) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: value,
              children: (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_10__.getPeriodDescription)(value)
            }, value);
          })
        })]
      }), (postData.tags.length > 0 || postData.categories.length > 0) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "related-posts-filter-settings",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_filter_settings__WEBPACK_IMPORTED_MODULE_11__.RelatedPostsFilterSettings, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Filter by', 'wp-parsely'),
          filter: filter,
          onFilterTypeChange: updateFilterType,
          onFilterValueChange: updateFilterValue,
          postData: postData
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "related-posts-wrapper",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "related-posts-descr",
            "data-testid": "parsely-related-posts-descr",
            children: getTopRelatedPostsMessage()
          })
        }), error && error.Message(), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "related-posts-loading-message",
          "data-testid": "parsely-related-posts-loading-message",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Loading…', 'wp-parsely')
        }), !loading && !error && posts.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "related-posts-empty",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('No related posts found.', 'wp-parsely')
        }), !loading && posts.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "related-posts-list",
          children: posts.map(function (post) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_item__WEBPACK_IMPORTED_MODULE_12__.RelatedPostItem, {
              metric: metric,
              post: post,
              postContent: postContent
            }, post.id);
          })
        })]
      })]
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/related-posts/provider.ts":
/*!*********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/related-posts/provider.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RELATED_POSTS_DEFAULT_LIMIT: function() { return /* binding */ RELATED_POSTS_DEFAULT_LIMIT; },
/* harmony export */   RelatedPostsProvider: function() { return /* binding */ RelatedPostsProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils/api */ "./src/content-helper/common/utils/api.ts");
/* harmony import */ var _common_utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/utils/constants */ "./src/content-helper/common/utils/constants.ts");
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



var RELATED_POSTS_DEFAULT_LIMIT = 5;
var RelatedPostsProvider = /** @class */function () {
  function RelatedPostsProvider() {}
  /**
   * Returns related posts to the one that is currently being edited within
   * the WordPress Block Editor.
   *
   * The 'related' status is determined by the current post's Author, Category
   * or tag.
   *
   * @param {Period}     period The period for which to fetch data.
   * @param {Metric}     metric The metric to sort by.
   * @param {PostFilter} filter The selected filter type and value to use.
   *
   * @return {Promise<GetRelatedPostsResult>} Object containing message and posts.
   */
  RelatedPostsProvider.getRelatedPosts = function (period, metric, filter) {
    return __awaiter(this, void 0, void 0, function () {
      var apiQuery, data, contentHelperError_1, message;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            try {
              apiQuery = this.buildRelatedPostsApiQuery(period, metric, filter);
            } catch (contentHelperError) {
              return [2 /*return*/, Promise.reject(contentHelperError)];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3,, 4]);
            return [4 /*yield*/, this.fetchRelatedPostsFromWpEndpoint(apiQuery)];
          case 2:
            data = _a.sent();
            return [3 /*break*/, 4];
          case 3:
            contentHelperError_1 = _a.sent();
            return [2 /*return*/, Promise.reject(contentHelperError_1)];
          case 4:
            message = this.generateMessage(data.length === 0, period, apiQuery.message);
            return [2 /*return*/, {
              message: message,
              posts: data
            }];
        }
      });
    });
  };
  /**
   * Generates the message that will be displayed above the related posts.
   *
   * @since 3.11.0
   *
   * @param {boolean} dataIsEmpty     Whether the API returned no data.
   * @param {Period}  period          The period for which data was fetched.
   * @param {string}  apiQueryMessage The message within the query.
   *
   * @return {string} The generated message.
   */
  RelatedPostsProvider.generateMessage = function (dataIsEmpty, period, apiQueryMessage) {
    if (dataIsEmpty) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: 1: message such as "in category Foo" */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No related posts %1$s were found for the specified period and metric.', 'wp-parsely'), apiQueryMessage);
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: 1: message such as "in category Foo", 2: period such as "last 7 days"*/
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Related posts %1$s in the %2$s.', 'wp-parsely'), apiQueryMessage, (0,_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.getPeriodDescription)(period, true));
  };
  /**
   * Fetches the related posts data from the WordPress REST API.
   *
   * @param {RelatedPostsApiQuery} query
   * @return {Promise<Array<PostData>>} Array of fetched posts.
   */
  RelatedPostsProvider.fetchRelatedPostsFromWpEndpoint = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      var response, wpError_1;
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)('/wp-parsely/v1/stats/posts', __assign(__assign({}, query.query), {
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
  /**
   * Builds the query object used in the API for performing the related
   * posts request.
   *
   * @param {Period}     period The period for which to fetch data.
   * @param {Metric}     metric The metric to sort by.
   * @param {PostFilter} filter The selected filter type and value to use.
   *
   * @return {RelatedPostsApiQuery} The query object.
   */
  RelatedPostsProvider.buildRelatedPostsApiQuery = function (period, metric, filter) {
    var commonQueryParams = __assign(__assign({}, (0,_common_utils_api__WEBPACK_IMPORTED_MODULE_4__.getApiPeriodParams)(period)), {
      limit: RELATED_POSTS_DEFAULT_LIMIT,
      sort: metric
    });
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.PostFilterType.Tag === filter.type) {
      return {
        query: __assign({
          tag: filter.value
        }, commonQueryParams),
        /* translators: %s: message such as "with tag Foo" */
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('with tag "%1$s"', 'wp-parsely'), filter.value)
      };
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.PostFilterType.Section === filter.type) {
      return {
        query: __assign({
          section: filter.value
        }, commonQueryParams),
        /* translators: %s: message such as "in category Foo" */
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('in section "%1$s"', 'wp-parsely'), filter.value)
      };
    }
    if (_common_utils_constants__WEBPACK_IMPORTED_MODULE_5__.PostFilterType.Author === filter.type) {
      return {
        query: __assign({
          author: filter.value
        }, commonQueryParams),
        /* translators: %s: message such as "by author John" */
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('by author "%1$s"', 'wp-parsely'), filter.value)
      };
    }
    // No filter type has been specified. The query cannot be formulated.
    throw new _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No valid filter type has been specified.', 'wp-parsely'), _common_content_helper_error__WEBPACK_IMPORTED_MODULE_3__.ContentHelperErrorCode.CannotFormulateApiQuery);
  };
  return RelatedPostsProvider;
}();


/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/component-block-overlay.tsx":
/*!*************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/component-block-overlay.tsx ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockOverlay: function() { return /* binding */ BlockOverlay; },
/* harmony export */   initBlockOverlay: function() { return /* binding */ initBlockOverlay; },
/* harmony export */   withBlockOverlay: function() { return /* binding */ withBlockOverlay; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/smart-linking/store.ts");
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
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */

/**
 * Draws an overlay over the selected block.
 *
 * @since 3.14.0
 *
 * @param {BlockOverlayProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
var BlockOverlay = function (_a) {
  var selectedBlockClientId = _a.selectedBlockClientId,
    label = _a.label;
  // Create a container element for the overlay.
  var container = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(document.createElement('div'))[0];
  container.className = 'wp-parsely-block-overlay';
  if (selectedBlockClientId === 'all') {
    container.className += ' full-content-overlay';
  }
  // When clicking the overlay, we want the underlying block to be selected.
  container.onclick = function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (selectedBlockClientId === 'all') {
      return;
    }
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').selectBlock(selectedBlockClientId, -1);
    // When nested blocks are selected, the block editor will focus the outermost block.
    // We need to blur the focused element to avoid this.
    var activeElement = container.ownerDocument.activeElement;
    activeElement.blur();
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (!selectedBlockClientId) {
      return;
    }
    /**
     * If the selected block is the "All content" block, we need to append the overlay
     * to the editor element instead of the block element.
     */
    if (selectedBlockClientId === 'all') {
      var editorElement_1 = document.querySelector('.interface-navigable-region.interface-interface-skeleton__content');
      editorElement_1 === null || editorElement_1 === void 0 ? void 0 : editorElement_1.appendChild(container);
      // Set overflow to hidden.
      editorElement_1 === null || editorElement_1 === void 0 ? void 0 : editorElement_1.setAttribute('style', 'overflow: hidden');
      container.style.top = (editorElement_1 === null || editorElement_1 === void 0 ? void 0 : editorElement_1.scrollTop) + 'px';
      return function () {
        if (editorElement_1 === null || editorElement_1 === void 0 ? void 0 : editorElement_1.contains(container)) {
          editorElement_1.removeChild(container);
        }
        // Restore overflow.
        editorElement_1 === null || editorElement_1 === void 0 ? void 0 : editorElement_1.setAttribute('style', '');
        container.style.top = '';
      };
    }
    var blockElement = document.querySelector("[data-block=\"".concat(selectedBlockClientId, "\"]"));
    // Disable changes on the block element.
    blockElement === null || blockElement === void 0 ? void 0 : blockElement.setAttribute('contenteditable', 'false');
    blockElement === null || blockElement === void 0 ? void 0 : blockElement.setAttribute('aria-disabled', 'true');
    // Insert the container in the block element.
    blockElement === null || blockElement === void 0 ? void 0 : blockElement.appendChild(container);
    // Remove the container on component unload.
    return function () {
      // Enable changes on the block element.
      blockElement === null || blockElement === void 0 ? void 0 : blockElement.setAttribute('contenteditable', 'true');
      blockElement === null || blockElement === void 0 ? void 0 : blockElement.removeAttribute('aria-disabled');
      if (blockElement === null || blockElement === void 0 ? void 0 : blockElement.contains(container)) {
        blockElement.removeChild(container);
      }
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wp-parsely-block-overlay-label",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      children: label
    })]
  }), container);
};
/**
 * Draws an overlay over the full block editor, when the "All content" is selected.
 *
 * @since 3.14.0
 *
 * @return {JSX.Element} The JSX Element.
 */
var BlockOverlayFullContent = function () {
  var overlayBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(function (select) {
    var getOverlayBlocks = select(_store__WEBPACK_IMPORTED_MODULE_8__.SmartLinkingStore).getOverlayBlocks;
    return {
      overlayBlocks: getOverlayBlocks()
    };
  }, []).overlayBlocks;
  if (overlayBlocks.includes('all')) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockOverlay, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Generating Smart Links…', 'wp-parsely'),
      selectedBlockClientId: 'all'
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
};
/**
 * A higher-order component that adds a block overlay over a specific block, flagged by the Smart Linking store.
 *
 * @since 3.14.0
 */
var withBlockOverlay = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var overlayBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(function (select) {
      var getOverlayBlocks = select(_store__WEBPACK_IMPORTED_MODULE_8__.SmartLinkingStore).getOverlayBlocks;
      return {
        overlayBlocks: getOverlayBlocks()
      };
    }, []).overlayBlocks;
    // If the block ID is currently on the overlayBlocks array, we should render the overlay.
    if (!overlayBlocks.includes(props.clientId)) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props));
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockOverlay, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Generating Smart Links…', 'wp-parsely'),
        selectedBlockClientId: props.clientId
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props))]
    });
  };
}, 'withBlockOverlay');
/**
 * Initializes the block overlay, by adding the filter for individual blocks and
 * registering a plugin for the full content overlay.
 *
 * @since 3.14.0
 */
var initBlockOverlay = function () {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'wpparsely/block-overlay', withBlockOverlay);
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_7__.registerPlugin)('wp-parsely-block-overlay', {
    render: BlockOverlayFullContent
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/component-settings.tsx":
/*!********************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/component-settings.tsx ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmartLinkingSettings: function() { return /* binding */ SmartLinkingSettings; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_components_input_range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/components/input-range */ "./src/content-helper/common/components/input-range/index.ts");
/* harmony import */ var _smart_linking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./smart-linking */ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/smart-linking/store.ts");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



/**
 * Settings for the Smart Linking.
 *
 * @since 3.14.0
 *
 * @param {SmartLinkingSettingsProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
var SmartLinkingSettings = function (_a) {
  var _b = _a.disabled,
    disabled = _b === void 0 ? false : _b,
    selectedBlock = _a.selectedBlock,
    onSettingChange = _a.onSettingChange;
  /**
   * Gets the value for the ToggleGroupControl.
   *
   * @since 3.14.0
   */
  var getToggleGroupValue = function () {
    if (fullContent) {
      return 'all';
    }
    if (selectedBlock && selectedBlock !== 'all') {
      return 'selected';
    }
    return 'all';
  };
  var toggleGroupRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)();
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(getToggleGroupValue()),
    applyTo = _c[0],
    setApplyTo = _c[1];
  /**
   * Gets the settings from the Smart Linking store.
   *
   * @since 3.14.0
   */
  var _d = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
      var _a = select(_store__WEBPACK_IMPORTED_MODULE_7__.SmartLinkingStore),
        getMaxLinkWords = _a.getMaxLinkWords,
        getMaxLinks = _a.getMaxLinks,
        isFullContent = _a.isFullContent,
        wasAlreadyClicked = _a.wasAlreadyClicked;
      return {
        maxLinks: getMaxLinks(),
        maxLinkWords: getMaxLinkWords(),
        fullContent: isFullContent(),
        alreadyClicked: wasAlreadyClicked()
      };
    }, []),
    maxLinks = _d.maxLinks,
    maxLinkWords = _d.maxLinkWords,
    fullContent = _d.fullContent,
    alreadyClicked = _d.alreadyClicked;
  var _e = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.SmartLinkingStore),
    setMaxLinks = _e.setMaxLinks,
    setMaxLinkWords = _e.setMaxLinkWords,
    setFullContent = _e.setFullContent,
    setAlreadyClicked = _e.setAlreadyClicked;
  /**
   * Handles the change event of the ToggleGroupControl.
   * It updates the settings based on the selected value.
   *
   * @since 3.14.0
   *
   * @param {string|number|undefined} value The selected value.
   */
  var onToggleGroupChange = function (value) {
    if (disabled) {
      return;
    }
    // Update the settings based on the selected value.
    setFullContent(value === 'all');
    setApplyTo(value);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (disabled) {
      return;
    }
    var value = getToggleGroupValue();
    setApplyTo(value);
    // The first time selectedBlock changes, for some reason the ToggleGroupControl
    // doesn't update the value. This workaround programmatically clicks the button
    // to set the correct value.
    if (toggleGroupRef.current && value && !alreadyClicked && selectedBlock) {
      var targetButton = toggleGroupRef.current.querySelector("button[data-value=\"".concat(value, "\"]"));
      if (targetButton && targetButton.getAttribute('aria-checked') !== 'true') {
        // Simulate a click on the button to set the correct value.
        targetButton.click();
        // Flag that the button was already clicked as it's only needed on the first time.
        setAlreadyClicked(true);
      }
    }
  }, [selectedBlock, fullContent, disabled]); // eslint-disable-line
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "parsely-panel-settings",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "parsely-panel-settings-body",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "smart-linking-block-select",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Disabled, {
          isDisabled: disabled,
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
            ref: toggleGroupRef,
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            isBlock: true,
            value: fullContent ? 'all' : applyTo,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Apply Smart Links to', 'wp-parsely'),
            onChange: onToggleGroupChange,
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Selected Block', 'wp-parsely'),
              disabled: !selectedBlock,
              value: "selected"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('All Blocks', 'wp-parsely'),
              value: "all"
            })]
          })
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "smart-linking-settings",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_components_input_range__WEBPACK_IMPORTED_MODULE_5__.InputRange, {
          value: maxLinks,
          onChange: function (value) {
            setMaxLinks(value !== null && value !== void 0 ? value : 1);
            onSettingChange('SmartLinkingMaxLinks', value !== null && value !== void 0 ? value : _smart_linking__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_MAX_LINKS);
          },
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Max Number of Links', 'wp-parsely'),
          suffix: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Links', 'wp-parsely'),
          min: 1,
          max: 20,
          initialPosition: maxLinks,
          disabled: disabled
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_components_input_range__WEBPACK_IMPORTED_MODULE_5__.InputRange, {
          value: maxLinkWords,
          onChange: function (value) {
            setMaxLinkWords(value !== null && value !== void 0 ? value : 1);
            onSettingChange('SmartLinkingMaxLinkWords', value !== null && value !== void 0 ? value : _smart_linking__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_MAX_LINK_WORDS);
          },
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Max Link Length', 'wp-parsely'),
          suffix: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Words', 'wp-parsely'),
          min: 1,
          max: 8,
          initialPosition: maxLinkWords,
          disabled: disabled
        })]
      })]
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/component.tsx":
/*!***********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/component.tsx ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmartLinkingPanel: function() { return /* binding */ SmartLinkingPanel; },
/* harmony export */   SmartLinkingPanelContext: function() { return /* binding */ SmartLinkingPanelContext; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/external.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _component_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component-settings */ "./src/content-helper/editor-sidebar/smart-linking/component-settings.tsx");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./provider */ "./src/content-helper/editor-sidebar/smart-linking/provider.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/smart-linking/store.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./src/content-helper/editor-sidebar/smart-linking/utils.ts");
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
 * Defines the possible contexts in which the Smart Linking panel can be used.
 *
 * @since 3.14.0
 */
var SmartLinkingPanelContext;
(function (SmartLinkingPanelContext) {
  SmartLinkingPanelContext["Unknown"] = "unknown";
  SmartLinkingPanelContext["ContentHelperSidebar"] = "content_helper_sidebar";
  SmartLinkingPanelContext["BlockInspector"] = "block_inspector";
})(SmartLinkingPanelContext || (SmartLinkingPanelContext = {}));
/**
 * Smart Linking Panel.
 *
 * @since 3.14.0
 *
 * @param { Readonly<SmartLinkingPanelProps> } props The component's props.
 *
 * @return { JSX.Element } The JSX Element.
 */
var SmartLinkingPanel = function (_a) {
  var className = _a.className,
    selectedBlockClientId = _a.selectedBlockClientId,
    _b = _a.context,
    context = _b === void 0 ? SmartLinkingPanelContext.Unknown : _b;
  var _c = (0,_common_settings__WEBPACK_IMPORTED_MODULE_7__.useSettings)(),
    settings = _c.settings,
    setSettings = _c.setSettings;
  var setSettingsDebounced = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(setSettings, 500);
  var _d = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
    hint = _d[0],
    setHint = _d[1];
  var _e = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0),
    numAddedLinks = _e[0],
    setNumAddedLinks = _e[1];
  var createNotice = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/notices').createNotice;
  /**
   * Loads the Smart Linking store.
   *
   * @since 3.14.0
   */
  var _f = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(function (selectFn) {
      var _a = selectFn(_store__WEBPACK_IMPORTED_MODULE_10__.SmartLinkingStore),
        isLoading = _a.isLoading,
        getOverlayBlocks = _a.getOverlayBlocks,
        getSuggestedLinks = _a.getSuggestedLinks,
        getError = _a.getError,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        isFullContent = _a.isFullContent,
        getMaxLinks = _a.getMaxLinks,
        getMaxLinkWords = _a.getMaxLinkWords,
        getSmartLinkingSettings = _a.getSmartLinkingSettings;
      return {
        loading: isLoading(),
        error: getError(),
        maxLinks: getMaxLinks(),
        maxLinkWords: getMaxLinkWords(),
        isFullContent: isFullContent(),
        overlayBlocks: getOverlayBlocks(),
        suggestedLinks: getSuggestedLinks(),
        smartLinkingSettings: getSmartLinkingSettings()
      };
    }, []),
    loading = _f.loading,
    isFullContent = _f.isFullContent,
    overlayBlocks = _f.overlayBlocks,
    error = _f.error,
    suggestedLinks = _f.suggestedLinks,
    maxLinks = _f.maxLinks,
    maxLinkWords = _f.maxLinkWords,
    smartLinkingSettings = _f.smartLinkingSettings;
  /**
   * Loads the Smart Linking store actions.
   *
   * @since 3.14.0
   */
  var _g = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_10__.SmartLinkingStore),
    setLoading = _g.setLoading,
    setError = _g.setError,
    setSuggestedLinks = _g.setSuggestedLinks,
    addOverlayBlock = _g.addOverlayBlock,
    removeOverlayBlock = _g.removeOverlayBlock,
    setSmartLinkingSettings = _g.setSmartLinkingSettings;
  /**
   * Handles the change of a setting.
   *
   * Updates the settings in the Smart Linking store and the Settings Context.
   *
   * @since 3.14.0
   *
   * @param { keyof SidebarSettings }     setting The setting to change.
   * @param { string | boolean | number } value   The new value of the setting.
   */
  var onSettingChange = function (setting, value) {
    var _a, _b;
    setSettingsDebounced((_a = {}, _a[setting] = value, _a));
    setSmartLinkingSettings((_b = {}, _b[setting] = value, _b));
  };
  /**
   * Loads and prepares the Smart Linking settings from the Settings Context,
   * if they are not already loaded.
   *
   * @since 3.14.0
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    // If the smartLinkingSettings are not empty object, return early.
    if (Object.keys(smartLinkingSettings).length > 0) {
      return;
    }
    // Load the settings from the WordPress database and store them in the Smart Linking store.
    var newSmartLinkingSettings = {
      maxLinksPerPost: settings.SmartLinkingMaxLinks,
      maxLinkWords: settings.SmartLinkingMaxLinkWords
    };
    setSmartLinkingSettings(newSmartLinkingSettings);
  }, [setSmartLinkingSettings, settings]); // eslint-disable-line react-hooks/exhaustive-deps
  /**
   * Loads the selected block and post content.
   *
   * @since 3.14.0
   */
  var _h = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(function (selectFn) {
      var _a = selectFn('core/block-editor'),
        getSelectedBlock = _a.getSelectedBlock,
        getBlock = _a.getBlock,
        getBlocks = _a.getBlocks;
      var getEditedPostContent = selectFn('core/editor').getEditedPostContent;
      return {
        allBlocks: getBlocks(),
        selectedBlock: selectedBlockClientId ? getBlock(selectedBlockClientId) : getSelectedBlock(),
        postContent: getEditedPostContent()
      };
    }, [selectedBlockClientId]),
    selectedBlock = _h.selectedBlock,
    postContent = _h.postContent,
    allBlocks = _h.allBlocks;
  /**
   * Resets the hint when the selected block changes.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    setHint(null);
  }, [selectedBlock]);
  /**
   * Generates smart links for the selected block or the entire post content.
   *
   * @since 3.14.0
   */
  var generateSmartLinks = function () {
    return function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var timeout, generatingFullContent, generatedLinks, e_1;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4 /*yield*/, setLoading(true)];
            case 1:
              _b.sent();
              return [4 /*yield*/, setSuggestedLinks(null)];
            case 2:
              _b.sent();
              return [4 /*yield*/, setError(null)];
            case 3:
              _b.sent();
              _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__.Telemetry.trackEvent('smart_linking_generate_pressed', {
                is_full_content: isFullContent,
                selected_block: (_a = selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.name) !== null && _a !== void 0 ? _a : 'none',
                context: context
              });
              // If selected block is not set, the overlay will be applied to the entire content.
              return [4 /*yield*/, applyOverlay(isFullContent ? 'all' : selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId)];
            case 4:
              // If selected block is not set, the overlay will be applied to the entire content.
              _b.sent();
              timeout = setTimeout(function () {
                var _a;
                setLoading(false);
                _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__.Telemetry.trackEvent('smart_linking_generate_timeout', {
                  is_full_content: isFullContent,
                  selected_block: (_a = selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.name) !== null && _a !== void 0 ? _a : 'none',
                  context: context
                });
                // If selected block is not set, the overlay will be removed from the entire content.
                removeOverlay(isFullContent ? 'all' : selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId);
              }, 60000);
              _b.label = 5;
            case 5:
              _b.trys.push([5, 11, 12, 15]);
              generatingFullContent = isFullContent || !selectedBlock;
              generatedLinks = [];
              if (!((selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.originalContent) && !generatingFullContent)) return [3 /*break*/, 7];
              return [4 /*yield*/, _provider__WEBPACK_IMPORTED_MODULE_9__.SmartLinkingProvider.generateSmartLinks(selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.originalContent, maxLinkWords, maxLinks)];
            case 6:
              generatedLinks = _b.sent();
              return [3 /*break*/, 9];
            case 7:
              return [4 /*yield*/, _provider__WEBPACK_IMPORTED_MODULE_9__.SmartLinkingProvider.generateSmartLinks(postContent, maxLinkWords, maxLinks)];
            case 8:
              generatedLinks = _b.sent();
              _b.label = 9;
            case 9:
              return [4 /*yield*/, setSuggestedLinks(generatedLinks)];
            case 10:
              _b.sent();
              applySmartLinks(generatedLinks);
              return [3 /*break*/, 15];
            case 11:
              e_1 = _b.sent();
              setError(e_1);
              // eslint-disable-next-line no-console
              console.error(e_1);
              createNotice('error', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('There was a problem applying smart links.', 'wp-parsely'), {
                type: 'snackbar',
                isDismissible: true
              });
              return [3 /*break*/, 15];
            case 12:
              return [4 /*yield*/, setLoading(false)];
            case 13:
              _b.sent();
              return [4 /*yield*/, removeOverlay(isFullContent ? 'all' : selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId)];
            case 14:
              _b.sent();
              clearTimeout(timeout);
              return [7 /*endfinally*/];
            case 15:
              return [2 /*return*/];
          }
        });
      });
    };
  };
  /**
   * Applies the smart links to the selected block or the entire post content.
   *
   * @since 3.14.0
   * @since 3.14.1 Moved applyLinksToBlocks to a separate function.
   *
   * @param {LinkSuggestion[]} links The smart links to apply.
   */
  var applySmartLinks = function (links) {
    var _a;
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__.Telemetry.trackEvent('smart_linking_applied', {
      is_full_content: isFullContent || !selectedBlock,
      selected_block: (_a = selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.name) !== null && _a !== void 0 ? _a : 'none',
      links_count: links.length,
      context: context
    });
    var blocks;
    if (selectedBlock && !isFullContent) {
      blocks = [selectedBlock];
    } else {
      blocks = allBlocks;
    }
    // An object to keep track of the number of times each link text has been found across all blocks.
    var occurrenceCounts = {};
    var updatedBlocks = [];
    // Apply the smart links to the content.
    applyLinksToBlocks(blocks, links, occurrenceCounts, updatedBlocks);
    // Update the content of each block.
    updateBlocksContent(updatedBlocks);
    var numberOfUpdatedLinks = Object.values(occurrenceCounts).reduce(function (acc, occurrenceCount) {
      return acc + occurrenceCount.linked;
    }, 0);
    setNumAddedLinks(numberOfUpdatedLinks);
    createNotice('success', "".concat(numberOfUpdatedLinks, " smart links successfully applied."), {
      type: 'snackbar',
      isDismissible: true
    });
  };
  /**
   * Iterates through blocks of content to apply smart link suggestions.
   *
   * This function parses the content of each block, looking for text nodes that match the provided link suggestions.
   * When a match is found, it creates an anchor element (`<a>`) around the matching text with the specified href and
   * title from the link suggestion.
   * It carefully avoids inserting links within existing anchor elements and handles various inline HTML elements gracefully.
   *
   * @since 3.14.1
   *
   * @param {BlockInstance[]}      blocks           The blocks of content where links should be applied.
   * @param {LinkSuggestion[]}     links            An array of link suggestions to apply to the content.
   * @param {LinkOccurrenceCounts} occurrenceCounts An object to keep track of the number of times each link text has
   *                                                been applied across all blocks.
   * @param {BlockUpdate[]}        updatedBlocks    An array of updated blocks with the new content.
   *                                                This array is be updated in place.
   */
  var applyLinksToBlocks = function (blocks, links, occurrenceCounts, updatedBlocks) {
    blocks.forEach(function (block) {
      var blockUpdated = false;
      // Recursively apply links to any inner blocks.
      if (block.innerBlocks && block.innerBlocks.length) {
        applyLinksToBlocks(block.innerBlocks, links, occurrenceCounts, updatedBlocks);
        return;
      }
      if (block.originalContent) {
        var blockContent = block.originalContent;
        var doc = new DOMParser().parseFromString(blockContent, 'text/html');
        var contentElement_1 = doc.body.firstChild;
        if (contentElement_1 && contentElement_1 instanceof HTMLElement) {
          links.forEach(function (link) {
            var textNodes = (0,_utils__WEBPACK_IMPORTED_MODULE_11__.findTextNodesNotInAnchor)(contentElement_1, link.text);
            var occurrenceKey = "".concat(link.text, "#").concat(link.offset);
            if (!occurrenceCounts[occurrenceKey]) {
              occurrenceCounts[occurrenceKey] = {
                encountered: 0,
                linked: 0
              };
            }
            textNodes.forEach(function (node) {
              var _a;
              if (node.textContent) {
                var occurrenceCount = occurrenceCounts[occurrenceKey];
                if (occurrenceCount.linked >= 1) {
                  // The link has already been applied, skip this occurrence.
                  return;
                }
                var regex = new RegExp((0,_utils__WEBPACK_IMPORTED_MODULE_11__.escapeRegExp)(link.text), 'g');
                var match = void 0;
                while ((match = regex.exec(node.textContent)) !== null) {
                  // Increment the encountered count every time the text is found.
                  occurrenceCount.encountered++;
                  // Check if the link is in the correct position (offset) to be applied.
                  if (occurrenceCount.encountered === link.offset + 1) {
                    // Create a new anchor element for the link.
                    var anchor = document.createElement('a');
                    anchor.href = link.href;
                    anchor.title = link.title;
                    anchor.textContent = match[0];
                    // Replace the matched text with the new anchor element.
                    var range = document.createRange();
                    range.setStart(node, match.index);
                    range.setEnd(node, match.index + match[0].length);
                    range.deleteContents();
                    range.insertNode(anchor);
                    // Adjust the text node if there's text remaining after the link.
                    if (node.textContent && match.index + match[0].length < node.textContent.length) {
                      var remainingText = document.createTextNode(node.textContent.slice(match.index + match[0].length));
                      (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(remainingText, anchor.nextSibling);
                    }
                    // Increment the linked count only when a link is applied.
                    occurrenceCount.linked++;
                    // Flag the block as updated.
                    blockUpdated = true;
                  }
                }
              }
            });
          });
          // Save the updated content if the block was updated.
          if (blockUpdated) {
            updatedBlocks.push({
              clientId: block.clientId,
              newContent: contentElement_1.innerHTML
            });
          }
        }
      }
    });
  };
  /**
   * Updates the content of a block with the modified HTML.
   *
   * This function updates the originalContent attribute of the block with the modified HTML.
   * It also recursively updates the content of any inner blocks.
   *
   * @since 3.14.1
   * @since 3.14.3 Rename the function from updateBlockContent to updateBlocksContent.
   *
   * @param {BlockUpdate[]} blockUpdates An array of block updates.
   */
  var updateBlocksContent = function (blockUpdates) {
    var getBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlock;
    var updatedBlocks = {};
    // Prepare the updated blocks object.
    blockUpdates.forEach(function (blockUpdate) {
      var block = getBlock(blockUpdate.clientId);
      if (!block) {
        return;
      }
      updatedBlocks[block.clientId] = {
        content: blockUpdate.newContent
      };
    });
    // Update the blocks attributes.
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').updateBlockAttributes(Object.keys(updatedBlocks), updatedBlocks,
    // @ts-ignore - The uniqueByBlock parameter is not available in the type definition.
    true);
  };
  /**
   * Applies the overlay to the selected block or the entire post content.
   *
   * @since 3.14.0
   *
   * @param {string} clientId The client ID of the block to apply the overlay to.\
   *                          If set to 'all', the overlay will be applied to the entire post content.
   */
  var applyOverlay = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (clientId) {
      if (clientId === void 0) {
        clientId = 'all';
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, addOverlayBlock(clientId)];
          case 1:
            _a.sent();
            disableSave();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Removes the overlay from the selected block or the entire post content.
   *
   * @since 3.14.0
   *
   * @param {string} clientId The client ID of the block to remove the overlay from.
   *                          If set to 'all', the overlay will be removed from the entire post content.
   */
  var removeOverlay = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (clientId) {
      var firstBlock;
      if (clientId === void 0) {
        clientId = 'all';
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, removeOverlayBlock(clientId)];
          case 1:
            _a.sent();
            // Select a block after removing the overlay, only if we're using the block inspector.
            if (context === SmartLinkingPanelContext.BlockInspector) {
              if ('all' !== clientId && !isFullContent) {
                (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').selectBlock(clientId);
              } else {
                firstBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlockOrder()[0];
                // Select the first block in the post.
                (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').selectBlock(firstBlock);
              }
            }
            // If there are no more overlay blocks, enable save.
            if (overlayBlocks.length === 0) {
              enableSave();
            }
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Disables the save button and locks post auto-saving.
   *
   * @since 3.14.0
   */
  var disableSave = function () {
    // Lock post saving.
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').lockPostSaving('wp-parsely-block-overlay');
    // Disable save buttons.
    var saveButtons = document.querySelectorAll('.edit-post-header__settings>[type="button"]');
    saveButtons.forEach(function (button) {
      button.setAttribute('disabled', 'disabled');
    });
  };
  /**
   * Enables the save button and unlocks post auto-saving.
   *
   * @since 3.14.0
   */
  var enableSave = function () {
    // Enable save buttons.
    var saveButtons = document.querySelectorAll('.edit-post-header__settings>[type="button"]');
    saveButtons.forEach(function (button) {
      button.removeAttribute('disabled');
    });
    // Unlock post saving.
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').unlockPostSaving('wp-parsely-block-overlay');
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wp-parsely-smart-linking",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
      className: className,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "smart-linking-text",
        children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Automatically insert links to your most relevant, top performing content.', 'wp-parsely'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          href: "https://docs.parse.ly/plugin-content-helper/#h-smart-linking-beta",
          target: "_blank",
          variant: "link",
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Learn more about Parse.ly AI', 'wp-parsely'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"], {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
            size: 18,
            className: "parsely-external-link-icon"
          })]
        })]
      }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
        status: "info",
        isDismissible: false,
        className: "wp-parsely-content-helper-error",
        children: error.Message()
      }), suggestedLinks !== null && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
        status: "success",
        isDismissible: false,
        className: "wp-parsely-smart-linking-suggested-links",
        children: /* translators: 1 - number of smart links generated */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Successfully added %s smart links.', 'wp-parsely'), numAddedLinks > 0 ? numAddedLinks : suggestedLinks.length)
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_settings__WEBPACK_IMPORTED_MODULE_8__.SmartLinkingSettings, {
        disabled: loading,
        selectedBlock: selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId,
        onSettingChange: onSettingChange
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "smart-linking-generate",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          onClick: generateSmartLinks(),
          variant: "primary",
          isBusy: loading,
          disabled: loading,
          children: loading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Adding Smart Links…', 'wp-parsely') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add Smart Links', 'wp-parsely')
        }), hint && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
          status: "warning",
          isDismissible: true,
          onRemove: function () {
            return setHint(null);
          },
          className: "wp-parsely-smart-linking-hint",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Hint:', 'wp-parsely')
          }), " ", hint]
        })]
      })]
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/provider.ts":
/*!*********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/provider.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmartLinkingProvider: function() { return /* binding */ SmartLinkingProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
/* harmony import */ var _smart_linking__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./smart-linking */ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx");
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
 * Returns data from the `content-suggestions/suggest-linked-reference` WordPress REST API
 * endpoint.
 *
 * @since 3.14.0
 */
var SmartLinkingProvider = /** @class */function () {
  function SmartLinkingProvider() {}
  /**
   * Returns a list of suggested links for the given content.
   *
   * @param {string} content         The content to generate links for.
   * @param {number} maxLinkWords    The maximum number of words in links.
   * @param {number} maxLinksPerPost The maximum number of links to return.
   *
   * @return {Promise<LinkSuggestion[]>} The resulting list of links.
   */
  SmartLinkingProvider.generateSmartLinks = function (content_1) {
    return __awaiter(this, arguments, void 0, function (content, maxLinkWords, maxLinksPerPost) {
      var response, wpError_1;
      var _a;
      if (maxLinkWords === void 0) {
        maxLinkWords = _smart_linking__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_MAX_LINK_WORDS;
      }
      if (maxLinksPerPost === void 0) {
        maxLinksPerPost = _smart_linking__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_MAX_LINKS;
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              method: 'POST',
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)('/wp-parsely/v1/content-suggestions/suggest-linked-reference', {
                max_link_words: maxLinkWords,
                max_links: maxLinksPerPost
              }),
              data: {
                content: content
              }
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
            return [2 /*return*/, (_a = response.data) !== null && _a !== void 0 ? _a : []];
        }
      });
    });
  };
  return SmartLinkingProvider;
}();


/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx":
/*!***************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_MAX_LINKS: function() { return /* binding */ DEFAULT_MAX_LINKS; },
/* harmony export */   DEFAULT_MAX_LINK_WORDS: function() { return /* binding */ DEFAULT_MAX_LINK_WORDS; },
/* harmony export */   initSmartLinking: function() { return /* binding */ initSmartLinking; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/icons/leaf-icon */ "./src/content-helper/common/icons/leaf-icon.tsx");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_verify_credentials__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/verify-credentials */ "./src/content-helper/common/verify-credentials.tsx");
/* harmony import */ var _editor_sidebar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editor-sidebar */ "./src/content-helper/editor-sidebar/editor-sidebar.tsx");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component */ "./src/content-helper/editor-sidebar/smart-linking/component.tsx");
/* harmony import */ var _component_block_overlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component-block-overlay */ "./src/content-helper/editor-sidebar/smart-linking/component-block-overlay.tsx");
/* harmony import */ var _smart_linking_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./smart-linking.scss */ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.scss");
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
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */









var DEFAULT_MAX_LINKS = 10;
var DEFAULT_MAX_LINK_WORDS = 4;
/**
 * Higher order component to add the settings provider to the block edit component.
 * This is required to provide the settings to the smart linking panel.
 *
 * @since 3.14.0
 */
var withSettingsProvider = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    if (props.name !== 'core/paragraph') {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props));
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_settings__WEBPACK_IMPORTED_MODULE_8__.SettingsProvider, {
      endpoint: "editor-sidebar-settings",
      defaultSettings: (0,_editor_sidebar__WEBPACK_IMPORTED_MODULE_10__.getSettingsFromJson)(),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props))
    });
  };
}, 'withSettingsProvider');
/**
 * Smart linking inspector control panel component.
 *
 * @since 3.14.0
 */
var SmartLinkingInspectorControlPanel = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    if (!props.isSelected || props.name !== 'core/paragraph') {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props));
    }
    var _a = (0,_common_settings__WEBPACK_IMPORTED_MODULE_8__.useSettings)(),
      settings = _a.settings,
      setSettings = _a.setSettings;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, __assign({}, props)), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        group: "list",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Smart Linking (Beta)', 'wp-parsely'),
          initialOpen: settings.SmartLinkingOpen,
          className: "wp-parsely-panel wp-parsely-smart-linking-panel",
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_leaf_icon__WEBPACK_IMPORTED_MODULE_7__.LeafIcon, {}),
          onToggle: function (next) {
            setSettings({
              SmartLinkingOpen: next
            });
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_6__.Telemetry.trackEvent('smart_linking_block_inspector_panel_toggled', {
              open: next
            });
          },
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_9__.VerifyCredentials, {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component__WEBPACK_IMPORTED_MODULE_11__.SmartLinkingPanel, {
              selectedBlockClientId: props.clientId,
              context: _component__WEBPACK_IMPORTED_MODULE_11__.SmartLinkingPanelContext.BlockInspector
            })
          })
        })
      })]
    });
  };
}, 'withSmartLinkingPanel');
/**
 * The smart linking panel with settings provider.
 * This is the final component that is added to the block inspector.
 *
 * @since 3.14.0
 */
var SmartLinkingPanelWithSettingsProvider = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.compose)(withSettingsProvider, SmartLinkingInspectorControlPanel);
/**
 * Initializes the smart linking, by adding the smart linking panel to the paragraph block.
 * Also registers the block overlay container.
 *
 * @since 3.14.0
 */
var initSmartLinking = function () {
  /**
   * Add smart linking inspector control panel to paragraph block.
   */
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockEdit', 'wpparsely/smart-linking-inspector-control-panel', SmartLinkingPanelWithSettingsProvider);
  /**
   * Initialize the block overlay component.
   */
  (0,_component_block_overlay__WEBPACK_IMPORTED_MODULE_12__.initBlockOverlay)();
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/store.ts":
/*!******************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/store.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmartLinkingStore: function() { return /* binding */ SmartLinkingStore; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _smart_linking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smart-linking */ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.tsx");
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


var defaultState = {
  isLoading: false,
  fullContent: false,
  suggestedLinks: null,
  error: null,
  settings: {},
  overlayBlocks: [],
  wasAlreadyClicked: false
};
/**
 * The SmartLinking store.
 *
 * @since 3.14.0
 */
var SmartLinkingStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('wp-parsely/smart-linking', {
  initialState: defaultState,
  reducer: function (state, action) {
    if (state === void 0) {
      state = defaultState;
    }
    switch (action.type) {
      case 'SET_LOADING':
        return __assign(__assign({}, state), {
          isLoading: action.isLoading
        });
      case 'SET_OVERLAY_BLOCKS':
        return __assign(__assign({}, state), {
          overlayBlocks: action.overlayBlocks
        });
      case 'SET_ERROR':
        return __assign(__assign({}, state), {
          error: action.error
        });
      case 'ADD_OVERLAY_BLOCK':
        return __assign(__assign({}, state), {
          overlayBlocks: __spreadArray(__spreadArray([], state.overlayBlocks, true), [action.block], false)
        });
      case 'REMOVE_OVERLAY_BLOCK':
        // If the action is 'all', remove all overlay blocks.
        if (action.block === 'all') {
          return __assign(__assign({}, state), {
            overlayBlocks: []
          });
        }
        return __assign(__assign({}, state), {
          overlayBlocks: state.overlayBlocks.filter(function (block) {
            return block !== action.block;
          })
        });
      case 'SET_FULL_CONTENT':
        return __assign(__assign({}, state), {
          fullContent: action.fullContent
        });
      case 'SET_SETTINGS':
        return __assign(__assign({}, state), {
          settings: __assign(__assign({}, state.settings), action.settings)
        });
      case 'SET_SUGGESTED_LINKS':
        return __assign(__assign({}, state), {
          suggestedLinks: action.suggestedLinks
        });
      case 'SET_WAS_ALREADY_CLICKED':
        return __assign(__assign({}, state), {
          wasAlreadyClicked: action.wasAlreadyClicked
        });
      default:
        return state;
    }
  },
  actions: {
    setLoading: function (isLoading) {
      return {
        type: 'SET_LOADING',
        isLoading: isLoading
      };
    },
    setOverlayBlocks: function (overlayBlocks) {
      return {
        type: 'SET_OVERLAY_BLOCKS',
        overlayBlocks: overlayBlocks
      };
    },
    setError: function (error) {
      return {
        type: 'SET_ERROR',
        error: error
      };
    },
    addOverlayBlock: function (block) {
      return {
        type: 'ADD_OVERLAY_BLOCK',
        block: block
      };
    },
    removeOverlayBlock: function (block) {
      return {
        type: 'REMOVE_OVERLAY_BLOCK',
        block: block
      };
    },
    setFullContent: function (fullContent) {
      return {
        type: 'SET_FULL_CONTENT',
        fullContent: fullContent
      };
    },
    setSmartLinkingSettings: function (settings) {
      return {
        type: 'SET_SETTINGS',
        settings: settings
      };
    },
    setMaxLinkWords: function (maxLinkWords) {
      return {
        type: 'SET_SETTINGS',
        settings: {
          maxLinkWords: maxLinkWords
        }
      };
    },
    setMaxLinks: function (maxLinksPerPost) {
      return {
        type: 'SET_SETTINGS',
        settings: {
          maxLinksPerPost: maxLinksPerPost
        }
      };
    },
    setSuggestedLinks: function (suggestedLinks) {
      return {
        type: 'SET_SUGGESTED_LINKS',
        suggestedLinks: suggestedLinks
      };
    },
    setAlreadyClicked: function (wasAlreadyClicked) {
      return {
        type: 'SET_WAS_ALREADY_CLICKED',
        wasAlreadyClicked: wasAlreadyClicked
      };
    }
  },
  selectors: {
    isLoading: function (state) {
      return state.isLoading;
    },
    isFullContent: function (state) {
      return state.fullContent;
    },
    getError: function (state) {
      return state.error;
    },
    getSmartLinkingSettings: function (state) {
      return state.settings;
    },
    getOverlayBlocks: function (state) {
      return state.overlayBlocks;
    },
    getMaxLinkWords: function (state) {
      var _a;
      return (_a = state.settings.maxLinkWords) !== null && _a !== void 0 ? _a : _smart_linking__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MAX_LINK_WORDS;
    },
    getMaxLinks: function (state) {
      var _a;
      return (_a = state.settings.maxLinksPerPost) !== null && _a !== void 0 ? _a : _smart_linking__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MAX_LINKS;
    },
    getSuggestedLinks: function (state) {
      return state.suggestedLinks;
    },
    wasAlreadyClicked: function (state) {
      return state.wasAlreadyClicked;
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(SmartLinkingStore);

/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/utils.ts":
/*!******************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/utils.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeRegExp: function() { return /* reexport safe */ _common_utils_functions__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp; },
/* harmony export */   findTextNodesNotInAnchor: function() { return /* binding */ findTextNodesNotInAnchor; }
/* harmony export */ });
/* harmony import */ var _common_utils_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils/functions */ "./src/content-helper/common/utils/functions.ts");

/**
 * Finds all text nodes in an element that contain a given search text and are not within an anchor tag.
 * This is useful for finding text nodes that should be linked.
 *
 * @since 3.14.1
 *
 * @param {HTMLElement} element    - The element to search within.
 * @param {string}      searchText - The text to search for.
 *
 * @return {Node[]} The text nodes that match the search text and are not within an anchor tag.
 */
function findTextNodesNotInAnchor(element, searchText) {
  var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      var _a;
      if (!node.textContent || !node.textContent.includes(searchText)) {
        return NodeFilter.FILTER_REJECT;
      }
      var parent = node.parentNode;
      while (parent && parent !== element) {
        if (parent.nodeName === 'A' && !((_a = parent.textContent) === null || _a === void 0 ? void 0 : _a.includes(searchText))) {
          return NodeFilter.FILTER_REJECT;
        }
        parent = parent.parentNode;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var textNodes = [];
  var node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  return textNodes;
}

/***/ }),

/***/ "./src/content-helper/editor-sidebar/tabs/sidebar-performance-tab.tsx":
/*!****************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/tabs/sidebar-performance-tab.tsx ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidebarPerformanceTab: function() { return /* binding */ SidebarPerformanceTab; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_verify_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/verify-credentials */ "./src/content-helper/common/verify-credentials.tsx");
/* harmony import */ var _performance_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../performance-details/component */ "./src/content-helper/editor-sidebar/performance-details/component.tsx");

/**
 * Internal dependencies
 */



/**
 * SidebarPerformanceTab component.
 * Renders the Performance tab in the Content Helper Sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarPerformanceTabProps } props The component's props.
 *
 * @return { JSX.Element } The SidebarPerformanceTab JSX Element.
 */
var SidebarPerformanceTab = function (_a) {
  var period = _a.period;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_2__.VerifyCredentials, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_performance_details_component__WEBPACK_IMPORTED_MODULE_3__.PerformanceStats, {
        period: period
      })
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/tabs/sidebar-tools-tab.tsx":
/*!**********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/tabs/sidebar-tools-tab.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidebarToolsTab: function() { return /* binding */ SidebarToolsTab; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _common_verify_credentials__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/verify-credentials */ "./src/content-helper/common/verify-credentials.tsx");
/* harmony import */ var _related_posts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../related-posts/component */ "./src/content-helper/editor-sidebar/related-posts/component.tsx");
/* harmony import */ var _smart_linking_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../smart-linking/component */ "./src/content-helper/editor-sidebar/smart-linking/component.tsx");
/* harmony import */ var _title_suggestions_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../title-suggestions/component */ "./src/content-helper/editor-sidebar/title-suggestions/component.tsx");
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
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */





/**
 * SidebarToolsTab component.
 * Renders the Tools tab in the Content Helper sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarToolsTabProps } props The component's props.
 */
var SidebarToolsTab = function (_a) {
  var trackToggle = _a.trackToggle;
  var _b = (0,_common_settings__WEBPACK_IMPORTED_MODULE_3__.useSettings)(),
    settings = _b.settings,
    setSettings = _b.setSettings;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title Suggestions (Beta)', 'wp-parsely'),
      initialOpen: settings.TitleSuggestionsSettings.Open,
      onToggle: function (next) {
        setSettings({
          TitleSuggestionsSettings: __assign(__assign({}, settings.TitleSuggestionsSettings), {
            Open: next
          })
        });
        trackToggle('title_suggestions', next);
      },
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_4__.VerifyCredentials, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_title_suggestions_component__WEBPACK_IMPORTED_MODULE_7__.TitleSuggestionsPanel, {})
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Smart Linking (Beta)', 'wp-parsely'),
      initialOpen: settings.SmartLinkingOpen,
      onToggle: function (next) {
        setSettings({
          SmartLinkingOpen: next
        });
        trackToggle('smart_linking', next);
      },
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_4__.VerifyCredentials, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_smart_linking_component__WEBPACK_IMPORTED_MODULE_6__.SmartLinkingPanel, {
          context: _smart_linking_component__WEBPACK_IMPORTED_MODULE_6__.SmartLinkingPanelContext.ContentHelperSidebar
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Related Posts', 'wp-parsely'),
      initialOpen: settings.RelatedPostsOpen,
      onToggle: function (next) {
        setSettings({
          RelatedPostsOpen: next
        });
        trackToggle('related_top_posts', next);
      },
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_verify_credentials__WEBPACK_IMPORTED_MODULE_4__.VerifyCredentials, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_related_posts_component__WEBPACK_IMPORTED_MODULE_5__.RelatedPostsPanel, {})
      })
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/component-pinned.tsx":
/*!**********************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/component-pinned.tsx ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinnedTitleSuggestions: function() { return /* binding */ PinnedTitleSuggestions; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pin-small.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _component_title_suggestion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component-title-suggestion */ "./src/content-helper/editor-sidebar/title-suggestions/component-title-suggestion.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/title-suggestions/store.ts");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



/**
 * Renders the Pinned Title Suggestions panel.
 *
 * @since 3.14.0
 *
 * @param {PinnedTitleSuggestionsProps} props The component's props.
 */
var PinnedTitleSuggestions = function (_a) {
  var pinnedTitles = _a.pinnedTitles,
    isOpen = _a.isOpen;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(isOpen),
    isCollapsed = _b[0],
    setIsCollapsed = _b[1];
  /**
   * Toggles the collapse state of the panel.
   *
   * @since 3.14.0
   */
  var toggleCollapse = function () {
    setIsCollapsed(!isCollapsed);
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('title_suggestions_pinned_toggled', {
      is_open: !isCollapsed,
      pinned_titles: pinnedTitles.length
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    className: "wp-parsely-pinned-suggestions",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      className: "wp-parsely-collapsible-panel",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pinned', 'wp-parsely'),
      onToggle: toggleCollapse,
      opened: isCollapsed,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "title-suggestions-container",
        children: pinnedTitles.map(function (title) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_title_suggestion__WEBPACK_IMPORTED_MODULE_5__.TitleSuggestion, {
            title: title,
            type: _store__WEBPACK_IMPORTED_MODULE_6__.TitleType.PostTitle
          }, title.title);
        })
      })
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/component-settings.tsx":
/*!************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/component-settings.tsx ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleSuggestionsSettings: function() { return /* binding */ TitleSuggestionsSettings; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_components_persona_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/components/persona-selector */ "./src/content-helper/common/components/persona-selector/index.ts");
/* harmony import */ var _common_components_tone_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/components/tone-selector */ "./src/content-helper/common/components/tone-selector/index.ts");

/**
 * Internal dependencies
 */



/**
 * Component that renders the settings for the Title Suggestions.
 *
 * @since 3.13.0
 * @since 3.14.0 Removed isOpen prop as the component is no longer collapsible.
 *
 * @param {TitleSuggestionsSettingsProps} props The component props.
 */
var TitleSuggestionsSettings = function (_a) {
  var isLoading = _a.isLoading,
    onPersonaChange = _a.onPersonaChange,
    onToneChange = _a.onToneChange,
    persona = _a.persona,
    tone = _a.tone;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "title-suggestions-settings",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_components_tone_selector__WEBPACK_IMPORTED_MODULE_3__.ToneSelector, {
      tone: tone,
      value: (0,_common_components_tone_selector__WEBPACK_IMPORTED_MODULE_3__.getToneLabel)(tone),
      onChange: function (selectedTone) {
        onToneChange(selectedTone);
      },
      onDropdownChange: function (selectedTone) {
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_1__.Telemetry.trackEvent('title_suggestions_ai_tone_changed', {
          tone: selectedTone
        });
      },
      disabled: isLoading,
      allowCustom: true
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_components_persona_selector__WEBPACK_IMPORTED_MODULE_2__.PersonaSelector, {
      persona: persona,
      value: (0,_common_components_persona_selector__WEBPACK_IMPORTED_MODULE_2__.getPersonaLabel)(persona),
      onChange: function (selectedPersona) {
        onPersonaChange(selectedPersona);
      },
      onDropdownChange: function (selectedPersona) {
        _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_1__.Telemetry.trackEvent('title_suggestions_ai_persona_changed', {
          persona: selectedPersona
        });
      },
      disabled: isLoading,
      allowCustom: true
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/component-suggestions.tsx":
/*!***************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/component-suggestions.tsx ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleSuggestions: function() { return /* binding */ TitleSuggestions; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_icons_ai_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/icons/ai-icon */ "./src/content-helper/common/icons/ai-icon.tsx");
/* harmony import */ var _component_title_suggestion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component-title-suggestion */ "./src/content-helper/editor-sidebar/title-suggestions/component-title-suggestion.tsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/title-suggestions/store.ts");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




/**
 * Renders the Title Suggestions collapsible panel.
 *
 * @since 3.14.0
 *
 * @param {TitleSuggestionsProps} props The component's props.
 */
var TitleSuggestions = function (_a) {
  var suggestions = _a.suggestions,
    isOpen = _a.isOpen,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(isOpen),
    isCollapsed = _c[0],
    setIsCollapsed = _c[1];
  /**
   * Toggles the collapse state of the panel.
   *
   * @since 3.14.0
   */
  var toggleCollapse = function () {
    setIsCollapsed(!isCollapsed);
    _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_4__.Telemetry.trackEvent('title_suggestions_suggestions_toggled', {
      is_open: !isCollapsed,
      suggestions: suggestions.length
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    className: "wp-parsely-title-suggestions",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      className: "wp-parsely-collapsible-panel",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Suggestions', 'wp-parsely'),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_icons_ai_icon__WEBPACK_IMPORTED_MODULE_5__.AiIcon, {
        className: "components-panel__icon"
      }),
      onToggle: toggleCollapse,
      opened: isCollapsed,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "title-suggestions-container",
        children: [isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: 'wp-parsely-loading-overlay',
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading…', 'wp-parsely')]
        }), suggestions.map(function (title) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_title_suggestion__WEBPACK_IMPORTED_MODULE_6__.TitleSuggestion, {
            title: title,
            type: _store__WEBPACK_IMPORTED_MODULE_7__.TitleType.PostTitle
          }, title.title);
        })]
      })
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/component-title-suggestion.tsx":
/*!********************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/component-title-suggestion.tsx ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleSuggestion: function() { return /* binding */ TitleSuggestion; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/undo.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/reset.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pin.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/title-suggestions/store.ts");
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
 * Returns a vertical divider.
 *
 * @since 3.14.0
 */
var VerticalDivider = function () {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1",
    height: "40",
    viewBox: "0 0 1 40",
    fill: "none",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Rect, {
      width: "1",
      height: "40",
      fill: "#cccccc"
    })
  });
};
/**
 * Renders a single title suggestion.
 *
 * @since 3.12.0
 *
 * @param {TitleSuggestionProps} props The component's props.
 *
 * @return {JSX.Element} The title suggestion JSX Element.
 */
var TitleSuggestion = function (props) {
  var _a = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    isModalOpen = _a[0],
    setIsModalOpen = _a[1];
  var openModal = function () {
    return setIsModalOpen(true);
  };
  var closeModal = function () {
    return setIsModalOpen(false);
  };
  var _b = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.TitleStore),
    removeTitle = _b.removeTitle,
    setAcceptedTitle = _b.setAcceptedTitle,
    pinTitle = _b.pinTitle,
    unpinTitle = _b.unpinTitle,
    setOriginalTitle = _b.setOriginalTitle;
  var isPinned = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    return select(_store__WEBPACK_IMPORTED_MODULE_6__.TitleStore).isPinned(props.type, props.title);
  }, [props.title, props.type]);
  var currentPostTitle = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    var getEditedPostAttribute = select('core/editor').getEditedPostAttribute;
    return getEditedPostAttribute('title');
  }, []);
  // Flag if the current title has been accepted and applied to the post.
  var titleInUse = currentPostTitle === props.title.title;
  /**
   * Handles the click event for the Apply button.
   *
   * @since 3.14.0
   */
  var onClickApply = function () {
    if (titleInUse) {
      return;
    }
    openModal();
  };
  /**
   * Handles the click event for the Replace button.
   *
   * @since 3.14.0
   */
  var onClickReplace = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (titleInUse) {
              return [2 /*return*/];
            }

            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestion_applied', {
              title: props.title.title,
              type: props.type
            });
            return [4 /*yield*/, setAcceptedTitle(props.type, props.title)];
          case 1:
            _a.sent();
            closeModal();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Handles the click event for the Pin button.
   *
   * @since 3.14.0
   */
  var onClickPin = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestion_pinned', {
              pinned: !isPinned,
              type: props.type,
              title: props.title.title
            });
            if (!isPinned) return [3 /*break*/, 2];
            return [4 /*yield*/, unpinTitle(props.type, props.title)];
          case 1:
            _a.sent();
            return [3 /*break*/, 4];
          case 2:
            return [4 /*yield*/, pinTitle(props.type, props.title)];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Handles the click event for the Remove button.
   *
   * @since 3.14.0
   */
  var onClickRemove = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestion_removed', {
              type: props.type,
              title: props.title.title
            });
            return [4 /*yield*/, removeTitle(props.type, props.title)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Handles the click event for the Restore button.
   *
   * @since 3.14.0
   */
  var onClickRestore = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestion_restored', {
              type: props.type,
              restored_title: props.title.title,
              accepted_title: currentPostTitle
            });
            // Set current post title to the original title.
            (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/editor').editPost({
              title: props.title.title
            });
            // Unset the original title prop by setting it to undefined.
            return [4 /*yield*/, setOriginalTitle(props.type, undefined)];
          case 1:
            // Unset the original title prop by setting it to undefined.
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };

  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: 'wp-parsely-title-suggestion' + (titleInUse ? ' title-in-use' : '') + (props.isOriginal ? ' original-title' : '') + (isPinned ? ' pinned-title' : ''),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "suggested-title",
        children: [props.isOriginal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
          className: "suggested-title-original",
          level: 3,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Original', 'wp-parsely')
        }), props.title.title]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "suggested-title-actions",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "suggested-title-actions-container",
          children: [props.isOriginal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: onClickRestore,
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Restore', 'wp-parsely')
          }), !props.isOriginal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "suggested-title-actions-left",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                onClick: onClickApply,
                disabled: titleInUse,
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
                label: titleInUse ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Applied', 'wp-parsely') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Apply', 'wp-parsely')
              }), !isPinned && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                onClick: onClickRemove,
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Remove', 'wp-parsely')
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VerticalDivider, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "suggested-title-actions-right",
              children: isPinned ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                onClick: onClickPin,
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unpin', 'wp-parsely')
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                onClick: onClickPin,
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"],
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pin', 'wp-parsely')
              })
            })]
          })]
        })
      })]
    }), isModalOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Replace Title?', 'wp-parsely'),
      onRequestClose: closeModal,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wp-parsely-suggested-title-modal",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          children: props.title.title
        }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("You'll still be able to restore your original title until you exit the editor.", 'wp-parsely'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "suggested-title-modal-actions",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: closeModal,
            variant: "secondary",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'wp-parsely')
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: onClickReplace,
            variant: "primary",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Replace', 'wp-parsely')
          })]
        })]
      })
    })]
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/component.tsx":
/*!***************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/component.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleSuggestionsPanel: function() { return /* binding */ TitleSuggestionsPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/external.js");
/* harmony import */ var _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../js/telemetry/telemetry */ "./src/js/telemetry/telemetry.ts");
/* harmony import */ var _common_components_persona_selector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/components/persona-selector */ "./src/content-helper/common/components/persona-selector/index.ts");
/* harmony import */ var _common_components_tone_selector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/components/tone-selector */ "./src/content-helper/common/components/tone-selector/index.ts");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/settings */ "./src/content-helper/common/settings/index.ts");
/* harmony import */ var _component_pinned__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component-pinned */ "./src/content-helper/editor-sidebar/title-suggestions/component-pinned.tsx");
/* harmony import */ var _component_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component-settings */ "./src/content-helper/editor-sidebar/title-suggestions/component-settings.tsx");
/* harmony import */ var _component_suggestions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component-suggestions */ "./src/content-helper/editor-sidebar/title-suggestions/component-suggestions.tsx");
/* harmony import */ var _component_title_suggestion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component-title-suggestion */ "./src/content-helper/editor-sidebar/title-suggestions/component-title-suggestion.tsx");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./provider */ "./src/content-helper/editor-sidebar/title-suggestions/provider.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./store */ "./src/content-helper/editor-sidebar/title-suggestions/store.ts");
/* harmony import */ var _title_suggestions_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./title-suggestions.scss */ "./src/content-helper/editor-sidebar/title-suggestions/title-suggestions.scss");
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
 * Title Suggestions Panel.
 *
 * @since 3.12.0
 *
 * @return {JSX.Element} The Title Suggestions Panel.
 */
var TitleSuggestionsPanel = function () {
  var _a = (0,_common_settings__WEBPACK_IMPORTED_MODULE_8__.useSettings)(),
    settings = _a.settings,
    setSettings = _a.setSettings;
  var _b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(),
    error = _b[0],
    setError = _b[1];
  var _c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(settings.TitleSuggestionsSettings.Tone),
    tone = _c[0],
    setTone = _c[1];
  var _d = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(settings.TitleSuggestionsSettings.Persona),
    persona = _d[0],
    setPersona = _d[1];
  var _e = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
      var _a = select(_store__WEBPACK_IMPORTED_MODULE_14__.TitleStore),
        isLoading = _a.isLoading,
        getTitles = _a.getTitles,
        getAcceptedTitle = _a.getAcceptedTitle,
        getOriginalTitle = _a.getOriginalTitle;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      var allTitles = getTitles(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle);
      return {
        acceptedTitle: getAcceptedTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle),
        loading: isLoading(),
        titles: allTitles.filter(function (title) {
          return !title.isPinned;
        }),
        pinnedTitles: allTitles.filter(function (title) {
          return title.isPinned;
        }),
        allTitles: allTitles,
        originalTitle: getOriginalTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle)
      };
    }, []),
    loading = _e.loading,
    titles = _e.titles,
    pinnedTitles = _e.pinnedTitles,
    allTitles = _e.allTitles,
    acceptedTitle = _e.acceptedTitle,
    originalTitle = _e.originalTitle;
  var _f = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_14__.TitleStore),
    setTitles = _f.setTitles,
    setLoading = _f.setLoading,
    setAcceptedTitle = _f.setAcceptedTitle,
    setOriginalTitle = _f.setOriginalTitle;
  var createNotice = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/notices').createNotice;
  var onSettingChange = function (key, value) {
    var _a;
    setSettings({
      TitleSuggestionsSettings: __assign(__assign({}, settings.TitleSuggestionsSettings), (_a = {}, _a[key] = value, _a))
    });
  };
  var currentPostContent = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    var getEditedPostContent = select('core/editor').getEditedPostContent;
    return getEditedPostContent();
  }, []);
  var currentPostTitle = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    var getEditedPostAttribute = select('core/editor').getEditedPostAttribute;
    return getEditedPostAttribute('title');
  }, []);
  var generateTitles = function (titleType, content, selectedTone, selectedPersona) {
    return __awaiter(void 0, void 0, void 0, function () {
      var provider, genTitles, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, setLoading(true)];
          case 1:
            _a.sent();
            provider = new _provider__WEBPACK_IMPORTED_MODULE_13__.TitleSuggestionsProvider();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 5,, 6]);
            return [4 /*yield*/, provider.generateTitles(content, 3, selectedTone, selectedPersona)];
          case 3:
            genTitles = _a.sent();
            return [4 /*yield*/, setTitles(titleType, genTitles)];
          case 4:
            _a.sent();
            return [3 /*break*/, 6];
          case 5:
            err_1 = _a.sent();
            setError(err_1);
            setTitles(titleType, []);
            return [3 /*break*/, 6];
          case 6:
            return [4 /*yield*/, setLoading(false)];
          case 7:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };

  var generateOnClickHandler = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setError(undefined);
            if (!(false === loading)) return [3 /*break*/, 2];
            _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestions_generate_pressed', {
              request_more: titles.length > 0,
              total_titles: titles.length,
              total_pinned: titles.filter(function (title) {
                return title.isPinned;
              }).length,
              tone: tone,
              persona: persona
            });
            // Generate titles based on the current post content.
            return [4 /*yield*/, generateTitles(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle, currentPostContent, tone, persona)];
          case 1:
            // Generate titles based on the current post content.
            _a.sent();
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Handles the accepted title changing, and applies the accepted title to
   * the post.
   *
   * @since 3.14.0
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (!acceptedTitle) {
      return;
    }
    // Save the original title.
    setOriginalTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle, currentPostTitle);
    // Set the post title to the accepted title.
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/editor').editPost({
      title: acceptedTitle === null || acceptedTitle === void 0 ? void 0 : acceptedTitle.title
    });
    // Pin the accepted title on the list of generated titles.
    if (acceptedTitle) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_14__.TitleStore).pinTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle, acceptedTitle);
      _js_telemetry_telemetry__WEBPACK_IMPORTED_MODULE_5__.Telemetry.trackEvent('title_suggestions_accept_pressed', {
        old_title: currentPostTitle,
        new_title: acceptedTitle.title
      });
    }
    // Remove the accepted title.
    setAcceptedTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle, undefined);
    // Show snackbar notification.
    createNotice('success', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Title suggestion applied.', 'wp-parsely'), {
      type: 'snackbar',
      className: 'parsely-title-suggestion-applied',
      explicitDismiss: true,
      actions: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Undo', 'wp-parsely'),
        onClick: function () {
          // Restore the original title.
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/editor').editPost({
            title: currentPostTitle
          });
          setOriginalTitle(_store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle, undefined);
        }
      }]
    });
  }, [acceptedTitle]); // eslint-disable-line react-hooks/exhaustive-deps
  /**
   * Displays a snackbar notification when an error occurs.
   *
   * @since 3.14.0
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (undefined === error) {
      return;
    }
    createNotice('error', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('There was an error generating title suggestions.', 'wp-parsely'), {
      type: 'snackbar',
      className: 'parsely-title-suggestion-error',
      isDismissible: true
    });
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wp-parsely-title-suggestions-wrapper",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "title-suggestions-header",
        children: [allTitles.length > 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "parsely-write-titles-text",
          children: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)(
          // translators: %1$s is the tone, %2$s is the persona.
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("We've generated a few <tone/> titles based on the content of your post, written as a <persona/>.", 'wp-parsely'), {
            tone: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
              children: (0,_common_components_tone_selector__WEBPACK_IMPORTED_MODULE_7__.getToneLabel)(tone)
            }),
            persona: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
              children: (0,_common_components_persona_selector__WEBPACK_IMPORTED_MODULE_6__.getPersonaLabel)(persona)
            })
          })
        }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Use Parse.ly AI to generate a title for your post.', 'wp-parsely'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          href: "https://docs.parse.ly/plugin-content-helper/#h-title-suggestions-beta",
          target: "_blank",
          variant: "link",
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Learn more about Parse.ly AI', 'wp-parsely'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"], {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__["default"],
            size: 18,
            className: "parsely-external-link-icon"
          })]
        })]
      }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
        status: "info",
        isDismissible: false,
        className: "wp-parsely-content-helper-error",
        children: error.Message()
      }), originalTitle !== undefined && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_title_suggestion__WEBPACK_IMPORTED_MODULE_12__.TitleSuggestion, {
        title: originalTitle,
        type: _store__WEBPACK_IMPORTED_MODULE_14__.TitleType.PostTitle,
        isOriginal: true
      }), 0 < allTitles.length && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [pinnedTitles.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_pinned__WEBPACK_IMPORTED_MODULE_9__.PinnedTitleSuggestions, {
          pinnedTitles: pinnedTitles,
          isOpen: true
        }), titles.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_suggestions__WEBPACK_IMPORTED_MODULE_11__.TitleSuggestions, {
          suggestions: titles,
          isOpen: true,
          isLoading: loading
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_component_settings__WEBPACK_IMPORTED_MODULE_10__.TitleSuggestionsSettings, {
        isLoading: loading,
        onPersonaChange: function (selectedPersona) {
          onSettingChange('Persona', selectedPersona);
          setPersona(selectedPersona);
        },
        onSettingChange: onSettingChange,
        onToneChange: function (selectedTone) {
          onSettingChange('Tone', selectedTone);
          setTone(selectedTone);
        },
        persona: settings.TitleSuggestionsSettings.Persona,
        tone: settings.TitleSuggestionsSettings.Tone
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "title-suggestions-generate",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "primary",
          isBusy: loading,
          disabled: loading || tone === 'custom' || persona === 'custom',
          onClick: generateOnClickHandler,
          children: [loading && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Generating Titles…', 'wp-parsely'), !loading && allTitles.length > 0 && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Generate More', 'wp-parsely'), !loading && allTitles.length === 0 && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Generate Titles', 'wp-parsely')]
        })
      })]
    })
  });
};

/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/provider.ts":
/*!*************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/provider.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleSuggestionsProvider: function() { return /* binding */ TitleSuggestionsProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_content_helper_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/content-helper-error */ "./src/content-helper/common/content-helper-error.tsx");
/* harmony import */ var _common_components_tone_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/components/tone-selector */ "./src/content-helper/common/components/tone-selector/index.ts");
/* harmony import */ var _common_components_persona_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/components/persona-selector */ "./src/content-helper/common/components/persona-selector/index.ts");
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
 * Returns data from the `content-suggestions/suggest-headline` WordPress REST API
 * endpoint.
 *
 * @since 3.12.0
 */
var TitleSuggestionsProvider = /** @class */function () {
  function TitleSuggestionsProvider() {}
  /**
   * Returns a list of suggested titles for the given content.
   *
   * @param {string }     content The content to generate titles for.
   * @param {number}      limit   The number of titles to return. Defaults to 3.
   * @param {ToneProp}    tone    The tone to use when generating the titles.
   * @param {PersonaProp} persona The persona to use when generating the titles.
   *
   * @return { Promise<string[]>} The resulting list of titles.
   */
  TitleSuggestionsProvider.prototype.generateTitles = function (content_1) {
    return __awaiter(this, arguments, void 0, function (content, limit, tone, persona) {
      var response, wpError_1;
      var _a;
      if (limit === void 0) {
        limit = 3;
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2,, 3]);
            return [4 /*yield*/, _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              method: 'POST',
              path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)('/wp-parsely/v1/content-suggestions/suggest-headline', {
                limit: limit,
                tone: (0,_common_components_tone_selector__WEBPACK_IMPORTED_MODULE_3__.getToneLabel)(tone),
                persona: (0,_common_components_persona_selector__WEBPACK_IMPORTED_MODULE_4__.getPersonaLabel)(persona)
              }),
              data: {
                content: content
              }
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
            return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []];
        }
      });
    });
  };
  return TitleSuggestionsProvider;
}();


/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/store.ts":
/*!**********************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/store.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleStore: function() { return /* binding */ TitleStore; },
/* harmony export */   TitleType: function() { return /* binding */ TitleType; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
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

// Unique identifier for each title in the store.
var titleID = 0;
var TitleType;
(function (TitleType) {
  TitleType["PostTitle"] = "postTitles";
  TitleType["Heading"] = "headings";
})(TitleType || (TitleType = {}));
var defaultState = {
  isLoading: false,
  postTitles: {
    titles: []
  },
  headings: {
    titles: []
  }
};
var TitleStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('wp-parsely/write-titles', {
  initialState: defaultState,
  reducer: function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    if (state === void 0) {
      state = defaultState;
    }
    switch (action.type) {
      case 'SET_LOADING':
        return __assign(__assign({}, state), {
          isLoading: action.isLoading
        });
      case 'SET_TITLES':
        // Add the new titles to the state but keep the pinned titles
        return __assign(__assign({}, state), (_a = {}, _a[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          titles: __spreadArray(__spreadArray([], state[action.titleType].titles.filter(function (title) {
            return title.isPinned;
          }), true), action.data.map(function (title) {
            return {
              title: title,
              isPinned: false,
              id: titleID++
            };
          }), true)
        }), _a));
      case 'REMOVE_TITLE':
        return __assign(__assign({}, state), (_b = {}, _b[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          titles: state[action.titleType].titles.filter(function (title) {
            return title.id !== action.title.id;
          })
        }), _b));
      case 'PIN_TITLE':
        // add title to pinned titles and remove from suggested titles
        return __assign(__assign({}, state), (_c = {}, _c[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          titles: state[action.titleType].titles.map(function (title) {
            if (title.id === action.title.id) {
              return __assign(__assign({}, title), {
                isPinned: true
              });
            }
            return title;
          })
        }), _c));
      case 'UNPIN_TITLE':
        return __assign(__assign({}, state), (_d = {}, _d[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          titles: state[action.titleType].titles.map(function (title) {
            if (title.id === action.title.id) {
              return __assign(__assign({}, title), {
                isPinned: false
              });
            }
            return title;
          })
        }), _d));
      case 'SET_ACCEPTED_TITLE':
        return __assign(__assign({}, state), (_e = {}, _e[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          acceptedTitle: action.title
        }), _e));
      case 'SET_ORIGINAL_TITLE':
        return __assign(__assign({}, state), (_f = {}, _f[action.titleType] = __assign(__assign({}, state[action.titleType]), {
          originalTitle: action.title
        }), _f));
      default:
        return state;
    }
  },
  actions: {
    setLoading: function (isLoading) {
      return {
        type: 'SET_LOADING',
        isLoading: isLoading
      };
    },
    setTitles: function (titleType, data) {
      return {
        type: 'SET_TITLES',
        titleType: titleType,
        data: data
      };
    },
    removeTitle: function (titleType, title) {
      return {
        type: 'REMOVE_TITLE',
        titleType: titleType,
        title: title
      };
    },
    setAcceptedTitle: function (titleType, title) {
      return {
        type: 'SET_ACCEPTED_TITLE',
        titleType: titleType,
        title: title
      };
    },
    pinTitle: function (titleType, title) {
      return {
        type: 'PIN_TITLE',
        titleType: titleType,
        title: title
      };
    },
    unpinTitle: function (titleType, title) {
      return {
        type: 'UNPIN_TITLE',
        titleType: titleType,
        title: title
      };
    },
    setOriginalTitle: function (titleType, title) {
      return {
        type: 'SET_ORIGINAL_TITLE',
        titleType: titleType,
        title: title
      };
    }
  },
  selectors: {
    getState: function (state) {
      return state;
    },
    isLoading: function (state) {
      return state.isLoading;
    },
    getTitles: function (state, titleType) {
      return state[titleType].titles.map(function (title) {
        return title;
      });
    },
    getPinnedTitles: function (state, titleType) {
      return state[titleType].titles.filter(function (title) {
        return title.isPinned;
      });
    },
    isPinned: function (state, titleType, title) {
      var _a, _b;
      return (_b = (_a = state[titleType].titles.find(function (t) {
        return t.id === title.id;
      })) === null || _a === void 0 ? void 0 : _a.isPinned) !== null && _b !== void 0 ? _b : false;
    },
    getAcceptedTitle: function (state, titleType) {
      return state[titleType].acceptedTitle;
    },
    isAcceptedTitle: function (state, titleType, title) {
      var _a;
      return ((_a = state[titleType].acceptedTitle) === null || _a === void 0 ? void 0 : _a.id) === title.id;
    },
    getOriginalTitle: function (state, titleType) {
      var _a;
      if (state[titleType].originalTitle) {
        return {
          id: -1,
          title: (_a = state[titleType].originalTitle) !== null && _a !== void 0 ? _a : '',
          isPinned: false
        };
      }
      return undefined;
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(TitleStore);

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

/***/ "./src/content-helper/editor-sidebar/editor-sidebar.scss":
/*!***************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/editor-sidebar.scss ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content-helper/editor-sidebar/performance-details/performance-details.scss":
/*!****************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/performance-details/performance-details.scss ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content-helper/editor-sidebar/related-posts/related-posts.scss":
/*!****************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/related-posts/related-posts.scss ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content-helper/editor-sidebar/smart-linking/smart-linking.scss":
/*!****************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/smart-linking/smart-linking.scss ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content-helper/editor-sidebar/title-suggestions/title-suggestions.scss":
/*!************************************************************************************!*\
  !*** ./src/content-helper/editor-sidebar/title-suggestions/title-suggestions.scss ***!
  \************************************************************************************/
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

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

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

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

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

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/content-helper/editor-sidebar/editor-sidebar.tsx");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content-helper/editor-sidebar/editor-sidebar.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=editor-sidebar.js.map