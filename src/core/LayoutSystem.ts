import { type Container, ExtensionType, type System } from 'pixi.js';
import { Direction, loadYoga } from 'yoga-layout/load';
import { type OverflowContainer } from '../components/LayoutContainer';
import { setYoga } from '../yoga';
import { calculatePositionSpecifier } from './mixins/utils/calculatePositionSpecifier';
import { getPixiSize } from './utils/getPixiSize';
import { nearlyEqual } from './utils/nearlyEqual';
import { throttle as throttleFn } from './utils/throttle';

import type { DebugRenderer } from './debug/DebugRenderer';

/**
 * Options for the layout system
 */
export interface LayoutSystemOptions {
    layout: {
        /** Whether the layout system should automatically update the layout when it detects changes */
        autoUpdate: boolean;
        /** Whether to enable debug mode */
        enableDebug: boolean;
        /** The number of modifications to trigger rendering the heatmap */
        debugModificationCount: number;
        /** The length of time in milliseconds to throttle the calculating auto layout values */
        throttle: number;
    };
}

/**
 * The layout system is responsible for updating the layout of the containers
 * @memberof rendering
 */
export class LayoutSystem implements System<LayoutSystemOptions> {
    /** @ignore */
    public static extension = {
        type: [ExtensionType.WebGLSystem, ExtensionType.WebGPUSystem],
        name: 'layout',
    } as const;

    /**
     * Whether the layout system should automatically update the layout when it detects changes
     * @default true
     */
    public autoUpdate = true;

    private _debugEnabled = false;
    private _debugRenderer: DebugRenderer | null = null;

    private _throttledUpdateSize!: (container: Container) => void;
    private _throttle = 100;
    private _modificationCount = 50;

    /**
     * Initializes the layout system by loading the Yoga library asynchronously
     * @returns A promise that resolves when the system is ready
     */
    public async init(options?: LayoutSystemOptions) {
        setYoga(await loadYoga());
        const { layout } = options ?? {};
        const { autoUpdate, enableDebug, throttle, debugModificationCount } = layout ?? {};

        if (enableDebug) {
            void this.enableDebug(true);
        }

        if (autoUpdate !== undefined) {
            this.autoUpdate = autoUpdate;
        }

        this._throttle = throttle ?? this._throttle;
        this._throttledUpdateSize = throttleFn((container: Container) => this._updateSize(container), this._throttle);

        this._modificationCount = debugModificationCount ?? this._modificationCount;
    }

    /**
     * Toggles the debug mode for the layout system
     * @param value - Whether to enable or disable debug mode
     */
    public async enableDebug(value = !this._debugEnabled) {
        this._debugEnabled = value;

        if (!this._debugRenderer) {
            const res = await import('./debug/DebugRenderer');

            this._debugRenderer = new res.DebugRenderer();
        }

        if (!this._debugEnabled) {
            this._debugRenderer!.reset();
        }
    }

    /**
     * Updates the layout of the container and its children
     * @param container - The container to update the layout for
     */
    public update(container: Container) {
        if (this._debugEnabled && this._debugRenderer) {
            this._debugRenderer.reset();
            container.addChild(this._debugRenderer.holder);
        }

        // Before we start updating the layout, we need to ensure that the size of the yoga nodes are up to date
        this._throttledUpdateSize(container);

        // loop through entire scene and check for any layout updates!
        this.updateLayout(container);
    }

    public prerender({ container }: { container: Container }) {
        if (this.autoUpdate) {
            this.update(container);
        }
    }

    /**
     * Updates the size of the yoga nodes for the containers that use pixi size
     * @param container - The container to update the size for
     */
    private _updateSize(container: Container) {
        const layout = container._layout;

        if (layout) {
            const layoutStyles = layout.style;

            if (layoutStyles.width === 'intrinsic' || layoutStyles.height === 'intrinsic') {
                const size = getPixiSize(layout);

                if (layoutStyles.width === 'intrinsic') {
                    const currentWidth = layout.yoga.getWidth().value;

                    if (!nearlyEqual(currentWidth, size.width)) {
                        layout.yoga.setWidth(size.width);
                        layout.invalidateRoot();
                    }
                }
                if (layoutStyles.height === 'intrinsic') {
                    const currentHeight = layout.yoga.getHeight().value;

                    if (!nearlyEqual(currentHeight, size.height)) {
                        layout.yoga.setHeight(size.height);
                        layout.invalidateRoot();
                    }
                }
            }

            // if the container is not visible, we need to remove it from the layout
            if (!container.visible) {
                layout._onChildRemoved();

                return;
            }
        }

        for (let i = 0; i < container.children.length; i++) {
            this._updateSize(container.children[i]!);
        }
    }

    /**
     * Updates the layout of the container and its children
     * @param container - The container to update the layout for
     */
    private updateLayout(container: Container) {
        const layout = container._layout;

        // return early if the container is not visible
        if (!container.visible) {
            return;
        }

        if (layout) {
            const yogaNode = layout.yoga;
            const layoutStyles = layout.style;

            const isOverflowContainer = (container.parent as OverflowContainer)?.isOverflowContainer;
            const hasParentLayout = container.parent?._layout;

            if (!hasParentLayout && !isOverflowContainer) {
                if (layout._isDirty) {
                    layout._isDirty = false;
                    yogaNode.calculateLayout(
                        layoutStyles.width as number, // TODO: if this is not a number, it will not work
                        layoutStyles.height as number,
                        yogaNode.getDirection() ?? Direction.LTR,
                    );
                }
            }

            if (yogaNode.hasNewLayout() || layout._forceUpdate) {
                // Reset the flag
                yogaNode.markLayoutSeen();
                layout._forceUpdate = false;

                layout._computedLayout = yogaNode.getComputedLayout();
                const res = calculatePositionSpecifier(layoutStyles.transformOrigin, layout._computedLayout, {
                    width: 0,
                    height: 0,
                });

                layout._computedPixiLayout = {
                    ...container.computeLayoutData!(layout._computedLayout),
                    originX: res.x,
                    originY: res.y,
                };

                container.emit('layout', layout);
                container.onLayout?.(layout);
                container._onUpdate();
            }

            if (this._debugEnabled) {
                if (
                    layout._styles.custom.debug ||
                    (layout._modificationCount > this._modificationCount && layout._styles.custom.debugHeat !== false)
                ) {
                    this._debugRenderer?.render(layout);
                }
            }
        }

        // update the children!
        for (let i = 0; i < container.children.length; i++) {
            this.updateLayout(container.children[i]!);
        }
    }

    /**
     * @ignore
     */
    public destroy(): void {
        if (!this._debugEnabled && this._debugRenderer) {
            this._debugRenderer!.destroy();
        }
    }
}
