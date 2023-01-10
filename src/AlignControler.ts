import { Container } from 'pixi.js';
import { Layout } from './Layout';
import { isFlex, isGrid } from './utils/helpers';

export class AlignController {
    private root: Layout;
    private items: Container[] = [];

    constructor(root: Layout, items?: Container[]) {
        this.root = root;
            
        if (items) {
            this.items = items;
        }
    }

    add(items: Container[] | Container) {
        if (Array.isArray(items)) {
            items.forEach((item) => this.items.push(item));
        } else {
            this.items.push(items);
        }
    }

    update() {
        let maxChildHeight = 0;
		let x = 0;
		let y = 0;

		this.items.forEach((child) => {
			let display = 'block';
			let flexDirection = 'column';

			if (child instanceof Layout) {
				display = child.display;
				
				if (this.root.options?.styles?.flexDirection && !isFlex(child)) {
					display = 'block';
				}
				
				switch (display) {
					case 'flex':
						flexDirection = child.options?.styles?.flexDirection || 'column';
						break;
					case 'grid':						
						break;
				}
			}

			if (
				!isGrid(child) &&
				!isFlex(child) &&
				child.height &&
				child.width
			) {
				child.x = x;
				child.y = y;

				if (child.height > maxChildHeight) {
					maxChildHeight = child.height;
				}
				
				switch (display) {
					case 'inline':
						if (x + child.width > this.root.width) {
							x = child.width;
							y += maxChildHeight;
							
							child.x = 0;
							child.y = y;
						} else {
							x += child.width;
						}
						break;

					case 'block':
					default:
						y += child.height;
						break;
				}
			}
		});
    }
}