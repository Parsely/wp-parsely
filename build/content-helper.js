!function(){"use strict";var e,t,r,n,o,a,c,s,i,l,u,p,f,h,d,y,w,b,g,v,m,j={418:function(e){var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var c,s,i=o(e),l=1;l<arguments.length;l++){for(var u in c=Object(arguments[l]))r.call(c,u)&&(i[u]=c[u]);if(t){s=t(c);for(var p=0;p<s.length;p++)n.call(c,s[p])&&(i[s[p]]=c[s[p]])}}return i}},251:function(e,t,r){r(418);var n=r(196),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),t.Fragment=a("react.fragment")}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s=Object.prototype.hasOwnProperty,i={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var n,a={},l=null,u=null;for(n in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,n)&&!i.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:u,props:a,_owner:c.current}}t.jsx=l,t.jsxs=l},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},x={};function _(e){var t=x[e];if(void 0!==t)return t.exports;var r=x[e]={exports:{}};return j[e](r,r.exports,_),r.exports}_.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return _.d(t,{a:t}),t},_.d=function(e,t){for(var r in t)_.o(t,r)&&!_.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},_.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e=_(893),t=window.wp.i18n,r=window.wp.components,n=window.wp.editPost,o=window.wp.plugins,a=window.wp.element,c=window.wp.data,s=window.wp.apiFetch,i=_.n(s),l=window.wp.url,u=function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function c(e){try{i(n.next(e))}catch(e){a(e)}}function s(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}i((n=n.apply(e,t||[])).next())}))},p=function(e,t){var r,n,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},f=function(){function e(){}return e.getTopPosts=function(){return u(this,void 0,void 0,(function(){var e,r,n,o,a,s,i,l,u,f;return p(this,(function(p){switch(p.label){case 0:return e=(0,c.select)("core/editor"),r=e.getCurrentPost(),n=(0,c.select)("core").getEntityRecord("root","user",r.author),o=e.getEditedPostAttribute("categories"),a=(0,c.select)("core").getEntityRecord("taxonomy","category",o[0]),s=e.getEditedPostAttribute("tags"),i=(0,c.select)("core").getEntityRecord("taxonomy","post_tag",s[0]),null===(l=this.buildFetchDataQuery(n,a,i)).query?[2,Promise.reject(l.message)]:[4,this.fetchData(l)];case 1:return u=p.sent(),f="".concat((0,t.__)("Top-performing posts","wp-parsely")," ").concat(l.message,"."),"string"==typeof u?[2,{message:u,posts:[]}]:(0===u.length&&(f="".concat((0,t.__)("The Parse.ly API did not return any results for top-performing posts","wp-parsely")," ").concat(l.message,".")),[2,{message:f,posts:this.processData(u)}])}}))}))},e.fetchData=function(e){return u(this,void 0,void 0,(function(){var r,n,o;return p(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,i()({path:(0,l.addQueryArgs)("/wp-parsely/v1/analytics/posts",e.query)})];case 1:return r=a.sent(),[3,3];case 2:return n=a.sent(),[2,"".concat((0,t.__)("WordPress Error:","wp-parsely")," ").concat(n.message)];case 3:return(null==r?void 0:r.error)?(o=JSON.stringify(r.error).match(/\[\"(.*?)\"\]/)[1],[2,"".concat((0,t.__)("Error:","wp-parsely")," ").concat(o)]):[2,(null==r?void 0:r.data)||[]]}}))}))},e.processData=function(e){return e.map((function(e){var t="".concat(window.wpParselyContentHelperPrefix,"?url=").concat(window.encodeURIComponent(e.url));return Object.assign(e,{statsUrl:t})}))},e.buildFetchDataQuery=function(e,r,n){return e||r||n?n?{query:{limit:5,tag:n},message:"".concat((0,t.__)("with the tag","wp-parsely"),' "').concat(n.name,'"')}:(null==r?void 0:r.name)?{query:{limit:5,section:r.name},message:"".concat((0,t.__)("in the category","wp-parsely"),' "').concat(r.name,'"')}:{query:{limit:5,author:e.name},message:"".concat((0,t.__)("by the author","wp-parsely"),' "').concat(e.name,'"')}:{query:null,message:(0,t.__)("Error: Cannot perform request because the post's Author, Category and Tag are empty.","wp-parsely")}},e}(),h=function(){return h=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},h.apply(this,arguments)},d=function(n){var o=n.post;return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(r.Card,h({size:"small",elevation:2,className:"parsely-content-helper-card"},{children:[(0,e.jsx)(r.CardHeader,{children:(0,e.jsx)("b",{children:o.title})}),(0,e.jsxs)(r.CardBody,{children:[(0,e.jsxs)("ul",{children:[(0,e.jsxs)("li",{children:[(0,t.__)("Views:","wp-parsely")," ",o.views]}),(0,e.jsxs)("li",{children:[(0,t.__)("Published:","wp-parsely")," ",o.date]}),(0,e.jsxs)("li",{children:[(0,t.__)("Author:","wp-parsely")," ",o.author]})]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(r.Button,h({href:o.url,target:"_blank",variant:"primary"},{children:(0,t.__)("Open Post","wp-parsely")}))," "," ",(0,e.jsx)(r.Button,h({href:o.statsUrl,target:"_blank",variant:"secondary"},{children:(0,t.__)("Post Stats","wp-parsely")}))]})]})]}))})},y=function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function c(e){try{i(n.next(e))}catch(e){a(e)}}function s(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}i((n=n.apply(e,t||[])).next())}))},w=function(e,t){var r,n,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},b=function(){var t=this,n=(0,a.useState)(!0),o=n[0],c=n[1],s=(0,a.useState)(null),i=s[0],l=s[1],u=(0,a.useState)(null),p=u[0],h=u[1],b=(0,a.useState)([]),g=b[0],v=b[1];if((0,a.useEffect)((function(){var e=function(r){return y(t,void 0,void 0,(function(){var t=this;return w(this,(function(n){return f.getTopPosts().then((function(e){v(e.posts),h(e.message),c(!1)})).catch((function(n){return y(t,void 0,void 0,(function(){return w(this,(function(t){switch(t.label){case 0:return r>0?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return t.sent(),[4,e(r-1)];case 2:return t.sent(),[3,4];case 3:c(!1),l(n),t.label=4;case 4:return[2]}}))}))})),[2]}))}))};c(!0),e(3)}),[]),i)return(0,e.jsx)("p",{children:i});var m=g.map((function(t){return(0,e.jsx)(d,{post:t},t.id)}));return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("p",{children:p}),o?(0,e.jsx)(r.Spinner,{}):m]})},g=function(){return g=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},g.apply(this,arguments)},v=function(){return(0,e.jsxs)(r.SVG,g({height:24,viewBox:"0 0 60 65",width:24,xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M23.72,51.53c0-.18,0-.34-.06-.52a13.11,13.11,0,0,0-2.1-5.53A14.74,14.74,0,0,0,19.12,43c-.27-.21-.5-.11-.51.22l-.24,3.42c0,.33-.38.35-.49,0l-1.5-4.8a1.4,1.4,0,0,0-.77-.78,23.91,23.91,0,0,0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34,0-.45.21-.25.49l2.06,3.76c.2.27,0,.54-.29.33l-4.51-3.6a3.68,3.68,0,0,0-2.86-.48c-1,.16-2.44.46-2.44.46a.68.68,0,0,0-.39.25.73.73,0,0,0-.14.45S.41,43,.54,44a3.63,3.63,0,0,0,1.25,2.62L6.48,50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5,0-.4.37,0,0,.69,1.89,1.31,3.16a24,24,0,0,0,1.66,2.74,1.34,1.34,0,0,0,1,.52l5,.13c.33,0,.41.38.1.48L7.51,58c-.31.1-.34.35-.07.55a14.29,14.29,0,0,0,3.05,1.66,13.09,13.09,0,0,0,5.9.5,25.13,25.13,0,0,0,4.34-1,9.55,9.55,0,0,1-.08-1.2,9.32,9.32,0,0,1,3.07-6.91"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M59.7,41.53a.73.73,0,0,0-.14-.45.68.68,0,0,0-.39-.25s-1.43-.3-2.44-.46a3.64,3.64,0,0,0-2.86.48l-4.51,3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49,0,0-2,.15-3.39.39a23.91,23.91,0,0,0-3.1.84,1.4,1.4,0,0,0-.77.78l-1.5,4.8c-.11.32-.48.3-.49,0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74,14.74,0,0,0-2.44,2.47A13.11,13.11,0,0,0,36.34,51c0,.18,0,.34-.06.52a9.26,9.26,0,0,1,3,8.1,24.1,24.1,0,0,0,4.34,1,13.09,13.09,0,0,0,5.9-.5,14.29,14.29,0,0,0,3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38,1.38,0,0,0,1-.52A24.6,24.6,0,0,0,57,52.92c.61-1.27,1.31-3.16,1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63,3.63,0,0,0,59.46,44c.13-1,.24-2.47.24-2.47"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M46.5,25.61c0-.53-.35-.72-.8-.43l-4.86,2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2,2,0,0,0,.28-1.68,36.51,36.51,0,0,0-2.19-4.89,34,34,0,0,0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28,5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54,2.54,0,0,0-.66-1.64S35,4.27,33.88,3.27,30.78.69,30.78.69a1.29,1.29,0,0,0-1.54,0s-1.88,1.49-3.12,2.59-2.48,2.35-2.48,2.35A2.5,2.5,0,0,0,23,7.27l.27,8.93c0,.53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77,35.77,0,0,0-3,4.2,35.55,35.55,0,0,0-2,4.62,2,2,0,0,0,.27,1.67l4.67,6.24c.33.42.23,1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6,18.6,0,0,0,.83,5.07,20.16,20.16,0,0,0,5.37,7.77c3.19,3,5.93,7.8,7.45,11.08A9.6,9.6,0,0,1,30,49.09a9.31,9.31,0,0,1,2.86.45c1.52-3.28,4.26-8.11,7.44-11.09a20.46,20.46,0,0,0,5.09-7,19,19,0,0,0,1.11-5.82"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M36.12,58.44A6.12,6.12,0,1,1,30,52.32a6.11,6.11,0,0,1,6.12,6.12"})]}))},m=function(){return m=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},m.apply(this,arguments)},(0,o.registerPlugin)("wp-parsely-block-editor-sidebar",{icon:v,render:function(){return(0,e.jsx)(n.PluginSidebar,m({icon:(0,e.jsx)(v,{}),name:"wp-parsely-content-helper",className:"wp-parsely-content-helper",title:"Parse.ly"},{children:(0,e.jsxs)(r.Panel,{children:[(0,e.jsx)(r.PanelHeader,{children:(0,t.__)("Parse.ly Content Helper (Beta)","wp-parsely")}),(0,e.jsx)(r.PanelBody,{children:(0,e.jsx)(b,{})})]})}))}})}();