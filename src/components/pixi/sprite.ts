import {
    AnimatedSprite as PixiAnimatedSprite,
    NineSliceSprite as PixiNineSliceSprite,
    Sprite as PixiSprite,
    Texture,
    TilingSprite as PixiTilingSprite,
    type TilingSpriteOptions,
} from 'pixi.js';
import { BaseView, type ViewOptions } from './base';

/**
 * A specialized wrapper around the PixiJS Sprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutSprite extends BaseView<PixiSprite> {
    constructor(opts: ConstructorParameters<typeof PixiSprite>[0] & ViewOptions) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        super({
            ...opts,
            ClassType: PixiSprite,
        });
    }
}

/**
 * A re-export of the PixiJS Sprite class that ensures the layout is set after construction.
 *
 * The Sprite object is one of the most important objects in PixiJS. It is a
 * drawing item that can be added to a scene and rendered to the screen.
 */
export class Sprite extends PixiSprite {
    constructor(opts: ConstructorParameters<typeof PixiSprite>[0]) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        const { layout, ...options } = opts ?? {};

        super(options);
        this.layout = layout!;
    }
}

/**
 * A specialized wrapper around the PixiJS NineSliceSprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutNineSliceSprite extends BaseView<PixiNineSliceSprite> {
    constructor(opts: ConstructorParameters<typeof PixiNineSliceSprite>[0] & ViewOptions) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        super({
            ...opts,
            ClassType: PixiNineSliceSprite,
        });
    }
}

/**
 * A re-export of the PixiJS NineSliceSprite class that ensures the layout is set after construction.
 *
 * The NineSliceSprite object is a special type of sprite that allows you to
 * stretch and scale a texture while preserving its corners and edges.
 */
export class NineSliceSprite extends PixiNineSliceSprite {
    constructor(opts: ConstructorParameters<typeof PixiNineSliceSprite>[0]) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        const { layout, ...options } = opts;

        super(options);
        this.layout = layout!;
    }
}

/**
 * A specialized wrapper around the PixiJS TilingSprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutTilingSprite extends BaseView<PixiTilingSprite> {
    constructor(opts: (Texture | TilingSpriteOptions) & ViewOptions) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        super({
            ...opts,
            ClassType: PixiTilingSprite,
        });
    }
}

/**
 * A re-export of the PixiJS TilingSprite class that ensures the layout is set after construction.
 *
 * The TilingSprite object is a special type of sprite that allows you to
 * repeat a texture across a defined area.
 */
export class TilingSprite extends PixiTilingSprite {
    constructor(opts: Texture | TilingSpriteOptions) {
        if (opts instanceof Texture) {
            opts = { texture: opts };
        }
        const { layout, ...options } = opts;

        super(options);
        this.layout = layout!;
    }
}

/**
 * A specialized wrapper around the PixiJS AnimatedSprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export class LayoutAnimatedSprite extends BaseView<PixiAnimatedSprite> {
    constructor(opts: ConstructorParameters<typeof PixiAnimatedSprite>[0] & ViewOptions) {
        super({
            ...opts,
            ClassType: PixiAnimatedSprite,
        });
    }
}

/**
 * A re-export of the PixiJS AnimatedSprite class that ensures the layout is set after construction.
 *
 * The AnimatedSprite object is a special type of sprite that allows you to
 * animate a sequence of textures.
 */
export class AnimatedSprite extends PixiAnimatedSprite {
    constructor(opts: ConstructorParameters<typeof PixiAnimatedSprite>[0]) {
        const { layout, ...options } = opts;

        super(options);
        this.layout = layout!;
    }
}
