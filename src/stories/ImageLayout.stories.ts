import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from './utils/argTypes';
import { Container } from '@pixi/display';
import { ALIGN } from '../utils/constants';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from './utils/helpers';

const assets = {
    small: 'Window/Substrate.png'
};

const args = {};

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

    createLayout({}: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: {
                id: 'image',
                content: Sprite.from(assets.small),
                styles: {
                    display: 'inline-block',
                    position: 'left',
                    anchor: 0.5
                }
            },
            styles: {
                display: 'inline-block',
                position: 'center',
                maxWidth: '95%',
                maxHeight: '95%',
                padding: 50,
                background: 'black'
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

export const ImageLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
