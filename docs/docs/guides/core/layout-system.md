---
title: LayoutSystem API
hide_title: true
sidebar_position: 2
---

## Layout System API

The `LayoutSystem` integrates layout management into the PixiJS rendering lifecycle.
It ensures that layouts are continuously updated, recalculated when necessary, and optionally visualized with debug tools.

## Initializing the LayoutSystem

The `LayoutSystem` must be installed into your PixiJS application to manage layouts automatically.
During initialization, you can pass `LayoutSystemOptions` to control its behavior.

Example setup:

```ts
import '@pixi/layout'; // required to ensure all systems and mixins are registered
import { Application } from 'pixi.js';
import { LayoutSystem } from '@pixi/layout';

const app = new Application();

await app.init({
    background: '#1099bb',
    resizeTo: window,
    layout: {
        autoUpdate: true,
        enableDebug: false,
        throttle: 100,
    },
});

// can later be accessed via app.renderer.layout
const layoutSystem = app.renderer.layout;
```

### LayoutSystemOptions

The `LayoutSystemOptions` interface looks like this:

```ts
interface LayoutSystemOptions {
    autoUpdate?: boolean;
    enableDebug?: boolean;
    debugModificationCount?: number;
    throttle?: number;
}
```

Each option:

| Option                 | Type    | Description                                                                                                                                                                                                           |
| ---------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoUpdate             | boolean | If `true`, the layout system will automatically recalculate layouts on each frame. Set `false` if you prefer manual updates                                                                                           |
| enableDebug            | boolean | If `true`, the debug renderer is activated at startup to visualize layout boxes. Note that you should only enable this on development builds.                                                                         |
| debugModificationCount | number  | The number of times a node must be modified before the debug renderer will show the layout boxes. This is useful for performance optimization. Default is `0`, meaning it will show immediately. |
| throttle               | number  | The delay (in milliseconds) to batch layout size recalculations for better performance. Default is `100ms`. This is useful for reducing the number of recalculations during rapid changes.                            |

## Continuous Layout Updates

When `autoUpdate` is enabled, the LayoutSystem hooks into the `prerender` phase of the PixiJS lifecycle.

Each frame, the system:

- Traverses the scene graph recursively.
- Finds nodes with an active layout.
- Checks if any node needs to update its layout.
- Applies recalculated transforms if needed.
- Optionally renders debug overlays.

Additionally, layout recalculations are throttled to avoid expensive recalculations every frame, especially for size changes involving intrinsic content (`width: 'intrinsic'`).

## Enabling Debug Renderer

The LayoutSystem can optionally render layout regions for debugging.
The debug renderer draws margin, border, padding, flex, and content areas in different colors.

To enable at runtime:

```ts
app.renderer.layout.enableDebug(true);
```

To disable:

```ts
app.renderer.layout.enableDebug(false);
```

If `enableDebug` was passed in `LayoutSystemOptions`, the debug renderer will activate automatically.

When active, the debug overlay is drawn into a special container (`DebugRenderer.holder`) attached to the stage.

:::info
The `enableDebug` method is asynchronous and returns a promise. This is because we dynamically load the debug renderer module to keep the core bundle size small.

You typically do not need to `await` this method as the debug renderer will be enabled in the next frame.
However, if you need to ensure the debug renderer is ready before performing other operations, you can `await` it.
:::

## Manually Triggering Layout Recalculations

If you disabled `autoUpdate`, or if you want to manually control when layouts are recalculated, you can call:

```ts
app.renderer.layout.update(app.stage); // or any other container if you want to update a specific part of the scene graph
```

This will update only the given object and its children (if they have layouts).
