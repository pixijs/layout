import { Text } from 'pixi.js';
import { Layout, LayoutSystem } from '../Layout';
import { isItJustAText } from '../utils/helpers';

/** Align controller manages {@link LayoutSystem} and it's content alignment. */
export class AlignController {
    protected layout: LayoutSystem;

    /**
     * Creates align controller.
     * @param {LayoutSystem} layout - Layout to control.
     */
    constructor(layout: LayoutSystem) {
        this.layout = layout;
    }

    /**
     * Updates layout and all children alignments.
     * @param {number} parentWidth
     * @param {number} parentHeight
     */
    resize(parentWidth: number, parentHeight: number) {
        this.setSelfPosition(parentWidth, parentHeight);

        this.layout.content.resize(this.layout.width, this.layout.height);

        // !!! important to align children AFTER content resize
        this.alignChildren(this.layout.width, this.layout.height);
    }

    protected alignChildren(parentWidth: number, parentHeight: number) {
        let maxChildHeight = 0;

        const { style } = this.layout;

        const paddingTop = style.paddingTop ?? 0;
        const paddingRight = style.paddingRight ?? 0;
        const paddingBottom = style.paddingBottom ?? 0;
        const paddingLeft = style.paddingLeft ?? 0;

        let x = paddingLeft;
        let y = paddingTop;

        const children = this.layout.content.children;

        children.forEach((child) => {
            if (!child.height && !child.width) return;

        
            // DEV: Saiid commented this out. making a specific case for text seems to be counter productive

            // if (child instanceof Text || isItJustAText(child.layout)) {
            //     const availableWidth = parentWidth - paddingLeft - paddingRight;

            //     const align = style.textAlign;

            //     if (child.width < availableWidth) {
            //         if (align === 'center') {
            //             if (child instanceof Text) child.anchor.x = 0.5;
            //             else (child.layout.content.firstChild as Text).anchor.x = 0.5;
            //             child.x = parentWidth / 2;
                        
            //         }
            //         else if (align === 'right') {
            //             if (child instanceof Text) child.anchor.x = 1;
            //             else (child.layout.content.firstChild as Text).anchor.x = 1;
            //             child.x = parentWidth - paddingRight;
            //         }
            //         else {
            //             if (child instanceof Text) child.anchor.x = 0;
            //             else (child.layout.content.firstChild as Text).anchor.x = 0;

            //             child.x = paddingLeft;
            //         }
            //     }
            //     else {
            //         if (child instanceof Text) child.anchor.x = 0;
            //         else (child.layout.content.firstChild as Text).anchor.x = 0;

            //         child.x = paddingLeft;
            //     }

            //     const verticalAlign = style.verticalAlign;

            //     const availableHeight
            //         = parentHeight - paddingTop - paddingBottom;

            //     if (child.height < availableHeight) {
            //         if (verticalAlign === 'middle') {
            //             if (child instanceof Text) child.anchor.y = 0.5;
            //             child.y = parentHeight / 2;
            //         }
            //         else if (verticalAlign === 'bottom') {
            //             if (child instanceof Text) child.anchor.y = 1;
            //             child.y = parentHeight - paddingBottom;
            //         }
            //         else {
            //             if (child instanceof Text) child.anchor.y = 0;
            //             child.y = paddingTop;
            //         }
            //     }
            //     else {
            //         if (child instanceof Text) child.anchor.y = 0;
            //         child.y = paddingTop;
            //     }

            //     return;
            // }

            let childDisplay = 'inline-block';
            let childMarginLeft = 0;
            let childMarginRight = 0;
            let childMarginTop = 0;
            let childMarginBottom = 0;

            if (child.isPixiLayout || child instanceof Layout) {
                const childLayout = child.layout as LayoutSystem;

                childDisplay = childLayout.style.display;
                childMarginLeft = childLayout.style.marginLeft;
                childMarginRight = childLayout.style.marginRight;
                childMarginTop = childLayout.style.marginTop;
                childMarginBottom = childLayout.style.marginBottom;

                if (childLayout.style.position !== undefined) {
                    // this layout position will be handled by it's own controller
                    return;
                }
            }



            let anchorX = 0;
            let anchorY = 0;

            if (style.position === undefined) {
                // if position is set, anchor will be handled in setSelfPosition method
                anchorX
                    = style.anchorX !== undefined
                        ? style.anchorX * this.layout.width
                        : 0;
                anchorY
                    = style.anchorY !== undefined
                        ? style.anchorY * this.layout.height
                        : 0;
            }

            child.x = x + childMarginLeft - anchorX;
            child.y = y + childMarginTop - anchorY;

            const availableWidth = parentWidth - paddingRight;

            if (childDisplay === 'block' && child.width < availableWidth) {
                childDisplay = 'inline-block';
            }


            const isFeetParentWidth
                = x + child.width + childMarginRight <= availableWidth;
            const isFirstChild = child === this.layout.content.firstChild;

            switch (childDisplay) {
                case 'inline':
                case 'inline-block':
                    if (!isFeetParentWidth && !isFirstChild) {
                        x = paddingLeft + child.width + childMarginRight;
                        y += maxChildHeight;
                        maxChildHeight = 0;

                        child.x = paddingLeft + childMarginLeft;
                        child.y = y + childMarginTop;
                    }
                    else {
                        if (
                            child.height + childMarginTop + childMarginBottom
                            > maxChildHeight
                        ) {
                            maxChildHeight
                                = child.height + childMarginTop + childMarginBottom;
                        }

                        x += child.width + childMarginRight;
                    }
                    break;

                default:

                    y += maxChildHeight;
                    maxChildHeight = 0;

                    x = paddingLeft + childMarginLeft;
                    child.x = x - anchorX;
                    child.y = y + childMarginTop - anchorY;

                    y += child.height + childMarginBottom + childMarginTop;
                    break;
            }
        });
    }

