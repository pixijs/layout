import { Layout } from '../../Layout';
import { Text } from '@pixi/text';

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
     * @param {number} width - Parent width
     * @param {number} height - Parent height
     */
    update(width: number, height: number)
    {
        this.alignChildren();
        this.setSelfPosition(width, height);
    }

    private alignChildren()
    {
        let maxChildHeight = 0;

        const { style } = this.layout;

        const paddingTop = style.paddingTop ?? 0;
        const paddingRight = style.paddingRight ?? 0;
        const paddingBottom = style.paddingBottom ?? 0;
        const paddingLeft = style.paddingLeft ?? 0;

        let x = paddingLeft;
        let y = paddingTop;

        const parentWidth = this.layout.width + paddingLeft;

        const children = this.layout.content.children;

        children.forEach((child, childNumber) =>
        {
            if (!child.height && !child.width) return;

            if (child instanceof Text)
            {
                const parentWidth = this.layout.width;
                const parentHeight = this.layout.height;

                const availableWidth = parentWidth - paddingLeft - paddingRight;

                child.style.wordWrapWidth = availableWidth;

                const align = this.layout.style.textAlign;

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

                const verticalAlign = this.layout.style.verticalAlign;

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

            let childDisplay = 'block';

            if (child instanceof Layout)
            {
                childDisplay = child.style.display;
            }

            child.x = x;
            child.y = y;

            if (child.height > maxChildHeight)
            {
                maxChildHeight = child.height;
            }

            const availableWidth = parentWidth - paddingLeft - paddingRight;

            if (childDisplay === 'block' && child.width < availableWidth)
            {
                childDisplay = 'inline-block';
            }

            const childDoesNotFeet = x + child.width > availableWidth;
            const isFirstChild = childNumber === 0;

            switch (childDisplay)
            {
                case 'inline':
                case 'inline-block':
                    if (childDoesNotFeet && !isFirstChild)
                    {
                        x = paddingLeft + child.width;
                        y += maxChildHeight;

                        child.x = paddingLeft;
                        child.y = y;
                    }
                    else
                    {
                        x += child.width;
                    }
                    break;

                default:
                    y += child.height;
                    break;
            }
        });
    }

    private setSelfPosition(parentWidth: number, parentHeight: number)
    {
        const { position } = this.layout.style || {};

        switch (position)
        {
            // we skip 'left', 'top' and 'leftTop' because they are default
            case 'rightTop':
            case 'right':
                this.layout.x = parentWidth - this.layout.width - (this.layout.style.marginRight ?? 0);
                this.layout.y = this.layout.style.marginTop ?? 0;
                break;

            case 'leftBottom':
            case 'bottom':
                this.layout.x = this.layout.style.marginLeft ?? 0;
                this.layout.y = parentHeight - this.layout.height - (this.layout.style.marginBottom ?? 0);
                break;

            case 'rightBottom':
                this.layout.x = parentWidth - this.layout.width - (this.layout.style.marginRight ?? 0);
                this.layout.y = parentHeight - this.layout.height - (this.layout.style.marginBottom ?? 0);
                break;

            case 'center':
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                break;
            case 'centerTop':
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                this.layout.y = this.layout.style.marginTop ?? 0;
                break;

            case 'centerBottom':
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                this.layout.y = parentHeight - this.layout.height - (this.layout.style.marginBottom ?? 0);
                break;

            case 'centerLeft':
                this.layout.x = this.layout.style.marginLeft ?? 0;
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                break;

            case 'centerRight':
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                this.layout.x = parentWidth - this.layout.width - (this.layout.style.marginRight ?? 0);
                break;
        }
    }
}
