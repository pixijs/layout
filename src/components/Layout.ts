import { Graphics, Text, Container } from 'pixi.js';
import {
	Content,
	Display,
	LayoutOptions,
} from '../utils/types';
import { getColor, getNumber } from '../utils/helpers';
import { AlignController } from '../controllers/AlignController';
import { StyleController } from '../controllers/StyleController';

export class Layout extends Container {
	private bg = new Graphics();
	private overflowMask: Graphics;
	private size: { width: number; height: number } = { width: 0, height: 0 };
	private alignController: AlignController;
	private style: StyleController;

	id: string;
	display: Display = 'block';
	options: LayoutOptions;

	constructor(options: LayoutOptions) {
		super();

		this.id = options.id;
		this.options = options;

		this.style = new StyleController(options.styles);
		this.alignController = new AlignController(this);

		if (options.content) {
			this.createContent();
		}
	}

	private createContent(content: Content = this.options.content) {
		this.addChild(this.bg);

		if (typeof content === 'string') {
			const text = new Text(content, this.style.textStyles);
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
		let { background, width, height, opacity } = this.options.styles || {};

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

		if (this.style.overflow === 'hidden') {
			this.overflowMask = 
				new Graphics()
				.beginFill(0xffffff)
				.drawRect(0, 0, this.size.width, this.size.height)
				.endFill();
			
			this.addChild(this.overflowMask);

			this.mask = this.overflowMask;
		} else {
			this.overflowMask?.destroy();
			this.mask = null;
		}

		if (opacity !== undefined) {
			this.alpha = opacity;
		}

		this.resizeChildren();
		this.alignController.update(parentWidth, parentHeight);
		this.resizeChildren();
	}


	private resizeChildren() {
		this.children.forEach((child) => {
			if (child instanceof Text) {
				child.style.wordWrapWidth = this.width;

				if (child.width < this.width) {
					if (this.style.textStyles.align === 'center') {
						child.anchor.set(0.5, 0);
						child.x = this.width / 2;
					} else if (this.style.textStyles.align === 'right') {
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
