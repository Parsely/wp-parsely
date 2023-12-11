/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/*!**********************************!*\
  !*** ./src/js/admin-settings.ts ***!
  \**********************************/


document.addEventListener('DOMContentLoaded', function () {
  var _a;
  setActiveTab();
  window.addEventListener('hashchange', setActiveTab);
  (_a = document.querySelector('.media-single-image button.browse')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', selectImage);
});
function setActiveTab() {
  var _a, _b;
  var activeTab = location.hash !== '' ? location.hash.substring(1) : 'basic-section';
  (_a = document.querySelectorAll('.nav-tab')) === null || _a === void 0 ? void 0 : _a.forEach(function (t) {
    if (t.classList.contains(activeTab + '-tab')) {
      t.classList.add('nav-tab-active');
    } else {
      t.classList.remove('nav-tab-active');
    }
  });
  (_b = document.querySelectorAll('.tab-content')) === null || _b === void 0 ? void 0 : _b.forEach(function (t) {
    if (t.classList.contains(activeTab)) {
      t.setAttribute('style', 'display: initial');
    } else {
      t.setAttribute('style', 'display: none');
    }
  });
  var form = document.querySelector('form[name="parsely"]');
  if (form) {
    form.removeAttribute('hidden');
    form.setAttribute('action', "options.php#".concat(activeTab));
  }
}
function selectImage(event) {
  var optionName = event.target.dataset.option;
  var imageFrame = window.wp.media({
    multiple: false,
    library: {
      type: 'image'
    }
  });
  imageFrame.on('select', function () {
    var url = imageFrame.state().get('selection').first().toJSON().url;
    var inputSelector = '#media-single-image-' + optionName + ' input.file-path';
    var inputElement = document.querySelector(inputSelector);
    if (inputElement) {
      inputElement.value = url;
    }
  });
  imageFrame.open();
}
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*************************************!*\
  !*** ./src/css/admin-settings.scss ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=admin-settings.js.map