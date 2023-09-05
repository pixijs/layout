import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { ControlBlock } from './components/ControlBlock';

const args = {

};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor({ }: any)
    {
        const controlBlock = new ControlBlock();

        this.layout = new Layout({
            content: {
                game: {
                    content: ' ',
                    styles: {
                        background: 'black',

                        landscape: {
                            position: 'left',
                            width: '72%',
                            height: '100%',
                        },
                        portrait: {
                            position: 'top',
                            width: '100%',
                            height: '55%',
                        },
                    },
                },
                controlBlock: {
                    content: controlBlock,
                    styles: {
                        background: 0x12081c,
                        landscape: {
                            position: 'right',
                            width: '28%',
                            height: '100%',
                        },
                        portrait: {
                            position: 'bottom',
                            width: '100%',
                            height: '45%',
                        },
                    },
                },
            },
            styles: {
                position: 'center',
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
            },
        });

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

        this.layout?.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const SidePanel = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
