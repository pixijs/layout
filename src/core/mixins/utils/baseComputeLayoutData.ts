import { type Container, NineSliceSprite, type ObservablePoint, TilingSprite, type ViewContainer } from 'pixi.js';
import { type LayoutStyles } from '../../style/layoutStyles';
import { type ComputedLayout, type ComputedPixiLayout } from '../../types';
import { calculateObjectFit } from './calculateObjectFit';
import { calculatePositionSpecifier } from './calculatePositionSpecifier';

/**
 * Calculates the final position and scale for a container based on its layout
 * Handles object-fit and object-position to determine how content is sized and positioned
 *
 * @param container - The container to calculate layout data for
 * @param computedLayout - The computed layout data from Yoga
 * @param defaultObjectFit - Default object-fit value to use if none specified
 * @param anchor - Optional anchor point for positioning adjustments
 * @returns The final position and scale values to apply
 */

export function baseComputeLayoutData(
    container: Container | ViewContainer,
    computedLayout: ComputedLayout,
    defaultObjectFit: LayoutStyles['objectFit'],
    anchor?: ObservablePoint,
): ComputedPixiLayout {
    const bounds = container.getLocalBounds();

    const objectFit = container.layout!.style.objectFit || defaultObjectFit;
    let { offsetScaleX, offsetScaleY } = calculateObjectFit(objectFit, computedLayout, bounds);

    // scale the current bounds by the offset scale
    const scaledBounds = {
        width: bounds.width * offsetScaleX,
        height: bounds.height * offsetScaleY,
    };
    let { x: offsetX, y: offsetY } = calculatePositionSpecifier(
        container.layout!.style.objectPosition,
        computedLayout,
        scaledBounds,
    );

    // offset the anchor point if it exists, otherwise offset by the minX and minY to account for containers with negative x/y
    if (anchor) {
        offsetX += bounds.width * offsetScaleX * anchor._x;
        offsetY += bounds.height * offsetScaleY * anchor._y;
    } else {
        offsetX -= bounds.minX * offsetScaleX;
        offsetY -= bounds.minY * offsetScaleY;
    }

    const applySizeDirectly = container.layout!.style.applySizeDirectly;

    // If applySizeDirectly is true, set the container's width and height directly
    if (
        applySizeDirectly === true ||
        // eslint-disable-next-line eqeqeq
        (applySizeDirectly == undefined && (container instanceof TilingSprite || container instanceof NineSliceSprite))
    ) {
        container.width = bounds.width * offsetScaleX;
        container.height = bounds.height * offsetScaleY;
        offsetScaleX = 1;
        offsetScaleY = 1;
    }

    return {
        x: computedLayout.left,
        y: computedLayout.top,
        offsetX,
        offsetY,
        scaleX: offsetScaleX,
        scaleY: offsetScaleY,
    };
}
