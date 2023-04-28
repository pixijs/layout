/* eslint-disable no-case-declarations */
import { getColor, getNumber, isItJustAText } from '../utils/helpers';
import { LayoutSystem } from '../Layout';
import { Text } from '@pixi/text';
import { Container } from '@pixi/display';
import { FlexNumber, SizeControl } from '../utils/types';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';

/** Size controller manages {@link LayoutSystem} and it's content size. */
export class SizeController
{
    protected layout: LayoutSystem;
    protected _width: number;
    protected _height: number;
    protected bg: Graphics | Container;
    protected overflowMask: Graphics;

    parentWidth = 0;
    parentHeight = 0;

    /**
     * Creates size controller.
     * @param {LayoutSystem} layout - Layout to control.
     */
    constructor(layout: LayoutSystem)
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
            paddingBottom,
            aspectRatio,
        } = this.layout.style;

        const widthModificator = this.getAutoSizeModificator(width);
        const heightModificator = this.getAutoSizeModificator(height);

        switch (widthModificator)
        {
            case 'innerText':
                // width is auto, there is only 1 child and it is text
                // wordWrap style is true
                // resize basing on text width

                // try to fit text in one line
                this.innerText.style.wordWrap = false;

                const parentPaddingLeft = this.layout.container.parent?.layout?.style?.paddingLeft ?? 0;
                const parentPaddingRight = this.layout.container.parent?.layout?.style?.paddingRight ?? 0;

                const paddings = paddingLeft + paddingRight + parentPaddingLeft + parentPaddingRight;

                const availableSpaceHor = this.parentWidth - paddings;
                const needToBeResized = this.innerText.width + paddings > this.parentWidth;

                if (needToBeResized)
                {
                    this.innerText.style.wordWrap = true;

                    this.innerText.style.wordWrapWidth = availableSpaceHor;
                }

                const textWidthPaddings = this.innerText.width + paddingLeft + paddingRight;

                finalWidth = textWidthPaddings;
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
                if (firstChild && firstChild.layout)
                {
                    childrenWidth
                            += firstChild.width
                            + firstChild.layout.style.marginLeft
                            + firstChild.layout.style.marginRight;
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

                    if (child.layout && child.layout.style.display !== 'block')
                    {
                        if (child.layout.style.position)
                        {
                            return;
                        }

                        childrenWidth += child.width + child.layout.style.marginLeft;
                    }
                    else if (child instanceof Container && child.width)
                    {
                        childrenWidth += child.width;
                    }
                });

                // height is basing on content height
                finalWidth = childrenWidth + paddingLeft + paddingRight;
                break;

            case 'parentSize':
                // resize to parent width
                finalWidth = this.parentWidth;

                break;

            case 'static':
            default:
                finalWidth = getNumber(width, this.parentWidth);
                break;
        }

        switch (heightModificator)
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
                // resize to parent width
                finalHeight = this.parentHeight;

                break;

            case 'contentSize':
                // height is basing on content
                let childrenHeight = 0;

                // we need to resize content, as it will update the sizes of the children first
                this.layout.content.resize(this.parentWidth, this.parentHeight);

                const { firstChild } = this.layout.content;

                // add first element as at lease one element to set width
                if (firstChild && firstChild.layout)
                {
                    if (!firstChild.layout.style.position)
                    {
                        childrenHeight += firstChild.height;
                    }
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

                    if (child.layout && child.layout.style.position)
                    {
                        // skip absolute positioned elements
                        return;
                    }

                    if (child.layout)
                    {
                        if (child.layout.style.display === 'block')
                        {
                            childrenHeight += child.height;
                        }
                        else if (child.height > childrenHeight)
                        {
                            childrenHeight = child.height;
                        }
                    }
                    else if (child.height > childrenHeight)
                    {
                        childrenHeight = child.height;
                    }
                });

                if (isItJustAText(this.layout))
                {
                    finalHeight = this.innerText?.height;
                }

                // height is basing on content height
                finalHeight = childrenHeight + paddingTop + paddingBottom;

                break;

            case 'static':
            default:
                finalHeight = getNumber(height, this.parentHeight);
                break;
        }

        // apply parent paddings
        // if (this.layout.container.parent?.layout)
        // {
        //     const { paddingLeft, paddingRight, paddingTop, paddingBottom } = this.layout.container.parent?.layout.style;

        //     finalWidth += (paddingLeft ?? 0) + (paddingRight ?? 0);
        //     finalHeight += (paddingTop ?? 0) + (paddingBottom ?? 0);
        // }

        if (finalWidth < 0) finalWidth = 0;
        if (finalHeight < 0) finalHeight = 0;

        this._width = finalWidth;
        this._height = finalHeight;

        this.layout.container.scale.set(scaleX, scaleY);

        if (aspectRatio === 'flex' || maxWidth || maxHeight || minWidth || minHeight)
        {
            this.fitToSize(this.parentWidth, this.parentHeight);
        }

        this.fitInnerText(finalWidth, finalHeight);

        if (this._width === 0 || this._height === 0)
        {
            this.layout.container.visible = false;

            return;
        }

        this.updateBG();
        this.updateMask();

        this.layout.align.update(this.parentWidth, this.parentHeight);
    }

    /** Render and update the background of layout basing on it's current state. */
    protected updateBG()
    {
        const { background } = this.layout.style;

        if (background instanceof Container)
        {
            if (background instanceof Sprite)
            {
                background.anchor.set(0);
            }

            this.bg = background;

            this.layout.container.addChildAt(this.bg, 0);
        }
        else
        {
            const color = background !== 'transparent' && getColor(background);

            const { borderRadius } = this.layout.style;
            const { width, height } = this;

            if (color && width && height)
            {
                if (!this.bg)
                {
                    this.bg = new Graphics();
                    this.layout.container.addChildAt(this.bg, 0);
                }

                let x = 0;
                let y = 0;

                const { anchorX, anchorY } = this.layout.style;

                if (anchorX !== undefined)
                {
                    x -= width * anchorX;
                }

                if (anchorY !== undefined)
                {
                    y -= height * anchorY;
                }

                if (this.bg instanceof Graphics)
                {
                    this.bg.clear().beginFill(color.hex, color.opacity).drawRoundedRect(x, y, width, height, borderRadius);
                }
            }
            else if (this.bg)
            {
                this.layout.container.removeChild(this.bg);
                delete this.bg;
            }
        }
    }

    /** Render and update the mask of layout basing on it's current state. Mask is used to hide overflowing content. */
    protected updateMask()
    {
        const { overflow, borderRadius } = this.layout.style;
        const { width, height } = this;

        if (overflow === 'hidden' && width && height)
        {
            if (!this.overflowMask)
            {
                this.overflowMask = new Graphics();
                this.layout.container.addChild(this.overflowMask);
            }

            let x = 0;
            let y = 0;

            const { anchorX, anchorY } = this.layout.style;

            if (anchorX !== undefined)
            {
                x -= width * anchorX;
            }

            if (anchorY !== undefined)
            {
                y -= height * anchorY;
            }

            this.overflowMask.clear().beginFill(0xffffff).drawRoundedRect(x, y, width, height, borderRadius).endFill();

            this.layout.container.mask = this.overflowMask;
        }
        else
        {
            this.layout.container.mask = null;
            delete this.overflowMask;
        }
    }

    protected fitInnerText(width: number, height: number)
    {
        if (!isItJustAText(this.layout)) { return; }

        const { paddingLeft, paddingRight, paddingTop, paddingBottom } = this.layout.style;

        if (this.innerText.style.wordWrap)
        {
            const scale = this.layout.container?.scale.x ?? 1;

            this.innerText.style.wordWrapWidth = (width - paddingLeft - paddingRight) * scale;
        }
        else
        {
            const textWidth = this.innerText.width + paddingLeft + paddingRight;
            const textHeight = this.innerText.height + paddingTop + paddingBottom;

            const horOverflow = textWidth > width;
            const verOverflow = textHeight > height;

            const horScale = width / (textWidth + paddingLeft + paddingRight);
            const vertScale = height / (textHeight + paddingBottom + paddingTop);

            if (horOverflow || verOverflow)
            {
                this.innerText.scale.set(Math.min(horScale, vertScale));
            }
        }
    }

    /**
     * Get type of size control basing on styles and in case if width of the layout is set to `auto`.
     * @param size - Width or height of the layout.
     */
    protected getAutoSizeModificator(size: FlexNumber | 'auto'): SizeControl
    {
        const { background, display } = this.layout.style;

        if (size !== 'auto')
        {
            return 'static';
        }

        if (display === 'block')
        {
            return 'parentSize';
        }

        if (background instanceof Container && background.width && background.height)
        {
            return 'background';
        }

        if (isItJustAText(this.layout) && this.layout.style.wordWrap)
        {
            return 'innerText';
        }

        if (size === 'auto')
        {
            return 'contentSize';
        }

        return 'static';
    }

    /**
     * Get text element if layout is just a wrapper for a text element.
     * @returns {Text} - Pixi Text element.
     */
    protected get innerText(): Text
    {
        if (!isItJustAText(this.layout))
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
    protected fitToSize(parentWidth: number, parentHeight: number)
    {
        const { maxWidth, maxHeight, minWidth, minHeight, aspectRatio } = this.layout.style;
        const { marginLeft, marginRight, marginBottom, marginTop } = this.layout.style;

        const currentScaleX = this.layout.container.scale.x;
        const currentScaleY = this.layout.container.scale.y;

        const layoutWidth = this.layout.width + marginLeft + marginRight;
        const layoutHeight = this.layout.height + marginTop + marginBottom;

        const maxWidthVal = getNumber(maxWidth, parentWidth);
        const maxHeightVal = getNumber(maxHeight, parentHeight);

        const minWidthVal = getNumber(minWidth, parentWidth);
        const minHeightVal = getNumber(minHeight, parentHeight);

        if (aspectRatio === 'flex')
        {
            if (maxWidthVal && this.width > maxWidthVal)
            {
                this.width = maxWidthVal;
            }

            if (maxHeightVal && this.height > maxHeightVal)
            {
                this.height = maxHeightVal;
            }

            let minWidthScale: number;
            let minHeightScale: number;

            if (minWidthVal && this.width < minWidthVal)
            {
                minWidthScale = this.width / minWidthVal;
                this.width = minWidthVal;
            }

            if (minHeightVal && this.height < minHeightVal)
            {
                minHeightScale = this.height / minHeightVal;
                this.height = minHeightVal;
            }

            if (minWidthScale || minHeightScale)
            {
                const scale
                    = minWidthScale && minHeightScale
                        ? Math.min(minWidthScale, minHeightScale)
                        : minWidthScale ?? minHeightScale;

                this.layout.container.scale.set(scale);
            }

            return;
        }

        const maxFitScaleX = maxWidthVal / layoutWidth;
        const maxFitScaleY = maxHeightVal / layoutHeight;

        const minFitScaleX = minWidthVal / layoutWidth;
        const minFitScaleY = minHeightVal / layoutHeight;

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

        this.layout.container.scale.set(finalScaleToFit);
    }
}
