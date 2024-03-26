import { Container, Sprite } from 'pixi.js';
import { FancyButton } from '@pixi/ui';
import { Layout } from '../../Layout';
import { toolTip } from '../components/ToolTip';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const assets = {
    energy: 'Icons/EnergyIcon.png',
    gem: 'Icons/gemIcon.png',
    star: 'Icons/StarIcon.png',
    button: 'Buttons/SmallButton.png',
    buttonHover: 'Buttons/SmallButton-hover.png',
    buttonDown: 'Buttons/SmallButton-pressed.png',
    plus: 'Icons/PlusIcon.png',
    minus: 'Icons/MinusIcon.png',
};

const args = {
    padding: 10,
    maxWidth: 95,
    maxHeight: 40,
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
        this.addTooltip(
            `'+' and '-' buttons will change padding of the 'gem' layout.\n`
        );

        preloadAssets(Object.values(assets)).then(() =>
            this.createLayout(props)
        );
    }

    createLayout({ padding, maxWidth, maxHeight }: any)
    {
        const addButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            icon: assets.plus,
            iconOffset: { y: -7 },
        });

        const removeButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            icon: assets.minus,
            iconOffset: { y: -7 },
        });

        const buttonsScale = 0.5;

        const energy = Sprite.from(assets.energy);
        const gem = Sprite.from(assets.gem);
        const star = Sprite.from(assets.star);

        this.layout = new Layout({
            id: 'root',
            content: {
                items: {
                    content: {
                        energy: {
                            content: energy,
                            styles: {
                                padding: 10,
                            },
                        },
                        gem: {
                            content: gem,
                            styles: {
                                padding,
                                background: 'red',
                            },
                        },
                        star: {
                            content: star,
                            styles: {
                                padding: 10,
                            },
                        },
                    },
                    styles: {
                        background: 'black',
                        position: 'center',
                        borderRadius: 20,
                        maxWidth: `${maxWidth}%`,
                        maxHeight: `${maxHeight}%`,
                    },
                },
                controls: {
                    content: [addButton, removeButton],
                    styles: {
                        position: 'bottomCenter',
                        scale: buttonsScale,
                        marginBottom: 100,
                    },
                },
            },
            styles: {
                position: 'center',
                width: '100%',
                height: '100%',
            },
        });

        const gemLayout: Layout = this.layout.content.getByID('gem') as Layout;

        const gemLayoutStyle = gemLayout.style;

        if (gemLayoutStyle)
        {
            addButton.onPress.connect(() =>
            {
                const padding = gemLayoutStyle.padding;

                if (padding !== undefined)
                {
                    gemLayout.setStyles({
                        padding: padding + 10,
                    });
                }
            });

            removeButton.onPress.connect(() =>
            {
                const padding = gemLayoutStyle.padding;

                if (padding !== undefined)
                {
                    gemLayout.setStyles({
                        padding: padding - 10 < 0 ? 0 : padding - 10,
                    });
                }
            });
        }

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

export const UpdateStyles = (params: any) => new LayoutStory(params);

export default {
    title: 'Dynamic',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
