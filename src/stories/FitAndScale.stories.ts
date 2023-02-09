import { ProgressBar, ScrollBox, FancyButton } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Text } from '@pixi/text';
import { preloadAssets } from '../utils/helpers';
import { Graphics } from '@pixi/graphics';
import { LOREM_TEXT } from '../utils/constants';
import { Styles } from '../utils/types';

const args = {
    health: 50,
    energy: 50
};

const assets = {
    globalBG: 'Examples/BG.png',
    menu: 'Examples/Menu.png',
    bg: 'Progress/SmallProgressBarBG.png',
    fillPink: 'Progress/SmallProgress-pink.png',
    fillBlue: 'Progress/SmallProgress-blue.png',
    hard: 'Icons/HardIcon.png',
    energy: 'Icons/EnergyIcon.png',
    window: 'Window/Window.png',
    substrate: 'Window/SmallSubstrate.png',
    ribbon: 'Window/Ribbon.png',
    button: 'Buttons/Button.png',
    buttonHover: 'Buttons/Button-hover.png',
    buttonDown: 'Buttons/Button-pressed.png',
    smallButton: 'Buttons/SmallButton.png',
    smallButtonHover: 'Buttons/SmallButton-hover.png',
    smallButtonDown: 'Buttons/SmallButton-pressed.png',
    closeIcon: 'Icons/CloseIcon.png'
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
        this.layout = new Layout({
            id: 'root',
            content: [
                {
                    id: 'globalBG',
                    content: ' ',
                    styles: {
                        background: Sprite.from(assets.globalBG),
                        maxHeight: '100%',
                        position: 'leftBottom'
                    }
                },
                {
                    id: 'left',
                    content: {
                        id: 'leftProgress',
                        content: [
                            {
                                id: 'energy',
                                content: Sprite.from(assets.energy),
                                styles: {
                                    position: 'left',
                                    marginLeft: -15,
                                    marginTop: -5
                                }
                            },
                            {
                                id: 'energyProgress',
                                content: new ProgressBar({
                                    bg: new Graphics().beginFill(0x000000, 0.0001).drawRect(0, 0, 355, 50).endFill(),
                                    fill: assets.fillBlue,
                                    progress: this.params.energy
                                }),
                                styles: {
                                    marginLeft: 85,
                                    marginTop: 20
                                }
                            }
                        ]
                    },
                    styles: {
                        position: 'left',
                        background: Sprite.from(assets.bg),
                        maxWidth: '45%',
                        margin: 20,
                        scale: 0.5
                    }
                },
                {
                    id: 'right',
                    content: {
                        id: 'rightProgress',
                        content: [
                            {
                                id: 'hard',
                                content: Sprite.from(assets.hard),
                                styles: {
                                    position: 'left',
                                    marginLeft: -35
                                }
                            },
                            {
                                id: 'hardProgress',
                                content: new ProgressBar({
                                    bg: new Graphics().beginFill(0x000000, 0.0001).drawRect(0, 0, 355, 50).endFill(),
                                    fill: assets.fillPink,
                                    progress: this.params.health
                                }),
                                styles: {
                                    marginLeft: 85,
                                    marginTop: 20
                                }
                            }
                        ]
                    },
                    styles: {
                        position: 'right',
                        background: Sprite.from(assets.bg),
                        maxWidth: '45%',
                        margin: 20,
                        scale: 0.5
                    }
                },
                this.createPopup({
                    title: 'Warning',
                    scale: 0.5,
                    position: 'center'
                })
            ],
            styles: {
                width: '100%',
                height: '100%'
            }
        });

        this.view.addChild(this.layout);
        this.resize(window.innerWidth, window.innerHeight);
    }

    createPopup(params: any): Layout
    {
        const { title, scale, position } = params;
        const ribbonOffset = 53;
        const bottomButtonOffset = 70;

        const textStyles: Styles = {
            textAlign: 'center',
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            stroke: 0x94dd30,
            strokeThickness: 10,
            wordWrap: false
        };

        const substrate = Sprite.from(assets.substrate);

        const scrollText = new ScrollBox({
            type: 'vertical',
            width: substrate.width * 1.15,
            height: substrate.height * 1.1,
            elementsMargin: 1,
            padding: 40,
            items: [
                new Text(LOREM_TEXT.repeat(10), {
                    fill: 'white',
                    fontSize: 34,
                    wordWrapWidth: 700,
                    wordWrap: true,
                    dropShadow: true,
                    dropShadowAlpha: 0.2,
                    dropShadowAngle: Math.PI / 2,
                    dropShadowBlur: 5
                })
            ],
            radius: 100
        });

        substrate.scale.set(1.2);

        return new Layout({
            id: 'root',
            content: [
                {
                    id: 'ribbon',
                    content: {
                        id: 'title',
                        content: title.toUpperCase(),
                        styles: {
                            ...textStyles,
                            overflow: 'hidden',
                            position: 'centerTop',
                            marginTop: 20,
                            width: '80%'
                        }
                    },
                    styles: {
                        background: Sprite.from(assets.ribbon),
                        position: 'centerTop',
                        marginTop: -ribbonOffset // offset of the ribbon
                    }
                },
                {
                    id: 'closeButton',
                    content: new FancyButton({
                        defaultView: assets.smallButtonDown,
                        hoverView: assets.smallButtonHover,
                        icon: assets.closeIcon,
                        iconOffset: {
                            y: -10
                        },
                        scale: 0.8
                    }),
                    styles: {
                        position: 'rightTop',
                        display: 'inline'
                    }
                },
                {
                    id: 'substrate',
                    content: substrate,
                    styles: {
                        width: '85%',
                        height: '60%',
                        position: 'center'
                    }
                },
                {
                    id: 'windowContent',
                    content: {
                        id: 'text',
                        content: scrollText
                    },
                    styles: {
                        width: '80%',
                        height: '53%',
                        // background: 'red',
                        overflow: 'hidden',
                        fontSize: 53,
                        color: 'white',
                        position: 'center'
                    }
                },
                {
                    id: 'acceptButton',
                    content: new FancyButton({
                        defaultView: assets.button,
                        hoverView: assets.buttonHover,
                        pressedView: assets.buttonDown,
                        text: new Text('ACCEPT', {
                            fill: 0xffffff,
                            fontSize: 55,
                            fontWeight: 'bold',
                            dropShadow: true,
                            dropShadowAlpha: 0.2,
                            dropShadowAngle: Math.PI / 2,
                            dropShadowBlur: 5
                        })
                    }),
                    styles: {
                        display: 'inline',
                        position: 'rightBottom',
                        marginBottom: -bottomButtonOffset,
                        marginRight: 80
                    }
                },
                {
                    id: 'declineButton',
                    content: new FancyButton({
                        defaultView: assets.button,
                        hoverView: assets.buttonHover,
                        pressedView: assets.buttonDown,
                        text: new Text('DECLINE', {
                            fill: 0xffffff,
                            fontSize: 55,
                            fontWeight: 'bold',
                            dropShadow: true,
                            dropShadowAlpha: 0.2,
                            dropShadowAngle: Math.PI / 2,
                            dropShadowBlur: 5
                        })
                    }),
                    styles: {
                        display: 'inline',
                        position: 'leftBottom',
                        marginBottom: -bottomButtonOffset,
                        marginLeft: 80
                    }
                }
            ],
            styles: {
                scale,
                position,
                background: Sprite.from(assets.window),
                marginTop: ribbonOffset * scale, // offset of the ribbon should take into account the scale
                marginBottom: bottomButtonOffset * scale, // offset of the ribbon should take into account the scale
                maxWidth: '100%',
                maxHeight: '100%'
            }
        });
    }

    resize(w: number, h: number)
    {
        this.layout?.resize(w, h);
    }
}

export const FitAndScale = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
