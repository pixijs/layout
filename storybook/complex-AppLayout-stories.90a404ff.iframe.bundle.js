"use strict";(self.webpackChunk_pixi_layout=self.webpackChunk_pixi_layout||[]).push([[45],{"./src/stories/complex/AppLayout.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ApplicationLayout:()=>ApplicationLayout,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Layout__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Layout.ts"),_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/utils/argTypes.ts"),_pixi_display__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@pixi/display/lib/index.mjs"),_utils_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/constants.ts");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}var args={color:"#000000",width:95,height:95,opacity:1,padding:10,childWidth:48,childHeight:34,textAlign:_utils_constants__WEBPACK_IMPORTED_MODULE_1__.Hp,verticalAlign:_utils_constants__WEBPACK_IMPORTED_MODULE_1__.oX,position:_utils_constants__WEBPACK_IMPORTED_MODULE_1__.Vr},LayoutStory=function(){function LayoutStory(_ref){var color=_ref.color,width=_ref.width,height=_ref.height,opacity=_ref.opacity,textAlign=_ref.textAlign,position=_ref.position,padding=_ref.padding,childWidth=_ref.childWidth,childHeight=_ref.childHeight,verticalAlign=_ref.verticalAlign;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LayoutStory),_defineProperty(this,"view",new _pixi_display__WEBPACK_IMPORTED_MODULE_0__.W2);var fontStyle={textAlign,verticalAlign,color,overflow:"hidden"},contentStyles=_objectSpread({display:"block",padding:10,width:"".concat(childWidth,"%"),height:"".concat(childHeight,"%"),borderRadius:20},fontStyle),globalStyles={root:{color,width:"".concat(width,"%"),height:"".concat(height,"%"),opacity,position},header:_objectSpread({display:"block",position:"top",background:"red",height:"10%",borderRadius:20},fontStyle),layoutContent:{display:"block",position:"center",height:"80%",overflow:"hidden"},leftMenu:{display:"block",width:"30%",height:"97%",position:"left",padding},leftMenuContent:_objectSpread({display:"block",height:"100%",borderRadius:20,background:"blue"},fontStyle),mainContent:{display:"block",width:"70%",height:"96%",position:"right",textAlign,color,padding},mainContent1:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[10]}),mainContent2:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[20]}),mainContent3:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[30]}),mainContent4:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[40]}),mainContent5:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[50]}),mainContent6:_objectSpread(_objectSpread({},contentStyles),{},{background:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[60]}),footer:_objectSpread({display:"block",position:"bottom",background:"green",height:"10%",borderRadius:20},fontStyle)};this.layout=new _Layout__WEBPACK_IMPORTED_MODULE_2__.A({id:"root",content:{header:{content:"Header"},layoutContent:{content:{leftMenu:{content:{id:"leftMenuContent",content:"Left menu"}},mainContent:{content:{mainContent1:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[10]},mainContent2:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[20]},mainContent3:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[30]},mainContent4:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[40]},mainContent5:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[50]},mainContent6:{content:Object.keys(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.D4)[60]}}}}},footer:{content:"Footer"}},globalStyles}),this.view.addChild(this.layout)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(LayoutStory,[{key:"resize",value:function resize(w,h){this.layout.resize(w,h)}}]),LayoutStory}(),ApplicationLayout=function ApplicationLayout(params){return new LayoutStory(params)};const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import { Layout } from '../../Layout';\nimport { argTypes, getDefaultArgs } from '../utils/argTypes';\nimport { Container } from '@pixi/display';\nimport { VERTICAL_ALIGN, ALIGN, POSITION, CSS_COLOR_NAMES } from '../../utils/constants';\nimport { LayoutStyles } from '../../utils/types';\n\nconst args = {\n    color: '#000000',\n    width: 95,\n    height: 95,\n    opacity: 1,\n    padding: 10,\n    childWidth: 48,\n    childHeight: 34,\n    textAlign: ALIGN,\n    verticalAlign: VERTICAL_ALIGN,\n    position: POSITION\n};\n\nclass LayoutStory\n{\n    private layout: Layout;\n    view = new Container();\n\n    constructor({\n        color,\n        width,\n        height,\n        opacity,\n        textAlign,\n        position,\n        padding,\n        childWidth,\n        childHeight,\n        verticalAlign\n    }: any)\n    {\n        const fontStyle = {\n            textAlign,\n            verticalAlign,\n            color,\n            overflow: 'hidden'\n        };\n\n        const contentStyles = {\n            display: 'block',\n            padding: 10,\n            width: `${childWidth}%`,\n            height: `${childHeight}%`,\n            borderRadius: 20,\n            ...fontStyle\n        };\n\n        // Styles for all elements\n        const globalStyles: LayoutStyles = {\n            root: {\n                color,\n                width: `${width}%`,\n                height: `${height}%`,\n                opacity,\n                position\n            },\n            header: {\n                display: 'block',\n                position: 'top',\n                background: 'red',\n                height: '10%',\n                borderRadius: 20,\n                ...fontStyle\n            },\n            layoutContent: {\n                display: 'block',\n                position: 'center',\n                height: '80%',\n                overflow: 'hidden'\n            },\n            leftMenu: {\n                display: 'block',\n                width: '30%',\n                height: '97%',\n                position: 'left',\n                padding\n            },\n            leftMenuContent: {\n                display: 'block',\n                height: '100%',\n                borderRadius: 20,\n                background: 'blue',\n                ...fontStyle\n            },\n            mainContent: {\n                display: 'block',\n                width: '70%',\n                height: '96%',\n                position: 'right',\n                textAlign,\n                color,\n                padding\n            },\n            mainContent1: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[10] },\n            mainContent2: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[20] },\n            mainContent3: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[30] },\n            mainContent4: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[40] },\n            mainContent5: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[50] },\n            mainContent6: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[60] },\n            footer: {\n                display: 'block',\n                position: 'bottom',\n                background: 'green',\n                height: '10%',\n                borderRadius: 20,\n                ...fontStyle\n            }\n        };\n\n        // Component usage\n        this.layout = new Layout({\n            id: 'root',\n            content: {\n                header: {\n                    content: 'Header'\n                },\n                layoutContent: {\n                    content: {\n                        // array of children\n                        leftMenu: {\n                            content: {\n                                id: 'leftMenuContent',\n                                content: 'Left menu'\n                            }\n                        },\n                        mainContent: {\n                            content: {\n                                mainContent1: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[10]\n                                },\n                                mainContent2: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[20]\n                                },\n                                mainContent3: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[30]\n                                },\n                                mainContent4: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[40]\n                                },\n                                mainContent5: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[50]\n                                },\n                                mainContent6: {\n                                    content: Object.keys(CSS_COLOR_NAMES)[60]\n                                }\n                            }\n                        }\n                    }\n                },\n                footer: {\n                    content: 'Footer'\n                }\n            },\n            globalStyles\n        });\n\n        this.view.addChild(this.layout);\n    }\n\n    resize(w: number, h: number)\n    {\n        this.layout.resize(w, h);\n    }\n}\n\nexport const ApplicationLayout = (params: any) => new LayoutStory(params);\n\nexport default {\n    title: 'Complex',\n    argTypes: argTypes(args),\n    args: getDefaultArgs(args)\n};\n",locationsMap:{"application-layout":{startLoc:{col:33,line:172},endLoc:{col:73,line:172},startBody:{col:33,line:172},endBody:{col:73,line:172}}}}},title:"Complex",argTypes:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.P)(args),args:(0,_utils_argTypes__WEBPACK_IMPORTED_MODULE_3__.V)(args)};var __namedExportsOrder=["ApplicationLayout"]}}]);