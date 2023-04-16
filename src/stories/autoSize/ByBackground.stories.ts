import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';
import { ALIGN } from '../../utils/constants';

const assets = {
    horizontal: 'Window/SmallSubstrate.png',
    vertical: 'Window/MenuWindow.png',
    small: 'Window/Substrate.png'
};

const args = {
    text:
    'Background is set to sprite or other display object with width and height.\n\n'
    + 'Width and height values are not set.\n\n'
    + 'Display is not set, so it is "inline-block" by default.\n\n'
    + 'Layout size will adapt to the background size.\n\n'
    + 'Text will adapt to the layout width.\n\n'
    + 'Height of text will adapt to the text height.',
    background: Object.keys(assets),
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 55,
    paddingBottom: 55,
    textAlign: ALIGN,
    wordWrap: true,
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

    createLayout({ background, paddingLeft, paddingRight, paddingTop, paddingBottom, text, textAlign, wordWrap }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: {
                text: {
                    content: text,
                    styles: {
                        display: 'block',
                        fontSize: 22,
                        textAlign,
                        wordWrap
                    }
                }
            },
            styles: {
                background: Sprite.from(assets[background]),
                position: 'center',
                maxWidth: '100%',
                maxHeight: '100%',
                overflow: 'hidden',
                paddingLeft,
                paddingRight,
                paddingTop,
                paddingBottom
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
    title: 'AutoSize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
