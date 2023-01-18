import { Container } from 'pixi.js';
import { Layout } from '../../components/Layout';
import { getFlexDirection, getFlexWrap } from '../../utils/helpers';
import { JustifyContent } from '../../utils/types';

type Items = Container[];
// TODO: alignRowReverse, alignFlexColumn (alignColumnReverse, alignColumnWrap, alignColumnNowrap)
export class FlexAlignController {
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
		const flexDirection =
			this.root.options?.styles?.flexDirection ??
			getFlexDirection(this.root.options?.styles?.flexFlow);

		switch (flexDirection) {
			case 'row':
				this.alignFlexRow(this.items);
				break;
			case 'row-reverse':
				this.alignFlexRow(this.items.slice().reverse());
				break;
			case 'column':
				this.alignFlexColumn(this.items);
				break;
			case 'column-reverse':
				this.alignFlexColumn(this.items.slice().reverse());
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
		const flexWrap =
			this.root.options?.styles?.flexWrap ??
			getFlexWrap(this.root.options?.styles?.flexFlow);

		const justifyContent = this.root.options?.styles?.justifyContent;

		switch (flexWrap) {
			case 'wrap-reverse':
				this.alignRowReverse(items, justifyContent);
				break;
			case 'wrap':
				this.alignRowWrap(items, justifyContent);
				break;
			default: // nowrap
				this.alignRowNowrap(items, justifyContent);
				break;
		}
	}

	private alignRowWrap(items: Items, justifyContent: JustifyContent) {
		let maxChildHeight = 0;
		let x = 0;
		let y = 0;
		let firstLineElementID = 0;
		
		items.forEach((child, id) => {
			child.x = x;
			child.y = y;

			if (x + child.width > this.root.width) {
				// TODO: refactor this with the last element calculations
				const space = this.root.width - x;
				const lineAmount = id - firstLineElementID ;
				let number = 0;

				for (let i = firstLineElementID; i <= id; i++) {
					switch (justifyContent) {
						case 'flex-end':
						case 'end':
						case 'right':
								items[i].x += space;
							break;
						case 'center':
								items[i].x += space / 2;
							break;
						case 'space-between':
								items[i].x += (space / (lineAmount - 1)) * number;
								number++;
							break;
						case 'space-around':
								items[i].x = number + space / 2 / lineAmount;
								number += items[i].width + space / lineAmount;
							break;
						case 'space-evenly':
								items[i].x = number + space / (lineAmount + 1);
								number += items[i].width + space / (lineAmount + 1);
							break;
						case 'stretch':
							// TODO
							break;
					}
				}
			
				firstLineElementID = id;

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

		// TODO: refactor this with the new line calculations
		const id = items.length - 1;
		const space = this.root.width - x;
		const lineAmount = id - firstLineElementID;
		let number = 0;
		
		for (let i = firstLineElementID; i <= id; i++) {
			switch (justifyContent) {
				case 'flex-end':
				case 'end':
				case 'right':
						items[i].x += space;
					break;
				case 'center':
						items[i].x += space / 2;
					break;
				case 'space-between':
						items[i].x += (lineAmount > 0 ? (space / lineAmount) : space) * number;
						number++;
					break;
				case 'space-around':
						items[i].x = number + space / 2 / (lineAmount + 1);
						number += items[i].width + space / (lineAmount + 1);
					break;
				case 'space-evenly':
						items[i].x = number + space / (lineAmount + 2);
						number += items[i].width + space / (lineAmount + 2);
					break;
				case 'stretch':
					// TODO
					break;
				}
			}
	}
	
	private alignRowReverse(items: Items, justifyContent: JustifyContent) {
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

	private alignRowNowrap(items: Items, justifyContent: JustifyContent) {
		let x = 0;

		const totalWidth = items.reduce((acc, child) => acc + child.width, 0);
		const offset = (this.root.width - totalWidth) / 2;
		const space = this.root.width - totalWidth;

		switch (justifyContent) {
			case 'flex-start':
			case 'start':
			case 'left':
			default:
				items.forEach((child) => {
					child.x = x;
					x += child.width;
				});
				break;
			case 'flex-end':
			case 'end':
			case 'right':
				items.slice().reverse().forEach((child) => {
					child.x = this.root.width - x - child.width;
					x += child.width;
				});
				break;
			case 'center':
				items.forEach((child) => {
					child.x = x + offset;
					x += child.width;
				});
				break;
			case 'space-between':
				items.forEach((child) => {
					child.x = x;
					x += child.width + space / (items.length - 1);
				});
				break;
			case 'space-around':
				items.forEach((child) => {
					child.x = x + space / 2 / items.length;
					x += child.width + space / items.length;
				});
				break;
			case 'space-evenly':
				items.forEach((child) => {
					child.x = x + space / (items.length + 1);
					x += child.width + space / (items.length + 1);
				});
				break;
			case 'stretch':
				// TODO
				break;
			}
	}
}
