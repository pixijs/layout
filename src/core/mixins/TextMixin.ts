import { AbstractText, extensions, Point, type TextString } from 'pixi.js';
import { type ComputedLayout } from '../types';
import { calculateObjectFit } from './utils/calculateObjectFit';
import { calculatePositionSpecifier } from './utils/calculatePositionSpecifier';

const tempScale = new Point(0, 0);
const mixin: Partial<AbstractText> = {
    /**
     * Computes the layout data for the text element
     * @param computedLayout - The computed layout from Yoga
     * @returns The layout data for the text element
     */
    computeLayoutData(computedLayout: ComputedLayout) {
        const style = this._style!;

        tempScale.copyFrom(this.scale);
        this.scale = 1;

        if (style.wordWrap) {
            // we want to scale down the text first then wrap it
            style.wordWrapWidth = computedLayout.width;
        }

        let bounds = this.getLocalBounds();

        const objectFit = this.layout!.style.objectFit || 'scale-down';
        const { offsetScaleX, offsetScaleY } = calculateObjectFit(objectFit, computedLayout, bounds);

        if (style.wordWrap) {
            // we now need to recalculate the wordWrapWidth based on the new scale
            style.wordWrapWidth = computedLayout.width / Math.min(1, Math.max(offsetScaleX, offsetScaleY));
        }

        // recalculate the bounds after the wordWrapWidth has been set
        bounds = this.getLocalBounds();

        // scale the current bounds by the offset scale
        const scaledBounds = {
            width: bounds.width * offsetScaleX,
            height: bounds.height * offsetScaleY,
        };
        let { x: offsetX, y: offsetY } = calculatePositionSpecifier(
            this.layout!.style.objectPosition,
            computedLayout,
            scaledBounds,
        );

        // offset the anchor point
        offsetX += bounds.width * offsetScaleX * this.anchor._x;
        offsetY += bounds.height * offsetScaleY * this.anchor._y;

        const applySizeDirectly = this.layout!.style.applySizeDirectly;

        // If applySizeDirectly is true, set the this's width and height directly
        if (applySizeDirectly === true) {
            this.width = bounds.width * offsetScaleX;
            this.height = bounds.height * offsetScaleY;
        }

        // Reset the scale to the original value
        this.scale.copyFrom(tempScale);

        return {
            x: computedLayout.left,
            y: computedLayout.top,
            offsetX,
            offsetY,
            scaleX: offsetScaleX,
            scaleY: offsetScaleY,
        };
    },
} as AbstractText;

extensions.mixin(AbstractText, mixin);

const text = Object.getOwnPropertyDescriptor(AbstractText.prototype, 'text')!;

// eslint-disable-next-line accessor-pairs
Object.defineProperty(AbstractText.prototype, 'text', {
    ...text,
    set(textString: TextString) {
        const currentText = text.get!.call(this);

        text.set!.call(this, textString);

        if (currentText === textString) return;
        this.layout?.forceUpdate();
    },
});
