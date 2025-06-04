import {
    Container,
    type ContainerChild,
    type ContainerOptions,
    type DestroyOptions,
    Graphics,
    type IRenderLayer,
    Rectangle,
    Ticker,
} from 'pixi.js';
import { BoxSizing, Edge } from 'yoga-layout/load';
import { type ComputedLayout } from '../core/types';
import { Trackpad, type TrackpadOptions } from './trackpad/Trackpad';

/**
 * Options for configuring the layout container.
 * @property {TrackpadOptions} [trackpad] - Options to configure the trackpad for scrolling
 */
export interface LayoutContainerOptions extends ContainerOptions {
    /** Options to configure the trackpad for scrolling */
    trackpad?: TrackpadOptions;
    /** A container to be used for the background */
    background?: ContainerChild;
}

/**
 * A specialized container that serves as an overflow container for scrolling content.
 */
export interface OverflowContainer extends Container {
    isOverflowContainer: boolean;
}

/**
 * A container that behaves like an HTML div element with flexbox-style layout capabilities.
 *
 * Supports objectFit, objectPosition, backgroundColor, borderColor, and overflow
 *
 * @example
 * ```typescript
 * // Create a container with background and border
 * const container = new LayoutContainer();
 * container.layout = {
 *     width: 300,
 *     height: 200,
 *     backgroundColor: 0xFF0000,
 *     borderWidth: 2,
 *     borderColor: 0x000000,
 *     borderRadius: 8,
 *     padding: 16,
 *     flexDirection: 'row',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 * };
 *
 * // Create child elements
 * const child1 = new Container();
 * child1.layout = { flex: 1 };
 * const child2 = new Container();
 * child2.layout = { flex: 2 };
 *
 * // Add children which will be positioned using flex layout
 * container.addChild(child1, child2);
 * ```
 */
export class LayoutContainer extends Container {
    /** Graphics object used for rendering background and borders */
    public background: Container | Graphics;
    public stroke: Graphics = new Graphics({ label: 'stroke' });

    /** The container that holds the overflow content */
    public overflowContainer: OverflowContainer = new Container({
        label: 'overflowContainer',
    }) as OverflowContainer;

    /** The trackpad for handling scrolling */
    protected _trackpad: Trackpad;

    /** Mask for overflow handling */
    private _mask: Graphics = new Graphics();

    /** Whether or not the background was created by the user */
    private _isUserBackground: boolean = false;

    /** The hit area for the container */
    private _hitArea = new Rectangle();

    constructor(params: LayoutContainerOptions = {}) {
        const { layout, trackpad, background, ...options } = params;

        super(options);
        this.layout = layout ?? {};

        this.overflowContainer.isOverflowContainer = true;
        this.background = background ?? new Graphics({ label: 'background' });
        this._isUserBackground = !!background;

        this.addChild(this.background, this.overflowContainer, this._mask, this.stroke);
        this.addChild = this._addChild;
        this.removeChild = this._removeChild;

        this._trackpad = new Trackpad({
            constrain: true,
            ...trackpad,
        });
        this.eventMode = 'static';
        this.on('pointerdown', (e) => this._trackpad.pointerDown(e.global));
        this.on('pointerup', () => this._trackpad.pointerUp());
        this.on('pointerupoutside', () => this._trackpad.pointerUp());
        this.on('pointermove', (e) => this._trackpad.pointerMove(e.global));
        this.on('pointercancel', () => this._trackpad.pointerUp());
        this.on('wheel', (e) => {
            const overflow = this.layout?.style.overflow;

            if (overflow !== 'scroll') {
                return;
            }
            const shift = e.shiftKey ? 1 : 0;
            const deltaX = e.deltaX * (shift ? 1 : -1);
            const deltaY = e.deltaY * (shift ? -1 : 1);

            const targetX = this._trackpad.xAxis.value - deltaX;
            const targetY = this._trackpad.yAxis.value - deltaY;

            this._trackpad.xAxis.value = Math.max(
                this._trackpad.xAxis.max,
                Math.min(this._trackpad.xAxis.min, targetX),
            );
            this._trackpad.yAxis.value = Math.max(
                this._trackpad.yAxis.max,
                Math.min(this._trackpad.yAxis.min, targetY),
            );
        });
        Ticker.shared.add(this.update, this);
    }

    protected _addChild<U extends (ContainerChild | IRenderLayer)[]>(..._children: U): U[0] {
        return this.overflowContainer.addChild(..._children);
    }

