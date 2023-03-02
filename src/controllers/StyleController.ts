import type {
    Display,
    FlexColor,
    FlexNumber,
    GradeToOne,
    Overflow,
    Position,
    Styles,
    VerticalAlign,
} from '../utils/types';
import type {
    TextStyleAlign,
    TextStyleFontStyle,
    TextStyleFontVariant,
    TextStyleFontWeight,
    TextStyleLineJoin,
    TextStyleTextBaseline,
    TextStyleWhiteSpace,
} from '@pixi/text';
import { TEXT_GRADIENT, TextStyle } from '@pixi/text';
import { getColor } from '../utils/helpers';
import { OVERFLOW, ALIGN, VERTICAL_ALIGN } from '../utils/constants';
import { Layout } from '../Layout';
import { Container } from '@pixi/display';
/** Style controller manages {@link Layout} styles. Here you can find all available styles and their default values. */
export class StyleController
{
    private layout: Layout;

    /**
     * Defines should you see content if it overflows parent size.
     * @default 'visible'
     */
    overflow: Overflow = OVERFLOW[0];

    /**
     * Defines main {@link Layout} behavior in terms of aligning and resizing.
     * @default 'inlineBlock'
     */
    display: Display = 'block';

    /**
     * Defines {@link Layout} corners radius.
     * @default 0
     */
    borderRadius = 0;

    /**
     * Defines {@link Layout} z index.
     * @default 1
     */
    zIndex = 1;

    /** Defines {@link Layout} max width. */
    maxWidth: FlexNumber;

    /** Defines {@link Layout} max height. */
    maxHeight: FlexNumber;

    /** Defines {@link Layout} min width. */
    minWidth: FlexNumber;

    /** Defines {@link Layout} min height. */
    minHeight: FlexNumber;

    /**
     * Defines {@link Layout} paddings. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     * @default 0
     */
    padding = 0;
    /**
     * Defines {@link Layout} top padding. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     * @default 0
     */
    paddingTop: number;
    /**
     * Defines {@link Layout} right padding. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     * @default 0
     */
    paddingRight: number;
    /**
     * Defines {@link Layout} bottom padding. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     * @default 0
     */
    paddingBottom: number;
    /**
     * Defines {@link Layout} left padding. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     * @default 0
     */
    paddingLeft: number;

    /**
     * Defines {@link Layout} margins.
     * @default 0
     */
    margin = 0;

    /**
     * Defines {@link Layout} top margin.
     * @default 0
     */
    marginTop = 0;

    /**
     * Defines {@link Layout} right margin.
     * @default 0
     */
    marginRight = 0;

    /**
     * Defines {@link Layout} bottom margin.
     * @default 0
     */
    marginBottom = 0;

    /**
     * Defines {@link Layout} left margin.
     * @default 0
     */
    marginLeft = 0;

    /**
     * Defines {@link Layout} scale.
     * @default 1
     */
    scale = 1;

    /**
     * Defines {@link Layout} scale x.
     * @default 1
     */

    scaleX = 1;

    /**
     * Defines {@link Layout} scale y.
     * @default 1
     */
    scaleY = 1;

    // TODO: add support for missing properties
    // border: string;
    // borderWidth: number;
    // borderColor: number;

    // alignContent?: AlignContent;
    // gap, row-gap, column-gap

    // controlled properties
    /**
     * Defines {@link Layout} width.
     * It is a flexible number, so you can use 'auto' to make it fit parent size,
     * or set it to 100% to make it fit parent size.
     * @default 'auto'
     */
    width: FlexNumber | 'auto' = 'auto';
    /**
     * Defines {@link Layout} height.
     * It is a flexible number, so you can use 'auto' to make it fit parent size,
     * or set it to 100% to make it fit parent size.
     * @default 'auto'
     */
    height: FlexNumber | 'auto' = 'auto';

    /** Defines {@link Layout} offset basing on it's own size. */
    anchor: GradeToOne;

    /** Defines {@link Layout} offset X basing on it's own size. */
    anchorX: GradeToOne;

    /** Defines {@link Layout} offset Y basing on it's own size. */
    anchorY: GradeToOne;

    /**
     * Defines {@link Layout} background.
     *
     * It is a flexible value, can be text color constant or hex number.
     * Also this can be a Container instance, so you can use any PIXI container as a background.
     * In case if you use Container instance, you can use it's children to create any background you want.
     *
     * If with is set to 'auto' or height is set to 'auto',
     * and background is a Container based element with width and height (Sprite, Graphics etc.),
     * layout size will bve set basing on background.
     * @default 'transparent'
     */
    private _background: FlexColor | Container = 'transparent';

