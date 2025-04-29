import { type Container } from 'pixi.js';
import { type Node } from 'yoga-layout';
import { type OverflowContainer } from '../components/LayoutContainer';
import { getYoga } from '../yoga';
import { applyStyle } from './style/applyStyle';
import { formatStyles } from './style/formatStyles';
import { type LayoutStyles } from './style/layoutStyles';
import { type ComputedLayout, type ComputedPixiLayout, type InternalStyles } from './types';
import { onChildAdded, onChildRemoved } from './utils/sort-children';

export interface LayoutOptions extends LayoutStyles {
    target: Container;
}

/**
 * Main Layout class that handles the combination of PixiJS containers and their layout
 * using the Yoga layout engine
 */
export class Layout {
    /** Default style values to apply to the layout */
    public static defaultStyle: { container: LayoutStyles; leaf: LayoutStyles; shared: LayoutStyles } = {
        leaf: {
            width: 'intrinsic',
            height: 'intrinsic',
        },
        container: {
            width: 'auto',
            height: 'auto',
        },
        shared: {
            transformOrigin: '50%',
            objectPosition: 'center',
            flexShrink: 1,
            flexDirection: 'row',
            alignContent: 'stretch',
            flexWrap: 'nowrap',
            overflow: 'visible',
        },
    };
    /** The Yoga node instance for this layout */
    public yoga: Readonly<Node>;
    /** The target PixiJS container */
    public readonly target: Container;

    /**
     * Flag indicating if layout needs recalculation
     * @ignore
     */
    public _isDirty = false;

    /**
     * The computed pixi layout that is applied to the target container in the updateLocalTransform step
     * @ignore
     */
    public _computedPixiLayout: Required<ComputedPixiLayout> = {
        /** The left value of the view */
        x: 0,
        /** The top value of the view */
        y: 0,
        /** The offset x value of the view within its box */
        offsetX: 0,
        /** The offset y value of the view within its box */
        offsetY: 0,
        /** The scale x value of the view within its box */
        scaleX: 1,
        /** The scale y value of the view within its box */
        scaleY: 1,
        /** The x origin of the view */
        originX: 0,
        /** The y origin of the view */
        originY: 0,
    };

    /**
     * The computed bounds of the yoga node
     * @ignore
     */
    public _computedLayout: ComputedLayout = {
        /** The left value of the view */
        left: 0,
        /** The right value of the view */
        right: 0,
        /** The top value of the view */
        top: 0,
        /** The bottom value of the view */
        bottom: 0,
        /** The width of the view */
        width: 0,
        /** The height of the view */
        height: 0,
    };

    /**
     * The styles used for layout calculation
     * @ignore
     */
    public _styles: InternalStyles = {
        custom: {},
        yoga: {},
    };

    /**
     * The number of times the layout has been modified
     * @ignore
     */
    public _modificationCount = 0;

    /**
     * Flag indicating if the layout should be recalculated even if it hasn't changed the yoga node.
     * This is used to force an update when certain style properties change such as `objectFit`.
     * @ignore
     */
    public _forceUpdate = false;

    /**
     * Flag indicating if the layout has a parent node
     */
    public hasParent = false;

    /**
     * The keys to track for changes to force an update
     * @ignore
     */
    protected _trackedStyleKeys: (keyof LayoutStyles)[] = [
        'borderRadius',
        'borderColor',
        'backgroundColor',
        'objectFit',
        'objectPosition',
        'transformOrigin',
        'isLeaf',
    ];

    constructor({ target }: LayoutOptions) {
        this.target = target;
        this.yoga = getYoga().Node.create();

        target.on('added', this._onChildAdded, this);
        target.on('removed', this._onChildRemoved, this);
        target.on('destroyed', this.destroy, this);
    }

    /** Returns the layout style */
    public get style(): Readonly<LayoutStyles> {
        return this._styles.custom;
    }

