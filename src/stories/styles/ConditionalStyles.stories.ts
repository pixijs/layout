import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { toolTip } from '../components/ToolTip';

const assets = {
    bg: 'verticalBG.png',
    a1: 'avatar-01.png',
    a2: 'avatar-02.png',
    a3: 'avatar-03.png',
    a4: 'avatar-04.png',
    a5: 'avatar-05.png',
};

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

    constructor(props)
    {
        preloadAssets(Object.values(assets)).then(() =>
            this.createLayout(props)
        );
    }

    createLayout({ portraitColor, landscapeColor }: any)
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
                        portrait: {
                            visible: true,
                        },
                        landscape: {
                            visible: false,
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
                        }
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
                }
            },
        });

        this.resize(this.w, this.h);

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

export const ConditionalStyles = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
