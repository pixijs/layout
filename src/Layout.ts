import { Container, Graphics } from 'pixi.js';
import { LayoutOptions } from './utils/types';
import { AlignController } from './controllers/AlignController';
import { StyleController } from './controllers/StyleController';
import { SizeController } from './controllers/SizeController';
import { ContentController } from './controllers/ContentController';
import { getColor } from './utils/helpers';

export class Layout extends Container {
	private bg = new Graphics();
	private overflowMask = new Graphics();

	id: string;
	size: SizeController;
	align: AlignController;
	style: StyleController;
	content: ContentController;

	constructor(options: LayoutOptions) {
		super();

		this.id = options.id;

		this.addChild(this.bg);
		this.addChild(this.overflowMask);

		if (options.globalStyles) {
			// check if there is a global style for this layout
			const styles = options.globalStyles[this.id];

			if (styles && options.styles) {
				options.styles = { ...styles, ...options.styles };
			} else if (styles) {
				options.styles = styles;
			}
		}

		// order here is important as controllers are dependent on each other
		this.style = new StyleController(this, options.styles);
		this.size = new SizeController(this);
		this.align = new AlignController(this);
		this.content = new ContentController(
			this,
			options.content,
			options.globalStyles,
		);
	}

	resize(parentWidth: number, parentHeight: number) {
		this.size.update(parentWidth, parentHeight);
		this.align.update(parentWidth, parentHeight);
		this.content.resize(this.width, this.height);

		this.updateBG();
		this.updateMask();
	}

	updateBG() {
		const { background } = this.style;
		const { width, height } = this;
		const color = background !== 'transparent' && getColor(background);

		if (color && width && height) {
			this.bg
				.clear()
				.beginFill(color.hex, color.opacity)
				.drawRect(0, 0, width, height)
				.endFill();
		} else {
			this.bg.clear();
		}
	}

	updateMask() {
		const { overflow, borderRadius } = this.style;
		const { width, height } = this;

		if (overflow === 'hidden' && width && height) {
			this.overflowMask
				.clear()
				.beginFill(0xffffff)
				.drawRoundedRect(0, 0, width, height, borderRadius)
				.endFill();

			this.mask = this.overflowMask;
		} else {
			this.overflowMask.clear();
			this.mask = null;
		}
	}

	getContentWidth(): number {
		return super.width;
	}

	getContentHeight(): number {
		return super.width;
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
