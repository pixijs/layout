import { type Application, Container, Graphics, Sprite } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LayoutView } from '../../src/components/LayoutView';
import { createApp } from './LayoutContainer.test';
import '../../src/index';

describe('LayoutView', () => {
    let app: Application;
    let view: LayoutView;
    let slot: Container;

    beforeEach(async () => {
        app = await createApp();
        slot = new Container();
        view = new LayoutView({ slot });
        app.stage.addChild(view);
    });

    afterEach(() => {
        app.destroy(true);
    });

    describe('constructor', () => {
        it('should create with default slot if none provided', () => {
            const defaultView = new LayoutView({});

            expect(defaultView.slot).toBeInstanceOf(Container);
            expect(defaultView.slot.label).toBe('slot');
        });

        it('should use provided slot', () => {
            expect(view.slot).toBe(slot);
        });

        it('should add slot to overflow container', () => {
            expect(view.overflowContainer.children).toContain(slot);
        });
    });

    describe('layout', () => {
        it('should set layout on both container and slot', () => {
            view.layout = {
                width: 100,
                height: 100,
                objectFit: 'contain',
                objectPosition: 'center',
                backgroundColor: 'red',
            };

            expect(view.layout!.style.width).toBe(100);
            expect(view.layout!.style.height).toBe(100);
            expect(view.layout!.style.backgroundColor).toBe('red');

            expect(view.slot.layout!.style.width).toBe('100%');
            expect(view.slot.layout!.style.height).toBe('100%');
            expect(view.slot.layout!.style.objectFit).toBe('contain');
            expect(view.slot.layout!.style.objectPosition).toBe('center');
        });

        it('should handle null layout', () => {
            view.layout = true;
            view.layout = null;
            expect(view.layout).toBeNull();
        });

        it('should properly split layout properties between container and slot', () => {
            view.layout = {
                width: 200,
                height: 200,
                objectFit: 'cover',
                applySizeDirectly: true,
                isLeaf: true,
                backgroundColor: 'blue',
            };

            // Container properties
            expect(view.layout!.style.width).toBe(200);
            expect(view.layout!.style.height).toBe(200);
            expect(view.layout!.style.backgroundColor).toBe('blue');
            expect(view.layout!.style.objectFit).toBeUndefined();
            expect(view.layout!.style.applySizeDirectly).toBeUndefined();

            // Slot properties
            expect(view.slot.layout!.style.width).toBe('100%');
            expect(view.slot.layout!.style.height).toBe('100%');
            expect(view.slot.layout!.style.objectFit).toBe('cover');
            expect(view.slot.layout!.style.applySizeDirectly).toBe(true);
            expect(view.slot.layout!.style.isLeaf).toBe(true);
        });
    });

    describe('child management', () => {
        it('should throw error when adding children', () => {
            const child1 = new Graphics();

            expect(() => view.addChild(child1)).toThrow('Leaf nodes should not have multiple children');

            child1.destroy();
        });
    });

    describe('specialized use cases', () => {
        it('should work with Sprite as slot', () => {
            const spriteSlot = new Sprite();
            const spriteView = new LayoutView({ slot: spriteSlot });

            expect(spriteView.slot).toBe(spriteSlot);
            expect(spriteView.slot).toBeInstanceOf(Sprite);

            spriteView.destroy();
        });

        it('should handle layout updates after initialization', () => {
            view.layout = { width: 100, height: 100 };
            view.layout = { width: 200, height: 200 };

            expect(view.layout!.style.width).toBe(200);
            expect(view.layout!.style.height).toBe(200);
            expect(view.slot.layout!.style.width).toBe('100%');
            expect(view.slot.layout!.style.height).toBe('100%');
        });
    });
});
