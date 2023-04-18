import { Container } from '@pixi/display';
import { Content, LayoutOptions, Styles } from './utils/types';
import { AlignController } from './controllers/align/AlignController';
import { StyleController } from './controllers/StyleController';
import { SizeController } from './controllers/SizeController';
import { ContentController } from './controllers/ContentController';
import { TextStyle } from '@pixi/text';

/**
 * Layout controller class for any PixiJS Container based instance.
 *
 * To be be used for automatic align and resize children tree,
 * where every child behavior can be configured using css like configurations.
 *
 * Also it adds a list of css-like properties for styling like background style or text style,
 * check {@link SizeController} class.
 *
 * Any PixiJS Container based instance can be turned into a layout by calling {@link Layout#initLayout} method.
 * @example
 * const container = new Container().initLayout();
 *
 * container.layout?.setStyles({
 *      background: 'black',
 *      width: '100%',
 *      height: '100%',
 *      padding: 10,
 *      overflow: 'hidden',
 *      color: 'white',
 * }); // set styles
 *
 * container.layout?.setContent({
 *      text: 'Hello World',
 * }); // set content
 *
 * Or alternatively:
 *
 * const layoutSystem = new LayoutSystem({
 *      id: 'root',
 *      content: 'Hello World',
 *      styles: {
 *          background: 'black',
 *      }
 * }); // create layout system
 *
 * app.stage.addChild(layoutSystem.container); // add layout system generated container to the stage
 */
export class LayoutSystem
{
    /** Container for all layout children. */
    container: Container;

    /** ID of layout, can be used to set styles in the globalStyles object somewhere higher in hierarchal tree. */
    id: string;

    /** {@link SizeController} is a class for controlling layout and all it's children sizes. */
    size: SizeController;

    /** {@link AlignController} is a class for controlling layout and all it's children alignment. */
    align: AlignController;

    /** {@link StyleController} is a class for controlling styles. */
    protected _style: StyleController;

    /** {@link ContentController} controller is a class for controlling layouts children. */
    content: ContentController;

    /**
     * Creates layout system instance.
     * @param options - Layout options
     * @param options.id - ID of the layout.
     * @param options.styles - Styles of the layout. List of available styles can be found in {@link StyleController}.
     * @param options.content - Content of the layout.
     * @param options.globalStyles - Global styles for layout and it's children.
     * @param container - Container for all layout children, will be created if not provided.
     */
    constructor(options?: LayoutOptions, container?: Container)
    {
        this.container = container || new Container();

        this.id = options?.id;

        if (options?.globalStyles)
        {
            // check if there is a global style for this layout
            const styles = options.globalStyles[this.id];

            if (styles && options.styles)
            {
                options.styles = { ...styles, ...options.styles };
            }
            else if (styles)
            {
                options.styles = styles;
            }
        }

        // order here is important as controllers are dependent on each other
        this._style = new StyleController(this, options?.styles);
        this.size = new SizeController(this);
        this.align = new AlignController(this);
        this.content = new ContentController(this, options?.content, options?.globalStyles);
    }

    /**
     * Resize method should be called on every parent size change.
     * @param parentWidth
     * @param parentHeight
     */
    resize(parentWidth: number, parentHeight: number)
    {
        this.size.update(parentWidth, parentHeight);
    }

    /** Returns with of the container */
    get contentWidth(): number | undefined
    {
        if (!this.container?.parent)
        {
            return undefined;
        }

        return this.container.parent.width;
    }

    /** Returns height of the container */
    get contentHeight(): number | undefined
    {
        if (!this.container?.parent)
        {
            return undefined;
        }

        return this.container.parent.height;
    }

    /** Sets the width of layout.  */
    set width(value: number)
    {
        this.size.width = value;
    }

    /** Gets the width of layout. */
    get width()
    {
        return this.size.width;
    }

    /** Sets the height of layout. */
    set height(value: number)
    {
        this.size.height = value;
    }

    /** Gets the height of layout. */
    get height()
    {
        return this.size.height;
    }

    /**
     * Adds content to the layout and reposition/resize other elements and the layout basing on styles.
     * @param {Content} content - Content to be added. Can be string, Container, Layout, LayoutOptions or array of those.
     * Also content can be an object with inner layout ids as a keys, and Content as values.
     */
    addContent(content: Content)
    {
        this.content.createContent(content);
        this.update();
    }

    /**
     * Removes content of the layout by its id and reposition/resize other elements and the layout basing on styles.
     * @param {string} id - id of the content to be removed.
     */
    removeChildByID(id: string)
    {
        this.content.removeContent(id);
    }

    /**
     * Get element from the layout child tree by it's ID
     * @param {string} id - id of the content to be foundS.
     */
    getChildByID(id: string): Layout | Container | undefined
    {
        return this.content.getByID(id);
    }

