/**
 * Configuration options for the Spring physics simulation
 */
export interface SpringOptions {
    /** Maximum velocity the spring can move. Default: 160 */
    max?: number;
    /** Damping factor to control oscillation decay. Default: 0.8 */
    damp?: number;
    /** Spring tension/stiffness factor. Default: 0.1 */
    springiness?: number;
}

/**
 * Simple physics-based spring implementation for smooth animations.
 * Simulates spring motion with configurable tension, damping, and velocity limits.
 *
 * Features:
 * - Configurable spring physics parameters
 * - Velocity limiting to prevent extreme movements
 * - Simple API for position and target updates
 *
 * @example
 * ```typescript
 * // Create a spring with custom physics parameters
 * const spring = new Spring({
 *     max: 200,         // Maximum velocity
 *     damp: 0.7,        // Higher damping = less bounce
 *     springiness: 0.15 // Higher springiness = faster movement
 * });
 *
 * // Set initial position and target
 * spring.x = startPosition;
 * spring.tx = targetPosition;
 *
 * // Update loop
 * ticker.add(() => {
 *     spring.update();
 *     sprite.x = spring.x;
 * });
 * ```
 */
export class Spring {
    /** Current position of the spring */
    public x: number;
    /** Current acceleration */
    public ax: number;
    /** Current velocity */
    public dx: number;
    /** Target position the spring is moving towards */
    public tx: number;

    /** Spring configuration options */
    protected _options: Required<SpringOptions>;

    constructor(options: SpringOptions = {}) {
        this.x = 0;
        this.ax = 0;
        this.dx = 0;
        this.tx = 0;

        // add opts to object for shared opts.
        this._options = options as Required<SpringOptions>;
        this._options.max = options.max ?? 160;
        this._options.damp = options.damp ?? 0.8;
        this._options.springiness = options.springiness ?? 0.1;
    }

    /**
     * Updates the spring physics simulation for one frame
     * Calculates new position based on acceleration, velocity, and damping
     */
    update(): void {
        this.ax = (this.tx - this.x) * this._options.springiness;

        this.dx += this.ax;
        this.dx *= this._options.damp;

        if (this.dx < -this._options.max) this.dx = -this._options.max;
        else if (this.dx > this._options.max) this.dx = this._options.max;

        this.x += this.dx;
    }
}
