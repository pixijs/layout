import { Container } from 'pixi.js';
import { Layout } from '../components/Layout';
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
			// 'block',
			// 'inline-block',
			// 'inline',
			default:
				this.alignDefault(width, height);
				break;
		}
	}

	private alignDefault(width: number, height: number) {
		let maxChildHeight = 0;
		let x = 0;
		let y = 0;

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
						if (x + child.width > this.layout.width) {
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

		this.setPosition(width, height)
	}

	private setPosition(width: number, height: number) {
		const { position } = this.layout.style || {};

		switch (position) {
			// we skip 'left', 'top' and 'leftTop' because they are default
			case 'rightTop':
			case 'right':
				this.layout.y = 0;
				this.layout.x = width - this.layout.width;
				break;

			case 'leftBottom':
			case 'bottom':
				this.layout.x = 0;
				this.layout.y = height - this.layout.height;
				break;

			case 'rightBottom':
				this.layout.x = width - this.layout.width;
				this.layout.y = height - this.layout.height;
				break;

			case 'center':
				this.layout.x = width / 2 - this.layout.width / 2;
				this.layout.y = height / 2 - this.layout.height / 2;
				break;
			case 'centerTop':
				this.layout.y = 0;
				this.layout.x = width / 2 - this.layout.width / 2;
				break;

			case 'centerBottom':
				this.layout.x = width / 2 - this.layout.width / 2;
				this.layout.y = height - this.layout.height;
				break;

			case 'centerLeft':
				this.layout.x = 0;
				this.layout.y = height / 2 - this.layout.height / 2;
				break;

			case 'centerRight':
				this.layout.y = height / 2 - this.layout.height / 2;
				this.layout.x = width - this.layout.width;
				break;
		}
	}
}
