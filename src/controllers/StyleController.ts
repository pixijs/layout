import type { ConditionalStyles, GradeToOne, Styles } from '../utils/types';
import { TextStyle } from '@pixi/text';
import { stylesToPixiTextStyles } from '../utils/helpers';
import { OVERFLOW, VERTICAL_ALIGN } from '../utils/constants';
import { LayoutSystem } from '../Layout';

/** Style controller manages {@link LayoutSystem} styles. */
export class StyleController
{
    protected layout: LayoutSystem;

    protected styles: Styles = {};

    /** Holds all text related styles. This is to be nested by children */
    protected _textStyle: Partial<TextStyle> = {}; // this is to be nested by children

    /** Stores last parent width */
    protected parentWidth = 0;

    /** Stores last parent height */
    protected parentHeight = 0;

    /** Stores default styles. */
    protected defaultStyles: Styles;

    /** Conditional styles */
    protected conditionalStyles: ConditionalStyles = {};

    /**
     * Manages and sets all the styles of {@link LayoutSystem}
     * @param layout - {@link LayoutSystem} to be styled
     * @param styles - styles to be applied
     */
    constructor(layout: LayoutSystem, styles?: Styles)
    {
        this.layout = layout;
        if (styles)
        {
            this.set(styles);
        }
    }

    /**
     * Applies a list of styles for the layout.
     * @param { Styles } styles - styles to be applied
     */
    set(styles?: Styles & ConditionalStyles)
    {
        this.styles.overflow = styles?.overflow ?? this.styles.overflow ?? OVERFLOW[0];
        this.styles.display = styles?.display ?? this.styles.display ?? 'inline-block';
        this.styles.borderRadius = styles?.borderRadius ?? this.styles.borderRadius ?? 0;

        this.styles.zIndex = styles?.zIndex ?? this.styles.zIndex ?? 1;

        this.opacity = styles?.opacity ?? this.styles.opacity ?? 1;

        this.styles.maxWidth = styles?.maxWidth ?? this.styles.maxWidth;
        this.styles.maxHeight = styles?.maxHeight ?? this.styles.maxHeight;

        this.styles.minWidth = styles?.minWidth ?? this.styles.minWidth;
        this.styles.minHeight = styles?.minHeight ?? this.styles.minHeight;

        this.styles.padding = styles?.padding ?? this.styles.padding ?? 0;
        this.styles.paddingTop
            = styles?.paddingTop ?? styles?.padding ?? this.styles.paddingTop ?? 0;
        this.styles.paddingRight
            = styles?.paddingRight ?? styles?.padding ?? this.styles.paddingRight ?? 0;
        this.styles.paddingBottom
            = styles?.paddingBottom ?? styles?.padding ?? this.styles.paddingBottom ?? 0;
        this.styles.paddingLeft
            = styles?.paddingLeft ?? styles?.padding ?? this.styles.paddingLeft ?? 0;

        this.styles.margin = styles?.margin ?? this.styles.margin ?? 0;
        this.styles.marginTop = styles?.marginTop ?? styles?.margin ?? this.styles.marginTop ?? 0;
        this.styles.marginRight
            = styles?.marginRight ?? styles?.margin ?? this.styles.marginRight ?? 0;
        this.styles.marginBottom
            = styles?.marginBottom ?? styles?.margin ?? this.styles.marginBottom ?? 0;
        this.styles.marginLeft
            = styles?.marginLeft ?? styles?.margin ?? this.styles.marginLeft ?? 0;

        this.styles.scale = styles?.scale ?? this.styles.scale ?? 1;
        this.styles.scaleX = styles?.scaleX ?? styles?.scale ?? this.styles.scaleX ?? 1;
        this.styles.scaleY = styles?.scaleY ?? styles?.scale ?? this.styles.scaleY ?? 1;

        this.styles.width = styles?.width ?? this.styles.width ?? 'auto';
        this.styles.height = styles?.height ?? this.styles.height ?? 'auto';

        this.styles.wordWrap = styles?.wordWrap ?? false;

        if (styles?.anchorX !== undefined)
        {
            this.styles.anchorX = styles.anchorX;
        }
        else if (styles?.anchor !== undefined)
        {
            if (typeof styles.anchor === 'number')
            {
                this.styles.anchorX = styles.anchor;
            }
            else if (Array.isArray(styles.anchor))
            {
                this.styles.anchorX = styles.anchor[0];
            }
        }

        if (styles?.anchorY !== undefined)
        {
            this.styles.anchorY = styles.anchorY;
        }
        else if (styles?.anchor !== undefined)
        {
            if (typeof styles.anchor === 'number')
            {
                this.styles.anchorY = styles.anchor;
            }
            else if (Array.isArray(styles.anchor) && styles.anchor[1] !== undefined)
            {
                this.styles.anchorY = styles.anchor[1];
            }
        }

        this.styles.background
            = styles?.background ?? styles?.backgroundColor ?? this.styles.background;

        this.styles.textAlign = styles?.textAlign ?? this.styles.textAlign;
        this.styles.position = styles?.position ?? this.styles.position;
        this.styles.verticalAlign
            = styles?.verticalAlign ?? this.styles.verticalAlign ?? VERTICAL_ALIGN[0];

        this.styles.aspectRatio = styles?.aspectRatio ?? this.styles.aspectRatio ?? 'static';

        this.styles.visible = styles?.visible ?? this.styles.visible ?? true;

        this._textStyle = stylesToPixiTextStyles(styles);

        this.separateConditionalStyles(styles);
    }

