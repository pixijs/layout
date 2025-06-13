import { type ConstrainEase } from './SlidingNumber';
import { Spring } from './Spring';

/**
 * ScrollSpring implements a physics-based spring animation for smooth scrolling transitions.
 * It handles both momentum-based movement and spring-to-target behavior when reaching constraints.
 *
 * Features:
 * - Smooth spring-based animation
 * - Direction-aware speed correction
 * - Configurable spring parameters
 * - Implements ConstrainEase interface for use with SlidingNumber
 *
 * @example
 * ```typescript
 * // Create a scroll spring with custom parameters
 * const spring = new ScrollSpring({
 *     tension: 0.3,
 *     friction: 0.8
 * });
 *
 * // Initialize spring animation
 * spring.start(currentSpeed, startPosition, targetPosition);
 *
 * // Update loop
 * ticker.add(() => {
 *     if (!spring.done) {
 *         const position = spring.update();
 *         container.y = position;
 *     }
 * });
 * ```
 */
export class ScrollSpring implements ConstrainEase {
    /** Whether the spring animation has completed */
    public done!: boolean;
    /** Target value the spring is animating towards */
    public to: number;

    /** Underlying spring physics implementation */
    protected _spring: Spring;
    /** Current position of the spring */
    protected _pos: number;
    /** Current speed of the movement */
    protected _speed!: number;
    /** Whether speed needs correction due to direction change */
    protected _correctSpeed!: boolean;

    constructor(springOptions: ConstructorParameters<typeof Spring>[0] = {}) {
        this._spring = new Spring(springOptions);
        this._pos = 0;
        this.to = 0;
    }

    /**
     * Initializes a new spring animation
     * @param speed Initial velocity of the movement
     * @param pos Starting position
     * @param to Target position to animate towards
     */
    start(speed: number, pos: number, to: number): void {
        this._speed = speed;
        this._pos = pos;
        this.to = to;
        this.done = false;

        this._spring.x = this._pos;
        this._spring.tx = this.to;

        const diff = this.to - this._pos;
        const toDirection = Math.abs(diff) / diff;
        const currentDirection = Math.abs(this._speed) / this._speed;

        if (toDirection !== currentDirection) {
            this._correctSpeed = true;
        } else {
            this._correctSpeed = false;
        }
    }

    /**
     * Updates the spring animation state
     * @returns The new position after the spring calculation
     */
    update(): number {
        if (this._correctSpeed) {
            this._speed *= 0.6;

            if (Math.abs(this._speed) < 2) {
                this._correctSpeed = false;
            }

            this._pos += this._speed;

            this._spring.x = this._pos;
        } else {
            const diff = this.to - this._pos;

            if (Math.abs(diff) < 0.05) {
                this._pos = this.to;
                this.done = true;
            } else {
                this._spring.tx = this.to;
                this._spring.update();
                this._pos = this._spring.x;
            }
        }

        return this._pos;
    }
}
