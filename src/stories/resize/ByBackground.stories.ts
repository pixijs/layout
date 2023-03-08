import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';
import { LOREM_TEXT } from '../../utils/constants';

const assets = {
    horizontal: 'Window/SmallSubstrate.png',
    vertical: 'Window/MenuWindow.png',
    small: 'Window/Substrate.png'
};

const args = {
    background: Object.keys(assets),
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

    createLayout({ background, padding }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: LOREM_TEXT,
            styles: {
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
