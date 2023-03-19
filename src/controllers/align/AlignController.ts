import { Layout } from '../../Layout';
import { Text } from '@pixi/text';
import { isItJustAText } from '../../utils/helpers';

/** Align controller manages {@link Layout} and it's content alignment. */
export class AlignController
{
    private layout: Layout;

    /**
     * Creates align controller.
     * @param {Layout} layout - Layout to control.
     */
    constructor(layout: Layout)
    {
        this.layout = layout;
    }

    /**
     * Updates layout and all children alignments.
     * @param {number} parentWidth
     * @param {number} parentHeight
     */
    update(parentWidth: number, parentHeight: number)
    {
        this.setSelfPosition(parentWidth, parentHeight);

        this.layout.content.resize(this.layout.width, this.layout.height);

        // !!! important to align children AFTER content resize
        this.alignChildren(this.layout.width, this.layout.height);
    }

    private alignChildren(parentWidth: number, parentHeight: number)
    {
        let maxChildHeight = 0;

        const { style } = this.layout;

        const paddingTop = style.paddingTop ?? 0;
        const paddingRight = style.paddingRight ?? 0;
        const paddingBottom = style.paddingBottom ?? 0;
        const paddingLeft = style.paddingLeft ?? 0;

        let x = paddingLeft;
        let y = paddingTop;

        const children = this.layout.content.children;

        children.forEach((child) =>
        {
            if (!child.height && !child.width) return;

            if (child instanceof Text && isItJustAText(this.layout))
            {
                const availableWidth = parentWidth - paddingLeft - paddingRight;

                const align = style.textAlign;

                if (child.width < availableWidth)
                {
                    if (align === 'center')
                    {
                        child.anchor.x = 0.5;
                        child.x = parentWidth / 2;
                    }
                    else if (align === 'right')
                    {
                        child.anchor.x = 1;
                        child.x = parentWidth - paddingRight;
                    }
                    else
                    {
                        child.anchor.x = 0;
                        child.x = paddingLeft;
                    }
                }
                else
                {
                    child.anchor.x = 0;
                    child.x = paddingLeft;
                }

                const verticalAlign = style.verticalAlign;

                const availableHeight = parentHeight - paddingTop - paddingBottom;

                if (child.height < availableHeight)
                {
                    if (verticalAlign === 'middle')
                    {
                        child.anchor.y = 0.5;
                        child.y = parentHeight / 2;
                    }
                    else if (verticalAlign === 'bottom')
                    {
                        child.anchor.y = 1;
                        child.y = parentHeight - paddingBottom;
                    }
                    else
                    {
                        child.anchor.y = 0;
                        child.y = paddingTop;
                    }
                }
                else
                {
                    child.anchor.y = 0;
                    child.y = paddingTop;
                }

                return;
            }

            let childDisplay = 'inline-block';
            let childMarginLeft = 0;
            let childMarginRight = 0;
            let childMarginTop = 0;
            let childMarginBottom = 0;

            if (child instanceof Layout)
            {
                childDisplay = child.style.display;
                const childPosition = child.style.position;

                childMarginLeft = child.style.marginLeft;
                childMarginRight = child.style.marginRight;
                childMarginTop = child.style.marginTop;
                childMarginBottom = child.style.marginBottom;

                if (childPosition !== undefined)
                {
                    // this layout position will be handled by it's own controller
                    return;
                }
            }

            let anchorX = 0;
            let anchorY = 0;

            if (style.position === undefined)
            {
                // if position is set, anchor will be handled in setSelfPosition method
                anchorX = style.anchorX !== undefined ? style.anchorX * this.layout.width : 0;
                anchorY = style.anchorY !== undefined ? style.anchorY * this.layout.height : 0;
            }

            child.x = x + childMarginLeft - anchorX;
            child.y = y + childMarginTop - anchorY;

            if (child.height + childMarginTop + childMarginBottom > maxChildHeight)
            {
                maxChildHeight = child.height + childMarginTop + childMarginBottom;
            }

            const availableWidth = parentWidth - paddingRight;

            if (childDisplay === 'block' && child.width < availableWidth)
            {
                childDisplay = 'inline-block';
            }

            const isFeetParentWidth = x + child.width + childMarginRight <= availableWidth;
            const isFirstChild = child === this.layout.content.firstChild;

            switch (childDisplay)
            {
                case 'inline':
                case 'inline-block':
                    if (!isFeetParentWidth && !isFirstChild)
                    {
                        x = paddingLeft + child.width + childMarginRight;
                        y += maxChildHeight;

                        child.x = paddingLeft + childMarginLeft;
                        child.y = y + childMarginTop;
                    }
                    else
                    {
                        x += child.width + childMarginRight;
                    }
                    break;

                default:
                    y += child.height + childMarginBottom;
                    break;
            }
        });
    }

    private setSelfPosition(parentWidth: number, parentHeight: number)
    {
        const { position, marginRight, marginBottom, marginTop, marginLeft } = this.layout.style || {};

        const { style } = this.layout;

        if (!position) return;

        const scaleX = this.layout.scale.x;
        const scaleY = this.layout.scale.y;
        const width = this.layout.width * scaleX;
        const height = this.layout.height * scaleY;

        const anchorX = style.anchorX;
        const anchorY = style.anchorY;

        switch (position)
        {
            case 'rightTop':
            case 'topRight':
            case 'right':
                this.layout.x = parentWidth - marginRight - (width * (anchorX ?? 1));
                this.layout.y = marginTop - (height * (anchorY ?? 0));
                break;

            case 'leftBottom':
            case 'bottomLeft':
            case 'bottom':
                this.layout.x = marginLeft - (width * (anchorX ?? 0));
                this.layout.y = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'rightBottom':
            case 'bottomRight':
                this.layout.x = parentWidth - marginRight - (width * (anchorX ?? 1));
                this.layout.y = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'center':
                this.layout.x = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                this.layout.y = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'centerTop':
            case 'topCenter':
                this.layout.x = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                this.layout.y = marginTop - (height * (anchorY ?? 0));
                break;

            case 'centerBottom':
            case 'bottomCenter':
                this.layout.x = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                this.layout.y = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'centerLeft':
            case 'leftCenter':
                this.layout.x = marginLeft - (width * (anchorX ?? 0));
                this.layout.y = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'centerRight':
            case 'rightCenter':
                this.layout.x = parentWidth - marginRight - (width * (anchorX ?? 1));
                this.layout.y = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'leftTop':
            case 'topLeft':
            case 'left':
            case 'top':
            default:
                this.layout.x = marginLeft - (width * (anchorX ?? 0));
                this.layout.y = marginTop - (height * (anchorY ?? 0));
        }
    }
}
