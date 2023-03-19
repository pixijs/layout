import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/display';
import { Content, LayoutOptions, Styles } from './utils/types';
import { AlignController } from './controllers/align/AlignController';
import { StyleController } from './controllers/StyleController';
import { SizeController } from './controllers/SizeController';
import { ContentController } from './controllers/ContentController';
import { getColor } from './utils/helpers';
import { Sprite } from '@pixi/sprite';
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
 * (like Sprite of Graphics instances from Pixi.js.
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
export class Layout extends Container
{
    private bg: Graphics | Container;
    private overflowMask: Graphics;

    /** ID of layout, can be used to set styles in the globalStyles object somewhere higher in hierarchal tree. */
    id: string;

    /** {@link SizeController} is a class for controlling layout and all it's children sizes. */
    size: SizeController;

    /** {@link AlignController} is a class for controlling layout and all it's children alignment. */
    align: AlignController;

    /** {@link StyleController} is a class for controlling styles. */
    private _style: StyleController;

    /** {@link ContentController} controller is a class for controlling layouts children. */
    content: ContentController;

    /**
     * Creates layout
     * @param options - Layout options
     * @param options.id - ID of the layout.
     * @param options.styles - Styles of the layout. List of available styles can be found in {@link StyleController}.
     * @param options.content - Content of the layout.
     * @param options.globalStyles - Global styles for layout and it's children.
     */
    constructor(options: LayoutOptions)
    {
        super();

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

    /** Render and update the background of layout basing ot it's current state. */
    updateBG()
    {
        const { background } = this.style;

        if (background instanceof Container)
        {
            if (background instanceof Sprite)
            {
                background.anchor.set(0);
            }

            this.bg = background;

            this.addChildAt(this.bg, 0);
        }
        else
        {
            const color = background !== 'transparent' && getColor(background);

            const { borderRadius } = this.style;
            const { width, height } = this;

            if (color && width && height)
            {
                if (!this.bg)
                {
                    this.bg = new Graphics();
                    this.addChildAt(this.bg, 0);
                }

                let x = 0;
                let y = 0;

                const { anchorX, anchorY } = this.style;

                if (anchorX !== undefined)
                {
                    x -= width * anchorX;
                }

                if (anchorY !== undefined)
                {
                    y -= height * anchorY;
                }

                if (this.bg instanceof Graphics)
                {
                    this.bg.clear().beginFill(color.hex, color.opacity).drawRoundedRect(x, y, width, height, borderRadius);
                }
            }
            else if (this.bg)
            {
                this.removeChild(this.bg);
                delete this.bg;
            }
        }
    }

    /** Render and update the mask of layout basing ot it's current state. Mask is used to hide overflowing content. */
    updateMask()
    {
        const { overflow, borderRadius } = this.style;
        const { width, height } = this;

        if (overflow === 'hidden' && width && height)
        {
            if (!this.overflowMask)
            {
                this.overflowMask = new Graphics();
                this.addChild(this.overflowMask);
            }

            let x = 0;
            let y = 0;

            const { anchorX, anchorY } = this.style;

            if (anchorX !== undefined)
            {
                x -= width * anchorX;
            }

            if (anchorY !== undefined)
            {
                y -= height * anchorY;
            }

            this.overflowMask.clear().beginFill(0xffffff).drawRoundedRect(x, y, width, height, borderRadius).endFill();

            this.mask = this.overflowMask;
        }
        else
        {
            this.mask = null;
            delete this.overflowMask;
        }
    }

    /** Returns with of the container */
    get contentWidth(): number
    {
        return super.width;
    }

    /** Returns height of the container */
    get contentHeight(): number
    {
        return super.height;
    }

    /** Sets the width of layout.  */
    override set width(value: number)
    {
        this.size.width = value;
    }

    /** Gets the width of layout. */
    override get width()
    {
        return this.size.width;
    }

    /** Sets the height of layout. */
    override set height(value: number)
    {
        this.size.height = value;
    }

    /** Gets the height of layout. */
    override get height()
    {
        return this.size.height;
    }

    /**
     * Adds content to the layout and reposition/resize other elements and the layout basing on styles.
     * @param {Content} content - Content to be added. Can be string, Container, Layout, LayoutOptions or array of those.
     * Also content can be an object with inner layout ids as a keys, and Content as values.
     */
    public addContent(content: Content)
    {
        this.content.createContent(content);
        this.update();
    }

    /**
     * Removes content of the layout by its id and reposition/resize other elements and the layout basing on styles.
     * @param {string} id - id of the content to be removed.
     */
    public removeChildByID(id: string)
    {
        this.content.removeContent(id);
        this.update();
    }

    /**
     * Get element from the layout child tree by it's ID
     * @param {string} id - id of the content to be foundS.
     */
    public getChildByID(id: string): Layout | Container | undefined
    {
        return this.content.getByID(id);
    }

    /** This is used in case if some layout was changed and we need to update all layout structure. */
    public update()
    {
        const rootLayout = this.getRootLayout();

        rootLayout.size.update();
    }

    private getRootLayout(): Layout
    {
        if (this.parent && this.parent instanceof Layout)
        {
            return this.parent.getRootLayout();
        }

        return this;
    }

    /**
     * Updates the layout styles.
     * @param styles
     */
    public setStyles(styles: Styles)
    {
        this._style.set(styles);
        this.update();
    }

    /** Layout text styles. */
    public get textStyle(): Partial<TextStyle>
    {
        return this._style.textStyle;
    }

    /** Layout styles. */
    public get style(): Styles
    {
        return this._style.getAll();
    }
}
