!function(){"use strict";var e={418:function(e){var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var c,i,l=o(e),s=1;s<arguments.length;s++){for(var u in c=Object(arguments[s]))r.call(c,u)&&(l[u]=c[u]);if(t){i=t(c);for(var f=0;f<i.length;f++)n.call(c,i[f])&&(l[i[f]]=c[i[f]])}}return l}},251:function(e,t,r){r(418);var n=r(196),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),t.Fragment=a("react.fragment")}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var n,a={},s=null,u=null;for(n in void 0!==r&&(s=""+r),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:s,ref:u,props:a,_owner:c.current}}t.jsx=s,t.jsxs=s},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e,t,n=r(893),o=window.wp.components,a=window.wp.editPost,c=window.wp.plugins,i=window.wp.element,l=window.wp.data,s=window.wp.apiFetch,u=r.n(s),f=window.wp.url,p=function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function c(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,i)}l((n=n.apply(e,t||[])).next())}))},d=function(e,t){var r,n,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},h=function(){function e(){}return e.getTopPosts=function(){return p(this,void 0,void 0,(function(){var e,t,r,n,o;return d(this,(function(a){switch(a.label){case 0:return e=(0,l.select)("core/editor").getCurrentPost(),t=(0,l.select)("core").getEntityRecord("taxonomy","category",e.categories[0]),r=(0,l.select)("core").getEntityRecord("taxonomy","post_tag",Number(e.tags[0])),n=(0,l.select)("core").getEntityRecord("root","user",e.author),t||n||r?[4,this.fetchData(n,t,r)]:[2,Promise.reject("Cannot make request to Parse.ly API because User, Category and Tag are empty.")];case 1:return 0===(o=a.sent()).length?[2,Promise.reject("The Parse.ly API did not return any posts.")]:[2,this.processData(o)]}}))}))},e.fetchData=function(e,t,r){return p(this,void 0,void 0,(function(){var n,o,a,c;return d(this,(function(i){switch(i.label){case 0:n=this.buildFetchDataQuery(e,t,r),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,u()({path:(0,f.addQueryArgs)("/wp-parsely/v1/analytics/posts",n)})];case 2:return o=i.sent(),[3,4];case 3:return c=i.sent(),a=c,[3,4];case 4:return(null==o?void 0:o.error)&&(a=o.error),a?[2,Promise.reject(a)]:[2,(null==o?void 0:o.data)||[]]}}))}))},e.processData=function(e){return e.map((function(e){return e.statsUrl="".concat(window.wpParselyContentHelperPrefix,"?url=").concat(e.url),e}))},e.buildFetchDataQuery=function(e,t,r){return r?{limit:5,tag:r}:(null==t?void 0:t.name)?{limit:5,section:t.name}:(null==e?void 0:e.name)?{limit:5,author:e.name}:{limit:5}},e}(),y=function(){return y=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},y.apply(this,arguments)},b=function(e){var t=e.post;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o.Card,y({size:"small",elevation:2},{children:[(0,n.jsx)(o.CardHeader,{children:(0,n.jsx)("b",{children:t.title})}),(0,n.jsxs)(o.CardBody,{children:[(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:["Views: ",t.views]}),(0,n.jsxs)("li",{children:["Published: ",t.date]}),(0,n.jsxs)("li",{children:["Author: ",t.author]})]}),(0,n.jsxs)("p",{children:[(0,n.jsx)(o.Button,y({href:t.url,target:"_blank",variant:"primary"},{children:"Open Post"}))," "," ",(0,n.jsx)(o.Button,y({href:t.statsUrl,target:"_blank",variant:"secondary"},{children:"Post Stats"}))]})]})]})),(0,n.jsx)("br",{})]})},w=function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function c(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,i)}l((n=n.apply(e,t||[])).next())}))},v=function(e,t){var r,n,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},g=function(){var e=this,t=(0,i.useState)(!0),r=t[0],a=t[1],c=(0,i.useState)(null),l=c[0],s=c[1],u=(0,i.useState)([]),f=u[0],p=u[1],d=function t(r){return w(e,void 0,void 0,(function(){var e=this;return v(this,(function(n){return h.getTopPosts().then((function(e){p(e),a(!1)})).catch((function(n){return w(e,void 0,void 0,(function(){return v(this,(function(e){switch(e.label){case 0:return r>0?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return e.sent(),[4,t(r-1)];case 2:return e.sent(),[3,4];case 3:a(!1),s(n),e.label=4;case 4:return[2]}}))}))})),[2]}))}))};(0,i.useEffect)((function(){a(!0),d(3)}),[]);var y=l?(0,n.jsx)("p",{children:l}):f.map((function(e){return(0,n.jsx)(b,{post:e},e.id)}));return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{children:"Related posts that performed well in the past:"}),r?(0,n.jsx)(o.Spinner,{}):y]})},m=r(196);function j(){return j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},j.apply(this,arguments)}var x=function(){return x=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},x.apply(this,arguments)};(0,c.registerPlugin)("wp-parsely-block-editor-sidebar",{icon:function(r){return m.createElement("svg",j({id:"parsely-logo_svg__Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 60 65"},r),e||(e=m.createElement("defs",null,m.createElement("style",null,".parsely-logo_svg__cls-1{fill:#5ba745}"))),t||(t=m.createElement("path",{className:"parsely-logo_svg__cls-1",d:"M23.72 51.53c0-.18 0-.34-.06-.52a13.11 13.11 0 0 0-2.1-5.53A14.74 14.74 0 0 0 19.12 43c-.27-.21-.5-.11-.51.22l-.24 3.42c0 .33-.38.35-.49 0l-1.5-4.8a1.4 1.4 0 0 0-.77-.78 23.91 23.91 0 0 0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34 0-.45.21-.25.49l2.06 3.76c.2.27 0 .54-.29.33l-4.51-3.6a3.68 3.68 0 0 0-2.86-.48c-1 .16-2.44.46-2.44.46a.68.68 0 0 0-.39.25.73.73 0 0 0-.14.45S.41 43 .54 44a3.63 3.63 0 0 0 1.25 2.62L6.48 50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5 0-.4.37 0 0 .69 1.89 1.31 3.16a24 24 0 0 0 1.66 2.74 1.34 1.34 0 0 0 1 .52l5 .13c.33 0 .41.38.1.48L7.51 58c-.31.1-.34.35-.07.55a14.29 14.29 0 0 0 3.05 1.66 13.09 13.09 0 0 0 5.9.5 25.13 25.13 0 0 0 4.34-1 9.55 9.55 0 0 1-.08-1.2 9.32 9.32 0 0 1 3.07-6.91M59.7 41.53a.73.73 0 0 0-.14-.45.68.68 0 0 0-.39-.25s-1.43-.3-2.44-.46a3.64 3.64 0 0 0-2.86.48l-4.51 3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49 0 0-2 .15-3.39.39a23.91 23.91 0 0 0-3.1.84 1.4 1.4 0 0 0-.77.78l-1.5 4.8c-.11.32-.48.3-.49 0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74 14.74 0 0 0-2.44 2.47 13.11 13.11 0 0 0-2.1 5.49c0 .18 0 .34-.06.52a9.26 9.26 0 0 1 3 8.1 24.1 24.1 0 0 0 4.34 1 13.09 13.09 0 0 0 5.9-.5 14.29 14.29 0 0 0 3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38 1.38 0 0 0 1-.52A24.6 24.6 0 0 0 57 52.92c.61-1.27 1.31-3.16 1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63 3.63 0 0 0 59.46 44c.13-1 .24-2.47.24-2.47M46.5 25.61c0-.53-.35-.72-.8-.43l-4.86 2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2 2 0 0 0 .28-1.68 36.51 36.51 0 0 0-2.19-4.89 34 34 0 0 0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28 5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54 2.54 0 0 0-.66-1.64S35 4.27 33.88 3.27 30.78.69 30.78.69a1.29 1.29 0 0 0-1.54 0s-1.88 1.49-3.12 2.59-2.48 2.35-2.48 2.35A2.5 2.5 0 0 0 23 7.27l.27 8.93c0 .53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77 35.77 0 0 0-3 4.2 35.55 35.55 0 0 0-2 4.62 2 2 0 0 0 .27 1.67l4.67 6.24c.33.42.23 1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6 18.6 0 0 0 .83 5.07 20.16 20.16 0 0 0 5.37 7.77c3.19 3 5.93 7.8 7.45 11.08a9.6 9.6 0 0 1 2.83-.44 9.31 9.31 0 0 1 2.86.45c1.52-3.28 4.26-8.11 7.44-11.09a20.46 20.46 0 0 0 5.09-7 19 19 0 0 0 1.11-5.82M36.12 58.44A6.12 6.12 0 1 1 30 52.32a6.11 6.11 0 0 1 6.12 6.12"})))},render:function(){return(0,n.jsx)(a.PluginSidebar,x({name:"wp-parsely-sidebar",title:"Parse.ly"},{children:(0,n.jsxs)(o.Panel,{children:[(0,n.jsx)(o.PanelHeader,{children:"Parse.ly Content Helper"}),(0,n.jsx)(o.PanelBody,{children:(0,n.jsx)(g,{})})]})}))}})}()}();