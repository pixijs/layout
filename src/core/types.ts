import { type YogaStyles } from './style/yogaStyles';

import type { LayoutStyles } from './style/layoutStyles';

/**
 * Layout dimension and style properties for elements.
 * This is calculated using yoga layout engine.
 */
export interface ComputedLayout {
    /** The left value of the view */
    left: number;
    /** The right value of the view */
    right: number;
    /** The top value of the view */
    top: number;
    /** The bottom value of the view */
    bottom: number;
    /** The width of the view */
    width: number;
    /** The height of the view */
    height: number;
}

/**
 * The computed layout overrides for a containers position and scale to be applied
 * to the container in the update transform step.
 */
export interface ComputedPixiLayout {
    /** The left value of the view */
    x: number;
    /** The top value of the view */
    y: number;
    /** The offset x value of the view within its box */
    offsetX: number;
    /** The offset y value of the view within its box */
    offsetY: number;
    /** The scale x value of the view within its box */
    scaleX: number;
    /** The scale y value of the view within its box */
    scaleY: number;
    /** The x origin of the view */
    originX?: number;
    /** The y origin of the view */
    originY?: number;
}

export interface InternalStyles {
    custom: LayoutStyles;
    yoga: YogaStyles;
}

type NumberPercent = `${number}%`;
type NumberString = `${number}`;
export type NumberValue = number | NumberPercent | NumberString;

/**
 * Keywords for positioning
 */
export type PositionKeyword = 'center' | 'top' | 'bottom' | 'left' | 'right';

// Two-value combinations
type TwoValuePosition =
    | `${NumberValue} ${NumberValue}` // 50 100 or 50% 100%
    | `${PositionKeyword} ${PositionKeyword}` // top right
    | `${PositionKeyword} ${NumberValue}` // left 50 or left 50%
    | `${NumberValue} ${PositionKeyword}`; // 50 center or 50% center
type EdgeOffsetValue = `${PositionKeyword} ${NumberValue} ${PositionKeyword} ${NumberValue}`;
// Single values
type SingleValue = PositionKeyword | NumberValue;

/**
 * Position specifier for layout properties.
 * This can be a single value, two values, or edge offset values.
 * - Single value: 'top', '50%', '100px'
 * - Two values: 'top left', '50% 100px', 'left 50%'
 * - Edge offset values: 'top 50% left 100px bottom 200px'
 * - Percentages are allowed in the form of '50%' or '100%'
 * - Keywords are allowed in the form of 'top', 'left', 'right', 'bottom', 'center'
 * - Numbers are allowed in the form of '50', '100', etc.
 */
export type PositionSpecifier = SingleValue | TwoValuePosition | EdgeOffsetValue;
// ----------------
