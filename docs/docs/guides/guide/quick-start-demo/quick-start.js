import { Application, Assets, Container, Sprite } from 'pixi.js';
// import the library before creating your pixi application to ensure all mixins are applied
import '/layout';

(async () => {
    // Create a new application
    const app = new Application();

    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    // Create a new layout for the stage that will fill the entire screen
    // and center the content
    app.stage.layout = {
        width: app.screen.width,
        height: app.screen.height,
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Create and add a container to the stage that will be used to hold the bunnies
    // The container will be centered in the stage and will have a gap of 4 pixels
    // between the bunnies
    // The container will also wrap the bunnies if there are too many to fit in a single row
    const container = new Container({
        layout: {
            width: '80%',
            height: '80%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            flexWrap: 'wrap',
            gap: 4,
        },
    });

    app.stage.addChild(container);

    // Create a grid of bunny sprites
    for (let i = 0; i < 50; i++) {
        // Create a bunny Sprite and enable layout
        // The width/height of the bunny will be the size of the texture by default
        const bunny = new Sprite({ texture, layout: true });

        // Add the bunny to the container
        container.addChild(bunny);
    }

    // Listen for animate update
    app.ticker.add((time) => {
        // Rotating a container that is in layout will not cause the layout to be recalculated
        container.rotation += 0.01 * time.deltaTime;
    });
})();
