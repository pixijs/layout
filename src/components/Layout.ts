import { Text, Container } from 'pixi.js';
import { LayoutOptions } from '../utils/types';
import { AlignController } from '../controllers/AlignController';
import { StyleController } from '../controllers/StyleController';
import { SizeController } from '../controllers/SizeController';
import { ContentController } from '../controllers/ContentController';

export class Layout extends Container {
	id: string;
	options: LayoutOptions;

	size: SizeController;
	align: AlignController;
	style: StyleController;
	content: ContentController;

	constructor(options: LayoutOptions) {
		super();

		this.id = options.id;

		// order here is important as controllers are dependent on each other
		this.style = new StyleController(this);
		this.size = new SizeController(this);
		this.align = new AlignController(this);
		this.content = new ContentController(this, options.content);

		// this should initiate chain of controllers work
		this.style.styles = options.styles;
	}

	resize(parentWidth: number, parentHeight: number) {
		this.size.update(parentWidth, parentHeight);
		this.content.resize(this.width, this.height);
		this.align.update(this.width, this.height);
		// TODO: fix to remove this
		this.content.resize(this.width, this.height);
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
