import { type NumberValue } from '../types';

/**
 * Yoga specific styles for layout elements
 */
export interface YogaStyles {
    /**
     * How content is distributed between and around items along cross-axis
     * @values 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
     */
    alignContent?: AlignContent;

    /**
     * How items are aligned along the cross-axis
     * @values 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
     */
    alignItems?: AlignItems;

    /**
     * Override alignItems for individual flex item
     * @values 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
     */
    alignSelf?: AlignItems;

    /**
     * Fixed ratio between width and height
     * @example aspectRatio: 16/9 // Widescreen ratio
     */
    aspectRatio?: number;

    /**
     * Border width properties (in pixels)
     * NOTE: that unless you are using a LayoutContainer, these properties will exact like padding
     * @group Border Properties
     */
    borderBottomWidth?: number;
    borderEndWidth?: number;
    borderLeftWidth?: number;
    borderRightWidth?: number;
    borderStartWidth?: number;
    borderTopWidth?: number;

    /**
     * Shorthand border width properties (in pixels)
     * NOTE: that unless you are using a LayoutContainer, these properties will exact like padding
     * @group Border Shorthands
     */
    borderWidth?: number; // All borders
    borderInlineWidth?: number; // Left and right borders
    borderBlockWidth?: number; // Top and bottom borders

    /** Distance from bottom edge of container in pixels or percentage */
    bottom?: NumberValue;
    /** Distance from left edge in pixels or percentage */
    left?: NumberValue;
    /** Distance from right edge in pixels or percentage */
    right?: NumberValue;
    /** Distance from top edge in pixels or percentage */
    top?: NumberValue;
    /** Distance from end edge (right in ltr, left in rtl) in pixels or percentage */
    end?: NumberValue;
    /** Distance from start edge (left in LTR, right in RTL) */
    start?: NumberValue;

    /**
     * Determines how element's total width/height is calculated
     * @value 'border-box' - Width/height includes padding and border
     * @value 'content-box' - Width/height excludes padding and border
     */
    boxSizing?: 'border-box' | 'content-box';

    /**
     * Text and item flow direction
     * @value 'ltr' - Left to right
     * @value 'rtl' - Right to left
     */
    direction?: 'ltr' | 'rtl';

    /**
     * Element display type
     * @value 'none' - Element is not displayed
     * @value 'flex' - Element becomes a flex container
     * @value 'contents' - Container itself is not rendered, only children
     */
    display?: 'none' | 'flex' | 'contents';

    /**
     * Flex grow/shrink factor
     * @example flex: 1 // Fill available space
     * @example flex: 0 // Don't grow/shrink
     */
    flex?: number;

    /**
     * Initial main size of flex item
     * @value number - Size in pixels
     * @value 'auto' - Based on content
     * @value percentage - Percentage of container
     */
    flexBasis?: NumberValue | 'auto';

    /**
     * Direction of flex items layout
     * @value 'row' - Items laid out in a row
     * @value 'column' - Items laid out in a column
     * @value 'row-reverse' - Row layout from right to left
     * @value 'column-reverse' - Column layout from bottom to top
     */
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

    /** Space between rows in pixels */
    rowGap?: number;

    /** Space between both rows and columns in pixels */
    gap?: number;

    /** Space between columns in pixels */
    columnGap?: number;

    /**
     * Growth factor relative to other flex items
     * @example flexGrow: 1 // Item will grow to fill space
     * @example flexGrow: 0 // Item won't grow
     */
    flexGrow?: number;

    /**
     * Shrink factor relative to other flex items
     * @example flexShrink: 1 // Item will shrink if needed
     * @example flexShrink: 0 // Item won't shrink
     */
    flexShrink?: number;

    /**
     * Controls whether flex items wrap onto multiple lines
     * @value 'nowrap' - Single line, may overflow
     * @value 'wrap' - Multiple lines, top to bottom
     * @value 'wrap-reverse' - Multiple lines, bottom to top
     */
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';

