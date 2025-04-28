import {
    Align,
    BoxSizing,
    Direction,
    Display,
    Edge,
    FlexDirection,
    Gutter,
    Justify,
    type Node as YogaNode,
    Overflow,
    PositionType,
    Wrap,
} from 'yoga-layout/load';
import { type AlignContent, type AlignItems, type JustifyContent, type YogaStyles } from './yogaStyles';

const ALIGN_CONTENT_MAP: Record<AlignContent, Align> = {
    'flex-start': Align.FlexStart,
    'flex-end': Align.FlexEnd,
    center: Align.Center,
    stretch: Align.Stretch,
    'space-between': Align.SpaceBetween,
    'space-around': Align.SpaceAround,
    'space-evenly': Align.SpaceEvenly,
} as const;

const ALIGN_ITEMS_MAP: Record<AlignItems, Align> = {
    'flex-start': Align.FlexStart,
    'flex-end': Align.FlexEnd,
    center: Align.Center,
    stretch: Align.Stretch,
    baseline: Align.Baseline,
} as const;

const BOX_SIZING_MAP: Record<'border-box' | 'content-box', BoxSizing> = {
    'border-box': BoxSizing.BorderBox,
    'content-box': BoxSizing.ContentBox,
} as const;

const DIRECTION_MAP: Record<'ltr' | 'rtl', Direction> = {
    ltr: Direction.LTR,
    rtl: Direction.RTL,
} as const;

const DISPLAY_MAP: Record<'none' | 'flex' | 'contents', Display> = {
    none: Display.None,
    flex: Display.Flex,
    contents: Display.Contents,
} as const;

const FLEX_DIRECTION_MAP: Record<'row' | 'column' | 'row-reverse' | 'column-reverse', FlexDirection> = {
    row: FlexDirection.Row,
    column: FlexDirection.Column,
    'row-reverse': FlexDirection.RowReverse,
    'column-reverse': FlexDirection.ColumnReverse,
} as const;

const FLEX_WRAP_MAP: Record<'wrap' | 'nowrap' | 'wrap-reverse', Wrap> = {
    wrap: Wrap.Wrap,
    nowrap: Wrap.NoWrap,
    'wrap-reverse': Wrap.WrapReverse,
} as const;

const JUSTIFY_CONTENT_MAP: Record<JustifyContent, Justify> = {
    'flex-start': Justify.FlexStart,
    'flex-end': Justify.FlexEnd,
    center: Justify.Center,
    'space-between': Justify.SpaceBetween,
    'space-around': Justify.SpaceAround,
    'space-evenly': Justify.SpaceEvenly,
} as const;

const OVERFLOW_MAP: Record<'visible' | 'hidden' | 'scroll', Overflow> = {
    visible: Overflow.Visible,
    hidden: Overflow.Hidden,
    scroll: Overflow.Scroll,
} as const;

const POSITION_MAP: Record<'absolute' | 'relative' | 'static', PositionType> = {
    absolute: PositionType.Absolute,
    relative: PositionType.Relative,
    static: PositionType.Static,
} as const;

const styleSetters: Record<keyof YogaStyles, (node: YogaNode, value: any) => void> = {
    alignContent: (node, value) => node.setAlignContent(alignContent(value)),
    alignItems: (node, value) => node.setAlignItems(alignItems(value)),
    alignSelf: (node, value) => node.setAlignSelf(alignItems(value)),
    aspectRatio: (node, value) => node.setAspectRatio(value),
    borderBottomWidth: (node, value) => node.setBorder(Edge.Bottom, value),
    borderEndWidth: (node, value) => node.setBorder(Edge.End, value),
    borderLeftWidth: (node, value) => node.setBorder(Edge.Left, value),
    borderRightWidth: (node, value) => node.setBorder(Edge.Right, value),
    borderStartWidth: (node, value) => node.setBorder(Edge.Start, value),
    borderTopWidth: (node, value) => node.setBorder(Edge.Top, value),
    borderWidth: (node, value) => node.setBorder(Edge.All, value),
    borderInlineWidth: (node, value) => node.setBorder(Edge.Horizontal, value),
    borderBlockWidth: (node, value) => node.setBorder(Edge.Vertical, value),
    bottom: (node, value) => node.setPosition(Edge.Bottom, value),
    boxSizing: (node, value) => node.setBoxSizing(boxSizing(value)),
    direction: (node, value) => node.setDirection(direction(value)),
    display: (node, value) => node.setDisplay(display(value)),
    end: (node, value) => node.setPosition(Edge.End, value),
    flex: (node, value) => node.setFlex(value),
    flexBasis: (node, value) => node.setFlexBasis(value),
    flexDirection: (node, value) => node.setFlexDirection(flexDirection(value)),
    rowGap: (node, value) => node.setGap(Gutter.Row, value),
    gap: (node, value) => node.setGap(Gutter.All, value),
    columnGap: (node, value) => node.setGap(Gutter.Column, value),
    flexGrow: (node, value) => node.setFlexGrow(value),
    flexShrink: (node, value) => node.setFlexShrink(value),
    flexWrap: (node, value) => node.setFlexWrap(flexWrap(value)),
    height: (node, value) => node.setHeight(value),
    justifyContent: (node, value) => node.setJustifyContent(justifyContent(value)),
    left: (node, value) => node.setPosition(Edge.Left, value),
    margin: (node, value) => node.setMargin(Edge.All, value),
    marginBottom: (node, value) => node.setMargin(Edge.Bottom, value),
    marginEnd: (node, value) => node.setMargin(Edge.End, value),
    marginLeft: (node, value) => node.setMargin(Edge.Left, value),
    marginRight: (node, value) => node.setMargin(Edge.Right, value),
    marginStart: (node, value) => node.setMargin(Edge.Start, value),
    marginTop: (node, value) => node.setMargin(Edge.Top, value),
    marginInline: (node, value) => node.setMargin(Edge.Horizontal, value),
    marginBlock: (node, value) => node.setMargin(Edge.Vertical, value),
    maxHeight: (node, value) => node.setMaxHeight(value),
    maxWidth: (node, value) => node.setMaxWidth(value),
    minHeight: (node, value) => node.setMinHeight(value),
    minWidth: (node, value) => node.setMinWidth(value),
    overflow: (node, value) => node.setOverflow(overflow(value)),
    padding: (node, value) => node.setPadding(Edge.All, value),
    paddingBottom: (node, value) => node.setPadding(Edge.Bottom, value),
    paddingEnd: (node, value) => node.setPadding(Edge.End, value),
    paddingLeft: (node, value) => node.setPadding(Edge.Left, value),
    paddingRight: (node, value) => node.setPadding(Edge.Right, value),
    paddingStart: (node, value) => node.setPadding(Edge.Start, value),
    paddingTop: (node, value) => node.setPadding(Edge.Top, value),
    paddingInline: (node, value) => node.setPadding(Edge.Horizontal, value),
    paddingBlock: (node, value) => node.setPadding(Edge.Vertical, value),
    position: (node, value) => node.setPositionType(position(value)),
    right: (node, value) => node.setPosition(Edge.Right, value),
    start: (node, value) => node.setPosition(Edge.Start, value),
    top: (node, value) => node.setPosition(Edge.Top, value),
    insetInline: (node, value) => node.setPosition(Edge.Horizontal, value),
    insetBlock: (node, value) => node.setPosition(Edge.Vertical, value),
    inset: (node, value) => node.setPosition(Edge.All, value),
    width: (node, value) => node.setWidth(value),
} as const;

