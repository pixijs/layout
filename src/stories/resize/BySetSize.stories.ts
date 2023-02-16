import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { LOREM_TEXT, ALIGN } from '../../utils/constants';
import { toolTip } from '../components/ToolTip';

const args = {
    width: 50,
    height: 30,
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

    constructor({ textAlign, width, height, padding }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: LOREM_TEXT,
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
                borderRadius: 20
            }
        });

        this.addTooltip(`Width and height are set, so text will adapt to the layout size.`);

        this.view.addChild(this.layout);
    }

    async addTooltip(text: string)
    {
        this.toolTip = await toolTip(text);
        this.view.addChild(this.toolTip);
        this.toolTip.resize(this.w, this.h);
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
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
