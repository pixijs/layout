import { FancyButton } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { POSITION } from '../utils/constants';
import { Text } from '@pixi/text';
import { Styles } from '../utils/types';

const args = {
    title: 'Settings',
    scale: 0.5,
    position: POSITION
};

const assets = {
    window: 'Window/Window.png',
    ribbon: 'Window/Ribbon.png',
    button: 'Buttons/Button.png',
    buttonHover: 'Buttons/Button-hover.png',
    buttonDown: 'Buttons/Button-pressed.png',
    smallButton: 'Buttons/SmallButton.png',
    smallButtonHover: 'Buttons/SmallButton-hover.png',
    smallButtonDown: 'Buttons/SmallButton-pressed.png',
    closeIcon: 'Icons/CloseIcon.png',
    substrate: 'Window/Substrate.png'
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
        const { title, scale, position } = this.params;
        const ribbonOffset = 53;
        const applyButtonOffset = 70;
        const textStyles: Styles = {
            textAlign: 'center',
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            stroke: 0x94dd30,
            strokeThickness: 10,
            wordWrap: false
        };

        this.layout = new Layout({
            id: 'root',
            content: [
                // ribbon
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
                // closeButton
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
                        display: 'inlineBlock'
                    }
                },
                // windowContent
                {
                    id: 'windowContent',
                    content: [
                        // gfxController
                        {
                            id: 'gfxController',
                            content: [
                                {
                                    id: 'gfxControllerLabel',
                                    content: 'GFX',
                                    styles: {
                                        ...textStyles,
                                        stroke: 0xefcf6f,
                                        strokeThickness: 15,
                                        width: '20%',
                                        position: 'centerLeft'
                                    }
                                }
                            ],
                            styles: {
                                background: Sprite.from(assets.substrate),
                                maxWidth: '100%'
                            }
                        },
                        // bgmController
                        {
                            id: 'bgmController',
                            content: [
                                {
                                    id: 'gfxControllerLabel',
                                    content: 'GFX',
                                    styles: {
                                        ...textStyles,
                                        stroke: 0xefcf6f,
                                        strokeThickness: 15,
                                        width: '20%',
                                        position: 'centerLeft'
                                    }
                                }
                            ],
                            styles: {
                                background: Sprite.from(assets.substrate),
                                maxWidth: '100%'
                            }
                        },
                        // optionsBottomLeft
                        {
                            id: 'optionsBottomLeft',
                            content: [
                                // sfxContainer
                                {
                                    id: 'sfxContainer',
                                    content: [
                                        {
                                            id: 'sfx',
                                            content: 'SFX',
                                            styles: {
                                                ...textStyles,
                                                stroke: 0xefcf6f,
                                                strokeThickness: 15,
                                                width: '20%'
                                            }
                                        },
                                        {
                                            id: 'sfxSWITCH',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.4
                                            }),
                                            styles: {
                                                display: 'inlineBlock',
                                                paddingLeft: 90,
                                                paddingTop: 15
                                            }
                                        }
                                    ]
                                },
                                // gpuContainer
                                {
                                    id: 'gpuContainer',
                                    content: [
                                        {
                                            id: 'gpu',
                                            content: 'GPU',
                                            styles: {
                                                ...textStyles,
                                                stroke: 0xefcf6f,
                                                strokeThickness: 15,
                                                width: '20%'
                                            }
                                        },
                                        {
                                            id: 'gpuSWITCH',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.4
                                            }),
                                            styles: {
                                                display: 'inlineBlock',
                                                paddingLeft: 90,
                                                paddingTop: 15
                                            }
                                        }
                                    ]
                                }
                            ],
                            styles: {
                                width: '50%'
                            }
                        },
                        // optionsBottomRight
                        {
                            id: 'optionsBottomRight',
                            content: [
                                // antiAliasing
                                {
                                    id: 'antiAliasing',
                                    content: 'ANTI-ALIASING',
                                    styles: {
                                        ...textStyles,
                                        stroke: 0xefcf6f,
                                        fontSize: 40
                                    }
                                },
                                // antiAliasingSWITCH
                                {
                                    id: 'antiAliasingSWITCH',
                                    content: [
                                        // antiAliasing2x
                                        {
                                            id: 'antiAliasing2x',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.3,
                                                text: '2x'
                                            }),
                                            styles: {
                                                display: 'inline',
                                                width: '33%'
                                            }
                                        },
                                        // antiAliasing4x
                                        {
                                            id: 'antiAliasing4x',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.3,
                                                text: '4x'
                                            }),
                                            styles: {
                                                display: 'inline',
                                                width: '33%'
                                            }
                                        },
                                        // antiAliasing16x
                                        {
                                            id: 'antiAliasing16x',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.3,
                                                text: '16x'
                                            }),
                                            styles: {
                                                display: 'inline',
                                                width: '33%'
                                            }
                                        }
                                    ]
                                },
                                // subtitlesContainer
                                {
                                    id: 'subtitlesContainer',
                                    content: [
                                        // subtitles
                                        {
                                            id: 'subtitles',
                                            content: 'SUBTITLES',
                                            styles: {
                                                ...textStyles,
                                                stroke: 0xefcf6f,
                                                width: '20%',
                                                fontSize: 30
                                            }
                                        },
                                        // subtitlesSWITCH
                                        {
                                            id: 'subtitlesSWITCH',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.3
                                            }),
                                            styles: {
                                                display: 'inlineBlock',
                                                paddingLeft: 175
                                            }
                                        }
                                    ],
                                    styles: {
                                        paddingTop: 20
                                    }
                                },
                                // cutscenesContainer
                                {
                                    id: 'cutscenesContainer',
                                    content: [
                                        // cutscenes
                                        {
                                            id: 'cutscenes',
                                            content: 'CUTSCENES',
                                            styles: {
                                                ...textStyles,
                                                stroke: 0xefcf6f,
                                                width: '20%',
                                                fontSize: 30
                                            }
                                        },
                                        // subtitlesSWITCH
                                        {
                                            id: 'subtitlesSWITCH',
                                            content: new FancyButton({
                                                defaultView: assets.button,
                                                scale: 0.3
                                            }),
                                            styles: {
                                                display: 'inlineBlock',
                                                paddingLeft: 175
                                            }
                                        }
                                    ],
                                    styles: {
                                        paddingTop: 20
                                    }
                                }
                            ],
                            styles: {
                                display: 'inlineBlock',
                                width: '50%'
                            }
                        }
                    ],
                    styles: {
                        width: '80%',
                        height: '70%',
                        position: 'center'
                    }
                },
                // applyButton
                {
                    id: 'applyButton',
                    content: new FancyButton({
                        defaultView: assets.button,
                        hoverView: assets.buttonHover,
                        pressedView: assets.buttonDown,
                        text: new Text('APPLY', {
                            fill: 0xffffff,
                            fontSize: 55,
                            fontWeight: 'bold',
                            stroke: 0x94dd30,
                            strokeThickness: 10
                        })
                    }),
                    styles: {
                        display: 'inlineBlock',
                        position: 'centerBottom',
                        marginBottom: -applyButtonOffset
                    }
                }
            ],
            styles: {
                scale,
                position,
                background: Sprite.from(assets.window),
                marginTop: ribbonOffset * scale, // offset of the ribbon should take into account the scale
                marginBottom: applyButtonOffset * scale, // offset of the ribbon should take into account the scale
                maxWidth: '100%',
                maxHeight: '100%'
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
