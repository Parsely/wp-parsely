/******/ (function() { // webpackBootstrap
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
  !*** ./src/js/admin-settings.js ***!
  \**********************************/
document.querySelector('.media-single-image button.browse').addEventListener('click', selectImage);

function selectImage() {
  var optionName = this.dataset.option;
  var imageFrame = wp.media({
    multiple: false,
    library: {
      type: 'image'
    }
  });
  imageFrame.on('select', function () {
    var url = imageFrame.state().get('selection').first().toJSON().url;
    var inputSelector = '#media-single-image-' + optionName + ' input.file-path';
    document.querySelector(inputSelector).value = url;
  });
  imageFrame.open();
}
}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************!*\
  !*** ./src/css/admin-settings.css ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=admin-settings.js.map