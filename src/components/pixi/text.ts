import {
    BitmapText as PixiBitmapText,
    HTMLText as PixiHTMLText,
    type HTMLTextOptions,
    Text as PixiText,
    type TextOptions,
} from 'pixi.js';
import { BaseView, type ViewOptions } from './base';

/**
 * A wrapper around the PixiJS Text class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export class LayoutText extends BaseView<PixiText> {
    constructor(opts: TextOptions & ViewOptions) {
        super({
            ...opts,
            ClassType: PixiText,
        });
    }
}

/**
 * A re-export of the PixiJS Text class that ensures the layout is set after construction.
 *
 * The Text object is a specialized sprite for rendering text.
 */
export class Text extends PixiText {
    constructor(opts: TextOptions) {
        const { layout, ...options } = opts;

        super(options as TextOptions);
        this.layout = layout!;
    }
}

/**
 * A wrapper around the PixiJS BitmapText class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export class LayoutBitmapText extends BaseView<PixiBitmapText> {
    constructor(opts: TextOptions & ViewOptions) {
        super({
            ...opts,
            ClassType: PixiBitmapText,
        });
    }
}

/**
 * A re-export of the PixiJS BitmapText class that ensures the layout is set after construction.
 *
 * The BitmapText object is a specialized sprite for rendering bitmap text.
 */
export class BitmapText extends PixiBitmapText {
    constructor(opts: TextOptions) {
        const { layout, ...options } = opts;

        super(options as TextOptions);
        this.layout = layout!;
    }
}

/**
 * A wrapper around the PixiJS HTMLText class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export class LayoutHTMLText extends BaseView<PixiHTMLText> {
    constructor(opts: HTMLTextOptions & ViewOptions) {
        super({
            ...opts,
            ClassType: PixiHTMLText,
        });
    }
}

/**
 * A re-export of the PixiJS HTMLText class that ensures the layout is set after construction.
 *
 * The HTMLText object is a specialized sprite for rendering HTML text.
 */
export class HTMLText extends PixiHTMLText {
    constructor(opts: HTMLTextOptions) {
        const { layout, ...options } = opts ?? {};

        super(options as HTMLTextOptions);
        this.layout = layout!;
    }
}
