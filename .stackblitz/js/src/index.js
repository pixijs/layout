import { Application, Assets, Sprite } from 'pixi.js';
import { LayoutContainer } from '@pixi/layout/components';
import '@pixi/layout';

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    app.stage.layout = {
        width: app.screen.width,
        height: app.screen.height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    };
    app.renderer.on('resize', () => {
        app.stage.layout = {
            width: app.screen.width,
            height: app.screen.height,
        };
    });

    // Create and add a container to the stage
    const container = new LayoutContainer({
        layout: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            backgroundColor: '#ffffff',
            borderWidth: 2,
            borderColor: '#000000',
        },
    });

    app.stage.addChild(container);

    // Load the bunny texture
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    // Create a 5x5 grid of bunnies in the container
    for (let i = 0; i < 20; i++) {
        const bunny = new Sprite({
            texture,
            layout: true,
        });

        container.addChild(bunny);
    }

    // Listen for animate update
    app.ticker.add((time) => {
        // Continuously rotate the container!
        // * use delta to create frame-independent transform *
        container.rotation -= 0.01 * time.deltaTime;
    });
})();
