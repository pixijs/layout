import { LayoutSystem } from '../Layout';
import { LayoutOptions } from './types';

declare module '@pixi/display/lib/Container'
{
    interface Container
    {
        initLayout(config?: LayoutOptions);
        layout?: LayoutSystem;
    }
}
