import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { ALIGN } from '../../utils/constants';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

const TEXTS = ['Width and height values are set in percentage of the parent size.', 'Text will adapt to the layout size.'];

const args = {
    text: TEXTS.join('\n\n'),
    width: 350,
    height: 350,
    padding: 15,
    textAlign: ALIGN,
    wordWrap: true,
    resizeBackground: true,
};

const assets = {
    background: 'Window/SmallSubstrate.png',
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

    private createLayout({ textAlign, width, height, padding, text, wordWrap, resizeBackground }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                background: Sprite.from(assets.background),
                width,
                height,
                padding,
                overflow: 'hidden',
                // text options
                textAlign,
                fontSize: 24,
                position: 'center',
                borderRadius: 20,
                wordWrap,
                resizeBackground
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

export const BySetSize = (params: any) => new LayoutStory(params);

export default {
    title: 'AutoSize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
