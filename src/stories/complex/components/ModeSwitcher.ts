import { Button } from '@pixi/ui';
import { Layout } from '../../../Layout';

export class ModeSwitcher extends Layout
{
    constructor()
    {
        super({
            content: {
                leftButton: {
                    content: {
                        text: {
                            content: 'Left',
                            styles: {
                                position: 'center',
                                color: 'red'
                            },
                        },
                        bottomBorderRight: {
                            content: ' ',
                            styles: {
                                position: 'bottomCenter',
                                width: '100%',
                                height: 4,
                                background: 'red',
                            },
                        },
                    },
                    styles: {
                        width: '50%',
                        height: '100%',
                        background: 0x12081c,
                    },
                },
                rightButton: {
                    content: {
                        text: {
                            content: 'Right',
                            styles: {
                                position: 'center',
                                color: 'blue',
                            },
                        },
                        bottomBorderLeft: {
                            content: ' ',
                            styles: {
                                position: 'bottomCenter',
                                width: '100%',
                                height: 4,
                                background: 'blue',
                            },
                        },
                    },
                    styles: {
                        position: 'rightTop',
                        width: '50%',
                        height: '100%',
                        background: 0x12081c,
                    },
                },
            },
            styles: {
                width: '100%',
                landscape: {
                    height: 63,
                },
                portrait: {
                    height: 48,
                },
            },
        });

        const leftButtonView = this.getChildByID('leftButton') as Layout;
        const rightButtonView = this.getChildByID('rightButton') as Layout;

        const leftButton = new Button(leftButtonView);
        const rightButton = new Button(rightButtonView);

        const leftButtonBottomBorder = this.getChildByID('bottomBorderLeft') as Layout;
        const rightButtonBottomBorder = this.getChildByID('bottomBorderRight') as Layout;

        leftButtonBottomBorder.setStyles({ visible: false });
        rightButtonBottomBorder.setStyles({ visible: true });

        leftButton.onPress.connect(() =>
        {
            leftButtonBottomBorder.setStyles({ visible: false });
            rightButtonBottomBorder.setStyles({ visible: true });
        });

        rightButton.onPress.connect(() =>
        {
            leftButtonBottomBorder.setStyles({ visible: true });
            rightButtonBottomBorder.setStyles({ visible: false });
        });
    }
}
