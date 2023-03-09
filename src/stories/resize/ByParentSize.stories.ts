import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { ALIGN } from '../../utils/constants';

const args = {
    text:
    'Width and height values are not set,\n'
    + 'display is not set, so it is "inline-block" by default.\n'
    + 'Text will adapt to the layout width,\n'
    + 'layout width will adapt to the parent width.\n'
    + 'height will adapt to the text height.',
    padding: 15,
    textAlign: ALIGN
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ textAlign, padding, text }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                background: 'black',
                padding,
                overflow: 'hidden',
                // text options
                color: 'white',
                textAlign,
                fontSize: 24,
                position: 'center',
                borderRadius: 20
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

export const ByParentSize = (params: any) => new LayoutStory(params);

export default {
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
