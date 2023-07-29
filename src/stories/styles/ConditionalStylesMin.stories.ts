import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Text } from '@pixi/text';

const assets = {
    bg: 'verticalBG.png',
    a1: 'avatar-01.png',
    a2: 'avatar-02.png',
    a3: 'avatar-03.png',
    a4: 'avatar-04.png',
    a5: 'avatar-05.png',
};

const args = {
    minWidth: 500,
    minHeight: 500,
    minWidthColor: 'red',
    minHeightColor: 'blue',
};

type Props = {
    minWidth: number,
    minHeight: number,
    minWidthColor: string,
    minHeightColor: string
};

class LayoutStory
{
    private layout: Layout;
    private props: Props;
    view = new Container();
    w: number;
    h: number;
    content: Text;

    constructor(props)
    {
        preloadAssets(Object.values(assets)).then(() =>
            this.createLayout(props)
        );
    }

    createLayout(props: Props)
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
                min: {
                    width: {
                        [props.minWidth]: {
                            background: props.minWidthColor,
                        },
                    },
                    height: {
                        [props.minHeight]: {
                            background: props.minHeightColor,
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
        if (!this.props?.minWidth && !this.props?.minHeight) return '';

        return `For width more than ${this.props.minWidth} color will be ${this.props.minWidthColor}.
For height more than ${this.props.minHeight} color will be ${this.props.minHeightColor}.

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

export const Min = (params: any) => new LayoutStory(params);

export default {
    title: 'Styles',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
