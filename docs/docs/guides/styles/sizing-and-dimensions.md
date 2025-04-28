---
title: Sizing and Dimensions
hide_title: true
sidebar_position: 1
---

## Sizing and Dimensions

A fundamental aspect of layout is **sizing**. It determines how much space a node occupies in the layout and how it interacts with other nodes.

In PixiJS Layout, sizing is managed by the Yoga layout engine, which provides a powerful and flexible system for controlling dimensions.

In general, all size-related properties accept the following types of values:

- **Pixel numbers** (e.g., `width: 200`)
- **Percentage strings** (e.g., `width: '50%'`)
- **Auto sizing** (e.g., `width: 'auto'`)
- **Intrinsic sizing** (e.g., `width: 'intrinsic'`)
    - This is a special value that uses the PixiJS bounds of the object to determine its size. See the section on intrinsic sizing below for more details.

### Intrinsic Sizing

Before we dive into the details of sizing, it’s important to understand the concept of **intrinsic sizing**.
Intrinsic sizing allows a node to automatically adjust its size based on its content or children.

In PixiJS Layout, intrinsic sizing is enabled by default for all **leaf nodes**. This means that if you set the `layout` property to `true`, the node will automatically size itself based on its content.

```ts
sprite.layout = true;
// This is equivalent to:
sprite.layout = {
    width: 'intrinsic',
    height: 'intrinsic',
};
```

Intrinsic sizing does have a **performance impact** as we check the bounds of the node periodically, based on the `throttle` value passed into the `LayoutSystem` . This is not a problem for most use cases, but if you are using a lot of nodes, you may want to consider using fixed sizes instead.

```ts
sprite.layout = {
    width: texture.width,
    height: texture.height,
};
```

---

## Width and Height

The `width` and `height` properties define the size of the node's **border box** — meaning the total area including content, padding, and border.

| Property | Description                      |
| -------- | -------------------------------- |
| `width`  | Width of the node's border box.  |
| `height` | Height of the node's border box. |

```tsx
container.layout = {
    width: 300, // 300 pixels wide
    height: '50%', // 50% of parent container's height
};
```

---

## Min/Max Constraints

The `minWidth`, `minHeight`, `maxWidth`, and `maxHeight` properties define strict boundaries for the node’s size.

:::info **Important:**  
Min and max constraints have **higher priority** than other sizing properties.  
No matter what flex rules or intrinsic content sizes are calculated, these constraints will always be respected.
:::

| Property    | Description                            |
| ----------- | -------------------------------------- |
| `minWidth`  | Minimum width the node can shrink to.  |
| `minHeight` | Minimum height the node can shrink to. |
| `maxWidth`  | Maximum width the node can expand to.  |
| `maxHeight` | Maximum height the node can expand to. |

```ts
sprite.layout = {
    width: '100%',
    minWidth: 200,
    maxWidth: 500,
};
```

---

## Aspect Ratio

The `aspectRatio` property defines as the ratio between the node’s width and height.

:::info **Important:**

- Has **higher priority** than flex grow/shrink calculations.
- If both width and height are explicitly set, the aspect ratio will adjust the dimension along the cross axis to maintain the ratio unless min/max constraints block it.
- Respects min and max dimensions.

:::

| Property      | Description                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `aspectRatio` | A positive floating-point number representing the ratio of width to height (e.g., `1.5` for 3:2 ratio). |

```ts
sprite.layout = {
    width: 200,
    aspectRatio: 1.5,
};

sprite.layout = {
    height: 200,
    aspectRatio: 2,
};
```