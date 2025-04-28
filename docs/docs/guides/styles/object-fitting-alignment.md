---
title: Object Fitting and Alignment
hide_title: true
sidebar_position: 6
---

## Object Fit

:::info **Important!**
`objectFit` only applies to leaf nodes
:::

The `objectFit` property defines **how an object (like a Sprite, Text, or Graphics)** is resized to fit inside its layout box.

| Value        | Description                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `contain`    | Scale the object as large as possible while keeping its aspect ratio and fitting entirely inside the container. |
| `cover`      | Scale the object to completely cover the container while maintaining aspect ratio. Some parts may be clipped.   |
| `fill`       | Stretch the object to exactly fill the container. Aspect ratio may be distorted.                                |
| `none`       | No scaling. The object retains its original size.                                                               |
| `scale-down` | Same as `none` or `contain`, whichever results in a smaller object.                                             |

```ts
sprite.layout = {
    width: 200,
    height: 200,
    objectFit: 'contain',
};
```

---

## Object Position

:::info **Important!**
`objectPosition` only applies to leaf nodes
:::

The `objectPosition` property defines **where the object is anchored** inside its layout box after scaling.

It accepts:

- Simple keywords like `'center'`, `'top left'`, `'bottom right'`
- More advanced four-part values like `'bottom 10px right 20px'`

This allows very fine-grained control over content alignment inside the layout box.

### Common keywords

| Value          | Description                                   |
| -------------- | --------------------------------------------- |
| `center`       | Center horizontally and vertically (default). |
| `top`          | Center horizontally, align to top.            |
| `bottom`       | Center horizontally, align to bottom.         |
| `left`         | Center vertically, align to left.             |
| `right`        | Center vertically, align to right.            |
| `top left`     | Align to top-left corner.                     |
| `top right`    | Align to top-right corner.                    |
| `bottom left`  | Align to bottom-left corner.                  |
| `bottom right` | Align to bottom-right corner.                 |

### Advanced syntax: side plus pixel offset

You can specify up to four parts like:

```ts
sprite.layout = {
    objectPosition: 'bottom 10px right 20px',
};
```

Meaning:

- Offset 10px inward from the bottom.
- Offset 20px inward from the right.

---

## Transform Origin

The `transformOrigin` property defines the **pivot point for rotation and scaling**, but applies to the **layout box**, not the PixiJS element itself. This behavior is conceptually similar to `transform-origin` in CSS.

For the full breakdown of how it works, see the [Transform Origin](../core/concepts/transform-origin.md) guide.

It accepts:

- Simple keywords like `'center'`, `'top left'`, `'bottom right'`
- Four-part values like `'top 0px left 50px'` for fine-grained offsetting.

### Common keywords

| Value                                    | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `'center'` (default)                     | Center of the layout box.                |
| `'top left'`, `'top right'`              | Corners.                                 |
| `'bottom left'`, `'bottom right'`        | Corners.                                 |
| `'top'`, `'bottom'`, `'left'`, `'right'` | Edges, centered along the opposite axis. |

### Advanced syntax: side plus pixel offset

```ts
sprite.layout = {
    transformOrigin: 'top 0px left 50px',
};
```

Meaning:

- Pivot 0px from top.
- Pivot 50px from left.