    /**
     * Defines {@link Layout} text color.
     *
     * It is a flexible value, can be text color constant or hex number.
     * @default 'black'
     */
    private _color: FlexColor = 'black';

    // text properties
    /** Defines {@link Layout} text shadow color. It is a flexible value, can be text color constant or hex number. */
    private _dropShadowColor?: FlexColor;

    /** Defines {@link Layout} text stroke color. It is a flexible value, can be text color constant or hex number. */
    private _stroke?: FlexColor;

    // library additional properties
    /**
     * Defines {@link Layout} position.
     *
     * Can be used as analog of CSS position absolute property but with text constants.
     *
     * This is how you anc stick {@link Layout} to any sides of the parent.
     */
    position?: Position;

    /**
     * Defines {@link Layout} text vertical alignment.
     *
     * This is how you can align text inside {@link Layout} vertically.
     * @default 'top'
     */
    verticalAlign?: VerticalAlign = VERTICAL_ALIGN[0];

    /** Holds all text related styles. This is to be nested by children */
    textStyle: Partial<TextStyle> = {}; // this is to be nested by children

    /**
     * Manages and sets all the styles of {@link Layout}
     * @param layout - {@link Layout} to be styled
     * @param styles - styles to be applied
     */
    constructor(layout: Layout, styles: Styles)
    {
        this.layout = layout;
        this.setStyles(styles);
        this.setTextStyle(styles);
    }

    private setStyles(styles?: Styles)
    {
        this.overflow = styles?.overflow ?? OVERFLOW[0];
        this.display = styles?.display ?? 'block';
        this.borderRadius = styles?.borderRadius ?? 0;
        this.opacity = styles?.opacity ?? 1;

        this.maxWidth = styles?.maxWidth;
        this.maxHeight = styles?.maxHeight;

        this.minWidth = styles?.minWidth;
        this.minHeight = styles?.minHeight;

        this.zIndex = styles?.zIndex;

        // this.border = styles?.border;
        // this.borderWidth = styles?.borderWidth;
        // this.borderColor = styles?.borderColor;

        this.padding = styles?.padding ?? 0;
        this.paddingTop = styles?.paddingTop ?? styles?.padding ?? 0;
        this.paddingLeft = styles?.paddingLeft ?? styles?.padding ?? 0;
        this.paddingBottom = styles?.paddingBottom ?? styles?.padding ?? 0;
        this.paddingRight = styles?.paddingRight ?? styles?.padding ?? 0;

        this.margin = styles?.margin ?? 0;
        this.marginTop = styles?.marginTop ?? styles?.margin ?? 0;
        this.marginLeft = styles?.marginLeft ?? styles?.margin ?? 0;
        this.marginBottom = styles?.marginBottom ?? styles?.margin ?? 0;
        this.marginRight = styles?.marginRight ?? styles?.margin ?? 0;

        this.scale = styles?.scale ?? 1;
        this.scaleX = styles?.scaleX ?? styles?.scale ?? 1;
        this.scaleY = styles?.scaleY ?? styles?.scale ?? 1;

        this.color = styles?.color ?? 'black';
        this.dropShadowColor = styles?.dropShadowColor ?? 'black';
        this.stroke = styles?.stroke ?? 'black';
        this.background = styles?.background ?? styles?.backgroundColor;

        this.width = styles?.width ?? 'auto';
        this.height = styles?.height ?? 'auto';

        this.position = styles?.position;
        this.verticalAlign = styles?.verticalAlign ?? VERTICAL_ALIGN[0];

        if (styles?.anchorX !== undefined)
        {
            this.anchorX = styles.anchorX;
        }
        else if (styles?.anchor !== undefined)
        {
            if (typeof styles.anchor === 'number')
            {
                this.anchorX = styles.anchor;
            }
            else if (Array.isArray(styles.anchor))
            {
                this.anchorX = styles.anchor[0];
            }
        }

        if (styles?.anchorY !== undefined)
        {
            this.anchorY = styles.anchorY;
        }
        else if (styles?.anchor !== undefined)
        {
            if (typeof styles.anchor === 'number')
            {
                this.anchorY = styles.anchor;
            }
            else if (Array.isArray(styles.anchor))
            {
                this.anchorY = styles.anchor[1];
            }
        }
    }

