import { type Container } from 'pixi.js';
import { type OverflowContainer } from '../../components/LayoutContainer';
import { type Layout } from '../Layout';

/**
 * Sorts the children of the layout based on their order in the parent container
 * This is necessary because not all children are part of the layout and we need to
 * make sure that the Yoga children are in the correct order
 * @param layout - The layout to sort the children for
 */
export function onChildAdded(layout: Layout, pixiParent: Container) {
    let yogaIndex = -1;
    let parentLayout = pixiParent.layout;
    const childrenToLoop = pixiParent.children;

    if (!parentLayout && (pixiParent as OverflowContainer).isOverflowContainer) {
        parentLayout = pixiParent.parent?.layout;
        pixiParent = pixiParent.parent!;
    }

    if (parentLayout) {
        const yogaParent = layout.yoga.getParent();

        if (yogaParent) {
            yogaParent!.removeChild(layout.yoga);
        }

        // If the child is the last one, we can just append it
        if (childrenToLoop.indexOf(layout.target) === childrenToLoop.length - 1) {
            parentLayout.yoga.insertChild(layout.yoga, parentLayout.yoga.getChildCount());

            return;
        }

        // Find the corresponding Yoga index
        for (let i = 0; i < childrenToLoop.length; i++) {
            const child = childrenToLoop[i]!;

            if (child.layout && child.visible) {
                yogaIndex++;
            }
            if (child === layout.target) {
                break;
            }
        }

        // If the yogaIndex is -1, it means the child was not found in the parent container
        // This can happen if the child is not part of the layout or is not visible
        // In this case, we do not insert the child into the Yoga layout
        if (yogaIndex === -1) {
            return;
        }

        parentLayout.yoga.insertChild(layout.yoga, yogaIndex);
    }
}

/**
 * Removes the child from the layout
 * @param layout - The layout to remove the child from
 */
export function onChildRemoved(layout: Layout) {
    const yogaParent = layout.yoga.getParent();

    yogaParent && yogaParent!.removeChild(layout.yoga);
}
