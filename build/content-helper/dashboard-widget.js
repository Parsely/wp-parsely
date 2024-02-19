!function(){"use strict";var e={251:function(e,t,r){var n=r(196),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,s={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:a,type:e,key:c,ref:u,props:s,_owner:o.current}}t.Fragment=s,t.jsx=c,t.jsxs=c},893:function(e,t,r){e.exports=r(251)},196:function(e){e.exports=window.React}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e,t,n,a=r(893),s=window.wp.element,i=function(e){void 0===e&&(e=null);var t="";(null==e?void 0:e.children)&&(t=e.children);var r="content-helper-error-message";return(null==e?void 0:e.className)&&(r+=" "+e.className),(0,a.jsx)("div",{className:r,"data-testid":null==e?void 0:e.testId,dangerouslySetInnerHTML:{__html:t}})},o=function(e){return void 0===e&&(e=null),(0,a.jsx)(i,{className:null==e?void 0:e.className,testId:"empty-credentials-message",children:window.wpParselyEmptyCredentialsMessage})},l=function(){return l=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},l.apply(this,arguments)},c=function(e,t){var r=e.children;return void 0===t&&(t=null),window.wpParselyEmptyCredentialsMessage?(0,a.jsx)(o,l({},t)):(0,a.jsx)(a.Fragment,{children:r})},u=window.wp.components,p=window.wp.i18n,d=function(){function e(){this._tkq=[],this.isLoaded=!1,this.isEnabled=!1,"undefined"!=typeof wpParselyTracksTelemetry&&(this.isEnabled=!0,this.loadTrackingLibrary())}return e.getInstance=function(){return window.wpParselyTelemetryInstance||Object.defineProperty(window,"wpParselyTelemetryInstance",{value:new e,writable:!1,configurable:!1,enumerable:!1}),window.wpParselyTelemetryInstance},e.prototype.loadTrackingLibrary=function(){var e=this,t=document.createElement("script");t.async=!0,t.src="//stats.wp.com/w.js",t.onload=function(){e.isLoaded=!0,e._tkq=window._tkq||[]},document.head.appendChild(t)},e.trackEvent=function(t,r){return void 0===r&&(r={}),n=this,a=void 0,i=function(){var n;return function(e,t){var r,n,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(i=0)),i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}(this,(function(a){switch(a.label){case 0:return(n=e.getInstance()).isTelemetryEnabled()?[4,e.waitUntilLoaded()]:[2];case 1:return a.sent(),n.trackEvent(t,r),[2]}}))},new((s=void 0)||(s=Promise))((function(e,t){function r(e){try{l(i.next(e))}catch(e){t(e)}}function o(e){try{l(i.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(e){e(n)}))).then(r,o)}l((i=i.apply(n,a||[])).next())}));var n,a,s,i},e.waitUntilLoaded=function(){return new Promise((function(t,r){var n=e.getInstance();if(n.isTelemetryEnabled())if(n.isLoaded)t();else var a=0,s=setInterval((function(){n.isLoaded&&(clearInterval(s),t()),(a+=100)>=1e4&&(clearInterval(s),r("Telemetry library not loaded"))}),100);else r("Telemetry not enabled")}))},e.prototype.trackEvent=function(t,r){var n;this.isLoaded?(0!==t.indexOf(e.TRACKS_PREFIX)&&(t=e.TRACKS_PREFIX+t),this.isEventNameValid(t)?(r=this.prepareProperties(r),null===(n=this._tkq)||void 0===n||n.push(["recordEvent",t,r])):console.error("Error tracking event: Invalid event name")):console.error("Error tracking event: Telemetry not loaded")},e.prototype.isTelemetryEnabled=function(){return this.isEnabled},e.prototype.isProprietyValid=function(t){return e.PROPERTY_REGEX.test(t)},e.prototype.isEventNameValid=function(t){return e.EVENT_NAME_REGEX.test(t)},e.prototype.prepareProperties=function(e){return(e=this.sanitizeProperties(e)).parsely_version=wpParselyTracksTelemetry.version,wpParselyTracksTelemetry.user&&(e._ut=wpParselyTracksTelemetry.user.type,e._ui=wpParselyTracksTelemetry.user.id),wpParselyTracksTelemetry.vipgo_env&&(e.vipgo_env=wpParselyTracksTelemetry.vipgo_env),this.sanitizeProperties(e)},e.prototype.sanitizeProperties=function(e){var t=this,r={};return Object.keys(e).forEach((function(n){t.isProprietyValid(n)&&(r[n]=e[n])})),r},e.TRACKS_PREFIX="wpparsely_",e.EVENT_NAME_REGEX=/^(([a-z0-9]+)_){2}([a-z0-9_]+)$/,e.PROPERTY_REGEX=/^[a-z_][a-z0-9_]*$/,e}(),f=(d.trackEvent,function(e){var t=e.defaultValue,r=e.items,n=e.onChange;return(0,a.jsx)("select",{onChange:n,value:t,children:r.map((function(e){return(0,a.jsx)("option",{value:e[0],children:e[1]},e[0])}))})}),h=window.wp.data,y=function(){return y=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},y.apply(this,arguments)},v={},w="wp-parsely/settings",g=(0,h.createReduxStore)(w,{initialState:v,reducer:function(e,t){var r,n;switch(void 0===e&&(e=v),t.type){case"SET_SETTINGS":return y(y({},e),((r={})[t.endpoint]=t.settings,r));case"SET_PARTIAL_SETTINGS":var a=e[t.endpoint]||{},s=y(y({},a),t.partialSettings);return y(y({},e),((n={})[t.endpoint]=s,n));default:return e}},actions:{setSettings:function(e,t){return{type:"SET_SETTINGS",endpoint:e,settings:t}},setPartialSettings:function(e,t){return{type:"SET_PARTIAL_SETTINGS",endpoint:e,partialSettings:t}}},selectors:{getSettings:function(e,t){return e[t]}}}),m=window.wp.apiFetch,_=r.n(m),P=function(){return P=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},P.apply(this,arguments)},b=(0,s.createContext)({settings:{},setSettings:function(){console.error("WP Parse.ly: setSettings not implemented")}}),x=function(e){var t=e.children,r=e.endpoint,n=e.defaultSettings,i=(0,h.useSelect)((function(e){var t=e(g).getSettings(r);return t||(t=n,(0,h.dispatch)(g).setSettings(r,n).then((function(){}))),{storedSettings:t}}),[n,r]).storedSettings,o=(0,s.useState)(i),l=o[0],c=o[1],u=(0,h.dispatch)(g).setPartialSettings,p=(0,s.useCallback)((function(e){c((function(t){return P(P({},t),e)})),u(r,e)}),[r,u]);!function(e,t,r){var n=(0,s.useRef)(!0);(0,s.useEffect)((function(){n.current?n.current=!1:_()({path:"/wp-parsely/v1/user-meta/content-helper/"+e,method:"PUT",data:t})}),r)}(r,i,[l]);var d=(0,s.useMemo)((function(){return{settings:i,setSettings:p}}),[i,p]);return(0,a.jsx)(b.Provider,{value:d,children:t})};void 0!==(0,h.select)(w)||(0,h.register)(g),function(e){e.Minutes10="10m",e.Hour="1h",e.Hours2="2h",e.Hours4="4h",e.Hours24="24h",e.Days7="7d",e.Days30="30d"}(e||(e={})),function(e){e.Views="views",e.AvgEngaged="avg_engaged"}(t||(t={})),function(e){e.Author="author",e.Section="section",e.Tag="tag",e.Unavailable="unavailable"}(n||(n={}));var S=function(e,t){return Object.values(t).includes(e)};function j(e,t){void 0===t&&(t=!1);var r=parseInt(e,10),n=e.charAt(e.length-1),a=(0,p.__)("Unknown Period","wp-parsely");switch(n){case"m":if(1===r){a=(0,p.__)("Last Minute","wp-parsely");break}a=(0,p.sprintf)(/* translators: 1: Number of minutes */(0,p._n)("Last %1$d Minute","Last %1$d Minutes",r,"wp-parsely"),r);break;case"h":if(1===r){a=(0,p.__)("Last Hour","wp-parsely");break}a=(0,p.sprintf)(/* translators: 1: Number of hours */(0,p._n)("Last %1$d Hour","Last %1$d Hours",r,"wp-parsely"),r);break;case"d":if(1===r){a=(0,p.__)("Last Day","wp-parsely");break}a=(0,p.sprintf)(/* translators: 1: Number of days */(0,p._n)("Last %1$d Day","Last %1$d Days",r,"wp-parsely"),r)}return t?a.toLocaleLowerCase():a}function E(e){switch(e){case t.Views:return(0,p.__)("Page Views","wp-parsely");case t.AvgEngaged:return(0,p.__)("Avg. Time","wp-parsely");default:return(0,p.__)("Unknown Metric","wp-parsely")}}var T,N,k=window.wp.url,I=(T=function(e,t){return T=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},T(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}T(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)});!function(e){e.CannotFormulateApiQuery="ch_cannot_formulate_api_query",e.FetchError="fetch_error",e.HttpRequestFailed="http_request_failed",e[e.ParselyApiForbidden=403]="ParselyApiForbidden",e.ParselyApiResponseContainsError="ch_response_contains_error",e.ParselyApiReturnedNoData="ch_parsely_api_returned_no_data",e.ParselyApiReturnedTooManyResults="ch_parsely_api_returned_too_many_results",e[e.ParselyApiUnauthorized=401]="ParselyApiUnauthorized",e[e.ParselyInternalServerError=500]="ParselyInternalServerError",e[e.ParselySchemaValidationFailed=422]="ParselySchemaValidationFailed",e[e.ParselyUpstreamMalformedResponse=507]="ParselyUpstreamMalformedResponse",e[e.ParselyUpstreamNotAvailable=503]="ParselyUpstreamNotAvailable",e.PluginCredentialsNotSetMessageDetected="parsely_credentials_not_set_message_detected",e.PluginSettingsApiSecretNotSet="parsely_api_secret_not_set",e.PluginSettingsSiteIdNotSet="parsely_site_id_not_set",e.PostIsNotPublished="ch_post_not_published"}(N||(N={}));var A=function(e){function t(r,n,a){void 0===a&&(a=(0,p.__)("Error: ","wp-parsely"));var s=e.call(this,a+r)||this;s.hint=null,s.name=s.constructor.name,s.code=n;var i=[N.ParselyApiForbidden,N.ParselyApiResponseContainsError,N.ParselyApiReturnedNoData,N.ParselyApiReturnedTooManyResults,N.ParselyApiUnauthorized,N.PluginCredentialsNotSetMessageDetected,N.PluginSettingsApiSecretNotSet,N.PluginSettingsSiteIdNotSet,N.PostIsNotPublished];return s.retryFetch=!i.includes(s.code),Object.setPrototypeOf(s,t.prototype),s.code===N.ParselyApiUnauthorized?s.message=(0,p.__)("This feature is accessible to select customers participating in its beta testing.","wp-parsely"):s.code===N.ParselyInternalServerError?s.message=(0,p.__)("The Parse.ly API returned an internal server error. Please try again later.","wp-parsely"):s.code===N.HttpRequestFailed&&s.message.includes("cURL error 28")?s.message=(0,p.__)("The Parse.ly API did not respond in a timely manner. Please try again later.","wp-parsely"):s.code===N.ParselySchemaValidationFailed?s.message=(0,p.__)("The Parse.ly API returned a validation error. Please try again later.","wp-parsely"):s.code===N.ParselyUpstreamMalformedResponse&&s.message.includes("Insufficient Storage")?s.message=(0,p.__)("The Parse.ly API couldn't find any relevant data to fulfill the request. Please try again later.","wp-parsely"):s.code===N.ParselyUpstreamMalformedResponse?s.message=(0,p.__)("The Parse.ly API returned a malformed response. Please try again later.","wp-parsely"):s.code===N.ParselyUpstreamNotAvailable&&(s.message=(0,p.__)("The Parse.ly API is currently unavailable. Please try again later.","wp-parsely")),s}return I(t,e),t.prototype.Message=function(e){return void 0===e&&(e=null),[N.PluginCredentialsNotSetMessageDetected,N.PluginSettingsSiteIdNotSet,N.PluginSettingsApiSecretNotSet].includes(this.code)?o(e):(this.code===N.FetchError&&(this.hint=this.Hint((0,p.__)("This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.","wp-parsely"))),this.code===N.ParselyApiForbidden&&(this.hint=this.Hint((0,p.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.","wp-parsely"))),this.code===N.HttpRequestFailed&&(this.hint=this.Hint((0,p.__)("The Parse.ly API cannot be reached. Please verify that you are online.","wp-parsely"))),(0,a.jsx)(i,{className:null==e?void 0:e.className,testId:"error",children:"<p>".concat(this.message,"</p>").concat(this.hint?this.hint:"")}))},t.prototype.Hint=function(e){return'<p className="content-helper-error-message-hint" data-testid="content-helper-error-message-hint"><strong>'.concat((0,p.__)("Hint:","wp-parsely"),"</strong> ").concat(e,"</p>")},t}(Error),C={month:"short",day:"numeric",year:"numeric"},R={month:"short",day:"numeric"},O=(0,p.__)("Date N/A","wp-parsely");function L(e){if(!1===function(e){return!isNaN(+e)&&0!==e.getTime()}(e))return O;var t=C;return e.getUTCFullYear()===(new Date).getUTCFullYear()&&(t=R),Intl.DateTimeFormat(document.documentElement.lang||"en",t).format(e)}var M=function(){return M=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},M.apply(this,arguments)},F=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function i(e){try{l(n.next(e))}catch(e){s(e)}}function o(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}l((n=n.apply(e,t||[])).next())}))},V=function(e,t){var r,n,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(i=0)),i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}},U=function(){function e(){}return e.prototype.getTopPosts=function(e,t){return void 0===t&&(t=1),F(this,void 0,void 0,(function(){var r,n;return V(this,(function(a){switch(a.label){case 0:r=[],a.label=1;case 1:return a.trys.push([1,3,,4]),[4,this.fetchTopPostsFromWpEndpoint(e,t)];case 2:return r=a.sent(),[3,4];case 3:return n=a.sent(),[2,Promise.reject(n)];case 4:return 0===r.length?[2,Promise.reject(new A((0,p.__)("No Top Posts data is available.","wp-parsely"),N.ParselyApiReturnedNoData,""))]:[2,r]}}))}))},e.prototype.fetchTopPostsFromWpEndpoint=function(e,t){var r;return F(this,void 0,void 0,(function(){var n,a;return V(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,_()({path:(0,k.addQueryArgs)("/wp-parsely/v1/stats/posts/",M(M({limit:5},(i=e.Period,{period_start:i,period_end:""})),{sort:e.Metric,page:t,itm_source:"wp-parsely-content-helper"}))})];case 1:return n=s.sent(),[3,3];case 2:return a=s.sent(),[2,Promise.reject(new A(a.message,a.code))];case 3:return(null==n?void 0:n.error)?[2,Promise.reject(new A(n.error.message,N.ParselyApiResponseContainsError))]:[2,null!==(r=null==n?void 0:n.data)&&void 0!==r?r:[]]}var i}))}))},e}(),H=function(){return(0,a.jsx)(u.SVG,{"aria-hidden":"true",version:"1.1",viewBox:"0 0 15 15",width:"15",height:"15",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)(u.Path,{d:"M0 14.0025V11.0025L7.5 3.5025L10.5 6.5025L3 14.0025H0ZM12 5.0025L13.56 3.4425C14.15 2.8525 14.15 1.9025 13.56 1.3225L12.68 0.4425C12.09 -0.1475 11.14 -0.1475 10.56 0.4425L9 2.0025L12 5.0025Z"})})},D=function(){return(0,a.jsxs)(u.SVG,{"aria-hidden":"true",version:"1.1",viewBox:"0 0 16 16",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)(u.Path,{d:"M0 3.29592C0 2.73237 0.456853 2.27551 1.02041 2.27551H4.08165C4.50432 2.27551 4.84696 2.61815 4.84696 3.04082C4.84696 3.46349 4.50432 3.80613 4.08165 3.80613H1.53062V11.9694H9.69391V9.6735C9.69391 9.25083 10.0366 8.90819 10.4592 8.90819C10.8819 8.90819 11.2245 9.25083 11.2245 9.6735V12.4796C11.2245 13.0432 10.7677 13.5 10.2041 13.5H1.02041C0.456854 13.5 0 13.0432 0 12.4796V3.29592Z"}),(0,a.jsx)(u.Path,{d:"M12.531 1.22415C12.8299 1.52303 12.8299 2.00759 12.531 2.30646L6.15342 8.68404C5.85455 8.98291 5.36998 8.98291 5.07111 8.68404C4.77224 8.38517 4.77224 7.9006 5.07111 7.60173L11.4487 1.22415C11.7476 0.925282 12.2321 0.925282 12.531 1.22415Z"}),(0,a.jsx)(u.Path,{d:"M6.63268 1.51012C6.63268 1.08745 6.97532 0.744812 7.39799 0.744812H12.2449C12.6676 0.744812 13.0103 1.08745 13.0103 1.51012V6.35708C13.0103 6.77975 12.6676 7.12239 12.2449 7.12239C11.8223 7.12239 11.4796 6.77975 11.4796 6.35708V2.27543H7.39799C6.97532 2.27543 6.63268 1.93279 6.63268 1.51012Z"})]})};function G(e,t,r){void 0===t&&(t=1),void 0===r&&(r="");var n=parseInt(e.replace(/\D/g,""),10);if(n<1e3)return e;n<1e4&&(t=1);var a=n,s=n.toString(),i="",o=0;return Object.entries({1e3:"k","1,000,000":"M","1,000,000,000":"B","1,000,000,000,000":"T","1,000,000,000,000,000":"Q"}).forEach((function(e){var r=e[0],l=e[1],c=parseInt(r.replace(/\D/g,""),10);if(n>=c){var u=t;(a=n/c)%1>1/o&&(u=a>10?1:2),u=parseFloat(a.toFixed(2))===parseFloat(a.toFixed(0))?0:u,s=a.toFixed(u),i=l}o=c})),s+r+i}function q(e){var t=e.metric,r=e.post,n=e.avgEngagedIcon,s=e.viewsIcon;return"views"===t?(0,a.jsxs)("span",{className:"parsely-top-post-metric-data",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Number of Views","wp-parsely")}),s,G(r.views.toString())]}):"avg_engaged"===t?(0,a.jsxs)("span",{className:"parsely-top-post-metric-data",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Average Time","wp-parsely")}),n,r.avgEngaged]}):(0,a.jsx)("span",{className:"parsely-top-post-metric-data",children:"-"})}function z(e){var t,r=e.metric,n=e.post;return(0,a.jsx)("li",{className:"parsely-top-post",children:(0,a.jsxs)("div",{className:"parsely-top-post-content",children:[(0,a.jsx)($,{post:n}),(0,a.jsxs)("div",{className:"parsely-top-post-data",children:[(0,a.jsx)(q,{metric:r,post:n}),(0,a.jsx)(X,{post:n}),(0,a.jsxs)("a",{className:"parsely-top-post-icon-link",href:n.url,target:"_blank",rel:"noreferrer",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("View Post (opens in new tab)","wp-parsely")}),(0,a.jsx)(D,{})]}),0!==n.postId&&(0,a.jsxs)("a",{className:"parsely-top-post-icon-link",href:(t=n.postId,"/wp-admin/post.php?post=".concat(t,"&action=edit")),target:"_blank",rel:"noreferrer",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Edit Post (opens in new tab)","wp-parsely")}),(0,a.jsx)(H,{})]}),(0,a.jsxs)("div",{className:"parsely-top-post-metadata",children:[(0,a.jsxs)("span",{className:"parsely-top-post-date",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Date","wp-parsely")}),L(new Date(n.date))]}),(0,a.jsxs)("span",{className:"parsely-top-post-author",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Author","wp-parsely")}),n.author]})]})]})]})},n.id)}function $(e){var t=e.post;return t.thumbnailUrl?(0,a.jsxs)("div",{className:"parsely-top-post-thumbnail",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Thumbnail","wp-parsely")}),(0,a.jsx)("img",{src:t.thumbnailUrl,alt:(0,p.__)("Post thumbnail","wp-parsely")})]}):(0,a.jsx)("div",{className:"parsely-top-post-thumbnail",children:(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("Post thumbnail not available","wp-parsely")})})}function X(e){var t=e.post;return(0,a.jsxs)("a",{className:"parsely-top-post-title",href:t.dashUrl,target:"_blank",rel:"noreferrer",children:[(0,a.jsx)("span",{className:"screen-reader-text",children:(0,p.__)("View in Parse.ly (opens in new tab)","wp-parsely")}),t.title]})}var Y=function(){return Y=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Y.apply(this,arguments)},Z=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function i(e){try{l(n.next(e))}catch(e){s(e)}}function o(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}l((n=n.apply(e,t||[])).next())}))},B=function(e,t){var r,n,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(i=0)),i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}};function W(){var r=this,n=function(){var e=(0,s.useContext)(b);if(void 0===e)throw new Error("useSettings must be used within a SettingsProvider");return e}(),i=n.settings,o=n.setSettings,l=(0,s.useState)(!0),c=l[0],h=l[1],y=(0,s.useState)(),v=y[0],w=y[1],g=(0,s.useState)([]),m=g[0],_=g[1],P=(0,s.useState)(1),x=P[0],T=P[1];(0,s.useEffect)((function(){var e=new U,t=function(n){return Z(r,void 0,void 0,(function(){var r=this;return B(this,(function(a){return e.getTopPosts(i,x).then((function(e){_(e),h(!1)})).catch((function(e){return Z(r,void 0,void 0,(function(){return B(this,(function(r){switch(r.label){case 0:return n>0&&e.retryFetch?[4,new Promise((function(e){return setTimeout(e,500)}))]:[3,3];case 1:return r.sent(),[4,t(n-1)];case 2:return r.sent(),[3,4];case 3:h(!1),w(e),r.label=4;case 4:return[2]}}))}))})),[2]}))}))};return h(!0),t(1),function(){h(!1),_([]),w(void 0)}}),[i,x]);var N=function(e,t){d.trackEvent("dash_widget_filter_changed",Y({filter:e},t))},k=(0,a.jsxs)("div",{className:"parsely-top-posts-filters",children:[(0,a.jsx)(f,{defaultValue:i.Period,items:Object.values(e).map((function(e){return[e,j(e)]})),onChange:function(t){S(t.target.value,e)&&(o({Period:t.target.value}),N("period",{period:t.target.value}),T(1))}}),(0,a.jsx)(f,{defaultValue:i.Metric,items:Object.values(t).map((function(e){return[e,E(e)]})),onChange:function(e){S(e.target.value,t)&&(o({Metric:e.target.value}),N("metric",{metric:e.target.value}),T(1))}})]}),I=(0,a.jsxs)("div",{className:"parsely-top-posts-navigation",children:[(0,a.jsx)("button",{className:"parsely-top-posts-navigation-prev",disabled:x<=1,"aria-label":(0,p.__)("Previous page","wp-parsely"),onClick:function(){T(x-1),d.trackEvent("dash_widget_navigation",{navigation:"previous",to_page:x-1})},children:(0,p.__)("<< Previous","wp-parsely")}),(0,p.sprintf)(/* translators: 1: Current page */(0,p.__)("Page %1$d","wp-parsely"),x),(0,a.jsx)("button",{className:"parsely-top-posts-navigation-next",disabled:!c&&m.length<5,"aria-label":(0,p.__)("Next page","wp-parsely"),onClick:function(){T(x+1),d.trackEvent("dash_widget_navigation",{navigation:"next",to_page:x+1})},children:(0,p.__)("Next >>","wp-parsely")})]});if(v)return(0,a.jsxs)(a.Fragment,{children:[k,v.Message(),x>1&&I]});var A=(0,a.jsx)("div",{className:"parsely-spinner-wrapper",children:(0,a.jsx)(u.Spinner,{})});return(0,a.jsxs)(a.Fragment,{children:[k,c?A:(0,a.jsx)("ol",{className:"parsely-top-posts",style:{counterReset:"item "+5*(x-1)},children:m.map((function(e){return(0,a.jsx)(z,{metric:i.Metric,post:e},e.id)}))}),(m.length>=5||x>1)&&I]})}var K=function(r){var n;try{n=JSON.parse(r)}catch(r){return{Metric:t.Views,Period:e.Days7}}return S(null==n?void 0:n.Metric,t)||(n.Metric=t.Views),S(null==n?void 0:n.Period,e)||(n.Period=e.Days7),n};window.addEventListener("load",(function(){var e=document.querySelector("#wp-parsely-dashboard-widget > .inside");if(null!==e){var t=(0,a.jsx)(x,{endpoint:"dashboard-widget-settings",defaultSettings:K(window.wpParselyContentHelperSettings),children:(0,a.jsx)(c,{children:(0,a.jsx)(W,{})})});s.createRoot?(0,s.createRoot)(e).render(t):(0,s.render)(t,e)}}),!1)}()}();