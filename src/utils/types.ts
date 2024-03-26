import type {
    TilingSprite,
    NineSliceSprite,
    TextStyle,
    TextStyleAlign,
} from "pixi.js";
import type { Container } from "pixi.js";
import {
    CSS_COLOR_NAMES,
    POSITION,
    DISPLAY,
    OVERFLOW,
    VERTICAL_ALIGN,
    BACKGROUND_SIZE,
} from "./constants";
import type { Layout } from "../Layout";

export type GradeToOne =
    | 0
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1;

export type FlexNumber = number | string;
export type FlexColor = FlexNumber | CSSColor;
export type Color = {
    hex: number;
    opacity: number;
};

export type CSSColor = keyof typeof CSS_COLOR_NAMES;

export type Position = (typeof POSITION)[number];
export type Display = (typeof DISPLAY)[number];

export type ContentList = { [ID: string]: Content };
export type Content =
    | string
    | Container
    | Layout
    | LayoutOptions
    | Content[]
    | ContentList;

export type Containers = Container[];
export type Overflow = (typeof OVERFLOW)[number];

export type AspectRatio = "static" | "flex";

export type ConditionalStyles = {
    portrait?: Styles;
    landscape?: Styles;
};

export type BackgroundSize = (typeof BACKGROUND_SIZE)[number];

export type Styles = Partial<TextStyle> & {
    background?:
        | FlexColor
        | Container
        | string
        | NineSliceSprite
        | TilingSprite;
    backgroundColor?: FlexColor;
    backgroundSize?: BackgroundSize;
    color?: FlexColor;
    width?: FlexNumber | "auto";
    height?: FlexNumber | "auto";
    padding?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    margin?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    opacity?: GradeToOne;
    overflow?: Overflow; // TODO: scroll pixi-ui scrollBox can be used here & 'scale' to fit children when overflow
    position?: Position;
    display?: Display;
    borderRadius?: number;
    textAlign?: TextStyleAlign;
    verticalAlign?: VerticalAlign;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    maxWidth?: FlexNumber;
    maxHeight?: FlexNumber;
    minWidth?: FlexNumber;
    minHeight?: FlexNumber;
    zIndex?: number;
    anchor?: GradeToOne;
    anchorX?: GradeToOne;
    anchorY?: GradeToOne;
    aspectRatio?: AspectRatio;
    wordWrap?: boolean;
    visible?: boolean;
};

export type LayoutStyles = {
    [K: string]: Styles & ConditionalStyles;
};

export type LayoutOptions = {
    id?: string;
    content?: Content;
    styles?: Styles & ConditionalStyles;
    globalStyles?: LayoutStyles;
};

export type VerticalAlign = (typeof VERTICAL_ALIGN)[number];

export type SizeControl =
    | "innerText"
    | "background"
    | "parentSize"
    | "contentSize"
    | "static";

export type ContentType =
    | "layout"
    | "text"
    | "string"
    | "container"
    | "array"
    | "unknown"
    | "layoutConfig"
    | "object";
