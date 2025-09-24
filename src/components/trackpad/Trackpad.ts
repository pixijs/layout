import { Point, Rectangle } from 'pixi.js';
import { type ConstrainEase, SlidingNumber } from './SlidingNumber';

/**
 * Configuration options for the Trackpad component
 */
export interface TrackpadOptions {
    /** Custom easing function for x-axis constraint bouncing */
    xEase?: ConstrainEase;
    /** Custom easing function for y-axis constraint bouncing */
    yEase?: ConstrainEase;
    /**
     * Percentage of overflow allowed when dragging beyond x-axis constraints
     * Setting this value to a negative number disables x-axis scrolling entirely.
     */
    xConstrainPercent?: number;
    /**
     * Percentage of overflow allowed when dragging beyond y-axis constraints
     * Setting this value to a negative number disables y-axis scrolling entirely.
     */
    yConstrainPercent?: number;
    /** Maximum speed for both axes. Default: 400 */
    maxSpeed?: number;
    /** Whether to constrain movement within bounds. Default: true */
    constrain?: boolean;
    /** Disable easing when releasing the trackpad. Default: false */
    disableEasing?: boolean;
}

/**
 * Trackpad provides touch/mouse-based 2D scrolling with momentum and constraints.
 * Useful for implementing scrollable containers, map panning, or any 2D draggable interface.
 *
 * Features:
 * - Separate x and y axis scrolling with momentum
 * - Constrained movement within bounds
 * - Customizable easing and overflow
 * - Frame-based updates for smooth animation
 *
 * @example
 * ```typescript
 * // Create a trackpad for a scrollable container
 * const trackpad = new Trackpad({
 *     constrain: true,
 *     maxSpeed: 400,
 *     xConstrainPercent: 0.2,
 *     yConstrainPercent: 0.2
 * });
 *
 * // Set the visible frame size
 * trackpad.resize(800, 600);
 *
 * // Set the content bounds
 * trackpad.setBounds(0, 1200, 0, 900);
 *
 * // Handle pointer events
 * container.on('pointerdown', (e) => trackpad.pointerDown(e.global));
 * container.on('pointermove', (e) => trackpad.pointerMove(e.global));
 * container.on('pointerup', () => trackpad.pointerUp());
 *
 * // Update loop
 * ticker.add(() => {
 *     trackpad.update();
 *     content.x = trackpad.x;
 *     content.y = trackpad.y;
 * });
 * ```
 */
export class Trackpad {
    /** Manages scrolling behavior for the x-axis */
    public xAxis: SlidingNumber;
    /** Manages scrolling behavior for the y-axis */
    public yAxis: SlidingNumber;

    protected _isDown!: boolean;
    protected _globalPosition: Point;
    protected _frame: Rectangle;
    protected _bounds: Rectangle;
    protected _dirty!: boolean;
    protected disableEasing = false;

    constructor(options: TrackpadOptions) {
        this.xAxis = new SlidingNumber({
            ease: options.xEase,
            maxSpeed: options.maxSpeed,
            constrain: options.constrain,
            constrainPercent: options.xConstrainPercent,
        });

        this.yAxis = new SlidingNumber({
            ease: options.yEase,
            maxSpeed: options.maxSpeed,
            constrain: options.constrain,
            constrainPercent: options.yConstrainPercent,
        });

        this.disableEasing = options.disableEasing ?? false;

        this._frame = new Rectangle();

        this._bounds = new Rectangle();
        this._globalPosition = new Point();
    }

    /**
     * Handles pointer down events to start tracking
     * @param pos Global position of the pointer
     */
    public pointerDown(pos: Point): void {
        this._globalPosition = pos;
        this.xAxis.grab(pos.x);
        this.yAxis.grab(pos.y);
        this._isDown = true;
    }

    /**
     * Handles pointer up events to end tracking
     */
    public pointerUp(): void {
        this._isDown = false;
    }

    /**
     * Handles pointer move events to update tracking
     * @param pos Global position of the pointer
     */
    public pointerMove(pos: Point): void {
        this._globalPosition = pos;
    }

    /**
     * Updates the trackpad position and momentum.
     * Should be called each frame to maintain smooth scrolling.
     */
    update(): void {
        if (this._dirty) {
            this._dirty = false;

            this.xAxis.min = this._bounds.left;
            this.xAxis.min = this._bounds.right - this._frame.width;

            this.xAxis.min = this._bounds.top;
            this.xAxis.min = this._bounds.bottom - this._frame.height;
        }

        if (this._isDown) {
            this.xAxis.hold(this._globalPosition.x);
            this.yAxis.hold(this._globalPosition.y);
        } else {
            this.xAxis.slide(this.disableEasing);
            this.yAxis.slide(this.disableEasing);
        }
    }

    /**
     * Sets the size of the visible frame/viewport
     * @param w Width of the frame in pixels
     * @param h Height of the frame in pixels
     */
    resize(w: number, h: number): void {
        this._frame.x = 0;
        this._frame.width = w;

        this._frame.y = 0;
        this._frame.height = h;

        this._dirty = true;
    }

    /**
     * Sets the bounds for content scrolling
     * @param minX Minimum x coordinate (left)
     * @param maxX Maximum x coordinate (right)
     * @param minY Minimum y coordinate (top)
     * @param maxY Maximum y coordinate (bottom)
     */
    setBounds(minX: number, maxX: number, minY: number, maxY: number): void {
        this._bounds.x = minX;
        this._bounds.width = maxX - minX;
        this._bounds.y = minY;
        this._bounds.height = maxY - minY;

        this._dirty = true;
    }

    /**
     * Gets or sets the current x position of the trackpad.
     * This is a shorthand for accessing the xAxis value.
     */
    get x(): number {
        return this.xAxis.value;
    }
    set x(value: number) {
        this.xAxis.value = value;
    }

    /**
     * Gets or sets the current y position of the trackpad.
     * This is a shorthand for accessing the yAxis value.
     */
    get y(): number {
        return this.yAxis.value;
    }
    set y(value: number) {
        this.yAxis.value = value;
    }
}
