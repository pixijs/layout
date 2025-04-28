import { Graphics as PixiGraphics, GraphicsContext } from 'pixi.js';
import { BaseView, type ViewOptions } from './base';

/**
 * A specialized wrapper around the PixiJS Graphics class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutGraphics extends BaseView<PixiGraphics> {
    constructor(opts: ConstructorParameters<typeof PixiGraphics>[0] & ViewOptions) {
        if (opts instanceof GraphicsContext) {
            opts = { context: opts };
        }
        super({
            ...opts,
            ClassType: PixiGraphics,
        });
    }
}

/**
 * A re-export of the PixiJS Graphics class that ensures the layout is set after construction.
 *
 * The Graphics object is a container for drawing shapes and lines.
 */
export class Graphics extends PixiGraphics {
    constructor(opts: ConstructorParameters<typeof PixiGraphics>[0]) {
        if (opts instanceof GraphicsContext) {
            opts = { context: opts };
        }
        const { layout, ...options } = opts ?? {};

        super(options);
        this.layout = layout!;
    }
}