    protected setSelfPosition(parentWidth: number, parentHeight: number) {
        const { position, marginRight, marginBottom, marginTop, marginLeft }
            = this.layout.style || {};

        const { style } = this.layout;

        if (!position) return;

        const scaleX = this.layout.container.scale.x;
        const scaleY = this.layout.container.scale.y;
        const width = this.layout.width * scaleX;
        const height = this.layout.height * scaleY;

        const anchorX = style.anchorX;
        const anchorY = style.anchorY;

        const finalPosition = {
            x: 0,
            y: 0,
        };

        switch (position) {
            case 'rightTop':
            case 'topRight':
            case 'right':
                finalPosition.x
                    = parentWidth - marginRight - (width * (anchorX ?? 1));
                finalPosition.y = marginTop - (height * (anchorY ?? 0));
                break;

            case 'leftBottom':
            case 'bottomLeft':
            case 'bottom':
                finalPosition.x = marginLeft - (width * (anchorX ?? 0));
                finalPosition.y
                    = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'rightBottom':
            case 'bottomRight':
                finalPosition.x
                    = parentWidth - marginRight - (width * (anchorX ?? 1));
                finalPosition.y
                    = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'center':
                finalPosition.x
                    = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                finalPosition.y
                    = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'centerTop':
            case 'topCenter':
                finalPosition.x
                    = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                finalPosition.y = marginTop - (height * (anchorY ?? 0));
                break;

            case 'centerBottom':
            case 'bottomCenter':
                finalPosition.x
                    = (parentWidth / 2) - (width * (anchorX ?? 0.5)) + marginLeft;
                finalPosition.y
                    = parentHeight - marginBottom - (height * (anchorY ?? 1));
                break;

            case 'centerLeft':
            case 'leftCenter':
                finalPosition.x = marginLeft - (width * (anchorX ?? 0));
                finalPosition.y
                    = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'centerRight':
            case 'rightCenter':
                finalPosition.x
                    = parentWidth - marginRight - (width * (anchorX ?? 1));
                finalPosition.y
                    = (parentHeight / 2) - (height * (anchorY ?? 0.5)) + marginTop;
                break;

            case 'leftTop':
            case 'topLeft':
            case 'left':
            case 'top':
            default:
                finalPosition.x = marginLeft - (width * (anchorX ?? 0));
                finalPosition.y = marginTop - (height * (anchorY ?? 0));

        }


        this.layout.container.position.set(finalPosition.x, finalPosition.y);
    }
}
