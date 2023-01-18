import { Styles, TextStyles } from "../utils/types";
import { getColor } from '../utils/helpers';
import { TEXT_GRADIENT } from 'pixi.js';

export class StyleController {
    private styles: Styles = {};
	textStyles: TextStyles = {}; // this is to be nested by children

    constructor(styles?: Styles) {
        if (!styles) { return }

        this.styles.background = styles.background;
        this.styles.color = styles.color;
        this.styles.width = styles.width;
        this.styles.height = styles.height;
        this.styles.margin = styles.margin;
        this.styles.opacity = styles.opacity;
        this.styles.overflow = styles.overflow;
        this.styles.position = styles.position;
        this.styles.display = styles.display;

		this.textStyles = {
			align: styles.align ?? 'left',
			breakWords: styles.breakWords ?? false,
			dropShadow: styles.dropShadow ?? false,
			dropShadowAlpha: styles.dropShadowAlpha ?? 1,
			dropShadowAngle: styles.dropShadowAngle ?? Math.PI / 6,
			dropShadowBlur: styles.dropShadowBlur ?? 0,
			dropShadowColor: styles.dropShadowColor ?? 'black',
			dropShadowDistance: styles.dropShadowDistance ?? 5,
			fill: styles.fill ?? getColor(styles.color)?.hex ?? 'black',
			fillGradientType:
				styles.fillGradientType ?? TEXT_GRADIENT.LINEAR_VERTICAL,
			fillGradientStops: styles.fillGradientStops ?? [],
			fontFamily: styles.fontFamily ?? 'Arial',
			fontSize: styles.fontSize ?? 26,
			fontStyle: styles.fontStyle ?? 'normal',
			fontVariant: styles.fontVariant ?? 'normal',
			fontWeight: styles.fontWeight ?? 'normal',
			letterSpacing: styles.letterSpacing ?? 0,
			lineHeight: styles.lineHeight ?? 0,
			lineJoin: styles.lineJoin ?? 'miter',
			miterLimit: styles.miterLimit ?? 10,
			padding: styles.padding ?? 0,
			stroke: styles.stroke ?? 'black',
			strokeThickness: styles.strokeThickness ?? 0,
			textBaseline: styles.textBaseline ?? 'alphabetic',
			trim: styles.trim ?? false,
			whiteSpace: styles.whiteSpace ?? 'pre',
			wordWrap: styles.wordWrap ?? true,
			wordWrapWidth: styles.wordWrapWidth ?? 100,
			leading: styles.leading ?? 0,
		};
	}

    //TODO: add styles setters with layout update
}