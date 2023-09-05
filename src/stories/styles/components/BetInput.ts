import { state } from '../../../../plugins/State';
import { InputField } from '../../../../ui/components/InputField';
import { blockUIWithDelay } from '../../../../utils/helpers';
import { i18n } from '../../../../plugins/I18n';
import { frontEnd } from '../../../../plugins/FrontEnd';
import { Layout } from '@pixi/layout';
import { Text } from '@pixi/text';
import { FancyButton } from '@pixi/ui';
import { spriteFromGraphics } from '../../../../utils/render';
import { Graphics } from '@pixi/graphics';

export class BetInput extends Layout {
    constructor() {
        super({
            styles: {
                position: 'center',
                display: 'block',
                width: '100%',
                height: '100%',
            },
        });

        const betInput = new InputField({
            width: 100,
            height: 45,
            value: state.betAmount.toString(),
            allowedSymbols: '0123456789.,',
        });

        this.addContent(betInput);

        const doubleButton = this.getRoundButton('x2', () => {
            state.setBet(state.betAmount * 2);
        });

        this.addContent({
            content: doubleButton,
            styles: {
                position: 'rightCenter',
                marginTop: -2,
                marginRight: 20,
            },
        });

        const halfButton = this.getRoundButton('1/2', () => {
            state.setBet(state.betAmount / 2);
        });

        this.addContent({
            content: halfButton,
            styles: {
                position: 'rightCenter',
                marginTop: -2,
                marginRight: 60,
            },
        });

        state.subscribe(({ bet }) => {
            betInput.value = (bet || 0).toString();
        });

        betInput.onEnter.connect((value) => {
            const val = Number(value);
            // const { betAmount } = state;

            // if (val >= state.maxBetAmount) {
            //     sounds.play('ui/bet_max');
            // } else if (val <= betAmount) {
            //     sounds.play('ui/bet_down');
            // } else {
            //     sounds.play('ui/bet_up');
            // }

            if (state.data.phase === 'idle') {
                if (!value) {
                    blockUIWithDelay();
                } else if (val > state.maxBetAmount) {
                    blockUIWithDelay();

                    if (state.maxBetAmount > 0) {
                        frontEnd.showError(i18n('maxBetError', { max: state.maxBetAmount }));
                    }
                } else if (val < state.minBetAmount) {
                    blockUIWithDelay();

                    frontEnd.showError(i18n('minBetError', { min: state.minBetAmount }));
                }

                const betAmount = Number(value);

                if (state.data.userBalance !== undefined && state.data.userBalance < betAmount) {
                    frontEnd.showNoBalancePopup();
                }
            }

            betInput.value = state.betAmount.toString();
        });

        betInput.onChange.connect((value) => {
            const val = Number(value);

            state.setBet(val);
        });
    }

    private getRoundButton(text: string, onclick: () => void): FancyButton {
        const textView = new Text(text, {
            fontFamily: 'BlenderPro',
            fontSize: 14,
            fill: 0xa8ffef,
        });

        const button = new FancyButton({
            defaultView: spriteFromGraphics(
                new Graphics().lineStyle(1, 0xa8ffef).beginFill(0x0a0c11).drawCircle(0, 0, 15),
            ),
            hoverView: spriteFromGraphics(
                new Graphics().lineStyle(1, 0xf0196c).beginFill(0x0a0c11).drawCircle(0, 0, 15),
            ),
            text: textView,
        });

        button.onHover.connect(() => {
            textView.style.fill = 0xf0196c;
        });

        button.onOut.connect(() => {
            textView.style.fill = 0xa8ffef;
        });

        button.onPress.connect(() => {
            onclick();
        });

        return button;
    }
}
