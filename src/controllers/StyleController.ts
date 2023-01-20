import type {
	Display,
	FlexColor,
	FlexNumber,
	Opacity,
	Overflow,
	Position,
	Styles,
	TextStyles,
} from '../utils/types';
import type {
	TextStyleAlign,
	TextStyleFontStyle,
	TextStyleFontVariant,
	TextStyleFontWeight,
	TextStyleLineJoin,
	TextStyleTextBaseline,
	TextStyleWhiteSpace,
} from 'pixi.js';
import { getColor } from '../utils/helpers';
import { TEXT_GRADIENT } from 'pixi.js';
import { OVERFLOW, ALIGN, POSITION } from '../utils/constants';
import { Layout } from '../Layout';

export class StyleController {
	private layout: Layout;

	overflow: Overflow = OVERFLOW[0];
	display: Display = 'block';
	borderRadius: number = 0;
	// zIndex: number;
	// maxWidth: number;
	// maxHeight: number;
	// border: string;
	// borderWidth: number;
	// borderColor: number;
	margin: number = 0;
	// marginTop: number;
	// marginRight: number;
	// marginBottom: number;
	// marginLeft: number;
	padding: number = 0;
	// paddingTop: number;
	// paddingRight: number;
	// paddingBottom: number;
	// paddingLeft: number;

	// controlled properties
	width: FlexNumber;
	height: FlexNumber;

	_background: FlexColor = 'transparent';
	_color: FlexColor = 'black';

	// text properties
	_dropShadowColor?: FlexColor;
	_stroke?: FlexColor;

	// library additional properties
	position?: Position = POSITION[1];

	textStyles: TextStyles = {}; // this is to be nested by children

	constructor(layout: Layout, styles: Styles) {
		this.layout = layout;
		this.setStyles(styles);
		this.setTextStyles(styles);
	}

	private setStyles(styles: Styles) {
		this.overflow = styles.overflow ?? OVERFLOW[0];
		this.display = styles.display ?? 'block';
		this.borderRadius = styles.borderRadius ?? 0;
		this.opacity = styles.opacity ?? 1;
		// this.zIndex = styles.zIndex;
		// this.maxWidth = styles.maxWidth;
		// this.maxHeight = styles.maxHeight;
		// this.border = styles.border;
		// this.borderWidth = styles.borderWidth;
		// this.borderColor = styles.borderColor;
		this.margin = styles.margin ?? 0;
		// this.marginTop = styles.marginTop;
		// this.marginRight = styles.marginRight;
		// this.marginBottom = styles.marginBottom;
		// this.marginLeft = styles.marginLeft;
		this.padding = styles.padding ?? 0;
		// this.paddingTop = styles.paddingTop;
		// this.paddingRight = styles.paddingRight;
		// this.paddingBottom = styles.paddingBottom;
		// this.paddingLeft = styles.paddingLeft;

		this.color = styles.color ?? 'black';
		this.dropShadowColor = styles.dropShadowColor ?? 'black';
		this.stroke = styles.stroke ?? 'black';
		this.background = styles.background ?? styles.backgroundColor;

		styles.width && (this.width = styles.width);
		styles.height && (this.height = styles.height);

		this.position = styles.position ?? POSITION[1];
	}

	private setTextStyles(styles: Styles) {
		this.textStyles = {
			align: styles.textAlign ?? ALIGN[0],
			breakWords: styles.breakWords ?? true,
			dropShadow: styles.dropShadow ?? false,
			dropShadowAlpha: styles.dropShadowAlpha ?? 1,
			dropShadowAngle: styles.dropShadowAngle ?? Math.PI / 6,
			dropShadowBlur: styles.dropShadowBlur ?? 0,
			dropShadowColor: styles.dropShadowColor ?? 'black',
			dropShadowDistance: styles.dropShadowDistance ?? 5,
			fill: styles.fill ?? getColor(styles.color)?.hex ?? 'black',
			fillGradientType:
				styles.fillGradientType ?? TEXT_GRADIENT.LINEAR_VERTICAL,
			fillGradientStops: styles.fillGradientStops ?? [],
			fontFamily: styles.fontFamily ?? 'Arial',
			fontSize: styles.fontSize ?? 26,
			fontStyle: styles.fontStyle ?? 'normal',
			fontVariant: styles.fontVariant ?? 'normal',
			fontWeight: styles.fontWeight ?? 'normal',
			letterSpacing: styles.letterSpacing ?? 0,
			lineHeight: styles.lineHeight ?? 0,
			lineJoin: styles.lineJoin ?? 'miter',
			miterLimit: styles.miterLimit ?? 10,
			// padding: styles.padding ?? 0,
			stroke: styles.stroke ?? 'black',
			strokeThickness: styles.strokeThickness ?? 0,
			textBaseline: styles.textBaseline ?? 'alphabetic',
			trim: styles.trim ?? false,
			whiteSpace: styles.whiteSpace ?? 'pre',
			wordWrap: styles.wordWrap ?? true,
			wordWrapWidth: styles.wordWrapWidth ?? 100,
			leading: styles.leading ?? 0,
		};
	}

	set opacity(value: Opacity) {
		this.layout.alpha = value;
	}

	get opacity(): Opacity {
		return this.layout.alpha as Opacity;
	}

	set color(value: FlexColor) {
		this._color = value;
		this.textStyles.fill = getColor(value)?.hex;
	}

