import { getNumber } from '../utils/helpers';
import { Layout } from '../Layout';
import { FlexNumber } from '../utils/types';

export class SizeController
{
    private layout: Layout;
    private _width: number;
    private _height: number;

    parentWidth = 0;
    parentHeight = 0;

    constructor(layout: Layout)
    {
        this.layout = layout;
    }

    update(parentWidth: number, parentHeight: number)
    {
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;

        const { width, height, display } = this.layout.style;

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

        if (this.layout.parent && this.layout.parent instanceof Layout)
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

        this.layout.updateBG();
        this.layout.updateMask();
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
