import { getNumber } from "../utils/helpers";
import { Layout } from '../views/Layout';
import { FlexNumber } from "../utils/types";

export class SizeController {
    private layout: Layout;
    private _width = 0;
    private _height = 0;

    parentWidth = 0;
    parentHeight = 0;

    constructor(layout: Layout) {
        this.layout = layout;
    }

    update(parentWidth: number, parentHeight: number) {
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;

        this.width = this.layout.style.width;
        this.height = this.layout.style.height;

        if (this.width === 0 && this.layout.style.display === 'block') {
            this.width = this.parentWidth;
        }

        if (this.height === 0) {
            // set height basing on content
            this.height = this.layout.getContentHeight();            
        }

        this.layout.style.update();
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    set width(width: FlexNumber) {
        this._width = getNumber(width, this.parentWidth) ?? this.parentWidth;
    }

    set height(height: FlexNumber) {
        this._height = getNumber(height, this.parentHeight) ?? this.parentHeight;
    }
}