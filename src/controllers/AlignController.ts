import { Container } from 'pixi.js';
import { Layout } from '../Layout';
import { Containers } from '../utils/types';
import { FlexAlignController } from './flex/FlexAlignController';
import { GridAlignController } from './grid/GridAlignController';

export class AlignController {
	private layout: Layout;
	private items: Containers = [];
	private flexController: FlexAlignController;
	private gridController: GridAlignController;

	constructor(layout: Layout) {
		this.layout = layout;

		this.flexController = new FlexAlignController(layout);
		this.gridController = new GridAlignController(layout);
	}

	add(items: Containers | Container) {
		if (Array.isArray(items)) {
			items.forEach((item) => this.items.push(item));
		} else {
			this.items.push(items);
		}

		this.flexController.add(items);
		this.gridController.add(items);
	}

	update(width: number, height: number) {
		switch (this.layout.style.display) {
			// TODO: 'inline-flex'
			case 'flex':
				this.flexController.update();
				break;
			case 'grid':
				this.gridController.update();
				break;
			// TODO:
			// case 'inline-block',
			// case 'inline',
			// case 'block':
			default:
				this.alignChildren();
				this.setSelfPosition(width, height);
				break;
		}
	}

	private alignChildren() {
		let maxChildHeight = 0;
		const padding = this.layout.style.padding;
		let x = padding ?? 0;
		let y = padding ?? 0;
		const parentWidth = this.layout.width + padding;

		this.items.forEach((child) => {
			let childDisplay = 'block';

			if (child instanceof Layout) {
				childDisplay = child.style.display;
			}

			if (child.height && child.width) {
				child.x = x;
				child.y = y;

				if (child.height > maxChildHeight) {
					maxChildHeight = child.height;
				}

				switch (childDisplay) {
					case 'inline':
					case 'inline-flex':
					case 'inline-block':
						if (x + child.width > parentWidth) {
							x = child.width;
							y += maxChildHeight;

							child.x = 0;
							child.y = y;
						} else {
							x += child.width;
						}
						break;

					default:
						y += child.height;
						break;
				}
			}
		});
	}

	private setSelfPosition(parentWidth: number, parentHeight: number) {
		const { position } = this.layout.style || {};

		switch (position) {
			// we skip 'left', 'top' and 'leftTop' because they are default
			case 'rightTop':
			case 'right':
				this.layout.y = 0;
				this.layout.x = parentWidth - this.layout.width;
				break;

			case 'leftBottom':
			case 'bottom':
				this.layout.x = 0;
				this.layout.y = parentHeight - this.layout.height;
				break;

			case 'rightBottom':
				this.layout.x = parentWidth - this.layout.width;
				this.layout.y = parentHeight - this.layout.height;
				break;

			case 'center':
				this.layout.x = parentWidth / 2 - this.layout.width / 2;
				this.layout.y = parentHeight / 2 - this.layout.height / 2;
				break;
			case 'centerTop':
				this.layout.y = 0;
				this.layout.x = parentWidth / 2 - this.layout.width / 2;
				break;

			case 'centerBottom':
				this.layout.x = parentWidth / 2 - this.layout.width / 2;
				this.layout.y = parentHeight - this.layout.height;
				break;

			case 'centerLeft':
				this.layout.x = 0;
				this.layout.y = parentHeight / 2 - this.layout.height / 2;
				break;

			case 'centerRight':
				this.layout.y = parentHeight / 2 - this.layout.height / 2;
				this.layout.x = parentWidth - this.layout.width;
				break;
		}
	}
}
