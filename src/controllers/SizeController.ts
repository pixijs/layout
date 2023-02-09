import { getNumber } from '../utils/helpers';
import { Layout } from '../Layout';
import { FlexNumber } from '../utils/types';
import { Container } from '@pixi/display';

/** Size controller manages {@link Layout} and it's content size. */
export class SizeController
{
    private layout: Layout;
    private _width: number;
    private _height: number;

    parentWidth = 0;
    parentHeight = 0;

    /**
     * Creates size controller.
     * @param {Layout} layout - Layout to control.
     */
    constructor(layout: Layout)
    {
        this.layout = layout;
    }

    /**
     * Updates layout size and all children sizes
     * @param {number} parentWidth - Parent width
     * @param {number} parentHeight - Parent height
     */
    update(parentWidth: number, parentHeight: number)
    {
        let finalWidth = 0;
        let finalHeight = 0;

        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;

        const { width, height, display, maxWidth, maxHeight, scaleX, scaleY, background } = this.layout.style;

        if (width === 0 || height === 0)
        {
            this.layout.visible = false;

            return;
        }

        if (width === 'auto')
        {
            switch (display)
            {
                case 'inline-block':
                case 'inline':
                    finalWidth = this.layout.contentWidth;
                    break;

                case 'block':
                default:
                    finalWidth = parentWidth;
                    break;
            }
        }
        else
        {
            finalWidth = getNumber(width, parentWidth);
        }

        if (height === 'auto')
        {
            finalHeight = this.layout.contentHeight;
        }
        else
        {
            finalHeight = getNumber(height, parentHeight);
        }

        if (this.layout.parent instanceof Layout)
        {
            const parentPadding = this.layout.parent?.style.padding ?? 0;

            finalWidth -= parentPadding;
            finalHeight -= parentPadding;
        }

        if (finalWidth < 0) finalWidth = 0;
        if (finalHeight < 0) finalHeight = 0;

        if (finalWidth === 0 || finalHeight === 0)
        {
            this.layout.visible = false;

            return;
        }

        if (background instanceof Container)
        {
            if (width === 'auto')
            {
                // size is basing on background size
                finalWidth = background.width;
            }

            if (height === 'auto')
            {
                // size is basing on background size
                finalHeight = background.height;
            }
        }

        this._width = getNumber(finalWidth, this.parentWidth);
        this._height = getNumber(finalHeight, this.parentHeight);

        this.layout.scale.set(scaleX, scaleY);

        if (maxWidth || maxHeight)
        {
            this.fitToSize(parentWidth, parentHeight);
        }

        this.layout.updateBG();
        this.layout.updateMask();

        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    get width(): number
    {
        return this._width;
    }
    set width(width: FlexNumber)
    {
        this._width = getNumber(width, this.parentWidth);
        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    get height(): number
    {
        return this._height;
    }

    set height(height: FlexNumber)
    {
        this._height = getNumber(height, this.parentHeight);
        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    private fitToSize(parentWidth: number, parentHeight: number)
    {
        const { maxWidth, maxHeight, marginLeft, marginRight, marginBottom, marginTop } = this.layout.style;

        const currentScaleX = this.layout.scale.x;
        const currentScaleY = this.layout.scale.y;

        const layoutWidth = this.layout.width + marginLeft + marginRight;
        const layoutHeight = this.layout.height + marginTop + marginBottom;

        const maxWidthVal = getNumber(maxWidth, parentWidth);
        const maxHeightVal = getNumber(maxHeight, parentHeight);

        const fitScaleX = maxWidthVal / layoutWidth;
        const fitScaleY = maxHeightVal / layoutHeight;

        let finalScaleX = currentScaleX;
        let finalScaleY = currentScaleY;

        if (layoutWidth * currentScaleX > maxWidthVal)
        {
            finalScaleX = fitScaleX;
        }

        if (layoutHeight * currentScaleY > maxHeightVal)
        {
            finalScaleY = fitScaleY;
        }

        this.layout.scale.set(Math.min(finalScaleX, finalScaleY));
    }
}
