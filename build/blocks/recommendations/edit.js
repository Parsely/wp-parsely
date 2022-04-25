!function(){"use strict";var e,t={886:function(e,t,r){function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a.apply(this,arguments)}var o=window.wp.element,l=window.wp.i18n,i=window.wp.blocks,s=window.wp.blockEditor;function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}function m(e,t,r,n,a,o,l){try{var i=e[o](l),s=i.value}catch(e){return void r(e)}i.done?t(s):Promise.resolve(s).then(n,a)}function y(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function l(e){m(o,n,a,l,i,"next",e)}function i(e){m(o,n,a,l,i,"throw",e)}l(void 0)}))}}var d=window.regeneratorRuntime,f=r.n(d),w=window.wp.apiFetch,b=r.n(w),v=window.wp.compose,g=window.wp.url,_="RECOMMENDATIONS_BLOCK_ERROR",h="RECOMMENDATIONS_BLOCK_RECOMMENDATIONS",O=function(e){var t=e.error;return{type:_,error:t}},E=function(e){var t=e.recommendations;return{type:h,recommendations:t}};function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var S=(0,o.createContext)(),C=function(e,t){switch(t.type){case _:return j(j({},e),{},{isLoaded:!0,error:t.error,recommendations:void 0});case"RECOMMENDATIONS_BLOCK_LOADED":return j(j({},e),{},{isLoaded:!0});case h:var r=t.recommendations;if(!Array.isArray(r))return j(j({},e),{},{recommendations:void 0});var n=r.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return j(j({},e),{},{isLoaded:!0,error:void 0,recommendations:n});default:return j({},e)}},A=function(){return(0,o.useContext)(S)},k=function(e){var t,r,n,l,i={isLoaded:!1,recommendations:void 0,uuid:null===(t=window.PARSELY)||void 0===t||null===(r=t.config)||void 0===r?void 0:r.uuid,clientId:e.clientId},s=(n=(0,o.useReducer)(C,i),l=2,function(e){if(Array.isArray(e))return e}(n)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],_n=!0,l=!1;try{for(r=r.call(e);!(_n=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);_n=!0);}catch(e){l=!0,a=e}finally{try{_n||null==r.return||r.return()}finally{if(l)throw a}}return o}}(n,l)||p(n,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=s[0],u=s[1];return(0,o.createElement)(S.Provider,a({value:{state:c,dispatch:u}},e))};function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var N=function(e){var t=e.boost,r=e.limit,n=e.sort,a=e.isEditMode,l=A().dispatch,i={boost:t,limit:r,sort:n,url:window.location.href};function s(){return c.apply(this,arguments)}function c(){return(c=y(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b()({path:(0,g.addQueryArgs)("/wp-parsely/v1/related",{query:i})}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=y(f().mark((function e(){var t,r,n,o,i;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s();case 3:n=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),o=e.t0;case 9:if(null!==(t=n)&&void 0!==t&&t.error&&(o=n.error),!o){e.next=13;break}return l(O({error:o})),e.abrupt("return");case 13:i=(null===(r=n)||void 0===r?void 0:r.data)||[],a&&(i=i.map((function(e){return M(M({},e),{},{url:"#"})}))),l(E({recommendations:i}));case 16:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var d,w=function(e){if(Array.isArray(e))return u(e)}(d=Object.values(i))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(d)||p(d)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),_=(0,o.useCallback)((function(){return m.apply(this,arguments)}),w),h=(0,v.useDebounce)(_,300);return(0,o.useEffect)(h,w),null},D=window.wp.components,x=function(e){var t,r=e.imageAlt,n=e.imagestyle,a=e.recommendation,l=a.title,i=a.url,s=a.image_url,c=a.thumb_url_medium,u=e.showimages&&(t={imagestyle:n,imageUrl:s,thumbUrlMedium:c},"original"===t.imagestyle?t.imageUrl:t.thumbUrlMedium);return(0,o.createElement)("li",null,(0,o.createElement)("a",{href:i,className:"parsely-recommendations-link"},(0,o.createElement)(D.Card,{className:"parsely-recommendations-card",size:"custom"},u&&(0,o.createElement)(D.CardMedia,{className:"parsely-recommendations-cardmedia"},(0,o.createElement)("img",{className:"parsely-recommendations-image",src:u,alt:r})),(0,o.createElement)(D.CardBody,{className:"parsely-recommendations-cardbody"},l))))},T=function(e){var t=e.imagestyle,r=e.recommendations,n=e.showimages;return(0,o.createElement)("ul",{className:"parsely-recommendations-list"},r.map((function(e,r){return(0,o.createElement)(x,{imagestyle:t,imageAlt:(0,l.__)("Image for link","wp-parsely"),key:r,recommendation:e,showimages:n})})))},I=function(e){var t=e.title;return t?(0,o.createElement)("p",{className:"parsely-recommendations-list-title"},t):(0,o.createElement)(o.Fragment,null)};function L(e){var t,r=e.boost,n=e.limit,a=e.imagestyle,i=e.isEditMode,s=e.personalized,u=e.showimages,p=e.sort,m=e.title,y=A().state,d=y.error,f=y.isLoaded,w=y.recommendations;return f&&i&&(d?t=function(){var e="".concat((0,l.__)("Error:","wp-parsely")," ").concat(JSON.stringify(d));return e.includes('{"errors":{"403":["Forbidden"]},"error_data":[]}')?e=(0,l.__)("Access denied. Please verify that your Site ID is valid.","wp-parsely"):"object"===c(d)&&"rest_no_route"===(null==d?void 0:d.code)?e=(0,l.__)("The REST route is unavailable. To use it, wp_parsely_enable_related_api_proxy should be true.","wp-parsely"):e.includes('{"errors":{"http_request_failed":["A valid URL was not provided."]},"error_data":[]}')&&(e=(0,l.__)("The Parse.ly Recommendations API is not accessible. You may be offline.","wp-parsely")),e}():!Array.isArray(w)||null!=w&&w.length||(t=(0,l.__)("No recommendations found.","wp-parsely"))),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(N,{boost:r,limit:n,personalized:s,sort:p,isEditMode:i}),!f&&(0,o.createElement)("span",{className:"parsely-recommendations-loading"},(0,l.__)("Loading…","wp-parsely")),t&&(0,o.createElement)("span",{className:"parsely-recommendations-error"},t),f&&!(null==w||!w.length)&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(I,{title:m}),(0,o.createElement)(T,{imagestyle:a,recommendations:w,showimages:u})))}var B,U,F=function(e){var t=e.attributes,r=t.boost,n=t.imagestyle,a=t.limit,i=t.showimages,c=t.sort,u=t.tag,p=t.title,m=e.setAttributes;return(0,o.createElement)(s.InspectorControls,null,(0,o.createElement)(D.PanelBody,{title:"Settings",initialOpen:!0},(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.TextControl,{label:(0,l.__)("Title","wp-parsely"),value:p,onChange:function(e){return m({title:e})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.RangeControl,{label:(0,l.__)("Maximum Results","wp-parsely"),min:"1",max:"25",onChange:function(e){return m({limit:e})},value:a})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.ToggleControl,{label:(0,l.__)("Show Images","wp-parsely"),help:i?(0,l.__)("Showing images","wp-parsely"):(0,l.__)("Not showing images","wp-parsely"),checked:i,onChange:function(){return m({showimages:!i})}})),i&&(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.RadioControl,{label:(0,l.__)("Image style","wp-parsely"),selected:n,options:[{label:(0,l.__)("Original image","wp-parsely"),value:"original"},{label:(0,l.__)("Thumbnail from Parse.ly","wp-parsely"),value:"thumbnail"}],onChange:function(e){return m({imagestyle:"original"===e?"original":"thumbnail"})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.TextControl,{label:(0,l.__)("Tag","wp-parsely"),value:u,onChange:function(e){return m({tag:e})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.SelectControl,{label:(0,l.__)("Sort Recommendations","wp-parsely"),value:c,options:[{label:(0,l.__)("Score","wp-parsely"),value:"score"},{label:(0,l.__)("Publication Date","wp-parsely"),value:"pub_date"}],onChange:function(e){return m({sort:e})}})),(0,o.createElement)(D.PanelRow,null,(0,o.createElement)(D.SelectControl,{label:(0,l.__)("Boost","wp-parsely"),value:r,options:[{label:(0,l.__)("Page views","wp-parsely"),value:"views"},{label:(0,l.__)("Page views on mobile devices","wp-parsely"),value:"mobile_views"},{label:(0,l.__)("Page views on tablet devices","wp-parsely"),value:"tablet_views"},{label:(0,l.__)("Page views on desktop devices","wp-parsely"),value:"desktop_views"},{label:(0,l.__)("Unique page visitors","wp-parsely"),value:"visitors"},{label:(0,l.__)("New visitors","wp-parsely"),value:"visitors_new"},{label:(0,l.__)("Returning visitors","wp-parsely"),value:"visitors_returning"},{label:(0,l.__)("Total engagement time in minutes","wp-parsely"),value:"engaged_minutes"},{label:(0,l.__)("Engaged minutes spent by total visitors","wp-parsely"),value:"avg_engaged"},{label:(0,l.__)("Average engaged minutes spent by new visitors","wp-parsely"),value:"avg_engaged_new"},{label:(0,l.__)("Average engaged minutes spent by returning visitors","wp-parsely"),value:"avg_engaged_returning"},{label:(0,l.__)("Total social interactions","wp-parsely"),value:"social_interactions"},{label:(0,l.__)("Count of Facebook shares, likes, and comments","wp-parsely"),value:"fb_interactions"},{label:(0,l.__)("Count of Twitter tweets and retweets","wp-parsely"),value:"tw_interactions"},{label:(0,l.__)("Count of Pinterest pins","wp-parsely"),value:"pi_interactions"},{label:(0,l.__)("Page views where the referrer was any social network","wp-parsely"),value:"social_referrals"},{label:(0,l.__)("Page views where the referrer was facebook.com","wp-parsely"),value:"fb_referrals"},{label:(0,l.__)("Page views where the referrer was twitter.com","wp-parsely"),value:"tw_referrals"},{label:(0,l.__)("Page views where the referrer was pinterest.com","wp-parsely"),value:"pi_referrals"}],onChange:function(e){return m({boost:e})}}))))},Y=window.React;function q(){return q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},q.apply(this,arguments)}var z=JSON.parse('{"u2":"wp-parsely/recommendations","Y4":{"boost":{"type":"string","default":"views"},"imagestyle":{"type":"string","default":"original"},"limit":{"type":"number","default":3},"showimages":{"type":"boolean","default":true},"sort":{"type":"string","default":"score"},"tag":{"type":"string"},"title":{"type":"string","default":"Related Content"}}}');function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function J(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Q=z.u2,V=z.Y4;(0,i.registerBlockType)(Q,{apiVersion:2,icon:function(e){return Y.createElement("svg",q({id:"parsely-logo_svg__Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 60 65"},e),B||(B=Y.createElement("defs",null,Y.createElement("style",null,".parsely-logo_svg__cls-1{fill:#5ba745}"))),U||(U=Y.createElement("path",{className:"parsely-logo_svg__cls-1",d:"M23.72 51.53c0-.18 0-.34-.06-.52a13.11 13.11 0 0 0-2.1-5.53A14.74 14.74 0 0 0 19.12 43c-.27-.21-.5-.11-.51.22l-.24 3.42c0 .33-.38.35-.49 0l-1.5-4.8a1.4 1.4 0 0 0-.77-.78 23.91 23.91 0 0 0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34 0-.45.21-.25.49l2.06 3.76c.2.27 0 .54-.29.33l-4.51-3.6a3.68 3.68 0 0 0-2.86-.48c-1 .16-2.44.46-2.44.46a.68.68 0 0 0-.39.25.73.73 0 0 0-.14.45S.41 43 .54 44a3.63 3.63 0 0 0 1.25 2.62L6.48 50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5 0-.4.37 0 0 .69 1.89 1.31 3.16a24 24 0 0 0 1.66 2.74 1.34 1.34 0 0 0 1 .52l5 .13c.33 0 .41.38.1.48L7.51 58c-.31.1-.34.35-.07.55a14.29 14.29 0 0 0 3.05 1.66 13.09 13.09 0 0 0 5.9.5 25.13 25.13 0 0 0 4.34-1 9.55 9.55 0 0 1-.08-1.2 9.32 9.32 0 0 1 3.07-6.91M59.7 41.53a.73.73 0 0 0-.14-.45.68.68 0 0 0-.39-.25s-1.43-.3-2.44-.46a3.64 3.64 0 0 0-2.86.48l-4.51 3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49 0 0-2 .15-3.39.39a23.91 23.91 0 0 0-3.1.84 1.4 1.4 0 0 0-.77.78l-1.5 4.8c-.11.32-.48.3-.49 0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74 14.74 0 0 0-2.44 2.47 13.11 13.11 0 0 0-2.1 5.49c0 .18 0 .34-.06.52a9.26 9.26 0 0 1 3 8.1 24.1 24.1 0 0 0 4.34 1 13.09 13.09 0 0 0 5.9-.5 14.29 14.29 0 0 0 3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38 1.38 0 0 0 1-.52A24.6 24.6 0 0 0 57 52.92c.61-1.27 1.31-3.16 1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63 3.63 0 0 0 59.46 44c.13-1 .24-2.47.24-2.47M46.5 25.61c0-.53-.35-.72-.8-.43l-4.86 2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2 2 0 0 0 .28-1.68 36.51 36.51 0 0 0-2.19-4.89 34 34 0 0 0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28 5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54 2.54 0 0 0-.66-1.64S35 4.27 33.88 3.27 30.78.69 30.78.69a1.29 1.29 0 0 0-1.54 0s-1.88 1.49-3.12 2.59-2.48 2.35-2.48 2.35A2.5 2.5 0 0 0 23 7.27l.27 8.93c0 .53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77 35.77 0 0 0-3 4.2 35.55 35.55 0 0 0-2 4.62 2 2 0 0 0 .27 1.67l4.67 6.24c.33.42.23 1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6 18.6 0 0 0 .83 5.07 20.16 20.16 0 0 0 5.37 7.77c3.19 3 5.93 7.8 7.45 11.08a9.6 9.6 0 0 1 2.83-.44 9.31 9.31 0 0 1 2.86.45c1.52-3.28 4.26-8.11 7.44-11.09a20.46 20.46 0 0 0 5.09-7 19 19 0 0 0 1.11-5.82M36.12 58.44A6.12 6.12 0 1 1 30 52.32a6.11 6.11 0 0 1 6.12 6.12"})))},category:"widgets",edit:function(e){return(0,o.createElement)("div",(0,s.useBlockProps)(),(0,o.createElement)(k,{clientId:e.clientId},(0,o.createElement)(F,e),(0,o.createElement)(L,a({},e.attributes,{isEditMode:"true"}))))},attributes:J(J({},V),{},{title:{type:"string",default:(0,l.__)("Related Content","wp-parsely")}}),transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var t=e.idBase,r=e.instance;return!(null==r||!r.raw)&&"Parsely_Recommended_Widget"===t},transform:function(e){var t=e.instance;return(0,i.createBlock)("wp-parsely/recommendations",{name:t.raw.name})}}]}})}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,r,a,o){if(!r){var l=1/0;for(u=0;u<e.length;u++){r=e[u][0],a=e[u][1],o=e[u][2];for(var i=!0,s=0;s<r.length;s++)(!1&o||l>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(i=!1,o<l&&(l=o));if(i){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,a,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={878:0,570:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,o,l=r[0],i=r[1],s=r[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var u=s(n)}for(t&&t(r);c<l.length;c++)o=l[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=self.webpackChunkwp_parsely=self.webpackChunkwp_parsely||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var a=n.O(void 0,[570],(function(){return n(886)}));a=n.O(a)}();