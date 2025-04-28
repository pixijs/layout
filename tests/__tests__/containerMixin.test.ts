import { Container } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Layout } from '../../src/core/Layout';
import '../../src/index';

vi.mock('../../src/core/Layout', () => ({
    Layout: vi.fn().mockImplementation((options) => {
        return {
            ...options,
            setStyle: vi.fn(),
            destroy: vi.fn(),
            _onChildAdded: vi.fn(),
            _onChildRemoved: vi.fn(),
        };
    }),
}));

describe('layout getter/setter', () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
        vi.clearAllMocks();
    });

    afterEach(() => {
        container.destroy();
    });

    it('should return null when no layout is set', () => {
        expect(container.layout).toBeNull();
    });

    it('should create a new Layout when layout is set for the first time', () => {
        container.layout = { width: 100, height: 100 };

        expect(Layout).toHaveBeenCalledWith({ target: container });
        expect(container.layout).not.toBeNull();
        expect(container._layout!.setStyle).toHaveBeenCalledWith({ width: 100, height: 100 });
    });

    it('should accept empty object when layout is set to true', () => {
        container.layout = true;

        expect(Layout).toHaveBeenCalledWith({ target: container });
        expect(container._layout!.setStyle).toHaveBeenCalledWith({});

        container.layout = false; // Reset layout to false
        expect(container.layout).toBeNull();
        expect(container._layout).toBeNull();
    });

    it('should update existing layout when layout is updated', () => {
        container.layout = { width: 100 };
        vi.clearAllMocks();

        container.layout = { height: 200 };

        expect(Layout).not.toHaveBeenCalled(); // Should reuse existing layout
        expect(container._layout!.setStyle).toHaveBeenCalledWith({ height: 200 });
    });

    it('should destroy layout when set to null', () => {
        container.layout = { width: 100 };
        vi.clearAllMocks();

        const layoutInstance = container._layout;

        container.layout = null;
        expect(layoutInstance!.destroy).toHaveBeenCalled();
        expect(container._layout).toBeNull();
    });
});
