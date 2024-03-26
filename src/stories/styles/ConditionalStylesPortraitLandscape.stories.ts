import { Container } from '@pixi/display';
import { Layout } from '../../Layout';
import { toolTip } from '../components/ToolTip';
import { argTypes, getDefaultArgs } from '../utils/argTypes';

const args = {
    portraitColor: 'white',
    landscapeColor: 'blue',
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ portraitColor, landscapeColor }: any)
    {
        this.addTooltip(`Resize view area from portrait to landscape and back to see the styles change`);

        this.layout = new Layout({
            content: {
                portrait: {
                    content: 'Portrait',
                    styles: {
                        fontSize: 40,
                        position: 'center',
                        color: landscapeColor,
                        landscape: {
                            visible: false,
                        },
                        portrait: {
                            visible: true,
                        }
                    }
                },
                landscape: {
                    content: 'Landscape',
                    styles: {
                        fontSize: 40,
                        position: 'center',
                        color: portraitColor,
                        portrait: {
                            visible: false,
                        },
                        landscape: {
                            visible: true,
                        },
                    }
                }
            },
            styles: {
                width: `60%`,
                height: `60%`,
                position: 'center',
                overflow: 'hidden',
                borderRadius: 20,
                portrait: {
                    background: portraitColor,
                },
                landscape: {
                    background: landscapeColor,
                },
            },
        });

        this.view.addChild(this.layout);
    }

    async addTooltip(text: string)
    {
        this.toolTip = await toolTip(text);
        this.view.addChild(this.toolTip);
        this.toolTip.resize(this.w, this.h);
    }

    resize(w: number, h: number)
    {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const PortraitLandscape = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
