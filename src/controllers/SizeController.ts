import { getNumber } from '../utils/helpers';
import { Layout } from '../Layout';
import { Text } from '@pixi/text';
import { Container } from '@pixi/display';
import { FlexNumber, SizeControl } from '../utils/types';

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

        const {
            width,
            height,
            maxWidth,
            maxHeight,
            scaleX,
            scaleY,
            background,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom
        } = this.layout.style;

        if (width === 0 || height === 0)
        {
            this.layout.visible = false;

            return;
        }

        if (width === 'auto')
        {
            switch (this.autoSizeModificator)
            {
                case 'innerText':
                    // width is auto, there is only 1 child and it is text
                    // resize basing on text width
                    if (!this.innerText.style.wordWrap && this.innerText.width >= parentWidth - paddingLeft - paddingRight)
                    {
                        this.innerText.style.wordWrap = true;
                    }

                    if (this.innerText.style.wordWrap)
                    {
                        this.innerText.style.wordWrapWidth = parentWidth - paddingLeft - paddingRight;
                    }

                    finalWidth = this.innerText.width + paddingRight + paddingLeft;

                    break;

                case 'background':
                    // width is auto, there is more than 1 child or it is not text
                    // resize basing on background width
                    finalWidth = (background as Container).width;

                    break;

                case 'contentSize':
                    // width is basing on content, content is not a single text
                    // eslint-disable-next-line no-case-declarations
                    let maxRightPoint = 0;

                    // we need to resize content first to get it's height
                    this.layout.content.resize(parentWidth, parentHeight);

                    this.layout.content.children.forEach((child) =>
                    {
                        if (child.width)
                        {
                            maxRightPoint = Math.max(maxRightPoint, child.x + child.width);
                        }
                    });

                    // height is basing on content height
                    finalWidth = maxRightPoint + paddingLeft + paddingRight;

                    if (this.isItJustAText)
                    {
                        finalHeight = this.innerText?.width + paddingLeft + paddingRight;
                    }

                    break;

                case 'parentSize':
                default:
                    // resize to parent width
                    finalWidth = parentWidth;

                    if (this.isItJustAText)
                    {
                        this.innerText.style.wordWrap = true;
                        this.innerText.style.wordWrapWidth = parentWidth;
                    }

                    break;
            }
        }
        else
        {
            finalWidth = getNumber(width, parentWidth);
        }

        this.fitInnerText(finalWidth);

        if (height === 'auto')
        {
            switch (this.autoSizeModificator)
            {
                case 'innerText':
                    // height is auto, there is only 1 child and it is text
                    // resize basing on text height
                    finalHeight = this.innerText?.height + paddingBottom + paddingTop;

                    break;

                case 'background':
                    // height is auto, there is more than 1 child or it is not text
                    // resize basing on background height
                    finalHeight = (background as Container).height;

                    break;

                case 'parentSize':
                case 'contentSize':
                default:
                    // height is basing on content, content is not a single text
                    // eslint-disable-next-line no-case-declarations
                    let maxBottomPoint = 0;

                    // we need to resize content first to get it's height
                    this.layout.content.resize(parentWidth, parentHeight);

                    this.layout.content.children.forEach((child) =>
                    {
                        if (child.height)
                        {
                            maxBottomPoint = Math.max(maxBottomPoint, child.y + child.height);
                        }
                    });

                    // height is basing on content height
                    finalHeight = maxBottomPoint + paddingBottom + paddingTop;

                    if (this.isItJustAText)
                    {
                        finalHeight = this.innerText?.height + paddingBottom + paddingTop;
                    }

                    break;
            }
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

    private fitInnerText(width: number)
    {
        if (!this.isItJustAText)
        {
            return;
        }

        const { paddingLeft, paddingRight } = this.layout.style;

        this.innerText.style.wordWrap = true;
        this.innerText.style.wordWrapWidth = width - paddingRight - paddingLeft;
    }

    /** Get type of size control basing on styles and in case if width of the layout is set to `auto`. */
    private get autoSizeModificator(): SizeControl
    {
        const { background, display } = this.layout.style;

        if (display === 'block')
        {
            return 'parentSize';
        }

        if (this.isItJustAText)
        {
            return 'innerText';
        }

        if (background instanceof Container)
        {
            return 'background';
        }

        const hasOnly1Child = this.layout.content.children.length === 1;
        const firstChildIsContainer = this.layout.content.children[0] instanceof Container;
        const firstChild = this.layout.content.children[0] as Container;

        if (hasOnly1Child && firstChildIsContainer && firstChild.width && firstChild.height)
        {
            return 'contentSize';
        }

        return 'parentSize';
    }

    /** Detect if layout is just a wrapper for a text element.  */
    private get isItJustAText(): boolean
    {
        const hasOnly1Child = this.layout.content.children.length === 1;

        return hasOnly1Child && this.layout.content.children[0] instanceof Text;
    }

    /** Get first child of the layout */
    get innerText(): Text
    {
        if (!this.isItJustAText)
        {
            return null;
        }

        return this.layout.content.children[0] as Text;
    }

    /** Get width of the controlled layout. */
    get width(): number
    {
        return this._width;
    }

    /**
     * Set width of the controlled layout. And align children.
     * @param {FlexNumber} width - Width to set.
     */
    set width(width: FlexNumber)
    {
        this._width = getNumber(width, this.parentWidth);
        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    /** Get height of the controlled layout. */
    get height(): number
    {
        return this._height;
    }

    /**
     * Set height of the controlled layout. And align children.
     * @param {FlexNumber} height - Height to set.
     */
    set height(height: FlexNumber)
    {
        this._height = getNumber(height, this.parentHeight);
        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    /**
     * Fits controlled layout into parent size, scales it down if does not fit.
     *
     * This method is called when maxWidth or maxHeight is set.
     * @param parentWidth
     * @param parentHeight
     */
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
