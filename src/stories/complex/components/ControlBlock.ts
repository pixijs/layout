// import { Text } from '@pixi/text';

// import { RadioGroup } from '@pixi/ui';
import { Layout } from '../../../Layout';
import { BlockWithBorder } from './BlockWithBorder';
import { ModeSwitcher } from './ModeSwitcher';
// import { state } from '../../../plugins/State';
// import { blocksWidth, getSquareCheckbox } from './helpers';
// import { Slider } from './components/Slider';
// import { Sprite } from '@pixi/sprite';
import { PlayButton } from './PlayButton';

export class ControlBlock extends Layout
{
    constructor()
    {
        super({
            styles: {
                width: '100%',
                height: '100%',
            },
        });

        this.addContent(new BlockWithBorder('bet'));
        this.addContent(new ModeSwitcher());
        this.addContent(new PlayButton());

        // this.addRiskBlock();
        // this.addRowsBlock();
        // this.addBallsBlock();
        // this.addBetPerBallBlock();
    }

    // private addRiskBlock() {
    //     const lowButton = getSquareCheckbox(i18n('low'));
    //     const mediumButton = getSquareCheckbox(i18n('medium'));
    //     const highButton = getSquareCheckbox(i18n('high'));

    //     const radioGroup = new RadioGroup({
    //         selectedItem: state.risk === 'low' ? 0 : state.risk === 'medium' ? 1 : 2,
    //         items: [lowButton, mediumButton, highButton],
    //         type: 'horizontal',
    //         elementsMargin: 25,
    //     });

    //     radioGroup.onChange.connect((item) => {
    //         switch (item) {
    //             case 0:
    //                 state.risk = 'low';
    //                 break;
    //             case 1:
    //                 state.risk = 'medium';
    //                 break;
    //             case 2:
    //                 state.risk = 'high';
    //                 break;
    //         }
    //     });

    //     this.addContent({
    //         content: {
    //             risk: {
    //                 content: i18n('risk'),
    //                 styles: {
    //                     fontFamily: 'BlenderPro',
    //                     fontSize: 12,
    //                     color: 0xa8ffef,
    //                     display: 'block',

    //                     landscape: {
    //                         marginTop: 50,
    //                     },
    //                     portrait: {
    //                         marginTop: 17,
    //                     },
    //                 },
    //             },
    //             riskInput: {
    //                 content: radioGroup,
    //                 styles: {
    //                     display: 'block',

    //                     landscape: {
    //                         marginTop: 50,
    //                         marginLeft: 0,
    //                     },
    //                     portrait: {
    //                         marginTop: -23,
    //                         marginLeft: 40,
    //                     },
    //                 },
    //             },
    //         },
    //         styles: {
    //             position: 'centerTop',
    //             width: blocksWidth,
    //             maxWidth: '95%',
    //             height: 40,

    //             landscape: {
    //                 marginTop: 130,
    //                 marginLeft: 0,
    //             },
    //             portrait: {
    //                 marginTop: 225,
    //                 marginLeft: -40,
    //             },
    //         },
    //     });
    // }

    // private addRowsBlock() {
    //     const rowsInput = new Slider(10, 13, state.rows);

    //     rowsInput.slider.onUpdate.connect((value) => {
    //         state.rows = Math.round(value);
    //     });

    //     this.addContent({
    //         content: {
    //             rows: {
    //                 content: i18n('rows'),
    //                 styles: {
    //                     fontFamily: 'BlenderPro',
    //                     fontSize: 12,
    //                     color: 0xa8ffef,
    //                     display: 'block',
    //                     marginTop: 90,
    //                 },
    //             },
    //             rowsInput: {
    //                 content: rowsInput,
    //                 styles: {
    //                     display: 'block',

    //                     landscape: {
    //                         marginLeft: 0,
    //                         marginTop: 85,
    //                     },
    //                     portrait: {
    //                         marginLeft: 40,
    //                         marginTop: 40,
    //                     },
    //                 },
    //             },
    //         },
    //         styles: {
    //             position: 'centerTop',
    //             width: blocksWidth,
    //             maxWidth: '95%',
    //             height: 50,

