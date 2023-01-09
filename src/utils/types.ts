import { TextStyle, Container } from 'pixi.js';
import { ALIGN, CSS_COLOR_NAMES, POSITION } from './constants';
import { Layout, LayoutOptions } from '../Layout';

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

export type Align = typeof ALIGN[number];

export type Content = string | Container | Layout | LayoutOptions | Content[];
