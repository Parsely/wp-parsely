!function(){var o={};o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(o){if("object"==typeof window)return window}}(),function(){"use strict";var o=window.wp.hooks;window.wpParselyHooks=(0,o.createHooks)(),function(){const o=()=>window.wpParselyHooks.doAction("wpParselyOnLoad"),n=()=>window.wpParselyHooks.doAction("wpParselyOnReady");if("object"==typeof window.PARSELY){if("function"!=typeof window.PARSELY.onload)window.PARSELY.onload=o;else{const n=window.PARSELY.onload;window.PARSELY.onload=function(){n&&n(),o()}}if("function"!=typeof window.PARSELY.onReady)window.PARSELY.onReady=n;else{const o=window.PARSELY.onReady;window.PARSELY.onReady=function(){o&&o(),n()}}}else window.PARSELY={onload:o,onReady:n};!0===window.wpParselyDisableAutotrack&&(window.PARSELY.autotrack=!1)}()}(),void 0!==window.wpParselySiteID&&window.wpParselyHooks.addAction("wpParselyOnLoad","wpParsely",(async function(){var n,i;const e=null===(n=o.g.PARSELY)||void 0===n||null===(i=n.config)||void 0===i?void 0:i.parsely_site_uuid;if(!window.wpParselySiteID||!e)return;const w=`https://api.parsely.com/v2/profile?apikey=${encodeURIComponent(window.wpParselySiteID)}&uuid=${encodeURIComponent(e)}&url=${encodeURIComponent(window.location.href)}`;return fetch(w)}))}();