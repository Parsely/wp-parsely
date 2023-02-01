!function(){"use strict";var e={251:function(e,t,r){var n=r(196),s=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,a={},c=null,p=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)o.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:p,props:a,_owner:i.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e,t,n=r(893),s=window.wp.element,a=window.wp.i18n,o=window.wp.components,i=window.wp.url,l=window.wp.apiFetch,c=r.n(l),p=(e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function __(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}),u=function(){return u=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},u.apply(this,arguments)};!function(e){e.CannotFormulateApiQuery="ch_cannot_formulate_api_query",e.FetchError="fetch_error",e[e.ParselyApiForbidden=403]="ParselyApiForbidden",e.ParselyApiResponseContainsError="ch_response_contains_error",e.ParselyApiReturnedNoData="ch_parsely_api_returned_no_data",e.ParselyApiReturnedTooManyResults="ch_parsely_api_returned_too_many_results",e.PluginSettingsApiSecretNotSet="parsely_api_secret_not_set",e.PluginSettingsSiteIdNotSet="parsely_site_id_not_set",e.PostIsNotPublished="ch_post_not_published"}(t||(t={}));var d=function(e){function r(t,n,s){void 0===s&&(s=(0,a.__)("Error: ","wp-parsely"));var o=e.call(this,s+t)||this;return o.hint=null,o.name=o.constructor.name,o.code=n,Object.setPrototypeOf(o,r.prototype),o}return p(r,e),r.prototype.ProcessedMessage=function(e){return void 0===e&&(e=""),[t.PluginSettingsSiteIdNotSet,t.PluginSettingsApiSecretNotSet].includes(this.code)?this.ContactUsMessage():(this.code===t.FetchError&&(this.hint=this.Hint((0,a.__)("This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.","wp-parsely"))),this.code===t.ParselyApiForbidden&&(this.hint=this.Hint((0,a.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.","wp-parsely"))),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",u({className:e,"data-testid":"error"},{children:this.message})),this.hint]}))},r.prototype.ContactUsMessage=function(){return(0,n.jsxs)("div",u({className:"parsely-contact-us parsely-top-posts-descr","data-testid":"parsely-contact-us"},{children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("a",u({href:"https://www.parse.ly/contact",target:"_blank",rel:"noopener"},{children:(0,a.__)("Contact us","wp-parsely")+" "})),(0,a.__)("about advanced plugin features and the Parse.ly dashboard.","wp-parsely")]}),(0,n.jsxs)("p",{children:[(0,a.__)("Existing Parse.ly customers can enable this feature by setting their Site ID and API Secret in","wp-parsely")+" ",(0,n.jsx)("a",u({href:"/wp-admin/options-general.php?page=parsely",target:"_blank",rel:"noopener"},{children:(0,a.__)("wp-parsely options.","wp-parsely")}))]})]}))},r.prototype.Hint=function(e){return(0,n.jsxs)("p",u({className:"parsely-error-hint","data-testid":"parsely-error-hint"},{children:[(0,n.jsx)("strong",{children:(0,a.__)("Hint:","wp-parsely")})," ",e]}))},r}(Error),h={month:"short",day:"numeric",year:"numeric"},f={month:"short",day:"numeric"};function y(e){return e.toISOString().substring(0,10)}var w=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},v=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},_=function(){function e(){var e,t;this.dataPeriodEnd=y(new Date)+"T23:59",this.dataPeriodStart=(e=this.dataPeriodEnd,6,(t=new Date(e)).setDate(t.getDate()-6),y(t)+"T00:00")}return e.prototype.getTopPosts=function(){return w(this,void 0,void 0,(function(){var e,r;return v(this,(function(n){switch(n.label){case 0:e=[],n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.fetchTopPostsFromWpEndpoint()];case 2:return e=n.sent(),[3,4];case 3:return r=n.sent(),[2,Promise.reject(r)];case 4:return 0===e.length?[2,Promise.reject(new d((0,a.__)("No Top Posts data is available.","wp-parsely"),t.ParselyApiReturnedNoData,""))]:[2,e]}}))}))},e.prototype.fetchTopPostsFromWpEndpoint=function(){return w(this,void 0,void 0,(function(){var e,r;return v(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,c()({path:(0,i.addQueryArgs)("/wp-parsely/v1/stats/posts",{limit:3,period_start:this.dataPeriodStart,period_end:this.dataPeriodEnd})})];case 1:return e=n.sent(),[3,3];case 2:return r=n.sent(),[2,Promise.reject(new d(r.message,r.code))];case 3:return(null==e?void 0:e.error)?[2,Promise.reject(new d(e.error.message,t.ParselyApiResponseContainsError))]:[2,(null==e?void 0:e.data)||[]]}}))}))},e}();function m(e,t,r){void 0===t&&(t=1),void 0===r&&(r="");var n=parseInt(e.replace(/\D/g,""),10);if(n<1e3)return e;n<1e4&&(t=1);var s=n,a=n.toString(),o="",i=0;return Object.entries({1e3:"k","1,000,000":"M","1,000,000,000":"B","1,000,000,000,000":"T","1,000,000,000,000,000":"Q"}).forEach((function(e){var r=e[0],l=e[1],c=parseInt(r.replace(/\D/g,""),10);if(n>=c){var p=t;(s=n/c)%1>1/i&&(p=s>10?1:2),p=parseFloat(s.toFixed(2))===parseFloat(s.toFixed(0))?0:p,a=s.toFixed(p),o=l}i=c})),a+r+o}var b=function(){return b=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},b.apply(this,arguments)},x=function(){return(0,n.jsxs)(o.SVG,b({"aria-hidden":"true",version:"1.1",viewBox:"0 0 16 16",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg"},{children:[(0,n.jsx)(o.Path,{d:"M0 3.29592C0 2.73237 0.456853 2.27551 1.02041 2.27551H4.08165C4.50432 2.27551 4.84696 2.61815 4.84696 3.04082C4.84696 3.46349 4.50432 3.80613 4.08165 3.80613H1.53062V11.9694H9.69391V9.6735C9.69391 9.25083 10.0366 8.90819 10.4592 8.90819C10.8819 8.90819 11.2245 9.25083 11.2245 9.6735V12.4796C11.2245 13.0432 10.7677 13.5 10.2041 13.5H1.02041C0.456854 13.5 0 13.0432 0 12.4796V3.29592Z"}),(0,n.jsx)(o.Path,{d:"M12.531 1.22415C12.8299 1.52303 12.8299 2.00759 12.531 2.30646L6.15342 8.68404C5.85455 8.98291 5.36998 8.98291 5.07111 8.68404C4.77224 8.38517 4.77224 7.9006 5.07111 7.60173L11.4487 1.22415C11.7476 0.925282 12.2321 0.925282 12.531 1.22415Z"}),(0,n.jsx)(o.Path,{d:"M6.63268 1.51012C6.63268 1.08745 6.97532 0.744812 7.39799 0.744812H12.2449C12.6676 0.744812 13.0103 1.08745 13.0103 1.51012V6.35708C13.0103 6.77975 12.6676 7.12239 12.2449 7.12239C11.8223 7.12239 11.4796 6.77975 11.4796 6.35708V2.27543H7.39799C6.97532 2.27543 6.63268 1.93279 6.63268 1.51012Z"})]}))},g=function(){return g=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},g.apply(this,arguments)},j=function(){return(0,n.jsx)(o.SVG,g({"aria-hidden":"true",version:"1.1",viewBox:"0 0 15 15",width:"15",height:"15",xmlns:"http://www.w3.org/2000/svg"},{children:(0,n.jsx)(o.Path,{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0 14.0025V11.0025L7.5 3.5025L10.5 6.5025L3 14.0025H0ZM12 5.0025L13.56 3.4425C14.15 2.8525 14.15 1.9025 13.56 1.3225L12.68 0.4425C12.09 -0.1475 11.14 -0.1475 10.56 0.4425L9 2.0025L12 5.0025Z"})}))},P=function(){return P=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},P.apply(this,arguments)};function N(e){var t=e.post;return t.thumbUrlMedium?(0,n.jsxs)("div",P({className:"parsely-top-post-thumbnail"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Thumbnail","wp-parsely")})),(0,n.jsx)("img",{src:t.thumbUrlMedium,alt:(0,a.__)("Post thumbnail","wp-parsely")})]})):(0,n.jsx)("div",P({className:"parsely-top-post-thumbnail"},{children:(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Post thumbnail not available","wp-parsely")}))}))}function S(e){var t=e.post;return(0,n.jsxs)("a",P({className:"parsely-top-post-title",href:t.dashUrl,target:"_blank",rel:"noreferrer"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("View in Parse.ly (opens in new tab)","wp-parsely")})),t.title]}))}var O=function(e){var t,r,s,o=e.post;return(0,n.jsx)("li",P({className:"parsely-top-post"},{children:(0,n.jsxs)("div",P({className:"parsely-top-post-content"},{children:[N({post:o}),(0,n.jsxs)("div",P({className:"parsely-top-post-data"},{children:[(0,n.jsxs)("span",P({className:"parsely-top-post-views"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Number of Views","wp-parsely")})),m(o.views.toString())]})),S({post:o}),(0,n.jsxs)("a",P({className:"parsely-top-post-icon-link",href:o.url,target:"_blank",rel:"noreferrer"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("View Post (opens in new tab)","wp-parsely")})),(0,n.jsx)(x,{})]})),0!==o.postId&&(0,n.jsxs)("a",P({className:"parsely-top-post-icon-link",href:(s=o.postId,"/wp-admin/post.php?post=".concat(s,"&action=edit")),target:"_blank",rel:"noreferrer"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Edit Post (opens in new tab)","wp-parsely")})),(0,n.jsx)(j,{})]})),(0,n.jsxs)("div",P({className:"parsely-top-post-metadata"},{children:[(0,n.jsxs)("span",P({className:"parsely-top-post-date"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Date","wp-parsely")})),(t=new Date(o.date),r=h,t.getUTCFullYear()===(new Date).getUTCFullYear()&&(r=f),Intl.DateTimeFormat(document.documentElement.lang||"en",r).format(t))]})),(0,n.jsxs)("span",P({className:"parsely-top-post-author"},{children:[(0,n.jsx)("span",P({className:"screen-reader-text"},{children:(0,a.__)("Author","wp-parsely")})),o.author]}))]}))]}))]}))}))},C=function(){return C=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},C.apply(this,arguments)},E=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},k=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},T=function(){var e=this,t=(0,s.useState)(!0),r=t[0],i=t[1],l=(0,s.useState)(),c=l[0],p=l[1],u=(0,s.useState)([]),d=u[0],f=u[1],y=new _;if((0,s.useEffect)((function(){var t=function(r){return E(e,void 0,void 0,(function(){var e=this;return k(this,(function(n){return y.getTopPosts().then((function(e){var t=e.map((function(e){return C(C({},e),{date:(t=new Date(e.date),r=h,Intl.DateTimeFormat(document.documentElement.lang||"en",r).format(t))});var t,r}));f(t),i(!1)})).catch((function(n){return E(e,void 0,void 0,(function(){return k(this,(function(e){switch(e.label){case 0:return r>0?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return e.sent(),[4,t(r-1)];case 2:return e.sent(),[3,4];case 3:i(!1),p(n),e.label=4;case 4:return[2]}}))}))})),[2]}))}))};return i(!0),t(3),function(){i(!1),f([]),p(void 0)}}),[]),c)return c.ProcessedMessage("parsely-top-posts-descr");var w=(0,n.jsx)("ol",C({className:"parsely-top-posts"},{children:d.map((function(e){return(0,n.jsx)(O,{post:e},e.id)}))}));return r?(0,n.jsx)("div",C({className:"parsely-spinner-wrapper"},{children:(0,n.jsx)(o.Spinner,{})})):(0,n.jsxs)("div",C({className:"parsely-top-posts-wrapper"},{children:[(0,n.jsx)("div",C({className:"page-views-title"},{children:(0,a.__)("Page Views","wp-parsely")})),w]}))};window.addEventListener("load",(function(){(0,s.render)((0,n.jsx)(T,{}),document.querySelector("#wp-parsely-dashboard-widget > .inside"))}),!1)}()}();