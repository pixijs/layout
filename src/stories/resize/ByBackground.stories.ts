import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

const assets = {
    horizontal: 'Window/SmallSubstrate.png',
    vertical: 'Window/MenuWindow.png',
    small: 'Window/Substrate.png'
};

const args = {
    background: Object.keys(assets),
    text:
    `Width and height are not set (it is 'auto').\n`
    + `Display is set to 'inline' or 'inline-Block'. \n`
    + 'Content is not set as a simple string (it is not a text layout)\n'
    + `Size of the layout will change basing on background image.`,
    padding: 20
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
        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ text, background, padding }: any)
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
                background: Sprite.from(assets[background]),
                position: 'center',
                maxWidth: '95%',
                maxHeight: '95%',
                padding
            }
        });
        this.layout.resize(this.w, this.h);
        this.view.addChild(this.layout);
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