    private setTextStyle(styles: Styles)
    {
        this.textStyle = {
            align: styles?.textAlign ?? ALIGN[1],
            breakWords: styles?.breakWords ?? true,
            dropShadow: styles?.dropShadow ?? false,
            dropShadowAlpha: styles?.dropShadowAlpha ?? 1,
            dropShadowAngle: styles?.dropShadowAngle ?? Math.PI / 6,
            dropShadowBlur: styles?.dropShadowBlur ?? 0,
            dropShadowColor: styles?.dropShadowColor ?? 'black',
            dropShadowDistance: styles?.dropShadowDistance ?? 5,
            fill: styles?.fill ?? getColor(styles?.color)?.hex ?? 'black',
            fillGradientType: styles?.fillGradientType ?? TEXT_GRADIENT.LINEAR_VERTICAL,
            fillGradientStops: styles?.fillGradientStops ?? [],
            fontFamily: styles?.fontFamily ?? 'Arial',
            fontSize: styles?.fontSize ?? 26,
            fontStyle: styles?.fontStyle ?? 'normal',
            fontVariant: styles?.fontVariant ?? 'normal',
            fontWeight: styles?.fontWeight ?? 'normal',
            letterSpacing: styles?.letterSpacing ?? 0,
            lineHeight: styles?.lineHeight ?? 0,
            lineJoin: styles?.lineJoin ?? 'miter',
            miterLimit: styles?.miterLimit ?? 10,
            // padding: styles?.padding ?? 0,
            stroke: styles?.stroke ?? 'black',
            strokeThickness: styles?.strokeThickness ?? 0,
            textBaseline: styles?.textBaseline ?? 'alphabetic',
            trim: styles?.trim ?? false,
            whiteSpace: styles?.whiteSpace ?? 'pre',
            wordWrap: styles?.wordWrap ?? true,
            wordWrapWidth: styles?.wordWrapWidth ?? 100,
            leading: styles?.leading ?? 0,
        };
    }

    /** Set alpha. */
    set opacity(value: GradeToOne)
    {
        this.layout.alpha = value;
    }

    /** Get alpha. */
    get opacity(): GradeToOne
    {
        return this.layout.alpha as GradeToOne;
    }

    /** Set text color. */
    set color(value: FlexColor)
    {
        this._color = value;
        this.textStyle.fill = getColor(value)?.hex;
    }

    /** Get text color. */
    get color(): FlexColor
    {
        return this._color;
    }

    /** Set background color. */
    set background(value: FlexColor | Container)
    {
        this._background = value;
    }

    /** Get background color. */
    get background(): FlexColor | Container
    {
        return this._background;
    }

    /** Set fontSize. */
    set fontSize(value: number | string)
    {
        this.textStyle.fontSize = value;
    }

    /** Get fontSize. */
    get fontSize(): FlexColor
    {
        return this.textStyle.fontSize;
    }

    /** Set textAlign. */
    set textAlign(value: TextStyleAlign)
    {
        this.textStyle.align = value;
    }

    /** Get textAlign. */
    get textAlign(): TextStyleAlign
    {
        return this.textStyle.align;
    }

    /** Set text breakWords. */
    set breakWords(value: boolean)
    {
        this.textStyle.breakWords = value;
    }

    /** Get text breakWords. */
    get breakWords(): boolean
    {
        return this.textStyle.breakWords;
    }

    /** Set text dropShadow. */
    set dropShadow(value: boolean)
    {
        this.textStyle.dropShadow = value;
    }

    /** Get text dropShadow. */
    get dropShadow(): boolean
    {
        return this.textStyle.dropShadow;
    }

    /** Set text dropShadowAlpha. */
    set dropShadowAlpha(value: number)
    {
        this.textStyle.dropShadowAlpha = value;
    }

    /** Get text dropShadowAlpha. */
    get dropShadowAlpha(): number
    {
        return this.textStyle.dropShadowAlpha;
    }

    /** Set text dropShadowAngle. */
    set dropShadowAngle(value: number)
    {
        this.textStyle.dropShadowAngle = value;
    }

    /** Get text dropShadowAngle. */
    get dropShadowAngle(): number
    {
        return this.textStyle.dropShadowAngle;
    }

    /** Set text dropShadowBlur. */
    set dropShadowBlur(value: number)
    {
        this.textStyle.dropShadowBlur = value;
    }

    /** Get text dropShadowBlur. */
    get dropShadowBlur(): number
    {
        return this.textStyle.dropShadowBlur;
    }

    /** Set text dropShadowColor. */
    set dropShadowColor(value: FlexColor)
    {
        this._dropShadowColor = value;
        this.textStyle.dropShadowColor = getColor(value)?.hex;
    }

    /** Get text dropShadowColor. */
    get dropShadowColor(): FlexColor
    {
        return this._dropShadowColor;
    }

    /** Set text dropShadowDistance. */
    set dropShadowDistance(value: number)
    {
        this.textStyle.dropShadowDistance = value;
    }

    /** Get text dropShadowDistance. */
    get dropShadowDistance(): number
    {
        return this.textStyle.dropShadowDistance;
    }

    /** Set text fillGradientType. */
    set fillGradientType(value: TEXT_GRADIENT)
    {
        this.textStyle.fillGradientType = value;
    }

