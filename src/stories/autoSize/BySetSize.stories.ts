import { Container, NineSliceSprite, Sprite, Texture } from 'pixi.js';
import { Layout } from '../../Layout';
import { ALIGN, BACKGROUND_SIZE } from '../../utils/constants';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const TEXTS = [
    'Width and height values are set in pixels.',
    'Text will adapt to the layout size.',
    'When type is set to NineSliceSprite backgroundSize is set to "stretch" by default.',
];

const args = {
    type: ['Sprite', 'NineSliceSprite'],
    text: TEXTS.join('\n\n'),
    width: 650,
    height: 350,
    padding: 35,
    textAlign: ALIGN,
    wordWrap: true,
    backgroundSize: [
        BACKGROUND_SIZE[3],
        ...BACKGROUND_SIZE.filter((_, i) => i > 3),
    ],
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
        preloadAssets(Object.values(assets)).then(() =>
            this.createLayout(props)
        );
    }

    private createLayout({
        type,
        textAlign,
        width,
        height,
        padding,
        text,
        wordWrap,
        backgroundSize,
    }: any)
    {
        let background: Sprite | NineSliceSprite;

        if (type === 'NineSliceSprite')
        {
            const substrateTexture = Texture.from(assets.background);

            background = new NineSliceSprite({
                texture: substrateTexture,
                leftWidth: 53,
                topHeight: 50,
                rightWidth: 53,
                bottomHeight: 56,
            });
        }
        else
        {
            background = Sprite.from(assets.background);
        }

        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                background,
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
                backgroundSize,
            },
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
    args: getDefaultArgs(args),
};
