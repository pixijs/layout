import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { CSS_COLOR_NAMES, LOREM_TEXT, POSITION, ALIGN } from '../../utils/constants';
import { Layout } from '@pixi/ui';
import { toolTip } from '../components/ToolTip';

const color = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {
    color,
    backgroundColor: '#000000',
    width: 50,
    height: 50,
    padding: 15,
    opacity: 1,
    fontSize: 24,
    borderRadius: 20,
    textAlign: ALIGN,
    overflow: ['hidden', 'visible'],
    position: POSITION
};

class LayoutStory
{
    private toolTip: Layout;
    view: Container;
    w: number;
    h: number;

    constructor({
        color,
        backgroundColor,
        width,
        height,
        padding,
        opacity,
        overflow,
        fontSize,
        borderRadius,
        textAlign,
        position
    }: any)
    {
        this.addTooltip(`Shows you how to turn any Container into a Layout.\n`
            + `Same works for any other Container based element like Sprite or Graphics.\n`);

        this.view = new Container();

        this.view.initLayout();

        this.view.layout.setStyles({
            background: backgroundColor,
            width: `${width}%`,
            height: `${height}%`,
            padding,
            opacity,
            overflow,
            // text options
            color,
            textAlign,
            fontSize,
            position,
            borderRadius
        });

        this.view.layout.addContent(LOREM_TEXT);

        this.resize(window.innerWidth, window.innerHeight);
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

        this.view.layout.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const TransformContainer = (params: any) => new LayoutStory(params);

export default {
    title: 'Basic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
