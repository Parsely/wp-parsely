!function(){"use strict";var e={418:function(e){var r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},n=0;n<10;n++)r["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(e){return!1}}()?Object.assign:function(e,i){for(var a,s,l=o(e),c=1;c<arguments.length;c++){for(var u in a=Object(arguments[c]))n.call(a,u)&&(l[u]=a[u]);if(r){s=r(a);for(var d=0;d<s.length;d++)t.call(a,s[d])&&(l[s[d]]=a[s[d]])}}return l}},251:function(e,r,n){n(418);var t=n(196),o=60103;if(r.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),r.Fragment=i("react.fragment")}var a=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,r,n){var t,i={},c=null,u=null;for(t in void 0!==n&&(c=""+n),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(u=r.ref),r)s.call(r,t)&&!l.hasOwnProperty(t)&&(i[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===i[t]&&(i[t]=r[t]);return{$$typeof:o,type:e,key:c,ref:u,props:i,_owner:a.current}}r.jsx=c,r.jsxs=c},893:function(e,r,n){e.exports=n(251)},196:function(e){e.exports=window.React}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,{a:r}),r},n.d=function(e,r){for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e,r,t=n(893),o=n(196),i=window.wp.element,a=window.wp.domReady,s=n.n(a),l=window.wp.i18n,c=window.wp.apiFetch,u=n.n(c),d=window.wp.compose,p=window.wp.url;(r=e||(e={}))[r.Error=0]="Error",r[r.Loaded=1]="Loaded",r[r.Recommendations=2]="Recommendations";var f=function(){return f=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},f.apply(this,arguments)},m=(0,i.createContext)({}),y=function(r,n){switch(n.type){case e.Error:return f(f({},r),{isLoaded:!0,error:n.error,recommendations:[]});case e.Loaded:return f(f({},r),{isLoaded:!0});case e.Recommendations:var t=n.recommendations;if(!Array.isArray(t))return f(f({},r),{recommendations:[]});var o=t.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return f(f({},r),{isLoaded:!0,error:null,recommendations:o});default:return f({},r)}},h=function(){return(0,i.useContext)(m)},v=function(e){var r,n,o,a,s={isLoaded:!1,recommendations:[],uuid:null!==(o=null===(n=null===(r=window.PARSELY)||void 0===r?void 0:r.config)||void 0===n?void 0:n.uuid)&&void 0!==o?o:null,clientId:null!==(a=null==e?void 0:e.clientId)&&void 0!==a?a:null,error:null},l=(0,i.useReducer)(y,s),c=l[0],u=l[1];return(0,t.jsx)(m.Provider,f({value:{state:c,dispatch:u}},e))},w=function(){return w=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},w.apply(this,arguments)},b=function(e,r,n,t){return new(n||(n=Promise))((function(o,i){function a(e){try{l(t.next(e))}catch(e){i(e)}}function s(e){try{l(t.throw(e))}catch(e){i(e)}}function l(e){var r;e.done?o(e.value):(r=e.value,r instanceof n?r:new n((function(e){e(r)}))).then(a,s)}l((t=t.apply(e,r||[])).next())}))},g=function(e,r){var n,t,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(n=1,t&&(o=2&s[0]?t.return:s[0]?t.throw||((o=t.return)&&o.call(t),0):t.next)&&!(o=o.call(t,s[1])).done)return o;switch(t=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,t=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=r.call(e,a)}catch(e){s=[6,e],t=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}},j=function(r){var n=r.boost,t=r.limit,o=r.sort,a=r.isEditMode,s=h().dispatch,l=(0,i.useMemo)((function(){return{boost:n,limit:t,sort:o,url:window.location.href,itm_source:"wp-parsely-recommendations-block"}}),[n,t,o]);function c(){return b(this,void 0,void 0,(function(){return g(this,(function(e){return[2,u()({path:(0,p.addQueryArgs)("/wp-parsely/v1/related",{query:l})})]}))}))}var f=(0,d.useDebounce)((function(){var r;return b(this,void 0,void 0,(function(){var n,t,o,i;return g(this,(function(l){switch(l.label){case 0:return l.trys.push([0,2,,3]),[4,c()];case 1:return n=l.sent(),[3,3];case 2:return o=l.sent(),t=o,[3,3];case 3:return(null==n?void 0:n.error)&&(t=n.error),t?(s(function(r){var n=r.error;return{type:e.Error,error:n}}({error:t})),[2]):(i=null!==(r=null==n?void 0:n.data)&&void 0!==r?r:[],a&&(i=i.map((function(e){return w(w({},e),{url:"#"})}))),s(function(r){var n=r.recommendations;return{type:e.Recommendations,recommendations:n}}({recommendations:i})),[2])}}))}))}),300);return(0,i.useEffect)((function(){f()}),[l,f]),null},_=window.wp.components,O=function(){return O=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},O.apply(this,arguments)},x=function(e,r,n){return"original"===e?r:n},E=function(e){return!0===Boolean(e)?{target:"_blank",rel:"noopener"}:{target:"_self",rel:""}},P=function(e){var r=e.imageAlt,n=e.imagestyle,o=e.openlinksinnewtab,i=e.recommendation,a=i.title,s=i.url,l=i.image_url,c=i.thumb_url_medium,u=e.showimages;return(0,t.jsx)("li",{children:(0,t.jsx)("a",O({href:s,className:"parsely-recommendations-link"},E(o),{children:(0,t.jsxs)(_.Card,O({className:"parsely-recommendations-card"},{children:[u&&(0,t.jsx)(_.CardMedia,O({className:"parsely-recommendations-cardmedia"},{children:(0,t.jsx)("img",{className:"parsely-recommendations-image",src:x(n,l,c),alt:r})})),(0,t.jsx)(_.CardBody,O({className:"parsely-recommendations-cardbody"},{children:a}))]}))}))})},k=function(){return k=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},k.apply(this,arguments)},N=function(e){var r=e.imagestyle,n=e.recommendations,o=e.showimages,i=e.openlinksinnewtab;return(0,t.jsx)("ul",k({className:"parsely-recommendations-list"},{children:n.map((function(e){return(0,t.jsx)(P,{imageAlt:(0,l.__)("Image for link","wp-parsely"),imagestyle:r,openlinksinnewtab:i,recommendation:e,showimages:o},e.url)}))}))},S=function(){return S=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},S.apply(this,arguments)},R=function(e){var r=e.title;return r?(0,t.jsx)("p",S({className:"parsely-recommendations-list-title"},{children:r})):(0,t.jsx)(t.Fragment,{})},L=function(){return L=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},L.apply(this,arguments)};function A(e){var r,n,o=e.boost,i=e.imagestyle,a=e.isEditMode,s=e.limit,c=e.openlinksinnewtab,u=e.showimages,d=e.sort,p=e.title,f=h().state,m=f.error,y=f.isLoaded,v=f.recommendations;return y&&a&&(m?((n="".concat((0,l.__)("Error:","wp-parsely")," ").concat(JSON.stringify(m))).includes('"errors":{"http_request_failed"')||"object"==typeof m&&"fetch_error"===(null==m?void 0:m.code)?n=(0,l.__)("The Parse.ly Recommendations API is not accessible. You may be offline.","wp-parsely"):n.includes('Error: {"code":403,"message":"Forbidden","data":null}')?n=(0,l.__)("Access denied. Please verify that your Site ID is valid.","wp-parsely"):"object"==typeof m&&"rest_no_route"===(null==m?void 0:m.code)&&(n=(0,l.__)("The REST route is unavailable. To use it, wp_parsely_enable_related_api_proxy should be true.","wp-parsely")),r=n):Array.isArray(v)&&!(null==v?void 0:v.length)&&(r=(0,l.__)("No recommendations found.","wp-parsely"))),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j,{boost:o,limit:s,sort:d,isEditMode:a}),!y&&(0,t.jsx)("span",L({className:"parsely-recommendations-loading"},{children:(0,l.__)("Loading…","wp-parsely")})),r&&(0,t.jsx)("span",L({className:"parsely-recommendations-error"},{children:r})),y&&!!(null==v?void 0:v.length)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(R,{title:p}),(0,t.jsx)(N,{imagestyle:i,openlinksinnewtab:c,recommendations:v,showimages:u})]})]})}var C=function(){return C=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},C.apply(this,arguments)};s()((function(){document.querySelectorAll(".wp-block-wp-parsely-recommendations").forEach((function(e){return(0,i.render)((0,t.jsx)(v,{children:(0,o.createElement)(A,C({},e.dataset,{key:e.id}))}),e)}))}))}()}();