---
title: Components
hide_title: true
sidebar_position: 3
---

## Built-in Components

The PixiJS Layout library includes ready-to-use components that combine PixiJS nodes with additional layout features.
All built-in components support:

- `backgroundColor`
- `borderColor`
- `borderRadius`
- `overflow` control (including scroll)

These components allow for a more CSS-like styling experience, enabling you to create more complex layouts with ease.

There are three categories of components:

- **LayoutContainer**: A flex container that can manage multiple children.
- **LayoutView-based components**: Single-child wrappers that apply layout to internal content.
- **Re-exported PixiJS components**: These are standard PixiJS objects that have been re-exported to ensure layout is applied correctly in the constructor.

---

## LayoutContainer API

`LayoutContainer` is a full flex container supporting:

- **Multiple children**: It manages its children according to flexbox rules such as `justifyContent`, `alignItems`, and `gap`.
- **Overflow**: Supports `hidden`, `scroll`, and `visible` overflow settings.
    - **Wheel & Touch support**: Smooth, physics-based scrolling is integrated through a Trackpad instance for `overflow: 'scroll'`.
- **Background and border rendering**: It can draw solid backgrounds, borders, and rounded corners based on style properties.
- **Custom background**: You can provide your own background object instead of the default `Graphics` object. See the **Custom Backgrounds** section below for more details.

### Example

```ts
import { LayoutContainer } from '@pixi/layout/components';

const container = new LayoutContainer({
    layout: {
        width: 300,
        height: 300,
        overflow: 'scroll',
        padding: 10,
        gap: 10,
        backgroundColor: 0x202020,
        borderColor: 0xffffff,
        borderRadius: 12,
    },
});

// Add multiple children freely
container.addChild(child1, child2, child3);
```

### LayoutContainerOptions

When creating a `LayoutContainer`, you can pass `LayoutContainerOptions`:

```ts
interface LayoutContainerOptions extends ContainerOptions {
    layout?: LayoutStyles;
    trackpad?: TrackpadOptions;
    background?: ContainerChild;
}
```

| Field        | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `layout`     | Layout styles to apply on creation (e.g., width, flex settings, padding). |
| `trackpad`   | Settings for scroll behavior (only relevant if `overflow: 'scroll'`).     |
| `background` | A custom PixiJS object to use as background instead of the default.       |

---

## LayoutView API

`LayoutView` is a lightweight single-child layout wrapper. It manages one object called the `slot`, which it applies layout rules to.

Several all PixiJS display objects have been wrapped in a `LayoutView` and exported. They automatically create and manage their internal slot:

| Component               | Description                      |
| ----------------------- | -------------------------------- |
| `LayoutSprite`          | A layout-aware `Sprite`          |
| `LayoutNineSliceSprite` | A layout-aware `NineSliceSprite` |
| `LayoutTilingSprite`    | A layout-aware `TilingSprite`    |
| `LayoutAnimatedSprite`  | A layout-aware `AnimatedSprite`  |
| `LayoutGifSprite`       | A layout-aware `GifSprite`       |
| `LayoutGraphics`        | A layout-aware `Graphics`        |
| `LayoutText`            | A layout-aware `Text`            |
| `LayoutBitmapText`      | A layout-aware `BitmapText`      |
| `LayoutHTMLText`        | A layout-aware `HTMLText`        |
| `LayoutMesh`,           | Mesh-based variations            |

Each of these behaves like its native PixiJS object, but with built-in layout sizing, positioning, and styling.

### Example

```ts
import { LayoutSprite, LayoutView } from '@pixi/layout/components';
import { Assets, Sprite } from 'pixi.js';

const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

const bunny = new LayoutSprite({
    texture,
    layout: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        backgroundColor: 0x444444,
        borderColor: 0xffffff,
        borderRadius: 8,
    },
});

// Or use the LayoutView directly
const bunny2 = new LayoutView({
    slot: new Sprite(texture),
    layout: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        backgroundColor: 0x444444,
        borderColor: 0xffffff,
        borderRadius: 8,
    },
});
```

### LayoutViewOptions

When creating a `LayoutView` or one of the PixiJS Layout objects, you can pass `LayoutViewOptions`:

```ts
interface LayoutViewOptions<T extends Container = Container> extends LayoutContainerOptions {
    slot?: T;
}
```

| Field        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `layout`     | Layout styles to apply.                                       |
| `trackpad`   | Scroll settings.                                              |
| `background` | A custom background object.                                   |
| `slot`       | The internal display object that will be managed by the view. |

---

## Custom Backgrounds

By default, `LayoutContainer` and `LayoutView` create an internal `Graphics` object to draw the background color, border, and rounded corners.

You can override this behavior by providing your own `background`:

```ts
import { LayoutContainer } from '@pixi/layout/components';
import { Sprite, Assets } from 'pixi.js';

const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

const container = new LayoutContainer({
    layout: { width: 300, height: 300 },
    background: new Sprite({ texture }),
});
```

**Important:**

- When a custom background is provided, automatic `backgroundColor`, `borderColor`, and `borderRadius` styling is disabled.
- The custom background will only be positioned and sized according to the layout rules.

The custom background is placed at the bottom of the display list behind the main content.

---

## Trackpad Customization

When `overflow: 'scroll'` is enabled, a **trackpad controller** is created automatically for smooth, physics-based scrolling.

Trackpad options you can configure include:

| Option              | Type            | Default        | Description                                                      |
| ------------------- | --------------- | -------------- | ---------------------------------------------------------------- |
| `maxSpeed`          | `number`        | `400`          | Maximum scrolling velocity in pixels per frame                   |
| `constrain`         | `boolean`       | `true`         | Whether to constrain scrolling within content bounds             |
| `disableEasing`     | `boolean`       | `false`        | Disable momentum scrolling/easing when releasing                 |
| `xEase`             | `ConstrainEase` | `ScrollSpring` | Custom easing for x-axis scrolling                               |
| `yEase`             | `ConstrainEase` | `ScrollSpring` | Custom easing for y-axis scrolling                               |
| `xConstrainPercent` | `number`        | `0`            | Percentage of overflow allowed when dragging beyond x-axis limit. Setting this value to a negative number disables x-axis scrolling entirely. |

| `yConstrainPercent` | `number`        | `0`            | Percentage of overflow allowed when dragging beyond y-axis limit. Setting this value to a negative number disables y-axis scrolling entirely. |


These options are passed when creating a `LayoutContainer` or `LayoutView`.

```ts
const container = new LayoutContainer({
    layout: {
        overflow: 'scroll',
    },
    trackpad: {
        // Maximum scrolling speed (pixels per frame)
        maxSpeed: 400,

        // Constrain scrolling within bounds
        constrain: true,

        // No x-axis scrolling allowed when dragging beyond bounds
        xConstrainPercent: -1,
        // No y-axis overflow allowed when dragging beyond bounds
        yConstrainPercent: 0,

        // Disable momentum/easing when releasing
        disableEasing: false,

        // Custom easing for x/y axes
        xEase: new ScrollSpring({
            max: 200, // Maximum velocity
            damp: 0.7, // Higher damping = less bounce
            springiness: 0.15, // Higher springiness = faster movement
        }),
        yEase: new ScrollSpring({
            // Custom y-axis spring settings
        }),
    },
});
```
