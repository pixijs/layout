import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from 'pixi.js';
import { ALIGN, POSITION, LOREM_TEXT } from '../utils/constants';
import { LayoutStyles } from '../utils/types';

const args = {
	color: '#FFFFFF',
	width: 90,
	height: 90,
	opacity: 1,
	fontSize: 32,
	padding: 15,
	textAlign: ALIGN,
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
		textAlign,
		fontSize,
		position,
		padding,
	}: any) {
		const fontStyle = {
			textAlign,
			fontSize,
			color,
			overflow: 'hidden',
			padding,
		};

		const globalStyles: LayoutStyles = {
			root: {
				color,
				width: `${width}%`,
				height: `${height}%`,
				opacity,
				position,
			},
			header: {
				position: 'top',
				background: 'red',
				height: '10%',
				...fontStyle,
			},
			content: {
				position: 'center',
				height: '80%',
			},
			'left-menu': {
				width: '30%',
				height: '100%',
				position: 'left',
				background: 'blue',
				...fontStyle,
			},
			'main-content': {
				width: '70%',
				height: '100%',
				position: 'right',
				background: 'gray',
				...fontStyle,
			},
			footer: {
				position: 'bottom',
				background: 'green',
				height: '10%',
				...fontStyle,
			},
		};

		this.layout = new Layout({
			id: 'root',
			content: [
				// array of children
				{
					id: 'header',
					content: 'Header',
				},
				{
					id: 'content',
					content: [
						// array of children
						{
							id: 'left-menu',
							content: 'Left menu',
						},
						{
							id: 'main-content',
							content: LOREM_TEXT,
						},
					],
				},
				{
					id: 'footer',
					content: 'Footer',
				},
			],
			globalStyles,
		});

		this.view.addChild(this.layout);
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
