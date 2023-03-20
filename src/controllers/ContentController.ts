/* eslint-disable no-prototype-builtins */
/* eslint-disable no-case-declarations */
import { Layout } from '../Layout';
import { Content, ContentList, LayoutOptions, LayoutStyles } from '../utils/types';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';
import { stylesToPixiTextStyles } from '../utils/helpers';

type ContentType = 'layout' | 'text' | 'string' | 'container' | 'array' | 'unknown' | 'layoutConfig' | 'object';

/** Controls all {@link Layout} children sizing. */
export class ContentController
{
    private layout: Layout;

    /**
     * List of all children of the layout, controlled by this controller.
     * As the layout is a container, you can use all container methods on it,
     * including addChild, but only elements added by layout
     * config thought constructor of {@link ContentController} or using
     * `addContent` method will be managed by this controller.
     */
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

    /**
     * Adds content to the layout.
     * @param {Content} content - Content of the layout
     * @param {LayoutStyles} parentGlobalStyles - Global styles for layout and it's children
     */
    public createContent(content?: Content, parentGlobalStyles?: LayoutStyles)
    {
        if (!content) return;

        const contentType = this.getContentType(content);
        const customID = this.newID;

        switch (contentType)
        {
            case 'layout':
                const layout = content as Layout;

                this.addContentElement(layout.id, layout);
                break;
            case 'container':
                this.addContentElement(`container-${customID}`, content as Container);
                break;
            case 'string':
                const text = new Text(content as string, this.layout.textStyle);

                this.addContentElement(`text-${customID}`, text);
                break;
            case 'text':
                const textInstance = content as Text;

                textInstance.style = this.layout.textStyle;
                this.addContentElement(`text-${customID}`, textInstance);
                break;
            case 'layoutConfig':
                const layoutConfig = content as LayoutOptions;

                if (parentGlobalStyles)
                {
                    if (layoutConfig.globalStyles)
                    {
                        layoutConfig.globalStyles = {
                            ...parentGlobalStyles,
                            ...(layoutConfig.globalStyles as any)
                        };
                    }
                    else
                    {
                        layoutConfig.globalStyles = { ...parentGlobalStyles };
                    }
                }

                if (!layoutConfig.id)
                {
                    layoutConfig.id = `layout-${customID}`;
                }

                this.addContentElement(layoutConfig.id, new Layout(layoutConfig));
                break;
            case 'object':
                const contentList = content as ContentList[];

                // this is where we are managing object keys, and assign them as ids of the added elements
                for (const id in contentList)
                {
                    const idKey = id as keyof typeof content;
                    const contentElement = content[idKey] as any;

                    const contentType = this.getContentType(contentElement);
                    let defaultStyles = this.layout.textStyle; // default text style of the layout

                    switch (contentType)
                    {
                        case 'string':
                            if (parentGlobalStyles && parentGlobalStyles[idKey])
                            {
                                // if there are predefined styles for this id
                                defaultStyles = {
                                    ...defaultStyles,
                                    ...stylesToPixiTextStyles(parentGlobalStyles[idKey])
                                };
                            }

                            const text = new Text(contentElement as string, defaultStyles);

                            this.addContentElement(idKey, text);
                            break;
                        case 'text':
                            const textInstance = contentElement as Text;

                            if (parentGlobalStyles && parentGlobalStyles[idKey])
                            {
                                // if there are predefined styles for this id
                                defaultStyles = {
                                    ...defaultStyles,
                                    ...stylesToPixiTextStyles(parentGlobalStyles[idKey])
                                };
                            }

                            textInstance.style = defaultStyles;

                            this.addContentElement(idKey, textInstance);
                            break;
                        case 'layout':
                            const layoutInstance = contentElement as Layout;

                            if (parentGlobalStyles && parentGlobalStyles[idKey])
                            {
                                layoutInstance.setStyles(parentGlobalStyles[idKey]);
                                layoutInstance.update();
                            }

                            this.createContent(layoutInstance);
                            break;
                        case 'container':
                            this.addContentElement(idKey, contentElement);
                            break;
                        case 'layoutConfig':
                            this.createContent({
                                ...contentElement,
                                globalStyles: parentGlobalStyles,
                                id: idKey // we are rewriting this id with the key of the object, even if it is set
                            });
                            break;
                        case 'object':
                            this.createContent(contentElement, parentGlobalStyles);
                            break;
                        case 'array':
                            this.createContent(contentElement, parentGlobalStyles);
                            break;
                        default: // do nothing
                    }
                }
                break;
            case 'array':
                const contentArray = content as Array<LayoutOptions>;

                contentArray.forEach((content) => this.createContent(content, parentGlobalStyles));
                break;
            default:
                throw new Error('Unknown content type of the layout.');
        }
    }

    /**
     * Adds content element to the layout and register it in Content controller registry.
     * @param {string} id - ID of the element
     * @param {Container } content - pixi container instance to be added
     */
    public addContentElement(id: string, content: Container)
    {
        if (id && this.children.has(id))
        {
            throw new Error(`Content element with id '${id}' already exists in layout width id '${this.layout.id}'.`);
        }

        this.children.set(id, content);
        this.layout.addChild(content);
    }

    /**
     * Get first child of the layout
     * @returns {Container} - First child of the layout
     */
    public get firstChild(): Container
    {
        return this.children.get(this.children.keys().next().value);
    }

    /**
     * Resizes all children.
     * @param width
     * @param height
     */
    public resize(width: number, height: number)
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
    public getByID(id: string): Layout | Container | undefined
    {
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

    private getContentType(content: Content): ContentType
    {
        if (typeof content === 'string') return 'string';

        if (content instanceof Layout) return 'layout';

        if (content instanceof Text) return 'text';

        if (content instanceof Sprite) return 'container';

        if (content instanceof Graphics) return 'container';

        if (content instanceof Container) return 'container';

        if (Array.isArray(content)) return 'array';

        if (typeof content === 'object')
        {
            if (content.content)
            {
                return 'layoutConfig';
            }

            return 'object';
        }

        return 'unknown';
    }

    /**
     * Removes content by its id.
     * @param id
     */
    public removeContent(id: string)
    {
        const content = this.getByID(id);

        if (content)
        {
            this.layout.removeChild(content);
            this.children.delete(id);
        }
    }
}
