import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';

const args = {
    text: 'Size of this layout depends on thi text.'
};

class LayoutStory
{
    private layout: Layout;
    view = new Container();

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

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.layout.resize(w, h);
    }
}

export const ByContent = (params: any) => new LayoutStory(params);

export default {
    title: 'Resize',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