    protected _removeChild<U extends (ContainerChild | IRenderLayer)[]>(..._children: U): U[0] {
        return this.overflowContainer.removeChild(..._children);
    }

    /**
     * Computes the layout data for this container based on yoga calculations and draws the background.
     * @param computedLayout - The computed layout data from yoga
     * @returns Position and scale information for the container
     * @internal
     */
    override computeLayoutData(computedLayout: ComputedLayout) {
        this._drawBackground(computedLayout);
        this._hitArea.width = computedLayout.width;
        this._hitArea.height = computedLayout.height;
        this.hitArea = this._hitArea;

        return {
            x: computedLayout.left,
            y: computedLayout.top,
            offsetX: 0,
            offsetY: 0,
            scaleX: 1,
            scaleY: 1,
        };
    }

    /**
     * Updates the container mask based on overflow settings
     * @param width - Container width
     * @param height - Container height
     * @param radius - Border radius
     */
    protected _updateMask(width: number, height: number, radius: number = 0) {
        this._mask.clear();
        this._mask.roundRect(0, 0, width, height, radius);
        this._mask.fill(0x0000ff);
        this._mask.roundRect(1, 1, width - 2, height - 2, radius);
        this._mask.cut();
        this._mask.roundRect(1, 1, width - 2, height - 2, radius);
        this._mask.fill(0x00ff00);
        this._mask.cut();
    }

    protected _updateBackground(computedLayout: ComputedLayout) {
        const layoutStyles = this.layout!.style;
        const { backgroundColor, borderRadius } = layoutStyles;

        if (this._isUserBackground) {
            this.background.position.set(0, 0);
            this.background.setSize(computedLayout.width, computedLayout.height);
        } else {
            const background = this.background as Graphics;

            background.clear();
            background.roundRect(0, 0, computedLayout.width, computedLayout.height, borderRadius ?? 0);
            // eslint-disable-next-line no-eq-null, eqeqeq
            if (backgroundColor != null) {
                background.fill({ color: backgroundColor });
            }
        }
    }

    /**
     * Draws the container's background including:
     * - Background color
     * - Border
     * - Border radius
     *
     * @param computedLayout - The computed layout data from yoga
     * @protected
     */
    protected _drawBackground(computedLayout: ComputedLayout) {
        const borderWidth = this.layout!.yoga.getBorder(Edge.All);
        const boxSizing = this.layout!.yoga.getBoxSizing();
        const alignment = boxSizing === BoxSizing.BorderBox ? 1 : 0;

        const layoutStyles = this.layout!.style;
        const { borderColor, borderRadius } = layoutStyles;

        this._updateBackground(computedLayout);
        this.stroke.clear();

        // eslint-disable-next-line no-eq-null, eqeqeq
        if (borderWidth > 0 && borderColor != null) {
            this.stroke.roundRect(0, 0, computedLayout.width, computedLayout.height, borderRadius ?? 0);
            this.stroke.stroke({ color: borderColor, width: borderWidth, alignment });
        }

        // Handle overflow
        const overflow = this.layout?.style.overflow;

        if (overflow !== 'visible') {
            this._updateMask(computedLayout.width, computedLayout.height, layoutStyles.borderRadius ?? 0);
            this.setMask({ mask: this._mask });
            // the max value is actually the difference between the container size and the content size and the stroke
            const borderOffset = boxSizing === BoxSizing.BorderBox ? borderWidth : 0;

            setTimeout(() => {
                const maskWidth = computedLayout.width - this.overflowContainer.width - borderOffset * 2;
                const maskHeight = computedLayout.height - this.overflowContainer.height - borderOffset * 2;

                this._trackpad.xAxis.max = Math.min(0, maskWidth);
                this._trackpad.yAxis.max = Math.min(0, maskHeight);
            }, 1);
        } else {
            this.mask = null;
            this._trackpad.xAxis.value = 0;
            this._trackpad.yAxis.value = 0;
            this.overflowContainer.position.set(0, 0);
        }
    }

    protected update(): void {
        const overflow = this.layout?.style.overflow;

        if (overflow !== 'scroll') {
            return;
        }
        this._trackpad.update();
        this.overflowContainer.x = this._trackpad.x;
        this.overflowContainer.y = this._trackpad.y;
    }

    public override destroy(options?: DestroyOptions): void {
        super.destroy(options);
        Ticker.shared.remove(this.update, this);
    }
}
