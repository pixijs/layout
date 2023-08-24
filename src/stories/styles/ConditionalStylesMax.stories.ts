import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';

const args = {
    maxWidth: 500,
    maxHeight: 500,
    maxWidthColor: 'red',
    maxHeightColor: 'blue',
};

type Props = {
    maxWidth: number,
    maxHeight: number,
    maxWidthColor: string,
    maxHeightColor: string
};

class LayoutStory
{
    private layout: Layout;
    private props: Props;
    view = new Container();
    w: number;
    h: number;
    content: Text;

    constructor(props: Props)
    {
        this.props = props;

        this.content = new Text(this.generateText(0, 0));

        this.layout = new Layout({
            content: this.content,
            styles: {
                padding: 50,
                fontSize: 20,
                position: 'center',
                overflow: 'hidden',
                borderRadius: 20,
                background: 'white',
                maxWidth: '100%',
                maxHeight: '100%',
                max: {
                    width: {
                        [props.maxWidth]: {
                            background: props.maxWidthColor,
                        },
                    },
                    height: {
                        [props.maxHeight]: {
                            background: props.maxHeightColor,
                        },
                    }
                }
            },
        });

        this.resize(this.w, this.h);

        this.view.addChild(this.layout);
    }

    private generateText(w: number, h: number)
    {
        if (!this.props?.maxWidth && !this.props?.maxHeight) return '';

        return `For width less than ${this.props.maxWidth} color will be ${this.props.maxWidthColor}.
For height less than ${this.props.maxHeight} color will be ${this.props.maxHeightColor}.

If non is applied, color will be white

Width: ${w}
Height: ${h}.

* width styles always will have priority over height styles`;
    }

    resize(w: number, h: number)
    {
        this.w = w;
        this.h = h;

        if (this.props)
        {
            this.content.text = this.generateText(w, h);
        }

        this.layout?.resize(w, h);
    }
}

export const Max = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
