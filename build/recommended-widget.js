!function(){"use strict";var e={};function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function r(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a=[],_n=!0,o=!1;try{for(r=r.call(e);!(_n=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);_n=!0);}catch(e){o=!0,i=e}finally{try{_n||null==r.return||r.return()}finally{if(o)throw i}}return a}}(e,r)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},e.d=function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var n=window.wp.domReady,i=e.n(n);function a(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)e[n]=r[n]}return e}var o=function e(t,r){function n(e,n,i){if("undefined"!=typeof document){"number"==typeof(i=a({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="";for(var u in i)i[u]&&(o+="; "+u,!0!==i[u]&&(o+="="+i[u].split(";")[0]));return document.cookie=e+"="+t.write(n,e)+o}}return Object.create({set:n,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var r=document.cookie?document.cookie.split("; "):[],n={},i=0;i<r.length;i++){var a=r[i].split("="),o=a.slice(1).join("=");try{var u=decodeURIComponent(a[0]);if(n[u]=t.read(o,u),e===u)break}catch(e){}}return e?n[e]:n}},remove:function(e,t){n(e,"",a({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,a({},this.attributes,t))},withConverter:function(t){return e(a({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"}),u=o;function c(e,t,r){if(r){var n=null===(i=function(){var e=u.get("_parsely_visitor");if(e){var t=unescape(e);try{return JSON.parse(t)}catch(e){return}}}())||void 0===i?void 0:i.id;if(n)return"".concat(e,"&uuid=").concat(encodeURIComponent(n))}var i;return"".concat(e,"&url=").concat(encodeURIComponent(t))}function d(e){var t=e.getAttribute("data-parsely-widget-api-url"),r=e.getAttribute("data-parsely-widget-permalink"),n="true"===e.getAttribute("data-parsely-widget-personalized");return{outerDiv:e,url:c(t,r,n),displayAuthor:"true"===e.getAttribute("data-parsely-widget-display-author"),displayDirection:e.getAttribute("data-parsely-widget-display-direction"),imgDisplay:e.getAttribute("data-parsely-widget-img-display"),widgetId:e.getAttribute("data-parsely-widget-id")}}i()((function(){var e=document.querySelectorAll(".parsely-recommended-widget"),t=Array.from(e).map(d).reduce((function(e,t){return e[t.url]||(e[t.url]=[]),e[t.url].push(t),e}),{});Object.entries(t).forEach((function(e){var t=r(e,2),n=t[0],i=t[1];fetch(n).then((function(e){return e.json()})).then((function(e){i.forEach((function(t){!function(e,t){var n=t.outerDiv,i=t.displayAuthor,a=t.displayDirection,o=t.imgDisplay,u=t.widgetId;"none"!==o&&n.classList.add("display-thumbnail"),a&&n.classList.add("list-"+a);var c=document.createElement("ul");c.className="parsely-recommended-widget",n.appendChild(c);for(var d=0,l=Object.entries(e.data);d<l.length;d++){var s=r(l[d],2),p=s[0],m=s[1],f=document.createElement("li");f.className="parsely-recommended-widget-entry",f.setAttribute("id","parsely-recommended-widget-item"+p);var y=document.createElement("div");y.className="parsely-text-wrapper";var v=document.createElement("img");"parsely_thumb"===o?v.setAttribute("src",m.thumb_url_medium):"original"===o&&v.setAttribute("src",m.image_url),f.appendChild(v);var g="?itm_campaign=".concat(u),h="&itm_content=widget_item-"+p,b=m.url+g+"&itmMedium=site_widget&itmSource=parsely_recommended_widget"+h,w=document.createElement("div");w.className="parsely-recommended-widget-title";var A=document.createElement("a");if(A.setAttribute("href",b),A.textContent=m.title,w.appendChild(A),y.appendChild(w),i){var C=document.createElement("div");C.className="parsely-recommended-widget-author",C.textContent=m.author,y.appendChild(C)}f.appendChild(y),c.appendChild(f)}n.appendChild(c),n.parentElement.classList.remove("parsely-recommended-widget-hidden")}(e,t)}))}))}))}))}();