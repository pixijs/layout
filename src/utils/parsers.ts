import { hslToHex, rgbToHex } from './helpers';
import { ColorsConstants, colorsConstants } from './colorsConstants';

export type FlexNumber = number | string;
export type FlexColor = FlexNumber | ColorsConstants;

export function getColor(color: FlexColor): number {
	switch (typeof color) {
		case 'string':
			if (color.startsWith('#')) {
				return parseInt(color.slice(1), 16);
			} else if (color.startsWith('0x')) {
				return parseInt(color, 16);
			} else if (color.startsWith('rgba(')) {
				const [r, g, b] = color
					.slice(5, -1)
					.split(',')
					.map((v) => parseInt(v, 10));

				return parseInt(rgbToHex(r, g, b), 16);
			} else if (color.startsWith('rgb(')) {
				const [r, g, b] = color
					.slice(4, -1)
					.split(',')
					.map((v) => parseInt(v, 10));

				return parseInt(rgbToHex(r, g, b), 16);
			} else if (color.startsWith('hsla(')) {
				const [h, s, l] = color
					.slice(5, -1)
					.split(',')
					.map((v) => parseInt(v, 10));

				return getColor(hslToHex(h, s, l));
			} else if (colorsConstants[color as ColorsConstants]) {
				return colorsConstants[color as ColorsConstants];
			} else {
				throw new Error(`Unknown color format: ${color}`);
			}

		case 'number':
			return color;

		default:
			return parseInt(color, 16);
	}
}

export function getNumber(value: FlexNumber): number {
	if (typeof value === 'number') {
		return value;
	}

	if (typeof value === 'string') {
		if (value.endsWith('px')) {
			return parseInt(value.slice(0, -2), 10);
		}

		if (value.endsWith('%')) {
			return parseInt(value.slice(0, -1), 10);
		}
	}

	return 0;
}

export function getNumberType(value: FlexNumber): 'px' | '%' {
	if (typeof value === 'number') {
		return 'px';
	}

	if (typeof value === 'string') {
		if (value.endsWith('px')) {
			return 'px';
		}

		if (value.endsWith('%')) {
			return '%';
		}
	}

	return 'px';
}
