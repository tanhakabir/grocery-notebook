(()=>{var e={998:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});var r=n(645),o=n.n(r)()(!1);o.push([e.id,"ol {\n\tfont-family: Georgia, 'Times New Roman', Times, serif;\n\tcounter-reset: index;  \n\tpadding: 0;\n\tpadding-left: 50px;\n  }\n  \n  /* List element */\n  li {\n\tcounter-increment: index; \n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 12px 0;\n\tbox-sizing: border-box;\n\tfont-size: 1em;\n  }\n\n  li:hover {\n\tcursor: pointer;\n\ttransform: scale(1.01);\n  }\n  \n  \n  /* Element counter */\n  li::before {\n\tcontent: counters(index, \".\", decimal-leading-zero);\n\tfont-size: 1.5rem;\n\ttext-align: right;\n\tfont-weight: bold;\n\tmin-width: 50px;\n\tpadding-right: 12px;\n\tfont-variant-numeric: tabular-nums;\n\talign-self: flex-start;\n\tbackground-image: linear-gradient(to bottom, aquamarine, cornflowerblue);\n\tbackground-attachment: fixed;\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n  }\n\n  li:hover::before {\n\tbackground-image: linear-gradient(to bottom, coral, orangered);\n  }\n  \n  \n  /* Element separation */\n  li + li {\n\tborder-top: 1px solid rgba(255,255,255,0.2);\n  }\n  ",""]);const i=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n,r,o,i=e[1]||"",a=e[3];if(!a)return i;if(t&&"function"==typeof btoa){var c=(n=a,r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),"/*# ".concat(o," */")),s=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[i].concat(s).concat([c]).join("\n")}return[i].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<e.length;c++){var s=[].concat(e[c]);r&&o[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},813:(e,t,n)=>{var r=n(379),o=n(998);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.id,o,""]]);r(o,{insert:"head",singleton:!1}),e.exports=o.locals||{}},379:(e,t,n)=>{"use strict";var r,o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function a(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},r=[],o=0;o<e.length;o++){var c=e[o],s=t.base?c[0]+t.base:c[0],l=n[s]||0,u="".concat(s," ").concat(l);n[s]=l+1;var d=a(u),f={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(i[d].references++,i[d].updater(f)):i.push({identifier:u,updater:g(f,t),references:1}),r.push(u)}return r}function s(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,u=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function f(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,m=0;function g(e,t){var n,r,o;if(t.singleton){var i=m++;n=p||(p=s(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=s(t),r=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=a(n[r]);i[o].references--}for(var s=c(e,t),l=0;l<n.length;l++){var u=a(n[l]);0===i[u].references&&(i[u].updater(),i.splice(u,1))}n=s}}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";var e=n(813);let t;t={install:()=>{},wrap:(e,t)=>t(),uninstall:()=>{}};const r=t;n.p=new URL(scriptUrl.replace(/[^/]+$/,"")+"").toString();const o=acquireNotebookRendererApi("grocery-list-notebook"),i=new Map;o.onWillDestroyOutput((e=>{e?i.delete(e.outputId):i.clear()})),o.onDidCreateOutput((e=>{i.set(e.outputId,e),a(e)}));const a=({element:t,mime:n,value:i})=>r.wrap(t,(()=>{t.innerHTML="";const n=document.createElement("div");t.appendChild(n),console.log(i),function({container:t,data:n}){const r=document.createElement("pre");r.classList.add(e.json);const o=document.createElement("ol"),i=Array.isArray(n)?n:[];for(const e of i){const t=document.createElement("li");t.textContent=e,o.appendChild(t)}r.appendChild(o),t.appendChild(r)}({container:n,data:i,notebookApi:o})}));!function(){for(const e of i.values())a(e)}()})()})();