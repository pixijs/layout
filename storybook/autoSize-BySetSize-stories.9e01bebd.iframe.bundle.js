"use strict";(self.webpackChunk_pixi_layout=self.webpackChunk_pixi_layout||[]).push([[771],{"./src/stories/autoSize/BySetSize.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BySetSize:()=>BySetSize,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Layout__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Layout.ts"),_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/utils/argTypes.ts"),_pixi_display__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@pixi/display/lib/index.mjs"),_utils_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/constants.ts");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}var args={text:["Width and height values are set in percentage of the parent size.","Text will adapt to the layout size."].join("\n\n"),width:50,height:50,padding:15,textAlign:_utils_constants__WEBPACK_IMPORTED_MODULE_1__.Hp},LayoutStory=function(){function LayoutStory(_ref){var textAlign=_ref.textAlign,width=_ref.width,height=_ref.height,padding=_ref.padding,text=_ref.text;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LayoutStory),function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(this,"view",new _pixi_display__WEBPACK_IMPORTED_MODULE_0__.W2),this.layout=new _Layout__WEBPACK_IMPORTED_MODULE_2__.A({id:"root",content:text,styles:{background:"black",width:"".concat(width,"%"),height:"".concat(height,"%"),padding,overflow:"hidden",color:"white",textAlign,fontSize:24,position:"center",borderRadius:20}}),this.view.addChild(this.layout)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(LayoutStory,[{key:"resize",value:function resize(w,h){var _this$toolTip;this.w=w,this.h=h,this.layout.resize(w,h),null===(_this$toolTip=this.toolTip)||void 0===_this$toolTip||_this$toolTip.resize(w,h)}}]),LayoutStory}(),BySetSize=function BySetSize(params){return new LayoutStory(params)};const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import { Layout } from '../../Layout';\nimport { argTypes, getDefaultArgs } from '../utils/argTypes';\nimport { Container } from '@pixi/display';\nimport { ALIGN } from '../../utils/constants';\n\nconst TEXTS = ['Width and height values are set in percentage of the parent size.', 'Text will adapt to the layout size.'];\n\nconst args = {\n    text: TEXTS.join('\\n\\n'),\n    width: 50,\n    height: 50,\n    padding: 15,\n    textAlign: ALIGN\n};\n\nclass LayoutStory\n{\n    private layout: Layout;\n    private toolTip: Layout;\n    view = new Container();\n    w: number;\n    h: number;\n\n    constructor({ textAlign, width, height, padding, text }: any)\n    {\n        this.layout = new Layout({\n            id: 'root',\n            content: text,\n            styles: {\n                background: 'black',\n                width: `${width}%`,\n                height: `${height}%`,\n                padding,\n                overflow: 'hidden',\n                // text options\n                color: 'white',\n                textAlign,\n                fontSize: 24,\n                position: 'center',\n                borderRadius: 20\n            }\n        });\n\n        this.view.addChild(this.layout);\n    }\n\n    resize(w: number, h: number)\n    {\n        this.w = w;\n        this.h = h;\n        this.layout.resize(w, h);\n        this.toolTip?.resize(w, h);\n    }\n}\n\nexport const BySetSize = (params: any) => new LayoutStory(params);\n\nexport default {\n    title: 'AutoSize',\n    argTypes: argTypes(args),\n    args: getDefaultArgs(args)\n};\n",locationsMap:{"by-set-size":{startLoc:{col:25,line:56},endLoc:{col:65,line:56},startBody:{col:25,line:56},endBody:{col:65,line:56}}}}},title:"AutoSize",argTypes:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.P)(args),args:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.V)(args)};var __namedExportsOrder=["BySetSize"]}}]);