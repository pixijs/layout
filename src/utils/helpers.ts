import { CSS_COLOR_NAMES } from './constants';
import {
    Color,
    CSSColor,
    FlexColor,
    FlexNumber,
} from './types';
import { utils, Loader, Sprite, Texture } from 'pixi.js';

export function sprite(texture: string)
{
    return new Sprite(Texture.from(texture));
}

export function preloadAssets(assets: string[]): Promise<void>
{
    return new Promise((resolve) =>
    {
        const loader = Loader.shared;

        assets.forEach((asset) =>
        {
            !loader.resources[asset] && loader.add(asset);
        });

        loader.load(() =>
        {
            resolve();
        });
    });
}

export function rgba2Hex([r, g, b]: number[]): number
{
    return parseInt(`0x${getHex(r)}${getHex(g)}${getHex(b)}`);
}

export function getHex(n: number)
{
    const hex = n.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
}

export function hsl2Hex(h: number, s: number, l: number): number
{
    l /= 100;

    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) =>
    {
        const k = (n + (h / 30)) % 12;
        const color = l - (a * Math.max(Math.min(k - 3, 9 - k, 1), -1));

        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };

    return utils.string2hex(`#${f(0)}${f(8)}${f(4)}`);
}

export function isDefined(value: any): boolean
{
    return value !== undefined && value !== null;
}

export function getColor(color: FlexColor): Color
{
    if (color === 'transparent')
    {
        return undefined;
    }

    if (color === undefined)
    {
        return undefined;
    }

    switch (typeof color)
    {
        case 'string':
            if (color.startsWith('#') || color.startsWith('0x'))
            {
                return {
                    hex: utils.string2hex(color),
                    opacity: 1,
                };
            }
            else if (color.startsWith('rgba('))
            {
                const colorData = color.slice(5, -1).split(',');
                const rgbData = colorData.map((v) => parseInt(v, 10));

                return {
                    hex: rgba2Hex(rgbData),
                    opacity: parseFloat(colorData[3]),
                };
            }
            else if (color.startsWith('rgb('))
            {
                const colorData = color.slice(5, -1).split(',');
                const rgbData = colorData.map((v) => parseInt(v, 10));

                return {
                    hex: utils.rgb2hex(rgbData),
                    opacity: 1,
                };
            }
            else if (color.startsWith('hsla('))
            {
                const colorData = color.slice(5, -1).split(',');
                const [r, g, b] = colorData.map((v) => parseInt(v, 10));

                return {
                    hex: hsl2Hex(r, g, b),
                    opacity: parseFloat(colorData[3]),
                };
            }
            else if (
                Object.keys(CSS_COLOR_NAMES).includes(color as CSSColor)
            )
            {
                return {
                    hex: CSS_COLOR_NAMES[color as CSSColor],
                    opacity: 1,
                };
            }
            throw new Error(`Unknown color format: ${color}`);

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

export function getNumber(value: FlexNumber, maxPercentValue?: number): number
{
    if (value === undefined)
    {
        return undefined;
    }

    if (typeof value === 'number')
    {
        return value;
    }

    if (typeof value === 'string')
    {
        if (value.endsWith('px'))
        {
            return parseInt(value.slice(0, -2), 10);
        }
        else if (value.endsWith('%'))
        {
            const val = parseInt(value.slice(0, -1), 10);

            return maxPercentValue ? (maxPercentValue / 100) * val : val;
        }

        return parseInt(value, 10);
    }

    return 0;
}
