import { Container, Graphics, type PointData, type Rectangle } from 'pixi.js';
import { DebugRegionType } from './calculateDebugRegions';

/**
 * Represents a debug region with its visual properties
 */
export interface DebugNodeRegion {
    outer: Rectangle; // Outer bounds of the region
    inner: Rectangle; // Inner bounds (for cut-out regions)
    color: string; // Color used to render the region
    draw: boolean; // Whether to render this region
}

function lerpColor(start: [number, number, number], end: [number, number, number], t: number): string {
    const r = Math.round(start[0] + (end[0] - start[0]) * t);
    const g = Math.round(start[1] + (end[1] - start[1]) * t);
    const b = Math.round(start[2] + (end[2] - start[2]) * t);

    return `rgb(${r},${g},${b})`;
}

/**
 * Visual debug object that renders layout regions
 */
export class DebugNode extends Container {
    /** Graphics objects for each region type */
    private readonly graphics: Map<DebugRegionType, Graphics>;
    private readonly heatGraphics: Graphics;

    constructor() {
        super();
        this.graphics = new Map();

        // Create a graphics object for each region type
        Object.values(DebugRegionType).forEach((type) => {
            const graphics = new Graphics();

            this.graphics.set(type, graphics);
            this.addChild(graphics);
        });
        this.heatGraphics = new Graphics();
        this.addChild(this.heatGraphics);
    }

    /**
     * Initialize the debug object with region data
     */
    init(
        regions: Record<DebugRegionType, DebugNodeRegion> & {
            target: PointData;
            alpha: number;
            heat: { invalidationCount: number; draw: boolean };
            heatOnly: boolean;
        },
    ): void {
        const { target, alpha, heat } = regions;

        if (!regions.heatOnly) {
            // Draw each region
            Object.entries(regions).forEach(([type, region]) => {
                if (type === 'target' || type === 'alpha' || type === 'heat' || type === 'heatOnly') return;

                region = region as DebugNodeRegion;
                const graphics = this.graphics.get(type as DebugRegionType);

                if (!graphics || !region.draw) return;

                // Draw either a cut box (for regions with inner area) or a solid box
                if (region.inner) {
                    this.drawCutBox(graphics, region.outer, region.inner, region.color, alpha);
                } else {
                    const { x, y, width, height } = region.outer;

                    graphics.rect(x, y, width, Math.max(height, 1));
                    graphics.fill({ color: region.color, alpha });
                }
            });
        }

        const { invalidationCount, draw } = heat;

        if (invalidationCount > 0 && draw) {
            const MAX_INVALIDATE_COUNT = 20;
            const normalizedAlpha = Math.min(invalidationCount / MAX_INVALIDATE_COUNT, 1);
            const marginRegion = regions[DebugRegionType.Margin];
            const startColor = [255, 255, 0] as [number, number, number]; // Yellow
            const endColor = [255, 0, 0] as [number, number, number]; // Red
            const color = lerpColor(startColor, endColor, normalizedAlpha);

            this.heatGraphics.rect(
                marginRegion.outer.x,
                marginRegion.outer.y,
                marginRegion.outer.width,
                marginRegion.outer.height,
            );
            this.heatGraphics.fill({ color, alpha: Math.min(0.3, normalizedAlpha) });
            this.heatGraphics.stroke({ color, alpha: Math.max(0.3, normalizedAlpha), pixelLine: true });
        }

        this.position.set(target.x, target.y);
    }

    /**
     * Reset the debug object's state
     */
    reset(): void {
        this.graphics.forEach((graphics) => graphics.clear());
        this.heatGraphics.clear();
        this.removeFromParent();
    }

    /**
     * Draw a box with a cut-out center
     */
    private drawCutBox(graphics: Graphics, outer: Rectangle, inner: Rectangle, color: string, alpha: number): void {
        const { x, y, width, height } = outer;
        const { x: innerX, y: innerY, width: innerWidth, height: innerHeight } = inner;

        // Draw outer box and cut out inner area
        graphics.rect(x, y, width, height);
        graphics.fill({ color, alpha });
        graphics.rect(innerX, innerY, innerWidth, innerHeight);
        graphics.cut();
    }
}
