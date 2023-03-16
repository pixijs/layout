import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { CSS_COLOR_NAMES } from '../../utils/constants';
import { Text } from '@pixi/text';
import { Graphics } from '@pixi/graphics';

const color = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {};

class LayoutStory
{
    private layout: Layout;
    view = new Container();

    constructor({}: any)
    {
        const globalStyles = {
            root: {
                background: 'white',
                borderRadius: 40,
                width: `90%`,
                height: `90%`,
                position: 'center',
                padding: 15
            },
            layoutID: {
                background: 'red',
                marginRight: 20,
                borderRadius: 20,
                padding: 20,
                color: 'green' // this will not work, as text is inside layout,
                // in order it to work, we need to drop this global styles inside layout we are creating
            },
            stringID: {
                // this styles will be applied to all elements with id 'stringID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: 'red', // this will work as it is a text style
                display: 'block', // this will not work, as stringID is not a layout style
                margin: 10 // this will not work, as stringID is not a layout style
            },
            stringID3: {
                // this styles will be applied to all elements with id 'stringID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: 'green', // this will work as it is a text style
                display: 'block', // this will not work, as stringID is not a layout style
                margin: 10 // this will not work, as stringID is not a layout style
            },
            stringID5: {
                // this is fully functional layout style config as it is applying to the layout
                color: 'orange',
                margin: 20,
                marginTop: 0,
                background: 'blue',
                padding: 15,
                width: 100
            },
            textID: {
                // this styles will be applied to all elements with id 'textID'
                // it is not layout styles but text styles, as stringID is an instance of PIXI.Text
                color: 'blue', // this will work as it is a text style
                display: 'block', // this will not work, as textID is not a layout style
                margin: 10 // this will not work, as textID is not a layout style
            },
            container1: {
                margin: 10, // this will not work as container1 is not a layout but just a Pixi.Container
                background: 'green' // this will not work as container1 is not a layout but just a Pixi.Container
            },
            layoutConfig: {
                // this is fully functional layout style config as it is applying to the layout
                background: 'green',
                margin: 20,
                marginTop: 0,
                textAlign: 'center',
                color: 'white',
                padding: 20,
                borderRadius: 20
            }
        };

        this.layout = new Layout({
            id: 'root',
            content: {
                // Layout instance
                layoutID: new Layout({
                    content: 'Layout instance',
                    styles: {
                        color: 'white',
                        textAlign: 'center'
                    }
                }),
                stringID: 'Text 1', // string
                textID: new Text('Text 2'), // PIXI.Text
                layoutConfig: {
                    content: 'Layout Config'
                },
                container1: new Graphics() // Pixi.Container
                    .beginFill(0x000000)
                    .drawRoundedRect(0, 0, 100, 100, 20)
                    .beginFill(0xff0000)
                    .drawCircle(50, 50, 40),
                object: {
                    // object
                    stringID3: 'Text 3'
                },
                array: [
                    // array
                    'Text 4', // this element will not have any styles applied, in order to apply styles to this element,
                    // we need to wrap it in layout config, like next element
                    {
                        content: 'Text 5',
                        id: 'stringID5'
                    },
                    {
                        // this has to be layout config, can not just be string
                        // id: 'string4',
                        content: new Graphics() // Pixi.Container
                            .beginFill(0x007eff)
                            .drawRoundedRect(0, 0, 100, 100, 20)
                            .beginFill(0xfff200)
                            .drawCircle(50, 50, 40)
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
