!function(){"use strict";var e,r={146:function(e,r,t){function n(){return n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},n.apply(this,arguments)}var a=window.wp.element,l=window.wp.i18n,o=window.wp.blocks,i=window.wp.blockEditor;function s(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function c(e,r){if(e){if("string"==typeof e)return s(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?s(e,r):void 0}}function u(e,r,t,n,a,l,o){try{var i=e[l](o),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,a)}function m(e){return function(){var r=this,t=arguments;return new Promise((function(n,a){var l=e.apply(r,t);function o(e){u(l,n,a,o,i,"next",e)}function i(e){u(l,n,a,o,i,"throw",e)}o(void 0)}))}}var p=window.regeneratorRuntime,d=t.n(p),w=window.wp.apiFetch,f=t.n(w),v=window.wp.compose,y=window.wp.url,g="RECOMMENDATIONS_BLOCK_ERROR",_="RECOMMENDATIONS_BLOCK_RECOMMENDATIONS",b=function(e){var r=e.error;return{type:g,error:r}},h=function(e){var r=e.recommendations;return{type:_,recommendations:r}};function E(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function P(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(Object(t),!0).forEach((function(r){E(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var C=(0,a.createContext)(),A=function(e,r){switch(r.type){case g:return P(P({},e),{},{isLoaded:!0,error:r.error,recommendations:void 0});case"RECOMMENDATIONS_BLOCK_LOADED":return P(P({},e),{},{isLoaded:!0});case _:var t=r.recommendations;if(!Array.isArray(t))return P(P({},e),{},{recommendations:void 0});var n=t.map((function(e){return{title:e.title,url:e.url,image_url:e.image_url,thumb_url_medium:e.thumb_url_medium}}));return P(P({},e),{},{isLoaded:!0,error:void 0,recommendations:n});default:return P({},e)}},k=function(){return(0,a.useContext)(C)},j=function(e){var r,t,l,o,i={isLoaded:!1,recommendations:void 0,uuid:null===(r=window.PARSELY)||void 0===r||null===(t=r.config)||void 0===t?void 0:t.uuid,clientId:e.clientId},s=(l=(0,a.useReducer)(A,i),o=2,function(e){if(Array.isArray(e))return e}(l)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,l=[],_n=!0,o=!1;try{for(t=t.call(e);!(_n=(n=t.next()).done)&&(l.push(n.value),!r||l.length!==r);_n=!0);}catch(e){o=!0,a=e}finally{try{_n||null==t.return||t.return()}finally{if(o)throw a}}return l}}(l,o)||c(l,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=s[0],m=s[1];return(0,a.createElement)(C.Provider,n({value:{state:u,dispatch:m}},e))},R=function(e){var r=e.boost,t=e.limit,n=e.sort,l=k().dispatch,o={boost:r,limit:t,sort:n,url:window.location.href};function i(){return u.apply(this,arguments)}function u(){return(u=m(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",f()({path:(0,y.addQueryArgs)("/wp-parsely/v1/related",{query:o})}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(){return(p=m(d().mark((function e(){var r,t,n,a,o;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i();case 3:n=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0;case 9:if(null!==(r=n)&&void 0!==r&&r.error&&(a=n.error),!a){e.next=13;break}return l(b({error:n.error})),e.abrupt("return");case 13:o=(null===(t=n)||void 0===t?void 0:t.data)||[],l(h({recommendations:o}));case 15:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var w,g=function(e){if(Array.isArray(e))return s(e)}(w=Object.values(o))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(w)||c(w)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),_=(0,a.useCallback)((function(){return p.apply(this,arguments)}),g),E=(0,v.useDebounce)(_,300);return(0,a.useEffect)(E,g),null},S=window.wp.components,M=function(e){var r,t=e.imageAlt,n=e.imagestyle,l=e.recommendation,o=l.title,i=l.url,s=l.image_url,c=l.thumb_url_medium,u=e.showimages&&(r={imagestyle:n,imageUrl:s,thumbUrlMedium:c},"original"===r.imagestyle?r.imageUrl:r.thumbUrlMedium);return(0,a.createElement)("li",null,(0,a.createElement)("a",{href:i,className:"parsely-recommendations-link"},(0,a.createElement)(S.Card,{className:"parsely-recommendations-card",size:"custom"},u&&(0,a.createElement)(S.CardMedia,{className:"parsely-recommendations-cardmedia"},(0,a.createElement)("img",{className:"parsely-recommendations-image",src:u,alt:t})),(0,a.createElement)(S.CardBody,{className:"parsely-recommendations-cardbody"},o))))},N=function(e){var r=e.imagestyle,t=e.recommendations,n=e.showimages;return(0,a.createElement)("ul",{className:"parsely-recommendations-list"},t.map((function(e,t){return(0,a.createElement)(M,{imagestyle:r,imageAlt:(0,l.__)("Image for link","wp-parsely"),key:t,recommendation:e,showimages:n})})))},x=function(e){var r=e.title;return r?(0,a.createElement)("p",{className:"parsely-recommendations-list-title"},r):(0,a.createElement)(a.Fragment,null)};function I(e){var r,t=e.boost,n=e.limit,o=e.imagestyle,i=e.isEditMode,s=e.personalized,c=e.showimages,u=e.sort,m=e.title,p=k().state,d=p.error,w=p.isLoaded,f=p.recommendations;return w&&i&&(d?r=(0,l.__)("Parse.ly API replied with error: ","wp-parsely")+JSON.stringify(d):!Array.isArray(f)||null!=f&&f.length||(r=(0,l.__)("No recommendations found.","wp-parsely"))),(0,a.createElement)(a.Fragment,null,(0,a.createElement)(R,{boost:t,limit:n,personalized:s,sort:u}),!w&&(0,a.createElement)("span",{className:"parsely-recommendations-loading"},(0,l.__)("Loading…","wp-parsely")),r&&(0,a.createElement)("span",null,r),w&&!(null==f||!f.length)&&(0,a.createElement)(a.Fragment,null,(0,a.createElement)(x,{title:m}),(0,a.createElement)(N,{imagestyle:o,recommendations:f,showimages:c})))}var T,L,D=function(e){var r=e.attributes,t=r.boost,n=r.imagestyle,o=r.limit,s=r.showimages,c=r.sort,u=r.tag,m=r.title,p=e.setAttributes;return(0,a.createElement)(i.InspectorControls,null,(0,a.createElement)(S.PanelBody,{title:"Settings",initialOpen:!0},(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.TextControl,{label:(0,l.__)("Title","wp-parsely"),value:m,onChange:function(e){return p({title:e})}})),(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.RangeControl,{label:(0,l.__)("Maximum Results","wp-parsely"),min:"1",max:"25",onChange:function(e){return p({limit:e})},value:o})),(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.ToggleControl,{label:(0,l.__)("Show Images","wp-parsely"),help:s?(0,l.__)("Showing images","wp-parsely"):(0,l.__)("Not showing images","wp-parsely"),checked:s,onChange:function(){return p({showimages:!s})}})),s&&(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.RadioControl,{label:(0,l.__)("Image style","wp-parsely"),selected:n,options:[{label:(0,l.__)("Original image","wp-parsely"),value:"original"},{label:(0,l.__)("Thumbnail from Parse.ly","wp-parsely"),value:"thumbnail"}],onChange:function(e){return p({imagestyle:"original"===e?"original":"thumbnail"})}})),(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.TextControl,{label:(0,l.__)("Tag","wp-parsely"),value:u,onChange:function(e){return p({tag:e})}})),(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.SelectControl,{label:(0,l.__)("Sort Recommendations","wp-parsely"),value:c,options:[{label:(0,l.__)("Score","wp-parsely"),value:"score"},{label:(0,l.__)("Publication Date","wp-parsely"),value:"pub_date"}],onChange:function(e){return p({sort:e})}})),(0,a.createElement)(S.PanelRow,null,(0,a.createElement)(S.SelectControl,{label:(0,l.__)("Boost","wp-parsely"),value:t,options:[{label:(0,l.__)("Page views","wp-parsely"),value:"views"},{label:(0,l.__)("Page views on mobile devices","wp-parsely"),value:"mobile_views"},{label:(0,l.__)("Page views on tablet devices","wp-parsely"),value:"tablet_views"},{label:(0,l.__)("Page views on desktop devices","wp-parsely"),value:"desktop_views"},{label:(0,l.__)("Unique page visitors","wp-parsely"),value:"visitors"},{label:(0,l.__)("New visitors","wp-parsely"),value:"visitors_new"},{label:(0,l.__)("Returning visitors","wp-parsely"),value:"visitors_returning"},{label:(0,l.__)("Total engagement time in minutes","wp-parsely"),value:"engaged_minutes"},{label:(0,l.__)("Engaged minutes spent by total visitors","wp-parsely"),value:"avg_engaged"},{label:(0,l.__)("Average engaged minutes spent by new visitors","wp-parsely"),value:"avg_engaged_new"},{label:(0,l.__)("Average engaged minutes spent by returning visitors","wp-parsely"),value:"avg_engaged_returning"},{label:(0,l.__)("Total social interactions","wp-parsely"),value:"social_interactions"},{label:(0,l.__)("Count of Facebook shares, likes, and comments","wp-parsely"),value:"fb_interactions"},{label:(0,l.__)("Count of Twitter tweets and retweets","wp-parsely"),value:"tw_interactions"},{label:(0,l.__)("Count of Pinterest pins","wp-parsely"),value:"pi_interactions"},{label:(0,l.__)("Page views where the referrer was any social network","wp-parsely"),value:"social_referrals"},{label:(0,l.__)("Page views where the referrer was facebook.com","wp-parsely"),value:"fb_referrals"},{label:(0,l.__)("Page views where the referrer was twitter.com","wp-parsely"),value:"tw_referrals"},{label:(0,l.__)("Page views where the referrer was pinterest.com","wp-parsely"),value:"pi_referrals"}],onChange:function(e){return p({boost:e})}}))))},B=window.React;function U(){return U=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},U.apply(this,arguments)}(0,o.registerBlockType)("wp-parsely/recommendations",{apiVersion:2,title:(0,l.__)("Parse.ly Recommendations","wp-parsely"),icon:function(e){return B.createElement("svg",U({id:"parsely-logo_svg__Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 60 65"},e),T||(T=B.createElement("defs",null,B.createElement("style",null,".parsely-logo_svg__cls-1{fill:#5ba745}"))),L||(L=B.createElement("path",{className:"parsely-logo_svg__cls-1",d:"M23.72 51.53c0-.18 0-.34-.06-.52a13.11 13.11 0 0 0-2.1-5.53A14.74 14.74 0 0 0 19.12 43c-.27-.21-.5-.11-.51.22l-.24 3.42c0 .33-.38.35-.49 0l-1.5-4.8a1.4 1.4 0 0 0-.77-.78 23.91 23.91 0 0 0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34 0-.45.21-.25.49l2.06 3.76c.2.27 0 .54-.29.33l-4.51-3.6a3.68 3.68 0 0 0-2.86-.48c-1 .16-2.44.46-2.44.46a.68.68 0 0 0-.39.25.73.73 0 0 0-.14.45S.41 43 .54 44a3.63 3.63 0 0 0 1.25 2.62L6.48 50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5 0-.4.37 0 0 .69 1.89 1.31 3.16a24 24 0 0 0 1.66 2.74 1.34 1.34 0 0 0 1 .52l5 .13c.33 0 .41.38.1.48L7.51 58c-.31.1-.34.35-.07.55a14.29 14.29 0 0 0 3.05 1.66 13.09 13.09 0 0 0 5.9.5 25.13 25.13 0 0 0 4.34-1 9.55 9.55 0 0 1-.08-1.2 9.32 9.32 0 0 1 3.07-6.91M59.7 41.53a.73.73 0 0 0-.14-.45.68.68 0 0 0-.39-.25s-1.43-.3-2.44-.46a3.64 3.64 0 0 0-2.86.48l-4.51 3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49 0 0-2 .15-3.39.39a23.91 23.91 0 0 0-3.1.84 1.4 1.4 0 0 0-.77.78l-1.5 4.8c-.11.32-.48.3-.49 0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74 14.74 0 0 0-2.44 2.47 13.11 13.11 0 0 0-2.1 5.49c0 .18 0 .34-.06.52a9.26 9.26 0 0 1 3 8.1 24.1 24.1 0 0 0 4.34 1 13.09 13.09 0 0 0 5.9-.5 14.29 14.29 0 0 0 3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38 1.38 0 0 0 1-.52A24.6 24.6 0 0 0 57 52.92c.61-1.27 1.31-3.16 1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63 3.63 0 0 0 59.46 44c.13-1 .24-2.47.24-2.47M46.5 25.61c0-.53-.35-.72-.8-.43l-4.86 2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2 2 0 0 0 .28-1.68 36.51 36.51 0 0 0-2.19-4.89 34 34 0 0 0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28 5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54 2.54 0 0 0-.66-1.64S35 4.27 33.88 3.27 30.78.69 30.78.69a1.29 1.29 0 0 0-1.54 0s-1.88 1.49-3.12 2.59-2.48 2.35-2.48 2.35A2.5 2.5 0 0 0 23 7.27l.27 8.93c0 .53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77 35.77 0 0 0-3 4.2 35.55 35.55 0 0 0-2 4.62 2 2 0 0 0 .27 1.67l4.67 6.24c.33.42.23 1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6 18.6 0 0 0 .83 5.07 20.16 20.16 0 0 0 5.37 7.77c3.19 3 5.93 7.8 7.45 11.08a9.6 9.6 0 0 1 2.83-.44 9.31 9.31 0 0 1 2.86.45c1.52-3.28 4.26-8.11 7.44-11.09a20.46 20.46 0 0 0 5.09-7 19 19 0 0 0 1.11-5.82M36.12 58.44A6.12 6.12 0 1 1 30 52.32a6.11 6.11 0 0 1 6.12 6.12"})))},category:"widgets",edit:function(e){return(0,a.createElement)("div",(0,i.useBlockProps)(),(0,a.createElement)(j,{clientId:e.clientId},(0,a.createElement)(D,e),(0,a.createElement)(I,n({},e.attributes,{isEditMode:"true"}))))},transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var r=e.idBase,t=e.instance;return!(null==t||!t.raw)&&"Parsely_Recommended_Widget"===r},transform:function(e){var r=e.instance;return(0,o.createBlock)("wp-parsely/recommendations",{name:r.raw.name})}}]}})}},t={};function n(e){var a=t[e];if(void 0!==a)return a.exports;var l=t[e]={exports:{}};return r[e](l,l.exports,n),l.exports}n.m=r,e=[],n.O=function(r,t,a,l){if(!t){var o=1/0;for(u=0;u<e.length;u++){t=e[u][0],a=e[u][1],l=e[u][2];for(var i=!0,s=0;s<t.length;s++)(!1&l||o>=l)&&Object.keys(n.O).every((function(e){return n.O[e](t[s])}))?t.splice(s--,1):(i=!1,l<o&&(o=l));if(i){e.splice(u--,1);var c=a();void 0!==c&&(r=c)}}return r}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[t,a,l]},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,{a:r}),r},n.d=function(e,r){for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e={878:0,570:0};n.O.j=function(r){return 0===e[r]};var r=function(r,t){var a,l,o=t[0],i=t[1],s=t[2],c=0;if(o.some((function(r){return 0!==e[r]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var u=s(n)}for(r&&r(t);c<o.length;c++)l=o[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},t=self.webpackChunkwp_parsely=self.webpackChunkwp_parsely||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))}();var a=n.O(void 0,[570],(function(){return n(146)}));a=n.O(a)}();