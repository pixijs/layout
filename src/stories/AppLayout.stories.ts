import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { VERTICAL_ALIGN, ALIGN, POSITION, CSS_COLOR_NAMES, LOREM_TEXT } from '../utils/constants';
import { LayoutStyles } from '../utils/types';

const args = {
    color: '#FFFFFF',
    width: 95,
    height: 95,
    opacity: 1,
    fontSize: 32,
    padding: 11,
    childWidth: 50,
    childHeight: 34,
    textAlign: ALIGN,
    verticalAlign: VERTICAL_ALIGN,
    position: POSITION
};

class LayoutStory
{
    private layout: Layout;
    view = new Container();

    constructor({
        color,
        width,
        height,
        opacity,
        textAlign,
        fontSize,
        position,
        padding,
        childWidth,
        childHeight,
        verticalAlign
    }: any)
    {
        const fontStyle = {
            textAlign,
            verticalAlign,
            fontSize,
            color,
            overflow: 'hidden',
            padding
        };

        const contentStyles = {
            padding: 10,
            width: `${childWidth}%`,
            height: `${childHeight}%`,
            overflow: 'hidden',
            textAlign,
            ...fontStyle
        };

        // Styles for all elements
        const globalStyles: LayoutStyles = {
            root: {
                color,
                width: `${width}%`,
                height: `${height}%`,
                opacity,
                position
            },
            header: {
                position: 'top',
                background: 'red',
                height: '10%',
                ...fontStyle
            },
            content: {
                position: 'center',
                height: '80%',
                overflow: 'hidden'
            },
            leftMenu: {
                width: '30%',
                height: '100%',
                position: 'left',
                background: 'blue',
                ...fontStyle
            },
            mainContent: {
                width: '70%',
                height: '100%',
                position: 'right',
                textAlign,
                fontSize,
                color,
                padding
            },
            mainContent1: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[10] },
            mainContent2: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[20] },
            mainContent3: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[30] },
            mainContent4: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[40] },
            mainContent5: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[50] },
            mainContent6: { ...contentStyles, background: Object.keys(CSS_COLOR_NAMES)[60] },
            footer: {
                position: 'bottom',
                background: 'green',
                height: '10%',
                ...fontStyle
            }
        };

        // Component usage
        this.layout = new Layout({
            id: 'root',
            content: [
                // array of children
                {
                    id: 'header',
                    content: 'Header'
                },
                {
                    id: 'content',
                    content: [
                        // array of children
                        {
                            id: 'leftMenu',
                            content: LOREM_TEXT
                        },
                        {
                            id: 'mainContent',
                            content: [
                                {
                                    id: 'mainContent1',
                                    content: Object.keys(CSS_COLOR_NAMES)[10]
                                },
                                {
                                    id: 'mainContent2',
                                    content: Object.keys(CSS_COLOR_NAMES)[20]
                                },
                                {
                                    id: 'mainContent3',
                                    content: Object.keys(CSS_COLOR_NAMES)[30]
                                },
                                {
                                    id: 'mainContent4',
                                    content: Object.keys(CSS_COLOR_NAMES)[40]
                                },
                                {
                                    id: 'mainContent5',
                                    content: Object.keys(CSS_COLOR_NAMES)[50]
                                },
                                {
                                    id: 'mainContent6',
                                    content: Object.keys(CSS_COLOR_NAMES)[60]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'footer',
                    content: 'Footer'
                }
            ],
            globalStyles
        });

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.layout.resize(w, h);
    }
}

export const ApplicationLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
