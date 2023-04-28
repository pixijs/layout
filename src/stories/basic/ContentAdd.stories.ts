import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { CSS_COLOR_NAMES } from '../../utils/constants';
import { Text } from '@pixi/text';
import { Graphics } from '@pixi/graphics';
import { LayoutStyles } from '../../utils/types';

const color = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {
    rootBGColor: '#FFFFFF',
    layoutBGColor: ['red', ...color],
    layoutTextColor: '#FFFFFF',
    string1Color: ['red', ...color],
    string2Color: ['blue', ...color],
    string3COlor: ['green', ...color],
    string4Color: ['orange', ...color],
    string5Color: ['orange', ...color],
    string5BGColor: ['blue', ...color],
    layoutConfigBG: ['green', ...color],
    layoutConfigColor: ['white', ...color]
};

class LayoutStory
{
    private layout: Layout;
    view = new Container();

    constructor({
        rootBGColor,
        layoutBGColor,
        layoutTextColor,
        string1Color,
        string2Color,
        string3COlor,
        string4Color,
        string5Color,
        string5BGColor,
        layoutConfigBG,
        layoutConfigColor
    }: any)
    {
        const globalStyles: LayoutStyles = {
            root: {
                background: rootBGColor,
                borderRadius: 40,
                width: `90%`,
                height: `90%`,
                position: 'center',
                padding: 15,
                color: string4Color // this will work only for text 4 layout as it is a 1st level child of the roo layout
            },
            layoutID: {
                background: layoutBGColor,
                marginRight: 10,
                borderRadius: 20,
                padding: 5,
                color: 'green' // this will not work, as text is inside layout,
                // in order it to work, we need to drop this global styles inside layout we are creating
            },
            stringID1: {
                // this styles will be applied to all elements with id 'stringID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: string1Color, // this will work as it is a text style
                margin: 10, // this will not work, as stringID is not a layout style
            },
            textID: {
                // this styles will be applied to all elements with id 'textID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: string2Color, // this will work as it is a text style
                display: 'block', // this will not work, as textID is not a layout style
                margin: 10 // this will not work, as textID is not a layout style
            },
            layoutConfig: {
                // this is fully functional layout style config as it is applying to the layout
                background: layoutConfigBG,
                margin: 20,
                marginTop: 0,
                textAlign: 'center',
                color: layoutConfigColor,
                padding: 5,
                borderRadius: 20,
                marginRight: 40,
            },
            container1: {
                margin: 10, // this will not work as container1 is not a layout but just a Pixi.Container
                background: 'red' // this will not work as container1 is not a layout but just a Pixi.Container
            },
            stringID3: {
                // this styles will be applied to all elements with id 'stringID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: string3COlor, // this will work as it is a text style
                display: 'block', // this will not work, as stringID is not a layout style
                margin: 10 // this will not work, as stringID is not a layout style
            },
            stringID5: {
                // this is fully functional layout style config as it is applying to the layout
                color: string5Color,
                marginLeft: 20,
                marginRight: 40,
                borderRadius: 20,
                textAlign: 'center',
                marginTop: 0,
                background: string5BGColor,
                padding: 5,
                width: 100
            }
        };

        this.layout = new Layout({
            id: 'root',
            content: {
                // Layout instance
                layoutID: new Layout({
                    content: 'Layout instance',
                }),
                stringID1: 'Text 1', // string
                container1: new Graphics() // Pixi.Container
                    .beginFill(0xff0000)
                    .drawCircle(20, 20, 20),
                textID: new Text('Text 2'), // PIXI.Text
                layoutConfig: {
                    content: 'Layout Config'
                },
                object: {
                    // object
                    stringID3: 'Text 3'
                },
                array: [
                    // array
                    // we need to wrap it in layout config, like next element
                    {
                        content: 'Text 5',
                        id: 'stringID5'
                    },
                    'Text 4', // this element will not have any styles applied, in order to apply styles to this element,
                    {
                        // this has to be layout config, can not just be string
                        id: 'string4',
                        content: new Graphics() // Pixi.Container
                            .beginFill(0x007eff)
                            .drawRoundedRect(0, 0, 100, 100, 20)
                            .beginFill(0xfff200)
                            .drawCircle(20, 20, 10)
                    }
                ]
            },
            globalStyles
        });

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.layout.resize(w, h);
    }
}

export const ContentAdd = (params: any) => new LayoutStory(params);

export default {
    title: 'Basic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
