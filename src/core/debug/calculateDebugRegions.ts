import { Bounds, Rectangle } from 'pixi.js';
import { Edge, FlexDirection } from 'yoga-layout/load';

import type { Layout } from '../Layout';

type DebugRegionRects = {
    outer: Rectangle; // Outer bounds of the region
    inner: Rectangle; // Inner bounds (for cut-out regions)
};

export type DebugRegions = Map<DebugRegionType, DebugRegionRects>;

/**
 * Types of regions that can be debugged in the yoga layout
 */
export enum DebugRegionType {
    Margin = 'margin', // Outer spacing around element
    Padding = 'padding', // Inner spacing within element
    Border = 'border', // Border area between margin and padding
    Flex = 'flex', // Flex container area
    Content = 'content', // Content area inside padding
}

/**
 * Edge measurements for margin, padding, or border
 */
interface EdgeValues {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

/**
 * Get the edge values for margin, padding, or border
 */
function getEdgeValues(layout: Layout, type: 'margin' | 'padding' | 'border'): EdgeValues {
    const method = `getComputed${type.charAt(0).toUpperCase() + type.slice(1)}` as
        | 'getComputedMargin'
        | 'getComputedPadding'
        | 'getComputedBorder';

    return {
        top: layout.yoga[method](Edge.Top),
        right: layout.yoga[method](Edge.Right),
        bottom: layout.yoga[method](Edge.Bottom),
        left: layout.yoga[method](Edge.Left),
    };
}

/**
 * Calculates and updates the debug regions (margin, border, and padding) for a given layout.
 * This function modifies the provided `regions` object to reflect the computed bounds
 * and edge values (margin, border, and padding) of the layout.
 *
 * @param layout - The layout object containing computed bounds and edge values.
 * @param regions - A map of debug region types to their corresponding debug region objects.
 *                  The function updates the regions for margin, border, and padding.
 */
export function calculateRegions(layout: Layout, regions: DebugRegions): void {
    const { width, height } = layout.computedLayout;
    const margin = getEdgeValues(layout, 'margin');
    const border = getEdgeValues(layout, 'border');
    const padding = getEdgeValues(layout, 'padding');

    // Margin region
    const marginRegion = regions.get(DebugRegionType.Margin)!;

    marginRegion.outer.x = -margin.left;
    marginRegion.outer.y = -margin.top;
    marginRegion.outer.width = width + margin.left + margin.right;
    marginRegion.outer.height = height + margin.top + margin.bottom;

    marginRegion.inner.x = 0;
    marginRegion.inner.y = 0;
    marginRegion.inner.width = width;
    marginRegion.inner.height = height;

    // Border region
    const borderRegion = regions.get(DebugRegionType.Border)!;

    borderRegion.outer.x = 0;
    borderRegion.outer.y = 0;
    borderRegion.outer.width = width;
    borderRegion.outer.height = height;

    borderRegion.inner.x = border.left;
    borderRegion.inner.y = border.top;
    borderRegion.inner.width = width - border.left - border.right;
    borderRegion.inner.height = height - border.top - border.bottom;

    // Padding region
    const paddingRegion = regions.get(DebugRegionType.Padding)!;

    paddingRegion.outer.copyFrom(borderRegion.inner!);
    paddingRegion.inner.x = padding.left + border.left;
    paddingRegion.inner.y = padding.top + border.top;
    paddingRegion.inner.width = width - padding.left - padding.right - border.left - border.right;
    paddingRegion.inner.height = height - padding.top - padding.bottom - border.top - border.bottom;

    calculateFlexRegion(layout, regions);
}

function calculateFlexRegion(layout: Layout, regions: DebugRegions): void {
    const flexRegion = regions.get(DebugRegionType.Flex)!;
    const paddingRegion = regions.get(DebugRegionType.Padding)!;

    flexRegion.outer.copyFrom(paddingRegion.inner!);
    const bounds = new Bounds();

    const children = layout.yoga.getChildCount();

    for (let i = 0; i < children; i++) {
        const child = layout.yoga.getChild(i);
        const computedBounds = child.getComputedLayout();

        // TODO: for this to be accurate we would need to create the bounds per child and then content could be an array
        bounds.addRect(
            new Rectangle(computedBounds.left, computedBounds.top, computedBounds.width, computedBounds.height),
        );
    }

    const flexDir = layout.yoga.getFlexDirection();

    if (flexDir === FlexDirection.Column || flexDir === FlexDirection.ColumnReverse) {
        bounds.width = flexRegion.outer.width;
        bounds.x = flexRegion.outer.x;
    } else {
        bounds.height = flexRegion.outer.height;
        bounds.y = flexRegion.outer.y;
    }

    flexRegion.inner?.copyFrom(bounds.rectangle);
    regions.get(DebugRegionType.Content)!.outer.copyFrom(bounds.rectangle);
}
