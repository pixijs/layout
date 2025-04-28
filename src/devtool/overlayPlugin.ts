import { Point, Rectangle } from 'pixi.js';
import { calculateRegions, type DebugRegions, DebugRegionType } from '../core/debug/calculateDebugRegions';

import type { OverlayExtension } from '@pixi/devtools';

const regions: DebugRegions = new Map();
const point = new Point();

Object.values(DebugRegionType).forEach((type) => {
    regions.set(type, {
        outer: new Rectangle(),
        inner: new Rectangle(),
    });
});

export const overlayPlugin: OverlayExtension = {
    extension: {
        name: 'layout-scene-overlay',
        type: 'overlay',
    },
    getSelectedStyle() {
        return {
            backgroundColor: 'rgba(0, 255, 255, 0.5)',
            border: '2px solid white',
        };
    },
    getHoverStyle() {
        return {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '2px solid white',
        };
    },
    getGlobalBounds(node) {
        if (node.layout) {
            calculateRegions(node.layout, regions);
            const region = regions.get(DebugRegionType.Margin)!;
            const { left, top } = node.layout.computedLayout;
            const pos = node.layout.target.getGlobalPosition(point);

            return {
                x: region.outer.x + pos.x + left,
                y: region.outer.y + pos.y + top,
                width: region.outer.width,
                height: region.outer.height,
            };
        }

        return node.getBounds();
    },
};
