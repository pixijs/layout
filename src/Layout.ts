import { Graphics, Text, Container, TEXT_GRADIENT } from 'pixi.js';
import {
	TextStyles,
	Content,
	Display,
	LayoutOptions,
	Styles,
} from './utils/types';
import { getColor, getNumber } from './utils/helpers';
import { AlignController } from './controllers/AlignController';

export class Layout extends Container {
	private bg = new Graphics();
	private overflowMask: Graphics;
	private size: { width: number; height: number } = { width: 0, height: 0 };
	private textStyles: TextStyles = {}; // this is to be nested by children
	private alignController: AlignController;

	id!: string;
	display: Display = 'block';
	options?: LayoutOptions;

	constructor(options?: LayoutOptions) {
		super();

		if (options) {
			this.options = options;
		}

		if (options?.styles?.display) {
			this.display = options.styles.display;
		}

		if (options?.id) this.id = options.id;

		this.addChild(this.bg);

		if (options?.styles?.overflow === 'hidden') {
			this.overflowMask = new Graphics();
			this.addChild(this.overflowMask);
		}

		this.alignController = new AlignController(this);

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
			this.addChild(text);
			this.alignController.add(text);
		} else if (content instanceof Container || content instanceof Layout) {
			this.addChild(content);
			this.alignController.add(content);
		} else if (Array.isArray(content)) {
			content.forEach((content) => {
				this.createContent(content);
			});
		} else if (typeof content === 'object') {
			if ((content as LayoutOptions).id) {
				const layout = new Layout(content as LayoutOptions);
				this.addChild(layout);
				this.alignController.add(layout);
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

		this.resizeChildren();
		this.alignController.update();
		this.resizeChildren();

		if (this.options?.styles?.position) {
			this.setPosition(parentWidth, parentHeight);
		}
	}

	private setPosition(width: number, height: number) {
		const { position } = this.options?.styles || {};

		switch (position) {
			// we skip 'left', 'top' and 'leftTop' because they are default
			case 'rightTop':
			case 'right':
				this.y = 0;
				this.x = width - this.size.width;
				break;

			case 'leftBottom':
			case 'bottom':
				this.x = 0;
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
				this.y = 0;
				this.x = width / 2 - this.size.width / 2;
				break;

			case 'centerBottom':
				this.x = width / 2 - this.size.width / 2;
				this.y = height - this.size.height;
				break;

			case 'centerLeft':
				this.x = 0;
				this.y = height / 2 - this.size.height / 2;
				break;

			case 'centerRight':
				this.y = height / 2 - this.size.height / 2;
				this.x = width - this.size.width;
				break;
		}
	}

	private resizeChildren() {
		this.children.forEach((child) => {
			if (child instanceof Text) {
				child.style.wordWrapWidth = this.width;

				if (child.width < this.width) {
					if (this.textStyles.align === 'center') {
						child.anchor.set(0.5, 0);
						child.x = this.width / 2;
					} else if (this.textStyles.align === 'right') {
						child.anchor.set(1, 0);
						child.x = this.width;
					}
				} else {
					child.anchor.set(0, 0);
					child.x = 0;
				}
			} else if (child instanceof Layout) {
				child.resize(this.width, this.height);
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
