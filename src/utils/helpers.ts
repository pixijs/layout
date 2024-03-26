import { FlexNumber, Styles } from "./types";
import { Text } from "pixi.js";
import { LayoutSystem } from "../Layout";
import { PixiTextStyle } from "./text";

export function rgba2Hex([r, g, b]: number[]): number {
    return parseInt(`0x${getHex(r)}${getHex(g)}${getHex(b)}`, 16);
}

export function getHex(n: number) {
    const hex = n.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}

export function getNumber(value: FlexNumber, maxPercentValue?: number): number {
    if (value === undefined) {
        return undefined;
    }

    if (typeof value === "number") {
        return value;
    }

    if (typeof value === "string") {
        if (value.endsWith("px")) {
            return Math.floor(parseInt(value.slice(0, -2), 10));
        } else if (value.endsWith("%")) {
            const val = parseInt(value.slice(0, -1), 10);

            return Math.floor(
                maxPercentValue ? (maxPercentValue / 100) * val : val
            );
        }

        return Math.floor(parseInt(value, 10));
    }

    return 0;
}

export function stylesToPixiTextStyles(styles: Styles): PixiTextStyle {
    const resultStyles: PixiTextStyle = {
        align: styles?.textAlign,
        breakWords: styles?.breakWords,
        dropShadow: styles?.dropShadow,
        fill: styles?.fill ?? styles?.color,

        fontFamily: styles?.fontFamily,
        fontSize: styles?.fontSize,
        fontStyle: styles?.fontStyle,
        fontVariant: styles?.fontVariant,
        fontWeight: styles?.fontWeight,
        leading: styles?.leading,
        textBaseline: styles?.textBaseline,
        letterSpacing: styles?.letterSpacing,
        lineHeight: styles?.lineHeight,
        trim: styles?.trim,
        // padding: styles?.padding ?? 0,
        stroke: styles?.stroke,
        whiteSpace: styles?.whiteSpace,
        wordWrap: styles?.wordWrap,
        wordWrapWidth: styles?.wordWrapWidth ?? 100,
    };

    for (const key in resultStyles) {
        if (resultStyles[key as keyof Partial<PixiTextStyle>] === undefined) {
            delete resultStyles[key as keyof Partial<PixiTextStyle>];
        }
    }

    return resultStyles;
}

/**
 * Detect if layout is just a wrapper for a text element.
 * @param {LayoutSystem} layout - Layout to check.
 */
export function isItJustAText(layout: LayoutSystem): boolean {
    const hasOnly1Child = layout.content.children.size === 1;

    if (hasOnly1Child) {
        const firstChild = layout.content.children.entries().next().value[1];

        return firstChild instanceof Text;
    }

    return false;
}
