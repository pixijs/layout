import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { FancyButton } from '@pixi/ui';
import { Layout } from '../../Layout';
import { toolTip } from '../components/ToolTip';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const testAssets = {
    energy: 'Icons/EnergyIcon.png',
    gem: 'Icons/gemIcon.png',
    star: 'Icons/Star.png',
};

const assets = {
    button: 'Buttons/SmallButton.png',
    buttonHover: 'Buttons/SmallButton-hover.png',
    buttonDown: 'Buttons/SmallButton-pressed.png',
    plus: 'Icons/PlusIcon.png',
    minus: 'Icons/MinusIcon.png'
};

const args = {
    image: Object.keys(testAssets),
    padding: 30,
    maxWidth: 95,
    amount: 2
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
        this.addTooltip(`'+' and '-' buttons will add or remove sprites to the layout.\n`);

        preloadAssets(Object.values(assets))
            .then(() => preloadAssets(Object.values(testAssets)))
            .then(() => this.createLayout(props));
    }

    createLayout({ image, padding, maxWidth, amount }: any)
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

        this.layout = new Layout({
            id: 'root',
            content: {
                icons: {
                    content: new Array(amount).fill(null).map(() => Sprite.from(testAssets[image])),
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
                }
            },
            styles: {
                position: 'center',
                width: '100%',
                height: 250,
            }
        });

        const iconsLayout: Layout = this.layout.content.getByID('icons') as Layout;

        addButton.onPress.connect(() =>
        {
            iconsLayout.addContent(Sprite.from(testAssets[image]));
        });

        removeButton.onPress.connect(() =>
        {
            const icons = iconsLayout.content.children;

            if (icons.size > 0)
            {
                iconsLayout.removeChildByID(icons.entries().next().value[0]);
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

export const AddRemoveContent = (params: any) => new LayoutStory(params);

export default {
    title: 'Dynamic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
