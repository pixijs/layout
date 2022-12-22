import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { colorsConstants } from '../utils/colorsConstants';

const textColor = Object.keys(colorsConstants).map((key) => key);

const args = {
	backgroundColor: '#000000',
	textColor,
	widthPercent: 50,
	heightPercent: 50,
	opacity: 1,
	backgroundOpacity: 1,
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
		backgroundOpacity,
	}: any) {
		this.layout = new Layout({
			content: 'Layout',
			styles: {
				background: backgroundColor,
				color: textColor,
				width: `${widthPercent}%`,
				height: `${heightPercent}%`,
				opacity,
				backgroundOpacity,
			},
		});

		this.view = this.layout.view;
	}

	update() {
		this.layout.update();
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
