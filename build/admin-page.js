!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=7)}([,function(e,r){e.exports=window.wp.i18n},,,function(e,r){e.exports=window.wp.domReady},,,function(e,r,t){"use strict";t.r(r);var n=t(4),o=t.n(n),u=t(1);o()((function(){var e=document.querySelector("#apikey"),r=document.querySelectorAll('.parsely-form-controls[data-requires-recrawl="true"] .help-text');if(e&&r.length){var t=Object(u.sprintf)(// translators: %s: The API Key that will be used to request a "recrawl"
Object(u.__)('<p class="description"><strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a></p>'),e.value,"wp-parsely");[].forEach.call(r,(function(e){e.innerHTML+=t}))}}))}]);