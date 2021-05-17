/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/lib/admin-page/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

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

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./src/js/lib/admin-page/components/App.js":
/*!*************************************************!*\
  !*** ./src/js/lib/admin-page/components/App.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../static/services */ "./src/js/lib/admin-page/static/services.js");
/* harmony import */ var _Setting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Setting */ "./src/js/lib/admin-page/components/Setting.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var App = function App() {
  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      settings = _useState2[0],
      setSettings = _useState2[1];

  var _useState3 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])("general"),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      currentTab = _useState4[0],
      setCurrentTab = _useState4[1];

  if (!settings) {
    Object(_static_services__WEBPACK_IMPORTED_MODULE_3__["fetchSettings"])(setSettings);
  }

  var handleInputChange = function handleInputChange(e) {
    var oldSetting = settings[e.target.name];
    var newValue = e.target.type === 'checkbox' ? !oldSetting : e.target.value;
    setSettings(_objectSpread(_objectSpread({}, settings), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, e.target.name, newValue)));
  };

  var displayDiv = function displayDiv(divClass, currentState) {
    return divClass == currentState ? '' : 'none';
  };

  var handleFormSubmit = function handleFormSubmit(e) {
    e.preventDefault(); // send form data to php somehow
  }; // explicitly list each setting
  // group by tab in different divs


  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
    className: "settings-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("nav", {
    className: "controls"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("ul", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("li", {
    onClick: function onClick() {
      return setCurrentTab("general");
    }
  }, "General"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("li", {
    onClick: function onClick() {
      return setCurrentTab("advanced");
    }
  }, "Advanced"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("li", {
    onClick: function onClick() {
      return setCurrentTab("debug");
    }
  }, "Debug"))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("form", {
    onSubmit: function onSubmit(e) {
      return handleFormSubmit(e);
    }
  }, settings ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
    className: "settings-holder"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
    className: "general",
    style: {
      display: displayDiv("general", currentTab)
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      apikey: settings["apikey"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      apiSecret: "no secret given"
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      logo: settings["logo"]
    },
    onChange: handleInputChange
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
    className: "advanced",
    style: {
      display: displayDiv("advanced", currentTab)
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      meta_type: settings["meta_type"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      custom_taxonomy_section: settings["custom_taxonomy_section"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      content_id_prefix: settings["content_id_prefix"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      disable_javascript: settings["disable_javascript"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      disable_amp: settings["disable_amp"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      use_top_level_cats: settings["use_top_level_cats"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      cats_as_tags: settings["cats_as_tags"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      track_authenticated_users: settings["track_authenticated_users"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      lowercase_tags: settings["lowercase_tags"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      force_https_canonicals: settings["force_https_canonicals"]
    },
    onChange: handleInputChange
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
    className: "debug",
    style: {
      display: displayDiv("debug", currentTab)
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      metadata_secret: settings["metadata_secret"]
    },
    onChange: handleInputChange
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_Setting__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: {
      parsely_wipe_metadata_cache: settings["parsely_wipe_metadata_cache"]
    },
    onChange: handleInputChange
  }))) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("h1", null, "Salut Monde!"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("input", {
    type: "submit",
    className: "button-primary",
    value: "do the thing!"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/js/lib/admin-page/components/Input.js":
/*!***************************************************!*\
  !*** ./src/js/lib/admin-page/components/Input.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


var Input = function Input(_ref) {
  var type = _ref.type,
      name = _ref.name,
      checked = _ref.checked,
      value = _ref.value,
      onChange = _ref.onChange;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: type,
    name: name,
    checked: checked,
    value: value,
    onChange: onChange
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/js/lib/admin-page/components/Option.js":
/*!****************************************************!*\
  !*** ./src/js/lib/admin-page/components/Option.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


var Option = function Option(_ref) {
  var option = _ref.option;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("option", {
    value: option
  }, option);
};

/* harmony default export */ __webpack_exports__["default"] = (Option);

/***/ }),

/***/ "./src/js/lib/admin-page/components/Select.js":
/*!****************************************************!*\
  !*** ./src/js/lib/admin-page/components/Select.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option */ "./src/js/lib/admin-page/components/Option.js");



var Select = function Select(_ref) {
  var values = _ref.values,
      name = _ref.name,
      onChange = _ref.onChange;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("select", {
    value: values[0],
    name: name,
    onChange: onChange
  }, values.map(function (option) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_Option__WEBPACK_IMPORTED_MODULE_1__["default"], {
      option: option
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Select);

/***/ }),

/***/ "./src/js/lib/admin-page/components/Setting.js":
/*!*****************************************************!*\
  !*** ./src/js/lib/admin-page/components/Setting.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ "./src/js/lib/admin-page/components/Input.js");
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Select */ "./src/js/lib/admin-page/components/Select.js");





var Setting = function Setting(_ref) {
  var setting = _ref.setting,
      onChange = _ref.onChange;
  var input;

  if (typeof setting[Object.keys(setting)[0]] === 'string') {
    console.log("new setting", setting);
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      name: Object.keys(setting),
      value: setting,
      onChange: onChange
    });
  } else if (typeof setting[Object.keys(setting)[0]] === 'boolean') {
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "checkbox",
      name: Object.keys(setting),
      checked: setting[Object.keys(setting)[0]],
      onChange: onChange
    });
  } else if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(setting[Object.keys(setting)[0]]) === 'object') {
    input = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_Select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      values: setting[Object.keys(setting)[0]],
      name: Object.keys(setting)[0],
      onChange: onChange
    });
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("label", null, Object.keys(setting)), " ", input);
};

/* harmony default export */ __webpack_exports__["default"] = (Setting);

/***/ }),

/***/ "./src/js/lib/admin-page/index.js":
/*!****************************************!*\
  !*** ./src/js/lib/admin-page/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App */ "./src/js/lib/admin-page/components/App.js");




_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  wp.element.render(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], null), document.getElementById('wp-parsely-react-entrypoint'));
  var keyEl = document.querySelector('#apikey');
  var requiresRecrawlNotice = document.querySelectorAll('.parsely-form-controls[data-requires-recrawl="true"] .help-text');

  if (!(keyEl && requiresRecrawlNotice.length)) {
    return;
  }

  var notice = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["sprintf"])(
  /* translators: %s: The API Key that will be used to request a recrawl */
  Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('<strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a>'), keyEl.value, 'wp-parsely');
  [].forEach.call(requiresRecrawlNotice, function (node) {
    var descWrapper = document.createElement('p');
    descWrapper.className = 'description';
    descWrapper.innerHTML = notice;
    node.appendChild(descWrapper);
  });
});

/***/ }),

/***/ "./src/js/lib/admin-page/static/services.js":
/*!**************************************************!*\
  !*** ./src/js/lib/admin-page/static/services.js ***!
  \**************************************************/
/*! exports provided: fetchSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSettings", function() { return fetchSettings; });
var fetchSettings = function fetchSettings(callback) {
  fetch('/wp-json/wp-parsely/v1/settings').then(function (res) {
    return res.json();
  }).then(function (settings) {
    callback(settings);
  }).catch(function (err) {
    return callback(err);
  });
};

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["domReady"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=admin-page.js.map