import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';
import { FancyButton } from '@pixi/ui';

const assets = {
    energy: 'Icons/EnergyIcon.png',
    gem: 'Icons/gemIcon.png',
    star: 'Icons/StarIcon.png',
    button: 'Buttons/SmallButton.png',
    buttonHover: 'Buttons/SmallButton-hover.png',
    buttonDown: 'Buttons/SmallButton-pressed.png',
    plus: 'Icons/PlusIcon.png',
    minus: 'Icons/MinusIcon.png'
};

const args = {
    padding: 30,
    maxWidth: 95
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
        this.addTooltip(`'+' and '-' buttons will change the size of 'gem' sprite and update the layout.`);

        preloadAssets(Object.values(assets))
            .then(() => preloadAssets(Object.values(assets)))
            .then(() => this.createLayout(props));
    }

    createLayout({ padding, maxWidth }: any)
    {
        const addButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            icon: assets.plus,
            iconOffset: { y: -7 }
        });

        const removeButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            icon: assets.minus,
            iconOffset: { y: -7 }
        });

        const buttonsScale = 0.5;

        const energy = Sprite.from(assets.energy);
        const gem = Sprite.from(assets.gem);
        const star = Sprite.from(assets.star);

        this.layout = new Layout({
            id: 'root',
            content: {
                icons: {
                    content: [energy, gem, star],
                    styles: {
                        position: 'center',
                        padding,
                        maxWidth: `${maxWidth}%`,
                        background: 'black',
                        borderRadius: 20,
                    }
                },
                controls: {
                    content: [addButton, removeButton],
                    styles: {
                        position: 'bottomCenter',
                        scale: buttonsScale,
                        marginBottom: -20
                    }
                },
            },
            styles: {
                position: 'center',
                width: '100%',
                height: 250,
            }
        });

        const iconsLayout = this.layout.content.getByID('icons')?.layout;

        addButton.onPress.connect(() =>
        {
            gem.scale.set(gem.scale._x + 0.1);
            // after resize we need to update the layout tree manually,
            // as layout will automatically update on parent resize, but no on child resize
            iconsLayout?.updateParents();
        });

        removeButton.onPress.connect(() =>
        {
            gem.scale.set(gem.scale._x - 0.1 > 0 ? gem.scale._x - 0.1 : 0);
            // after resize we need to update the layout tree manually,
            // as layout will automatically update on parent resize, but no on child resize
            iconsLayout?.updateParents();
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

export const ResizePixiInstance = (params: any) => new LayoutStory(params);

export default {
    title: 'Dynamic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
