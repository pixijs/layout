import { type PointData, type Size } from 'pixi.js';
import { type ComputedLayout, type NumberValue, type PositionKeyword, type PositionSpecifier } from '../../../types';
import { getNumberFromStyle, getTypeFromStyle } from '../../../utils/getNumberFromStyle';

/**
 * Calculates position when a single value is provided (e.g., "center", "top", "50%")
 * This implements CSS object-position behavior with a single value
 *
 * @param tokens - Array containing a single position token
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export function calculateWithSingleValue(
    tokens: PositionSpecifier[],
    computedLayout: ComputedLayout,
    visualBounds: Size,
): PointData {
    const keyword = tokens[0]! as NumberValue | PositionKeyword;
    const result = { x: undefined, y: undefined } as unknown as PointData;

    switch (keyword) {
        case 'top':
            result.y = 0;
            result.x = (computedLayout.width - visualBounds.width) / 2;
            break;
        case 'bottom':
            result.y = computedLayout.height - visualBounds.height;
            result.x = (computedLayout.width - visualBounds.width) / 2;
            break;
        case 'left':
            result.x = 0;
            result.y = (computedLayout.height - visualBounds.height) / 2;
            break;
        case 'right':
            result.x = computedLayout.width - visualBounds.width;
            result.y = (computedLayout.height - visualBounds.height) / 2;
            break;
        case 'center':
            result.x = (computedLayout.width - visualBounds.width) / 2;
            result.y = (computedLayout.height - visualBounds.height) / 2;
            break;
        default: {
            const isPercentage = getTypeFromStyle(keyword) === 'percentage';
            const multiple = isPercentage ? computedLayout.width - visualBounds.width : 1;

            // Handle single number value as x coordinate
            result.x = getNumberFromStyle(keyword) * multiple;
            result.y = (computedLayout.height - visualBounds.height) / 2;
        }
    }

    return result;
}
