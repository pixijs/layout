import { getNumber } from '../utils/helpers';
import { Layout } from '../Layout';
import { FlexNumber } from '../utils/types';

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
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;

        const { width, height, display, maxWidth, maxHeight, scaleX, scaleY } = this.layout.style;

        if (width === 0 || height === 0)
        {
            this.layout.visible = false;

            return;
        }

        if (width === 'auto')
        {
            switch (display)
            {
                case 'block':
                default:
                    this.width = parentWidth;
                    break;
            }
        }
        else
        {
            this.width = getNumber(width, parentWidth);
        }

        if (height === 'auto')
        {
            this.height = this.layout.getContentHeight();
        }
        else
        {
            this.height = getNumber(height, parentHeight);
        }

        if (this.layout.parent instanceof Layout)
        {
            const parentPadding = this.layout.parent?.style.padding ?? 0;

            this.width -= parentPadding;
            this.height -= parentPadding;
        }

        if (this.width < 0) this.width = 0;
        if (this.height < 0) this.height = 0;

        if (this.width === 0 || this.height === 0)
        {
            this.layout.visible = false;

            return;
        }

        this.layout.scale.x = scaleX;
        this.layout.scale.y = scaleY;

        this.layout.updateBG();
        this.layout.updateMask();

        // if (maxWidth || maxHeight)
        // {
        //     const maxWidthVal = getNumber(maxWidth, parentWidth);
        //     const maxHeightVal = getNumber(maxHeight, parentHeight);

        //     console.log(this.layout.width, maxWidthVal, parentWidth);

    //     if (maxWidth && this.layout.width > maxWidthVal)
    //     {
    //         this.layout.scale.set(maxWidthVal / this.layout.width);
    //     }
    // }
    }

    get width(): number
    {
        return this._width;
    }
    set width(width: FlexNumber)
    {
        this._width = getNumber(width, this.parentWidth);
    }

    get height(): number
    {
        return this._height;
    }

    set height(height: FlexNumber)
    {
        this._height = getNumber(height, this.parentHeight);
    }
}
