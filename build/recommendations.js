!function(){var e={184:function(e,r){var t;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],r=0;r<arguments.length;r++){var t=arguments[r];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t)){if(t.length){var i=o.apply(null,t);i&&e.push(i)}}else if("object"===a)if(t.toString===Object.prototype.toString)for(var l in t)n.call(t,l)&&t[l]&&e.push(l);else e.push(t.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(t=function(){return o}.apply(r,[]))||(e.exports=t)}()}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={exports:{}};return e[n](a,a.exports,t),a.exports}t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,{a:r}),r},t.d=function(e,r){for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){"use strict";function e(){return e=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},e.apply(this,arguments)}var r=window.wp.element,n=window.wp.domReady,o=t.n(n),a=window.wp.i18n;function i(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function l(e,r){if(e){if("string"==typeof e)return i(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(e,r):void 0}}function u(e,r,t,n,o,a,i){try{var l=e[a](i),u=l.value}catch(e){return void t(e)}l.done?r(u):Promise.resolve(u).then(n,o)}function c(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function i(e){u(a,n,o,i,l,"next",e)}function l(e){u(a,n,o,i,l,"throw",e)}i(void 0)}))}}var s=window.regeneratorRuntime,m=t.n(s),d=window.wp.apiFetch,p=t.n(d),f=window.wp.compose,y=window.wp.url,v="RECOMMENDATIONS_BLOCK_ERROR",w="RECOMMENDATIONS_BLOCK_RECOMMENDATIONS",b=function(e){var r=e.error;return{type:v,error:r}},h=function(e){var r=e.recommendations;return{type:w,recommendations:r}};function g(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function E(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(Object(t),!0).forEach((function(r){g(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var A=(0,r.createContext)(),_=function(e,r){switch(r.type){case v:return E(E({},e),{},{isLoaded:!0,error:r.error,recommendations:void 0});case"RECOMMENDATIONS_BLOCK_LOADED":return E(E({},e),{},{isLoaded:!0});case w:var t=r.recommendations;if(!Array.isArray(t))return E(E({},e),{},{recommendations:void 0});var n=t.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return E(E({},e),{},{isLoaded:!0,error:void 0,recommendations:n});default:return E({},e)}},j=function(){return(0,r.useContext)(A)},S=function(t){var n,o,a,i,u={isLoaded:!1,recommendations:void 0,uuid:null===(n=window.PARSELY)||void 0===n||null===(o=n.config)||void 0===o?void 0:o.uuid,clientId:t.clientId},c=(a=(0,r.useReducer)(_,u),i=2,function(e){if(Array.isArray(e))return e}(a)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a=[],_n=!0,i=!1;try{for(t=t.call(e);!(_n=(n=t.next()).done)&&(a.push(n.value),!r||a.length!==r);_n=!0);}catch(e){i=!0,o=e}finally{try{_n||null==t.return||t.return()}finally{if(i)throw o}}return a}}(a,i)||l(a,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=c[0],m=c[1];return(0,r.createElement)(A.Provider,e({value:{state:s,dispatch:m}},t))},P=function(e){var t=e.boost,n=e.limit,o=e.sort,a=j();!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(a.state);var u=a.dispatch,s={boost:t,limit:n,sort:o,url:window.location.href};function d(){return v.apply(this,arguments)}function v(){return(v=c(m().mark((function e(){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",p()({path:(0,y.addQueryArgs)("/wp-parsely/v1/related",{query:s})}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=c(m().mark((function e(){var r,t,n,o,a;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d();case 3:n=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),o=e.t0;case 9:if(null!==(r=n)&&void 0!==r&&r.error&&(o=n.error),!o){e.next=13;break}return u(b({error:n.error})),e.abrupt("return");case 13:a=(null===(t=n)||void 0===t?void 0:t.data)||[],u(h({recommendations:a}));case 15:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var g,O=function(e){if(Array.isArray(e))return i(e)}(g=Object.values(s))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(g)||l(g)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),E=(0,r.useCallback)((function(){return w.apply(this,arguments)}),O),A=(0,f.useDebounce)(E,300);return(0,r.useEffect)(A,O),null},N=t(184),x=t.n(N),C=window.wp.components,M=function(e){var t,n=e.imageAlt,o=e.imagestyle,a=e.recommendation,i=a.title,l=a.url,u=a.image_url,c=a.thumb_url_medium,s=e.showimages&&(t={imagestyle:o,imageUrl:u,thumbUrlMedium:c},"original"===t.imagestyle?t.imageUrl:t.thumbUrlMedium);return(0,r.createElement)("li",null,(0,r.createElement)("a",{href:l,className:"parsely-recommendations-link"},(0,r.createElement)(C.Card,{className:"parsely-recommendations-card",size:"custom"},s&&(0,r.createElement)(C.CardMedia,{className:"parsely-recommendations-cardmedia"},(0,r.createElement)("img",{className:"parsely-recommendations-image",src:s,alt:n})),(0,r.createElement)(C.CardBody,{className:"parsely-recommendations-cardbody"},i))))},I=function(e){var t=e.imagestyle,n=e.recommendations,o=e.showimages;return(0,r.createElement)("ul",{className:x()("parsely-recommendations-list")},n.map((function(e,n){return(0,r.createElement)(M,{imagestyle:t,imageAlt:(0,a.__)("Image for link","wp-parsely"),key:n,recommendation:e,showimages:o})})))},k=function(e){var t=e.title;return(0,r.createElement)(r.Fragment,null,t&&(0,r.createElement)("p",{className:"parsely-recommendations-list-title"},t))};function D(e){var t,n=e.boost,o=e.limit,i=e.imagestyle,l=e.isEditMode,u=e.personalized,c=e.showimages,s=e.sort,m=e.title,d=j().state,p=d.error,f=d.isLoaded,y=d.recommendations;return f&&l&&(p?t=(0,a.__)("Parse.ly API replied with error: ","wp-parsely")+JSON.stringify(p):!Array.isArray(y)||null!=y&&y.length||(t=(0,a.__)("No recommendations found.","wp-parsely"))),(0,r.createElement)(r.Fragment,null,(0,r.createElement)(P,{boost:n,limit:o,personalized:u,sort:s}),!f&&(0,r.createElement)("span",{className:"parsely-recommendations-loading"},(0,a.__)("Loading…","wp-parsely")),t&&(0,r.createElement)("span",null,t),f&&!(null==y||!y.length)&&(0,r.createElement)(r.Fragment,null,(0,r.createElement)(k,{title:m}),(0,r.createElement)(I,{imagestyle:i,recommendations:y,showimages:c})))}o()((function(){document.querySelectorAll(".wp-block-wp-parsely-recommendations").forEach((function(t,n){return(0,r.render)((0,r.createElement)(S,null,(0,r.createElement)(D,e({},t.dataset,{key:n}))),t)}))}))}()}();