---
title: Quick Start
hide_title: true
sidebar_position: 0
---
## Quick Start

If you have an existing PixiJS project, you can add the layout plugin to your project by running:

```bash
# with pnpm
pnpm add @pixi/layout
# with yarn
yarn add @pixi/layout
# with npm
npm install @pixi/layout
```

## Usage

To start using the layout plugin, you need to import it before creating your PixiJS application. This ensures that all mixins are applied correctly.

Then you can create a new PixiJS application and set up your layout using the `layout` property on your containers.

```typescript
// import the library before creating your pixi application to ensure all mixins are applied
import "@pixi/layout";
import { Application, Assets, Container, Sprite } from "pixi.js";

(async () =>
{
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
    }

    // Create and add a container to the stage that will be used to hold the bunnies
    // The container will be centered in the stage and will have a gap of 10 pixels
    // between the bunnies
    // The container will also wrap the bunnies if there are too many to fit in a single row
    const container = new Container({layout: {
        width: '80%',
        height: '80%',
        gap: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    }});

    app.stage.addChild(container);

    // Create a grid of bunny sprites
    for (let i = 0; i < 10; i++)
    {
        // Create a bunny Sprite and enable layout
        // The width/height of the bunny will be the size of the texture by default
        const bunny = new Sprite({ texture, layout: true });

        // Add the bunny to the container
        container.addChild(bunny);
    }

    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Rotating a container that is in layout will not cause the layout to be recalculated
        container.rotation += 0.1 * time.deltaTime;
    });
})();
```
