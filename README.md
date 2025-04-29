<p align="center">
  <a href="https://pixijs.com" target="_blank" rel="noopener noreferrer">
    <img height="150" src="./.github/logo-dark.svg" alt="PixiJS logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/@pixi/layout"><img src="https://img.shields.io/npm/v/@pixi/layout.svg" alt="npm package"></a>
  <a href="https://opencollective.com/pixijs/tiers/badge.svg"><img src="https://opencollective.com/pixijs/tiers/badge.svg" alt="Open Collective"></a>
  <a href="https://discord.gg/QrnxmQUPGV"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>
<p align="center">
 <a href="https://layout.pixijs.io/docs/guides/guide/quick-start/">Getting Started</a> | <a href="https://layout.pixijs.io/docs/examples/align-content/">Examples</a> | <a href="https://discord.gg/QrnxmQUPGV">Discord</a>
</p>

# PixiJS Layout 🧩
> A Yoga powered layout library for PixiJS.

Features
- 📐 Yoga-Powered Flexbox Layout:
  Built on top of Facebook’s Yoga engine, enabling powerful and predictable flexbox layouting for 2D interfaces.

- 📦 Supports all PixiJS Objects:
  Such as Container, Sprite, Graphics, Text, etc. to deliver responsive, visually rich UI components.

- 🧠 Simple and Intuitive API:
  Designed with usability in mind, declare your layouts using familiar properties with minimal boilerplate.

- 🎯 Advanced Styling Support:
  Includes support for styling properties like objectFit, objectPosition, overflow, backgroundColor, and borderRadius, bringing web-style flexibility to canvas UIs.

- 🤝 Compatible with PixiJS React:
  Easily integrates with PixiJS React, allowing you to combine layout and interactivity in React environments.

### Setup

It's easy to get started with PixiJS Layout! Just install the package with your package manager of choice

```bash
# with pnpm
pnpm add @pixi/layout

# with yarn
yarn add @pixi/layout

# with npm
npm install @pixi/layout
```

### Usage
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
### Contribute

Want to be part of the PixiJS Layout project? Great! All are welcome! We will get there quicker
together :) Whether you find a bug, have a great feature request, or you fancy owning a task
from the road map above, feel free to get in touch.

Make sure to read the [Contributing Guide](.github/CONTRIBUTING.md)
before submitting changes.

### License

This content is released under the [MIT License](http://opensource.org/licenses/MIT).

### Change Log
[Releases](https://github.com/pixijs/layout/releases)

### Support
We're passionate about making PixiJS the best graphics library possible. Our dedication comes from our love for the project and community. If you'd like to support our efforts, please consider contributing to our open collective.
<div>
  <a href="https://opencollective.com/pixijs" target="_blank">
    <img src="https://opencollective.com/pixijs/donate/button@2x.png?color=blue" width=200 />
  </a>
</div>
