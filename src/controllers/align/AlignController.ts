import { Layout } from '../../Layout';
import { Text } from '@pixi/text';

export class AlignController
{
    private layout: Layout;

    constructor(layout: Layout)
    {
        this.layout = layout;
    }

    update(width: number, height: number)
    {
        switch (this.layout.style.display)
        {
            // TODO:
            // case 'inline-block',
            // case 'inline',
            // case 'block':
            default:
                this.alignChildren();
                this.setSelfPosition(width, height);
                break;
        }
    }

    private alignChildren()
    {
        let maxChildHeight = 0;
        const padding = this.layout.style.padding ?? 0;
        let x = padding;
        let y = padding;
        const parentWidth = this.layout.width + padding;

        const children = this.layout.content.children;

        children.forEach((child, childNumber) =>
        {
            let childDisplay = 'block';

            if (child instanceof Layout)
            {
                childDisplay = child.style.display;
            }

            if (child.height && child.width)
            {
                child.x = x;
                child.y = y;

                if (child.height > maxChildHeight)
                {
                    maxChildHeight = child.height;
                }

                if (childDisplay === 'block' && child.width < parentWidth - (padding * 2))
                {
                    childDisplay = 'inline-block';
                }

                const childDoesNotFeet = Math.floor(x + child.width) > parentWidth - (padding * 2);
                const isFirstChild = childNumber === 0;

                switch (childDisplay)
                {
                    case 'inline':
                    case 'inline-flex':
                    case 'inline-block':
                        if (childDoesNotFeet && !isFirstChild)
                        {
                            x = padding + child.width;
                            y += maxChildHeight;

                            child.x = padding;
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
                this.layout.y = 0;
                this.layout.x = parentWidth - this.layout.width;
                break;

            case 'leftBottom':
            case 'bottom':
                this.layout.x = 0;
                this.layout.y = parentHeight - this.layout.height;
                break;

            case 'rightBottom':
                this.layout.x = parentWidth - this.layout.width;
                this.layout.y = parentHeight - this.layout.height;
                break;

            case 'center':
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                break;
            case 'centerTop':
                this.layout.y = 0;
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                break;

            case 'centerBottom':
                this.layout.x = (parentWidth / 2) - (this.layout.width / 2);
                this.layout.y = parentHeight - this.layout.height;
                break;

            case 'centerLeft':
                this.layout.x = 0;
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                break;

            case 'centerRight':
                this.layout.y = (parentHeight / 2) - (this.layout.height / 2);
                this.layout.x = parentWidth - this.layout.width;
                break;
        }
    }
}
