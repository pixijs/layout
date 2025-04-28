---
title: Margins, Padding and Borders
hide_title: true
sidebar_position: 3
---

## Margins

Margins create **space outside** a node's border box. They push the node away from adjacent siblings and its parent container.

You can define margins globally or for individual sides:

| Property       | Description                          |
| -------------- | ------------------------------------ |
| `margin`       | Sets margin on all sides equally.    |
| `marginTop`    | Sets margin on the top side only.    |
| `marginBottom` | Sets margin on the bottom side only. |
| `marginLeft`   | Sets margin on the left side only.   |
| `marginRight`  | Sets margin on the right side only.  |

```ts
// 10px margin on all sides
sprite.layout = {
    margin: 10,
};

// Different margins for each side
sprite.layout = {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 15,
};
```

---

## Padding

Padding creates **space inside** a node's border box, between the border and the node’s internal content.

You can define padding globally or for individual sides:

| Property        | Description                           |
| --------------- | ------------------------------------- |
| `padding`       | Sets padding on all sides equally.    |
| `paddingTop`    | Sets padding on the top side only.    |
| `paddingBottom` | Sets padding on the bottom side only. |
| `paddingLeft`   | Sets padding on the left side only.   |
| `paddingRight`  | Sets padding on the right side only.  |

```ts
// 12px padding on all sides
container.layout = {
    padding: 12,
};

// Different padding for each side
container.layout = {
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 4,
    paddingRight: 4,
};
```

---

## Borders

In PixiJS Layout the impact of borders changes depending on whether you are using one of the built-in layout containers or a regular PixiJS object.

If you are using a regular PixiJS object, `borderWidth` will be applied as if it were padding, but is not visually represented. This means that the border will not be drawn, but it will still affect the layout.

If you are using a built-in layout container, the border will be drawn, provided you also set `borderColor`.

:::warning **Important:**
Currently, setting individual border widths (like `borderTopWidth`) will not be visually represented. A single `borderWidth` property is used for all sides.
This is a known limitation and will be addressed in future updates.
:::

| Property            | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `borderWidth`       | Sets the width of the border on all sides.                   |
| `borderTopWidth`    | Sets the top border width.                                   |
| `borderBottomWidth` | Sets the bottom border width.                                |
| `borderLeftWidth`   | Sets the left border width.                                  |
| `borderRightWidth`  | Sets the right border width.                                 |
| `borderColor`       | Sets the color of the border. (Required for it to be drawn.) |
| `borderRadius`      | Sets the radius of the border.                               |

```ts
// 2px border on all sides
container.layout = {
    borderWidth: 2,
    borderColor: 0x000000,
};
// Different border for each side
container.layout = {
    borderTopWidth: 2,
    borderBottomWidth: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
};
// 10px border radius
container.layout = {
    borderRadius: 10,
    borderColor: 0x000000,
    borderWidth: 2,
};
```

---

## Shorthand vs Longhand

Setting `margin` or `padding` applies the value uniformly to all sides. However, you can also specify individual sides for more control afterwards. If both shorthand and longhand properties are set, the longhand values will override the shorthand.

```ts
sprite.layout = {
    margin: 10, // Apply 10px to all sides first
    marginTop: 20, // Then override just the top side with 20px
};
```

Result: 20px top margin, 10px everywhere else.
