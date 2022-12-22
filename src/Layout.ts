import { Graphics, TextStyle, Text } from 'pixi.js';
import {
	FlexColor,
	FlexNumber,
	getColor,
	getNumber,
	getNumberType,
} from './utils/parsers';

type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

export type Styles = Partial<TextStyle> & {
	background?: FlexColor;
	color?: FlexColor;
	width?: FlexNumber;
	height?: FlexNumber;
	padding?: FlexNumber;
	margin?: FlexNumber;
	backgroundOpacity?: Opacity;
	opacity?: Opacity;
};

export type LayoutOptions = {
	content?: string;
	styles?: Styles;
};

export class Layout {
	view: Graphics;

	constructor(private options?: LayoutOptions) {
		this.view = new Graphics();

		this.addContent();
	}

	addContent() {
		const { content, styles } = this.options || {};

		if (typeof content === 'string') {
			const { color } = styles || {};

			const textColor = getColor(color);

			const text = new Text(content, {
				fill: textColor || 0xffffff,
			});

			this.view.addChild(text);
		}
	}

	resize(parentWidth: number, parentHeight: number) {
		let { background, width, height, backgroundOpacity, opacity } =
			this.options?.styles || {};

		const bgColor = getColor(background);

		const isBackgroundVisible =
			background !== undefined && background !== null;

		const bgOpacity = isBackgroundVisible
			? backgroundOpacity === undefined
				? 1
				: backgroundOpacity
			: 0;

		let bgWidth = getNumber(width);
		const bgWidthType = getNumberType(width || parentWidth);

		if (bgWidthType === '%') {
			bgWidth = bgWidth * (parentWidth / 100);
		}

		let bgHeight = getNumber(height);
		const bgHeightType = getNumberType(height);

		if (bgHeightType === '%') {
			bgHeight = bgHeight * (parentHeight / 100);
		}

		this.view
			.clear()
			.beginFill(bgColor, bgOpacity)
			.drawRect(0, 0, bgWidth || parentWidth, bgHeight || parentHeight)
			.endFill();

		if (opacity !== undefined) {
			this.view.alpha = opacity;
		}
	}

	update() {
		// ...
	}
}
