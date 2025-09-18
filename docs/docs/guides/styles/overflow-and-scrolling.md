---
title: Overflow
hide_title: true
sidebar_position: 5
---

## Overflow

:::warning **Important!**
Overflow and scrolling features are only available for **LayoutContainer** and **LayoutView** components.

See the [Layout Components](../core/components.md) guide for more details.
:::

Overflow controls how a node handles content that exceeds its layout bounds.  
In PixiJS Layout, overflow settings determine whether content is clipped, allowed to scroll, or simply left visible.

Possible overflow behaviors:

| Value     | Description                                     |
| --------- | ----------------------------------------------- |
| `visible` | Content outside bounds is shown (default).      |
| `hidden`  | Content is clipped to the bounds. No scrolling. |
| `scroll`  | Content is clipped, and scrolling is enabled.   |

```ts
const container = new LayoutContainer({
    layout: {
        overflow: 'scroll', // default
    },
});
```

## Customizing Scrolling Behavior

When using `overflow: 'scroll'`, you can customize the scrolling behavior by passing `trackpad` options to the [`LayoutContainer`](../core/components.md#layoutcontainer-api).

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

See the [Trackpad Customization](../core/components.md#trackpad-customization) section for more details on available options.