!function(){"use strict";var e,r={886:function(e,r,t){function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(){return a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a.apply(this,arguments)}var o=window.wp.element,l=window.wp.i18n,i=window.wp.blocks,s=window.wp.blockEditor;function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function p(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}function m(e,r,t,n,a,o,l){try{var i=e[o](l),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,a)}function f(e){return function(){var r=this,t=arguments;return new Promise((function(n,a){var o=e.apply(r,t);function l(e){m(o,n,a,l,i,"next",e)}function i(e){m(o,n,a,l,i,"throw",e)}l(void 0)}))}}var y=window.regeneratorRuntime,d=t.n(y),w=window.wp.apiFetch,b=t.n(w),v=window.wp.compose,g=window.wp.url,_="RECOMMENDATIONS_BLOCK_ERROR",h="RECOMMENDATIONS_BLOCK_RECOMMENDATIONS",O=function(e){var r=e.error;return{type:_,error:r}},E=function(e){var r=e.recommendations;return{type:h,recommendations:r}};function P(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function j(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?P(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):P(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var S=(0,o.createContext)(),C=function(e,r){switch(r.type){case _:return j(j({},e),{},{isLoaded:!0,error:r.error,recommendations:void 0});case"RECOMMENDATIONS_BLOCK_LOADED":return j(j({},e),{},{isLoaded:!0});case h:var t=r.recommendations;if(!Array.isArray(t))return j(j({},e),{},{recommendations:void 0});var n=t.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return j(j({},e),{},{isLoaded:!0,error:void 0,recommendations:n});default:return j({},e)}},A=function(){return(0,o.useContext)(S)},k=function(e){var r,t,n,l,i={isLoaded:!1,recommendations:void 0,uuid:null===(r=window.PARSELY)||void 0===r||null===(t=r.config)||void 0===t?void 0:t.uuid,clientId:e.clientId},s=(n=(0,o.useReducer)(C,i),l=2,function(e){if(Array.isArray(e))return e}(n)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],_n=!0,l=!1;try{for(t=t.call(e);!(_n=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);_n=!0);}catch(e){l=!0,a=e}finally{try{_n||null==t.return||t.return()}finally{if(l)throw a}}return o}}(n,l)||p(n,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=s[0],u=s[1];return(0,o.createElement)(S.Provider,a({value:{state:c,dispatch:u}},e))};function R(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function M(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?R(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var N=function(e){var r=e.boost,t=e.limit,n=e.sort,a=e.isEditMode,l=A().dispatch,i={boost:r,limit:t,sort:n,url:window.location.href};function s(){return c.apply(this,arguments)}function c(){return(c=f(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b()({path:(0,g.addQueryArgs)("/wp-parsely/v1/related",{query:i})}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=f(d().mark((function e(){var r,t,n,o,i;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s();case 3:n=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),o=e.t0;case 9:if(null!==(r=n)&&void 0!==r&&r.error&&(o=n.error),!o){e.next=13;break}return l(O({error:o})),e.abrupt("return");case 13:i=(null===(t=n)||void 0===t?void 0:t.data)||[],a&&(i=i.map((function(e){return M(M({},e),{},{url:"#"})}))),l(E({recommendations:i}));case 16:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var y,w=function(e){if(Array.isArray(e))return u(e)}(y=Object.values(i))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(y)||p(y)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),_=(0,o.useCallback)((function(){return m.apply(this,arguments)}),w),h=(0,v.useDebounce)(_,300);return(0,o.useEffect)(h,w),null},D=window.wp.components,x=function(e){var r,t=e.imageAlt,n=e.imagestyle,a=e.recommendation,l=a.title,i=a.url,s=a.image_url,c=a.thumb_url_medium,u=e.showimages&&(r={imagestyle:n,imageUrl:s,thumbUrlMedium:c},"original"===r.imagestyle?r.imageUrl:r.thumbUrlMedium);return(0,o.createElement)("li",null,(0,o.createElement)("a",{href:i,className:"parsely-recommendations-link"},(0,o.createElement)(D.Card,{className:"parsely-recommendations-card",size:"custom"},u&&(0,o.createElement)(D.CardMedia,{className:"parsely-recommendations-cardmedia"},(0,o.createElement)("img",{className:"parsely-recommendations-image",src:u,alt:t})),(0,o.createElement)(D.CardBody,{className:"parsely-recommendations-cardbody"},l))))},I=function(e){var r=e.imagestyle,t=e.recommendations,n=e.showimages;return(0,o.createElement)("ul",{className:"parsely-recommendations-list"},t.map((function(e,t){return(0,o.createElement)(x,{imagestyle:r,imageAlt:(0,l.__)("Image for link","wp-parsely"),key:t,recommendation:e,showimages:n})})))},T=function(e){var r=e.title;return r?(0,o.createElement)("p",{className:"parsely-recommendations-list-title"},r):(0,o.createElement)(o.Fragment,null)};function L(e){var r,t=e.boost,n=e.limit,a=e.imagestyle,i=e.isEditMode,s=e.personalized,u=e.showimages,p=e.sort,m=e.title,f=A().state,y=f.error,d=f.isLoaded,w=f.recommendations;return d&&i&&(y?r=function(){var e="".concat((0,l.__)("Error:","wp-parsely")," ").concat(JSON.stringify(y));return e.includes('"errors":{"http_request_failed"')||"object"===c(y)&&"fetch_error"===(null==y?void 0:y.code)?e=(0,l.__)("The Parse.ly Recommendations API is not accessible. You may be offline.","wp-parsely"):e.includes('{"errors":{"403":["Forbidden"]},"error_data":[]}')?e=(0,l.__)("Access denied. Please verify that your Site ID is valid.","wp-parsely"):"object"===c(y)&&"rest_no_route"===(null==y?void 0:y.code)&&(e=(0,l.__)("The REST route is unavailable. To use it, wp_parsely_enable_related_api_proxy should be true.","wp-parsely")),e}():!Array.isArray(w)||null!=w&&w.length||(r=(0,l.__)("No recommendations found.","wp-parsely"))),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(N,{boost:t,limit:n,personalized:s,sort:p,isEditMode:i}),!d&&(0,o.createElement)("span",{className:"parsely-recommendations-loading"},(0,l.__)("Loading…","wp-parsely")),r&&(0,o.createElement)("span",{className:"parsely-recommendations-error"},r),d&&!(null==w||!w.length)&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(T,{title:m}),(0,o.createElement)(I,{imagestyle:a,recommendations:w,showimages:u})))}var B,F,U=function(e){var r=e.attributes,t=r.boost,n=r.imagestyle,a=r.limit,i=r.showimages,c=r.sort,u=r.title,p=e.setAttributes;return(0,o.createElement)(s.InspectorControls,null,(0,o.createElement)(D.PanelBody,{title:"Settings",initialOpen:!0},(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.TextControl,{label:(0,l.__)("Title","wp-parsely"),value:u,onChange:function(e){return p({title:e})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.RangeControl,{label:(0,l.__)("Maximum Results","wp-parsely"),min:"1",max:"25",onChange:function(e){return p({limit:e})},value:a})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.ToggleControl,{label:(0,l.__)("Show Images","wp-parsely"),help:i?(0,l.__)("Showing images","wp-parsely"):(0,l.__)("Not showing images","wp-parsely"),checked:i,onChange:function(){return p({showimages:!i})}})),i&&(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.RadioControl,{label:(0,l.__)("Image style","wp-parsely"),selected:n,options:[{label:(0,l.__)("Original image","wp-parsely"),value:"original"},{label:(0,l.__)("Thumbnail from Parse.ly","wp-parsely"),value:"thumbnail"}],onChange:function(e){return p({imagestyle:"original"===e?"original":"thumbnail"})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.SelectControl,{label:(0,l.__)("Sort Recommendations","wp-parsely"),value:c,options:[{label:(0,l.__)("Score","wp-parsely"),value:"score"},{label:(0,l.__)("Publication Date","wp-parsely"),value:"pub_date"}],onChange:function(e){return p({sort:e})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.SelectControl,{label:(0,l.__)("Boost","wp-parsely"),value:t,options:[{label:(0,l.__)("Page views","wp-parsely"),value:"views"},{label:(0,l.__)("Page views on mobile devices","wp-parsely"),value:"mobile_views"},{label:(0,l.__)("Page views on tablet devices","wp-parsely"),value:"tablet_views"},{label:(0,l.__)("Page views on desktop devices","wp-parsely"),value:"desktop_views"},{label:(0,l.__)("Unique page visitors","wp-parsely"),value:"visitors"},{label:(0,l.__)("New visitors","wp-parsely"),value:"visitors_new"},{label:(0,l.__)("Returning visitors","wp-parsely"),value:"visitors_returning"},{label:(0,l.__)("Total engagement time in minutes","wp-parsely"),value:"engaged_minutes"},{label:(0,l.__)("Engaged minutes spent by total visitors","wp-parsely"),value:"avg_engaged"},{label:(0,l.__)("Average engaged minutes spent by new visitors","wp-parsely"),value:"avg_engaged_new"},{label:(0,l.__)("Average engaged minutes spent by returning visitors","wp-parsely"),value:"avg_engaged_returning"},{label:(0,l.__)("Total social interactions","wp-parsely"),value:"social_interactions"},{label:(0,l.__)("Count of Facebook shares, likes, and comments","wp-parsely"),value:"fb_interactions"},{label:(0,l.__)("Count of Twitter tweets and retweets","wp-parsely"),value:"tw_interactions"},{label:(0,l.__)("Count of Pinterest pins","wp-parsely"),value:"pi_interactions"},{label:(0,l.__)("Page views where the referrer was any social network","wp-parsely"),value:"social_referrals"},{label:(0,l.__)("Page views where the referrer was facebook.com","wp-parsely"),value:"fb_referrals"},{label:(0,l.__)("Page views where the referrer was twitter.com","wp-parsely"),value:"tw_referrals"},{label:(0,l.__)("Page views where the referrer was pinterest.com","wp-parsely"),value:"pi_referrals"}],onChange:function(e){return p({boost:e})}}))))},Y=window.React;function q(){return q=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},q.apply(this,arguments)}var z=JSON.parse('{"u2":"wp-parsely/recommendations","Y4":{"boost":{"type":"string","default":"views"},"imagestyle":{"type":"string","default":"original"},"limit":{"type":"number","default":3},"showimages":{"type":"boolean","default":true},"sort":{"type":"string","default":"score"},"title":{"type":"string","default":"Related Content"}}}');function K(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function J(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?K(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):K(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var Q=z.u2,V=z.Y4;(0,i.registerBlockType)(Q,{apiVersion:2,icon:function(e){return Y.createElement("svg",q({id:"parsely-logo_svg__Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 60 65"},e),B||(B=Y.createElement("defs",null,Y.createElement("style",null,".parsely-logo_svg__cls-1{fill:#5ba745}"))),F||(F=Y.createElement("path",{className:"parsely-logo_svg__cls-1",d:"M23.72 51.53c0-.18 0-.34-.06-.52a13.11 13.11 0 0 0-2.1-5.53A14.74 14.74 0 0 0 19.12 43c-.27-.21-.5-.11-.51.22l-.24 3.42c0 .33-.38.35-.49 0l-1.5-4.8a1.4 1.4 0 0 0-.77-.78 23.91 23.91 0 0 0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34 0-.45.21-.25.49l2.06 3.76c.2.27 0 .54-.29.33l-4.51-3.6a3.68 3.68 0 0 0-2.86-.48c-1 .16-2.44.46-2.44.46a.68.68 0 0 0-.39.25.73.73 0 0 0-.14.45S.41 43 .54 44a3.63 3.63 0 0 0 1.25 2.62L6.48 50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5 0-.4.37 0 0 .69 1.89 1.31 3.16a24 24 0 0 0 1.66 2.74 1.34 1.34 0 0 0 1 .52l5 .13c.33 0 .41.38.1.48L7.51 58c-.31.1-.34.35-.07.55a14.29 14.29 0 0 0 3.05 1.66 13.09 13.09 0 0 0 5.9.5 25.13 25.13 0 0 0 4.34-1 9.55 9.55 0 0 1-.08-1.2 9.32 9.32 0 0 1 3.07-6.91M59.7 41.53a.73.73 0 0 0-.14-.45.68.68 0 0 0-.39-.25s-1.43-.3-2.44-.46a3.64 3.64 0 0 0-2.86.48l-4.51 3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49 0 0-2 .15-3.39.39a23.91 23.91 0 0 0-3.1.84 1.4 1.4 0 0 0-.77.78l-1.5 4.8c-.11.32-.48.3-.49 0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74 14.74 0 0 0-2.44 2.47 13.11 13.11 0 0 0-2.1 5.49c0 .18 0 .34-.06.52a9.26 9.26 0 0 1 3 8.1 24.1 24.1 0 0 0 4.34 1 13.09 13.09 0 0 0 5.9-.5 14.29 14.29 0 0 0 3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38 1.38 0 0 0 1-.52A24.6 24.6 0 0 0 57 52.92c.61-1.27 1.31-3.16 1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63 3.63 0 0 0 59.46 44c.13-1 .24-2.47.24-2.47M46.5 25.61c0-.53-.35-.72-.8-.43l-4.86 2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2 2 0 0 0 .28-1.68 36.51 36.51 0 0 0-2.19-4.89 34 34 0 0 0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28 5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54 2.54 0 0 0-.66-1.64S35 4.27 33.88 3.27 30.78.69 30.78.69a1.29 1.29 0 0 0-1.54 0s-1.88 1.49-3.12 2.59-2.48 2.35-2.48 2.35A2.5 2.5 0 0 0 23 7.27l.27 8.93c0 .53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77 35.77 0 0 0-3 4.2 35.55 35.55 0 0 0-2 4.62 2 2 0 0 0 .27 1.67l4.67 6.24c.33.42.23 1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6 18.6 0 0 0 .83 5.07 20.16 20.16 0 0 0 5.37 7.77c3.19 3 5.93 7.8 7.45 11.08a9.6 9.6 0 0 1 2.83-.44 9.31 9.31 0 0 1 2.86.45c1.52-3.28 4.26-8.11 7.44-11.09a20.46 20.46 0 0 0 5.09-7 19 19 0 0 0 1.11-5.82M36.12 58.44A6.12 6.12 0 1 1 30 52.32a6.11 6.11 0 0 1 6.12 6.12"})))},category:"widgets",edit:function(e){return(0,o.createElement)("div",(0,s.useBlockProps)(),(0,o.createElement)(k,{clientId:e.clientId},(0,o.createElement)(U,e),(0,o.createElement)(L,a({},e.attributes,{isEditMode:"true"}))))},attributes:J(J({},V),{},{title:{type:"string",default:(0,l.__)("Related Content","wp-parsely")}}),transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var r=e.idBase,t=e.instance;return!(null==t||!t.raw)&&"Parsely_Recommended_Widget"===r},transform:function(e){var r=e.instance;return(0,i.createBlock)("wp-parsely/recommendations",{name:r.raw.name})}}]}})}},t={};function n(e){var a=t[e];if(void 0!==a)return a.exports;var o=t[e]={exports:{}};return r[e](o,o.exports,n),o.exports}n.m=r,e=[],n.O=function(r,t,a,o){if(!t){var l=1/0;for(u=0;u<e.length;u++){t=e[u][0],a=e[u][1],o=e[u][2];for(var i=!0,s=0;s<t.length;s++)(!1&o||l>=o)&&Object.keys(n.O).every((function(e){return n.O[e](t[s])}))?t.splice(s--,1):(i=!1,o<l&&(l=o));if(i){e.splice(u--,1);var c=a();void 0!==c&&(r=c)}}return r}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[t,a,o]},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,{a:r}),r},n.d=function(e,r){for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e={878:0,570:0};n.O.j=function(r){return 0===e[r]};var r=function(r,t){var a,o,l=t[0],i=t[1],s=t[2],c=0;if(l.some((function(r){return 0!==e[r]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var u=s(n)}for(r&&r(t);c<l.length;c++)o=l[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},t=self.webpackChunkwp_parsely=self.webpackChunkwp_parsely||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))}();var a=n.O(void 0,[570],(function(){return n(886)}));a=n.O(a)}();