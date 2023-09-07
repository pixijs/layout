import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Slider as UISlider } from '@pixi/ui';
import { action } from '@storybook/addon-actions';

const assets = {
    bg: `Progress/SmallProgressBarBG.png`,
    fill: `Progress/SmallProgress-blue.png`,
    slider: `Window/Radio.png`,
};

const args = {
    onChange: action('Slider')
};

class LayoutStory
{
    private props: typeof args;
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props: typeof args)
    {
        this.props = props;
        preloadAssets(Object.values(assets)).then(() => this.createLayout());
    }

    private getSlider(): UISlider
    {
        const slider  = new UISlider({
            ...assets,
            value: 50,
            showValue: true,
            valueTextOffset: {
                y: -80
            },
            fillOffset: {
                x: 30,
                y: -7,
            },
        });

        slider.onChange.connect((value) => this.props.onChange(value));

        return slider;
    }

    private createLayout()
    {
        const slider = this.getSlider();

        this.layout = new Layout({
            id: 'sliderLayout',
            content: {
                id: 'slider',
                content: slider,
                styles: {
                    position: 'center',
                    maxWidth: `100%`,
                    height: slider.height
                }
            },
            styles: {
                background: 'black',
                position: 'center',
                borderRadius: 20,
                maxWidth: `100%`,
                maxHeight: `100%`
            }
        });
        this.layout.resize(this.w, this.h);
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

export const Slider = (params: any) => new LayoutStory(params);

export default {
    title: 'PixiUI',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
