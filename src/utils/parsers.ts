import { hsl2Hex, isDefined, rgba2Hex } from './helpers';
import { CSSColor, cssColorNames } from './cssColorNames';
import { utils } from 'pixi.js';

export type FlexNumber = number | string;
export type FlexColor = FlexNumber | CSSColor;
export type Color = {
	hex: number;
	opacity: number;
};

export function getColor(color: FlexColor): Color {
	if (color === undefined) {
		return undefined;
	}

	switch (typeof color) {
		case 'string':
			if (color.startsWith('#') || color.startsWith('0x')) {
				return {
					hex: utils.string2hex(color),
					opacity: 1,
				};
			} else if (color.startsWith('rgba(')) {
				const colorData = color.slice(5, -1).split(',');
				const rgbData = colorData.map((v) => parseInt(v, 10));

				return {
					hex: rgba2Hex(rgbData),
					opacity: parseFloat(colorData[3]),
				};
			} else if (color.startsWith('rgb(')) {
				const colorData = color.slice(5, -1).split(',');
				const rgbData = colorData.map((v) => parseInt(v, 10));

				return {
					hex: utils.rgb2hex(rgbData),
					opacity: 1,
				};
			} else if (color.startsWith('hsla(')) {
				const colorData = color.slice(5, -1).split(',');
				const [r, g, b] = colorData.map((v) => parseInt(v, 10));

				return {
					hex: hsl2Hex(r, g, b),
					opacity: parseFloat(colorData[3]),
				};
			} else if (Object.keys(cssColorNames).includes(color as CSSColor)) {
				return {
					hex: cssColorNames[color as CSSColor],
					opacity: 1,
				};
			} else {
				throw new Error(`Unknown color format: ${color}`);
			}

		case 'number':
			return {
				hex: color,
				opacity: 1,
			};

		default:
			return {
				hex: parseInt(color, 16),
				opacity: 1,
			};
	}
}

export function getNumber(value: FlexNumber, maxPercentValue?: number): number {
	if (value === undefined) {
		return undefined;
	}

	if (typeof value === 'number') {
		return value;
	}

	if (typeof value === 'string') {
		if (value.endsWith('px')) {
			return parseInt(value.slice(0, -2), 10);
		} else if (value.endsWith('%')) {
			const val = parseInt(value.slice(0, -1), 10);
			return maxPercentValue ? (maxPercentValue / 100) * val : val;
		} else {
			return parseInt(value, 10);
		}
	}

	return 0;
}
