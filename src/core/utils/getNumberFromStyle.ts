import { type NumberValue, type PositionKeyword } from '../types';

/**
 * Converts a style value to a number. If the value is a percentage string,
 * it calculates the number based on the given size.
 *
 * @param value - The style value to convert. It can be a number or a percentage string (e.g., '50%').
 * @param size - The size to use for percentage calculations.
 * @returns The numeric value. If the input is a percentage string, it returns the calculated number based on the size.
 *          If the input is a number, it returns the number itself. If the input is neither, it returns 0.
 */
export function getNumberFromStyle(value: NumberValue, size?: number): number {
    if (!value) return 0;
    if (typeof value === 'number') {
        // If the value is already a number, return it as is.
        return value;
    } else if (typeof value === 'string' && value.endsWith('%')) {
        size ??= 1;

        // If the value is a percentage string, calculate the number based on the size.
        return size * (parseFloat(value) / 100);
    } else if (!Number.isNaN(parseFloat(value))) {
        // If the value is a number string, parse it as a number.
        return parseFloat(value);
    }

    // If the value is neither a number nor a percentage string, return the value as a number.
    return 0;
}

/**
 * Determines the type of a style value.
 *
 * @param value - The style value to check.
 * @returns The type of the style value. It can be 'number', 'percentage', or 'keyword'.
 */
export function getTypeFromStyle(value: NumberValue | PositionKeyword): 'number' | 'percentage' | 'keyword' {
    if (typeof value === 'number') return 'number';
    if (value.endsWith('%')) return 'percentage';
    if (Number.isNaN(parseInt(value, 10))) return 'keyword';

    return 'number';
}
