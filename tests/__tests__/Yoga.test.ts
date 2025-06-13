import { Application } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ExperimentalFeature } from 'yoga-layout/load';
import { getYoga, getYogaConfig, setYogaConfig } from '../../src/index';

async function createApp() {
    const app = new Application();

    await app.init();

    return app;
}

describe('Yoga', async () => {
    let app: Application;

    beforeEach(async () => {
        app = await createApp();
    });

    afterEach(() => {
        app.destroy(true);
    });

    it('should create a default yoga config', async () => {
        const config = getYogaConfig();

        expect(config).toBeDefined();
        expect(config.isExperimentalFeatureEnabled(ExperimentalFeature.WebFlexBasis)).toBe(false);
    });

    it('should allow users to set a custom yoga config', async () => {
        const config = getYoga().Config.create();

        config.setExperimentalFeatureEnabled(ExperimentalFeature.WebFlexBasis, true);
        setYogaConfig(config);
        expect(getYogaConfig()).toBe(config);
        expect(getYogaConfig().isExperimentalFeatureEnabled(ExperimentalFeature.WebFlexBasis)).toBe(true);

        const spy = vi.spyOn(getYoga().Node, 'create');

        app.stage.layout = {};
        expect(spy).toHaveBeenCalledWith(config);
        spy.mockRestore();
    });
});
