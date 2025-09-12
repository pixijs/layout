import { ScrollSpring } from './ScrollSpring';

/**
 * Options for configuring the SlidingNumber behavior
 */
export interface SlidingNumberOptions {
    /** Whether to constrain the value between min and max. Default: true */
    constrain?: boolean;
    /** Percentage of overflow allowed when dragging beyond constraints. Default: 0 */
    constrainPercent?: number;
    /** Maximum speed the value can slide. Default: 400 */
    maxSpeed?: number;
    /** Custom easing function for constraint bouncing. Default: ScrollSpring */
    ease?: ConstrainEase;
    /** Start in locked state (no movement). Default: false */
    locked?: boolean;
}

/**
 * Interface for custom easing functions used when bouncing against constraints
 */
export interface ConstrainEase {
    /** Whether the easing has completed */
    done: boolean;
    /** Target value to ease towards */
    to: number;
    /** Initialize the easing with current state */
    start(speed: number, pos: number, to: number): void;
    /** Calculate next eased value */
    update(): number;
}

/**
 * A utility class that manages sliding/scrolling number values with physics-based momentum and constraints.
 * Useful for implementing scrolling, slider controls, or any UI element that needs smooth, physics-based movement.
 *
 * Features:
 * - Momentum-based sliding with speed control
 * - Constraint boundaries with optional elastic overflow
 * - Customizable easing for constraint bouncing
 *
 * @example
 * ```typescript
 * // Create a sliding number for a scroll container
 * const slider = new SlidingNumber({
 *     constrain: true,
 *     maxSpeed: 400,
 *     constrainPercent: 0.2
 * });
 *
 * // Set the boundaries
 * slider.min = 0;
 * slider.max = -1000;
 *
 * // Handle drag start
 * onDragStart(e) {
 *     slider.grab(e.position);
 * }
 *
 * // Handle drag move
 * onDragMove(e) {
 *     slider.hold(e.position);
 * }
 *
 * // Update loop
 * ticker.add(() => {
 *     slider.slide();
 *     container.y = slider.value;
 * });
 * ```
 */
export class SlidingNumber {
    protected position = 0;
    /** The maximum speed at which the sliding number can move. */
    public maxSpeed: number;
    /** When dragging this number represents the percentage that will be allowed to move outside the min and max values. */
    public constrainPercent: number;
    /** Whether the sliding number is constrained to the min and max values. */
    public constrain: boolean;
    /** The minimum value the sliding number can take. */
    public min = 0;
    /** The maximum value the sliding number can take. */
    public max = 0;
    /** If true, interaction & momentum updates are ignored. */
    public locked: boolean;

    protected _ease: ConstrainEase;

    protected _offset = 0;
    protected _prev = 0;
    protected _speed = 0;
    protected _hasStopped: boolean = true;

    protected _targetSpeed = 0;
    protected _speedChecker = 0;
    protected _grab = 0;
    protected _activeEase: ConstrainEase | null = null;

    constructor(options: SlidingNumberOptions = {}) {
        this.constrain = options.constrain ?? true;
        this.maxSpeed = options.maxSpeed ?? 400;
        this._ease = options.ease ?? new ScrollSpring();
        this.constrainPercent = options.constrainPercent ?? 0;
        this.locked = options.locked ?? false;
    }

    /**
     * Sets the position of the sliding number.
     * This will also reset the speed to 0.
     * @param n The new position value.
     */
    set value(n: number) {
        if (this.locked) return;
        this._speed = 0;
        this.position = n;
    }

    /**
     * Gets the current position of the sliding number.
     * @returns The current position value.
     */
    get value(): number {
        return this.position;
    }

    /**
     * Initiates a grab/drag operation at the specified offset
     * @param offset The initial grab position
     */
    grab(offset: number): void {
        if (this.locked) return;
        this._grab = offset;
        this._offset = this.position - offset;
        this._speedChecker = 0;
        this._targetSpeed = this._speed = 0;
        this._hasStopped = false;
    }

    /**
     * Updates the position while being held/dragged
     * @param newPosition The new position from the input device
     */
    hold(newPosition: number): void {
        if (this.locked) return;
        this._speedChecker++;

        this.position = newPosition + this._offset;

        if (this._speedChecker > 1) {
            this._targetSpeed = this.position - this._prev;
        }

        this._speed += (this._targetSpeed - this._speed) / 2;

        if (this._speed > this.maxSpeed) this._speed = this.maxSpeed;
        else if (this._speed < -this.maxSpeed) this._speed = -this.maxSpeed;

        this._prev = this.position;

        if (this.constrain) {
            if (this.constrainPercent === 0) {
                if (this.position > this.min) {
                    this.position = this.min;
                } else if (this.position < this.max) {
                    this.position = this.max;
                }
            } else if (this.position > this.min) {
                this.position -= (this.position - this.min) / (1 + this.constrainPercent);
            } else if (this.position < this.max) {
                this.position += (this.max - this.position) / (1 + this.constrainPercent);
            }
        }
    }

    /**
     * Updates the sliding animation based on current momentum
     * @param instant If true, snaps immediately to constraints without easing
     */
    slide(instant = false): void {
        if (this.locked) return;
        if (this._hasStopped) return;

        if (this.constrain) {
            this._updateConstrain(instant);
        } else {
            this._updateDefault();
        }
    }

    /**
     * Lock movement (grabs, holds, momentum & easing halted).
     * Optionally freeze at a specific value.
     */
    lock(value?: number): void {
        if (value !== undefined) {
            this.position = value;
        }
        this._speed = 0;
        this._activeEase = null;
        this._hasStopped = true;
        this.locked = true;
    }

    /** Unlock movement. */
    unlock(): void {
        this.locked = false;
    }

    /** Toggle locked state, returning new state. */
    toggleLock(): boolean {
        if (this.locked) this.unlock();
        else this.lock();

        return this.locked;
    }

    /** Convenience check. */
    isLocked(): boolean {
        return this.locked;
    }

    protected _updateDefault(): void {
        this._speed *= 0.9;
        this.position += this._speed;

        if ((this._speed < 0 ? this._speed * -1 : this._speed) < 0.01) {
            this._hasStopped = true;
        }

        if (this.position > this.min) {
            this.position = this.min;
            this._hasStopped = true;
        } else if (this.position < this.max) {
            this.position = this.max;
            this._hasStopped = true;
        }
    }

    protected _updateConstrain(instant = false): void {
        const max: number = this.max;

        if (instant) {
            if (this.position > this.min) {
                this.position = this.min;
            } else if (this.position < this.max) {
                this.position = this.max;
            }
        } else if (this.position > this.min || this.position < max || this._activeEase) {
            if (!this._activeEase) {
                this._activeEase = this._ease;

                if (this.position > this.min) {
                    this._activeEase.start(this._speed, this.position, this.min);
                } else {
                    this._activeEase.start(this._speed, this.position, max);
                }
            }

            this.position = this._activeEase.update();

            if (this._activeEase.done) {
                this.position = this._activeEase.to;
                this._speed = 0;
                this._activeEase = null;
            }
        } else {
            this._updateDefault();
        }
    }
}
