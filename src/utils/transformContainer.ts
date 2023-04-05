import { Container } from '@pixi/display';
import { LayoutOptions } from './types';
import { Layout } from '../Layout';

if (!Container.prototype.initLayout)
{
    Object.defineProperty(Container.prototype, 'initLayout', {
        value(options?: LayoutOptions): void
        {
            if (!this.layout)
            {
                this.layout = new Layout(options);

                this.addChild(this.layout);
            }

            return this;
        }
    });
}
