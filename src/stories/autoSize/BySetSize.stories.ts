import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { ALIGN, OVERFLOW } from '../../utils/constants';

const TEXTS = [
    'Width and height values are set in percentage of the parent size.',
    'Text will adapt to the layout size.\n\n'];

const args = {
    text: TEXTS.join('\n\n').repeat(22),
    width: 350,
    height: 350,
    padding: 15,
    textAlign: ALIGN,
    overflow: OVERFLOW,
    wordWrap: true
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ textAlign, width, height, padding, text, wordWrap, overflow }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                background: 'black',
                width,
                height,
                padding,
                overflow,
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
