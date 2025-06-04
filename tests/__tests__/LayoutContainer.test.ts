import { Application, type Rectangle } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LayoutContainer } from '../../src/components';
import '../../src/index';

async function createApp() {
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

    it('should have the correct sized hit area', async () => {
        const stage = app.stage;
        const container = new LayoutContainer({
            layout: { width: 100, height: 100 },
        });

        stage.addChild(container);

        app.render();

        expect((container.hitArea! as Rectangle).width).toBe(100);
        expect((container.hitArea! as Rectangle).height).toBe(100);
    });
});
