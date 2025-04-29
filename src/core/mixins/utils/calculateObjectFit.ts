import { type Bounds } from 'pixi.js';
import { type LayoutStyles } from '../../style/layoutStyles';
import { type ComputedLayout } from '../../types';

/**
 * Calculates scaling factors for content based on CSS object-fit rules
 * Determines how content should be resized to fit within its container
 *
 * @param value - The object-fit mode to apply ('fill', 'contain', 'cover', 'none', 'scale-down')
 * @param computedLayout - The computed layout dimensions from Yoga
 * @param bounds - The original bounds of the content being sized
 * @returns Object containing x and y scaling factors to apply
 */
export function calculateObjectFit(value: LayoutStyles['objectFit'], computedLayout: ComputedLayout, bounds: Bounds) {
    let offsetScaleX: number = 1;
    let offsetScaleY: number = 1;

    switch (value) {
        case 'fill':
            // Stretch to fill target dimensions
            offsetScaleX = computedLayout.width / bounds.width;
            offsetScaleY = computedLayout.height / bounds.height;
            break;

        case 'contain': {
            // Scale to fit while maintaining aspect ratio
            const scaleContain = Math.min(computedLayout.width / bounds.width, computedLayout.height / bounds.height);

            offsetScaleX = scaleContain;
            offsetScaleY = scaleContain;
            break;
        }

        case 'cover': {
            // Scale to cover while maintaining aspect ratio
            const scaleCover = Math.max(computedLayout.width / bounds.width, computedLayout.height / bounds.height);

            offsetScaleX = scaleCover;
            offsetScaleY = scaleCover;
            break;
        }

        case 'none':
            // Use original size
            offsetScaleX = 1;
            offsetScaleY = 1;
            break;

        case 'scale-down': {
            // Like contain, but never scale up
            const scaleDown = Math.min(1, computedLayout.width / bounds.width, computedLayout.height / bounds.height);

            offsetScaleX = scaleDown;
            offsetScaleY = scaleDown;
            break;
        }

        default:
            break;
    }

    return {
        offsetScaleX,
        offsetScaleY,
    };
}
