import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { VERTICAL_ALIGN, ALIGN, POSITION, CSS_COLOR_NAMES } from '../../utils/constants';
import { LayoutStyles } from '../../utils/types';

const args = {
    color: '#000000',
    width: 100,
    height: 100,
    opacity: 1,
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
        position,
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
            borderRadius: 20,
            ...fontStyle,
            landscape: {
                width: `${childWidth}%`,
                height: `${childHeight}%`,
            },
            portrait: {
                width: `100%`,
                height: `17%`,
            }
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
                height: '70%',
                overflow: 'hidden'
            },
            leftMenu: {
                display: 'block',
                width: '30%',
                height: '97%',
                position: 'left',
                landscape: {
                    visible: true
                },
                portrait: {
                    visible: false
                },
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
                height: '96%',
                position: 'right',
                textAlign,
                color,
                landscape: {
                    width: '70%',
                },
                portrait: {
                    width: '100%',
                },
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

export const ConditionalApplicationLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
