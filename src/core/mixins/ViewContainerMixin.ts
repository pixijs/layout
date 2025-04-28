import { extensions, type ObservablePoint, ViewContainer } from 'pixi.js';
import { type ComputedLayout } from '../types';
import { baseComputeLayoutData } from './utils/baseComputeLayoutData';

const mixin: Partial<ViewContainer> = {
    /**
     * Computes the layout data for the container
     * @param computedLayout - The computed layout from Yoga
     * @returns The layout data for the container
     */
    computeLayoutData(computedLayout: ComputedLayout) {
        return baseComputeLayoutData(this, computedLayout, 'fill', this._anchor);
    },
} as ViewContainer & { _anchor?: ObservablePoint };

extensions.mixin(ViewContainer, mixin);