    //             landscape: {
    //                 marginTop: 190,
    //                 marginLeft: 0,
    //             },
    //             portrait: {
    //                 marginTop: 70,
    //                 marginLeft: -40,
    //             },
    //         },
    //     });
    // }

    // private addBallsBlock() {
    //     const ballsInput = new Slider(1, 34, state.balls);

    //     ballsInput.slider.onUpdate.connect((value) => {
    //         state.balls = Math.round(value);
    //     });

    //     this.addContent({
    //         content: {
    //             balls: {
    //                 content: i18n('balls'),
    //                 styles: {
    //                     fontFamily: 'BlenderPro',
    //                     fontSize: 12,
    //                     color: 0xa8ffef,
    //                     display: 'block',

    //                     landscape: {
    //                         marginTop: 155,
    //                     },
    //                     portrait: {
    //                         marginTop: 160,
    //                     },
    //                 },
    //             },
    //             ballsInput: {
    //                 content: ballsInput,
    //                 styles: {
    //                     display: 'block',

    //                     landscape: {
    //                         marginTop: 150,
    //                         marginLeft: 0,
    //                     },
    //                     portrait: {
    //                         marginTop: 110,
    //                         marginLeft: 40,
    //                     },
    //                 },
    //             },
    //         },
    //         styles: {
    //             position: 'centerTop',
    //             width: blocksWidth,
    //             height: 50,

    //             landscape: {
    //                 maxWidth: '95%',
    //                 marginTop: 230,
    //                 marginLeft: 0,
    //             },
    //             portrait: {
    //                 maxWidth: '200%',
    //                 marginTop: 0,
    //                 marginLeft: 120,
    //             },
    //         },
    //     });
    // }

    // private addBetPerBallBlock() {
    //     const coin = Sprite.from('coin');

    //     const betPerBallVal = new Text(state.betPerBall);

    //     state.onChange(['betPerBall'], () => {
    //         betPerBallVal.text = state.betPerBall;
    //         this.resize(this.parent.width, this.parent.height);
    //     });

    //     this.addContent({
    //         addBetPerBallBlockTitle: {
    //             content: i18n('betPerBALL'),
    //             styles: {
    //                 fontFamily: 'BlenderPro',
    //                 fontSize: 12,
    //                 color: 0xffffff,

    //                 landscape: {
    //                     position: 'bottomCenter',
    //                     textAlign: 'center',
    //                     marginTop: 0,
    //                     marginLeft: -0,
    //                     marginBottom: 170,
    //                 },
    //                 portrait: {
    //                     position: 'topCenter',
    //                     textAlign: 'left',
    //                     marginTop: 60,
    //                     marginLeft: -140,
    //                     marginBottom: 0,
    //                 },
    //             },
    //         },
    //         addBetPerBallValue: {
    //             content: {
    //                 coin: {
    //                     content: coin,
    //                     styles: {
    //                         marginTop: 3,
    //                         landscape: {
    //                             marginRight: 5,
    //                             marginLeft: 0,
    //                             position: 'left',
    //                         },
    //                         portrait: {
    //                             marginRight: 0,
    //                             position: 'left',
    //                         },
    //                     },
    //                 },
    //                 value: {
    //                     content: betPerBallVal,
    //                     styles: {
    //                         fontFamily: 'BlenderPro',
    //                         fontSize: 20,
    //                         color: 0xffffff,
    //                         breakWords: false,
    //                         // position: 'left',

    //                         landscape: {
    //                             marginLeft: coin.width + 5,
    //                         },
    //                         portrait: {
    //                             marginLeft: coin.width + 5,
    //                         },
    //                     },
    //                 },
    //             },
    //             styles: {
    //                 color: 0xffffff,
    //                 maxWidth: '100%',

    //                 landscape: {
    //                     position: 'bottomCenter',
    //                     textAlign: 'center',
    //                     marginBottom: 140,
    //                     marginLeft: 10,
    //                     marginTop: 0,
    //                     width: 'auto',
    //                 },
    //                 portrait: {
    //                     width: 200,
    //                     position: 'topCenter',
    //                     textAlign: 'center',
    //                     marginBottom: 0,
    //                     marginLeft: 10,
    //                     marginTop: 55,
    //                 },
    //             },
    //         },
    //     });
    // }
}
