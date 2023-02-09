import { FancyButton, ScrollBox } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { LOREM_TEXT, POSITION } from '../utils/constants';
import { Text } from '@pixi/text';
import { Styles } from '../utils/types';

const args = {
    title: 'Warning',
    scale: 0.5,
    position: POSITION
};

const assets = {
    window: 'Window/Window.png',
    substrate: 'Window/SmallSubstrate.png',
    ribbon: 'Window/Ribbon.png',
    button: 'Buttons/Button.png',
    buttonHover: 'Buttons/Button-hover.png',
    buttonDown: 'Buttons/Button-pressed.png',
    smallButton: 'Buttons/SmallButton.png',
    smallButtonHover: 'Buttons/SmallButton-hover.png',
    smallButtonDown: 'Buttons/SmallButton-pressed.png',
    closeIcon: 'Icons/CloseIcon.png',
    globalBG: 'Examples/BG.png'
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

        substrate.scale.set(1.2);

        this.layout = new Layout({
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
                    content: LOREM_TEXT,
                    // new ScrollBox({
                    //     type: 'vertical',
                    //     width: 600,
                    //     height: 318,
                    //     items: [new Text(LOREM_TEXT, { fill: 'white', fontSize: 34 })]
                    // })
                    styles: {
                        width: '75%',
                        height: '45%',
                        overflow: 'hidden',
                        fontSize: 53,
                        color: 'white',
                        position: 'center',
                        stroke: 0xefcf6f,
                        strokeThickness: 5
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
                            stroke: 0x94dd30,
                            strokeThickness: 10
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
                            stroke: 0x94dd30,
                            strokeThickness: 10
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

        this.view.addChild(this.layout);
        this.resize(window.innerWidth, window.innerHeight);
    }

    resize(w: number, h: number)
    {
        this.layout?.resize(w, h);
    }
}

export const WindowLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
