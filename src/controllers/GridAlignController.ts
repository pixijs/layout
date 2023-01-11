import { Container } from 'pixi.js';
import { Layout } from '../Layout';

type Items = Container[];

export class GridAlignController {
	private root: Layout;
	private items: Items = [];

	constructor(root: Layout, items?: Items) {
		this.root = root;

		if (items) {
			this.items = items;
		}
	}

	add(items: Items | Container) {
		if (Array.isArray(items)) {
			items.forEach((item) => this.items.push(item));
		} else {
			this.items.push(items);
		}
	}

	update() {}
}
