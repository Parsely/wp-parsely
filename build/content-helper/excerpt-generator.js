!function(){"use strict";var e={20:function(e,t,r){var n=r(609),o=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,a={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:c,ref:u,props:a,_owner:s.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},848:function(e,t,r){e.exports=r(20)},609:function(e){e.exports=window.React}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e,t,n,o,a,i,s,l,c,u,p,d=window.wp.data,y=window.wp.hooks,h=window.wp.plugins,f=((0,d.dispatch)("core/block-editor"),(0,d.dispatch)("core/editor"),(0,d.dispatch)("core/edit-post")),w=r(848),v=window.wp.components,g=window.wp.editor;void 0!==window.wp&&(p=null!==(t=null===(e=window.wp.editor)||void 0===e?void 0:e.PluginDocumentSettingPanel)&&void 0!==t?t:null!==(o=null===(n=window.wp.editPost)||void 0===n?void 0:n.PluginDocumentSettingPanel)&&void 0!==o?o:null===(a=window.wp.editSite)||void 0===a?void 0:a.PluginDocumentSettingPanel,null!==(s=null===(i=window.wp.editor)||void 0===i?void 0:i.PluginSidebar)&&void 0!==s||null!==(c=null===(l=window.wp.editPost)||void 0===l?void 0:l.PluginSidebar)&&void 0!==c||null===(u=window.wp.editSite)||void 0===u||u.PluginSidebar);var _,b,P=window.wp.element,m=window.wp.i18n,x=window.wp.wordcount,E=window.wp.primitives,A=(0,w.jsx)(E.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,w.jsx)(E.Path,{d:"M19.5 4.5h-7V6h4.44l-5.97 5.97 1.06 1.06L18 7.06v4.44h1.5v-7Zm-13 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3H17v3a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h3V5.5h-3Z"})}),S=function(){function e(){this._tkq=[],this.isLoaded=!1,this.isEnabled=!1,"undefined"!=typeof wpParselyTracksTelemetry&&(this.isEnabled=!0,this.loadTrackingLibrary())}return e.getInstance=function(){return window.wpParselyTelemetryInstance||Object.defineProperty(window,"wpParselyTelemetryInstance",{value:new e,writable:!1,configurable:!1,enumerable:!1}),window.wpParselyTelemetryInstance},e.prototype.loadTrackingLibrary=function(){var e=this,t=document.createElement("script");t.async=!0,t.src="//stats.wp.com/w.js",t.onload=function(){e.isLoaded=!0,e._tkq=window._tkq||[]},document.head.appendChild(t)},e.trackEvent=function(t){return r=this,n=arguments,a=function(t,r){var n;return void 0===r&&(r={}),function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(o){switch(o.label){case 0:return(n=e.getInstance()).isTelemetryEnabled()?[4,e.waitUntilLoaded()]:[2];case 1:return o.sent(),n.trackEvent(t,r),[2]}}))},new((o=void 0)||(o=Promise))((function(e,t){function i(e){try{l(a.next(e))}catch(e){t(e)}}function s(e){try{l(a.throw(e))}catch(e){t(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(i,s)}l((a=a.apply(r,n||[])).next())}));var r,n,o,a},e.waitUntilLoaded=function(){return new Promise((function(t,r){var n=e.getInstance();if(n.isTelemetryEnabled())if(n.isLoaded)t();else var o=0,a=setInterval((function(){n.isLoaded&&(clearInterval(a),t()),(o+=100)>=1e4&&(clearInterval(a),r("Telemetry library not loaded"))}),100);else r("Telemetry not enabled")}))},e.prototype.trackEvent=function(t,r){var n;this.isLoaded?(0!==t.indexOf(e.TRACKS_PREFIX)&&(t=e.TRACKS_PREFIX+t),this.isEventNameValid(t)?(r=this.prepareProperties(r),null===(n=this._tkq)||void 0===n||n.push(["recordEvent",t,r])):console.error("Error tracking event: Invalid event name")):console.error("Error tracking event: Telemetry not loaded")},e.prototype.isTelemetryEnabled=function(){return this.isEnabled},e.prototype.isProprietyValid=function(t){return e.PROPERTY_REGEX.test(t)},e.prototype.isEventNameValid=function(t){return e.EVENT_NAME_REGEX.test(t)},e.prototype.prepareProperties=function(e){return(e=this.sanitizeProperties(e)).parsely_version=wpParselyTracksTelemetry.version,wpParselyTracksTelemetry.user&&(e._ut=wpParselyTracksTelemetry.user.type,e._ui=wpParselyTracksTelemetry.user.id),wpParselyTracksTelemetry.vipgo_env&&(e.vipgo_env=wpParselyTracksTelemetry.vipgo_env),this.sanitizeProperties(e)},e.prototype.sanitizeProperties=function(e){var t=this,r={};return Object.keys(e).forEach((function(n){t.isProprietyValid(n)&&(r[n]=e[n])})),r},e.TRACKS_PREFIX="wpparsely_",e.EVENT_NAME_REGEX=/^(([a-z0-9]+)_){2}([a-z0-9_]+)$/,e.PROPERTY_REGEX=/^[a-z_][a-z0-9_]*$/,e}(),k=(S.trackEvent,function(e){void 0===e&&(e=null);var t="";(null==e?void 0:e.children)&&(t=e.children);var r="content-helper-error-message";return(null==e?void 0:e.className)&&(r+=" "+e.className),(0,w.jsx)("div",{className:r,"data-testid":null==e?void 0:e.testId,dangerouslySetInnerHTML:{__html:t}})}),T=(_=function(e,t){return _=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},_(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}_(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)});!function(e){e.AccessToFeatureDisabled="ch_access_to_feature_disabled",e.CannotFormulateApiQuery="ch_cannot_formulate_api_query",e.FetchError="fetch_error",e.HttpRequestFailed="http_request_failed",e.ParselyAborted="ch_parsely_aborted",e[e.ParselyApiForbidden=403]="ParselyApiForbidden",e.ParselyApiResponseContainsError="ch_response_contains_error",e.ParselyApiReturnedNoData="ch_parsely_api_returned_no_data",e.ParselyApiReturnedTooManyResults="ch_parsely_api_returned_too_many_results",e.PluginCredentialsNotSetMessageDetected="parsely_credentials_not_set_message_detected",e.PluginSettingsApiSecretNotSet="parsely_api_secret_not_set",e.PluginSettingsSiteIdNotSet="parsely_site_id_not_set",e.PostIsNotPublished="ch_post_not_published",e.UnknownError="ch_unknown_error",e.ParselySuggestionsApiAuthUnavailable="AUTH_UNAVAILABLE",e.ParselySuggestionsApiNoAuthentication="NO_AUTHENTICATION",e.ParselySuggestionsApiNoAuthorization="NO_AUTHORIZATION",e.ParselySuggestionsApiNoData="NO_DATA",e.ParselySuggestionsApiOpenAiError="OPENAI_ERROR",e.ParselySuggestionsApiOpenAiSchema="OPENAI_SCHEMA",e.ParselySuggestionsApiOpenAiUnavailable="OPENAI_UNAVAILABLE",e.ParselySuggestionsApiSchemaError="SCHEMA_ERROR"}(b||(b={}));var N=function(e){function t(r,n,o){void 0===o&&(o=(0,m.__)("Error: ","wp-parsely"));var a=this;r.startsWith(o)&&(o=""),(a=e.call(this,o+r)||this).hint=null,a.name=a.constructor.name,a.code=n;var i=[b.AccessToFeatureDisabled,b.ParselyApiForbidden,b.ParselyApiResponseContainsError,b.ParselyApiReturnedNoData,b.ParselyApiReturnedTooManyResults,b.PluginCredentialsNotSetMessageDetected,b.PluginSettingsApiSecretNotSet,b.PluginSettingsSiteIdNotSet,b.PostIsNotPublished,b.UnknownError,b.ParselySuggestionsApiAuthUnavailable,b.ParselySuggestionsApiNoAuthentication,b.ParselySuggestionsApiNoAuthorization,b.ParselySuggestionsApiNoData,b.ParselySuggestionsApiSchemaError];return a.retryFetch=!i.includes(a.code),Object.setPrototypeOf(a,t.prototype),a.code===b.AccessToFeatureDisabled?a.message=(0,m.__)("Access to this feature is disabled by the site's administration.","wp-parsely"):a.code===b.ParselySuggestionsApiNoAuthorization?a.message=(0,m.__)('This AI-powered feature is opt-in. To gain access, please submit a request <a href="https://wpvip.com/parsely-content-helper/" target="_blank" rel="noreferrer">here</a>.',"wp-parsely"):a.code===b.ParselySuggestionsApiOpenAiError||a.code===b.ParselySuggestionsApiOpenAiUnavailable?a.message=(0,m.__)("The Parse.ly API returned an internal server error. Please retry with a different input, or try again later.","wp-parsely"):a.code===b.HttpRequestFailed&&a.message.includes("cURL error 28")?a.message=(0,m.__)("The Parse.ly API did not respond in a timely manner. Please try again later.","wp-parsely"):a.code===b.ParselySuggestionsApiSchemaError?a.message=(0,m.__)("The Parse.ly API returned a validation error. Please try again with different parameters.","wp-parsely"):a.code===b.ParselySuggestionsApiNoData?a.message=(0,m.__)("The Parse.ly API couldn't find any relevant data to fulfill the request. Please retry with a different input.","wp-parsely"):a.code===b.ParselySuggestionsApiOpenAiSchema?a.message=(0,m.__)("The Parse.ly API returned an incorrect response. Please try again later.","wp-parsely"):a.code===b.ParselySuggestionsApiAuthUnavailable&&(a.message=(0,m.__)("The Parse.ly API is currently unavailable. Please try again later.","wp-parsely")),a}return T(t,e),t.prototype.Message=function(e){return void 0===e&&(e=null),[b.PluginCredentialsNotSetMessageDetected,b.PluginSettingsSiteIdNotSet,b.PluginSettingsApiSecretNotSet].includes(this.code)?function(e){var t;return void 0===e&&(e=null),(0,w.jsx)(k,{className:null==e?void 0:e.className,testId:"empty-credentials-message",children:null!==(t=window.wpParselyEmptyCredentialsMessage)&&void 0!==t?t:(0,m.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.","wp-parsely")})}(e):(this.code===b.FetchError&&(this.hint=this.Hint((0,m.__)("This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.","wp-parsely"))),this.code!==b.ParselyApiForbidden&&this.code!==b.ParselySuggestionsApiNoAuthentication||(this.hint=this.Hint((0,m.__)("Please ensure that the Site ID and API Secret given in the plugin's settings are correct.","wp-parsely"))),this.code===b.HttpRequestFailed&&(this.hint=this.Hint((0,m.__)("The Parse.ly API cannot be reached. Please verify that you are online.","wp-parsely"))),(0,w.jsx)(k,{className:null==e?void 0:e.className,testId:"error",children:"<p>".concat(this.message,"</p>").concat(this.hint?this.hint:"")}))},t.prototype.Hint=function(e){return'<p className="content-helper-error-message-hint" data-testid="content-helper-error-message-hint"><strong>'.concat((0,m.__)("Hint:","wp-parsely"),"</strong> ").concat(e,"</p>")},t.prototype.createErrorSnackbar=function(){/<a.*?>/.test(this.message)||(0,d.dispatch)("core/notices").createNotice("error",this.message,{type:"snackbar"})},t}(Error),j=function(e){var t=e.size,r=void 0===t?24:t,n=e.className,o=void 0===n?"wp-parsely-icon":n;return(0,w.jsxs)(v.SVG,{className:o,height:r,viewBox:"0 0 60 65",width:r,xmlns:"http://www.w3.org/2000/svg",children:[(0,w.jsx)(v.Path,{fill:"#5ba745",d:"M23.72,51.53c0-.18,0-.34-.06-.52a13.11,13.11,0,0,0-2.1-5.53A14.74,14.74,0,0,0,19.12,43c-.27-.21-.5-.11-.51.22l-.24,3.42c0,.33-.38.35-.49,0l-1.5-4.8a1.4,1.4,0,0,0-.77-.78,23.91,23.91,0,0,0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34,0-.45.21-.25.49l2.06,3.76c.2.27,0,.54-.29.33l-4.51-3.6a3.68,3.68,0,0,0-2.86-.48c-1,.16-2.44.46-2.44.46a.68.68,0,0,0-.39.25.73.73,0,0,0-.14.45S.41,43,.54,44a3.63,3.63,0,0,0,1.25,2.62L6.48,50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5,0-.4.37,0,0,.69,1.89,1.31,3.16a24,24,0,0,0,1.66,2.74,1.34,1.34,0,0,0,1,.52l5,.13c.33,0,.41.38.1.48L7.51,58c-.31.1-.34.35-.07.55a14.29,14.29,0,0,0,3.05,1.66,13.09,13.09,0,0,0,5.9.5,25.13,25.13,0,0,0,4.34-1,9.55,9.55,0,0,1-.08-1.2,9.32,9.32,0,0,1,3.07-6.91"}),(0,w.jsx)(v.Path,{fill:"#5ba745",d:"M59.7,41.53a.73.73,0,0,0-.14-.45.68.68,0,0,0-.39-.25s-1.43-.3-2.44-.46a3.64,3.64,0,0,0-2.86.48l-4.51,3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49,0,0-2,.15-3.39.39a23.91,23.91,0,0,0-3.1.84,1.4,1.4,0,0,0-.77.78l-1.5,4.8c-.11.32-.48.3-.49,0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74,14.74,0,0,0-2.44,2.47A13.11,13.11,0,0,0,36.34,51c0,.18,0,.34-.06.52a9.26,9.26,0,0,1,3,8.1,24.1,24.1,0,0,0,4.34,1,13.09,13.09,0,0,0,5.9-.5,14.29,14.29,0,0,0,3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38,1.38,0,0,0,1-.52A24.6,24.6,0,0,0,57,52.92c.61-1.27,1.31-3.16,1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63,3.63,0,0,0,59.46,44c.13-1,.24-2.47.24-2.47"}),(0,w.jsx)(v.Path,{fill:"#5ba745",d:"M46.5,25.61c0-.53-.35-.72-.8-.43l-4.86,2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2,2,0,0,0,.28-1.68,36.51,36.51,0,0,0-2.19-4.89,34,34,0,0,0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28,5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54,2.54,0,0,0-.66-1.64S35,4.27,33.88,3.27,30.78.69,30.78.69a1.29,1.29,0,0,0-1.54,0s-1.88,1.49-3.12,2.59-2.48,2.35-2.48,2.35A2.5,2.5,0,0,0,23,7.27l.27,8.93c0,.53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77,35.77,0,0,0-3,4.2,35.55,35.55,0,0,0-2,4.62,2,2,0,0,0,.27,1.67l4.67,6.24c.33.42.23,1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6,18.6,0,0,0,.83,5.07,20.16,20.16,0,0,0,5.37,7.77c3.19,3,5.93,7.8,7.45,11.08A9.6,9.6,0,0,1,30,49.09a9.31,9.31,0,0,1,2.86.45c1.52-3.28,4.26-8.11,7.44-11.09a20.46,20.46,0,0,0,5.09-7,19,19,0,0,0,1.11-5.82"}),(0,w.jsx)(v.Path,{fill:"#5ba745",d:"M36.12,58.44A6.12,6.12,0,1,1,30,52.32a6.11,6.11,0,0,1,6.12,6.12"})]})},C=window.wp.url,I=window.wp.apiFetch,O=r.n(I),R=function(){function e(){this.abortControllers=new Map}return e.prototype.cancelRequest=function(e){if(e)(t=this.abortControllers.get(e))&&(t.abort(),this.abortControllers.delete(e));else{var t,r=Array.from(this.abortControllers.keys()).pop();r&&(t=this.abortControllers.get(r))&&(t.abort(),this.abortControllers.delete(r))}},e.prototype.cancelAll=function(){this.abortControllers.forEach((function(e){return e.abort()})),this.abortControllers.clear()},e.prototype.getOrCreateController=function(e){if(e&&this.abortControllers.has(e))return{abortController:this.abortControllers.get(e),abortId:e};var t=null!=e?e:"auto-"+Date.now(),r=new AbortController;return this.abortControllers.set(t,r),{abortController:r,abortId:t}},e.prototype.fetch=function(e,t){return r=this,n=void 0,a=function(){var r,n,o,a,i,s;return function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(l){switch(l.label){case 0:r=this.getOrCreateController(t),n=r.abortController,o=r.abortId,e.signal=n.signal,l.label=1;case 1:return l.trys.push([1,3,4,5]),[4,O()(e)];case 2:return(a=l.sent()).error?[2,Promise.reject(new N(a.error.message,b.ParselyApiResponseContainsError))]:[2,a.data];case 3:return"AbortError"===(i=l.sent()).name?[2,Promise.reject(new N((0,m.__)("The operation was aborted.","wp-parsely"),b.ParselyAborted))]:(s=i.message,"object"==typeof i.message&&i.message[0].msg&&(s=i.message[0].msg),[2,Promise.reject(new N(s,i.code))]);case 4:return this.abortControllers.delete(o),[7];case 5:return[2]}}))},new((o=void 0)||(o=Promise))((function(e,t){function i(e){try{l(a.next(e))}catch(e){t(e)}}function s(e){try{l(a.throw(e))}catch(e){t(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(i,s)}l((a=a.apply(r,n||[])).next())}));var r,n,o,a},e}(),U=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function __(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}}(),D=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return U(t,e),t.getInstance=function(){return this.instance||(this.instance=new t),this.instance},t.prototype.generateExcerpt=function(e,t){return r=this,n=void 0,a=function(){return function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(r){switch(r.label){case 0:return""===e&&(e="Untitled"),[4,this.fetch({method:"POST",path:(0,C.addQueryArgs)("/wp-parsely/v2/content-helper/excerpt-generator/generate",{title:e}),data:{content:t}})];case 1:return[2,r.sent()]}}))},new((o=void 0)||(o=Promise))((function(e,t){function i(e){try{l(a.next(e))}catch(e){t(e)}}function s(e){try{l(a.throw(e))}catch(e){t(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(i,s)}l((a=a.apply(r,n||[])).next())}));var r,n,o,a},t}(R),F=function(){return F=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},F.apply(this,arguments)},L=function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function i(e){try{l(n.next(e))}catch(e){a(e)}}function s(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))},M=function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}},G=function(){var e=(0,P.useState)(!1),t=e[0],r=e[1],n=(0,P.useState)(),o=n[0],a=n[1],i=(0,P.useState)(!1),s=i[0],l=i[1],c=(0,P.useState)(""),u=c[0],p=c[1],y=(0,P.useState)({currentExcerpt:"",isUnderReview:!1,newExcerptGeneratedCount:0,oldExcerpt:""}),h=y[0],f=y[1],_=(0,d.useDispatch)(g.store).editPost,E=(0,d.useSelect)((function(e){var t,r,n=e(g.store),o=n.getEditedPostAttribute,a=(0,n.getEditedPostContent)();a||(a="");var i=(new window.DOMParser).parseFromString(a,"text/html");return a=((null!==(t=i.body.textContent)&&void 0!==t?t:i.body.innerText)||"").replace(/\n{2,}/g,"\n").trim(),{excerpt:null!==(r=o("excerpt"))&&void 0!==r?r:"",postContent:a,postTitle:o("title")}}),[]),k=E.excerpt,T=E.postContent,C=E.postTitle;return(0,P.useEffect)((function(){var e;p((e=(0,x.count)(h.currentExcerpt||k,"words",{}))>0?(0,m.sprintf)(
// Translators: %1$s the number of words in the excerpt.
// Translators: %1$s the number of words in the excerpt.
(0,m._n)("%1$s word","%1$s words",e,"wp-parsely"),e):"")}),[h.currentExcerpt,k]),(0,P.useEffect)((function(){var e=document.querySelector(".editor-post-excerpt textarea");e&&(e.scrollTop=0)}),[h.newExcerptGeneratedCount]),(0,w.jsxs)("div",{className:"editor-post-excerpt",children:[(0,w.jsxs)("div",{style:{position:"relative"},children:[t&&(0,w.jsx)("div",{className:"editor-post-excerpt__loading_animation",children:(0,w.jsx)(H,{})}),(0,w.jsx)(v.TextareaControl,{__nextHasNoMarginBottom:!0,label:(0,m.__)("Write an excerpt (optional)","wp-parsely"),className:"editor-post-excerpt__textarea",onChange:function(e){h.isUnderReview||_({excerpt:e}),f(F(F({},h),{currentExcerpt:e})),l(!0)},onKeyUp:function(){var e;if(s)l(!1);else{var t=document.querySelector(".editor-post-excerpt textarea"),r=null!==(e=null==t?void 0:t.textContent)&&void 0!==e?e:"";f(F(F({},h),{currentExcerpt:r}))}},value:t?"":h.isUnderReview?h.currentExcerpt:k,help:u||null})]}),(0,w.jsxs)(v.Button,{href:(0,m.__)("https://wordpress.org/documentation/article/page-post-settings-sidebar/#excerpt","wp-parsely"),target:"_blank",variant:"link",children:[(0,m.__)("Learn more about manual excerpts","wp-parsely"),(0,w.jsx)(v.Icon,{icon:A,size:18,className:"parsely-external-link-icon"})]}),(0,w.jsxs)("div",{className:"wp-parsely-excerpt-generator",children:[(0,w.jsxs)("div",{className:"wp-parsely-excerpt-generator-header",children:[(0,w.jsx)(j,{size:16}),(0,w.jsxs)("div",{className:"wp-parsely-excerpt-generator-header-label",children:[(0,m.__)("Generate With Parse.ly","wp-parsely"),(0,w.jsx)("span",{className:"beta-label",children:(0,m.__)("Beta","wp-parsely")})]})]}),o&&(0,w.jsx)(v.Notice,{className:"wp-parsely-excerpt-generator-error",onRemove:function(){return a(void 0)},status:"info",children:o.Message()}),(0,w.jsx)("div",{className:"wp-parsely-excerpt-generator-controls",children:h.isUnderReview?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(v.Button,{variant:"secondary",onClick:function(){return L(void 0,void 0,void 0,(function(){return M(this,(function(e){switch(e.label){case 0:return[4,_({excerpt:h.currentExcerpt})];case 1:return e.sent(),f(F(F({},h),{isUnderReview:!1})),S.trackEvent("excerpt_generator_accepted"),[2]}}))}))},children:(0,m.__)("Accept","wp-parsely")}),(0,w.jsx)(v.Button,{isDestructive:!0,variant:"secondary",onClick:function(){return L(void 0,void 0,void 0,(function(){return M(this,(function(e){return _({excerpt:h.oldExcerpt}),f(F(F({},h),{currentExcerpt:h.oldExcerpt,isUnderReview:!1})),S.trackEvent("excerpt_generator_discarded"),[2]}))}))},children:(0,m.__)("Discard","wp-parsely")})]}):(0,w.jsxs)(v.Button,{onClick:function(){return L(void 0,void 0,void 0,(function(){var e,t;return M(this,(function(n){switch(n.label){case 0:r(!0),a(void 0),n.label=1;case 1:return n.trys.push([1,3,4,5]),S.trackEvent("excerpt_generator_pressed"),[4,D.getInstance().generateExcerpt(C,T)];case 2:return e=n.sent(),f({currentExcerpt:e,isUnderReview:!0,newExcerptGeneratedCount:h.newExcerptGeneratedCount+1,oldExcerpt:k}),[3,5];case 3:return(t=n.sent())instanceof N?a(t):(a(new N((0,m.__)("An unknown error occurred.","wp-parsely"),b.UnknownError)),console.error(t)),[3,5];case 4:return r(!1),[7];case 5:return[2]}}))}))},variant:"primary",isBusy:t,disabled:t||!T,children:[t&&(0,m.__)("Generating Excerpt…","wp-parsely"),!t&&h.newExcerptGeneratedCount>0&&(0,m.__)("Regenerate Excerpt","wp-parsely"),!t&&0===h.newExcerptGeneratedCount&&(0,m.__)("Generate Excerpt","wp-parsely")]})}),(0,w.jsxs)(v.Button,{href:"https://docs.parse.ly/plugin-content-helper/#h-excerpt-generator-beta",target:"_blank",variant:"link",children:[(0,m.__)("Learn more about Parse.ly AI","wp-parsely"),(0,w.jsx)(v.Icon,{icon:A,size:18,className:"parsely-external-link-icon"})]})]})]})},H=function(){return(0,w.jsx)(v.Animate,{type:"loading",children:function(e){var t=e.className;return(0,w.jsx)("span",{className:t,children:(0,m.__)("Generating…","wp-parsely")})}})},q=function(){return(0,w.jsx)(g.PostTypeSupportCheck,{supportKeys:"excerpt",children:(0,w.jsx)(p,{name:"parsely-post-excerpt",title:(0,m.__)("Excerpt","wp-parsely"),children:(0,w.jsx)(G,{})})})};(0,y.addFilter)("plugins.registerPlugin","wp-parsely-excerpt-generator",(function(e,t){var r,n,o;return"wp-parsely-block-editor-sidebar"!==t||((null===(r=null===window||void 0===window?void 0:window.Jetpack_Editor_Initial_State)||void 0===r?void 0:r.available_blocks["ai-content-lens"])&&(console.log("Parse.ly: Jetpack AI is enabled and will be disabled."),(0,y.removeFilter)("blocks.registerBlockType","jetpack/ai-content-lens-features")),(0,h.registerPlugin)("wp-parsely-excerpt-generator",{render:q}),(null===(n=(0,d.dispatch)("core/editor"))||void 0===n?void 0:n.removeEditorPanel)?null===(o=(0,d.dispatch)("core/editor"))||void 0===o||o.removeEditorPanel("post-excerpt"):null==f||f.removeEditorPanel("post-excerpt")),e}),1e3)}()}();