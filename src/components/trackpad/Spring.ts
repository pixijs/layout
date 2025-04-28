export interface SpringOptions {
    max?: number;
    damp?: number;
    springiness?: number;
}

export class Spring {
    x: number;
    ax: number;
    dx: number;
    tx: number;

    protected _options: Required<SpringOptions>;

    constructor(options: SpringOptions = {}) {
        this.x = 0;
        this.ax = 0;
        this.dx = 0;
        this.tx = 0;

        // add opts to object for shared opts.
        this._options = options as Required<SpringOptions>;
        this._options.max = options.max ?? 160;
        this._options.damp = options.damp ?? 0.8;
        this._options.springiness = options.springiness ?? 0.1;
    }

    update(): void {
        this.ax = (this.tx - this.x) * this._options.springiness;

        this.dx += this.ax;
        this.dx *= this._options.damp;

        if (this.dx < -this._options.max) this.dx = -this._options.max;
        else if (this.dx > this._options.max) this.dx = this._options.max;

        this.x += this.dx;
    }
}
