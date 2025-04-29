import { BigPool, Container, Rectangle } from 'pixi.js';
import { type Layout } from '../Layout';
import { calculateRegions, type DebugRegions, DebugRegionType } from './calculateDebugRegions';
import { DebugNode, type DebugNodeRegion } from './DebugNode';

/**
 * Main debug renderer for Yoga layout
 * Handles visualization of layout regions and flex properties
 */
export class DebugRenderer {
    /** Container for all debug visuals */
    public readonly holder = new Container();

    /** Region data for each debug type */
    private readonly regions: DebugRegions = new Map();

    /** Color configuration for each region type */
    private readonly colors: Record<DebugRegionType, string> = {
        [DebugRegionType.Margin]: '#B68655',
        [DebugRegionType.Padding]: '#BAC57F',
        [DebugRegionType.Border]: '#E7C583',
        [DebugRegionType.Content]: '#89B1BE',
        [DebugRegionType.Flex]: '#6E28D9',
    };

    /** Global alpha value for all regions */
    public alpha = 0.75;

    constructor() {
        // Initialize rectangles for all region types
        Object.values(DebugRegionType).forEach((type) => {
            this.regions.set(type, {
                outer: new Rectangle(),
                inner: new Rectangle(),
            });
        });

        (this.holder as any).__devtoolIgnore = true;
        (this.holder as any).__devtoolIgnoreChildren = true;
        this.holder.eventMode = 'none';
        this.holder.interactiveChildren = false;
    }

    /**
     * Clean up previous render state
     */
    public reset(): void {
        for (let i = this.holder.children.length - 1; i >= 0; i--) {
            const child = this.holder.children[i] as DebugNode;

            BigPool.return(child);
        }
    }

    /**
     * Render debug visuals for the given layout
     */
    public render(layout: Layout): void {
        calculateRegions(layout, this.regions);
        const regionData = Object.values(DebugRegionType).reduce(
            (acc, type) => {
                const region = this.regions.get(type);

                if (!region) return acc;

                const drawString = `debugDraw${type.charAt(0).toUpperCase()}${type.slice(1)}` as
                    | 'debugDrawMargin'
                    | 'debugDrawPadding'
                    | 'debugDrawBorder'
                    | 'debugDrawFlex'
                    | 'debugDrawContent';

                acc[type] = {
                    ...region,
                    color: this.colors[type],
                    draw: layout._styles.custom[drawString] ?? true,
                };

                return acc;
            },
            {} as Record<DebugRegionType, DebugNodeRegion>,
        );

        const { left, top } = layout.computedLayout;
        const pos = layout.target.getGlobalPosition();
        const debugObject = BigPool.get(DebugNode, {
            ...regionData,
            target: { x: pos.x + left, y: pos.y + top },
            alpha: this.alpha,
            heat: {
                invalidationCount: layout._modificationCount,
                draw: layout._styles.custom.debugHeat !== false,
            },
            heatOnly: !layout._styles.custom.debug,
        });

        this.holder.addChildAt(debugObject, 0);
    }

    /**
     * Clean up the debug renderer
     */
    public destroy(): void {
        this.reset();
        this.holder.destroy();
        this.regions.clear();
    }
}
