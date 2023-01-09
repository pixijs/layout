import { Graphics, Text, Container, TEXT_GRADIENT } from 'pixi.js';
import {
	Opacity,
	FlexColor,
	FlexNumber,
	TextStyles,
	Position,
	Content,
} from './utils/types';
import { getColor, getNumber } from './utils/helpers';

export type Styles = TextStyles & {
	background?: FlexColor;
	color?: FlexColor;
	width?: FlexNumber;
	height?: FlexNumber;
	margin?: FlexNumber;
	opacity?: Opacity;
	overflow?: 'visible' | 'hidden'; // TODO: scroll pixi-ui scrollBox can be used here & 'scale' to fit children when overflow
	position?: Position;

	// TODO:

	// zIndex?: number;

	// maxWidth?: FlexNumber;
	// maxHeight?: FlexNumber;

	// border?: string;
	// borderRadius?: FlexNumber;
	// borderWidth?: FlexNumber;
	// borderColor?: FlexColor;
	// boxShadow?: string;

	// margin
	// marginTop?: FlexNumber;
	// marginRight?: FlexNumber;
	// marginBottom?: FlexNumber;
	// marginLeft?: FlexNumber;
	// margin?: FlexNumber;

	// padding
	// paddingTop?: FlexNumber;
	// paddingRight?: FlexNumber;
	// paddingBottom?: FlexNumber;
	// paddingLeft?: FlexNumber;
	// padding?: FlexNumber;
};

export type LayoutOptions = {
	id: string;
	content?: Content;
	styles?: Styles;
};

export class Layout extends Container {
	private bg = new Graphics();
	private overflowMask: Graphics;
	private size: { width: number; height: number } = { width: 0, height: 0 };
	private textStyles: TextStyles = {}; // this is to be nested by children

	id!: string;

	constructor(private options?: LayoutOptions) {
		super();

		if (options?.id) this.id = options.id;

		this.addChild(this.bg);

		if (options?.styles?.overflow === 'hidden') {
			this.overflowMask = new Graphics();
			this.addChild(this.overflowMask);
		}

		this.setTextStyles();

		if (options?.content) {
			this.createContent();
		}
	}

	private setTextStyles(styles: Styles = this.options?.styles) {
		if (!styles) return;

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

	private createContent(content: Content = this.options.content) {
		if (typeof content === 'string') {
			const text = new Text(content, this.textStyles);
			// TODO: fix text alignment when text width is less than layout width
			this.addChild(text);
		} else if (content instanceof Container || content instanceof Layout) {
			this.addChild(content);
		} else if (Array.isArray(content)) {
			content.forEach((content) => {
				this.createContent(content);
			});
		} else if (typeof content === 'object') {
			if ((content as LayoutOptions).id) {
				this.addChild(new Layout(content as LayoutOptions));
			} else {
				throw new Error('Invalid content');
			}
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

		this.setPosition(parentWidth, parentHeight);

		this.resizeChildren();
	}

	private setPosition(width: number, height: number) {
		const { position } = this.options?.styles || {};

		switch (position) {
			// we skip 'left', 'top' and 'leftTop' because they are default
			case 'rightTop':
			case 'right':
				this.x = width - this.size.width;
				break;

			case 'leftBottom':
			case 'bottom':
				this.y = height - this.size.height;
				break;

			case 'rightBottom':
				this.x = width - this.size.width;
				this.y = height - this.size.height;
				break;

			case 'center':
				this.x = width / 2 - this.size.width / 2;
				this.y = height / 2 - this.size.height / 2;
				break;
			case 'centerTop':
				this.x = width / 2 - this.size.width / 2;
				break;

			case 'centerBottom':
				this.x = width / 2 - this.size.width / 2;
				this.y = height - this.size.height;
				break;

			case 'centerLeft':
				this.y = height / 2 - this.size.height / 2;
				break;

			case 'centerRight':
				this.y = height / 2 - this.size.height / 2;
				this.x = width - this.size.width;
				break;
		}
	}

	protected override onChildrenChange() {
		let x = 0;
		let y = 0;

		this.children.forEach((child) => {
			if (
				child &&
				child instanceof Container &&
				child.width &&
				child.height
			) {
				if (
					this.parent &&
					this.parent.width &&
					x + child.width >= this.parent.width
				) {
					y += child.height;
					x = 0;

					child.x = x;
					child.y = y;
				} else {
					child.x = x;
					child.y = y;
				}
			}
		});
	}

	private resizeChildren() {
		this.children.forEach((child) => {
			if (child instanceof Text) {
				child.style.wordWrapWidth = this.size.width;
			} else if (child instanceof Layout) {
				child.resize(this.size.width, this.size.height);
			}
		});
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
