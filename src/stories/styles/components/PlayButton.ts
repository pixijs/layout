import { Layout } from '@pixi/layout';
import { FancyButton } from '@pixi/ui';
import { frontEnd } from '../../../../plugins/FrontEnd';
import { i18n } from '../../../../plugins/I18n';
import { Text } from '@pixi/text';
import { game } from '../../../game/Game';
import { state } from '../../../../plugins/State';

export class PlayButton extends Layout {
    constructor() {
        const playButton = new FancyButton({
            defaultView: `images/${frontEnd.theme}/playButton.png`,
            text: new Text(i18n('play'), {
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

        playButton.onPress.connect(() => {
            for (let i = 0; i < state.balls; i++) {
                game.addBall();
            }
        });

        super({
            content: playButton,
            styles: {
                width: '100%',

                marginBottom: 30,

                landscape: {
                    position: 'bottomCenter',
                    marginTop: 0,
                    marginRight: 0,
                    maxWidth: '95%',
                    maxHeight: 150,
                    height: 75,
                },
                portrait: {
                    position: 'topRight',
                    marginRight: 10,
                    marginTop: 119,
                    maxWidth: '40%',
                    maxHeight: 156,
                    height: 75,
                },
            },
        });
    }
}