    /** Returns the computed layout of the yoga node */
    public get computedLayout(): Readonly<ComputedLayout> {
        return this._computedLayout;
    }

    /** Returns the computed layout of the pixi node */
    public get computedPixiLayout(): Readonly<Required<ComputedPixiLayout>> {
        return this._computedPixiLayout;
    }

    /**
     * Returns the true x position of the target.
     *
     * When an element is in layout, the x/y position is an offset from where it is laid out.
     * This is the true x position of the element in the parent container.
     */
    public get realX() {
        return this.target.localTransform.tx;
    }
    /**
     * Returns the true y position of the target.
     *
     * When an element is in layout, the x/y position is an offset from where it is laid out.
     * This is the true y position of the element in the parent container.
     */
    public get realY() {
        return this.target.localTransform.ty;
    }
    /**
     * Returns the true x scale of the target.
     *
     * When an element is in layout, the scale is an offset from 1.
     * This is the true x scale of the element.
     */
    public get realScaleX() {
        return this.target.localTransform.a;
    }
    /**
     * Returns the true y scale of the target.
     *
     * When an element is in layout, the scale is an offset from 1.
     * This is the true y scale of the element.
     */
    public get realScaleY() {
        return this.target.localTransform.d;
    }

    /**
     * Updates the layout style and triggers recalculation
     * @param style - New layout style to apply
     */
    public setStyle(style: LayoutStyles): void {
        const styles = formatStyles(this, style);
        const differentCustom = JSON.stringify(this._styles.custom) !== JSON.stringify(styles.custom);
        const differentYoga = JSON.stringify(this._styles.yoga) !== JSON.stringify(styles.yoga);
        const different = differentCustom || differentYoga;
        // Check if any tracked style keys have changed
        const hasTrackedChanges = this._trackedStyleKeys.some((key) => styles.custom[key] !== this._styles.custom[key]);

        this._styles = styles;

        if (hasTrackedChanges) {
            this._forceUpdate = true;
        }

        if (different) {
            applyStyle(this.yoga, this._styles.yoga);
            this.target._onUpdate();
            this.invalidateRoot();
        }
    }

    /** Marks the root layout as needing recalculation */
    public invalidateRoot(): void {
        const root = this.getRoot();

        root._layout!._isDirty = true;
        root._onUpdate();

        this._modificationCount++;
    }

    /**
     * Forces an update of the layout even if it hasn't changed the yoga node.
     * This is used to force an update when certain style properties change such as `objectFit`.
     * Or when you have changed something inside of Pixi that is not tracked by the layout system.
     */
    public forceUpdate(): void {
        this._forceUpdate = true;
    }

    /**
     * Finds the root container by traversing up the layout tree
     * @returns The root container
     */
    public getRoot(): Container {
        // find the root node by traversing up the yoga tree
        let root: Container = this.target as Container;

        while (root.parent?._layout || (root.parent as OverflowContainer)?.isOverflowContainer) {
            root = root.parent;

            if ((root as OverflowContainer).isOverflowContainer) {
                root = root.parent!;
            }
        }

        return root;
    }

    /**
     * @ignore
     */
    public _onChildAdded(pixiParent: Container): void {
        if (this.hasParent) return;

        this.hasParent = true;
        this.invalidateRoot();
        onChildAdded(this, pixiParent);
    }

    /**
     * @ignore
     */
    public _onChildRemoved(): void {
        if (!this.hasParent) return;

        this.hasParent = false;
        this.invalidateRoot();
        onChildRemoved(this);
    }

    public destroy(): void {
        this.invalidateRoot();
        this.yoga.free();
        this.target.off('added', this._onChildAdded, this);
        this.target.off('removed', this._onChildRemoved, this);
        this._styles = null!;
        this._computedPixiLayout = null!;
        this._computedLayout = null!;
        (this as any).target = null!;
        this.hasParent = false;
    }
}
