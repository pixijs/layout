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