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
        let maxChildHeight = 0;
		let x = 0;
		let y = 0;
        
        const flexDirection = this.root.options?.styles?.flexDirection || 'row';

		this.items.forEach((child) => {
			if (
				child.height &&
				child.width
			) {
				child.x = x;
				child.y = y;

				if (child.height > maxChildHeight) {
					maxChildHeight = child.height;
				}
				
				switch (flexDirection) {
					case 'row':
						this.alignFlexRow();
						break;
                    case 'row-reverse':
                        break;
                    case 'column':
						this.alignFlexColumn();
                        break;
                    case 'column-reverse':
                        break;
					default:
						y += child.height;
						break;
				}
			}
		});
    }

    private alignFlexColumn() {
        console.log('alignFlexColumn');
        
		let y = 0;
        
		this.items.forEach((child) => {
			child.y = y;
        });
    }

    private alignFlexRow() {
        let maxChildHeight = 0;
		let x = 0;
		let y = 0;
        
        const flexWrap = this.root.options?.styles?.flexWrap || 'nowrap';

		this.items.forEach((child) => {
			if (
				child.height &&
				child.width
			) {
				child.x = x;
				child.y = y;

				if (child.height > maxChildHeight) {
					maxChildHeight = child.height;
				}
				
                if (flexWrap === 'wrap' && x + child.width > this.root.width) {
                    x = child.width;
                    y += maxChildHeight;
                    
                    child.x = 0;
                    child.y = y;
                } else { // nowrap 
                    x += child.width;
                }
			}
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
				
				if (this.root.options?.styles?.flexDirection && !isFlex(child)) {
					childDisplay = 'block';
				}
			}

			if (
				child.height &&
				child.width
			) {
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