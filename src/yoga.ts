import { type Config, type loadYoga } from 'yoga-layout/load';

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

let yogaConfig: Config;

/**
 * Set the Yoga configuration.
 *
 * @param config The Yoga configuration.
 */
export function setYogaConfig(config: Config) {
    yogaConfig = config;
}

/**
 * Get the Yoga configuration.
 *
 * @returns The Yoga configuration.
 */
export function getYogaConfig(): Config {
    return yogaConfig;
}
