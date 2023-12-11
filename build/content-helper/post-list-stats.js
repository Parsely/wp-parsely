/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/*!***************************************************************!*\
  !*** ./src/content-helper/post-list-stats/post-list-stats.ts ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showParselyPostsStatsResponse: function() { return /* binding */ showParselyPostsStatsResponse; }
/* harmony export */ });
document.addEventListener('DOMContentLoaded', function () {
  showParselyPostsStatsResponse();
});
/**
 * Shows Parse.ly Post Stats or Error depending on response.
 */
function showParselyPostsStatsResponse() {
  updateParselyStatsPlaceholder();
  if (!window.wpParselyPostsStatsResponse) {
    return;
  }
  var response = JSON.parse(window.wpParselyPostsStatsResponse);
  if (response === null || response === void 0 ? void 0 : response.error) {
    showParselyStatsError(response.error);
    return;
  }
  if (response === null || response === void 0 ? void 0 : response.data) {
    showParselyStats(response.data);
  }
}
/**
 * Replaces Parse.ly Stats placeholder from default to differentiate while the API request
 * is in progress or completed.
 */
function updateParselyStatsPlaceholder() {
  var _a;
  (_a = getAllPostStatsElements()) === null || _a === void 0 ? void 0 : _a.forEach(function (statsElement) {
    statsElement.innerHTML = '—';
  });
}
/**
 * Shows Parse.ly Stats on available posts.
 *
 * @param {ParselyStatsMap} parselyStatsMap Object contains unique keys and Parse.ly Stats for posts.
 */
function showParselyStats(parselyStatsMap) {
  var _a;
  if (!parselyStatsMap) {
    return;
  }
  (_a = getAllPostStatsElements()) === null || _a === void 0 ? void 0 : _a.forEach(function (statsElement) {
    var statsKey = statsElement.getAttribute('data-stats-key');
    if (statsKey === null || parselyStatsMap[statsKey] === undefined) {
      return;
    }
    var stats = parselyStatsMap[statsKey];
    statsElement.innerHTML = '';
    if (stats.page_views) {
      statsElement.innerHTML += "<span class=\"parsely-post-page-views\">".concat(stats.page_views, "</span><br/>");
    }
    if (stats.visitors) {
      statsElement.innerHTML += "<span class=\"parsely-post-visitors\">".concat(stats.visitors, "</span><br/>");
    }
    if (stats.avg_time) {
      statsElement.innerHTML += "<span class=\"parsely-post-avg-time\">".concat(stats.avg_time, "</span><br/>");
    }
  });
}
/**
 * Shows Parse.ly Stats error as a wp-admin error notice.
 *
 * @param {ParselyAPIErrorInfo} parselyStatsError Object containing info about the error.
 */
function showParselyStatsError(parselyStatsError) {
  var headerEndElement = document.querySelector('.wp-header-end'); // WP has this element before admin notices.
  if (headerEndElement === null) {
    return;
  }
  headerEndElement.innerHTML += getWPAdminError(parselyStatsError.htmlMessage);
}
/**
 * Gets all elements inside which we will show Parse.ly Stats.
 */
function getAllPostStatsElements() {
  return document.querySelectorAll('.parsely-post-stats');
}
/**
 * Gets HTML for showing error message as a wp-admin error notice.
 *
 * @param {string} htmlMessage Message to show inside notice.
 */
function getWPAdminError(htmlMessage) {
  if (htmlMessage === void 0) {
    htmlMessage = '';
  }
  return "<div class=\"error notice error-parsely-stats is-dismissible\">".concat(htmlMessage, "</div>");
}
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*****************************************************************!*\
  !*** ./src/content-helper/post-list-stats/post-list-stats.scss ***!
  \*****************************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=post-list-stats.js.map