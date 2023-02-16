import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

const assets = {
    energy: 'Icons/EnergyIcon.png',
    menu: 'Examples/Menu.png',
    asset: 'Examples/Asset 51.png'
};

const args = {
    image: Object.keys(assets)
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ image }: any)
    {
        this.addTooltip(
            `Width and height are not set (it is 'auto').\n`
        + `Display is set to 'inline' or 'inline-Block'. \n`
        + 'Content is single container-based element\n'
        + `Size of the layout will change basing on the only one child size.`
        );

        preloadAssets(Object.values(assets)).then(() => this.createLayout(image));
    }

    createLayout(image: string)
    {
        this.layout = new Layout({
            id: 'root',
            content: Sprite.from(assets[image]),
            styles: {
                display: 'inline-block',
                background: 'black',
                position: 'center',
                padding: 20,
                borderRadius: 20,
                overflow: 'hidden',
                maxHeight: '90%',
                maxWidth: '100%',
                marginTop: 350
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
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
