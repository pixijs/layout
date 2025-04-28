import { Container, type ContainerChild, type IRenderLayer } from 'pixi.js';
import { type Layout, type LayoutOptions } from '../core/Layout';
import { LayoutContainer, type LayoutContainerOptions } from './LayoutContainer';

export interface LayoutViewOptions<T extends Container = Container> extends LayoutContainerOptions {
    /** The slot container for holding content */
    slot?: T;
}

/**
 * A specialized container that implements leaf node behavior similar to HTML elements
 * like `<img>` or `<video>`. It manages content through a single slot while supporting
 * layout and styling capabilities.
 *
 * Supports objectFit, objectPosition, backgroundColor, borderColor, and overflow
 *
 * @example
 * ```typescript
 * // Create a view container with an image
 * const view = new LayoutView({ slot: new Sprite() });
 * view.layout = {
 *     width: 200,
 *     height: 200,
 *     objectFit: 'cover',
 *     objectPosition: 'center',
 *     backgroundColor: 'red',
 * };
 * ```
 */
export class LayoutView<T extends Container = Container> extends LayoutContainer {
    /** The slot container for holding content */
    public slot: T;

    constructor(params: LayoutViewOptions<T>) {
        const { slot, layout, ...rest } = params;

        super(rest);
        this.slot = (params.slot as T) ?? new Container({ label: 'slot' });
        this.layout = layout ?? {};
        this.addChild(this.slot);
        // TODO: override all child related methods
        this.addChild = this._addChild;
        this.removeChild = this._removeChild;
    }

    /**
     * Gets the current layout associated with this container
     * @returns The container's layout or null if no layout is attached
     */
    override get layout(): Layout | null {
        return super.layout;
    }

    /**
     * Sets the layout for this container and configures its slot.
     *
     * The layout is split between the container and slot:
     * - Container: Handles positioning, size, and background
     * - Slot: Manages content fitting and positioning
     *
     * @param value - Layout options to apply, or null to remove layout
     *
     * @example
     * ```typescript
     * view.layout = {`
     *     width: '100%',
     *     objectFit: 'contain',
     *     objectPosition: 'center',
     *     backgroundColor: 'red'
     * };
     * ```
     */
    override set layout(value: Omit<LayoutOptions, 'target'> | null) {
        const { applySizeDirectly, objectFit, objectPosition, isLeaf, ...rest } = value ?? {};

        super.layout = rest;

        if (this.layout && this.slot) {
            this.slot.layout = {
                width: '100%',
                height: '100%',
                objectFit,
                objectPosition,
                applySizeDirectly,
                isLeaf,
            };
        }
    }

    /**
     * Prevents adding children directly to this container.
     * Content should be added to the slot instead.
     *
     * @throws {Error} Always throws an error to enforce leaf node behavior
     * @private
     */
    protected override _addChild<U extends (ContainerChild | IRenderLayer)[]>(..._children: U): U[0] {
        if (this.overflowContainer.children.length > 1) {
            throw new Error('Leaf nodes should not have multiple children');
        }

        return super._addChild(..._children);
    }
}
