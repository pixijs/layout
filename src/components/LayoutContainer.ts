import {
    Container,
    type ContainerChild,
    type ContainerOptions,
    type DestroyOptions,
    Graphics,
    Rectangle,
    Ticker,
} from 'pixi.js';
import { BoxSizing, Edge } from 'yoga-layout/load';
import { type ComputedLayout } from '../core/types';
import { Trackpad, type TrackpadOptions } from './trackpad/Trackpad';

function bindAndPreserve<T extends object, K extends keyof T>(
    base: T,
    source: Container,
    methodNames: K[],
): Pick<T, K> {
    const bound = {} as Pick<T, K>;
    const proto = Object.getPrototypeOf(base);

    for (const name of methodNames) {
        const method = proto[name];

        bound[name] = method.bind(base);
        (base as any)[name] = (...args: any[]) => (source as any)[name](...args);
    }

    return bound;
}

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

    /** Access to original Container methods */
    public readonly containerMethods: Readonly<{
        addChild: <T extends ContainerChild>(...children: T[]) => T;
        addChildAt: <T extends ContainerChild>(child: T, index: number) => T;
        removeChild: <T extends ContainerChild>(...children: T[]) => T;
        removeChildAt: (index: number) => ContainerChild;
        getChildAt: (index: number) => ContainerChild;
        getChildIndex: (child: ContainerChild) => number;
        setChildIndex: (child: ContainerChild, index: number) => void;
        getChildByName: (name: string, deep?: boolean) => ContainerChild | null;
        removeChildren: (beginIndex?: number, endIndex?: number) => ContainerChild[];
        sortChildren: () => void;
        swapChildren: (child1: ContainerChild, child2: ContainerChild) => void;
        reparentChild: <T extends ContainerChild[]>(...children: T) => T[0];
        reparentChildAt: <T extends ContainerChild>(child: T, index: number) => T;
        getChildByLabel: (label: string, deep?: boolean) => ContainerChild | null;
        getChildrenByLabel: (label: string, deep?: boolean, out?: ContainerChild[]) => ContainerChild[];
    }>;

    /** The trackpad for handling scrolling */
    protected _trackpad: Trackpad;

    /** Mask for overflow handling */
    private _mask: Graphics = new Graphics();

    /** Whether or not the background was created by the user */
    private _isUserBackground: boolean = false;

    /** The maximum visual bounds of the layout */
    private _visualBounds = new Rectangle();
    /** The scroll bounds for the container where scroll events can occur */
    private _scrollBounds = new Rectangle();

    constructor(params: LayoutContainerOptions = {}) {
        const { layout, trackpad, background, children, ...options } = params;

        super(options);
        this.layout = layout ?? {};
        children?.forEach((child) => this.addChild(child));

        this.overflowContainer.isOverflowContainer = true;
        this.background = background ?? new Graphics({ label: 'background' });
        this._isUserBackground = !!background;

        this.addChild(this.background, this.overflowContainer, this._mask, this.stroke);
        // Preserve original Container methods and bind them to use the overflowContainer
        this.containerMethods = bindAndPreserve(this, this.overflowContainer, [
            'addChild',
            'addChildAt',
            'removeChild',
            'removeChildAt',
            'getChildAt',
            'getChildIndex',
            'setChildIndex',
            'getChildByName',
            'removeChildren',
            'sortChildren',
            'swapChildren',
            'reparentChild',
            'reparentChildAt',
            'getChildByLabel',
            'getChildrenByLabel',
        ]) as typeof this.containerMethods;

        this._trackpad = new Trackpad({
            constrain: true,
            ...trackpad,
        });
        this.eventMode = 'static';
        this.on(
            'pointerdown',
            (e) => this.isPointWithinBounds(e.global.x, e.global.y) && this._trackpad.pointerDown(e.global),
        );
        this.on('pointerup', () => this._trackpad.pointerUp());
        this.on('pointerupoutside', () => this._trackpad.pointerUp());
        this.on(
            'pointermove',
            (e) => this.isPointWithinBounds(e.global.x, e.global.y) && this._trackpad.pointerMove(e.global),
        );
        this.on('pointercancel', () => this._trackpad.pointerUp());
        this.on('wheel', (e) => {
            const overflow = this.layout?.style.overflow;

            if (overflow !== 'scroll') {
                return;
            }
            // check that the pointer position is within the visual bounds
            if (!this.isPointWithinBounds(e.global.x, e.global.y)) {
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

    /**
     * Computes the layout data for this container based on yoga calculations and draws the background.
     * @param computedLayout - The computed layout data from yoga
     * @returns Position and scale information for the container
     * @internal
     */
    override computeLayoutData(computedLayout: ComputedLayout) {
        this._drawBackground(computedLayout);

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
    protected _updateMask(
        width: number,
        height: number,
        radius: number = 0,
        borderWidth: number = 0,
        isContentBox: boolean = false,
    ) {
        // Account for border width if box-sizing is content-box. In content-box mode the computed
        // layout width/height excludes the border, so the visible (masked) area should include it.
        const maskX = isContentBox ? -borderWidth : 0;
        const maskY = isContentBox ? -borderWidth : 0;
        const maskWidth = isContentBox ? width + borderWidth * 2 : width;
        const maskHeight = isContentBox ? height + borderWidth * 2 : height;

        // Draw a single rounded rect used as the clip mask.
        this._mask.clear();
        this._mask.roundRect(0, 0, maskWidth, maskHeight, radius);
        this._mask.position.set(maskX, maskY);
        this._mask.fill(0xffffff);
        this._scrollBounds.set(
            maskX + borderWidth,
            maskY + borderWidth,
            maskWidth - borderWidth * 2,
            maskHeight - borderWidth * 2,
        );
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
            } else {
                background.fill({ color: 0xffffff, alpha: 0 });
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
        let borderWidth = this.layout!.yoga.getBorder(Edge.All);

        if (isNaN(borderWidth) || borderWidth < 0) {
            borderWidth = 0;
        }
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
            this._updateMask(
                computedLayout.width,
                computedLayout.height,
                layoutStyles.borderRadius ?? 0,
                borderWidth,
                boxSizing === BoxSizing.ContentBox,
            );
            this._updateScrollArea();
            this.setMask({ mask: this._mask });

            const maskWidth = computedLayout.width - this._visualBounds.width;
            const maskHeight = computedLayout.height - this._visualBounds.height;

            this._trackpad.xAxis.max = Math.min(0, maskWidth);
            this._trackpad.yAxis.max = Math.min(0, maskHeight);
        } else {
            this.mask = null;
            this._trackpad.xAxis.value = 0;
            this._trackpad.yAxis.value = 0;
            this.overflowContainer.position.set(0, 0);
        }
    }

    protected _updateScrollArea() {
        let maxBottom = 0;
        let maxRight = 0;

        for (let i = 0; i < this.layout!.yoga.getChildCount(); i++) {
            const child = this.layout!.yoga.getChild(i);
            const bottom = child.getComputedTop() + child.getComputedHeight();
            const right = child.getComputedLeft() + child.getComputedWidth();

            if (right > maxRight) maxRight = right;
            if (bottom > maxBottom) maxBottom = bottom;
        }

        maxRight += this.layout!.yoga.getComputedPadding(Edge.Right);
        maxBottom += this.layout!.yoga.getComputedPadding(Edge.Bottom);

        const borderWidth = this.layout!.yoga.getBorder(Edge.All) || 0;

        maxRight += borderWidth;
        maxBottom += borderWidth;

        this._visualBounds.width = Math.max(this._visualBounds.width, maxRight);
        this._visualBounds.height = Math.max(this._visualBounds.height, maxBottom);
    }

    /**
     * Checks if a point is within the visual bounds of the container, accounting for world transformations.
     * @param x - The x-coordinate of the point to check
     * @param y - The y-coordinate of the point to check
     * @returns True if the point is within the visual bounds, false otherwise
     */
    protected isPointWithinBounds(x: number, y: number): boolean {
        return this._scrollBounds.contains(x - this.worldTransform.tx, y - this.worldTransform.ty);
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
