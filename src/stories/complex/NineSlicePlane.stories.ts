import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Texture } from '@pixi/core';

import { NineSlicePlane } from '@pixi/mesh-extras';

const args = {
    width: 350,
    height: 350,
};

const testAssets = {
    ribbon: 'Window/Ribbon.png',
};

class LayoutStory
{
    private layout: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props: typeof args)
    {
        preloadAssets(Object.values(testAssets)).then(() => this.createLayout(props));
    }

    createLayout(props: typeof args)
    {
        const texture = Texture.from(testAssets.ribbon);

        const nineSlicePlane = new NineSlicePlane(texture, 315, 64, 112, 73);

        // Component usage
        this.layout = new Layout({
            id: 'root',
            content: 'Title',
            styles: {
                color: 0xffffff,
                fontSize: 44,
                dropShadow: true,
                dropShadowColor: 0x000000,
                dropShadowBlur: 4,
                dropShadowDistance: 0,
                dropShadowAlpha: 0.5,
                textAlign: 'center',
                maxWidth: '100%',
                maxHeight: '100%',
                width: props.width,
                height: props.height,
                background: nineSlicePlane,
                position: 'center',
                overflow: 'hidden',
                borderRadius: 20,
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
    }
}

export const UsingNineSlicePlane = (params: any) => new LayoutStory(params);

export default {
    title: 'Complex',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
