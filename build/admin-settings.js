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
  addContentHelperTabEventHandlers();
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
/**
 * Adds the necessary event handlers to the Content Helper tab.
 *
 * @since 3.16.0
 */
function addContentHelperTabEventHandlers() {
  // Selector for the checkbox that enables/disables all AI features.
  var aiFeaturesCheckbox = document.querySelector('input#content_helper_ai_features_enabled');
  // Selector for the checkboxes that enable/disable individual AI features.
  var featureCheckboxes = document.querySelectorAll('input#content_helper_smart_linking_enabled, ' + 'input#content_helper_title_suggestions_enabled, ' + 'input#content_helper_excerpt_suggestions_enabled');
  // Selector for all fieldsets in the Content Helper section.
  var fieldsets = document.querySelectorAll('div.content-helper-section fieldset');
  // Event handlers.
  enableAllFormFieldsOnSubmit();
  updateAllFeatureSections(); // Must run on load to update the UI.
  aiFeaturesCheckbox === null || aiFeaturesCheckbox === void 0 ? void 0 : aiFeaturesCheckbox.addEventListener('change', function () {
    updateAllFeatureSections();
  });
  featureCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      updateFeatureSection(checkbox);
    });
  });
  /**
   * Turns on/off all AI feature sections in the UI.
   *
   * @since 3.16.0
   */
  function updateAllFeatureSections() {
    if (!aiFeaturesCheckbox) {
      return;
    }
    if (aiFeaturesCheckbox.checked) {
      // Enable all applicable fieldsets.
      fieldsets.forEach(function (fieldset) {
        setDisabled(fieldset, false);
        featureCheckboxes.forEach(function (checkbox) {
          updateFeatureSection(checkbox);
        });
      });
    } else {
      // Disable all fieldsets.
      fieldsets.forEach(function (fieldset) {
        if (!fieldset.querySelector("#".concat(aiFeaturesCheckbox.id))) {
          setDisabled(fieldset);
        }
      });
      // Disable "Enabled" labels.
      document.querySelectorAll('label.prevent-disable').forEach(function (label) {
        setPreventDisable(label, false);
      });
    }
  }
  /**
   * Turns on/off a specific feature section in the UI.
   *
   * @since 3.16.0
   *
   * @param {HTMLInputElement} checkbox The checkbox controlling the feature.
   */
  function updateFeatureSection(checkbox) {
    var _a, _b;
    var userRolesFieldset = (_b = (_a = checkbox.closest('fieldset')) === null || _a === void 0 ? void 0 : _a.nextSibling) === null || _b === void 0 ? void 0 : _b.nextSibling;
    if (checkbox.checked) {
      setDisabled([checkbox, userRolesFieldset], false);
    } else {
      setDisabled(userRolesFieldset);
      // Keep enabled styling on "Enabled" labels for visibility.
      var enabledLabel = checkbox.parentElement;
      setPreventDisable(enabledLabel);
    }
  }
  /**
   * Allows or prevents an element from being shown as disabled.
   *
   * This is done by injecting a class into the element, which is used in CSS.
   *
   * @since 3.16.0
   *
   * @param {Element} element The target element.
   * @param {boolean} status  true to prevent disabled style, false to allow.
   */
  function setPreventDisable(element, status) {
    if (status === void 0) {
      status = true;
    }
    if (status) {
      element.classList.add('prevent-disable');
    } else {
      element.classList.remove('prevent-disable');
    }
  }
  /**
   * Sets the disabled attribute on an element.
   *
   * @since 3.16.0
   *
   * @param {Element | Element[]} element The target element.
   * @param {boolean}             status  true to disable, false to enable.
   */
  function setDisabled(element, status) {
    if (status === void 0) {
      status = true;
    }
    if (!Array.isArray(element)) {
      element = [element];
    }
    element.forEach(function (el) {
      if (status) {
        el.setAttribute('disabled', 'disabled');
      } else {
        el.removeAttribute('disabled');
      }
    });
  }
  /**
   * Allows the form to post its whole data.
   *
   * When elements are disabled, they are not included when submitting the
   * form, resulting in missing data.
   *
   * This workaround removes any disabled attribute so the form can submit its
   * whole data. It also prevents styling changes while the data is being
   * submitted, in order to avoid visual glitches.
   *
   * @since 3.16.0
   */
  function enableAllFormFieldsOnSubmit() {
    var _a;
    (_a = document.querySelector('.wp-admin form[name="parsely"]')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function () {
      var baseSelector = '.wp-admin .content-helper-section fieldset';
      document.querySelectorAll("".concat(baseSelector, "[disabled]")).forEach(function (fieldset) {
        var _a, _b;
        // Style the whole setting table row as disabled.
        (_b = (_a = fieldset.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('disabled-before-posting');
        // Avoid disabled checkbox styling changes.
        fieldset.querySelectorAll("".concat(baseSelector, " label input[type=\"checkbox\"]")).forEach(function (input) {
          input.classList.add('disabled');
        });
        fieldset.removeAttribute('disabled');
      });
    });
  }
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