function alignContent(str: keyof typeof ALIGN_CONTENT_MAP): Align {
    if (str in ALIGN_CONTENT_MAP) return ALIGN_CONTENT_MAP[str];

    throw new Error(`"${str}" is not a valid value for alignContent`);
}

function alignItems(str: keyof typeof ALIGN_ITEMS_MAP): Align {
    if (str in ALIGN_ITEMS_MAP) return ALIGN_ITEMS_MAP[str];

    throw new Error(`"${str}" is not a valid value for alignItems`);
}

function boxSizing(str: keyof typeof BOX_SIZING_MAP): BoxSizing {
    if (str in BOX_SIZING_MAP) return BOX_SIZING_MAP[str];

    throw new Error(`"${str}" is not a valid value for boxSizing`);
}

function direction(str: keyof typeof DIRECTION_MAP): Direction {
    if (str in DIRECTION_MAP) return DIRECTION_MAP[str];

    throw new Error(`"${str}" is not a valid value for direction`);
}

function display(str: keyof typeof DISPLAY_MAP): Display {
    if (str in DISPLAY_MAP) return DISPLAY_MAP[str];

    throw new Error(`"${str}" is not a valid value for display`);
}

function flexDirection(str: keyof typeof FLEX_DIRECTION_MAP): FlexDirection {
    if (str in FLEX_DIRECTION_MAP) return FLEX_DIRECTION_MAP[str];

    throw new Error(`"${str}" is not a valid value for flexDirection`);
}

function flexWrap(str: keyof typeof FLEX_WRAP_MAP): Wrap {
    if (str in FLEX_WRAP_MAP) return FLEX_WRAP_MAP[str];

    throw new Error(`"${str}" is not a valid value for flexWrap`);
}

function justifyContent(str: keyof typeof JUSTIFY_CONTENT_MAP): Justify {
    if (str in JUSTIFY_CONTENT_MAP) return JUSTIFY_CONTENT_MAP[str];

    throw new Error(`"${str}" is not a valid value for justifyContent`);
}

function overflow(str: keyof typeof OVERFLOW_MAP): Overflow {
    if (str in OVERFLOW_MAP) return OVERFLOW_MAP[str];

    throw new Error(`"${str}" is not a valid value for overflow`);
}

function position(str: keyof typeof POSITION_MAP): PositionType {
    if (str in POSITION_MAP) return POSITION_MAP[str];

    throw new Error(`"${str}" is not a valid value for position`);
}

/**
 * Applies CSS-like flex styles to a Yoga node
 * Maps style properties to appropriate Yoga API calls
 *
 * @param node - The Yoga node to apply styles to
 * @param style - CSS-like flex style object
 */
export function applyStyle(node: YogaNode, style: YogaStyles = {}): void {
    for (const [key, value] of Object.entries(style)) {
        try {
            const setter = styleSetters[key as keyof YogaStyles];

            if (setter) {
                setter(node, value);
            }
        } catch (_e) {
            // Fail gracefully
        }
    }

    // if both left and right are set, width is set to auto
    // otherwise set the current width either from style or discovered size
    if (style.width !== undefined) {
        const widthValue = style.left !== undefined && style.right !== undefined ? 'auto' : style.width;

        node.setWidth(widthValue as number);
    }

    // if both top and bottom are set, height is set to auto
    // otherwise set the current height either from style or discovered size
    if (style.height !== undefined) {
        const heightValue = style.top !== undefined && style.bottom !== undefined ? 'auto' : style.height;

        node.setHeight(heightValue as number);
    }
}
