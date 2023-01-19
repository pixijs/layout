import { Container } from 'pixi.js';
import { Layout } from '../../components/Layout';

type Items = Container[];

export class GridAlignController {
	private layout: Layout;
	private items: Items = [];

	constructor(layout: Layout) {
		this.layout = layout;
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
