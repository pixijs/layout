import { Container } from '@pixi/display';
import { LayoutOptions } from './types';
import { LayoutSystem } from '../Layout';

console.log('It works!');

if (!Container.prototype.initLayout)
{
    Object.defineProperty(Container.prototype, 'initLayout', {
        value(options?: LayoutOptions): void
        {
            if (!this.layout)
            {
                // eslint-disable-next-line no-new
                new LayoutSystem(this, options || {});
            }

            return this;
        }
    });
}
