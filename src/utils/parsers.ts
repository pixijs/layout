import { hslToHex, isDefined, rgbToHex } from './helpers';
import { ColorsConstants, colorsConstants } from './colorsConstants';

export type FlexNumber = number | string;
export type FlexColor = FlexNumber | ColorsConstants;
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
			if (color.startsWith('#')) {
				return {
					hex: parseInt(color.slice(1), 16),
					opacity: 1,
				};
			} else if (color.startsWith('0x')) {
				return {
					hex: parseInt(color, 16),
					opacity: 1,
				};
			} else if (color.startsWith('rgba(')) {
				const colorData = color.slice(5, -1).split(',');

				const [r, g, b] = colorData.map((v) => parseInt(v, 10));

				return {
					hex: parseInt(rgbToHex(r, g, b), 16),
					opacity: parseFloat(colorData[3]),
				};
			} else if (color.startsWith('rgb(')) {
				const [r, g, b] = color
					.slice(4, -1)
					.split(',')
					.map((v) => parseInt(v, 10));

				return {
					hex: parseInt(rgbToHex(r, g, b), 16),
					opacity: 1,
				};
			} else if (color.startsWith('hsla(')) {
				const colorData = color.slice(5, -1).split(',');

				const [r, g, b] = colorData.map((v) => parseInt(v, 10));

				return {
					hex: getColor(hslToHex(r, g, b)).hex,
					opacity: parseFloat(colorData[3]),
				};
			} else if (isDefined(colorsConstants[color as ColorsConstants])) {
				return {
					hex: colorsConstants[color as ColorsConstants],
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
