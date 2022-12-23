import { Layout, Styles } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { ALIGN, FLOAT } from '../utils/constants';
import { preloadAssets } from '../utils/helpers';

const args = {
	color: '#000000',
	width: 50,
	height: 50,
	opacity: 1,
	align: ALIGN,
	fontSize: 100,
	overflow: ['hidden', 'visible'],
	float: FLOAT,
};

class LayoutStory {
	private layout: Layout;
	view = new Container();

	constructor({
		backgroundColor,
		color,
		width,
		height,
		opacity,
		overflow,
		align,
		fontSize,
		float,
	}: any) {
		const style: Styles = {
			background: backgroundColor,
			width: '50%',
			height: '50%',
			// text options
			color,
			align,
			fontSize,
		};

		this.layout = new Layout({
			// content: 'Hello World',
			content: {
				left: new Layout({
					content: '1',
					styles: { ...style, float: 'leftTop', background: 'red' },
				}),
				right: new Layout({
					content: '2',
					styles: {
						...style,
						float: 'rightTop',
						background: 'green',
					},
				}),
				leftBottom: new Layout({
					content: '3',
					styles: {
						...style,
						float: 'leftBottom',
						background: 'blue',
					},
				}),
				rightBottom: new Layout({
					content: '4',
					styles: {
						...style,
						float: 'rightBottom',
						background: 'yellow',
					},
				}),
			},
			styles: {
				...style,
				width: `${width}%`,
				height: `${height}%`,
				opacity,
				overflow,
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
