import { Graphics, TextStyle, Text, Container } from 'pixi.js';
import { isDefined, Opacity } from './utils/helpers';
import { FlexColor, FlexNumber, getColor, getNumber } from './utils/parsers';

export type Styles = {
	background?: FlexColor;
	color?: FlexColor;
	width?: FlexNumber;
	height?: FlexNumber;
	margin?: FlexNumber;
	opacity?: Opacity;
	overflow?: 'visible' | 'hidden'; // TODO: scroll pixi-ui scrollBox can be used here
	align?: 'left' | 'center' | 'right' | 'justify';
	// padding
	paddingTop?: FlexNumber;
	paddingRight?: FlexNumber;
	paddingBottom?: FlexNumber;
	paddingLeft?: FlexNumber;
	padding?: FlexNumber;
	textStyles?: Partial<TextStyle>;
};

export type LayoutOptions = {
	content?: string | Container | Layout | Layout[] | Container[];
	styles?: Styles;
};

export class Layout extends Container {
	private bg = new Graphics();
	private overflowMask: Graphics;
	private size: { width: number; height: number } = { width: 0, height: 0 };

	constructor(private options?: LayoutOptions) {
		super();

		this.addChild(this.bg);

		if (options?.styles?.overflow === 'hidden') {
			this.overflowMask = new Graphics();
			this.addChild(this.overflowMask);
		}

		this.addContent();
	}

	addContent() {
		const { content, styles } = this.options || {};

		if (typeof content === 'string') {
			const { color } = styles || {};

			const textColor = getColor(color);

			const text = new Text(content, {
				fill: isDefined(textColor.hex) ? textColor.hex : 0xffffff,
				wordWrap: true,
				wordWrapWidth: this.width,
				trim: true,
				align: styles?.align ?? 'left',
				fontSize: styles?.fontSize ?? 20,
				...styles?.textStyles,
			});

			this.addChild(text);
		}
	}

	resize(parentWidth: number, parentHeight: number) {
		let { background, width, height, opacity } = this.options?.styles || {};

		const bgColor = getColor(background); // TODO: add support for sprite BG
		this.size.width = getNumber(width, parentWidth) ?? parentWidth;
		this.size.height = getNumber(height, parentHeight) ?? parentHeight;

		if (bgColor && this.size.width && this.size.height) {
			this.bg
				.clear()
				.beginFill(bgColor.hex, bgColor.opacity)
				.drawRect(0, 0, this.size.width, this.size.height)
				.endFill();
		}

		if (this.overflowMask) {
			this.overflowMask
				.clear()
				.beginFill(0xffffff)
				.drawRect(0, 0, this.size.width, this.size.height)
				.endFill();

			this.mask = this.overflowMask;
		}

		if (opacity !== undefined) {
			this.alpha = opacity;
		}

		this.manageChildren();
	}

	private manageChildren() {
		this.children.forEach((child) => {
			if (child instanceof Text) {
				child.style.wordWrapWidth = this.size.width;
			}
		});
	}

	update() {
		// ...
	}

	override set width(value: number) {
		this.size.width = value;
	}

	override get width() {
		return this.size.width;
	}

	override set height(value: number) {
		this.size.height = value;
	}

	override get height() {
		return this.size.height;
	}
}
