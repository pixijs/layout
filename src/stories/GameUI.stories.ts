import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { POSITION } from '../utils/constants';
import { defaultTextStyle } from './styles/text';

const args = {
    title: 'Settings',
    scale: 0.5,
    position: POSITION
};

const assets = {
    window: 'Window/Window.png',
    ribbon: 'Window/Ribbon.png'
};

class LayoutStory
{
    private layout!: Layout;
    private params: any;
    view = new Container();

    constructor(params: any)
    {
        this.params = params;

        preloadAssets(Object.values(assets)).then(() => this.createLayout());
    }

    createLayout()
    {
        const { title, scale } = this.params;

        this.layout = new Layout({
            id: 'bg',
            content: {
                id: 'ribbon',
                content: {
                    id: 'title',
                    content: title,
                    styles: {
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 70,
                        paddingTop: 15,
                        fontWeight: 'bold',
                        dropShadow: true,
                        dropShadowAlpha: 0.5,
                        dropShadowDistance: 0,
                        dropShadowBlur: 5
                    }
                },
                styles: {
                    background: Sprite.from(assets.ribbon),
                    position: 'centerTop',
                    marginTop: -53 // offset of the ribbon
                }
            },
            styles: {
                ...this.params,
                background: Sprite.from(assets.window),
                marginTop: 53 * scale // offset of the ribbon should take into account the scale
            }
        });

        this.view.addChild(this.layout);
        this.layout?.resize(window.innerWidth, window.innerHeight);
    }

    resize(w: number, h: number)
    {
        this.layout?.resize(w, h);
    }
}

export const GameUI = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
