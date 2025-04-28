import { type PointData, type Size } from 'pixi.js';
import { type ComputedLayout, type NumberValue, type PositionSpecifier } from '../../../types';
import { getNumberFromStyle, getTypeFromStyle } from '../../../utils/getNumberFromStyle';
import { type ObjectPositionValue } from '../calculatePositionSpecifier';

/**
 * Calculates the position for a centered element along the specified dimension
 *
 * @param dimension - Which dimension to calculate ('width' or 'height')
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns The coordinate value that centers the element
 */
function calculateCenterPosition(
    dimension: 'width' | 'height',
    computedLayout: ComputedLayout,
    visualBounds: Size,
): number {
    return (computedLayout[dimension] - visualBounds[dimension]) / 2;
}

/**
 * Calculates position for numeric values (px, %, etc)
 *
 * @param value - The position value to process
 * @param valueType - Type of the value ('percentage', 'pixel', etc)
 * @param dimension - Which dimension to calculate ('width' or 'height')
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns The calculated coordinate value
 */
function calculateNonKeywordPosition(
    value: ObjectPositionValue,
    valueType: string,
    dimension: 'width' | 'height',
    computedLayout: ComputedLayout,
    visualBounds: Size,
): number {
    const multiple = valueType === 'percentage' ? computedLayout[dimension] - visualBounds[dimension] : 1;

    return getNumberFromStyle(value as NumberValue) * multiple;
}

/**
 * Calculates position when two values are provided (e.g., "top center", "10% 20px")
 * This implements CSS object-position behavior with two values
 *
 * @param tokens - Array of position tokens (should be exactly two)
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export function calculateWithDoubleValue(
    tokens: PositionSpecifier[],
    computedLayout: ComputedLayout,
    visualBounds: Size,
): PointData {
    const [first, second] = tokens as [ObjectPositionValue, ObjectPositionValue];
    const firstType = getTypeFromStyle(first);
    const secondType = getTypeFromStyle(second);
    const result = { x: undefined, y: undefined } as unknown as PointData;

    // Process first value
    switch (first) {
        case 'top':
            result.y = 0;
            break;
        case 'bottom':
            result.y = computedLayout.height - visualBounds.height;
            break;
        case 'center':
            if (second === 'left' || second === 'right') {
                result.y = calculateCenterPosition('height', computedLayout, visualBounds);
            } else {
                result.x = calculateCenterPosition('width', computedLayout, visualBounds);
            }
            break;
        case 'left':
            result.x = 0;
            break;
        case 'right':
            result.x = computedLayout.width - visualBounds.width;
            break;
        default: {
            const dimension = second === 'top' || second === 'bottom' || secondType !== 'keyword' ? 'width' : 'height';
            const target = dimension === 'width' ? 'x' : 'y';

            result[target] = calculateNonKeywordPosition(first, firstType, dimension, computedLayout, visualBounds);
        }
    }

    // Process second value
    switch (second) {
        case 'top':
            result.y = 0;
            break;
        case 'bottom':
            result.y = computedLayout.height - visualBounds.height;
            break;
        case 'center':
            if (result.y === undefined) {
                result.y = calculateCenterPosition('height', computedLayout, visualBounds);
            } else {
                result.x = calculateCenterPosition('width', computedLayout, visualBounds);
            }
            break;
        case 'left':
            result.x = 0;
            break;
        case 'right':
            result.x = computedLayout.width - visualBounds.width;
            break;
        default: {
            const target = result.y === undefined ? 'y' : 'x';
            const dimension = target === 'y' ? 'height' : 'width';

            result[target] = calculateNonKeywordPosition(second, secondType, dimension, computedLayout, visualBounds);
        }
    }

    return result;
}
