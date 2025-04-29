import { type loadYoga } from 'yoga-layout/load';

export type Yoga = Awaited<ReturnType<typeof loadYoga>>;

let yoga: Yoga;

/**
 * Get the Yoga instance.
 * Yoga is a dynamically loaded module, so it is not available until it is loaded.
 */
export function getYoga(): Yoga {
    return yoga;
}

/**
 * Set the Yoga instance.
 * @param newYoga The Yoga instance.
 */
export function setYoga(newYoga: Yoga) {
    yoga = newYoga;
}
