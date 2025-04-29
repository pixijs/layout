import { LayoutContainer, type LayoutContainerOptions } from '../../../src/components/LayoutContainer';
import { type LayoutStyles } from '../../../src/core/style/layoutStyles';
import { type ComputedLayout } from '../../../src/core/types';

interface NodeOptions extends LayoutContainerOptions {
    style?: LayoutStyles;
}
export class Node extends LayoutContainer {
    constructor(params?: NodeOptions) {
        if (params?.style) {
            params.layout = params.style;
        }
        super(params);

        if (this.layout?.style.borderWidth === undefined) {
            this.layout = {
                borderWidth: 1,
            };
        }
    }

    protected getParentDepth(depth: number): number {
        let parent = this.parent;

        while (parent) {
            if (parent.layout) {
                depth += 1;
            }

            parent = parent.parent;
        }

        return depth;
    }

    protected override _drawBackground(computedLayout: ComputedLayout): void {
        const depth = this.getParentDepth(0);

        // for each depth add a different color
        switch (depth) {
            case 1:
                this.layout!._styles.custom.backgroundColor = '#0f172a';
                break;
            case 2:
                this.layout!._styles.custom.backgroundColor = '#1e293b';
                break;
            case 3:
                this.layout!._styles.custom.backgroundColor = '#334155';
                break;
            case 4:
                this.layout!._styles.custom.backgroundColor = '#475569';
                break;
            default:
                this.layout!._styles.custom.backgroundColor = '#64748b';
                break;
        }
        this.layout!._styles.custom.borderColor = 0x444950;
        this.layout!._styles.custom.borderColor = 0xb3bdcf;
        this.layout!._styles.custom.borderRadius = 2;

        super._drawBackground(computedLayout);
    }
}

export class Layout extends LayoutContainer {
    constructor(params?: NodeOptions) {
        super(params);

        this.layout!.setStyle({
            ...params?.style,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
        });
    }

    public resize(width: number, height: number): void {
        this.layout!.setStyle({ width, height });
    }
}
