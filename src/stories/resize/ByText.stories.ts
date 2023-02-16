import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';

const args = {
    text: 'Size of layout depends on this text.'
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ text }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: text,
            styles: {
                display: 'inline',
                background: 'black',
                padding: 20,
                color: 'white',
                fontSize: 24,
                position: 'center',
                borderRadius: 20
            }
        });

        this.addTooltip(`Width is not set (it is 'auto'), display is set to 'inline' or 'inline-Block'`);

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

export const ByText = (params: any) => new LayoutStory(params);

export default {
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
