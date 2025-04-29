/**
 * Check if two numbers are nearly equal.
 * @param a - The first number.
 * @param b - The second number.
 * @param EPSILON - The epsilon value.
 * @returns True if the numbers are nearly equal, false otherwise.
 */
export function nearlyEqual(a: number, b: number, EPSILON = 0.49) {
    return Math.abs(a - b) < EPSILON;
}
