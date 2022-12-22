import { TextStyle } from 'pixi.js';
import { CSS_COLOR_NAMES, FLOAT } from './constants';

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

export type Float = typeof FLOAT[number];
