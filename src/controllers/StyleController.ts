import type {
    Display,
    FlexColor,
    FlexNumber,
    Opacity,
    Overflow,
    Position,
    Styles,
    TextStyles,
    VerticalAlign
} from '../utils/types';
import type {
    TextStyleAlign,
    TextStyleFontStyle,
    TextStyleFontVariant,
    TextStyleFontWeight,
    TextStyleLineJoin,
    TextStyleTextBaseline,
    TextStyleWhiteSpace
} from '@pixi/text';
import { TEXT_GRADIENT } from '@pixi/text';
import { getColor } from '../utils/helpers';
import { OVERFLOW, ALIGN, POSITION, VERTICAL_ALIGN } from '../utils/constants';
import { Layout } from '../Layout';
/** Style controller manages {@link Layout} styles. Here you can find all available styles and their default values. */
export class StyleController
{
    private layout: Layout;

    /** Defines should you see content if it overflows parent size. */
    overflow: Overflow = OVERFLOW[0];

    /** Defines main {@link Layout} behavior in terms of aligning and resizing. */
    display: Display = 'block';

    /** Defines {@link Layout} corners radius. */
    borderRadius = 0;

    // zIndex: number;
    // maxWidth: number;
    // maxHeight: number;
    // border: string;
    // borderWidth: number;
    // borderColor: number;

    // margin = 0;
    // marginTop: number;
    // marginRight: number;
    // marginBottom: number;
    // marginLeft: number;

    /**
     * Defines {@link Layout} paddings. This will also impact inner elements size.
     * 100% of parent size is parentSize - padding * 2.
     */
    padding = 0;
    // paddingTop: number;
    // paddingRight: number;
    // paddingBottom: number;
    // paddingLeft: number;

    // alignContent?: AlignContent;
    // gap, row-gap, column-gap

    // controlled properties
    /**
     * Defines {@link Layout} width.
     * It is a flexible number, so you can use 'auto' to make it fit parent size,
     * or set it to 100% to make it fit parent size.
     */
    width: FlexNumber | 'auto';
    /**
     * Defines {@link Layout} height.
     * It is a flexible number, so you can use 'auto' to make it fit parent size,
     * or set it to 100% to make it fit parent size.
     */
    height: FlexNumber | 'auto';

    /**
     * Defines {@link Layout} background color.
     *
     * It is a flexible value, can be text color constant or hex number.
     * @default transparent
     */
    private _background: FlexColor = 'transparent';

    /**
     * Defines {@link Layout} text color.
     *
     * It is a flexible value, can be text color constant or hex number.
     * @default black
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
     *  @default 'left'
     */
    position?: Position = POSITION[1];

    /**
     * Defines {@link Layout} text vertical alignment.
     *
     * This is how you can align text inside {@link Layout} vertically.
     * @default 'top'
     */
    verticalAlign?: VerticalAlign = VERTICAL_ALIGN[0];

    /** Holds all text related styles.. This is to be nested by children */
    textStyles: TextStyles = {}; // this is to be nested by children

    /**
     * Manages and sets all the styles of {@link Layout}
     * @param layout - {@link Layout} to be styled
     * @param styles - styles to be applied
     */
    constructor(layout: Layout, styles: Styles)
    {
        this.layout = layout;
        this.setStyles(styles);
        this.setTextStyles(styles);
    }

    private setStyles(styles?: Styles)
    {
        this.overflow = styles?.overflow ?? OVERFLOW[0];
        this.display = styles?.display ?? 'block';
        this.borderRadius = styles?.borderRadius ?? 0;
        this.opacity = styles?.opacity ?? 1;
        // this.zIndex = styles?.zIndex;
        // this.maxWidth = styles?.maxWidth;
        // this.maxHeight = styles?.maxHeight;
        // this.border = styles?.border;
        // this.borderWidth = styles?.borderWidth;
        // this.borderColor = styles?.borderColor;
        // this.margin = styles?.margin ?? 0;
        // this.marginTop = styles?.marginTop;
        // this.marginRight = styles?.marginRight;
        // this.marginBottom = styles?.marginBottom;
        // this.marginLeft = styles?.marginLeft;
        this.padding = styles?.padding ?? 0;
        // this.paddingTop = styles?.paddingTop;
        // this.paddingRight = styles?.paddingRight;
        // this.paddingBottom = styles?.paddingBottom;
        // this.paddingLeft = styles?.paddingLeft;

        this.color = styles?.color ?? 'black';
        this.dropShadowColor = styles?.dropShadowColor ?? 'black';
        this.stroke = styles?.stroke ?? 'black';
        this.background = styles?.background ?? styles?.backgroundColor;

        this.width = styles?.width ?? 'auto';
        this.height = styles?.height ?? 'auto';

        this.position = styles?.position ?? POSITION[1];
        this.verticalAlign = styles?.verticalAlign ?? VERTICAL_ALIGN[0];
    }

