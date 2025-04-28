---
title: Opt-in Layout
hide_title: true
sidebar_position: 3
---

## Opt-in Layout By Default

One of the defining strengths of PixiJS Layout is its **non-invasive**, **opt-in** design. Layout logic is only applied when explicitly requested. This enables seamless integration into existing PixiJS projects and flexibility:

- A parent will only apply layout to children that **have layout enabled** (`layout` property).
- Children without layout are **unaffected** and behave just like standard PixiJS objects.
- This makes the system safe by default and easy to adopt incrementally.

```ts
const container = new Container({
    layout: {
        width: 500,
        height: 500,
        justifyContent: 'center',
    },
});

const managed = new Sprite({ texture, layout: true });
const unmanaged = new Sprite(texture); // not in layout

container.addChild(managed, unmanaged);
```

In this case:

- `managed` will be centered in the layout box (positioned at 250,250).
- `unmanaged` will be placed at 0,0, unless you set its .x and .y manually.