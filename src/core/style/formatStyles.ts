import { ViewContainer } from 'pixi.js';
import { Layout } from '../Layout';
import { getPixiSize } from '../utils/getPixiSize';
import { type LayoutStyles } from './layoutStyles';
import { type YogaStyles } from './yogaStyles';

/**
 * Formats the layout styles for the layout
 * @param layout - The layout to format the styles for
 * @param style - The style to apply to the layout
 */
export function formatStyles(layout: Layout, style: LayoutStyles) {
    const currentStyles = layout._styles;
    let customStyles = { ...currentStyles.custom, ...style };
    const defaultStyle = {
        ...Layout.defaultStyle.shared,
        ...(layout.target instanceof ViewContainer || customStyles.isLeaf || Layout.defaultStyle.shared.isLeaf
            ? Layout.defaultStyle.leaf
            : Layout.defaultStyle.container),
    };

    customStyles = { ...defaultStyle, ...customStyles };
    const yogaStyles = { ...(customStyles as YogaStyles) };

    const widthIntrinsic = customStyles.width === 'intrinsic';
    const heightIntrinsic = customStyles.height === 'intrinsic';

    if (widthIntrinsic || heightIntrinsic) {
        const { width, height } = getPixiSize(layout);

        if (widthIntrinsic) {
            yogaStyles.width = width;
        }
        if (heightIntrinsic) {
            yogaStyles.height = height;
        }
    }

    return { custom: customStyles, yoga: yogaStyles };
}