	get color(): FlexColor {
		return this._color;
	}

	set background(value: FlexColor) {
		this._background = value;
	}

	get background(): FlexColor {
		return this._background;
	}

	set fontSize(value: number | string) {
		this.textStyles.fontSize = value;
	}

	get fontSize(): FlexColor {
		return this.textStyles.fontSize;
	}

	set textAlign(value: TextStyleAlign) {
		this.textStyles.align = value;
	}

	get textAlign(): TextStyleAlign {
		return this.textStyles.align;
	}

	set breakWords(value: boolean) {
		this.textStyles.breakWords = value;
	}

	get breakWords(): boolean {
		return this.textStyles.breakWords;
	}

	set dropShadow(value: boolean) {
		this.textStyles.dropShadow = value;
	}

	get dropShadow(): boolean {
		return this.textStyles.dropShadow;
	}

	set dropShadowAlpha(value: number) {
		this.textStyles.dropShadowAlpha = value;
	}

	get dropShadowAlpha(): number {
		return this.textStyles.dropShadowAlpha;
	}

	set dropShadowAngle(value: number) {
		this.textStyles.dropShadowAngle = value;
	}

	get dropShadowAngle(): number {
		return this.textStyles.dropShadowAngle;
	}

	set dropShadowBlur(value: number) {
		this.textStyles.dropShadowBlur = value;
	}

	get dropShadowBlur(): number {
		return this.textStyles.dropShadowBlur;
	}

	set dropShadowColor(value: FlexColor) {
		this._dropShadowColor = value;
		this.textStyles.dropShadowColor = getColor(value)?.hex;
	}

	get dropShadowColor(): FlexColor {
		return this._dropShadowColor;
	}

	set dropShadowDistance(value: number) {
		this.textStyles.dropShadowDistance = value;
	}

	get dropShadowDistance(): number {
		return this.textStyles.dropShadowDistance;
	}

	set fillGradientType(value: TEXT_GRADIENT) {
		this.textStyles.fillGradientType = value;
	}

	get fillGradientType(): TEXT_GRADIENT {
		return this.textStyles.fillGradientType;
	}

	set fillGradientStops(value: number[]) {
		this.textStyles.fillGradientStops = value;
	}

	get fillGradientStops(): number[] {
		return this.textStyles.fillGradientStops;
	}

	set fontFamily(value: string | string[]) {
		this.textStyles.fontFamily = value;
	}

	get fontFamily(): string | string[] {
		return this.textStyles.fontFamily;
	}

	set fontStyle(value: TextStyleFontStyle) {
		this.textStyles.fontStyle = value;
	}

	get fontStyle(): TextStyleFontStyle {
		return this.textStyles.fontStyle;
	}

	set fontVariant(value: TextStyleFontVariant) {
		this.textStyles.fontVariant = value;
	}

	get fontVariant(): TextStyleFontVariant {
		return this.textStyles.fontVariant;
	}

	set fontWeight(value: TextStyleFontWeight) {
		this.textStyles.fontWeight = value;
	}

	get fontWeight(): TextStyleFontWeight {
		return this.textStyles.fontWeight;
	}

	set letterSpacing(value: number) {
		this.textStyles.letterSpacing = value;
	}

	get letterSpacing(): number {
		return this.textStyles.letterSpacing;
	}

	set lineHeight(value: number) {
		this.textStyles.lineHeight = value;
	}

	get lineHeight(): number {
		return this.textStyles.lineHeight;
	}

	set lineJoin(value: TextStyleLineJoin) {
		this.textStyles.lineJoin = value;
	}

	get lineJoin(): TextStyleLineJoin {
		return this.textStyles.lineJoin;
	}

	set miterLimit(value: number) {
		this.textStyles.miterLimit = value;
	}

	get miterLimit(): number {
		return this.textStyles.miterLimit;
	}

	set stroke(value: FlexColor) {
		this._stroke = value;
		this.textStyles.stroke = getColor(value)?.hex;
	}

	get stroke(): FlexColor {
		return this._stroke;
	}

	set strokeThickness(value: number) {
		this.textStyles.strokeThickness = value;
	}

	get strokeThickness(): number {
		return this.textStyles.strokeThickness;
	}

	set textBaseline(value: TextStyleTextBaseline) {
		this.textStyles.textBaseline = value;
	}

	get textBaseline(): TextStyleTextBaseline {
		return this.textStyles.textBaseline;
	}

	set trim(value: boolean) {
		this.textStyles.trim = value;
	}

	get trim(): boolean {
		return this.textStyles.trim;
	}

	set whiteSpace(value: TextStyleWhiteSpace) {
		this.textStyles.whiteSpace = value;
	}

	get whiteSpace(): TextStyleWhiteSpace {
		return this.textStyles.whiteSpace;
	}

	set wordWrap(value: boolean) {
		this.textStyles.wordWrap = value;
	}

	get wordWrap(): boolean {
		return this.textStyles.wordWrap;
	}

	set wordWrapWidth(value: number) {
		this.textStyles.wordWrapWidth = value;
	}

	get wordWrapWidth(): number {
		return this.textStyles.wordWrapWidth;
	}

	set leading(value: number) {
		this.textStyles.leading = value;
	}

	get leading(): number {
		return this.textStyles.leading;
	}
}
