import { Application, Container } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LayoutContainer } from '../../src/components/LayoutContainer';
import '../../src/index';

export async function createApp() {
    const app = new Application();

    await app.init();

    return app;
}

describe('LayoutContainer', async () => {
    let app: Application;

    beforeEach(async () => {
        app = await createApp();
    });

    afterEach(() => {
        app.destroy(true);
    });

    it.only('should have the correct sized hit area', async () => {
        const stage = app.stage;
        const container = new LayoutContainer({
            layout: { width: 100, height: 100, overflow: 'scroll' },
        });

        stage.addChild(container);

        app.render();
        expect(container['isPointWithinBounds'](50, 50)).toBe(true);
        expect(container['isPointWithinBounds'](150, 150)).toBe(false);
        expect(container['isPointWithinBounds'](-50, -50)).toBe(false);
        expect(container['isPointWithinBounds'](0, 0)).toBe(true);
        expect(container['isPointWithinBounds'](99.9, 99.9)).toBe(true);
        expect(container['isPointWithinBounds'](100.1, 100.1)).toBe(false);
    });
});

describe('LayoutContainer method bindings', () => {
    let container: LayoutContainer;
    let child1: Container;
    let child2: Container;

    let app: Application;

    beforeEach(async () => {
        app = await createApp();
        container = new LayoutContainer();
        child1 = new Container();
        child2 = new Container();
    });

    afterEach(() => {
        app.destroy(true);
        container.destroy();
        child1.destroy();
        child2.destroy();
    });

    it('should preserve original addChild method and bind to overflowContainer', () => {
        // Test original method preservation
        expect(container.containerMethods.addChild).toBeDefined();

        // Test binding to overflowContainer
        container.addChild(child1);
        expect(container.overflowContainer.children).toContain(child1);
        expect(container.children).not.toContain(child1);
        container.containerMethods.addChild(child2);
        expect(container.children).toContain(child2);
        expect(container.overflowContainer.children).not.toContain(child2);
    });

    it('should preserve original addChildAt method and bind to overflowContainer', () => {
        container.addChild(child1);
        container.addChildAt(child2, 0);

        expect(container.overflowContainer.getChildAt(0)).toBe(child2);
        expect(container.overflowContainer.getChildAt(1)).toBe(child1);
        container.containerMethods.addChildAt(child1, 0);
        expect(container.containerMethods.getChildAt(0)).toBe(child1);
        expect(container.getChildAt(0)).toBe(child2);
    });

    it('should preserve original removeChild method and bind to overflowContainer', () => {
        container.addChild(child1);
        container.removeChild(child1);

        expect(container.overflowContainer.children).not.toContain(child1);
        container.containerMethods.addChild(child1);
        container.containerMethods.removeChild(child1);
        expect(container.overflowContainer.children).not.toContain(child1);
        expect(container.children).not.toContain(child1);
    });

    it('should preserve original getChildAt method and bind to overflowContainer', () => {
        container.addChild(child1, child2);

        expect(container.getChildAt(0)).toBe(child1);
        expect(container.getChildAt(1)).toBe(child2);
    });

    it('should preserve original getChildIndex method and bind to overflowContainer', () => {
        container.addChild(child1, child2);

        expect(container.getChildIndex(child2)).toBe(1);
    });

    it('should preserve original setChildIndex method and bind to overflowContainer', () => {
        container.addChild(child1, child2);
        container.setChildIndex(child2, 0);

        expect(container.getChildAt(0)).toBe(child2);
    });

    it('should preserve original removeChildren method and bind to overflowContainer', () => {
        container.addChild(child1, child2);
        container.removeChildren();

        expect(container.overflowContainer.children.length).toBe(0);
    });

    it('should preserve original sortChildren method binding', () => {
        container.addChild(child1, child2);

        expect(() => container.sortChildren()).not.toThrow();
    });

    it('should preserve original swapChildren method and bind to overflowContainer', () => {
        container.addChild(child1, child2);
        container.swapChildren(child1, child2);

        expect(container.getChildAt(0)).toBe(child2);
        expect(container.getChildAt(1)).toBe(child1);
    });

    it('should preserve original getChildByLabel method and bind to overflowContainer', () => {
        child1.label = 'testLabel';
        container.addChild(child1);

        expect(container.getChildByLabel('testLabel')).toBe(child1);
    });

    it('should preserve original getChildrenByLabel method and bind to overflowContainer', () => {
        child1.label = 'testLabel';
        child2.label = 'testLabel';
        container.addChild(child1, child2);

        const labeledChildren = container.getChildrenByLabel('testLabel');

        expect(labeledChildren).toContain(child1);
        expect(labeledChildren).toContain(child2);
    });

    it('should attach child to new parent when layout is enabled', () => {
        const parentContainer = new LayoutContainer();

        parentContainer.addChild(container);
        container.addChild(child1);
        child1.addChild(child2);

        child2.layout = true;
        expect(child2.layout!.yoga.getParent()).toBe(null);

        child1.layout = true;
        const parent = child2.layout!.yoga.getParent()!;

        expect((parent as any).M.O).toBe((child1.layout!.yoga as any).M.O);
    });
});
