import { Container } from 'pixi.js';
import { Layout } from './Layout';

type Items = Container[];

export class AlignController {
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

	update() {
		switch (this.root.display) {
			case 'flex':
				this.alignFlex();
				break;
			case 'grid':
				this.alignGrid();
				break;

			default:
				this.alignDefault();
				break;
		}
	}

	private alignFlex() {
		const flexDirection = this.root.options?.styles?.flexDirection || 'row';

		switch (flexDirection) {
			case 'row':
				this.alignFlexRow(this.items);
				break;
			case 'row-reverse':
				this.alignFlexRow(this.items.reverse());
				break;
			case 'column':
				this.alignFlexColumn(this.items);
				break;
			case 'column-reverse':
				this.alignFlexColumn(this.items.reverse());
				break;
			default:
				throw new Error('Invalid flex-direction value');
		}
	}

	private alignFlexColumn(items: Items) {
		let y = 0;

		items.forEach((child) => {
			child.y = y;
			y += child.height;
		});
	}

	private alignFlexRow(items: Items) {
		let x = 0;

		const flexWrap = this.root.options?.styles?.flexWrap || 'nowrap';

		switch (flexWrap) {
			case 'wrap-reverse':
				this.alignFlexRowReverse(items);
				break;
			case 'wrap':
				this.alignFlexRowDefault(items);
				break;

			default: // nowrap
				items.forEach((child) => {
					child.x = x;
					x += child.width;
				});
				break;
		}
	}

	private alignFlexRowDefault(items: Items) {
		let maxChildHeight = 0;
		let x = 0;
		let y = 0;

		items.forEach((child) => {
			child.x = x;
			child.y = y;

			if (x + child.width > this.root.width) {
				x = child.width;
				y += maxChildHeight;

				maxChildHeight = 0;

				child.x = 0;
				child.y = y;
			} else {
				x += child.width;
			}

			if (child.height > maxChildHeight) {
				maxChildHeight = child.height;
			}
		});
	}

	private alignFlexRowReverse(items: Items) {
		let maxChildHeight = 0;
		let x = 0;
		let y = 0;
		let currentRow = 0;

		const rows: Array<Items> = [];
		rows[currentRow] = [];

		items.forEach((child) => {
			child.x = x;

			if (x + child.width > this.root.width) {
				x = child.width;
				y += maxChildHeight;

				maxChildHeight = 0;

				child.x = 0;

				currentRow++;

				rows[currentRow] = [];
				rows[currentRow].push(child);
			} else {
				x += child.width;
				rows[currentRow].push(child);
			}

			if (child.height > maxChildHeight) {
				maxChildHeight = child.height;
			}
		});

		const maxHeight: number[] = [0];

		rows.reverse().forEach((row, rowID) => {
			maxHeight[rowID + 1] = 0;

			row.forEach((child) => {
				child.y = maxHeight[rowID];

				if (maxHeight[rowID + 1] < child.height) {
					maxHeight[rowID + 1] = child.height;
				}
			});
		});
	}

	private alignGrid() {}

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
