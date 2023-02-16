import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

const args = {
    text: 'This text will fit into image size. '.repeat(20)
};

const assets = {
    smallSubstrate: 'Window/SmallSubstrate.png'
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ text }: any)
    {
        this.addTooltip(
            `Width and height are not set (it is 'auto').\n`
        + `Display is set to 'inline' or 'inline-Block'. \n`
        + 'content is not set as a simple string\n'
        + `Size of the layout will change basing on background image.`
        );

        preloadAssets(Object.values(assets)).then(() => this.createLayout(text));
    }

    createLayout(text: string)
    {
        this.layout = new Layout({
            id: 'root',
            content: {
                id: 'textWrapper',
                content: {
                    id: 'text',
                    content: text,
                    styles: {
                        display: 'inline-block',
                        overflow: 'hidden',
                        fontSize: 24
                    }
                },
                styles: {
                    height: '82%',
                    width: '85%',
                    position: 'center',
                    overflow: 'hidden'
                }
            },
            styles: {
                display: 'inline-block',
                background: Sprite.from(assets.smallSubstrate),
                position: 'center'
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

export const ByBackground = (params: any) => new LayoutStory(params);

export default {
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
