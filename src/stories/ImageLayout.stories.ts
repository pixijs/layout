import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from './utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from './utils/helpers';
import type { GradeToOne } from '../utils/types';
import { POSITION } from '../utils/constants';

const assets = {
    avatar: 'avatar-01.png'
};

const args = {
    anchorX: 0.5,
    anchorY: 0.5,
    position: ['left', ...POSITION.filter((position) => position !== 'left')]
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props)
    {
        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ anchorX, anchorY, position }: any)
    {
        const anchor = Math.min(anchorX, anchorY);
        const opacity: GradeToOne = (1 - anchor > 0.5 ? 1 - anchor : 0.5) as GradeToOne;

        this.layout = new Layout({
            id: 'root',
            content: {
                id: 'image',
                content: Sprite.from(assets.avatar),
                styles: {
                    display: 'inline-block',
                    position,
                    anchorX,
                    anchorY,
                    opacity
                }
            },
            styles: {
                display: 'inline-block',
                position: 'center',
                width: '50%',
                height: '50%',
                background: 'white'
            }
        });
        this.layout.resize(this.w, this.h);
        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const ImageLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
