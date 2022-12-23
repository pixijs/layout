import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { ALIGN, FLOAT, LOREM_TEXT } from '../utils/constants';
import { preloadAssets } from '../utils/helpers';

const args = {
	color: '#FFFFFF',
	width: 90,
	height: 90,
	opacity: 1,
	align: ALIGN,
	fontSize: 32,
	overflow: ['hidden', 'visible'],
	float: FLOAT,
};

class LayoutStory {
	private layout: Layout;
	view = new Container();

	constructor({
		color,
		width,
		height,
		opacity,
		overflow,
		align,
		fontSize,
		float,
	}: any) {
		const fontStyle = {
			align,
			fontSize,
			color,
			overflow,
			padding: 10,
		};

		this.layout = new Layout({
			content: {
				header: new Layout({
					content: 'Header',
					styles: {
						float: 'top',
						background: 'red',
						height: '10%',
						...fontStyle,
					},
				}),
				content: new Layout({
					content: [
						// array of children
						new Layout({
							content: 'Left menu',
							styles: {
								width: '30%',
								float: 'left',
								background: 'blue',
								...fontStyle,
							},
						}),
						new Layout({
							content: LOREM_TEXT,
							styles: {
								width: '65%',
								float: 'right',
								...fontStyle,
							},
						}),
					],
					styles: {
						float: 'center',
						height: '80%',
						align: 'center',
						...fontStyle,
					},
				}),
				footer: new Layout({
					content: 'Footer',
					styles: {
						float: 'bottom',
						background: 'green',
						height: '10%',
						align: 'center',
						...fontStyle,
					},
				}),
			},
			styles: {
				color,
				width: `${width}%`,
				height: `${height}%`,
				opacity,
				float,
				...fontStyle,
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

export const ApplicationLayout = (params: any) => new LayoutStory(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
