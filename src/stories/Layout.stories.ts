import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { cssColorNames } from '../utils/cssColorNames';

const textColor = Object.keys(cssColorNames).map((key) => key);

const args = {
	backgroundColor: '#000000',
	textColor,
	widthPercent: 50,
	heightPercent: 50,
	opacity: 1,
	align: ['left', 'center', 'right', 'justify'],
	fontSize: 24,
	overflow: ['hidden', 'visible'],
};

class DefaultLayout {
	private layout: Layout;
	view: Container;

	constructor({
		backgroundColor,
		textColor,
		widthPercent,
		heightPercent,
		opacity,
		overflow,
		align,
		fontSize,
	}: any) {
		this.layout = new Layout({
			content:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab praesentium velit minima unde beatae. Illo earum, rem iure unde nemo, exercitationem nesciunt et voluptas nisi adipisci, provident cupiditate veritatis magnam?',
			styles: {
				background: backgroundColor,
				width: `${widthPercent}%`,
				height: `${heightPercent}%`,
				opacity,
				overflow,
				// text options
				color: textColor,
				align,
				fontSize,
			},
		});

		this.view = this.layout;
	}

	update() {
		// this.layout.update();
	}

	resize(w: number, h: number) {
		this.layout.resize(w, h);
	}
}

export const Default = (params: any) => new DefaultLayout(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
