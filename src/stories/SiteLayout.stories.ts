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
			id: 'root',
			content: [
				{
					id: 'header',
					content: 'Header',
					styles: {
						float: 'top',
						background: 'red',
						height: '10%',
						...fontStyle,
					},
				},
				{
					id: 'content',
					content: [
						// array of children
						{
							id: 'left-menu',
							content: 'Left menu',
							styles: {
								width: '30%',
								float: 'left',
								background: 'blue',
								...fontStyle,
							},
						},
						{
							id: 'main-content',
							content: LOREM_TEXT,
							styles: {
								width: '65%',
								float: 'right',
								...fontStyle,
							},
						},
					],
					styles: {
						float: 'center',
						height: '80%',
						align: 'center',
						...fontStyle,
					},
				},
				{
					id: 'footer',
					content: 'Footer',
					styles: {
						float: 'bottom',
						background: 'green',
						height: '10%',
						align: 'center',
						...fontStyle,
					},
				},
			],
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

export const SiteLayout = (params: any) => new LayoutStory(params);

export default {
	title: 'Layout',
	argTypes: argTypes(args),
	args: getDefaultArgs(args),
};
