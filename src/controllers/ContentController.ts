import { Layout } from '../Layout';
import { Content, ContentList, LayoutOptions, LayoutStyles } from '../utils/types';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';

type ContentType = 'text' | 'string' | 'container' | 'array' | 'unknown' | 'content' | 'object';

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

        const contentType = this.getContentType(content);
        const customID = this.newID;
        
        switch (contentType) {
            case 'object':
                const contentList =  content as ContentList[];

                for (const id in contentList)
                {
                    const idKey = id as keyof typeof content;
                    const contentElement = content[idKey] as any;

                    if (contentElement.hasOwnProperty('children')) {
                        this.createContent(contentElement);
                    } else if (contentElement.hasOwnProperty('content'))
                    {
                        this.createContent(
                            {
                                ...contentElement,
                                id,
                            },
                            parentGlobalStyles,
                        );
                    }
                }
                break;
            case 'string':
                const text = new Text(content as string, this.layout.style.textStyle);

                this.children.set(`text-${customID}`, text);
                this.layout.addChild(text);
                break;
            case 'text':
                const textInstance = content as Text;

                textInstance.style = this.layout.style.textStyle;

                this.children.set(`text-${customID}`, textInstance);
                this.layout.addChild(textInstance);
                break;
            case 'container':
                this.children.set(`container-${customID}`, content as Container);
                this.layout.addChild(content as Container);
                break;
            case 'array':
                const contentArray = content as Array<LayoutOptions>;

                contentArray.forEach((content) => {
                    this.createContent(new Layout(content), parentGlobalStyles);
                });
                break;
            case 'content':
                // we consider this as Layout config
                const contentConfig = content as LayoutOptions;

                if (parentGlobalStyles)
                {
                    if (contentConfig.globalStyles)
                    {
                        contentConfig.globalStyles = {
                            ...parentGlobalStyles,
                            ...(contentConfig.globalStyles as any),
                        };
                    }
                    else
                    {
                        contentConfig.globalStyles = { ...parentGlobalStyles };
                    }
                }

                const newLayout = new Layout(contentConfig);

                this.children.set(newLayout.id, newLayout);
                this.layout.addChild(newLayout);
                break;
            default:
                throw new Error('Unknown content type of the layout.');
                break;
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
    public getByID(id: string): Layout | Container | undefined
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

    private getContentType(content: Content): ContentType {
        if (typeof content === 'string') return 'string';

        if (content instanceof Text) return 'text';
        
        if (content instanceof Sprite) return 'container';
                
        if (content instanceof Graphics) return 'container';
        
        if (content instanceof Container) return 'container';

        if (content instanceof Layout) return 'container';
        
        if (Array.isArray(content)) return 'array';
        
        if (typeof content === 'object') {
            if (content.content)
            {
                return 'content';
            }

            return 'object';
        }

        return 'unknown';
    }
}