    /**
     * Alignment of items along main axis
     * @value 'flex-start' - Pack items at start
     * @value 'flex-end' - Pack items at end
     * @value 'center' - Pack items at center
     * @value 'space-between' - Evenly space with first/last at edges
     * @value 'space-around' - Evenly space with equal margins
     * @value 'space-evenly' - Equal space between items
     */
    justifyContent?: JustifyContent;

    /**
     * Shorthand for all margin edges
     * @value number - Margin in pixels
     * @value 'auto' - Auto margins for centering
     * @value percentage - Relative to container width
     */
    margin?: NumberValue | 'auto';
    /** Margin from bottom edge */
    marginBottom?: NumberValue | 'auto';
    /** Margin from end edge (right in LTR, left in RTL) */
    marginEnd?: NumberValue | 'auto';
    /** Margin from left edge */
    marginLeft?: NumberValue | 'auto';
    /** Margin from right edge */
    marginRight?: NumberValue | 'auto';
    /** Margin from start edge (left in LTR, right in RTL) */
    marginStart?: NumberValue | 'auto';
    /** Margin from top edge */
    marginTop?: NumberValue | 'auto';
    /** Shorthand for left and right margins */
    marginInline?: NumberValue | 'auto';
    /** Shorthand for top and bottom margins */
    marginBlock?: NumberValue | 'auto';

    /**
     * Element width
     * @value number - Width in pixels
     * @value 'auto' - Calculated from content
     * @value percentage - Percentage of parent
     */
    width?: NumberValue | 'auto';
    /**
     * Element height in pixels, auto, or percentage
     * @value number - Height in pixels
     * @value 'auto' - Based on content
     * @value percentage - Percentage of parent
     */
    height?: NumberValue | 'auto';
    /**
     * Maximum allowed height
     * @value number - Max height in pixels
     * @value percentage - Percentage of parent
     */
    maxHeight?: NumberValue;
    /**
     * Maximum allowed width
     * @value number - Max width in pixels
     * @value percentage - Percentage of parent
     */
    maxWidth?: NumberValue;
    /**
     * Minimum required height
     * @value number - Min height in pixels
     * @value percentage - Percentage of parent
     */
    minHeight?: NumberValue;
    /**
     * Minimum required width
     * @value number - Min width in pixels
     * @value percentage - Percentage of parent
     */
    minWidth?: NumberValue;

    /**
     * Controls how content overflows its container
     * NOTE: that unless you are using a LayoutContainer, this property will not apply
     * @value 'visible' - Content visible outside bounds
     * @value 'hidden' - Content clipped at bounds
     * @value 'scroll' - Scrollbars appear when needed
     */
    overflow?: 'visible' | 'hidden' | 'scroll';

    /**
     * Shorthand for all padding edges
     * @value number - Padding in pixels
     * @value percentage - Relative to container width
     */
    padding?: NumberValue;
    /** Padding from bottom edge */
    paddingBottom?: NumberValue;
    /** Padding from end edge (right in LTR, left in RTL) */
    paddingEnd?: NumberValue;
    /** Padding from left edge */
    paddingLeft?: NumberValue;
    /** Padding from right edge */
    paddingRight?: NumberValue;
    /** Padding from start edge (left in LTR, right in RTL) */
    paddingStart?: NumberValue;
    /** Padding from top edge */
    paddingTop?: NumberValue;
    /** Shorthand for left and right padding */
    paddingInline?: NumberValue;
    /** Shorthand for top and bottom padding */
    paddingBlock?: NumberValue;

    /** Shorthand for left/right positioning */
    insetInline?: NumberValue;
    /** Shorthand for top/bottom positioning */
    insetBlock?: NumberValue;
    /** Shorthand for all edge offsets */
    inset?: NumberValue;

    /**
     * Element positioning method
     * @value 'absolute' - Position relative to nearest positioned ancestor
     * @value 'relative' - Position relative to normal position
     * @value 'static' - Normal document flow
     */
    position?: 'absolute' | 'relative' | 'static';
}

export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type AlignContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
