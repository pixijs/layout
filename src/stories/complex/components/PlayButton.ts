import { FancyButton } from '@pixi/ui';
import { Text } from '@pixi/text';
import { Layout } from '../../../Layout';

export class PlayButton extends Layout
{
    constructor()
    {
        const playButton = new FancyButton({
            defaultView: 'Buttons/Button.png',
            text: new Text('play', {
                fontFamily: 'CyberspaceRaceway',
                fontSize: 13,
                fill: 0xffffff,
                dropShadow: true,
                dropShadowColor: 0x000000,
                dropShadowAlpha: 0.25,
                dropShadowDistance: 1,
                dropShadowAngle: 90,
            }),
            textOffset: {
                y: -4,
            },
        });

        super({
            content: {
                content: playButton,
                styles: {
                    position: 'center',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }
            },
            styles: {
                background: 'red',
                height: playButton.height,
                width: playButton.width,
                marginBottom: 30,

                landscape: {
                    position: 'bottomCenter',
                    marginTop: 0,
                    marginRight: 0,
                    maxWidth: '95%',
                    maxHeight: 100,
                },
                portrait: {
                    position: 'topRight',
                    marginRight: 10,
                    marginTop: 119,
                    maxWidth: '40%',
                    maxHeight: 156,
                },
            },
        });
    }
}
