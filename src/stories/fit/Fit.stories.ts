import { Container, Sprite } from 'pixi.js';
import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const assets = {
    bg: 'bg.png',
};

const args = {
    width: 80,
    height: 80,
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

    createLayout({ width, height }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: {
                content: Sprite.from(assets.bg),
                styles: {
                    position: 'center',
                    maxWidth: '100%',
                    maxHeight: '100%',
                },
            },
            styles: {
                background: 'red',
                position: 'center',
                width: `${width}%`,
                height: `${height}%`,
                overflow: 'hidden',
            },
        });
        this.resize(this.w, this.h);

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

export const Fit = (params: any) => new LayoutStory(params);

export default {
    title: 'Fit',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
