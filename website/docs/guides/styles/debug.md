---
title: Debug
hide_title: true
sidebar_position: 9
---

## Debugging

PixiJS provides a debug renderer that can be used to visualize the layout of your application. This is useful for debugging layout issues and understanding how your layout is structured.

See the [Debug Renderer](../core//layout-system.md#enabling-debug-renderer) section for more information on how to enable the debug renderer.

Once enabled, the following properties will be available on all layout-enabled nodes:

| Property           | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `debugHeat`        | Enables or disables the debug heatmap for this node. Useful for visualizing the layout performance. |
| `debug`            | Enables or disables the debug renderer for this node.                                               |
| `debugDrawMargin`  | Enables or disables the debug margin for this node.                                                 |
| `debugDrawPadding` | Enables or disables the debug padding for this node.                                                |
| `debugDrawBorder`  | Enables or disables the debug border for this node.                                                 |
| `debugDrawFlex`    | Enables or disables the debug flex for this node.                                                   |
| `debugDrawContent` | Enables or disables the debug content for this node.                                                |
