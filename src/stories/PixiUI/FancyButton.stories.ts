import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { FancyButton } from '@pixi/ui';
import { Text } from '@pixi/text';

const testAssets = {
    defaultView: `buttons/Button.png`,
    hoverView: `buttons/Button-hover.png`,
    pressedView: `buttons/Button-pressed.png`,
};

const args = {
    image: Object.keys(testAssets),
    amount: 3,
    maxWidth: 95
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
        preloadAssets(Object.values(testAssets)).then(() => this.createLayout(props));
    }

    private getButton(): FancyButton
    {
        const text = new Text(`Click me!!!`, {
            fill: 0xffffff,
            fontSize: 36,
            dropShadow: true,
            dropShadowBlur: 4,
            dropShadowAngle: 1,
            dropShadowDistance: 2,
        });

        const button = new FancyButton({
            defaultView: testAssets.defaultView,
            hoverView: testAssets.hoverView,
            pressedView: testAssets.pressedView,
            text,
            animations: {
                hover: {
                    props: {
                        scale: { x: 1.03, y: 1.03 },
                        y: 0
                    },
                    duration: 100
                },
                pressed: {
                    props: {
                        scale: { x: 0.9, y: 0.9 },
                        y: 10
                    },
                    duration: 100
                }
            }
        });

        button.anchor.set(0.5);

        return button;
    }

    private createLayout({ maxWidth }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: this.getButton(),
            styles: {
                background: 'black',
                position: 'center',
                overflow: 'hidden',
                borderRadius: 20,
                maxWidth: `${maxWidth}%`
            }
        });
        this.layout.resize(this.w, this.h);
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

export const Button = (params: any) => new LayoutStory(params);

export default {
    title: 'PixiUI',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
