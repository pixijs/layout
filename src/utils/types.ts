import { TextStyle, Container } from 'pixi.js';
import {
	ALIGN,
	CSS_COLOR_NAMES,
	POSITION,
	DISPLAY,
	FLEX_DIRECTION,
	FLEX_WRAP,
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
export type FlexDirection = typeof FLEX_DIRECTION[number];
export type FlexWrap = typeof FLEX_WRAP[number];

export type Align = typeof ALIGN[number];

export type Content = string | Container | Layout | LayoutOptions | Content[];

export type Styles = TextStyles & {
	background?: FlexColor;
	color?: FlexColor;
	width?: FlexNumber;
	height?: FlexNumber;
	margin?: FlexNumber;
	opacity?: Opacity;
	overflow?: 'visible' | 'hidden'; // TODO: scroll pixi-ui scrollBox can be used here & 'scale' to fit children when overflow
	position?: Position;
	display?: Display;

	flexDirection?: FlexDirection;
	flexWrap?: FlexWrap;

	// TODO:

	// zIndex?: number;

	// maxWidth?: FlexNumber;
	// maxHeight?: FlexNumber;

	// border?: string;
	// borderRadius?: FlexNumber;
	// borderWidth?: FlexNumber;
	// borderColor?: FlexColor;
	// boxShadow?: string;

	// margin
	// marginTop?: FlexNumber;
	// marginRight?: FlexNumber;
	// marginBottom?: FlexNumber;
	// marginLeft?: FlexNumber;
	// margin?: FlexNumber;

	// padding
	// paddingTop?: FlexNumber;
	// paddingRight?: FlexNumber;
	// paddingBottom?: FlexNumber;
	// paddingLeft?: FlexNumber;
	// padding?: FlexNumber;
};

export type LayoutOptions = {
	id: string;
	content?: Content;
	styles?: Styles;
};
