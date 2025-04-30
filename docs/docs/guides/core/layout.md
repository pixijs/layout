---
title: Layout API
hide_title: true
sidebar_position: 1
---

## Layout API

This guide explains how to use the library, including enabling layout on objects, configuring styles, and using runtime APIs to inspect or adjust layouts.

## Enabling/Disabling Layout

To enable layout on a PixiJS object, set the `layout` property to `true` or an object with layout styles. This can be done in the constructor or later in your code.

```ts
import { Sprite, Container } from 'pixi.js';

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
    objectFit: 'cover',
};

container.addChild(sprite);
```

You can also enable/disable layout on existing objects:

```ts
sprite.layout = true; // enable layout
sprite.layout = false; // disable layout
sprite.layout = null; // disable layout
```

### Visibility

When a layout-enabled object is not visible, it will not be included in the layout calculations. This means that if you set `visible` to `false`, the object will not affect the layout of its parent or siblings.

```ts
sprite.visible = false; // sprite will not be included in layout
```

```ts
sprite.visible = true; // sprite will be included in layout
```

## Updating Styles

You can update the layout styles of an object at any time. The layout system will automatically recalculate the layout when the styles change.

```ts
sprite.layout = {
    width: 200,
    height: 200,
    objectFit: 'contain',
};

setTimeout(() => {
    sprite.layout = {
        width: 300,
        objectFit: 'cover',
    };
}, 1000);
```

Note that you do not need to provide a full layout object every time. You can update only the properties you want to change. The layout system will merge the new styles with the existing ones.

## Default Styles

There is a set of default styles that are applied to all layout-enabled objects based on their type (container or leaf node). These styles can be overridden by updating the `Layout.defaultStyles` property.

```ts
import { Layout } from '@pixi/layout';

Layout.defaultStyle = {
    leaf: {
        width: 'intrinsic',
        height: 'intrinsic',
    },
    container: {
        width: 'auto',
        height: 'auto',
    },
    shared: {
        transformOrigin: '50%',
        objectPosition: 'center',
        flexShrink: 1,
        flexDirection: 'row',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        overflow: 'visible',
    },
};
```

Above are the current default styles. You can modify them to suit your needs.

## Runtime API

When layout is active on an object, several runtime APIs are available to inspect or adjust the layout. These APIs can be used to get the current layout state or force a layout update.

### forceUpdate

Forces the `LayoutSystem` to recalculate immediately during the next frame.
Useful if external modifications might have changed the bounds of the object.

```ts
sprite.layout.forceUpdate();
```

While the layout system does try to track changes, it may not always be able to detect them. This is especially true for changes made outside of the layout system.

### computedLayout

Returns the raw layout engine result.

```ts
const layoutBox = sprite.layout.computedLayout;
console.log(layoutBox.left, layoutBox.top, layoutBox.width, layoutBox.height);
```

This includes logical layout information such as:

- `left`: The left edge of the layout box.
- `top`: The top edge of the layout box.
- `right`: The right edge of the layout box.
- `bottom`: The bottom edge of the layout box.
- `width`: The width of the layout box.
- `height`: The height of the layout box.

These values are computed by the Yoga engine and define the layout box of the object.

### computedPixiLayout

Returns PixiJS-specific adjustments needed for rendering

```ts
const pixiLayout = sprite.layout.computedPixiLayout;
console.log(pixiLayout.offsetX, pixiLayout.offsetY, pixiLayout.scaleX, pixiLayout.scaleY);
```

This includes PixiJS-specific adjustments such as:

- `x`, `y`: The top-left corner of the layout box in PixiJS coordinates.
- `offsetX`, `offsetY`: The offset from the top-left corner of the layout box to the top-left corner of the object.
- `scaleX`, `scaleY`: The scale factor to apply when using `objectFit`.
- `originX`, `originY`: The origin point of the layout box based on the `transformOrigin` property.

These values are used to adjust the position and scale of the object within the layout box.

### Real Position/Scale

The `realX`, `realY`, `realScaleX`, and `realScaleY` properties return the actual position and scale of the PixiJS object after layout calculations have been applied.

Unlike `position.x`, `position.y`, `scale.x`, and `scale.y`, which are always normalised to x/y `0,0` and scale `1,1` respectively, these properties reflect the actual position and scale of the object in the layout.

```ts
sprite.layout.realX;
sprite.layout.realY;

sprite.layout.realScaleX;
sprite.layout.realScaleY;
```

### Layout events

Each layout-enabled object emits a `layout` event when the layout is updated. This event provides the full `Layout` object with the new layout state.

```ts
sprite.on('layout', (event) => {
    console.log('Layout updated:', event);
});

// or using the callback
sprite.onLayout = (event) => {
    console.log('Layout updated:', event);
};
```

Using `computedLayout` and `computedPixiLayout`, you can inspect the new layout state of the object and apply any custom logic as needed.

```ts
sprite.on('layout', (event) => {
    const layoutBox = event.computedLayout;
    background.width = layoutBox.width;
    background.height = layoutBox.height;
    background.x = layoutBox.left;
    background.y = layoutBox.top;
});
```