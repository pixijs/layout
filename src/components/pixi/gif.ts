import { GifSource, GifSprite as PixiGifSprite, type GifSpriteOptions } from 'pixi.js/gif';
import { BaseView, type ViewOptions } from './base';

/**
 * A specialized wrapper around the PixiJS GifSprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutGifSprite extends BaseView<PixiGifSprite> {
    constructor(opts: (GifSource | GifSpriteOptions) & ViewOptions) {
        if (opts instanceof GifSource) {
            opts = { source: opts };
        }
        super({
            ...opts,
            ClassType: PixiGifSprite,
        });
    }
}

/**
 * A re-export of the PixiJS GifSprite class that ensures the layout is set after construction.
 *
 * The GifSprite object is a specialized sprite for rendering GIF images.
 */
export class GifSprite extends PixiGifSprite {
    constructor(opts: GifSource | GifSpriteOptions) {
        if (opts instanceof GifSource) {
            opts = { source: opts };
        }
        const { layout, ...options } = opts;

        super(options);
        this.layout = layout!;
    }
}