    /** This is used in case if layout or some of it's children was changed and we need to update sizes and positions. */
    update()
    {
        const rootLayout = this.getRootLayout();

        rootLayout.layout.size.update();
    }

    protected getRootLayout(): Container
    {
        if (this.container.parent?.layout)
        {
            return this.container.parent.layout.getRootLayout();
        }

        return this.container;
    }

    /**
     * Updates the layout styles and resize/reposition it and its children basing on new styles.
     * @param styles
     */
    setStyles(styles: Styles)
    {
        this._style.set(styles);
        this.update();
    }

    /** Layout text styles. */
    get textStyle(): Partial<TextStyle>
    {
        return this._style.textStyle;
    }

    /** Layout styles. */
    get style(): Styles
    {
        return this._style.getAll();
    }
}

/**
 * Container with layout system initiated.
 * @example
 *
 * const layout = new Layout({
 * 	styles: {
 * 		width: 100,
 * 		height: 100,
 * 		background: 'red',
 * 	},
 * 	content: [
 * 		'Hello world',
 * 		{
 * 			id: 'innerLayout1',
 * 			text: 'Inner layout 1',
 * 		},
 * 		{
 * 			id: 'innerLayout2',
 * 			text: 'Inner layout 2',
 * 		},
 * 	],
 * 	globalStyles: {
 * 		innerLayout1: {
 * 			width: 200,
 * 			height: 200,
 * 		},
 * 		innerLayout1: {
 * 			width: 200,
 * 			height: 200,
 * 		},
 * 	},
 * });
 */
export class Layout extends Container
{
    override layout: LayoutSystem;

    /**
     * Creates layout container.
     * @param options
     */
    constructor(options?: LayoutOptions)
    {
        super();

        this.layout = new LayoutSystem(options, this);
    }

    /** Get {@link SizeController} */
    get size(): SizeController
    {
        return this.layout.size;
    }

    /** {@link AlignController} */
    get align(): AlignController
    {
        return this.layout.align;
    }

    /** {@link ContentController} */
    get content(): ContentController
    {
        return this.layout.content;
    }

    /** ID of layout, can be used to set styles in the globalStyles. */
    get id()
    {
        return this.layout.id;
    }

    /** ID of layout, can be used to set styles in the globalStyles. */
    set id(value: string)
    {
        this.layout.id = value;
    }

    /** Returns with of the layouts content. */
    get contentWidth(): number | undefined
    {
        return this.layout.contentWidth;
    }

    /** Returns height of the layouts content. */
    get contentHeight(): number | undefined
    {
        return this.layout.contentHeight;
    }

    /** Set the width of layout.  */
    override set width(value: number)
    {
        this.layout.width = value;
    }

    /** Get the width of layout. */
    override get width()
    {
        return this.layout.width;
    }

    /** Set the height of layout. */
    override set height(value: number)
    {
        this.layout.height = value;
    }

    /** Get the height of layout. */
    override get height()
    {
        return this.layout.height;
    }

    /**
     * Add content to the layout system and reposition/resize elements basing on styles.
     * @param {Content} content - Content to be added. Can be string, Container, Layout, LayoutOptions or array of those.
     * Also content can be an object where keys are ids of child layouts to create, and Content as values.
     */
    addContent(content: Content)
    {
        this.layout.addContent(content);
    }

    /**
     * Remove content from layout system by its id and reposition/resize elements basing on styles.
     * @param {string} id - id of the content to be removed.
     */
    removeChildByID(id: string)
    {
        this.layout.removeChildByID(id);
    }

    /**
     * Get element from the layout system children tree by it's ID
     * @param {string} id - id of the content to be foundS.
     */
    getChildByID(id: string): Layout | Container | undefined
    {
        return this.layout.getChildByID(id);
    }

    /**
     * Updates the layout styles and resize/reposition elements basing on new styles.
     * @param styles
     */
    setStyles(styles: Styles)
    {
        this.layout.setStyles(styles);
    }

    /** Layout text styles. */
    get textStyle(): Partial<TextStyle>
    {
        return this.layout.textStyle;
    }

    /** Layout styles. */
    get style(): Styles
    {
        return this.layout.style;
    }

    /**
     * Resize method should be called on every parent size change.
     * @param parentWidth
     * @param parentHeight
     */
    resize(parentWidth: number, parentHeight: number)
    {
        this.layout.resize(parentWidth, parentHeight);
    }
}

declare module '@pixi/display/lib/Container'
{
    interface Container
    {
        initLayout(config?: LayoutOptions): Container;
        layout?: LayoutSystem;
    }
}

if (!Container.prototype.initLayout)
{
    Object.defineProperty(Container.prototype, 'initLayout', {
        value(options?: LayoutOptions): void
        {
            if (!this.layout)
            {
                this.layout = new LayoutSystem(options, this);
            }

            return this;
        }
    });
}
