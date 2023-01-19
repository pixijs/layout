import { Display, FlexColor, FlexNumber, Opacity, Overflow, Position, Styles, TextStyles } from "../utils/types";
import { getColor } from '../utils/helpers';
import { TEXT_GRADIENT, Graphics } from 'pixi.js';
import { Layout } from "../components/Layout";
import { OVERFLOW, POSITION } from "../utils/constants";

export class StyleController {
	private layout: Layout;
    private style: Styles = {};
	textStyles: TextStyles = {}; // this is to be nested by children

	private bg = new Graphics();
	private overflowMask = new Graphics();

    constructor(layout: Layout) {
		this.layout = layout;

		this.layout.addChild(this.bg);
		this.layout.addChild(this.overflowMask);
	}

	set styles(styles: Styles) {
        if (!styles) { return }

		this.style = styles;
		this.setTextStyles(styles);

		if (styles.background && styles.backgroundColor) {
			this.background = styles.background;
		}

		if (styles.overflow) {
			this.overflow = styles.overflow;
		}
	}

	get styles(): Styles {
		return this.style;
	}

	setTextStyles(styles: Styles) {
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

	get overflow(): Overflow {
		return this.style.overflow ?? OVERFLOW[0];
	}

	set overflow(value: Overflow) {
		this.style.overflow = value;

		if (this.style.overflow === 'hidden' && this.layout.size) {
			this.overflowMask
				.clear()
				.beginFill(0xffffff)
				.drawRoundedRect(
					0, 0, 
					this.layout.size.width, this.layout.size.height, 
					this.borderRadius)
				.endFill();

				this.layout.mask = this.overflowMask;
		} else {
			this.overflowMask.clear();
			this.layout.mask = null;
		}
	}

	get width(): FlexNumber {
		return this.style.width ?? 0;
	}

	set width(value: FlexNumber) {
		this.style.width = value;
	}

	get height(): FlexNumber {
		return this.style.height ?? 0;
	}

	set height(value: FlexNumber) {
		this.style.height = value;
	}

	get opacity(): Opacity {
		return this.style.opacity ?? 1;
	}

	set opacity(value: Opacity) {
		if (value !== undefined) {
			this.layout.alpha = value;
		}

		this.style.opacity = value;
	}

	get display(): Display {
		return this.style.display ?? 'block';
	}

	set display(value: Display) {
		this.style.display = value;
	}

	get borderRadius(): number {
		return this.style.borderRadius ?? 0;
	}

	set borderRadius(value: number) {
		this.style.borderRadius = value;
	}

	get backgroundColor(): FlexColor {
		return this.style.backgroundColor;
	}

	set backgroundColor(value: FlexColor) {
		this.style.backgroundColor = value;

		if (this.layout.size && value !== 'transparent') {
			const color = getColor(value);

			this.bg
				.clear()
				.beginFill(color.hex, color.opacity)
				.drawRoundedRect(
					0, 0, 
					this.layout.size.width, this.layout.size.height, 
					this.borderRadius
				)
				.endFill();
		} else {
			this.bg.clear();
		}
	}

	get background(): FlexColor {
		return this.backgroundColor;
	}

	set background(value: FlexColor) {
		this.backgroundColor = value;
	}

	get position(): Position {
		return this.style.position ?? POSITION[0];
	}

	set position(value: Position) {
		this.style.position = value;
	}
}