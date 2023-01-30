import { Layout } from '../Layout';
import { Containers, Content, LayoutStyles } from '../utils/types';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';

export class ContentController
{
    private layout: Layout;

    children: Containers = [];

    constructor(layout: Layout, content?: Content, globalStyles?: LayoutStyles)
    {
        this.layout = layout;

        this.createContent(content, globalStyles);
    }

    private createContent(content?: Content, parentGlobalStyles?: LayoutStyles)
    {
        if (!content) return;

        if (typeof content === 'string')
        {
            const { textStyles } = this.layout.style;

            const text = new Text(content, textStyles);

            this.children.push(text);
            this.layout.addChild(text);
        }
        else if (content instanceof Container)
        {
            this.children.push(content);
            this.layout.addChild(content);
        }
        else if (Array.isArray(content))
        {
            content.forEach((content) =>
            {
                this.createContent(content, parentGlobalStyles);
            });
        }
        else if (typeof content === 'object')
        {
            if (content.id)
            {
                // we consider this as Layout

                if (parentGlobalStyles)
                {
                    if (content.globalStyles)
                    {
                        content.globalStyles = {
                            ...parentGlobalStyles,
                            ...content.globalStyles
                        };
                    }
                    else
                    {
                        content.globalStyles = { ...parentGlobalStyles };
                    }
                }

                const layout = new Layout(content);

                this.children.push(layout);
                this.layout.addChild(layout);
            }
            else
            {
                throw new Error('Invalid content');
            }
        }
    }

    resize(width: number, height: number)
    {
        this.layout.children.forEach((child) =>
        {
            if (child instanceof Text)
            {
                const align = this.layout.style.textAlign;
                const padding = this.layout.style.padding;

                child.style.wordWrapWidth = width - (padding * 2);

                if (child.width < width)
                {
                    if (align === 'center')
                    {
                        child.anchor.set(0.5, 0);
                        child.x = width / 2;
                    }
                    else if (align === 'right')
                    {
                        child.anchor.set(1, 0);
                        child.x = width - padding;
                    }
                }
                else
                {
                    child.anchor.set(0, 0);
                    child.x = padding;
                }
            }
            else if (child instanceof Layout)
            {
                child.resize(width, height);
            }
        });
    }
}
