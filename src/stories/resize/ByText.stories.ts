import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';

const args = {
    text:
    `Width and height are not set (it is 'auto').\n`
    + `Display is set to 'inline' or 'inline-Block'.\n`
    + `Size of the layout will change basing on the inner text size.`,
    padding: 20,
    fontSize: 24
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ text, padding, fontSize }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                display: 'inline', // default value
                background: 'black',
                color: 'white',
                position: 'center',
                borderRadius: 20,
                padding,
                fontSize
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

export const ByText = (params: any) => new LayoutStory(params);

export default {
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