    private setTextStyles(styles: Styles)
    {
        this.textStyles = {
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
            leading: styles?.leading ?? 0
        };
    }

    /** Set alpha. */
    set opacity(value: Opacity)
    {
        this.layout.alpha = value;
    }

    /** Get alpha. */
    get opacity(): Opacity
    {
        return this.layout.alpha as Opacity;
    }

    /** Set text color. */
    set color(value: FlexColor)
    {
        this._color = value;
        this.textStyles.fill = getColor(value)?.hex;
    }

    /** Get text color. */
    get color(): FlexColor
    {
        return this._color;
    }

    /** Set background color. */
    set background(value: FlexColor)
    {
        this._background = value;
    }

    /** Get background color. */
    get background(): FlexColor
    {
        return this._background;
    }

    /** Set fontSize. */
    set fontSize(value: number | string)
    {
        this.textStyles.fontSize = value;
    }

    /** Get fontSize. */
    get fontSize(): FlexColor
    {
        return this.textStyles.fontSize;
    }

    /** Set textAlign. */
    set textAlign(value: TextStyleAlign)
    {
        this.textStyles.align = value;
    }

    /** Get textAlign. */
    get textAlign(): TextStyleAlign
    {
        return this.textStyles.align;
    }

    /** Set text breakWords. */
    set breakWords(value: boolean)
    {
        this.textStyles.breakWords = value;
    }

    /** Get text breakWords. */
    get breakWords(): boolean
    {
        return this.textStyles.breakWords;
    }

    /** Set text dropShadow. */
    set dropShadow(value: boolean)
    {
        this.textStyles.dropShadow = value;
    }

    /** Get text dropShadow. */
    get dropShadow(): boolean
    {
        return this.textStyles.dropShadow;
    }

    /** Set text dropShadowAlpha. */
    set dropShadowAlpha(value: number)
    {
        this.textStyles.dropShadowAlpha = value;
    }

    /** Get text dropShadowAlpha. */
    get dropShadowAlpha(): number
    {
        return this.textStyles.dropShadowAlpha;
    }

    /** Set text dropShadowAngle. */
    set dropShadowAngle(value: number)
    {
        this.textStyles.dropShadowAngle = value;
    }

    /** Get text dropShadowAngle. */
    get dropShadowAngle(): number
    {
        return this.textStyles.dropShadowAngle;
    }

    /** Set text dropShadowBlur. */
    set dropShadowBlur(value: number)
    {
        this.textStyles.dropShadowBlur = value;
    }

    /** Get text dropShadowBlur. */
    get dropShadowBlur(): number
    {
        return this.textStyles.dropShadowBlur;
    }

    /** Set text dropShadowColor. */
    set dropShadowColor(value: FlexColor)
    {
        this._dropShadowColor = value;
        this.textStyles.dropShadowColor = getColor(value)?.hex;
    }

    /** Get text dropShadowColor. */
    get dropShadowColor(): FlexColor
    {
        return this._dropShadowColor;
    }

    /** Set text dropShadowDistance. */
    set dropShadowDistance(value: number)
    {
        this.textStyles.dropShadowDistance = value;
    }

    /** Get text dropShadowDistance. */
    get dropShadowDistance(): number
    {
        return this.textStyles.dropShadowDistance;
    }

    /** Set text fillGradientType. */
    set fillGradientType(value: TEXT_GRADIENT)
    {
        this.textStyles.fillGradientType = value;
    }

    /** Get text fillGradientType. */
    get fillGradientType(): TEXT_GRADIENT
    {
        return this.textStyles.fillGradientType;
    }

    /** Set text fillGradientStops. */
    set fillGradientStops(value: number[])
    {
        this.textStyles.fillGradientStops = value;
    }

