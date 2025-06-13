import { type Size } from 'pixi.js';
import { type Layout } from '../Layout';

const temp = { width: 0, height: 0 };

/**
 * Retrieves the absolute size of a PixiJS container
 * @param layout - The layout to retrieve the size from
 * @returns The size of the PixiJS container
 */
export function getPixiSize(layout: Layout): Size {
    const bounds = layout.target.getLocalBounds();
    const scale = layout.target.scale;

    temp.width = Math.abs(bounds.width * scale.x);
    temp.height = Math.abs(bounds.height * scale.y);

    return temp;
}
