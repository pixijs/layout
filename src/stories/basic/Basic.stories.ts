import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { CSS_COLOR_NAMES, LOREM_TEXT, POSITION, ALIGN } from '../../utils/constants';

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
    position: POSITION,
    wordWrap: true
};

class LayoutStory
{
    private layout: Layout;
    view = new Container();

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
        position,
        wordWrap
    }: any)
    {
        this.layout = new Layout({
            id: 'root',
            content: LOREM_TEXT,
            styles: {
                background: backgroundColor,
                width: `${width}%`,
                height: `${height}%`,
                opacity,
                overflow,
                position,
                borderRadius,
                color,
                textAlign,
                fontSize,
                wordWrap,
                padding,
            }
        });

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.layout.resize(w, h);
    }
}

export const BasicSettings = (params: any) => new LayoutStory(params);

export default {
    title: 'Basic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
