import { type PointData, type Size } from 'pixi.js';
import { type ComputedLayout, type NumberValue, type PositionKeyword, type PositionSpecifier } from '../../types';
import { calculateWithDoubleValue } from './position/calculateWithDoubleValue';
import { calculateWithQuadValue } from './position/calculateWithQuadValue';
import { calculateWithSingleValue } from './position/calculateWithSingleValue';

/**
 * Represents a single position token which can be either a numeric value or a keyword
 * Examples: "center", "left", "50%", "10px"
 */
export type ObjectPositionValue = NumberValue | PositionKeyword;

/**
 * Calculates the position of content within its bounds based on PositionSpecifier value
 * Implements CSS-like object-position/transform-origin behavior for flexible content positioning
 *
 * The function supports multiple formats:
 * - Single value: "center", "top", "50%"
 * - Double value: "top left", "center 20%", "10px 30px"
 * - Quad value: "top 10px right 20%"
 *
 * @param value - The value from layout style
 * @param computedLayout - The computed layout dimensions from Yoga
 * @param visualBounds - The visual bounds of the content being positioned
 * @returns Calculated x,y coordinates for content positioning
 */
export function calculatePositionSpecifier(
    value: PositionSpecifier | undefined,
    computedLayout: ComputedLayout,
    visualBounds: Size,
): PointData {
    if (!value) return { x: 0, y: 0 };

    const tokens: PositionSpecifier[] =
        typeof value === 'string' ? (value.split(' ') as PositionSpecifier[]) : ([value] as PositionSpecifier[]);

    switch (tokens.length) {
        case 1:
            return calculateWithSingleValue(tokens, computedLayout, visualBounds);
        case 2:
            return calculateWithDoubleValue(tokens, computedLayout, visualBounds);
        case 4:
            return calculateWithQuadValue(tokens, computedLayout, visualBounds);
        default:
            throw new Error('Invalid objectPosition value: must have 1, 2, or 4 values');
    }
}
