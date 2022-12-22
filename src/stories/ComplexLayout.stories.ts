import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { CSS_COLOR_NAMES, FLOAT } from '../utils/constants';
import { preloadAssets } from '../utils/helpers';

const color = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {
	color,
	backgroundColor: '#000000',
	width: 50,
	height: 50,
	opacity: 1,
	align: ['left', 'center', 'right', 'justify'],
	fontSize: 24,
	overflow: ['hidden', 'visible'],
	float: FLOAT,
};

class LayoutStory {
	private layout: Layout;
	view = new Container();

	constructor({
		color,
		backgroundColor,
		width,
		height,
		opacity,
		overflow,
		align,
		fontSize,
		float,
	}: any) {
		this.layout = new Layout({
			content: {
				left: new Layout({ content: 'Left' }),
				right: new Layout({ content: 'Right' }),
				leftBottom: new Layout({ content: 'Left Bottom' }),
				rightBottom: new Layout({ content: 'Right Bottom' }),
			},
			styles: {
				background: backgroundColor,
				width: `${width}%`,
				height: `${height}%`,
				opacity,
				overflow,
				// text options
				color,
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

export const ComplexLayout = (params: any) => new LayoutStory(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