    /**
     * Returns a style value by name.
     * @param style - name of the style
     */
    get(style: keyof Styles): Styles[keyof Styles]
    {
        return this.styles[style];
    }

    /** Returns all styles of the Layout */
    getAll(): Styles
    {
        return this.styles;
    }

    /** Returns all pixi text related styles of the Layout */
    get textStyle(): Partial<TextStyle>
    {
        return this._textStyle;
    }

    /** Sets the opacity of the layout */
    set opacity(value: GradeToOne)
    {
        this.styles.opacity = value;
        this.layout.container.alpha = value;
    }

    /** Returns the opacity of the layout */
    get opacity(): GradeToOne
    {
        return this.styles.opacity;
    }

    /**
     * Checks and applies conditional styles basing on parent size
     * @param {number} parentWidth
     * @param {number} parentHeight
     */
    applyConditionalStyles(parentWidth?: number, parentHeight?: number)
    {
        if (parentWidth !== undefined)
        {
            this.parentWidth = parentWidth;
        }

        if (parentHeight !== undefined)
        {
            this.parentHeight = parentHeight;
        }

        let finalStyles = { ...this.defaultStyles };

        if (this.conditionalStyles.portrait && this.parentHeight >= this.parentWidth)
        {
            finalStyles = { ...finalStyles, ...this.conditionalStyles.portrait };
        }

        if (this.conditionalStyles.landscape && this.parentHeight < this.parentWidth)
        {
            finalStyles = { ...finalStyles, ...this.conditionalStyles.landscape };
        }

        if (this.conditionalStyles.max?.height)
        {
            for (const [key, value] of Object.entries(this.conditionalStyles.max.height))
            {
                if (this.parentHeight <= parseInt(key, 10))
                {
                    finalStyles = { ...finalStyles, ...value };
                }
            }
        }

        if (this.conditionalStyles.max?.width)
        {
            for (const [key, value] of Object.entries(this.conditionalStyles.max.width))
            {
                if (this.parentWidth <= parseInt(key, 10))
                {
                    finalStyles = { ...finalStyles, ...value };
                }
            }
        }

        if (this.conditionalStyles.min?.height)
        {
            for (const [key, value] of Object.entries(this.conditionalStyles.min.height))
            {
                if (this.parentHeight >= parseInt(key, 10))
                {
                    finalStyles = { ...finalStyles, ...value };
                }
            }
        }

        if (this.conditionalStyles.min?.width)
        {
            for (const [key, value] of Object.entries(this.conditionalStyles.min.width))
            {
                if (this.parentWidth >= parseInt(key, 10))
                {
                    finalStyles = { ...finalStyles, ...value };
                }
            }
        }

        this.set(finalStyles);
    }

    /**
     * Separates conditional styles from default styles
     * @param styles - mixed styles
     */
    protected separateConditionalStyles(styles?: Styles & ConditionalStyles)
    {
        if (!styles.portrait && !styles.landscape && !styles.max && !styles.min)
        {
            return;
        }

        if (styles.portrait)
        {
            this.conditionalStyles.portrait = styles.portrait;
            delete styles.portrait;
        }

        if (styles.landscape)
        {
            this.conditionalStyles.landscape = styles.landscape;
            delete styles.landscape;
        }

        if (styles.max)
        {
            this.conditionalStyles.max = styles.max;
            delete styles.max;
        }

        if (styles.min)
        {
            this.conditionalStyles.min = styles.min;
            delete styles.min;
        }

        this.defaultStyles = {
            ...styles,
        };
    }
}
