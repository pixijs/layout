import { ALIGN, CSS_COLOR_NAMES } from './constants';
import { Color, CSSColor, FlexColor, FlexNumber, Styles } from './types';
import { utils } from '@pixi/core';
import { TextStyle, TEXT_GRADIENT, Text } from '@pixi/text';
import { LayoutSystem } from '../Layout';

export function rgba2Hex([r, g, b]: number[]): number
{
    return parseInt(`0x${getHex(r)}${getHex(g)}${getHex(b)}`, 16);
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
            else if (Object.keys(CSS_COLOR_NAMES).includes(color as CSSColor))
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
            return Math.floor(parseInt(value.slice(0, -2), 10));
        }
        else if (value.endsWith('%'))
        {
            const val = parseInt(value.slice(0, -1), 10);

            return Math.floor(maxPercentValue ? (maxPercentValue / 100) * val : val);
        }

        return Math.floor(parseInt(value, 10));
    }

    return 0;
}

export function stylesToPixiTextStyles(styles: Styles): Partial<TextStyle>
{
    const resultStyles: Partial<TextStyle> = {
        align: styles?.textAlign,
        breakWords: styles?.breakWords,
        dropShadow: styles?.dropShadow,
        dropShadowAlpha: styles?.dropShadowAlpha,
        dropShadowAngle: styles?.dropShadowAngle,
        dropShadowBlur: styles?.dropShadowBlur,
        dropShadowColor: styles?.dropShadowColor,
        dropShadowDistance: styles?.dropShadowDistance,
        fill: styles?.fill ?? getColor(styles?.color)?.hex,
        fillGradientType: styles?.fillGradientType,
        fillGradientStops: styles?.fillGradientStops,
        fontFamily: styles?.fontFamily,
        fontSize: styles?.fontSize,
        fontStyle: styles?.fontStyle,
        fontVariant: styles?.fontVariant,
        fontWeight: styles?.fontWeight,
        letterSpacing: styles?.letterSpacing,
        lineHeight: styles?.lineHeight,
        lineJoin: styles?.lineJoin,
        miterLimit: styles?.miterLimit,
        // padding: styles?.padding ?? 0,
        stroke: styles?.stroke,
        strokeThickness: styles?.strokeThickness,
        textBaseline: styles?.textBaseline,
        trim: styles?.trim,
        whiteSpace: styles?.whiteSpace,
        wordWrap: styles?.wordWrap,
        wordWrapWidth: styles?.wordWrapWidth ?? 100,
        leading: styles?.leading,
    };

    for (const key in resultStyles)
    {
        if (resultStyles[key as keyof Partial<TextStyle>] === undefined)
        {
            delete resultStyles[key as keyof Partial<TextStyle>];
        }
    }

    return resultStyles;
}

/**
 * Detect if layout is just a wrapper for a text element.
 * @param {LayoutSystem} layout - Layout to check.
 */
export function isItJustAText(layout: LayoutSystem): boolean
{
    const hasOnly1Child = layout.content.children.size === 1;

    if (hasOnly1Child)
    {
        const firstChild = layout.content.children.entries().next().value[1];

        return firstChild instanceof Text;
    }

    return false;
}
