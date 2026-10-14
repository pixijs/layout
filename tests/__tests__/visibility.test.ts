import { Application, Container, Sprite, Texture } from 'pixi.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import '../../src/index';

async function createApp() {
    const app = new Application();

    await app.init();

    return app;
}

describe('visibility', async () => {
    let app: Application;

    beforeEach(async () => {
        app = await createApp();
    });

    afterEach(() => {
        app.destroy(true);
    });

    it('should render a visible sprite', async () => {
        const stage = app.stage;
        const sprite = new Sprite(Texture.WHITE);
        const sprite2 = new Sprite(Texture.WHITE);
        const sprite3 = new Sprite(Texture.WHITE);

        stage.layout = {};
        stage.addChild(sprite);
        stage.addChild(sprite2);
        stage.addChild(sprite3);

        sprite.layout = {};
        sprite2.layout = {};
        sprite3.layout = {};

        const stageYoga = stage.layout!.yoga;
        const spriteYoga = sprite.layout!.yoga;
        const sprite2Yoga = sprite2.layout!.yoga;
        const sprite3Yoga = sprite3.layout!.yoga;

        expect(stageYoga.getChildCount()).toBe(3);
        expect(stageYoga.getChild(0)).toStrictEqual(spriteYoga);
        expect(stageYoga.getChild(1)).toStrictEqual(sprite2Yoga);
        expect(stageYoga.getChild(2)).toStrictEqual(sprite3Yoga);

        // Set visibility to hidden
        sprite.visible = false;
        expect(stageYoga.getChildCount()).toBe(2);
        expect(stageYoga.getChild(0)).toStrictEqual(sprite2Yoga);
        expect(stageYoga.getChild(1)).toStrictEqual(sprite3Yoga);

        // add back the sprite
        sprite.visible = true;
        expect(stageYoga.getChildCount()).toBe(3);
        expect(stageYoga.getChild(0)).toStrictEqual(spriteYoga);
        expect(stageYoga.getChild(1)).toStrictEqual(sprite2Yoga);
        expect(stageYoga.getChild(2)).toStrictEqual(sprite3Yoga);
    });

    it('should not add an invisible sprite to the layout', async () => {
        const stage = app.stage;
        const sprite = new Sprite(Texture.WHITE);
        const sprite2 = new Sprite(Texture.WHITE);

        stage.layout = {};
        sprite.visible = false;
        sprite.layout = {};

        stage.addChild(sprite2);

        // expect add child to not throw an error
        expect(() => {
            stage.addChildAt(sprite, 0);
        }).not.toThrow();
    });

    it('should install the visible override once', async () => {
        const getVisibleSetter = () => Object.getOwnPropertyDescriptor(Container.prototype, 'visible')!.set;
        const container = new Container();
        const container2 = new Container();
        const container3 = new Container();

        container.layout = {};
        const visibleSetter = getVisibleSetter();

        container2.layout = {};
        container3.layout = {};
        expect(getVisibleSetter()).toBe(visibleSetter);

        // removing one layout must not remove the override used by the others
        container.layout = null;
        expect(getVisibleSetter()).toBe(visibleSetter);

        container.destroy();
        container2.destroy();
        container3.destroy();
    });

    it('should update the layout on visibility change after another layout is removed', async () => {
        const stage = app.stage;
        const sprite = new Sprite(Texture.WHITE);
        const sprite2 = new Sprite(Texture.WHITE);
        const other = new Container();

        stage.layout = {};
        stage.addChild(sprite);
        stage.addChild(sprite2);

        sprite.layout = {};
        sprite2.layout = {};
        other.layout = {};

        // remove the layout from a container that is unrelated to the stage
        other.layout = null;

        const stageYoga = stage.layout!.yoga;
        const spriteYoga = sprite.layout!.yoga;
        const sprite2Yoga = sprite2.layout!.yoga;

        // Set visibility to hidden
        sprite.visible = false;
        expect(stageYoga.getChildCount()).toBe(1);
        expect(stageYoga.getChild(0)).toStrictEqual(sprite2Yoga);

        // add back the sprite
        sprite.visible = true;
        expect(stageYoga.getChildCount()).toBe(2);
        expect(stageYoga.getChild(0)).toStrictEqual(spriteYoga);
        expect(stageYoga.getChild(1)).toStrictEqual(sprite2Yoga);

        other.destroy();
    });
});
