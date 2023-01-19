import { Layout } from '../components/Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { ALIGN, POSITION, LOREM_TEXT } from '../utils/constants';

const args = {
	color: '#FFFFFF',
	width: 90,
	height: 90,
	opacity: 1,
	textAlign: ALIGN,
	fontSize: 32,
	overflow: ['hidden', 'visible'],
	position: POSITION,
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
		textAlign,
		fontSize,
		position,
	}: any) {
		const fontStyle = {
			textAlign,
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
						position: 'top',
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
								position: 'left',
								background: 'blue',
								...fontStyle,
							},
						},
						{
							id: 'main-content',
							content: LOREM_TEXT,
							styles: {
								width: '60%',
								position: 'right',
								...fontStyle,
							},
						},
					],
					styles: {
						position: 'center',
						height: '80%',
						textAlign: 'center',
						...fontStyle,
					},
				},
				{
					id: 'footer',
					content: 'Footer',
					styles: {
						position: 'bottom',
						background: 'green',
						height: '10%',
						textAlign: 'center',
						...fontStyle,
					},
				},
			],
			styles: {
				color,
				width: `${width}%`,
				height: `${height}%`,
				opacity,
				position,
				...fontStyle,
			},
		});

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
