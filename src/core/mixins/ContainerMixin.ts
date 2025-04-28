import { Container, extensions } from 'pixi.js';
import { Layout, type LayoutOptions } from '../Layout';
import { type ComputedLayout } from '../types';
import { baseComputeLayoutData } from './utils/baseComputeLayoutData';

/**
 * Extended interface for Container with private properties needed for layout
 * Provides type safety for internal properties we need to access
 */
interface PrivateContainer extends Omit<Container, '_didLocalTransformChangeId'> {
    _didLocalTransformChangeId: number;
}

const visibility = Object.getOwnPropertyDescriptor(Container.prototype, 'visible')!;

const mixin: Partial<PrivateContainer> = {
    // Internal reference to the layout object
    _layout: null,

    /**
     * Gets the current layout associated with this container
     * @returns The container's layout or null if no layout is attached
     */
    get layout(): Layout | null {
        return this._layout ?? null;
    },

    /**
     * Sets the layout for this container
     * @param value - Layout options to apply, or null to remove layout
     */
    set layout(value: Omit<LayoutOptions, 'target'> | null | boolean) {
        // If the value is a boolean, we want to treat it as an empty object
        value = value === true ? {} : value;

        if (!value) {
            if (this._layout) {
                this._layout.destroy();
                this._layout = null;
                this.updateLocalTransform = Container.prototype.updateLocalTransform;
                Object.defineProperty(Container.prototype, 'visible', visibility);
            }

            return;
        }

        if (!this._layout) {
            this._layout = new Layout({ target: this as unknown as Container });

            // eslint-disable-next-line accessor-pairs
            Object.defineProperty(Container.prototype, 'visible', {
                ...visibility,
                set(visibleValue: boolean) {
                    visibility.set!.call(this, visibleValue);
                    if (this.layout) {
                        if (visibleValue && this.parent) {
                            this.layout._onChildAdded(this.parent);
                        } else {
                            this.layout._onChildRemoved();
                        }
                    }
                },
            });
            if (this.parent && this.visible) {
                this._layout._onChildAdded(this.parent);
            }
        }

        this._layout.setStyle(value);

        this.updateLocalTransform = this.updateLocalTransformWithLayout;
        this._onUpdate!();
    },

    /**
     * This function overrides how we calculate the local transform of the container.
     * For the layout, we need to not only calculate the transform matrix, but also
     * take into account the yoga layout's position and scale.
     */
    updateLocalTransformWithLayout() {
        const localTransformChangeId = this._didContainerChangeTick;
        // early out if nothing has changed

        if (this._didLocalTransformChangeId === localTransformChangeId) return;
        this._didLocalTransformChangeId = localTransformChangeId;

        const layout = this._layout!;

        // this will return the position and scale offsets we should add to the local matrix
        const { x, y, offsetX, offsetY, scaleX, scaleY, originX, originY } = layout._computedPixiLayout!;

        // if this is a leaf node then we must pretend that the leaf is inside of a container
        // this allows use to define the "box" that the leaf is inside of
        // and then apply the transform to the container instead of the leaf
        // we then apply the additional transforms to the leaf to push it around inside of its box
        // this effectively splits the transform into two parts
        const lt = this.localTransform;
        const { rotation, skew, scale, position } = this;

        // Precompute trig values
        const xRotY = rotation + skew._y;
        const xRotX = rotation - skew._x;

        const a = Math.cos(xRotY) * scale._x;
        const b = Math.sin(xRotY) * scale._x;
        const c = -Math.sin(xRotX) * scale._y;
        const d = Math.cos(xRotX) * scale._y;

        // Apply offset, origin and position in one step
        const tx = position._x + x - originX * a - originY * c;
        const ty = position._y + y - originX * b - originY * d;

        // Apply additional static transform and re-add origin
        lt.a = a * scaleX;
        lt.b = b * scaleX;
        lt.c = c * scaleY;
        lt.d = d * scaleY;
        lt.tx = tx + (offsetX * a + offsetY * c) + originX;
        lt.ty = ty + (offsetX * b + offsetY * d) + originY;
    },

    /**
     * Apply the computed layout to the container
     * Converts Yoga layout information into PixiJS positioning
     * @param computedLayout - Layout data from Yoga engine
     * @returns Transformed position and scale data for this container
     * @memberof scene.Container#
     */
    computeLayoutData(computedLayout: ComputedLayout) {
        const layout = this._layout!;
        const { isLeaf } = layout._styles.custom;

        if (isLeaf) {
            return baseComputeLayoutData(this as unknown as Container, computedLayout, 'fill');
        }

        return {
            x: computedLayout.left,
            y: computedLayout.top,
            offsetX: 0,
            offsetY: 0,
            scaleX: 1,
            scaleY: 1,
        };
    },
} as PrivateContainer;

extensions.mixin(Container, mixin);
