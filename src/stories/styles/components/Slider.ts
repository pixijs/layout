import { Text } from '@pixi/text';
import { Slider as UISlider } from '@pixi/ui';
import { TEXT_STYLES } from '../../../../configs/styles';
import { Layout } from '@pixi/layout';

export class Slider extends Layout {
    slider: UISlider;

    constructor(min = 1, max = 100, value = 50) {
        super();

        this.slider = new UISlider({
            bg: 'progressBarBG',
            fill: 'progressBarFill',
            slider: 'progressBarPointer',
            min,
            max,
            value,
            showValue: false,
            fillOffset: {
                x: 0,
                y: 0,
            },
        });

        const sliderValue = new Text(Math.round(this.slider.value), {
            ...TEXT_STYLES.redDigital,
            fontSize: 13,
        });

        this.slider.onUpdate.connect(() => {
            sliderValue.text = Math.round(this.slider.value);
        });

        sliderValue.anchor.set(0.5);
        sliderValue.x = 30;
        sliderValue.y = this.height / 2 - 1;

        this.slider.x = this.width / 2 - this.slider.width / 2 + 20;
        this.slider.y = this.height / 2 - 4;

        this.addChild(this.slider, sliderValue);
    }
}
