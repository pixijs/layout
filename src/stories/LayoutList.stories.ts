import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import {
	CSS_COLOR_NAMES,
	FLEX_DIRECTION,
	JUSTIFY_CONTENT,
} from '../utils/constants';
import { Content } from '../utils/types';
import { DISPLAY, FLEX_WRAP } from './../utils/constants';

const args = {
	amount: 5,
	width: 100,
	height: 100,
	rootDisplay: DISPLAY,
	childrenDisplay: DISPLAY,
	flexDirection: FLEX_DIRECTION,
	flexWrap: FLEX_WRAP,
	justifyContent: JUSTIFY_CONTENT,
	addRandomHeight: false,
	addRandomWidth: false,
};

class LayoutStory {
	private rootLayout: Layout;
	view = new Container();

	constructor({
		width,
		height,
		amount,
		rootDisplay,
		flexDirection,
		childrenDisplay,
		flexWrap,
		addRandomHeight,
		addRandomWidth,
		justifyContent,
	}: any) {
		const content: Content = [];
		const randomMin = 0;
		const randomMax = 50;

		for (let i = 1; i < amount + 1; i++) {
			const background = Object.keys(CSS_COLOR_NAMES)[i];

			const random = Math.round(
				Math.random() * (randomMax - randomMin) + randomMin,
			);
			const blockWidth = width + (addRandomWidth ? random : 0);
			const blockHeight = height + (addRandomHeight ? random : 0);

			content.push({
				id: `block-${i}`,
				content: `Block ${i}`,
				styles: {
					overflow: 'hidden',
					textAlign: 'center',
					background,
					width: blockWidth,
					height: blockHeight,
					display: childrenDisplay,
				},
			});
		}

		this.rootLayout = new Layout({
			id: 'root-layout',
			content,
			styles: {
				display: rootDisplay,
				flexFlow: `${flexDirection} ${flexWrap}`,
				justifyContent,
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
