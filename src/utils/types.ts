import { TextStyle, Container, TextStyleAlign } from 'pixi.js';
import {
	CSS_COLOR_NAMES,
	POSITION,
	DISPLAY,
	OVERFLOW,
} from './constants';
import { Layout } from '../Layout';

export type Opacity =
	| 0
	| 0.1
	| 0.2
	| 0.3
	| 0.4
	| 0.5
	| 0.6
	| 0.7
	| 0.8
	| 0.9
	| 1;

export type TextStyles = Partial<TextStyle>;

export type FlexNumber = number | string;
export type FlexColor = FlexNumber | CSSColor;
export type Color = {
	hex: number;
	opacity: number;
};

export type CSSColor = keyof typeof CSS_COLOR_NAMES;

export type Position = typeof POSITION[number];
export type Display = typeof DISPLAY[number];

export type Content = string | Container | Layout | LayoutOptions | Content[];

export type Containers = Container[];
export type Overflow = typeof OVERFLOW[number];

export type Styles = Partial<TextStyles> &
	{
		background?: FlexColor;
		backgroundColor?: FlexColor;
		color?: FlexColor;
		width?: FlexNumber;
		height?: FlexNumber;
		margin?: number;
		padding?: number;
		opacity?: Opacity;
		overflow?: Overflow; // TODO: scroll pixi-ui scrollBox can be used here & 'scale' to fit children when overflow
		position?: Position;
		display?: Display;
		borderRadius?: number;
		textAlign?: TextStyleAlign;
	};

export type LayoutStyles = {
	[K: string]: Styles;
};

export type LayoutOptions = {
	id: string;
	content?: Content;
	styles?: Styles;
	globalStyles?: LayoutStyles;
};