    /** Get text fillGradientStops. */
    get fillGradientStops(): number[]
    {
        return this.textStyles.fillGradientStops;
    }

    /** Set text fontFamily. */
    set fontFamily(value: string | string[])
    {
        this.textStyles.fontFamily = value;
    }

    /** Get text fontFamily. */
    get fontFamily(): string | string[]
    {
        return this.textStyles.fontFamily;
    }

    /** Set text fontStyle. */
    set fontStyle(value: TextStyleFontStyle)
    {
        this.textStyles.fontStyle = value;
    }

    /** Get text fontStyle. */
    get fontStyle(): TextStyleFontStyle
    {
        return this.textStyles.fontStyle;
    }

    /** Set text fontVariant. */
    set fontVariant(value: TextStyleFontVariant)
    {
        this.textStyles.fontVariant = value;
    }

    /** Get text fontVariant. */
    get fontVariant(): TextStyleFontVariant
    {
        return this.textStyles.fontVariant;
    }

    /** Set text fontWeight. */
    set fontWeight(value: TextStyleFontWeight)
    {
        this.textStyles.fontWeight = value;
    }

    /** Get text fontWeight. */
    get fontWeight(): TextStyleFontWeight
    {
        return this.textStyles.fontWeight;
    }

    /** Set text letterSpacing. */
    set letterSpacing(value: number)
    {
        this.textStyles.letterSpacing = value;
    }

    /** Get text letterSpacing. */
    get letterSpacing(): number
    {
        return this.textStyles.letterSpacing;
    }

    /** Set text lineHeight. */
    set lineHeight(value: number)
    {
        this.textStyles.lineHeight = value;
    }

    /** Get text lineHeight. */
    get lineHeight(): number
    {
        return this.textStyles.lineHeight;
    }

    /** Set text lineJoin. */
    set lineJoin(value: TextStyleLineJoin)
    {
        this.textStyles.lineJoin = value;
    }

    /** Get text lineJoin. */
    get lineJoin(): TextStyleLineJoin
    {
        return this.textStyles.lineJoin;
    }

    /** Set text miterLimit. */
    set miterLimit(value: number)
    {
        this.textStyles.miterLimit = value;
    }

    /** Get text miterLimit. */
    get miterLimit(): number
    {
        return this.textStyles.miterLimit;
    }

    /** Set text stroke. */
    set stroke(value: FlexColor)
    {
        this._stroke = value;
        this.textStyles.stroke = getColor(value)?.hex;
    }

    /** Get text stroke. */
    get stroke(): FlexColor
    {
        return this._stroke;
    }

    /** Set text strokeThickness. */
    set strokeThickness(value: number)
    {
        this.textStyles.strokeThickness = value;
    }

    /** Get text strokeThickness. */
    get strokeThickness(): number
    {
        return this.textStyles.strokeThickness;
    }

    /** Set text textBaseline. */
    set textBaseline(value: TextStyleTextBaseline)
    {
        this.textStyles.textBaseline = value;
    }

    /** Get text textBaseline. */
    get textBaseline(): TextStyleTextBaseline
    {
        return this.textStyles.textBaseline;
    }

    /** Set text trim. */
    set trim(value: boolean)
    {
        this.textStyles.trim = value;
    }

    /** Get text trim. */
    get trim(): boolean
    {
        return this.textStyles.trim;
    }

    /** Set text whiteSpace. */
    set whiteSpace(value: TextStyleWhiteSpace)
    {
        this.textStyles.whiteSpace = value;
    }

    /** Get text whiteSpace. */
    get whiteSpace(): TextStyleWhiteSpace
    {
        return this.textStyles.whiteSpace;
    }

    /** Set text wordWrap. */
    set wordWrap(value: boolean)
    {
        this.textStyles.wordWrap = value;
    }

    /** Get text wordWrap. */
    get wordWrap(): boolean
    {
        return this.textStyles.wordWrap;
    }

    /** Set text wordWrapWidth. */
    set wordWrapWidth(value: number)
    {
        this.textStyles.wordWrapWidth = value;
    }

    /** Get text wordWrapWidth. */
    get wordWrapWidth(): number
    {
        return this.textStyles.wordWrapWidth;
    }

    /** Set text leading. */
    set leading(value: number)
    {
        this.textStyles.leading = value;
    }

    /** Get text leading. */
    get leading(): number
    {
        return this.textStyles.leading;
    }
}
