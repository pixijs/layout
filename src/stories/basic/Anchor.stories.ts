import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Layout } from '../../Layout';
import { POSITION } from '../../utils/constants';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const assets = {
    avatar: 'avatar-01.png'
};

const args = {
    anchorX: 0.5,
    anchorY: 0.5,
    rotate: true,
    position: POSITION
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;
    private rotate: boolean;

    constructor(props)
    {
        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ anchorX, anchorY, position, rotate }: any)
    {
        this.rotate = rotate;
        const image = Sprite.from(assets.avatar);

        image.anchor.set(0.5);

        this.layout = new Layout({
            id: 'root',
            content: {
                id: 'image',
                content: image,
                styles: {
                    position,
                    anchorX,
                    anchorY,
                    marginLeft: image.width / 2,
                    marginTop: image.height / 2,
                    opacity: 0.9
                }
            },
            styles: {
                position: 'center',
                width: image.width,
                height: image.height,
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

    update(delta)
    {
        if (!this.rotate) return;

        if (this.layout)
        {
            const image = this.layout.getChildByID('image');

            if (image && image.layout)
            {
                image.layout.content.firstChild.rotation += 0.01 * delta;
            }
        }
    }
}

export const AnchorSettings = (params: any) => new LayoutStory(params);

export default {
    title: 'Basic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
