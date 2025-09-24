import { type Container } from 'pixi.js';
import { type OverflowContainer } from '../../components/LayoutContainer';
import { type Layout } from '../Layout';

/**
 * Sorts the children of the layout based on their order in the parent container
 * syncing the Yoga tree with the Pixi display list.
 */
export function onChildAdded(layout: Layout, pixiParent: Container) {
    let parentLayout = pixiParent.layout;
    let overflowContainer: Container | undefined;

    // If inside an overflow container, actual yoga parent is the overflow's parent layout.
    if (!parentLayout && (pixiParent as OverflowContainer).isOverflowContainer) {
        overflowContainer = pixiParent;
        parentLayout = overflowContainer.parent?.layout;
        pixiParent = overflowContainer.parent!;
    }

    if (!parentLayout) {
        return false;
    }

    // Detach from previous yoga parent if any
    const yogaParent = layout.yoga.getParent();

    if (yogaParent) {
        yogaParent.removeChild(layout.yoga);
    }

    const yogaIndex = computeYogaInsertionIndex(layout, pixiParent, overflowContainer);

    if (yogaIndex === -1) {
        return false;
    }

    // Fast append path
    if (yogaIndex === parentLayout.yoga.getChildCount()) {
        parentLayout.yoga.insertChild(layout.yoga, yogaIndex);

        return true;
    }

    parentLayout.yoga.insertChild(layout.yoga, yogaIndex);

    return true;
}

/**
 * Computes the Yoga insertion index with a single pass over the logical (flattened if needed) sibling list.
 * @param layout - layout being inserted
 * @param parent - the real parent container whose layout we insert into
 * @param overflow - optional overflow container that actually contains the target
 */
function computeYogaInsertionIndex(layout: Layout, parent: Container, overflow?: Container): number {
    const target = layout.target;
    let index = 0;

    if (overflow) {
        // Iterate real parent children; when reaching overflow, iterate its children inline.
        for (const child of parent.children) {
            if (child === overflow) {
                for (const inner of overflow.children) {
                    if (!inner.layout || !inner.visible) continue;
                    if (inner === target) return index;
                    index++;
                }

                return -1; // target not found inside overflow
            }
            if (child.layout && child.visible) {
                index++;
            }
        }

        return -1;
    }
    for (const child of parent.children) {
        if (!child.layout || !child.visible) continue;
        if (child === target) return index;
        index++;
    }

    return -1;
}

/**
 * Removes the child from the layout
 */
export function onChildRemoved(layout: Layout) {
    const yogaParent = layout.yoga.getParent();

    if (yogaParent) {
        yogaParent.removeChild(layout.yoga);
    }
}
