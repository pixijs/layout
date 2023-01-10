import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { CSS_COLOR_NAMES, FLEX_DIRECTION } from '../utils/constants';
import { Content } from '../utils/types';
import { DISPLAY } from './../utils/constants';

const args = {
	amount: 5,
	size: 100,
	rootDisplay: DISPLAY,
	childrenDisplay: DISPLAY,
	flexDirection: FLEX_DIRECTION,
};

class LayoutStory {
	private rootLayout: Layout;
	view = new Container();

	constructor({ size, amount, rootDisplay, childrenDisplay }: any) {
		const content: Content = [];

		for (let i = 1; i < amount+1; i++) {
			const background = Object.keys(CSS_COLOR_NAMES)[i];

			content.push({	
				id: `block-${i}`,
				content: `Block ${i}`,
				styles: {
					background,
					width: size,
					height: size,
					display: childrenDisplay,
				},
			});
		}

		this.rootLayout = new Layout({
			id: 'root-layout',
			content,
			styles: {
				display: rootDisplay
			},
		});

		this.view.addChild(this.rootLayout);
	}

	resize(w: number, h: number) {
		this.rootLayout.resize(w, h);
	}
}

export const LayoutList = (params: any) => new LayoutStory(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
