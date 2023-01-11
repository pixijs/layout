import { Container } from 'pixi.js';
import { Layout } from '../Layout';
import { FlexAlignController } from './FlexAlignController';
import { GridAlignController } from './GridAlignController';

type Items = Container[];

export class AlignController {
	private root: Layout;
	private items: Items = [];
	private flexController: FlexAlignController;
	private gridController: GridAlignController;

	constructor(root: Layout, items?: Items) {
		this.root = root;

		if (items) {
			this.items = items;
		}

		this.flexController = new FlexAlignController(root, items);
		this.gridController = new GridAlignController(root, items);
	}

	add(items: Items | Container) {
		if (Array.isArray(items)) {
			items.forEach((item) => this.items.push(item));
		} else {
			this.items.push(items);
		}

		this.flexController.add(items);
		this.gridController.add(items);
	}

	update() {
		switch (this.root.display) {
			case 'flex':
				this.flexController.update();
				break;
			case 'grid':
				this.gridController.update();
				break;
			default:
				this.alignDefault();
				break;
		}
	}

	private alignDefault() {
		let maxChildHeight = 0;
		let x = 0;
		let y = 0;

		this.items.forEach((child) => {
			let childDisplay = 'block';

			if (child instanceof Layout) {
				childDisplay = child.display;
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
						if (x + child.width > this.root.width) {
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
}
