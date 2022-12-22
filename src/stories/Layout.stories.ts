import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { CSS_COLOR_NAMES, LOREM_TEXT, FLOAT } from '../utils/constants';
import { preloadAssets } from '../utils/helpers';

const textColor = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {
	backgroundColor: '#000000',
	textColor,
	widthPercent: 50,
	heightPercent: 50,
	opacity: 1,
	align: ['left', 'center', 'right', 'justify'],
	fontSize: 24,
	overflow: ['hidden', 'visible'],
	float: FLOAT,
};

class DefaultLayout {
	private layout: Layout;
	view = new Container();

	constructor({
		backgroundColor,
		textColor,
		widthPercent,
		heightPercent,
		opacity,
		overflow,
		align,
		fontSize,
		float,
	}: any) {
		this.layout = new Layout({
			content: LOREM_TEXT,
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
				float,
			},
		});

		this.init();
	}

	private async init() {
		await preloadAssets([]);

		this.view.addChild(this.layout);
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
