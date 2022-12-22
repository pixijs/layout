export function rgbToHex(r: number, g: number, b: number): string {
	return '0x' + getHex(r) + getHex(g) + getHex(b);
}

export function getHex(n: number) {
	const hex = n.toString(16);

	return hex.length === 1 ? '0' + hex : hex;
}

export function hslToHex(h: number, s: number, l: number) {
	l /= 100;

	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};

	return `#${f(0)}${f(8)}${f(4)}`;
}
