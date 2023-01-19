import { Layout } from "../components/Layout";
import { Containers, Content, LayoutOptions, LayoutStyles } from "../utils/types";
import { Container, Text } from 'pixi.js';

export class ContentController {
    private layout: Layout;

    content: Containers = [];

    constructor(layout: Layout, content?: Content, globalStyles?: LayoutStyles) {
        this.layout = layout;
        
        this.createContent(content, globalStyles);
    }

	private createContent(content?: Content, parentGlobalStyles?: LayoutStyles) {
        if (!content) return;

        if (typeof content === 'string') {
			
            const { textStyles } = this.layout.style;

            const text = new Text(content, textStyles);
            
            this.content.push(text);
			this.layout.addChild(text);
			this.layout.align.add(text);

		} else if (content instanceof Container) {

            this.content.push(content);
			this.layout.addChild(content);
			this.layout.align.add(content);

		} else if (Array.isArray(content)) {

			content.forEach((content) => {
				this.createContent(content, parentGlobalStyles);
			});

		} else if (typeof content === 'object') {
            if (content.id) { // we consider this as Layout
                
                if (parentGlobalStyles) {
                    if (content.globalStyles) {
                        content.globalStyles = { ...parentGlobalStyles, ...content.globalStyles };
                    } else {
                        content.globalStyles = { ...parentGlobalStyles };
                    }
                }

				const layout = new Layout(content);

                this.content.push(layout);
				this.layout.addChild(layout);
				this.layout.align.add(layout);
			} else {
				throw new Error('Invalid content');
			}

		}
	}

    resize(width: number, height: number) {
        const textStyles = this.layout.style.textStyles;

        this.layout.children.forEach((child) => {
			if (child instanceof Text) {
                const padding = this.layout.style.padding;
				child.style.wordWrapWidth = width - padding * 2;

				if (child.width < width) {
					if (textStyles.align === 'center') {
						child.anchor.set(0.5, 0);
						child.x = width / 2;
					} else if (textStyles.align === 'right') {
						child.anchor.set(1, 0);
						child.x = width;
					}
				} else {
					child.anchor.set(0, 0);
					child.x = 0;
				}
			} else if (child instanceof Layout) {
				child.resize(width, height);
			}
		});
    }
}