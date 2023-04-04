import { Container } from '@pixi/display';
import { Content, LayoutOptions, Styles } from './utils/types';
import { AlignController } from './controllers/align/AlignController';
import { StyleController } from './controllers/StyleController';
import { SizeController } from './controllers/SizeController';
import { ContentController } from './controllers/ContentController';
import { TextStyle } from '@pixi/text';

/**
 * Universal layout class for Pixi.js.
 *
 * You can consider layout as div from CSS.
 *
 * It will be rendered as PIXI.Container and can be used for automatic align and resize blocks and text.
 *
 * Also it brings a list of css-like properties for styling itself and it's children.
 *
 * Children will be resized and aligned to fit parent size, if they have width and height properties
 *
 * (like Sprite or Graphics instances from Pixi.js)
 * @example
 * const layout = new Layout({
 * 	id: 'myLayout',
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
export class LayoutSystem
{
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

    /** Container instance. */
    container: Container;

    /**
     * Creates layout
     * @param container - Container to which layout will be added.
     * @param options - Layout options
     * @param options.id - ID of the layout.
     * @param options.styles - Styles of the layout. List of available styles can be found in {@link StyleController}.
     * @param options.content - Content of the layout.
     * @param options.globalStyles - Global styles for layout and it's children.
     */
    constructor(container: Container, options: LayoutOptions)
    {
        this.container = container;
        (container as any).layout = this;

        this.id = options.id;

        if (options.globalStyles)
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
        this._style = new StyleController(this, options.styles);
        this.size = new SizeController(this);
        this.align = new AlignController(this);
        this.content = new ContentController(this, options.content, options.globalStyles);
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
        this.update();
    }

    /**
     * Get element from the layout child tree by it's ID
     * @param {string} id - id of the content to be foundS.
     */
    getChildByID(id: string): Container | undefined
    {
        return this.content.getByID(id);
    }

    /** This is used in case if layout or some of it's children was changed and we need to update sizes and positions. */
    update()
    {
        const rootLayout = this.getRootLayout();

        rootLayout.size.update();
    }

    get parent(): Container
    {
        return this.container.parent;
    }

    /**
     * Updates the layout styles and resize/reposition it ant its children basing on new styles.
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

    protected getRootLayout(): LayoutSystem
    {
        if (this.parent && this.parent.layout)
        {
            return (this.parent.layout as any).getRootLayout();
        }

        return this;
    }
}

export class Layout extends Container
{
    constructor(options: LayoutOptions)
    {
        super();
        this.initLayout(options);
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

    /**
     * Adds content to the layout and reposition/resize other elements and the layout basing on styles.
     * @param {Content} content - Content to be added. Can be string, Container, Layout, LayoutOptions or array of those.
     * Also content can be an object with inner layout ids as a keys, and Content as values.
     */
    addContent(content: Content)
    {
        this.layout.addContent(content);
    }

    /**
     * Removes content of the layout by its id and reposition/resize other elements and the layout basing on styles.
     * @param {string} id - id of the content to be removed.
     */
    removeChildByID(id: string)
    {
        this.layout.removeChildByID(id);
    }

    /**
     * Get element from the layout child tree by it's ID
     * @param {string} id - id of the content to be foundS.
     */
    getChildByID(id: string): Container | undefined
    {
        return this.layout.getChildByID(id);
    }

    /** This is used in case if layout or some of it's children was changed and we need to update sizes and positions. */
    update()
    {
        this.layout.update();
    }

    /**
     * Updates the layout styles and resize/reposition it ant its children basing on new styles.
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
}
