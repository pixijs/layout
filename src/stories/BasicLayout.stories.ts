import { Layout } from '../components/Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import {
	CSS_COLOR_NAMES,
	LOREM_TEXT,
	POSITION,
	ALIGN,
} from '../utils/constants';

const color = Object.keys(CSS_COLOR_NAMES).map((key) => key);

const args = {
	color,
	backgroundColor: '#000000',
	width: 50,
	height: 50,
	opacity: 1,
	fontSize: 24,
	borderRadius: 20,
	align: ALIGN,
	overflow: ['hidden', 'visible'],
	position: POSITION,
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
		fontSize,
		borderRadius,
		align,
		position,
	}: any) {
		this.layout = new Layout({
			id: 'root',
			content: LOREM_TEXT,
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
				position,
				borderRadius,
			},
		});

		this.view.addChild(this.layout);
	}

	resize(w: number, h: number) {
		this.layout.resize(w, h);
	}
}

export const Basic = (params: any) => new LayoutStory(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
