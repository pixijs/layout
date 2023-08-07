import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { VERTICAL_ALIGN, ALIGN, POSITION, CSS_COLOR_NAMES } from '../../utils/constants';
import { LayoutStyles } from '../../utils/types';

const args = {
    color: '#000000',
    width: 95,
    height: 95,
    opacity: 1,
    padding: 10,
    childWidth: 48,
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
            color,
            overflow: 'hidden'
        };

        const contentStyles = {
            display: 'block',
            padding: 10,
            width: `${childWidth}%`,
            height: `${childHeight}%`,
            borderRadius: 20,
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
                display: 'block',
                position: 'top',
                background: 'red',
                height: '10%',
                borderRadius: 20,
                ...fontStyle
            },
            layoutContent: {
                display: 'block',
                position: 'center',
                height: '80%',
                overflow: 'hidden'
            },
            leftMenu: {
                display: 'block',
                width: '30%',
                height: '97%',
                position: 'left',
                padding
            },
            leftMenuContent: {
                display: 'block',
                height: '100%',
                borderRadius: 20,
                background: 'blue',
                ...fontStyle
            },
            mainContent: {
                display: 'block',
                width: '70%',
                height: '96%',
                position: 'right',
                textAlign,
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
                display: 'block',
                position: 'bottom',
                background: 'green',
                height: '10%',
                borderRadius: 20,
                ...fontStyle
            }
        };

        // Component usage
        this.layout = new Layout({
            id: 'root',
            content: {
                header: {
                    content: 'Header'
                },
                layoutContent: {
                    content: {
                        // array of children
                        leftMenu: {
                            content: {
                                id: 'leftMenuContent',
                                content: 'Left menu'
                            }
                        },
                        mainContent: {
                            content: {
                                mainContent1: {
                                    content: Object.keys(CSS_COLOR_NAMES)[10]
                                },
                                mainContent2: {
                                    content: Object.keys(CSS_COLOR_NAMES)[20]
                                },
                                mainContent3: {
                                    content: Object.keys(CSS_COLOR_NAMES)[30]
                                },
                                mainContent4: {
                                    content: Object.keys(CSS_COLOR_NAMES)[40]
                                },
                                mainContent5: {
                                    content: Object.keys(CSS_COLOR_NAMES)[50]
                                },
                                mainContent6: {
                                    content: Object.keys(CSS_COLOR_NAMES)[60]
                                }
                            }
                        }
                    }
                },
                footer: {
                    content: 'Footer'
                }
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

export const ApplicationLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Complex',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
