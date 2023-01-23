import { getNumber } from '../utils/helpers';
import { Layout } from '../Layout';
import { FlexNumber } from '../utils/types';

export class SizeController {
	private layout: Layout;
	private _width: number;
	private _height: number;

	parentWidth = 0;
	parentHeight = 0;

	constructor(layout: Layout) {
		this.layout = layout;
	}

	update(parentWidth: number, parentHeight: number) {
		this.parentWidth = parentWidth;
		this.parentHeight = parentHeight;

		if (this.layout.style.width === 0 || this.layout.style.height === 0) {
			this.layout.visible = false;
			return;
		}

		if (this.layout.style.width === 'auto') {
			const display = this.layout.style.display;

			switch (display) {
				case 'block':
				case 'flex':
					this.width = this.parentWidth;
					break;

				default:
					this.width = this.layout.getContentWidth();
					break;
			}
		} else {
			this.width = this.layout.style.width;
		}

		if (this.layout.style.height === 'auto') {
			this.height = this.layout.getContentHeight();
		} else {
			this.height = this.layout.style.height;
		}

		if (this.width === 0 || this.height === 0) {
			this.layout.visible = false;
			return;
		}

		this.layout.updateBG();
		this.layout.updateMask();
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	set width(width: FlexNumber) {
		this._width = getNumber(width, this.parentWidth);
	}

	set height(height: FlexNumber) {
		this._height = getNumber(height, this.parentHeight);
	}
}
