import { FancyButton } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { POSITION } from '../utils/constants';
import { Text } from '@pixi/text';

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

        this.layout = new Layout({
            id: 'root',
            content: [
                {
                    id: 'ribbon',
                    content: {
                        id: 'title',
                        content: title.toUpperCase(),
                        styles: {
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 55,
                            fontWeight: 'bold',
                            stroke: 0x94dd30,
                            strokeThickness: 10,
                            wordWrap: false,
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
                        }
                    }),
                    styles: {
                        scale: 0.8,
                        position: 'rightTop',
                        display: 'inlineBlock'
                    }
                },
                {
                    id: 'windowContent',
                    content: [
                        {
                            id: 'gfxController',
                            content: 'GFX',
                            styles: {
                                background: Sprite.from(assets.substrate),
                                maxWidth: '100%'
                            }
                        },
                        {
                            id: 'bgmController',
                            content: 'BGM',
                            styles: {
                                background: Sprite.from(assets.substrate),
                                maxWidth: '100%'
                            }
                        },
                        {
                            id: 'optionsBottomLeft',
                            content: [
                                {
                                    id: 'sfx',
                                    content: 'SFX'
                                },
                                {
                                    id: 'gpu',
                                    content: 'GPU'
                                }
                            ],
                            styles: {
                                width: '50%'
                            }
                        },
                        {
                            id: 'optionsBottomRight',
                            content: [
                                {
                                    id: 'antiAliasing',
                                    content: 'ANTI-ALIASING'
                                },
                                {
                                    id: 'subtitles',
                                    content: 'SUBTITLES'
                                },
                                {
                                    id: 'cutscenes',
                                    content: 'CUTSCENES'
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
