import { Container } from 'pixi.js';
import { LayoutOptions } from '../utils/types';
import { AlignController } from '../controllers/AlignController';
import { StyleModel } from '../models/StyleModel';
import { SizeController } from '../controllers/SizeController';
import { ContentController } from '../controllers/ContentController';

export class Layout extends Container {
	id: string;
	size: SizeController;
	align: AlignController;
	style: StyleModel;
	content: ContentController;

	constructor(options: LayoutOptions) {
		super();

		this.id = options.id;

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
		this.style = new StyleModel(this);
		this.size = new SizeController(this);
		this.align = new AlignController(this);

		this.style.styles = options.styles;

		this.content = new ContentController(this, options.content, options.globalStyles);
	}

	resize(parentWidth: number, parentHeight: number) {
		this.size.update(parentWidth, parentHeight);
		this.content.resize(this.width, this.height);
		this.align.update(parentWidth, parentHeight);
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
