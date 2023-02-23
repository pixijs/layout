import { Layout } from '../Layout';
import { Content, LayoutStyles } from '../utils/types';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';

/** Controls all {@link Layout} children sizing. */
export class ContentController
{
    private layout: Layout;
    public children: Map<string, Container> = new Map();

    /**
     * Creates all instances and manages configs
     * @param {Layout} layout - Layout instance
     * @param content - Content of the layout
     * @param globalStyles - Global styles for layout and it's children
     */
    constructor(layout: Layout, content?: Content, globalStyles?: LayoutStyles)
    {
        this.layout = layout;
        this.children = new Map();
        this.createContent(content, globalStyles);
    }

    public createContent(content?: Content, parentGlobalStyles?: LayoutStyles)
    {
        if (!content) return;

        if (typeof content === 'string')
        {
            const { textStyle } = this.layout.style;
            const text = new Text(content, textStyle);

            const id = `text-${this.newID}`;

            this.children.set(id, text);
            this.layout.addChild(text);
        }
        else if (content instanceof Sprite)
        {
            const id = `sprite-${this.newID}`;

            this.children.set(id, content);
            this.layout.addChild(content);
        }
        else if (content instanceof Text)
        {
            const id = `text-${this.newID}`;

            const { textStyle } = this.layout.style;

            content.style = textStyle;

            this.children.set(id, content);
            this.layout.addChild(content);
        }
        else if (content instanceof Container)
        {
            const id = `container-${this.newID}`;

            this.children.set(id, content);
            this.layout.addChild(content);
        }
        else if (content instanceof Graphics)
        {
            const id = `graphics-${this.newID}`;

            this.children.set(id, content);
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
                            ...(content.globalStyles as any),
                        };
                    }
                    else
                    {
                        content.globalStyles = { ...parentGlobalStyles };
                    }
                }

                const newLayout = new Layout(content);

                const id = newLayout.id;

                this.children.set(id, newLayout);
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
                                id,
                            },
                            parentGlobalStyles,
                        );
                    }
                }
            }
        }
    }

    public get firstChild(): Container
    {
        return this.children.get(this.children.keys().next().value);
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

    private get newID(): string
    {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Get element from the layout child tree by it's ID
     * @param id
     */
    public getByID(id: string): Container | undefined
    {
        // 1st level search
        let result = this.children.get(id);

        if (!result)
        {
            this.children.forEach((child) =>
            {
                if (child instanceof Layout)
                {
                    const res = child.content.getByID(id);

                    if (res)
                    {
                        result = res;
                    }
                }
            });
        }

        return result;
    }
}
