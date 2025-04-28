---
title: Background
hide_title: true
sidebar_position: 7
---

## Background

:::warning **Important!**
The background feature is only available for **LayoutContainer** and **LayoutView** components.

See the [Layout Components](../core/components.md) guide for more details.
:::

PixiJS Layout supports simple background color fills and [custom backgrounds](../core/components.md#custom-backgrounds) for containers and views.

| Property          | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `backgroundColor` | Fill color for the background area of the node. The background will be rounded if `borderRadius` is set. |

```ts
container.layout = {
    backgroundColor: 0x333333,
};
```