    /** Get text fillGradientType. */
    get fillGradientType(): TEXT_GRADIENT
    {
        return this.textStyle.fillGradientType;
    }

    /** Set text fillGradientStops. */
    set fillGradientStops(value: number[])
    {
        this.textStyle.fillGradientStops = value;
    }

    /** Get text fillGradientStops. */
    get fillGradientStops(): number[]
    {
        return this.textStyle.fillGradientStops;
    }

    /** Set text fontFamily. */
    set fontFamily(value: string | string[])
    {
        this.textStyle.fontFamily = value;
    }

    /** Get text fontFamily. */
    get fontFamily(): string | string[]
    {
        return this.textStyle.fontFamily;
    }

    /** Set text fontStyle. */
    set fontStyle(value: TextStyleFontStyle)
    {
        this.textStyle.fontStyle = value;
    }

    /** Get text fontStyle. */
    get fontStyle(): TextStyleFontStyle
    {
        return this.textStyle.fontStyle;
    }

    /** Set text fontVariant. */
    set fontVariant(value: TextStyleFontVariant)
    {
        this.textStyle.fontVariant = value;
    }

    /** Get text fontVariant. */
    get fontVariant(): TextStyleFontVariant
    {
        return this.textStyle.fontVariant;
    }

    /** Set text fontWeight. */
    set fontWeight(value: TextStyleFontWeight)
    {
        this.textStyle.fontWeight = value;
    }

    /** Get text fontWeight. */
    get fontWeight(): TextStyleFontWeight
    {
        return this.textStyle.fontWeight;
    }

    /** Set text letterSpacing. */
    set letterSpacing(value: number)
    {
        this.textStyle.letterSpacing = value;
    }

    /** Get text letterSpacing. */
    get letterSpacing(): number
    {
        return this.textStyle.letterSpacing;
    }

    /** Set text lineHeight. */
    set lineHeight(value: number)
    {
        this.textStyle.lineHeight = value;
    }

    /** Get text lineHeight. */
    get lineHeight(): number
    {
        return this.textStyle.lineHeight;
    }

    /** Set text lineJoin. */
    set lineJoin(value: TextStyleLineJoin)
    {
        this.textStyle.lineJoin = value;
    }

    /** Get text lineJoin. */
    get lineJoin(): TextStyleLineJoin
    {
        return this.textStyle.lineJoin;
    }

    /** Set text miterLimit. */
    set miterLimit(value: number)
    {
        this.textStyle.miterLimit = value;
    }

    /** Get text miterLimit. */
    get miterLimit(): number
    {
        return this.textStyle.miterLimit;
    }

    /** Set text stroke. */
    set stroke(value: FlexColor)
    {
        this._stroke = value;
        this.textStyle.stroke = getColor(value)?.hex;
    }

    /** Get text stroke. */
    get stroke(): FlexColor
    {
        return this._stroke;
    }

    /** Set text strokeThickness. */
    set strokeThickness(value: number)
    {
        this.textStyle.strokeThickness = value;
    }

    /** Get text strokeThickness. */
    get strokeThickness(): number
    {
        return this.textStyle.strokeThickness;
    }

    /** Set text textBaseline. */
    set textBaseline(value: TextStyleTextBaseline)
    {
        this.textStyle.textBaseline = value;
    }

    /** Get text textBaseline. */
    get textBaseline(): TextStyleTextBaseline
    {
        return this.textStyle.textBaseline;
    }

    /** Set text trim. */
    set trim(value: boolean)
    {
        this.textStyle.trim = value;
    }

    /** Get text trim. */
    get trim(): boolean
    {
        return this.textStyle.trim;
    }

    /** Set text whiteSpace. */
    set whiteSpace(value: TextStyleWhiteSpace)
    {
        this.textStyle.whiteSpace = value;
    }

    /** Get text whiteSpace. */
    get whiteSpace(): TextStyleWhiteSpace
    {
        return this.textStyle.whiteSpace;
    }

    /** Set text wordWrap. */
    set wordWrap(value: boolean)
    {
        this.textStyle.wordWrap = value;
    }

    /** Get text wordWrap. */
    get wordWrap(): boolean
    {
        return this.textStyle.wordWrap;
    }

    /** Set text wordWrapWidth. */
    set wordWrapWidth(value: number)
    {
        this.textStyle.wordWrapWidth = value;
    }

    /** Get text wordWrapWidth. */
    get wordWrapWidth(): number
    {
        return this.textStyle.wordWrapWidth;
    }

    /** Set text leading. */
    set leading(value: number)
    {
        this.textStyle.leading = value;
    }

    /** Get text leading. */
    get leading(): number
    {
        return this.textStyle.leading;
    }
}
