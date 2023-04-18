import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';
import { Content } from '../../utils/types';

const testAssets = {
    energy: 'Icons/EnergyIcon.png',
    gem: 'Icons/gemIcon.png',
    star: 'Icons/Star.png'
};

const args = {
    image: Object.keys(testAssets),
    amount: 3,
    padding: 20,
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
        this.addTooltip(
            `Width and height are not set (it is 'auto').\n`
        + `Display of root layout is set to 'inline' or 'inline-Block'.\n`
        + `Size of the layout will change basing on content.`
        );

        preloadAssets(Object.values(testAssets)).then(() => this.createLayout(props));
    }

    createLayout({ image, padding, amount, maxWidth }: any)
    {
        const content: Array<Content> = [];

        for (let i = 0; i < amount; i++)
        {
            content.push(Sprite.from(testAssets[image]));
        }

        this.layout = new Layout({
            id: 'root',
            content,
            styles: {
                background: 'black',
                position: 'center',
                overflow: 'hidden',
                padding,
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

export const ByContent = (params: any) => new LayoutStory(params);

export default {
    title: 'AutoSize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
