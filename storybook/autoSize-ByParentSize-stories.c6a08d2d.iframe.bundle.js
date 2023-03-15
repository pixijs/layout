"use strict";(self.webpackChunk_pixi_layout=self.webpackChunk_pixi_layout||[]).push([[660],{"./src/stories/autoSize/ByParentSize.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ByParentSize:()=>ByParentSize,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Layout__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Layout.ts"),_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/utils/argTypes.ts"),_pixi_display__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@pixi/display/lib/index.mjs");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}var args={text:'Width and height values are not set,\ndisplay is not set, so it is "inline-block" by default.\nText will adapt to the layout width,\nlayout width will adapt to the parent width.\nheight will adapt to the text height.',padding:15,textAlign:__webpack_require__("./src/utils/constants.ts").Hp},LayoutStory=function(){function LayoutStory(_ref){var textAlign=_ref.textAlign,padding=_ref.padding,text=_ref.text;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LayoutStory),function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(this,"view",new _pixi_display__WEBPACK_IMPORTED_MODULE_0__.W2),this.layout=new _Layout__WEBPACK_IMPORTED_MODULE_2__.A({id:"root",content:text,styles:{background:"black",padding,overflow:"hidden",color:"white",textAlign,fontSize:24,position:"center",borderRadius:20}}),this.view.addChild(this.layout)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(LayoutStory,[{key:"resize",value:function resize(w,h){var _this$toolTip;this.w=w,this.h=h,this.layout.resize(w,h),null===(_this$toolTip=this.toolTip)||void 0===_this$toolTip||_this$toolTip.resize(w,h)}}]),LayoutStory}(),ByParentSize=function ByParentSize(params){return new LayoutStory(params)};const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import { Layout } from '../../Layout';\nimport { argTypes, getDefaultArgs } from '../utils/argTypes';\nimport { Container } from '@pixi/display';\nimport { ALIGN } from '../../utils/constants';\n\nconst args = {\n    text:\n    'Width and height values are not set,\\n'\n    + 'display is not set, so it is \"inline-block\" by default.\\n'\n    + 'Text will adapt to the layout width,\\n'\n    + 'layout width will adapt to the parent width.\\n'\n    + 'height will adapt to the text height.',\n    padding: 15,\n    textAlign: ALIGN\n};\n\nclass LayoutStory\n{\n    private layout: Layout;\n    private toolTip: Layout;\n    view = new Container();\n    w: number;\n    h: number;\n\n    constructor({ textAlign, padding, text }: any)\n    {\n        this.layout = new Layout({\n            id: 'root',\n            content: text,\n            styles: {\n                background: 'black',\n                padding,\n                overflow: 'hidden',\n                // text options\n                color: 'white',\n                textAlign,\n                fontSize: 24,\n                position: 'center',\n                borderRadius: 20\n            }\n        });\n\n        this.view.addChild(this.layout);\n    }\n\n    resize(w: number, h: number)\n    {\n        this.w = w;\n        this.h = h;\n        this.layout.resize(w, h);\n        this.toolTip?.resize(w, h);\n    }\n}\n\nexport const ByParentSize = (params: any) => new LayoutStory(params);\n\nexport default {\n    title: 'AutoSize',\n    argTypes: argTypes(args),\n    args: getDefaultArgs(args)\n};\n",locationsMap:{"by-parent-size":{startLoc:{col:28,line:55},endLoc:{col:68,line:55},startBody:{col:28,line:55},endBody:{col:68,line:55}}}}},title:"AutoSize",argTypes:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.P)(args),args:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.V)(args)};var __namedExportsOrder=["ByParentSize"]}}]);