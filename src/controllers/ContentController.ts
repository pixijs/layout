import { Layout } from '../Layout';
import { Content, LayoutStyles } from '../utils/types';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';

/** Controls all {@link Layout} children sizing. */
export class ContentController
{
    private layout: Layout;
    private children: Array<Container>;

    /**
     * Creates all instances and manages configs
     * @param {Layout} layout - Layout instance
     * @param content - Content of the layout
     * @param globalStyles - Global styles for layout and it's children
     */
    constructor(layout: Layout, content?: Content, globalStyles?: LayoutStyles)
    {
        this.layout = layout;
        this.children = layout.elements;
        this.createContent(content, globalStyles);
    }

    private createContent(content?: Content, parentGlobalStyles?: LayoutStyles)
    {
        if (!content) return;

        if (typeof content === 'string')
        {
            const { textStyle: textStyles } = this.layout.style;

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
            if (content.id && content.content)
            {
                // we consider this as Layout

                if (parentGlobalStyles)
                {
                    if (content.globalStyles)
                    {
                        content.globalStyles = {
                            ...parentGlobalStyles,
                            ...(content.globalStyles as any)
                        };
                    }
                    else
                    {
                        content.globalStyles = { ...parentGlobalStyles };
                    }
                }

                const newLayout = new Layout(content);

                this.children.push(newLayout);
                this.layout.addChild(newLayout);
            }
            else
            {
                // if ID is key of object instead of separate property
                for (const id in content)
                {
                    if (Object.prototype.hasOwnProperty.call(content, id))
                    {
                        const idKey = id as keyof typeof content;
                        const cont = content[idKey] as any;

                        this.createContent(
                            {
                                ...cont,
                                id
                            },
                            parentGlobalStyles
                        );
                    }
                }
            }
        }
    }

    /**
     * Resizes all children.
     * @param width
     * @param height
     */
    resize(width: number, height: number)
    {
        this.children.forEach((child) =>
        {
            if (child instanceof Layout)
            {
                child.resize(width, height);
            }
        });
    }
}
