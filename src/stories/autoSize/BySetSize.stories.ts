import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { ALIGN } from '../../utils/constants';

const TEXTS = [
    'Width and height values are set\n\n',
    'in the percentage of the parent size.\n\n',
    'Text will adapt to the layout size.',
];

const args = {
    text: TEXTS.join('\n\n'),
    width: 50,
    height: 50,
    padding: 15,
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

    constructor({ textAlign, width, height, padding, text, wordWrap }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                background: 'black',
                width: `${width}%`,
                height: `${height}%`,
                padding,
                overflow: 'hidden',
                // text options
                color: 'white',
                textAlign,
                fontSize: 24,
                position: 'center',
                borderRadius: 20,
                wordWrap
            }
        });

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.w = w;
        this.h = h;
        this.layout.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const BySetSize = (params: any) => new LayoutStory(params);

export default {
    title: 'AutoSize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
