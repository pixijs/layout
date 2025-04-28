---
title: Text
hide_title: true
sidebar_position: 8
---

# Text

:::info **Important:**  
For text nodes, `objectFit` defaults to `'scale-down'`, not `'fill'`.  
This preserves the natural font sizing unless the text would otherwise overflow the layout box.
:::

Text in PixiJS Layout works slightly differently to all other leaf nodes in the library.

When using text nodes (`LayoutText`, `LayoutBitmapText`, `LayoutHTMLText`, `Text`, `BitmapText`, `HTMLText`), the text content can automatically **wrap** based on the layout box dimensions if `wordWrap` is enabled.

This allows for responsive text that fits within the layout box without manual adjustments.

If `wordWrap: true` is set on the text style the text automatically wraps onto multiple lines based on the layout box size.
This is similar to manually setting the `wordWrapWidth` property on the text style, but it is automatically calculated based on the layout box size.

```ts
const label = new LayoutText({
    text: 'This is a very long line that should wrap inside the box.',
    style: {
        fill: 0xffffff,
        wordWrap: true,
    },
    layout: {
        width: 250,
        height: 250,
    },
});
```
