import { Button } from '@pixi/ui';
import { Layout } from '../../../Layout';

export class ModeSwitcher extends Layout
{
    private autoButton!: Button;
    private manualButton!: Button;

    constructor()
    {
        super({
            content: {
                manual: {
                    content: {
                        text: {
                            content: 'manual',
                            styles: {
                                position: 'center',
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
                auto: {
                    content: {
                        text: {
                            content: 'auto',
                            styles: {
                                position: 'center',
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

        const manualButton = this.getChildByID('manual') as Layout;
        const autoButton = this.getChildByID('auto') as Layout;

        this.manualButton = new Button(manualButton);
        this.autoButton = new Button(autoButton);

        this.manualButton.onPress.connect(() =>
        {
            console.log('manual');
        });

        this.autoButton.onPress.connect(() =>
        {
            console.log('auto');
        });
    }
}
