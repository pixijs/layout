/*! For license information please see fit-FitAndPosition-stories.08228228.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_pixi_layout=self.webpackChunk_pixi_layout||[]).push([[920],{"./src/stories/fit/FitAndPosition.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FitAndPosition:()=>FitAndPosition,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _pixi_display__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@pixi/display/lib/index.mjs"),_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@pixi/sprite/lib/index.mjs"),_Layout__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Layout.ts"),_utils_argTypes__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/stories/utils/argTypes.ts"),_utils_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stories/utils/helpers.ts");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}var assets={bg:"verticalBG.png",a1:"avatar-01.png",a2:"avatar-02.png",a3:"avatar-03.png",a4:"avatar-04.png",a5:"avatar-05.png"},args={width:80,height:80},LayoutStory=function(){function LayoutStory(props){var _this=this;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LayoutStory),function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(this,"view",new _pixi_display__WEBPACK_IMPORTED_MODULE_0__.W2),(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.z)(Object.values(assets)).then((function(){return _this.createLayout(props)}))}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(LayoutStory,[{key:"createLayout",value:function createLayout(_ref){var width=_ref.width,height=_ref.height;this.layout=new _Layout__WEBPACK_IMPORTED_MODULE_3__.A({id:"root",styles:{width:"".concat(width,"%"),height:"".concat(height,"%"),background:"red",position:"center",overflow:"hidden"}}),this.layout.addContent({back:{content:{bg:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.bg),topLeft:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a1),styles:{position:"topLeft"}},topRight:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a2),styles:{position:"topRight"}},bottomLeft:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a3),styles:{position:"bottomLeft"}},bottomRight:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a4),styles:{position:"bottomRight"}},center:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a5),styles:{position:"center"}},centerTop:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a5),styles:{position:"centerTop"}},centerRight:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a1),styles:{position:"centerRight"}},centerLeft:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a2),styles:{position:"centerLeft"}},centerBottom:{content:_pixi_sprite__WEBPACK_IMPORTED_MODULE_1__.j.from(assets.a1),styles:{position:"centerBottom"}}},styles:{position:"center",maxHeight:"100%",maxWidth:"100%"}}}),this.resize(this.w,this.h),this.view.addChild(this.layout)}},{key:"resize",value:function resize(w,h){var _this$layout,_this$toolTip;this.w=w,this.h=h,null===(_this$layout=this.layout)||void 0===_this$layout||_this$layout.resize(w,h),null===(_this$toolTip=this.toolTip)||void 0===_this$toolTip||_this$toolTip.resize(w,h)}}]),LayoutStory}(),FitAndPosition=function FitAndPosition(params){return new LayoutStory(params)};const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import { Container } from '@pixi/display';\nimport { Sprite } from '@pixi/sprite';\nimport { Layout } from '../../Layout';\nimport { argTypes, getDefaultArgs } from '../utils/argTypes';\nimport { preloadAssets } from '../utils/helpers';\n\nconst assets = {\n    bg: 'verticalBG.png',\n    a1: 'avatar-01.png',\n    a2: 'avatar-02.png',\n    a3: 'avatar-03.png',\n    a4: 'avatar-04.png',\n    a5: 'avatar-05.png'\n};\n\nconst args = {\n    width: 80,\n    height: 80\n};\n\nclass LayoutStory\n{\n    private layout: Layout;\n    private toolTip: Layout;\n    view = new Container();\n    w: number;\n    h: number;\n\n    constructor(props)\n    {\n        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));\n    }\n\n    createLayout({ width, height }: any)\n    {\n        this.layout = new Layout({\n            id: 'root',\n            styles: {\n                width: `${width}%`,\n                height: `${height}%`,\n                background: 'red',\n                position: 'center',\n                overflow: 'hidden'\n            }\n        });\n\n        this.layout.addContent({\n            back: {\n                content: {\n                    // this is the biggest content layout in terms of size,\n                    // so parent size will be binded to it\n                    // until it reaches 100% of its parent width or height\n                    // then it will be scaled down to fit and proportionally adapt width or height accordingly\n                    bg: Sprite.from(assets.bg),\n                    // this are smaller content layouts,\n                    // using the position property they will be positioned accordingly\n                    // ! as they are absolute positioned, they will not affect auto size of the parent\n                    // as \"bg\" layout dictates the size of the parent,\n                    // this smaller layouts will be \"binded\" to its size and scale\n                    // together with it when parent is scaled\n                    topLeft: {\n                        content: Sprite.from(assets.a1),\n                        styles: {\n                            position: 'topLeft'\n                        }\n                    },\n                    topRight: {\n                        content: Sprite.from(assets.a2),\n                        styles: {\n                            position: 'topRight'\n                        }\n                    },\n                    bottomLeft: {\n                        content: Sprite.from(assets.a3),\n                        styles: {\n                            position: 'bottomLeft'\n                        }\n                    },\n                    bottomRight: {\n                        content: Sprite.from(assets.a4),\n                        styles: {\n                            position: 'bottomRight'\n                        }\n                    },\n                    center: {\n                        content: Sprite.from(assets.a5),\n                        styles: {\n                            position: 'center'\n                        }\n                    },\n                    centerTop: {\n                        content: Sprite.from(assets.a5),\n                        styles: {\n                            position: 'centerTop'\n                        }\n                    },\n                    centerRight: {\n                        content: Sprite.from(assets.a1),\n                        styles: {\n                            position: 'centerRight'\n                        }\n                    },\n                    centerLeft: {\n                        content: Sprite.from(assets.a2),\n                        styles: {\n                            position: 'centerLeft'\n                        }\n                    },\n                    centerBottom: {\n                        content: Sprite.from(assets.a1),\n                        styles: {\n                            position: 'centerBottom'\n                        }\n                    }\n                },\n                styles: {\n                    // no width and height set, so it will be controlled by the content\n                    position: 'center',\n                    maxHeight: '100%',\n                    maxWidth: '100%'\n                }\n            }\n        });\n        this.resize(this.w, this.h);\n\n        this.view.addChild(this.layout);\n    }\n\n    resize(w: number, h: number)\n    {\n        this.w = w;\n        this.h = h;\n\n        this.layout?.resize(w, h);\n        this.toolTip?.resize(w, h);\n    }\n}\n\nexport const FitAndPosition = (params: any) => new LayoutStory(params);\n\nexport default {\n    title: 'Fit',\n    argTypes: argTypes(args),\n    args: getDefaultArgs(args)\n};\n",locationsMap:{"fit-and-position":{startLoc:{col:30,line:139},endLoc:{col:70,line:139},startBody:{col:30,line:139},endBody:{col:70,line:139}}}}},title:"Fit",argTypes:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_4__.P)(args),args:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_4__.V)(args)};var __namedExportsOrder=["FitAndPosition"]},"./src/stories/utils/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>preloadAssets});var _pixi_assets__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@pixi/assets/lib/index.mjs");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _regeneratorRuntime(){_regeneratorRuntime=function _regeneratorRuntime(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function define(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{define({},"")}catch(t){define=function define(t,e,r){return t[e]=r}}function wrap(t,e,r,n){var i=e&&e.prototype instanceof Generator?e:Generator,a=Object.create(i.prototype),c=new Context(n||[]);return o(a,"_invoke",{value:makeInvokeMethod(t,r,c)}),a}function tryCatch(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=wrap;var h="suspendedStart",l="suspendedYield",f="executing",s="completed",y={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var p={};define(p,a,(function(){return this}));var d=Object.getPrototypeOf,v=d&&d(d(values([])));v&&v!==r&&n.call(v,a)&&(p=v);var g=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(p);function defineIteratorMethods(t){["next","throw","return"].forEach((function(e){define(t,e,(function(t){return this._invoke(e,t)}))}))}function AsyncIterator(t,e){function invoke(r,o,i,a){var c=tryCatch(t[r],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==_typeof(h)&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){invoke("next",t,i,a)}),(function(t){invoke("throw",t,i,a)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return invoke("throw",t,i,a)}))}a(c.arg)}var r;o(this,"_invoke",{value:function value(t,n){function callInvokeWithMethodAndArg(){return new e((function(e,r){invoke(t,n,e,r)}))}return r=r?r.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(e,r,n){var o=h;return function(i,a){if(o===f)throw new Error("Generator is already running");if(o===s){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=maybeInvokeDelegate(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=s,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=f;var p=tryCatch(e,r,n);if("normal"===p.type){if(o=n.done?s:l,p.arg===y)continue;return{value:p.arg,done:n.done}}"throw"===p.type&&(o=s,n.method="throw",n.arg=p.arg)}}}function maybeInvokeDelegate(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,maybeInvokeDelegate(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var i=tryCatch(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,y;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function pushTryEntry(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function resetTryEntry(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function next(){for(;++o<e.length;)if(n.call(e,o))return next.value=e[o],next.done=!1,next;return next.value=t,next.done=!0,next};return i.next=i}}throw new TypeError(_typeof(e)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,o(g,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),o(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===GeneratorFunction||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):(t.__proto__=GeneratorFunctionPrototype,define(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},e.awrap=function(t){return{__await:t}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,c,(function(){return this})),e.AsyncIterator=AsyncIterator,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new AsyncIterator(wrap(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},defineIteratorMethods(g),define(g,u,"Generator"),define(g,a,(function(){return this})),define(g,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function next(){for(;r.length;){var t=r.pop();if(t in e)return next.value=t,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(resetTryEntry),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function stop(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function dispatchException(e){if(this.done)throw e;var r=this;function handle(n,o){return a.type="throw",a.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return handle("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0);if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}}}},abrupt:function abrupt(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function complete(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function finish(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),y}},catch:function _catch(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;resetTryEntry(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(e,r,n){return this.delegate={iterator:values(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function preloadAssets(_x){return _preloadAssets.apply(this,arguments)}function _preloadAssets(){return _preloadAssets=function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}(_regeneratorRuntime().mark((function _callee(assets){return _regeneratorRuntime().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,_pixi_assets__WEBPACK_IMPORTED_MODULE_0__.de.load(assets);case 2:case"end":return _context.stop()}}),_callee)}))),_preloadAssets.apply(this,arguments)}}}]);