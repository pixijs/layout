/* eslint-disable no-case-declarations */
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
    update(parentWidth?: number, parentHeight?: number)
    {
        let finalWidth = 0;
        let finalHeight = 0;

        if (parentWidth !== undefined)
        {
            this.parentWidth = parentWidth;
        }

        if (parentHeight !== undefined)
        {
            this.parentHeight = parentHeight;
        }

        const {
            width,
            height,
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
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

                    const needToBeResized = this.innerText.width + paddingLeft + paddingRight > this.parentWidth;

                    if (!this.innerText.style.wordWrap && needToBeResized)
                    {
                        this.innerText.style.wordWrap = true;
                    }

                    if (this.innerText.style.wordWrap)
                    {
                        this.innerText.style.wordWrapWidth = this.parentWidth - paddingLeft - paddingRight;
                    }

                    finalWidth = this.innerText.width;

                    break;

                case 'background':
                    // width is auto, there is more than 1 child or it is not text
                    // resize basing on background width
                    finalWidth = (background as Container).width;

                    break;

                case 'contentSize':
                    // width is basing on content
                    let childrenWidth = 0;

                    // we need to resize content, as it will update the sizes of the children first
                    this.layout.content.resize(this.parentWidth, this.parentHeight);

                    const { firstChild } = this.layout.content;

                    // add first element as at lease one element to set width
                    if (firstChild instanceof Layout)
                    {
                        childrenWidth += firstChild.width + firstChild.style.marginLeft + firstChild.style.marginRight;
                    }
                    else if (firstChild instanceof Container && firstChild.width)
                    {
                        childrenWidth += firstChild.width;
                    }

                    this.layout.content.children.forEach((child) =>
                    {
                        if (child === firstChild)
                        {
                            // skip first element as it was already added
                            return;
                        }

                        if (child instanceof Layout && child.style.display !== 'block')
                        {
                            childrenWidth += child.width + child.style.marginLeft;
                        }
                        else if (child instanceof Container && child.width)
                        {
                            childrenWidth += child.width;
                        }
                    });

                    // height is basing on content height
                    finalWidth = childrenWidth + paddingLeft + paddingRight;

                    if (this.isItJustAText)
                    {
                        finalWidth = this.innerText?.width + paddingLeft + paddingRight;
                    }

                    break;

                case 'parentSize':
                default:
                    // resize to parent width
                    finalWidth = this.parentWidth;

                    if (this.isItJustAText)
                    {
                        this.innerText.style.wordWrap = true;
                        this.innerText.style.wordWrapWidth = parentWidth - paddingLeft - paddingRight;
                    }

                    break;
            }
        }
        else
        {
            finalWidth = getNumber(width, this.parentWidth);
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
                    // height is basing on content
                    let childrenHeight = 0;

                    // we need to resize content, as it will update the sizes of the children first
                    this.layout.content.resize(this.parentWidth, this.parentHeight);

                    const { firstChild } = this.layout.content;

                    // add first element as at lease one element to set width
                    if (firstChild instanceof Layout)
                    {
                        childrenHeight += firstChild.height;
                    }
                    else if (firstChild instanceof Container && firstChild.height)
                    {
                        childrenHeight += firstChild.height;
                    }

                    this.layout.content.children.forEach((child) =>
                    {
                        if (child === firstChild)
                        {
                            // skip first element as it was already added
                            return;
                        }

                        if (child instanceof Layout && child.style.display === 'block')
                        {
                            childrenHeight += child.height;
                        }
                    });

                    if (this.isItJustAText)
                    {
                        finalHeight = this.innerText?.height;
                    }

                    // height is basing on content height
                    finalHeight = childrenHeight + paddingTop + paddingBottom;

                    break;
            }
        }
        else
        {
            finalHeight = getNumber(height, this.parentHeight);
        }

        if (this.layout.parent instanceof Layout)
        {
            // apply parent paddings
            const { paddingLeft, paddingRight } = this.layout.parent?.style;

            const parentPaddingLeft = paddingLeft ?? 0;
            const parentPaddingRight = paddingRight ?? 0;

            if (this.autoSizeModificator !== 'innerText')
            {
                finalWidth -= parentPaddingLeft;
            }

            finalWidth -= parentPaddingRight;

            this.fitInnerText(finalWidth);

            if (this.isItJustAText)
            {
                finalHeight = this.innerText?.height;
            }
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

        if (maxWidth || maxHeight || minWidth || minHeight)
        {
            this.fitToSize(this.parentWidth, this.parentHeight);
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

        return 'contentSize';
    }

    /** Detect if layout is just a wrapper for a text element.  */
    private get isItJustAText(): boolean
    {
        const hasOnly1Child = this.layout.content.children.size === 1;

        const { firstChild } = this.layout.content;

        return hasOnly1Child && firstChild instanceof Text;
    }

    /** Get first child of the layout */
    get innerText(): Text
    {
        if (!this.isItJustAText)
        {
            return null;
        }

        const { firstChild } = this.layout.content;

        return firstChild as Text;
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
        const { maxWidth, maxHeight, minWidth, minHeight, marginLeft, marginRight, marginBottom, marginTop } = this.layout.style;

        const currentScaleX = this.layout.scale.x;
        const currentScaleY = this.layout.scale.y;

        const layoutWidth = this.layout.width + marginLeft + marginRight;
        const layoutHeight = this.layout.height + marginTop + marginBottom;

        const maxWidthVal = getNumber(maxWidth, parentWidth);
        const maxHeightVal = getNumber(maxHeight, parentHeight);

        const minWidthVal = getNumber(minWidth, parentWidth);
        const minHeightVal = getNumber(minHeight, parentHeight);

        const minFitScaleX = minWidthVal / layoutWidth;
        const minFitScaleY = minHeightVal / layoutHeight;

        const maxFitScaleX = maxWidthVal / layoutWidth;
        const maxFitScaleY = maxHeightVal / layoutHeight;

        let finalScaleX = currentScaleX;
        let finalScaleY = currentScaleY;

        if (layoutWidth * currentScaleX > maxWidthVal)
        {
            finalScaleX = maxFitScaleX;
        }

        if (layoutHeight * currentScaleY > maxHeightVal)
        {
            finalScaleY = maxFitScaleY;
        }

        let finalScaleToFit = Math.min(finalScaleX, finalScaleY);

        if (minWidth || minHeight)
        {
            let finalMinScaleToFit = finalScaleToFit;

            if (layoutWidth * finalScaleToFit < minWidthVal)
            {
                finalMinScaleToFit = minFitScaleX;
            }

            if (layoutHeight * finalScaleToFit < minHeightVal)
            {
                finalMinScaleToFit = minFitScaleY;
            }

            finalScaleToFit = Math.max(finalMinScaleToFit, finalMinScaleToFit);
        }

        this.layout.scale.set(finalScaleToFit);
    }
}
