import { type NumberValue, type PositionSpecifier } from '../types';
import { type YogaStyles } from './yogaStyles';

import type { ColorSource } from 'pixi.js';

/**
 * All styles for layout elements
 */
export interface LayoutStyles extends Omit<YogaStyles, 'width' | 'height'> {
    /**
     * Element width in pixels, percentage, or special values
     * @property {number} - Width in pixels
     * @property {'auto'} - Automatic sizing based on content
     * @property {string} - Percentage of parent container (e.g. '50%')
     * @property {'intrinsic'} - Intrinsic sizing based on the pixi element
     */
    width?: NumberValue | 'auto' | 'intrinsic';

    /**
     * Element height in pixels, percentage, or special values
     * @property {number} - Height in pixels
     * @property {'auto'} - Automatic sizing based on content
     * @property {string} - Percentage of parent container (e.g. '50%')
     * @property {'intrinsic'} - Intrinsic sizing based on the pixi element
     */
    height?: NumberValue | 'auto' | 'intrinsic';

    /**
     * Border radius in pixels for rounded corners
     * NOTE: that unless you are using a LayoutContainer, this property will not apply
     */
    borderRadius?: number;

    /**
     * Background color using PIXI color source format
     * NOTE: that unless you are using a LayoutContainer, this property will not apply
     */
    backgroundColor?: ColorSource;

    /**
     * Border color using PIXI color source format
     * NOTE: that unless you are using a LayoutContainer, these properties will not apply
     */
    borderColor?: ColorSource;

    /**
     * The x and y coordinates of the transform origin.
     * This property defines the point around which a transformation is applied.
     * It can be a number representing pixels or a percentage string (e.g., '50%') relative to the element's width.
     * A value of '50%' centers the transformation along the x-axis and y-axis.
     * When using percentage based values, this is a lot like anchor (percentage based)
     * and when using pixel based values, this is a lot like pivot (pixel based).
     */
    transformOrigin?: PositionSpecifier;

    /**
     * Specifies how the content should be resized to fit its container.
     * NOTE: This property only applies to leaf nodes (e.g. sprites, text, graphics)
     *
     * @property {string} objectFit
     * @value 'fill' - Content is resized to fill the container exactly, may be stretched
     * @value 'contain' - Content maintains aspect ratio while fitting within container
     * @value 'cover' - Content maintains aspect ratio while filling container, may be clipped
     * @value 'none' - Content is not resized
     * @value 'scale-down' - Content scales down like 'contain' if too big, otherwise like 'none'
     */
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

    /**
     * Controls the positioning of content within its container.
     * Similar to CSS object-position, this property determines where the element's content is placed within its box.
     * NOTE: This property only applies to leaf nodes (e.g. sprites, text, graphics)
     *
     * @property {ObjectPosition} objectPosition
     *
     * @example
     * // Single keyword
     * objectPosition: 'center'
     *
     * @example
     * // Two values (keyword + keyword)
     * objectPosition: 'top right'
     *
     * @example
     * // Two values (number/percentage combinations)
     * objectPosition: '50% 100%'
     * objectPosition: '20px 30px'
     *
     * @example
     * // Edge offset format
     * objectPosition: 'right 10px bottom 20px'
     */
    objectPosition?: PositionSpecifier;

    /**
     * Flag to apply size directly to PIXI container instead of applying a scale offset
     * @default false
     */
    applySizeDirectly?: boolean;

    /**
     * If true the node is considered a leaf node and will be positioned and scaled based on the layout.
     * This allows for properties like objectFit and objectPosition to be applied.
     * @default false
     */
    isLeaf?: boolean;

    /**
     * Debug flag to render layout debug information
     */
    debug?: boolean;

    /**
     * Debug flag to render how often a layout is recalculated due to changes from this node
     * @default true
     */
    debugHeat?: boolean;

    /**
     * Debug flag to render layout debug information for specific layout areas
     */
    debugDrawMargin?: boolean;
    debugDrawPadding?: boolean;
    debugDrawBorder?: boolean;
    debugDrawFlex?: boolean;
    debugDrawContent?: boolean;
}
