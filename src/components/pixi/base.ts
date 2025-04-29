import { type Container } from 'pixi.js';
import { LayoutView, type LayoutViewOptions } from '../LayoutView';

export type ViewOptions = Omit<LayoutViewOptions, 'slot'>;
type BaseViewOptions = ViewOptions & { ClassType: new (...args: any[]) => Container };

export abstract class BaseView<T extends Container> extends LayoutView<T> {
    constructor(opts: BaseViewOptions) {
        const { layout, background, trackpad, ClassType, ...options } = opts;
        const slot = new ClassType(options) as T;

        super({
            slot,
            layout,
            background,
            trackpad,
        });
    }
}
