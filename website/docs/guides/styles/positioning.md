---
title: Positioning
hide_title: true
sidebar_position: 3
---

## Positioning

In PixiJS Layout, positioning determines how a node is placed within its container.  
You can control how an object participates in the flex flow, or opt to position it independently using absolute or inset positioning.

## Position Types

There are three available `position` types:

| Position             | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `relative` (default) | The node participates in the normal flex flow.<br/>**Insets** (`top`, `left`, `right`, `bottom`) move it relative to its computed flexbox position. |
| `absolute`           | The node is removed from the flex flow. It does not affect siblings. Insets position it relative to its containing block.                           |
| `static`             | The node behaves like `relative`, but **ignores** all insets.                                                                                       |

```ts
sprite.layout = {
    position: 'absolute',
};
```

---

## Using Insets (Top, Left, Bottom, Right)

Insets allow you to adjust a node’s location based on its position type 

| value    | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| `left`   | The inset from the left edge of the container.                                |
| `top`    | The inset from the top edge of the container.                                 |
| `right`  | The inset from the right edge of the container.                               |
| `bottom` | The inset from the bottom edge of the container.                              |
| `start`  | The inset from the start edge of the container (left for LTR, right for RTL). |
| `end`    | The inset from the end edge of the container (right for LTR, left for RTL).   |

```ts
sprite.layout = {
    position: 'relative',
    left: 20,
    top: 10,
};
```
```ts
sprite.layout = {
    position: 'absolute',
    left: 0,
    top: 0,
};
```

---

## Handling Opposite Insets

If you set both opposing insets (e.g., `left` and `right` or `top` and `bottom`):

- The **start inset has priority** (`left` over `right`, `top` over `bottom`) when positioning.
- If the node has a **fixed width or height**, the opposing insets define alignment relative to the container.
- If width/height are flexible, layout may stretch or shrink the node.
