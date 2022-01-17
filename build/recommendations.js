!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=34)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.regeneratorRuntime},function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a}));var n="RECO_BLOCK_ERROR",o="RECO_BLOCK_LOADED",a="RECO_BLOCK_RECOMMENDATIONS"},function(e,t){function r(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}e.exports=function(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function u(e){r(i,o,a,u,c,"next",e)}function c(e){r(i,o,a,u,c,"throw",e)}u(void 0)}))}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){"use strict";r.d(t,"b",(function(){return b}));var n=r(8),o=r.n(n),a=r(7),i=r.n(a),u=r(10),c=r.n(u),s=r(0),l=r(4);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){c()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=Object(s.createContext)(),m=function(e,t){switch(t.type){case l.a:return f(f({},e),{},{error:t.error});case l.b:return f(f({},e),{},{isLoaded:!0});case l.c:var r=t.recommendations;if(!Array.isArray(r))return f(f({},e),{},{recommendations:void 0});var n=r.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return f(f({},e),{},{isLoaded:!0,recommendations:n});default:return f({},e)}},b=function(){return Object(s.useContext)(d)};t.a=function(e){var t,r,n={isLoaded:!1,recommendations:void 0,uuid:null===(t=window.PARSELY)||void 0===t||null===(r=t.config)||void 0===r?void 0:r.uuid,clientId:e.clientId},a=Object(s.useReducer)(m,n),u=i()(a,2),c=u[0],l=u[1];return Object(s.createElement)(d.Provider,o()({value:{state:c,dispatch:l}},e))}},function(e,t,r){var n=r(15),o=r(16),a=r(11),i=r(17);e.exports=function(e,t){return n(e)||o(e,t)||a(e,t)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){function r(){return e.exports=r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,r.apply(this,arguments)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=window.wp.url},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){var n=r(12);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},,function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],_n=!0,i=!1;try{for(r=r.call(e);!(_n=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);_n=!0);}catch(e){i=!0,o=e}finally{try{_n||null==r.return||r.return()}finally{if(i)throw o}}return a}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=window.wp.domReady},function(e,t,r){var n=r(26),o=r(27),a=r(11),i=r(28);e.exports=function(e){return n(e)||o(e)||a(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=window.wp.apiFetch},function(e,t){e.exports=window.wp.compose},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return m}));var n=r(10),o=r.n(n),a=r(5),i=r.n(a),u=r(3),c=r.n(u),s=r(9);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=function(e,t){return Object(s.addQueryArgs)("".concat("https://api.parsely.com/v2/").concat(e),t)},d=function(){var t=i()(c.a.mark((function t(r){var n,o,a,i,u,s,l=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=l.length>1&&void 0!==l[1]?l[1]:{},a=l.length>2&&void 0!==l[2]?l[2]:void 0,i=null===(n=e.wpParsely)||void 0===n?void 0:n.apikey,u=f(r,p({apikey:i},o)),t.next=6,fetch(u,a);case 6:return s=t.sent,t.abrupt("return",s.json());case 8:case"end":return t.stop()}}),t)})));return function(_x){return t.apply(this,arguments)}}(),m=function(){var e=i()(c.a.mark((function e(){var t,r=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:{},e.abrupt("return",d("related",t));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}).call(this,r(14))},function(e,t,r){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===a)if(n.toString===Object.prototype.toString)for(var u in n)r.call(n,u)&&n[u]&&e.push(u);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return M}));var n=r(0),o=r(1),a=r(19),i=r.n(a),u=r(5),c=r.n(u),s=r(3),l=r.n(s),p=r(20),f=r.n(p),d=r(21),m=r(9),b=r(4),y=function(e){var t=e.error;return{type:b.a,error:t}},v=function(e){var t=e.recommendations;return{type:b.c,recommendations:t}},O=r(22),x=r(6),w=function(e){var t=e.boost,r=e.limit,o=e.personalized,a=e.sort,u=Object(x.b)(),s=u.state,p=s.error,b=s.uuid,w=u.dispatch,h={boost:t,limit:r,sort:a};function j(){return _.apply(this,arguments)}function _(){return(_=c()(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",f()({path:Object(m.addQueryArgs)("/wp-parsely/v1/recommendations",h)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return(g=c()(l.a.mark((function e(){var t,r,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(O.a)(h);case 3:r=e.sent,e.next=18;break;case 6:return e.prev=6,e.t0=e.catch(0),e.prev=8,e.next=11,j();case 11:r=e.sent,e.next=18;break;case 14:return e.prev=14,e.t1=e.catch(8),w(y({error:e.t1})),e.abrupt("return");case 18:n=(null===(t=r)||void 0===t?void 0:t.data)||[],w(v({recommendations:n}));case 20:case"end":return e.stop()}}),e,null,[[0,6],[8,14]])})))).apply(this,arguments)}o&&b?h.uuid=b:h.url=window.location.href;var E=[].concat(i()(Object.values(h)),[p]),P=Object(n.useCallback)((function(){return g.apply(this,arguments)}),E),M=Object(d.useDebounce)(P,300);return Object(n.useEffect)(M,E),null},h=r(23),j=r.n(h),_=r(2),g=function(e){var t,r=e.imageAlt,o=e.imagestyle,a=e.recommendation,i=a.title,u=a.url,c=a.image_url,s=a.thumb_url_medium,l=e.showimages&&("original"===(t={imagestyle:o,imageUrl:c,thumbUrlMedium:s}).imagestyle?t.imageUrl:t.thumbUrlMedium);return Object(n.createElement)("li",null,Object(n.createElement)("a",{href:u,className:"parsely-recommendations__link"},Object(n.createElement)(_.Card,{className:"parsely-recommendations__card",size:"custom"},l&&Object(n.createElement)(_.CardMedia,{className:"parsely-recommendations__cardmedia"},Object(n.createElement)("img",{className:"parsely-recommendations__list-img",src:l,alt:r})),Object(n.createElement)(_.CardBody,{className:"parsely-recommendations__cardbody"},i))))},E=function(e){var t=e.imagestyle,r=e.layoutstyle,a=e.recommendations,i=e.showimages;return Object(n.createElement)("ul",{className:j()("parsely-recommendations__ul",r&&"parsely-recommendations__ul-".concat(r))},a.map((function(e,r){return Object(n.createElement)(g,{imagestyle:t,imageAlt:Object(o.__)("Image for link","wp-parsely"),key:r,recommendation:e,showimages:i})})))},P=function(e){var t=e.title;return Object(n.createElement)(n.Fragment,null,t&&Object(n.createElement)("p",{className:"parsely-recommendations__list-title"},t))};function M(e){var t=e.boost,r=e.layoutstyle,a=e.limit,i=e.imagestyle,u=e.isEditMode,c=e.personalized,s=e.showimages,l=e.sort,p=e.title,f=Object(x.b)().state,d=f.error,m=f.isLoaded,b=f.recommendations;return!d&&(m&&!b.length?!!u&&Object(o.__)("No recommendations found.","wp-parsely"):Object(n.createElement)(n.Fragment,null,Object(n.createElement)(w,{boost:t,limit:a,personalized:c,sort:l}),!m&&Object(n.createElement)("span",{className:"parsely-recommendations__loading"},Object(o.__)("Loading…","wp-parsely")),m&&!(null==b||!b.length)&&Object(n.createElement)(n.Fragment,null,Object(n.createElement)(P,{title:p}),Object(n.createElement)(E,{imagestyle:i,layoutstyle:r,recommendations:b,showimages:s}))))}},,function(e,t,r){var n=r(12);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},,,,,,function(e,t,r){"use strict";r.r(t);var n=r(8),o=r.n(n),a=r(0),i=r(18),u=r.n(i),c=r(24),s=r(6);u()((function(){document.querySelectorAll(".wp-block-wp-parsely-recommendations").forEach((function(e,t){return Object(a.render)(Object(a.createElement)(s.a,null,Object(a.createElement)(c.a,o()({},e.dataset,{key:t}))),e)}))}))}]);