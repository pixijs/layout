import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { POSITION } from '../utils/constants';

const args = {
    title: 'Window Title',
    position: POSITION
};

const assets = {
    window: 'window.png'
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
        const { title } = this.params;
        const bg = Sprite.from(assets.window);

        this.layout = new Layout({
            id: 'root',
            content: [
                {
                    id: 'title',
                    content: title,
                    styles: {
                        textAlign: 'center',
                        color: 'white',
                        position: 'topCenter',
                        padding: 10
                    }
                }
            ],
            styles: {
                ...this.params,
                background: bg
            }
        });

        this.view.addChild(this.layout);
        this.resize(window.innerWidth, window.innerHeight);
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
