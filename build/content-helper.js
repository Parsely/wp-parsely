!function(){"use strict";var e,t,r,n,s,a,o,i,l,c,p,u,f,d,h,y,w,m,b,v,g,j,x,_,P,O,S,C={418:function(e){var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function s(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var o,i,l=s(e),c=1;c<arguments.length;c++){for(var p in o=Object(arguments[c]))r.call(o,p)&&(l[p]=o[p]);if(t){i=t(o);for(var u=0;u<i.length;u++)n.call(o,i[u])&&(l[i[u]]=o[i[u]])}}return l}},251:function(e,t,r){r(418);var n=r(196),s=60103;if("function"==typeof Symbol&&Symbol.for){var a=Symbol.for;s=a("react.element"),a("react.fragment")}var o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,a={},c=null,p=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:p,props:a,_owner:o.current}}t.jsx=c,t.jsxs=c},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},N={};function E(e){var t=N[e];if(void 0!==t)return t.exports;var r=N[e]={exports:{}};return C[e](r,r.exports,E),r.exports}E.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return E.d(t,{a:t}),t},E.d=function(e,t){for(var r in t)E.o(t,r)&&!E.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},E.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e=E(893),t=window.wp.i18n,r=window.wp.components,n=window.wp.editPost,s=window.wp.plugins,a=window.wp.element,o=window.wp.data,i=window.wp.url,l=window.wp.apiFetch,c=E.n(l),p=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},u=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},f=function(){function e(){}return e.getRelatedTopPosts=function(){return p(this,void 0,void 0,(function(){var e,r,n,s,a,i,l,c,p,f,d;return u(this,(function(u){switch(u.label){case 0:if(e=(0,o.select)("core/editor"),r=e.getCurrentPost(),n=(0,o.select)("core").getEntityRecord("root","user",r.author),s=e.getEditedPostAttribute("categories"),a=(0,o.select)("core").getEntityRecord("taxonomy","category",s[0]),i=e.getEditedPostAttribute("tags"),l=(0,o.select)("core").getEntityRecord("taxonomy","post_tag",i[0]),null===(c=this.buildRelatedTopPostsApiQuery(n,a,l)).query)return[2,Promise.reject(c.message)];u.label=1;case 1:return u.trys.push([1,3,,4]),[4,this.fetchRelatedTopPostsFromWpEndpoint(c)];case 2:return p=u.sent(),[3,4];case 3:return f=u.sent(),[2,Promise.reject(f)];case 4:return d=(0,t.sprintf)((0,t.__)("Top-performing posts %1$s in last %2$d days.","wp-parsely"),c.message,3),0===p.length&&(d="".concat((0,t.__)("The Parse.ly API did not return any results for top-performing posts","wp-parsely")," ").concat(c.message,".")),[2,{message:d,posts:p}]}}))}))},e.fetchRelatedTopPostsFromWpEndpoint=function(e){return p(this,void 0,void 0,(function(){var t,r;return u(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,c()({path:(0,i.addQueryArgs)("/wp-parsely/v1/analytics/posts",e.query)})];case 1:return t=n.sent(),[3,3];case 2:return r=n.sent(),[2,Promise.reject(r)];case 3:return(null==t?void 0:t.error)?[2,Promise.reject(t.error)]:[2,(null==t?void 0:t.data)||[]]}}))}))},e.buildRelatedTopPostsApiQuery=function(e,r,n){return e||r||n?n?{query:{limit:5,tag:n},
/* translators: %s: message such as "with tag Foo" */
message:(0,t.sprintf)((0,t.__)('with tag "%1$s"',"wp-parsely"),n.name)}:(null==r?void 0:r.name)?{query:{limit:5,section:r.name},
/* translators: %s: message such as "from category Foo" */
message:(0,t.sprintf)((0,t.__)('from category "%1$s"',"wp-parsely"),r.name)}:{query:{limit:5,author:e.name},
/* translators: %s: message such as "by author John" */
message:(0,t.sprintf)((0,t.__)('by author "%1$s"',"wp-parsely"),e.name)}:{query:null,message:(0,t.__)("Error: Cannot perform request because the post's Author, Category and Tag are empty.","wp-parsely")}},e}(),d=function(){return d=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},d.apply(this,arguments)},h=function(){return(0,e.jsx)(r.SVG,d({"aria-hidden":"true",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 42 42"},{children:(0,e.jsx)(r.Path,{d:"M15.3,20.1c0,3.1,2.6,5.7,5.7,5.7s5.7-2.6,5.7-5.7s-2.6-5.7-5.7-5.7S15.3,17,15.3,20.1z M23.4,32.4\n\t\t\tC30.1,30.9,40.5,22,40.5,22s-7.7-12-18-13.3c-0.6-0.1-2.6-0.1-3-0.1c-10,1-18,13.7-18,13.7s8.7,8.6,17,9.9\n\t\t\tC19.4,32.6,22.4,32.6,23.4,32.4z M11.1,20.7c0-5.2,4.4-9.4,9.9-9.4s9.9,4.2,9.9,9.4S26.5,30,21,30S11.1,25.8,11.1,20.7z"})}))},y=function(){return y=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},y.apply(this,arguments)},w=function(){return(0,e.jsxs)(r.SVG,y({"aria-hidden":"true",version:"1.1",viewBox:"0 0 16 16",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)(r.Path,{d:"M0 3.29592C0 2.73237 0.456853 2.27551 1.02041 2.27551H4.08165C4.50432 2.27551 4.84696 2.61815 4.84696 3.04082C4.84696 3.46349 4.50432 3.80613 4.08165 3.80613H1.53062V11.9694H9.69391V9.6735C9.69391 9.25083 10.0366 8.90819 10.4592 8.90819C10.8819 8.90819 11.2245 9.25083 11.2245 9.6735V12.4796C11.2245 13.0432 10.7677 13.5 10.2041 13.5H1.02041C0.456854 13.5 0 13.0432 0 12.4796V3.29592Z"}),(0,e.jsx)(r.Path,{d:"M12.531 1.22415C12.8299 1.52303 12.8299 2.00759 12.531 2.30646L6.15342 8.68404C5.85455 8.98291 5.36998 8.98291 5.07111 8.68404C4.77224 8.38517 4.77224 7.9006 5.07111 7.60173L11.4487 1.22415C11.7476 0.925282 12.2321 0.925282 12.531 1.22415Z"}),(0,e.jsx)(r.Path,{d:"M6.63268 1.51012C6.63268 1.08745 6.97532 0.744812 7.39799 0.744812H12.2449C12.6676 0.744812 13.0103 1.08745 13.0103 1.51012V6.35708C13.0103 6.77975 12.6676 7.12239 12.2449 7.12239C11.8223 7.12239 11.4796 6.77975 11.4796 6.35708V2.27543H7.39799C6.97532 2.27543 6.63268 1.93279 6.63268 1.51012Z"})]}))},m=function(){return m=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},m.apply(this,arguments)},b=function(r){var n=r.post;return(0,e.jsxs)("li",m({className:"parsely-top-post","data-testid":"parsely-top-post"},{children:[(0,e.jsxs)("div",m({className:"parsely-top-post-title"},{children:[(0,e.jsx)("a",m({className:"parsely-top-post-stats-link",href:n.statsUrl,target:"_blank",rel:"noreferrer",title:(0,t.__)("View in Parse.ly (opens new tab)","wp-parsely")},{children:n.title})),(0,e.jsx)("a",m({className:"parsely-top-post-link",href:n.url,target:"_blank",rel:"noreferrer",title:(0,t.__)("View Published Post (opens new tab)","wp-parsely")},{children:(0,e.jsx)(w,{})}))]})),(0,e.jsxs)("p",m({className:"parsely-top-post-info"},{children:[(0,e.jsxs)("span",m({className:"parsely-top-post-date"},{children:[(0,e.jsx)("span",m({className:"screen-reader-text"},{children:"Date "})),n.date]})),(0,e.jsxs)("span",m({className:"parsely-top-post-author"},{children:[(0,e.jsx)("span",m({className:"screen-reader-text"},{children:"Author "})),n.author]})),(0,e.jsxs)("span",m({className:"parsely-top-post-views"},{children:[(0,e.jsx)("span",m({className:"screen-reader-text"},{children:"Number of Views "})),(0,e.jsx)(h,{}),n.views]}))]}))]}))},v={month:"short",day:"numeric",year:"numeric"},g=function(){return g=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},g.apply(this,arguments)},j=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},x=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},_=function(){var n,s,o=this,i=(0,a.useState)(!0),l=i[0],c=i[1],p=(0,a.useState)(null),u=p[0],d=p[1],h=(0,a.useState)(null),y=h[0],w=h[1],m=(0,a.useState)([]),_=m[0],P=m[1];if((0,a.useEffect)((function(){var e=function(t){return j(o,void 0,void 0,(function(){var r=this;return x(this,(function(n){return f.getRelatedTopPosts().then((function(e){var t=e.posts.map((function(e){return g(g({},e),{date:(t=new Date(e.date),r=v,Intl.DateTimeFormat(document.documentElement.lang||"en",r).format(t))});var t,r}));P(t),w(e.message),c(!1)})).catch((function(n){return j(r,void 0,void 0,(function(){return x(this,(function(r){switch(r.label){case 0:return t>0?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return r.sent(),[4,e(t-1)];case 2:return r.sent(),[3,4];case 3:c(!1),d(n),r.label=4;case 4:return[2]}}))}))})),[2]}))}))};return c(!0),e(3),function(){c(!1),P([]),w(""),d(null)}}),[]),u){if((null===(n=null==u?void 0:u.errors)||void 0===n?void 0:n.parsely_site_id_not_set)||(null===(s=null==u?void 0:u.errors)||void 0===s?void 0:s.parsely_api_secret_not_set))return(0,e.jsxs)("div",g({className:"parsely-contact-us parsely-top-posts-desc","data-testid":"parsely-contact-us"},{children:[(0,e.jsxs)("p",{children:[(0,e.jsx)("a",g({href:"https://www.parse.ly/contact",target:"_blank",rel:"noopener"},{children:(0,t.__)("Contact us","wp-parsely")+" "})),(0,t.__)("about advanced plugin features and the Parse.ly dashboard.","wp-parsely")]}),(0,e.jsxs)("p",{children:[(0,t.__)("Existing Parse.ly customers can enable this feature by setting their Site ID and API Secret in","wp-parsely")+" ",(0,e.jsx)("a",g({href:"/wp-admin/options-general.php?page=parsely",target:"_blank",rel:"noopener"},{children:(0,t.__)("wp-parsely options.","wp-parsely")}))]})]}));if(null==u?void 0:u.message)return(0,e.jsxs)("p",g({className:"parsely-top-posts-desc","data-testid":"api-error"},{children:[(0,t.__)("Error:","wp-parsely")," ",u.message]}));var O=JSON.stringify(u).match(/\[\"(.*?)\"\]/)[1];return(0,e.jsxs)("p",g({className:"parsely-top-posts-desc","data-testid":"wp-api-error"},{children:[(0,t.__)("Error:","wp-parsely")," ",O]}))}var S=(0,e.jsx)("ol",g({className:"parsely-top-posts"},{children:_.map((function(t){return(0,e.jsx)(b,{post:t},t.id)}))}));return l?(0,e.jsx)("div",g({className:"parsely-spinner-wrapper","data-testid":"parsely-spinner-wrapper"},{children:(0,e.jsx)(r.Spinner,{})})):(0,e.jsxs)("div",g({className:"parsely-top-posts-wrapper"},{children:[(0,e.jsx)("p",g({className:"parsely-top-posts-desc","data-testid":"parsely-top-posts-desc"},{children:y})),S]}))},P=function(){return P=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},P.apply(this,arguments)},O=function(){return(0,e.jsxs)(r.SVG,P({height:24,viewBox:"0 0 60 65",width:24,xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M23.72,51.53c0-.18,0-.34-.06-.52a13.11,13.11,0,0,0-2.1-5.53A14.74,14.74,0,0,0,19.12,43c-.27-.21-.5-.11-.51.22l-.24,3.42c0,.33-.38.35-.49,0l-1.5-4.8a1.4,1.4,0,0,0-.77-.78,23.91,23.91,0,0,0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34,0-.45.21-.25.49l2.06,3.76c.2.27,0,.54-.29.33l-4.51-3.6a3.68,3.68,0,0,0-2.86-.48c-1,.16-2.44.46-2.44.46a.68.68,0,0,0-.39.25.73.73,0,0,0-.14.45S.41,43,.54,44a3.63,3.63,0,0,0,1.25,2.62L6.48,50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5,0-.4.37,0,0,.69,1.89,1.31,3.16a24,24,0,0,0,1.66,2.74,1.34,1.34,0,0,0,1,.52l5,.13c.33,0,.41.38.1.48L7.51,58c-.31.1-.34.35-.07.55a14.29,14.29,0,0,0,3.05,1.66,13.09,13.09,0,0,0,5.9.5,25.13,25.13,0,0,0,4.34-1,9.55,9.55,0,0,1-.08-1.2,9.32,9.32,0,0,1,3.07-6.91"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M59.7,41.53a.73.73,0,0,0-.14-.45.68.68,0,0,0-.39-.25s-1.43-.3-2.44-.46a3.64,3.64,0,0,0-2.86.48l-4.51,3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49,0,0-2,.15-3.39.39a23.91,23.91,0,0,0-3.1.84,1.4,1.4,0,0,0-.77.78l-1.5,4.8c-.11.32-.48.3-.49,0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74,14.74,0,0,0-2.44,2.47A13.11,13.11,0,0,0,36.34,51c0,.18,0,.34-.06.52a9.26,9.26,0,0,1,3,8.1,24.1,24.1,0,0,0,4.34,1,13.09,13.09,0,0,0,5.9-.5,14.29,14.29,0,0,0,3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38,1.38,0,0,0,1-.52A24.6,24.6,0,0,0,57,52.92c.61-1.27,1.31-3.16,1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63,3.63,0,0,0,59.46,44c.13-1,.24-2.47.24-2.47"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M46.5,25.61c0-.53-.35-.72-.8-.43l-4.86,2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2,2,0,0,0,.28-1.68,36.51,36.51,0,0,0-2.19-4.89,34,34,0,0,0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28,5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54,2.54,0,0,0-.66-1.64S35,4.27,33.88,3.27,30.78.69,30.78.69a1.29,1.29,0,0,0-1.54,0s-1.88,1.49-3.12,2.59-2.48,2.35-2.48,2.35A2.5,2.5,0,0,0,23,7.27l.27,8.93c0,.53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77,35.77,0,0,0-3,4.2,35.55,35.55,0,0,0-2,4.62,2,2,0,0,0,.27,1.67l4.67,6.24c.33.42.23,1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6,18.6,0,0,0,.83,5.07,20.16,20.16,0,0,0,5.37,7.77c3.19,3,5.93,7.8,7.45,11.08A9.6,9.6,0,0,1,30,49.09a9.31,9.31,0,0,1,2.86.45c1.52-3.28,4.26-8.11,7.44-11.09a20.46,20.46,0,0,0,5.09-7,19,19,0,0,0,1.11-5.82"}),(0,e.jsx)(r.Path,{fill:"#5ba745",d:"M36.12,58.44A6.12,6.12,0,1,1,30,52.32a6.11,6.11,0,0,1,6.12,6.12"})]}))},S=function(){return S=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},S.apply(this,arguments)},(0,s.registerPlugin)("wp-parsely-block-editor-sidebar",{icon:O,render:function(){return(0,e.jsx)(n.PluginSidebar,S({icon:(0,e.jsx)(O,{}),name:"wp-parsely-content-helper",className:"wp-parsely-content-helper",title:(0,t.__)("Parse.ly Content Helper","wp-parsely")},{children:(0,e.jsx)(r.Panel,{children:(0,e.jsx)(r.PanelBody,S({title:(0,t.__)("Related top-performing posts","wp-parsely"),initialOpen:!1},{children:(0,e.jsx)(_,{})}))})}))}})}();