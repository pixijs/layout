---
title: Overview
hide_title: true
sidebar_position: 0
---

## Overview

PixiJS Layout brings a powerful, declarative, and responsive layout model to the 2D rendering power of PixiJS. Built on top of Facebook's [Yoga](https://www.yogalayout.dev/) Flexbox layout engine, it allows developers to create dynamic UIs, responsive game interfaces, and fluid application components — all inside PixiJS.

This guide covers the foundational principles behind the `@pixi/layout` system. It explains how layout is applied, how nodes are measured and styled, and how the system integrates flexibly into PixiJS projects.

## 📘 Concepts

### 📐 Yoga + Flexbox Model

`@pixi/layout` is powered by [Yoga](https://www.yogalayout.dev/), a cross-platform layout engine that implements a subset of the CSS Flexbox specification. If you're familiar with how Flexbox works in HTML/CSS, you'll find many parallels in how layout rules work here.

Key properties such as `flexDirection`, `justifyContent`, `alignItems`, `gap`, and `flexWrap` work as expected and follow the same logic as in web development.

---

### 🧱 Everything is a Box

In `@pixi/layout`, **everything is conceptually a box**. This reflects the CSS box model:

- Containers represent layout groups, analogous to HTML `<div>` elements. They do not render visual content directly, but define layout regions that arrange and position children.

- Leaf nodes such as `Sprite`, `Graphics`, `Text`, `BitmapText`, and `TilingSprite` are analogous to HTML `<img>` elements. These nodes are visual and content-bearing.

Each node in the tree has a virtual layout box, and the position and size of that box is calculated by the layout engine. Visual elements can additionally scale or crop their internal content using style properties like `objectFit` and `objectPosition`.

```ts
const container = new Container({
    layout: {
        width: 500,
        height: 300,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

const sprite = new Sprite({ texture });
sprite.layout = {
    width: 100,
    height: 100,
    objectFit: 'contain',
    objectPosition: 'center',
};

container.addChild(sprite);
```

---

### 🔧 Opt-in Layout and Mixed Modes

One of the defining strengths of `@pixi/layout` is its **non-invasive**, **opt-in** design. Layout logic is only applied when explicitly requested. This enables seamless integration into existing PixiJS projects and flexibility:

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

---

### 🧩 Layout Components & Re-exports

Some styles are only supported on specialized container components:

- `backgroundColor`
- `borderRadius`
- `overflow`

These styles are **not available** on standard PixiJS containers / leaf nodes. If you need them, use:

- `LayoutContainer`
- `LayoutSprite`
- `LayoutTilingSprite`
- `LayoutNineSlicePlane`
- `LayoutAnimatedSprite`
- `LayoutGifSprite`
- `LayoutGraphics`
- `LayoutText`
- `LayoutBitmapText`
- `LayoutHTMLText`
- `LayoutMesh`
- `LayoutPerspectiveMesh`
- `LayoutMeshPlane`
- `LayoutMeshRope`
- `LayoutMeshSimple`

These custom components simply wrap a leaf node inside of a standard PixiJS Container and adds additional graphics to draw backgrounds and borders.

Additionally, all PixiJS leaf nodes are **re-exported** in `@pixi/layout` with the `layout` property applied **after** initialization. This is essential for correct intrinsic sizing.

```ts
import { LayoutContainer } from '@pixi/layout/components';
import { Sprite, Graphics, Text } from '@pixi/layout/components';

const container = new LayoutContainer({
    layout: {
        width: 500,
        height: 300,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 0x000000,
        borderRadius: 10,
    },
});

const sprite = new Sprite({ texture, layout: true });
const graphics = new Graphics({ layout: true });
const text = new Text({ text: 'Hello World', layout: true });

container.addChild(sprite, graphics, text);
```

It is not necessary to use the re-exports, but it is recommended as this is the safest way to ensure that the layout property is assigned last in the constructor.

---

### 🔁 Intrinsic Sizing

By default, all leaf nodes use the `'intrinsic'` property for `width/height` to size a node based on its current PixiJS Bounds

```ts
sprite.layout = true;
// This is equivalent to:
sprite.layout = {
    width: 'intrinsic',
    height: 'intrinsic',
};
```

Intrinsic sizing does have a performance impact as we have to check the bounds of the node periodically. This is not a problem for most use cases, but if you are using a lot of nodes, you may want to consider using fixed sizes instead.

```ts
sprite.layout = {
    width: sprite.width,
    height: sprite.height,
};
```

You can combine intrinsic sizing with other layout styles:

```ts
text.layout = {
    width: 200,
    height: 'intrinsic',
    objectFit: 'scale-down',
};
```

---

### 🧭 Transform Origin and Layout Transforms

The `transformOrigin` property defines the **pivot point for rotation/scaling**, but applies to the **layout box**, not the PixiJS element.

This is conceptually similar to transform-origin in CSS. Instead of modifying a sprite’s anchor or pivot, you should use transformOrigin to ensure the layout and visual transforms remain synchronized.

```ts
sprite.layout = {
    width: 300,
    height: 300,
    objectFit: 'cover',
    transformOrigin: 'center',
};

sprite.rotation = 0.2; // rotates around center of the layout box
```

`anchor` and `pivot` will be ignored when a PixiJS object has layout enabled.

### Position and Scale Normalization

Regardless of how the content is fit inside the layout box (e.g. using objectFit: 'cover'), the layout box’s transform is always normalized:

- `position.x` and `position.y` are always `0`
- `scale.x` and `scale.y` are always `1`

The actual transform is handled by internal layout calculations, so that display objects remain animatable and decoupled from layout logic.

This normalization simplifies transforms:

- You can apply rotation, alpha, or even scale animations without worrying about internal layout state.

- All content layout happens inside the box, and the visual content is internally scaled and positioned via computed layout data.

```ts
const sprite = new Sprite({ texture });
sprite.layout = {
    width: 300,
    height: 300,
    objectFit: 'cover',
    transformOrigin: 'center',
};

sprite.scale = 2; // scales as if the box was 600x600
sprite.rotation = 0.2; // rotates around center of the layout box
```
