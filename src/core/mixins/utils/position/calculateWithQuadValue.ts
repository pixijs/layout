import { type PointData, type Size } from 'pixi.js';
import { type ComputedLayout, type NumberValue, type PositionKeyword, type PositionSpecifier } from '../../../types';
import { getNumberFromStyle, getTypeFromStyle } from '../../../utils/getNumberFromStyle';
import { type ObjectPositionValue } from '../calculatePositionSpecifier';
import { calculateWithDoubleValue } from './calculateWithDoubleValue';

/**
 * Calculates the offset along an axis based on a keyword and value
 * Used for computing position adjustments from values like "left 10px" or "bottom 20%"
 *
 * @param keyword - The positioning keyword (left, right, top, bottom)
 * @param value - The numeric value of the offset
 * @param type - The type of value (percentage, pixel, etc)
 * @param bounds - The relevant dimension (width or height) to calculate percentage values
 * @returns The calculated offset value
 */
function calculateAxisOffset(keyword: PositionKeyword, value: number, type: string, bounds: number): number {
    const isNegativeOffset = keyword === 'right' || keyword === 'bottom';
    const offset = type === 'percentage' ? value * bounds : value;

    return isNegativeOffset ? -offset : offset;
}

/**
 * Calculates position when four values are provided (e.g., "top 10px right 20px")
 * Handles CSS object-position with format: <keyword> <offset> <keyword> <offset>
 *
 * @param tokens - Array of four position tokens
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export function calculateWithQuadValue(
    tokens: PositionSpecifier[],
    computedLayout: ComputedLayout,
    visualBounds: Size,
): PointData {
    const [first, second, third, fourth] = tokens as [
        ObjectPositionValue,
        NumberValue,
        ObjectPositionValue,
        NumberValue,
    ];

    const firstType = getTypeFromStyle(first);
    const secondType = getTypeFromStyle(second);
    const thirdType = getTypeFromStyle(third);
    const fourthType = getTypeFromStyle(fourth);

    if (secondType === 'keyword' || fourthType === 'keyword') {
        throw new Error('Invalid objectPosition value: second and fourth values must be numbers or percentages');
    }
    if (firstType !== 'keyword' || thirdType !== 'keyword') {
        throw new Error('Invalid objectPosition value: first and third values must be keywords');
    }

    const basePosition = calculateWithDoubleValue([first, third], computedLayout, visualBounds);
    const result = { ...basePosition };

    const secondValue = getNumberFromStyle(second);
    const fourthValue = getNumberFromStyle(fourth);

    // Process first pair (first + second)
    if (first === 'left' || first === 'right') {
        result.x = basePosition.x + calculateAxisOffset(first, secondValue, secondType, visualBounds.width);
    } else if (first === 'top' || first === 'bottom') {
        result.y = basePosition.y + calculateAxisOffset(first, secondValue, secondType, visualBounds.height);
    }

    // Process second pair (third + fourth)
    if (third === 'left' || third === 'right') {
        result.x = basePosition.x + calculateAxisOffset(third, fourthValue, fourthType, visualBounds.width);
    } else if (third === 'top' || third === 'bottom') {
        result.y = basePosition.y + calculateAxisOffset(third, fourthValue, fourthType, visualBounds.height);
    }

    return result;
}
