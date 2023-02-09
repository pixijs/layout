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
    title: 'Warning',
    text: `${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT}`,
    health: 50,
    energy: 50
};

const assets = {
    globalBG: 'Examples/BG.png',
    menu: 'Examples/Menu.png',
    smallProgressBar: 'Progress/SmallProgressBarBG.png',
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

const textShadow = {
    dropShadow: true,
    dropShadowAlpha: 0.2,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 5
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
                        background: Sprite.from(assets.smallProgressBar),
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
                        background: Sprite.from(assets.smallProgressBar),
                        maxWidth: '45%',
                        margin: 20,
                        scale: 0.5
                    }
                },
                this.createPopup()
            ],
            styles: {
                width: '100%',
                height: '100%'
            }
        });

        this.view.addChild(this.layout);
        this.resize(window.innerWidth, window.innerHeight);
    }

    createPopup(): Layout
    {
        const { title, text } = this.params;
        const ribbonOffset = 53;
        const bottomButtonOffset = 70;

        const textStyles: Styles = {
            textAlign: 'center',
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            fontFamily: 'Skia',
            wordWrap: false,
            ...textShadow
        };

        const substrate = Sprite.from(assets.substrate);

        const scrollText = new ScrollBox({
            type: 'vertical',
            width: substrate.width * 1.15,
            height: substrate.height * 1.1,
            elementsMargin: 1,
            padding: 40,
            items: [
                new Text(text, {
                    fill: 'white',
                    fontSize: 34,
                    fontFamily: 'Skia',
                    wordWrapWidth: 700,
                    wordWrap: true,
                    ...textShadow
                })
            ],
            radius: 100
        });

        substrate.scale.set(1.2);

        const animations = {
            default: {
                props: {
                    scale: {
                        x: 1,
                        y: 1
                    }
                },
                duration: 50
            },
            hover: {
                props: {
                    scale: {
                        x: 1,
                        y: 1
                    }
                },
                duration: 50
            },
            pressed: {
                props: {
                    scale: {
                        x: 0.95,
                        y: 0.95
                    }
                },
                duration: 50
            }
        };

        const closeButton = new FancyButton({
            defaultView: assets.smallButtonDown,
            hoverView: assets.smallButtonHover,
            icon: assets.closeIcon,
            iconOffset: {
                y: -10
            },
            scale: 0.8,
            animations
        });

        closeButton.anchor.set(0.5);

        const acceptButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            text: new Text('ACCEPT', {
                fill: 0xffffff,
                fontSize: 55,
                fontFamily: 'Skia',
                fontWeight: 'bold',
                ...textShadow
            }),
            animations
        });

        const declineButton = new FancyButton({
            defaultView: assets.button,
            hoverView: assets.buttonHover,
            pressedView: assets.buttonDown,
            text: new Text('DECLINE', {
                fill: 0xffffff,
                fontSize: 55,
                fontFamily: 'Skia',
                fontWeight: 'bold',
                ...textShadow
            }),
            animations
        });

        declineButton.anchor.set(0.5);

        acceptButton.anchor.set(0.5);

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
                    content: closeButton,
                    styles: {
                        position: 'rightTop',
                        display: 'inline',
                        padding: 63
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
                        overflow: 'hidden',
                        fontSize: 53,
                        color: 'white',
                        position: 'center'
                    }
                },
                {
                    id: 'acceptButton',
                    content: acceptButton,
                    styles: {
                        display: 'inline',
                        position: 'rightBottom',
                        marginBottom: -150,
                        marginRight: -90
                    }
                },
                {
                    id: 'declineButton',
                    content: declineButton,
                    styles: {
                        display: 'inline',
                        position: 'leftBottom',
                        marginBottom: -150,
                        marginLeft: 260
                    }
                }
            ],
            styles: {
                scale: 0.8,
                position: 'center',
                background: Sprite.from(assets.window),
                marginTop: ribbonOffset, // offset of the ribbon should take into account the scale
                marginBottom: bottomButtonOffset, // offset of the ribbon should take into account the scale
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
