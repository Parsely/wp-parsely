!function(){"use strict";var e={251:function(e,t,r){var n=r(196),s=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,a={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)o.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:u,props:a,_owner:i.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e,t,n,s=r(893),a=window.wp.element,o=function(e){void 0===e&&(e=null);var t="";(null==e?void 0:e.children)&&(t=e.children);var r="content-helper-error-message";return(null==e?void 0:e.className)&&(r+=" "+e.className),(0,s.jsx)("div",{className:r,"data-testid":null==e?void 0:e.testId,dangerouslySetInnerHTML:{__html:t}})},i=function(e){return void 0===e&&(e=null),(0,s.jsx)(o,{className:null==e?void 0:e.className,testId:"empty-credentials-message",children:window.wpParselyEmptyCredentialsMessage})},l=function(){return l=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},l.apply(this,arguments)},c=function(e,t){var r=e.children;return void 0===t&&(t=null),window.wpParselyEmptyCredentialsMessage?(0,s.jsx)(i,l({},t)):(0,s.jsx)(s.Fragment,{children:r})},u=window.wp.components,p=function(e){var t=e.defaultValue,r=e.items,n=e.onChange;return(0,s.jsx)("select",{onChange:n,value:t,children:r.map((function(e){return(0,s.jsx)("option",{value:e[0],children:e[1]},e[0])}))})},d=window.wp.i18n;!function(e){e.Minutes10="10m",e.Hour="1h",e.Hours2="2h",e.Hours4="4h",e.Hours24="24h",e.Days7="7d",e.Days30="30d"}(e||(e={})),function(e){e.Views="views",e.AvgEngaged="avg_engaged"}(t||(t={})),function(e){e.Author="author",e.Section="section",e.Tag="tag"}(n||(n={}));var h=function(e,t){return Object.values(t).includes(e)};function f(e,t){void 0===t&&(t=!1);var r=parseInt(e,10),n=e.charAt(e.length-1),s=(0,d.__)("Unknown Period","wp-parsely");switch(n){case"m":s=(0,d.sprintf)(/* translators: 1: Number of minutes */(0,d._n)("Last Minute","Last %1$d Minutes",r,"wp-parsely"),r);break;case"h":s=(0,d.sprintf)(/* translators: 1: Number of hours */(0,d._n)("Last Hour","Last %1$d Hours",r,"wp-parsely"),r);break;case"d":s=(0,d.sprintf)(/* translators: 1: Number of days */(0,d._n)("Last Day","Last %1$d Days",r,"wp-parsely"),r)}return t?s.toLocaleLowerCase():s}function y(e){switch(e){case t.Views:return(0,d.__)("Page Views","wp-parsely");case t.AvgEngaged:return(0,d.__)("Avg. Time","wp-parsely");default:return(0,d.__)("Unknown Metric","wp-parsely")}}var w,v,m=window.wp.apiFetch,_=r.n(m),g=window.wp.url,x=(w=function(e,t){return w=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},w(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}w(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)});!function(e){e.CannotFormulateApiQuery="ch_cannot_formulate_api_query",e.FetchError="fetch_error",e.HttpRequestFailed="http_request_failed",e[e.ParselyApiForbidden=403]="ParselyApiForbidden",e.ParselyApiResponseContainsError="ch_response_contains_error",e.ParselyApiReturnedNoData="ch_parsely_api_returned_no_data",e.ParselyApiReturnedTooManyResults="ch_parsely_api_returned_too_many_results",e.PluginCredentialsNotSetMessageDetected="parsely_credentials_not_set_message_detected",e.PluginSettingsApiSecretNotSet="parsely_api_secret_not_set",e.PluginSettingsSiteIdNotSet="parsely_site_id_not_set",e.PostIsNotPublished="ch_post_not_published"}(v||(v={}));var b=function(e){function t(r,n,s){void 0===s&&(s=(0,d.__)("Error: ","wp-parsely"));var a=e.call(this,s+r)||this;a.hint=null,a.name=a.constructor.name,a.code=n;var o=[v.ParselyApiForbidden,v.ParselyApiResponseContainsError,v.ParselyApiReturnedNoData,v.ParselyApiReturnedTooManyResults,v.PluginCredentialsNotSetMessageDetected,v.PluginSettingsApiSecretNotSet,v.PluginSettingsSiteIdNotSet,v.PostIsNotPublished];return a.retryFetch=!o.includes(a.code),Object.setPrototypeOf(a,t.prototype),a}return x(t,e),t.prototype.Message=function(e){return void 0===e&&(e=null),[v.PluginCredentialsNotSetMessageDetected,v.PluginSettingsSiteIdNotSet,v.PluginSettingsApiSecretNotSet].includes(this.code)?i(e):(this.code===v.FetchError&&(this.hint=this.Hint((0,d.__)("This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.","wp-parsely"))),this.code===v.ParselyApiForbidden&&(this.hint=this.Hint((0,d.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.","wp-parsely"))),this.code===v.HttpRequestFailed&&(this.hint=this.Hint((0,d.__)("The Parse.ly API cannot be reached. Please verify that you are online.","wp-parsely"))),(0,s.jsx)(o,{className:null==e?void 0:e.className,testId:"error",children:"<p>".concat(this.message,"</p>").concat(this.hint?this.hint:"")}))},t.prototype.Hint=function(e){return'<p className="content-helper-error-message-hint" data-testid="content-helper-error-message-hint"><strong>'.concat((0,d.__)("Hint:","wp-parsely"),"</strong> ").concat(e,"</p>")},t}(Error),j={month:"short",day:"numeric",year:"numeric"},P={month:"short",day:"numeric"},N=(0,d.__)("Date N/A","wp-parsely");function S(e){if(!1===function(e){return!isNaN(+e)&&0!==e.getTime()}(e))return N;var t=j;return e.getUTCFullYear()===(new Date).getUTCFullYear()&&(t=P),Intl.DateTimeFormat(document.documentElement.lang||"en",t).format(e)}function C(e){return{period_start:e,period_end:""}}var A=function(){return A=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},A.apply(this,arguments)},E=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},O=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},T=function(){function e(){}return e.prototype.getTopPosts=function(e,t){return E(this,void 0,void 0,(function(){var r,n;return O(this,(function(s){switch(s.label){case 0:r=[],s.label=1;case 1:return s.trys.push([1,3,,4]),[4,this.fetchTopPostsFromWpEndpoint(e,t)];case 2:return r=s.sent(),[3,4];case 3:return n=s.sent(),[2,Promise.reject(n)];case 4:return 0===r.length?[2,Promise.reject(new b((0,d.__)("No Top Posts data is available.","wp-parsely"),v.ParselyApiReturnedNoData,""))]:[2,r]}}))}))},e.prototype.fetchTopPostsFromWpEndpoint=function(e,t){var r;return E(this,void 0,void 0,(function(){var n,s;return O(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,_()({path:(0,g.addQueryArgs)("/wp-parsely/v1/stats/posts/",A(A({limit:3},C(e)),{sort:t,itm_source:"wp-parsely-content-helper"}))})];case 1:return n=a.sent(),[3,3];case 2:return s=a.sent(),[2,Promise.reject(new b(s.message,s.code))];case 3:return(null==n?void 0:n.error)?[2,Promise.reject(new b(n.error.message,v.ParselyApiResponseContainsError))]:[2,null!==(r=null==n?void 0:n.data)&&void 0!==r?r:[]]}}))}))},e}(),F=function(){return(0,s.jsx)(u.SVG,{"aria-hidden":"true",version:"1.1",viewBox:"0 0 15 15",width:"15",height:"15",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)(u.Path,{d:"M0 14.0025V11.0025L7.5 3.5025L10.5 6.5025L3 14.0025H0ZM12 5.0025L13.56 3.4425C14.15 2.8525 14.15 1.9025 13.56 1.3225L12.68 0.4425C12.09 -0.1475 11.14 -0.1475 10.56 0.4425L9 2.0025L12 5.0025Z"})})},k=function(){return(0,s.jsxs)(u.SVG,{"aria-hidden":"true",version:"1.1",viewBox:"0 0 16 16",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)(u.Path,{d:"M0 3.29592C0 2.73237 0.456853 2.27551 1.02041 2.27551H4.08165C4.50432 2.27551 4.84696 2.61815 4.84696 3.04082C4.84696 3.46349 4.50432 3.80613 4.08165 3.80613H1.53062V11.9694H9.69391V9.6735C9.69391 9.25083 10.0366 8.90819 10.4592 8.90819C10.8819 8.90819 11.2245 9.25083 11.2245 9.6735V12.4796C11.2245 13.0432 10.7677 13.5 10.2041 13.5H1.02041C0.456854 13.5 0 13.0432 0 12.4796V3.29592Z"}),(0,s.jsx)(u.Path,{d:"M12.531 1.22415C12.8299 1.52303 12.8299 2.00759 12.531 2.30646L6.15342 8.68404C5.85455 8.98291 5.36998 8.98291 5.07111 8.68404C4.77224 8.38517 4.77224 7.9006 5.07111 7.60173L11.4487 1.22415C11.7476 0.925282 12.2321 0.925282 12.531 1.22415Z"}),(0,s.jsx)(u.Path,{d:"M6.63268 1.51012C6.63268 1.08745 6.97532 0.744812 7.39799 0.744812H12.2449C12.6676 0.744812 13.0103 1.08745 13.0103 1.51012V6.35708C13.0103 6.77975 12.6676 7.12239 12.2449 7.12239C11.8223 7.12239 11.4796 6.77975 11.4796 6.35708V2.27543H7.39799C6.97532 2.27543 6.63268 1.93279 6.63268 1.51012Z"})]})};function I(e,t,r){void 0===t&&(t=1),void 0===r&&(r="");var n=parseInt(e.replace(/\D/g,""),10);if(n<1e3)return e;n<1e4&&(t=1);var s=n,a=n.toString(),o="",i=0;return Object.entries({1e3:"k","1,000,000":"M","1,000,000,000":"B","1,000,000,000,000":"T","1,000,000,000,000,000":"Q"}).forEach((function(e){var r=e[0],l=e[1],c=parseInt(r.replace(/\D/g,""),10);if(n>=c){var u=t;(s=n/c)%1>1/i&&(u=s>10?1:2),u=parseFloat(s.toFixed(2))===parseFloat(s.toFixed(0))?0:u,a=s.toFixed(u),o=l}i=c})),a+r+o}function L(e){var t=e.metric,r=e.post,n=e.avgEngagedIcon,a=e.viewsIcon;return"views"===t?(0,s.jsxs)("span",{className:"parsely-top-post-metric-data",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Number of Views","wp-parsely")}),a,I(r.views.toString())]}):"avg_engaged"===t?(0,s.jsxs)("span",{className:"parsely-top-post-metric-data",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Average Time","wp-parsely")}),n,r.avgEngaged]}):(0,s.jsx)("span",{className:"parsely-top-post-metric-data",children:(0,d.__)("-","wp-parsely")})}function D(e){var t,r=e.metric,n=e.post;return(0,s.jsx)("li",{className:"parsely-top-post",children:(0,s.jsxs)("div",{className:"parsely-top-post-content",children:[(0,s.jsx)(H,{post:n}),(0,s.jsxs)("div",{className:"parsely-top-post-data",children:[(0,s.jsx)(L,{metric:r,post:n}),(0,s.jsx)(M,{post:n}),(0,s.jsxs)("a",{className:"parsely-top-post-icon-link",href:n.url,target:"_blank",rel:"noreferrer",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("View Post (opens in new tab)","wp-parsely")}),(0,s.jsx)(k,{})]}),0!==n.postId&&(0,s.jsxs)("a",{className:"parsely-top-post-icon-link",href:(t=n.postId,"/wp-admin/post.php?post=".concat(t,"&action=edit")),target:"_blank",rel:"noreferrer",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Edit Post (opens in new tab)","wp-parsely")}),(0,s.jsx)(F,{})]}),(0,s.jsxs)("div",{className:"parsely-top-post-metadata",children:[(0,s.jsxs)("span",{className:"parsely-top-post-date",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Date","wp-parsely")}),S(new Date(n.date))]}),(0,s.jsxs)("span",{className:"parsely-top-post-author",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Author","wp-parsely")}),n.author]})]})]})]})},n.id)}function H(e){var t=e.post;return t.thumbnailUrl?(0,s.jsxs)("div",{className:"parsely-top-post-thumbnail",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Thumbnail","wp-parsely")}),(0,s.jsx)("img",{src:t.thumbnailUrl,alt:(0,d.__)("Post thumbnail","wp-parsely")})]}):(0,s.jsx)("div",{className:"parsely-top-post-thumbnail",children:(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("Post thumbnail not available","wp-parsely")})})}function M(e){var t=e.post;return(0,s.jsxs)("a",{className:"parsely-top-post-title",href:t.dashUrl,target:"_blank",rel:"noreferrer",children:[(0,s.jsx)("span",{className:"screen-reader-text",children:(0,d.__)("View in Parse.ly (opens in new tab)","wp-parsely")}),t.title]})}var V=function(e,t,r,n){return new(r||(r=Promise))((function(s,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))},R=function(e,t){var r,n,s,a,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};function U(){var r=this,n=(0,a.useState)(!0),o=n[0],i=n[1],l=(0,a.useState)(),c=l[0],d=l[1],w=(0,a.useState)([]),v=w[0],m=w[1],_=(0,a.useState)(e.Days7),g=_[0],x=_[1],b=(0,a.useState)(t.Views),j=b[0],P=b[1];if((0,a.useEffect)((function(){var e=new T,t=function(n){return V(r,void 0,void 0,(function(){var r=this;return R(this,(function(s){return e.getTopPosts(g,j).then((function(e){m(e),i(!1)})).catch((function(e){return V(r,void 0,void 0,(function(){return R(this,(function(r){switch(r.label){case 0:return n>0&&e.retryFetch?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return r.sent(),[4,t(n-1)];case 2:return r.sent(),[3,4];case 3:i(!1),d(e),r.label=4;case 4:return[2]}}))}))})),[2]}))}))};return i(!0),t(1),function(){i(!1),m([]),d(void 0)}}),[g,j]),c)return c.Message({className:"parsely-top-posts-descr"});var N=(0,s.jsx)("div",{className:"parsely-spinner-wrapper",children:(0,s.jsx)(u.Spinner,{})});return(0,s.jsxs)("div",{className:"parsely-top-posts-wrapper",children:[(0,s.jsxs)("div",{className:"parsely-top-posts-filters",children:[(0,s.jsx)(p,{defaultValue:g,items:Object.values(e).map((function(e){return[e,f(e)]})),onChange:function(t){h(t.target.value,e)&&x(t.target.value)}}),(0,s.jsx)(p,{defaultValue:j,items:Object.values(t).map((function(e){return[e,y(e)]})),onChange:function(e){h(e.target.value,t)&&P(e.target.value)}})]}),o?N:(0,s.jsx)("ol",{className:"parsely-top-posts",children:v.map((function(e){return(0,s.jsx)(D,{metric:j,post:e},e.id)}))})]})}window.addEventListener("load",(function(){(0,a.render)((0,s.jsx)(c,{children:(0,s.jsx)(U,{})}),document.querySelector("#wp-parsely-dashboard-widget > .inside"))}),!1)}()}();