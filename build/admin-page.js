(window.webpackJsonp_=window.webpackJsonp_||[]).push([[3],{16:function(e,t,n){}}]),function(e){function t(t){for(var a,c,s=t[0],l=t[1],i=t[2],p=0,b=[];p<s.length;p++)c=s[p],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&b.push(r[c][0]),r[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(u&&u(t);b.length;)b.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={0:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp_=window.webpackJsonp_||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=l;o.push([18,3]),n()}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=window.wp.domReady},,,function(e,t){e.exports=window.wp.i18n},function(e,t,n){var a=n(11),r=n(12),o=n(13),c=n(15);e.exports=function(e,t){return a(e)||r(e,t)||o(e,t)||c()},e.exports.default=e.exports,e.exports.__esModule=!0},,,,function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var a,r,o=[],_n=!0,c=!1;try{for(n=n.call(e);!(_n=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);_n=!0);}catch(e){c=!0,r=e}finally{try{_n||null==n.return||n.return()}finally{if(c)throw r}}return o}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var a=n(14);e.exports=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},,,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(3),o=n.n(r),c=n(6),s=n(1),l=n.n(s),i=n(7),u=n.n(i),p=n(2),b=n.n(p),m=function(e){var t=e.type,n=e.name,r=e.checked,o=e.value,c=e.onChange,s=e.className;return Object(a.createElement)("label",null,Object(a.createElement)("input",{className:s,type:t,name:n,checked:r,value:o,onChange:function(e){return c(e)}}),"checkbox"===t?Object(a.createElement)("div",{className:"switch"},Object(a.createElement)("span",{className:"slider"})):"")},f=function(e){var t=e.option;return Object(a.createElement)("option",{value:t},t)},y=function(e){var t=e.values,n=e.name,r=e.onChange;return Object(a.createElement)("select",{value:t[0],name:n,onChange:r},t.map((function(e){return Object(a.createElement)(f,{option:e})})))},d=function(e){var t,n=e.note,r=e.setting,o=e.onChange,c=e.label;return"string"==typeof r[Object.keys(r)[0]]?t=Object(a.createElement)(m,{className:"text-input",type:"text",name:Object.keys(r),value:r[Object.keys(r)[0]],onChange:o}):"boolean"==typeof r[Object.keys(r)[0]]?t=Object(a.createElement)(m,{className:"checkbox-input",type:"checkbox",name:Object.keys(r),checked:r[Object.keys(r)[0]],onChange:o}):"object"===b()(r[Object.keys(r)[0]])&&(t=Object(a.createElement)(y,{values:r[Object.keys(r)[0]],name:Object.keys(r)[0],onChange:o})),Object(a.createElement)("div",{className:"setting-item--container"},Object(a.createElement)("div",{className:"setting-item"},Object(a.createElement)("div",{className:"setting-item--label"},c),Object(a.createElement)("div",{className:"setting-item--control"},t,Object(a.createElement)("p",{className:"subtext"},n))))},g=function(e){var t=e.apikey,n=e.postsToTrack,r=e.pagesToTrack,o=e.phpVersion,c=e.pluginVersion;return Object(a.createElement)("div",{className:"site-details-container"},Object(a.createElement)("div",{className:"details-label"},Object(a.createElement)("h2",null,"Site Details")),Object(a.createElement)("div",{className:"details-info"},Object(a.createElement)("p",null,"Parsely Site ID: ",t),Object(a.createElement)("p",null,"PHP Version: ",o),Object(a.createElement)("p",null,"Post Types to Track: ",n),Object(a.createElement)("p",null,"Page Types to Track: ",r),Object(a.createElement)("p",null,"Plugin Version: ",c),Object(a.createElement)("span",null,"Copy to Clipboard")))};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=function(){var e,t=Object(a.useState)(null),n=u()(t,2),r=n[0],o=n[1],c=Object(a.useState)("advanced"),s=u()(c,2),i=s[0],p=s[1];r||(e=o,fetch("/wp-json/wp-parsely/v1/settings").then((function(e){return e.json()})).then((function(t){e(t)})).catch((function(t){return e(t)})));var b=function(e){var t=r[e.target.name],n="checkbox"===e.target.type?!t:e.target.value;o(h(h({},r),{},l()({},e.target.name,n)))},m=function(e,t){return e===t?"":"inactive"};return Object(a.createElement)("div",{className:"settings-container"},Object(a.createElement)("nav",{className:"controls"},Object(a.createElement)("div",{className:"nav-control",onClick:function(){return p("general")}},Object(a.createElement)("span",{className:"".concat("general"===i?"active":"")},"General")),Object(a.createElement)("div",{className:"nav-control",onClick:function(){return p("advanced")}},Object(a.createElement)("span",{className:"".concat("advanced"===i?"active":"")},"Advanced")),Object(a.createElement)("div",{className:"nav-control",onClick:function(){return p("debug")}},Object(a.createElement)("span",{className:"".concat("debug"===i?"active":"")},"Debug"))),Object(a.createElement)("form",{onSubmit:function(e){return function(e){e.preventDefault()}(e)}},r?Object(a.createElement)("div",{className:"settings-holder"},Object(a.createElement)("div",{className:"tab-body general ".concat(m("general",i))},Object(a.createElement)(d,{setting:{apikey:r.apikey},label:"Site ID",onChange:b,note:"Your SiteID is your own site domain"}),Object(a.createElement)(d,{setting:{apiSecret:"no secret given"},label:"API Secret",onChange:b,note:"Your API Secret is your secret code to access our API"}),Object(a.createElement)(d,{setting:{logo:r.logo},label:"Logo",onChange:b,note:"You can pass a URL to set your site's logo"}),Object(a.createElement)(d,{setting:{track_post_types:r.track_post_types},label:"Track Post Types",onChange:b,note:"You can pass a URL to set your site's logo"}),Object(a.createElement)(d,{setting:{track_page_types:r.track_page_types},label:"Track Page Types",onChange:b,note:"You can pass a URL to set your site's logo"})),Object(a.createElement)("div",{className:"tab-body advanced ".concat(m("advanced",i))},Object(a.createElement)(d,{setting:{meta_type:r.meta_type},label:"Metadata Type",onChange:b,note:"Choose the metadata format for us to track"}),Object(a.createElement)(d,{setting:{custom_taxonomy_section:r.custom_taxonomy_section},label:"Custom Taxonomy Section",onChange:b,note:"Default: Category. Choose the default taxonomy to map to Parse.ly sections"}),Object(a.createElement)(d,{setting:{content_id_prefix:r.content_id_prefix},label:"Content ID Prefix",onChange:b,note:"Choose a custom prefix for your content"}),Object(a.createElement)(d,{setting:{disable_javascript:r.disable_javascript},label:"Disable Javascript",onChange:b,note:"Default: Off. Disable our javascript tracking if you use a separate system for JS tracking"}),Object(a.createElement)(d,{setting:{disable_amp:r.disable_amp},label:"Disable AMP",onChange:b,note:"Default: On. Disable our AMP tracking if you use a separate system to track AMP content"}),Object(a.createElement)(d,{setting:{use_top_level_cats:r.use_top_level_cats},label:"Use Top-Level Categories",onChange:b,note:"Default: On. Choose if you want the first top-level category to be mapped to Parse.ly"}),Object(a.createElement)(d,{setting:{cats_as_tags:r.cats_as_tags},label:"Categories as Tags",onChange:b,note:"Default: On. Choose if you want your non-primary categories to appear as tags"}),Object(a.createElement)(d,{setting:{track_authenticated_users:r.track_authenticated_users},label:"Track Authenticated Users",onChange:b,note:"Default: On."}),Object(a.createElement)(d,{setting:{lowercase_tags:r.lowercase_tags},label:"Lowercase Tags",onChange:b,note:"Default: On. Choose if you want your tags to be converted to lower case"}),Object(a.createElement)(d,{setting:{force_https_canonicals:r.force_https_canonicals},label:"Force HTTPS Canonical URLs",onChange:b,note:"Default: Off. Choose if you want your canonicals to use the HTTPS scheme"})),Object(a.createElement)("div",{className:"tab-body debug ".concat(m("debug",i))},Object(a.createElement)(d,{setting:{metadata_secret:r.metadata_secret},label:"Metadata Secret",onChange:b,note:"The metadata secret provided to you by Parse.ly"}),Object(a.createElement)(d,{setting:{parsely_wipe_metadata_cache:r.parsely_wipe_metadata_cache},label:"Wipe Metadata Cache",onChange:b,note:"This will wipe all of your site's metadata and resend all metadata to Parse.ly"}),Object(a.createElement)(g,{apikey:r.apikey,postsToTrack:r.track_post_types,pagesToTrack:r.track_page_types,pluginVersion:"2.5",phpVersion:"7.4.1"}))):Object(a.createElement)("h1",null,"Loading Settings..."),Object(a.createElement)("input",{type:"submit",className:"button-primary",value:"do the thing!"})))};n(16),o()((function(){wp.element.render(Object(a.createElement)(j,null),document.getElementById("wp-parsely-react-entrypoint"));var e=document.querySelector("#apikey"),t=document.querySelectorAll('.parsely-form-controls[data-requires-recrawl="true"] .help-text');if(e&&t.length){var n=Object(c.sprintf)(
/* translators: %s: The API Key that will be used to request a recrawl */
Object(c.__)('<strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a>'),e.value,"wp-parsely");[].forEach.call(t,(function(e){var t=document.createElement("p");t.className="description",t.innerHTML=n,e.appendChild(t)}))}}))}]);