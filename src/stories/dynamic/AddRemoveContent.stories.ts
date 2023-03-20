import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { toolTip } from '../components/ToolTip';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';
import { Content } from '../../utils/types';
import { FancyButton } from '@pixi/ui';

const assets = {
    energy: 'Icons/EnergyIcon.png',
    gem: 'Icons/gemIcon.png',
    star: 'Icons/Star.png',
    button: 'Buttons/SmallButton.png',
    buttonHover: 'Buttons/SmallButton-hover.png',
    buttonDown: 'Buttons/SmallButton-pressed.png',
    plus: 'Icons/PlusIcon.png',
    minus: 'Icons/MinusIcon.png'
};

const args = {
    image: Object.keys(assets),
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
        this.addTooltip(`'+' and '-' buttons will add or remove sprites to the layout.\n`);

        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ image, padding, maxWidth }: any)
    {
        const content: Array<Content> = [];

        content.push();

        this.layout = new Layout({
            id: 'root',
            content: {
                icons: {
                    content: [Sprite.from(assets[image])],
                    styles: {
                        padding
                    }
                }
            },
            styles: {
                background: 'black',
                position: 'center',
                borderRadius: 20,
                maxWidth: `${maxWidth}%`
            }
        });

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

        this.layout.addContent({
            id: 'button',
            content: {
                content: [addButton, removeButton],
                styles: {
                    scale: 0.5
                }
            },
            styles: {
                position: 'leftBottom',
                marginBottom: -addButton.height - 5
            }
        });

        const iconsLayout: Layout = this.layout.content.getByID('icons') as Layout;

        addButton.onPress.connect(() =>
        {
            iconsLayout.addContent(Sprite.from(assets[image]));
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
