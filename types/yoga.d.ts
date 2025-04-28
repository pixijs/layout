declare module 'yoga-layout/load' {
    import type { Yoga } from 'yoga-layout';

    export function loadYoga(): Promise<Yoga>;
    export * from 'yoga-layout';
}
